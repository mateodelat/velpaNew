/* Amplify Params - DO NOT EDIT
    API_VELPAAPI_GRAPHQLAPIENDPOINTOUTPUT
    API_VELPAAPI_GRAPHQLAPIIDOUTPUT
    API_VELPAAPI_GRAPHQLAPIKEYOUTPUT
    ENV
    REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk')
const cognito = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' })


const { request, GraphQLClient } = require('graphql-request')





const crearUsr = `
      mutation CreateUsuario(
        $input: CreateUsuarioInput!
      ) {
        createUsuario(input: $input) {
          id
        }
      }
    `
const crearNotificacion = `
      mutation CreateNotificacion(
        $input: CreateNotificacionInput!
      ) {
        createNotificacion(input: $input) {
          id
        }
      }
    `;


function crearUsuario(attributes, sub) {
    const input = {
        nombre: attributes.name ? attributes.name : attributes.nickname,
        apellido: attributes.family_name ? attributes.family_name : null,
        id: sub,
        foto: attributes.picture ? attributes.picture : null,
        nickname: attributes.nickname,
        email: attributes.email
    }
    console.log("Atributos recibidos en crear usuario: ", input)

    if (input.id) {


        // Informacion para conectarse a graphql
        const endpoint = process.env.API_VELPAAPI_GRAPHQLAPIENDPOINTOUTPUT
        const headers = {
            "x-api-key": process.env.API_VELPAAPI_GRAPHQLAPIKEYOUTPUT
        };

        const client = new GraphQLClient(endpoint, { headers });

        client.request(crearUsr, { input })
            .then(r => {
                console.log("Resultado crear usuario: ", r)

            })
            .catch(err => {
                console.log('Error creando usuario: ', err);

            })


        // Crear la notificacion de bienvenida cuando no existia el usuario
        client.request(crearNotificacion, {
            input: {
                tipo: "BIENVENIDA",

                titulo: "Velpa adventures",
                descripcion: (attributes.name ? attributes.name : attributes.nickname) + " gracias por registrarte en Velpa.\nAqui vas a encontrar experiencias increibles",

                usuarioID: sub,
            }
        })



    }
    else {
        console.log("Error creando el usuario")
    }


}


exports.handler = (event, context, callback) => {

    console.log("Input funcion: ", event);

    // Obtener el client id de la respuesta
    const ClientId = event.callerContext.clientId
    const userPoolId = event.userPoolId


    if (event.triggerSource.includes('ExternalProvider')) {
        // Si es lanzado por un login con google

        if (event.request.userAttributes.hasOwnProperty("email")) {
            var params = {
                ClientId,
                Password: generatePassword(),
                Username: event.request.userAttributes.email
            };


            // Intentar crear usuario nativo siempre
            cognito.signUp(params, function (err, data) {
                if (err) {
                    console.log('cognito.signUp error:');
                    console.log(err);


                    // Si ya existe el usuario, se obtiene y se liga a la cuenta de google
                    if (err.code === 'UsernameExistsException') {
                        getUsersAndLink(userPoolId, event.request.userAttributes.email, event);
                    }
                }
                else {
                    console.log('cognito.signUp sucess:');
                    console.log(data);
                    // Si es cuenta de google y no existe ya el usuario se crea el usuario con los datos necesarios
                    crearUsuario(event.request.userAttributes, data.UserSub)

                    if (data.UserConfirmed) {
                        // Link Newly Created User
                        linkUser(data.UserSub, event);
                    }
                }
            });
        }
    }
    else {
        // Auto confirmar el usuario solo si fue creado por cuenta de google, si lo llama desde nodejs
        if (event.callerContext.awsSdkVersion.startsWith("aws-sdk-nodejs-")) {
            event.response.autoConfirmUser = true;
            // Set the email as verified if it is in the request
            if (event.request.userAttributes.hasOwnProperty("email")) {
                event.response.autoVerifyEmail = true;
            }
        } else {
            // Si es una cuenta nativa solo se crea el usuario con la informacion que queremos
            crearUsuario(event.request.userAttributes, event.userName)
        }

    }

    // Return to Amazon Cognito
    callback(null, event);
};

function generatePassword() {
    // TO DO: Code returns a string of a random generated password

    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var string_length = 8;
    var randomstring = '';
    for (var i = 0; i <= string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    console.log("Contraseña generada: " + randomstring)
    return randomstring
}

function getUsersAndLink(userPoolId, email, event) {
    // Obtiene un usuario con el mismo correo que el email en caso que ya exista

    var params = {
        UserPoolId: userPoolId,
        AttributesToGet: ['sub', 'email', 'cognito:user_status'],
        Filter: "email = \"" + email + "\""
    }
    cognito.listUsers(params, (err, data) => {
        if (err) {
            console.log('getUsersAndLink - err - cognito.listUsers:');
            console.log(err, err.stack);
        }
        else {
            console.log('getUsersAndLink - cognito.listUsers:');
            console.log(data);
            linkUsers(data, event);
        }
    });
}

function linkUser(userName, event) {
    // Se liga el usuario cuando es creado localmente

    var destinationValue = userName;
    var sourceValue = event.userName.split("_")[1];
    console.log('destinationValue: ' + destinationValue);
    console.log('sourceValue: ' + sourceValue);

    // Email Found and CONFIRMED (not EXTERNAL_PROVIDER)
    var params = {
        DestinationUser: {
            ProviderAttributeValue: destinationValue,
            ProviderName: 'Cognito'
        },
        SourceUser: {
            ProviderAttributeName: 'Cognito_Subject',
            ProviderAttributeValue: sourceValue,
            ProviderName: "Google"
        },
        UserPoolId: event.userPoolId
    };
    cognito.adminLinkProviderForUser(params, function (err, data) {
        if (err) {
            console.log('linkUser - err - cognito.adminLinkProviderForUser:');
            console.log(err);
        }
        else {
            console.log('linkUser - cognito.adminLinkProviderForUser:');
            console.log(data);
        }
    });
}

function linkUsers(usersData, event) {
    if (usersData != null && usersData.Users != null && usersData.Users.length > 0) {
        for (var i = 0; i < usersData.Users.length; i++) {
            if (usersData.Users[i] != null) {
                var destinationValue = '';
                var sourceValue = '';
                if (usersData.Users[i].UserStatus === 'CONFIRMED') {
                    linkUser(usersData.Users[i].Username, event);
                }
            }
        }
    }
    else {
        console.log("linkUsers: UserData was NULL or Empty")
    }
}

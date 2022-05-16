/* Amplify Params - DO NOT EDIT
	API_VELPAAPI_GRAPHQLAPIENDPOINTOUTPUT
	API_VELPAAPI_GRAPHQLAPIIDOUTPUT
	API_VELPAAPI_GRAPHQLAPIKEYOUTPUT
	AUTH_VELPA01106A15_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */const AWS = require('aws-sdk')
const cognito = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' })


// NOTE: This is not site specific; however, at this time it is only set to work with Facebook
exports.handler = (event, context, callback) => {
    console.log('exports.handler - event:');
    console.log(event);

    // Obtener el client id de la respuesta
    const ClientId = event.callerContext.clientId

    if (event.triggerSource.includes('ExternalProvider')) {
        // ExternalProvider (ie. Social)
        if (event.request.userAttributes.hasOwnProperty("email")) {
            // Create Native User Always
            var params = {
                ClientId,
                Password: generatePassword(),
                Username: event.request.userAttributes.email
            };
            cognito.signUp(params, function (err, data) {
                if (err) {
                    console.log('cognito.signUp:');
                    console.log(err, err.stack);
                    if (err.code === 'UsernameExistsException') {
                        // Get and Link Existing User
                        getUsersAndLink(event.userPoolId, event.request.userAttributes.email, event);
                    }
                }
                else {
                    console.log('cognito.signUp:');
                    console.log(data);
                    if (data.UserConfirmed) {
                        // Link Newly Created User
                        linkUser(data.UserSub, event);
                    }
                }
            });
        }
    } else {
        // All Others (ie. Native Accounts)
        // Auto Confirm The User
        event.response.autoConfirmUser = true;
        // Set the email as verified if it is in the request
        if (event.request.userAttributes.hasOwnProperty("email")) {
            event.response.autoVerifyEmail = true;
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
            ProviderName: event.userName.split("_")[0]
        },
        UserPoolId: event.userPoolId
    };
    cognito.adminLinkProviderForUser(params, function (err, data) {
        if (err) {
            console.log('linkUser - err - cognito.adminLinkProviderForUser:');
            console.log(err, err.stack);
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
    } else {
        console.log("linkUsers: UserData was NULL or Empty")
    }
}

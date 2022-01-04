const stripe = require('stripe')('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');

// Funcion crear cuenta de stripe a partir de datos 
/*
email
rfc
first_name
last_name
phone
address:{
    city,
    country,
    line1,
    postal_code,
    state
}
dob(date of birth):{
    day,
    month,
    year
}
userSub
accountNumber
tos_acceptance:{
    ip,
    date
}
 */

exports.handler = async (event) => {
    const { arguments } = event


    const {
        // Email que se asignara a compañia y persona
        email,
        phone,

        // Nombre persona
        first_name,
        last_name,

        // Cuenta bancaria
        accountNumber,

        // Sub del usuario para la metadata
        userSub,

        // Documento de identidad
        documentIdBack,
        documentIdFront,

        // Fecha nacimiento
        day,
        month,
        year,

        // Address
        city,
        country,
        line1,
        postal_code,
        state,

        // Terms of service
        ip,
        date,

        // Compañia
        companyName,
        url,

        // Tipo de cuenta
        accountType
    } = arguments



    let {
        rfcIndividual,
        rfcCompania,
    } = arguments

    // Obtener los RFC's y si no poner por defecto el de velpa
    rfcIndividual = rfcIndividual ? rfcIndividual : "VECJ8803264G6"
    rfcCompania = rfcCompania ? rfcCompania : "VECJ8803264G6"

    // Nombre de la cuenta o empresa
    const name = companyName ? companyName : first_name + " " + last_name

    // Verificar si es cuenta de empresa y no hay nombre
    if (accountType === "COMPANY" && !companyName) {
        console.log("No hay nombre de compañia")
        return {
            id: "No hay nombre de compañia",
            error: true
        }
    }

    // Terminos y condiciones
    const tos_acceptance = {
        ip,
        date
    }

    // Direccion
    const address = {
        city,
        country,
        line1,
        postal_code,
        state
    }

    // Fecha de nacimiento
    const dob = {
        day,
        month,
        year
    }


    // Perfil de la cuenta
    const business_profile = {
        url: url ? url : "https://velpa.com.mx",
        mcc: 4722,
        name
    }

    // Permisos a dar
    const capabilities = {
        card_payments: {
            requested: true
        },
        transfers: {
            requested: true
        }
    }

    // Cuenta bancaria 
    const external_account = {
        object: "bank_account",
        country: "MX",
        currency: "mxn",
        account_number: accountNumber
    }


    // Datos para crear una persona
    // Verificar su documento
    const verification = {
        document: {
            front: documentIdFront,
            back: documentIdBack
        }
    }
    // Llenar sus datos
    const individual = {
        verification,
        id_number: rfcIndividual,
        first_name,
        last_name,
        phone,
        email,
        address,
        dob
    }



    let accountObject



    if (accountType === "INDIVIDUAL") {

        accountObject = {
            type: "custom",
            country: "MX",
            email,

            // Operaciones a realizar
            capabilities,

            business_type: "individual",

            // Datos de la persona
            individual,

            // Datos de Velpa
            business_profile,

            // Cuenta de banco
            external_account,

            metadata: {
                userSub,
            },

            // Terminos y condiciones
            tos_acceptance
        }

    } else {
        // Datos de la compañia
        const company = {
            tax_id: rfcCompania,
            phone,
            name: companyName,
            owners_provided: true,
            executives_provided: true,
            address,

            // Verificar imagen empresa (en este caso es la imagen para el usuario)
            verification,
        }


        // Crear la cuenta sin campo de "individual"
        accountObject = {
            type: "custom",
            country: "MX",
            email,

            business_type: "company",

            // Operaciones a realizar
            capabilities,


            // Datos de compañia
            company,

            // Perfil de velpa
            business_profile,

            metadata: {
                userSub,
            },

            // Cuenta de banco
            external_account,

            // Terminos y condiciones
            tos_acceptance
        }
    }



    try {
        // Crear la cuenta
        const account = await stripe.accounts.create(accountObject)

        // Si es de tipo compañia se crea al dueño
        if (accountType === "COMPANY") {
            // Crear al representante legal
            const personObject = {
                // Todos los datos como si fuera cuenta normal
                ...individual,

                // Relacion de la persona por default como dueño 100%
                relationship: {
                    percent_ownership: 100,
                    executive: true,
                    owner: true,
                    director: true,
                    representative: true
                },
            }
            await stripe.accounts.createPerson(account.id, personObject)
        }
        return {
            id: account.id,
        }
    } catch (error) {
        console.log(error)

        return {
            errors: true
        }

    }
}
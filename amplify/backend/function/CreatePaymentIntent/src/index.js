const stripe = require("stripe")("sk_test_51J7OwUFIERW56TAEe1Ih8TU1SRyeoyLvP17jicv86HOaEJCjEakiYqMqMJ5ZdsCf3OdXV5Km1qwEN7QYvwEgjv4J00XeAeyKE1")

exports.handler = async (event) => {
    try {
        const { arguments } = event

        console.log("Args de input:", arguments)

        const amount = arguments.amount * 100
        const appFee = arguments.comision * 100


        if (appFee > amount) {
            return {
                error: "Error la comision es mayor a la cantidad cobrada"
            }
        }


        // Create payment intent
        // Conviene obtener un id y desde aqui fetchear el precio de la reserva
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "mxn",
            application_fee_amount: appFee,
            metadata: {
                fechaID: arguments.fechaID,
                usuarioID: arguments.usuarioID,
                reservaID: arguments.reservaID,
                otherFees: arguments.otherFees
            },

            // Descripcion en stripe y extracto bancario
            description: arguments.description,
            statement_descriptor: "VELPA ADVENTURES",

            transfer_data: {
                destination: arguments.destinationStripeID,
            },
        })
        console.log("Payment intent result ", paymentIntent)

        return {
            id: paymentIntent.id,
            clientSecret: paymentIntent.client_secret,
        }
    } catch (error) {
        return {
            error
        }
    }


};

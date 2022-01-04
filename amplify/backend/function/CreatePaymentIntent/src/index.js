const stripe = require("stripe")("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")

exports.handler = async (event) => {
    const { typeName, arguments } = event

    const amount = arguments?.amount * 100

    if (typeName !== "Mutation") {
        throw new Error("La solicitud debe ser una mutacion")
    }

    if (!amount) {
        throw new Error("Amount argument is required")

    }

    const appFee = amount * arguments.comision

    // Create payment intent
    // Conviene obtener un id y desde aqui fetchear el precio de la reserva
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "mxn",
        application_fee_amount: appFee,
        metadata: {
            fechaID: arguments.fechaID,
            usuarioID: arguments.usuarioID,
        },
        transfer_data: {
            destination: arguments.destinationStripeID,
        },
    })
    console.log("Payment intent result ", paymentIntent)

    return {
        id: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
    }
};

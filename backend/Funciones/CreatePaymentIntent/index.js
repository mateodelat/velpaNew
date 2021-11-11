const stripe = require("stripe")("sk_test_51J7OwUFIERW56TAEe1Ih8TU1SRyeoyLvP17jicv86HOaEJCjEakiYqMqMJ5ZdsCf3OdXV5Km1qwEN7QYvwEgjv4J00XeAeyKE1")

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

    console.log("total amount:", amount)
    console.log("Comision", arguments.comision, "%-------------total comision:", appFee)
    console.log("Cuenta destinataria:", arguments.destinationStripeID)

    // Create payment intent
    // Conviene obtener un id y desde aqui fetchear el precio de la reserva
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "mxn",
        application_fee_amount: appFee,
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

const stripe = require('stripe')('sk_test_51J7OwUFIERW56TAEe1Ih8TU1SRyeoyLvP17jicv86HOaEJCjEakiYqMqMJ5ZdsCf3OdXV5Km1qwEN7QYvwEgjv4J00XeAeyKE1');

exports.handler = async (event) => {
    const { arguments } = event

    const balance = await stripe.balance.retrieve({
        stripeAccount: arguments.stripeID
    });

    console.log("Resultado", balance)
    console.log(arguments)

    return {
        result: JSON.parse(balance)
    }
};

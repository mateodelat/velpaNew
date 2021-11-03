const stripe = require('stripe')('sk_test_51J7OwUFIERW56TAEe1Ih8TU1SRyeoyLvP17jicv86HOaEJCjEakiYqMqMJ5ZdsCf3OdXV5Km1qwEN7QYvwEgjv4J00XeAeyKE1');



exports.handler = async (event) => {
    const { arguments } = event
    const { stripeID } = arguments

    console.log(arguments)

    const stripeLogin = await stripe.accounts.createLoginLink(stripeID);
    const url = stripeLogin.url

    console.log(url)
    return {
        url
    }
};

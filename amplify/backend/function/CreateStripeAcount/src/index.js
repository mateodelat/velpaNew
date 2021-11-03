/* Amplify Params - DO NOT EDIT
  API_VELPANEWVERSION_GRAPHQLAPIENDPOINTOUTPUT
  API_VELPANEWVERSION_GRAPHQLAPIIDOUTPUT
  API_VELPANEWVERSION_GRAPHQLAPIKEYOUTPUT
  ENV
  REGION
Amplify Params - DO NOT EDIT */

const https = require('https');
const AWS = require("aws-sdk");
const urlParse = require("url").URL;
const stripe = require('stripe')('sk_test_51J7OwUFIERW56TAEe1Ih8TU1SRyeoyLvP17jicv86HOaEJCjEakiYqMqMJ5ZdsCf3OdXV5Km1qwEN7QYvwEgjv4J00XeAeyKE1');
const appsyncUrl = process.env.API_VELPANEWVERSION_GRAPHQLAPIENDPOINTOUTPUT;
const region = process.env.REGION;
const endpoint = new urlParse(appsyncUrl).hostname.toString();
const { updateUsuario, getUsuario } = require('./query.js');
const apiKey = process.env.API_VELPANEWVERSION_GRAPHQLAPIKEYOUTPUT;

exports.handler = async (event) => {
  const { arguments } = event
  let stripeID

  async function fetchHTTPS(req) {
    return new Promise((resolve, reject) => {
      const httpRequest = https.request({ ...req, host: endpoint }, (result) => {
        let data = "";

        result.on("data", (chunk) => {
          data += chunk;
        });

        result.on("end", () => {
          resolve(JSON.parse(JSON.stringify(data)));
        });
      });

      httpRequest.write(req.body);
      httpRequest.end();
    })

  }


  // Crear llamada a API con clave de API para ver usuarios
  let req
  req = new AWS.HttpRequest(appsyncUrl, region);

  // Formato para la solicitud de html a graphql server
  req.method = "POST";
  req.path = "/graphql";
  req.headers.host = endpoint;
  req.headers["Content-Type"] = "application/json";
  req.headers["x-api-key"] = apiKey;
  req.body = JSON.stringify({
    query: getUsuario,
    operationName: "getUsuario",
    variables: {
      id: arguments.sub
    }
  });


  console.log("Solicitud obtener usuario:", JSON.stringify(req))

  const data = await fetchHTTPS(req)
  console.log("Respuesta obtener usuario:", data)

  stripeID = JSON.parse(data).data.getUsuario.stripeID

  // Si no hay id de stripe significa que tenemos que crear la cuenta
  if (!stripeID) {
    const account = await stripe.accounts.create({
      type: 'express',
      email: arguments.email,
      settings: {
        payouts: {
          schedule: {
            interval: 'manual',
          },
        },
      },
    })

    // Se cambia el cuerpo de la request para graphql update usuario
    req.body = JSON.stringify({
      query: updateUsuario,
      operationName: "UpdateUsuario",
      variables: {
        input: {
          id: arguments.sub,
          stripeID: account.id
        }
      }
    });
    console.log("Solicitud actualizar usuario:", JSON.stringify(req))

    // Llamada a API para actualizar el usuario
    const updatedUser = await fetchHTTPS(req)
    console.log("ActualizarUsuario respuesta:", updatedUser)

    stripeID = account.id
  }

  console.log("StripeID:", stripeID)

  // Obtener el url de stripe
  const accountLinks = await stripe.accountLinks.create({
    account: stripeID,
    refresh_url: arguments.url,
    return_url: arguments.url,
    type: 'account_onboarding',
    collect: 'currently_due',
  });
  console.log("Links de stripe:", accountLinks)


  return {
    url: accountLinks.url
  }
};
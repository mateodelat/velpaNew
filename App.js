import React, { useState, useEffect, Fragment } from 'react';
import { StatusBar } from 'expo-status-bar';

import { Linking, View, LogBox } from 'react-native';

import LoginStack from './src/navigation/LoginStack';
import Router from './src/navigation/Router';

import Amplify, { Auth, Hub, } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import * as WebBrowser from 'expo-web-browser';
import { createUsuario } from './assets/constants';
import { Loading } from './src/components/Loading';
import { StripeProvider } from '@stripe/stripe-react-native';

LogBox.ignoreLogs(['Setting a timer for a long period of time']);

async function urlOpener(url, redirectUrl) {
  const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(
    url,
    redirectUrl
  );

  if (type === 'success' && Platform.OS === 'ios') {
    WebBrowser.dismissBrowser();
    return Linking.openURL(newUrl);
  }
}

// Assuming you have two redirect URIs, and the first is for localhost and second is for production
const [
  localRedirectSignIn,
  productionRedirectSignIn,
] = awsconfig.oauth.redirectSignIn.split(",");

const [
  localRedirectSignOut,
  productionRedirectSignOut,
] = awsconfig.oauth.redirectSignOut.split(",");

Amplify.configure({
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    urlOpener,
    redirectSignIn: localRedirectSignIn,
    redirectSignOut: localRedirectSignOut,

  }
});

const App = () => {

  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [animacion, setAnimacion] = useState(true);

  useEffect(() => {

    Auth.currentUserCredentials()
      .then(user => {
        setLoading(false)
        user.authenticated ? setAuthenticated(true) : Auth.signOut()
        // console.log(user.authenticated ? "Usuario autenticado" : "Usuario no autenticado")
      }).catch(err => {
        setLoading(false)
        console.log("Error getting credentials", err)
      })

    Hub.listen("auth", (data) => {
      const { event, message } = data.payload
      switch (event) {
        case "signIn":
          setLoading(false)
          setAuthenticated(true)
          break;
        case "signOut":
          setLoading(false)
          setAuthenticated(false)
          break;
        case "cognitoHostedUI":
          setLoading(false)
          setAuthenticated(true)

          // Tras iniciar sesion con Google se intenta crear el usr
          Auth.currentUserInfo()
            .then(r => {
              createUsuario(r.attributes)
            })
            .catch(e => {

            })
          break;
        default:
          break;
      }
    });

    setTimeout(() => {
      setAnimacion(false)
    }, 5500)
    return () => {
      Hub.remove("auth", () => console.log("fin del hub"))
    }
  }, []);



  // if (animacion) return (<Loading valor={0} />)


  // if (loading) return (
  //   <Loading valor={0} />
  // )

  // if (!authenticated) {
  //   return (
  //     <View style={{ flex: 1, backgroundColor: '#fff', }}>

  //       <StatusBar hidden={true}></StatusBar>
  //       <LoginStack />
  //     </View>
  //   )
  // }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', }}>
      < StripeProvider
        publishableKey="pk_test_51J7OwUFIERW56TAEOt1Uo5soBi8WRK6LSSBAgU8btdFoTF1z05a84q9N1DMcnlQcFF7UuXS3dr6ugD2NdiXgcfOe00K4vcbETd"
        // urlScheme={localRedirectSignIn} // required for 3D Secure and bank redirects
        merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
      >
        <StatusBar hidden={true} />
        <Router />
      </StripeProvider>
    </View>
  );

}


export default App
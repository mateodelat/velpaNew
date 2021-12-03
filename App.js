import React, { useState, useEffect, Fragment } from 'react';
import { StatusBar } from 'expo-status-bar';

import { Linking, View, LogBox, StyleSheet, Button, Platform, Alert } from 'react-native';

import LoginStack from './src/navigation/LoginStack';
import Router from './src/navigation/Router';

import Amplify, { Auth, Hub, } from "aws-amplify";

import { DataStore } from '@aws-amplify/datastore';


import awsconfig from "./src/aws-exports";
import * as WebBrowser from 'expo-web-browser';
import { createUsuario, getBlob, openImagePickerAsync } from './assets/constants';
import { Loading } from './src/components/Loading';
import { Aventura } from './src/models';
import { Publicidad } from './src/models';

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

let publicidadLoaded
let aventuraLoaded

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cargandoModelos, setCargandoModelos] = useState(false);

  useEffect(() => {
    // Ver si el usuario esta autenticado
    Auth.currentUserCredentials()
      .then(user => {
        setLoading(false)
        if (user.authenticated) {
          DataStore.start()
          setAuthenticated(true)
        } else {
          Auth.signOut()
        }
      }).catch(err => {
        setLoading(false)
        console.log("Error getting credentials", err)
      })

    // Escuchar a actualizaciones de auth
    const auth = Hub.listen("auth", (data) => {
      const { event, message } = data.payload
      switch (event) {
        case "signIn":
          setCargandoModelos(true)
          DataStore.start()
          setLoading(false)
          setAuthenticated(true)
          break;
        case "signOut":
          setLoading(false)
          setAuthenticated(false)
          break;
        case "cognitoHostedUI":
          setLoading(false)
          // Tras iniciar sesion con Google se intenta crear el usr y solo se corre una vez
          if (message.startsWith("A user google")) {
            Auth.currentUserInfo()
              .then(r => {
                setCargandoModelos(true)
                createUsuario(r.attributes, false, r.username)
                setAuthenticated(true)
              })

          }
          break;

        default:
          break;
      }
    });


    // Crear listener para cuando se acaben de obtener los modelos de datastore
    const listener = Hub.listen("datastore", async hubData => {
      const { event, data } = hubData.payload;
      if (event === "modelSynced" && data?.model === Aventura) {
        aventuraLoaded = true
      } else if (event === "modelSynced" && data?.model === Publicidad) {
        publicidadLoaded = true

      } else if (publicidadLoaded && aventuraLoaded) {
        setCargandoModelos(false)

      }
    })


    return () => {
      Hub.remove("auth", () => console.log("fin del hub"))

      Hub.remove("datastore", () => console.log("fin del hub"))
      listener()
      auth()
    }
  }, []);


  if (loading || cargandoModelos) return (
    <Loading valor={0} />
  )


  if (!authenticated) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', }}>

        <StatusBar hidden={true}></StatusBar>
        <LoginStack />
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar hidden={true} />
      <Router />
    </View>
  );

}


export default App
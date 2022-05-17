import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import {
  Linking, View, StyleSheet, Button, Platform, Alert,
  LogBox
} from 'react-native';

import { Auth, Hub, Amplify } from "aws-amplify";

import { DataStore } from '@aws-amplify/datastore';


import awsconfig from "./src/aws-exports";
import * as WebBrowser from 'expo-web-browser';
import { Loading } from './src/components/Loading';
import { Aventura } from './src/models';
import { Publicidad } from './src/models';
import ModalOnboarding from './src/navigation/components/ModalOnboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Usuario } from './src/models';
import { Notificacion } from './src/models';

import LoginStack from './src/navigation/LoginStack';
import Router from './src/navigation/Router';



const url = "exp://127.0.0.1:19000/--/"
LogBox.ignoreLogs(['Setting a timer for a long period of time, i.e. multiple minutes']);

async function urlOpener(url, redirectUrl) {
  console.log(redirectUrl)
  const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(
    url,
    redirectUrl
  );

  if (type === 'success' && Platform.OS === 'ios') {
    WebBrowser.dismissBrowser();
    return Linking.openURL(newUrl);
  }
}

Amplify.configure({
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    urlOpener,
    redirectSignIn: url,
    redirectSignOut: url,

  }
});


export default function App() {


  // const [
  //   local,
  //   expo,
  //   standAlone,
  // ] = awsconfig.oauth.redirectSignOut.split(",");


  let publicidadLoaded
  let aventuraLoaded
  let usuarioLoaded
  let notificacionLoaded


  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cargandoModelos, setCargandoModelos] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(null);





  useEffect(() => {
    checkOnboarding()
    // Ver si el usuario esta autenticado
    Auth.currentUserCredentials()
      .then(user => {
        setLoading(false)
        if (user.authenticated) {
          DataStore.start()
          setAuthenticated(true)
        }
      }).catch(err => {
        setLoading(false)
        console.log("Error getting credentials", err)
      })

    // Escuchar a actualizaciones de auth
    const auth = Hub.listen("auth", (data) => {
      console.log(data)
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
        // case "cognitoHostedUI":
        //   setLoading(false)
        //   if (message.startsWith("A user google")) {
        //     Auth.currentUserInfo()
        //       .then(r => {
        //         setCargandoModelos(true)
        //         setAuthenticated(true)
        //       })
        //   }
        //   break;

        default:
          break;
      }
    });


    // Crear listener para cuando se acaben de obtener los modelos de datastore
    const listener = Hub.listen("datastore", async hubData => {
      const { event, data } = hubData.payload;
      if (event === "modelSynced" && data?.model === Aventura) {
        aventuraLoaded = true
      }
      else if (event === "modelSynced" && data?.model === Publicidad) {
        publicidadLoaded = true

      }

      else if (event === "modelSynced" && data?.model === Usuario) {
        usuarioLoaded = true

      }
      else if (event === "modelSynced" && data?.model === Notificacion) {
        notificacionLoaded = true

      }
      else if (publicidadLoaded && aventuraLoaded && usuarioLoaded && notificacionLoaded) {
        setCargandoModelos(false)

      }
    })


    return () => {
      Hub.remove("auth", () => null)

      Hub.remove("datastore", () => null)
      listener()
      auth()
    }
  }, []);




  // Ver si ya se presento el onboarding
  async function checkOnboarding() {
    try {
      const value = await AsyncStorage.getItem("@onboardingShown")
      if (!value) {
        setShowOnboarding(true)
      } else {
        setShowOnboarding(false)
      }
    } catch (error) {
      setShowOnboarding(false)
      console.log(error)
    }
  }


  // Limpiar el elemento de onboardingShown
  async function handleDoneOnboarding() {
    setShowOnboarding(false)
    AsyncStorage.setItem("@onboardingShown", "t")

  }


  if (loading || cargandoModelos || showOnboarding === null) return (
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




  if (showOnboarding) {
    return <ModalOnboarding
      doneViewing={handleDoneOnboarding}
    />

  }

  return (
    <View style={{
      flex: 1, backgroundColor: '#fff',
    }}>
      <StatusBar hidden={true} />
      <Router />
    </View>
  );


}
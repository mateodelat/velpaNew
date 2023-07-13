import Bugsnag from "@bugsnag/expo";

import "@azure/core-asynciterator-polyfill";

import React, { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";

import { Linking, View, Platform, LogBox } from "react-native";

import { Auth, Hub, Amplify, AuthModeStrategyType } from "aws-amplify";

import { DataStore } from "@aws-amplify/datastore";

import awsconfig from "./src/aws-exports";

import { Loading } from "./src/components/Loading";
import { Aventura } from "./src/models";
import { Publicidad } from "./src/models";
import ModalOnboarding from "./src/navigation/components/ModalOnboarding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Usuario } from "./src/models";
import { Notificacion } from "./src/models";

import LoginStack from "./src/navigation/LoginStack";
import Router from "./src/navigation/Router";

import { colorFondo } from "./assets/constants";

import { cancelAllScheduledNotificationsAsync } from "expo-notifications";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
  "`new NativeEventEmitter()` was called with a non-null argument without the required `addListener` method",
  "Setting a timer for a long period of time, i.e. multiple minutes",
  "`new NativeEventEmitter()` was called with a non-null argument without the required `removeListeners` metho",
]);

export default function App() {
  Bugsnag.start()

  const [local, expo, standAlone] = awsconfig.oauth.redirectSignIn.split(",");

  const url = local;

  Amplify.configure({
    ...awsconfig,
      oauth: {
        ...awsconfig.oauth,
        redirectSignIn: url,
        redirectSignOut: url,
      },
  });

  const publicidadLoaded = useRef<boolean>();
  const aventuraLoaded = useRef<boolean>();
  const usuarioLoaded = useRef<boolean>();
  const notificacionLoaded = useRef<boolean>();

  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cargandoModelos, setCargandoModelos] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(null);

  async function start() {
    DataStore.start();

    const info = await Auth.currentUserInfo();
    if (info) {
      const { email, nickname, sub } = info.attributes;

      Bugsnag.setUser(sub, email, nickname);
    }
  }

  useEffect(() => {
    checkOnboarding();
    
    // Ver si el usuario esta autenticado
    Auth.currentUserCredentials()
    .then((user) => {
        setLoading(false);
        if (user.authenticated) {
          start();
          setAuthenticated(true);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("Error getting credentials", err);
      });

    // Escuchar a actualizaciones de auth
    const auth = Hub.listen("auth", (data) => {
      const { event, message } = data.payload;

      switch (event) {
        case "signIn":
          setCargandoModelos(true);
          start();
          setLoading(false);
          setAuthenticated(true);
          break;
        case "signOut":
          // Cancelar todas las notificaciones al celular
          cancelAllScheduledNotificationsAsync();
          setLoading(false);
          setAuthenticated(false);
          break;

        default:
          break;
      }
    });

    // Crear listener para cuando se acaben de obtener los modelos de datastore
    const listener = Hub.listen("datastore", async (hubData) => {
      const { event, data } = hubData.payload;

      if (event === "modelSynced" && data?.model === Aventura) {
        aventuraLoaded.current = true;
      } else if (event === "modelSynced" && data?.model === Publicidad) {
        publicidadLoaded.current = true;
      } else if (event === "modelSynced" && data?.model === Usuario) {
        usuarioLoaded.current = true;
      } else if (event === "modelSynced" && data?.model === Notificacion) {
        notificacionLoaded.current = true;
      } else if (
        publicidadLoaded.current &&
        aventuraLoaded.current &&
        usuarioLoaded.current &&
        notificacionLoaded.current
      ) {
        setCargandoModelos(false);
      }
    });

    return () => {
      Hub.remove("auth", () => null);

      Hub.remove("datastore", () => null);
      listener();
      auth();
    };
  }, []);

  // Ver si ya se presento el onboarding
  async function checkOnboarding() {
    try {
      const value = await AsyncStorage.getItem("@onboardingShown");
      if (!value) {
        setShowOnboarding(true);
      } else {
        setShowOnboarding(false);
      }
    } catch (error) {
      setShowOnboarding(false);
      console.log(error);
    }
  }

  // Limpiar el elemento de onboardingShown
  async function handleDoneOnboarding() {
    setShowOnboarding(false);
    AsyncStorage.setItem("@onboardingShown", "t");
  }

  if (loading || cargandoModelos || showOnboarding === null)
    return <Loading valor={0} />;

  if (!authenticated) {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <StatusBar translucent={true}></StatusBar>
        <LoginStack />
      </View>
    );
  }

  if (showOnboarding) {
    return <ModalOnboarding doneViewing={handleDoneOnboarding} />;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colorFondo,
      }}
    >
      <StatusBar translucent={true} />
      <Router />
    </View>
  );
}

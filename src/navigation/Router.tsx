import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import NavBar from "./NavBar";

import { MaterialIcons } from "@expo/vector-icons";
import ChatRoomHeader from "../components/ChatRoomHeader";

import SolicitudStack from "./SolicitudStack";
import AdminStack from "./AdminStack";

import BuscarAventura from "../screens/BuscarAventura";
import DetalleAventura from "../screens/DetalleAventura";
import FechasAventura from "../screens/FechasAventura";

import Logistica from "../screens/Logistica";
import Pagar from "../screens/Pagar";
import Exito from "../screens/ExitoScreen";
import ChatRoom from "../screens/ChatRoom";
import DetalleChatRoom from "../screens/DetalleChatRoom";
import Perfil from "../screens/Perfil";
import AgregarAventura from "../screens/AgregarAventura";
import AgregarFecha from "../screens/AgregarFecha";
import SeleccionaAventura from "../screens/SeleccionaAventura";
import Agregar2 from "../screens/AgregarFecha/Agregar2";
import Agregar3 from "../screens/AgregarFecha/Agregar3";
import MisReservas from "../screens/MisReservas";
import MisFechas from "../screens/MisFechas";
import MisSolicitudes from "../screens/MisSolicitudes";
import AgregarAventura2 from "../screens/AgregarAventura/AgregarAventura2";
import AgregarAventura3 from "../screens/AgregarAventura/AgregarAventura3";
import Configuracion from "../screens/Configuracion";
import Saldo from "../screens/Saldo";
import DetalleReserva from "../screens/DetalleReserva";
import DetalleFecha from "../screens/DetalleFecha";
import { DataStore } from "@aws-amplify/datastore";
import { Usuario } from "../models";
import { getUserSub, moradoOscuro } from "../../assets/constants";

import * as Notifications from "expo-notifications";
import { Platform, Pressable, Route, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import QRCode from "../screens/QRScan/QRCode";
import Ayuda from "../screens/Ayuda";
import ErrorRouter from "../screens/ErrorBoundaries/ErrorRouter";

export default () => {
  const Stack = createStackNavigator();

  //   const [notification, setNotification] = useState<
  //     Notifications.Notification | undefined
  //   >();
  //   const notificationListener = useRef(null);
  //   const responseListener = useRef(null);

  // Notifications.setNotificationHandler({
  //     handleNotification: async () => ({
  //         shouldShowAlert: true,
  //         shouldPlaySound: false,
  //         shouldSetBadge: 1,
  //     }),
  // });

  async function registerForPushNotificationsAsync() {
    try {
      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: moradoOscuro,
        });
      }

      let token: Notifications.ExpoPushToken["data"];
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      token = (await Notifications.getExpoPushTokenAsync())?.data;

      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (token) {
        // Subir a datastore el token
        const usuario = await DataStore.query(Usuario, await getUserSub());
        // Si es el mismo, no hacer nada

        if (usuario.notificationToken === token) return;
        console.log("Token de notificaciones actualizado a " + token);

        usuario &&
          (await DataStore.save(
            Usuario.copyOf(usuario, (usr) => {
              usr.notificationToken = token;
            })
          ));
      }

      return token;
    } catch (error) {
      console.log("Error subiendo token del usuario");
      console.log(error);
    }
  }

  useEffect(() => {
    // Subir token de notificaciones para el usuario
    registerForPushNotificationsAsync();

    // // This listener is fired whenever a notification is received while the app is foregrounded
    // notificationListener.current =
    //   Notifications.addNotificationReceivedListener((notification) => {
    //     setNotification(notification);
    //   });

    // // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    // responseListener.current =
    //   Notifications.addNotificationResponseReceivedListener((response) => {});

    // return () => {
    //   Notifications.removeNotificationSubscription(
    //     notificationListener.current
    //   );
    //   Notifications.removeNotificationSubscription(responseListener.current);
    // };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <ErrorRouter>
            <Stack.Navigator
              // initialRouteName={"MisReservas"}

              screenOptions={{
                headerLeft: ({ onPress }) => {
                  return (
                    <Pressable
                      onPress={onPress}
                      style={{
                        paddingHorizontal: 16,
                      }}
                    >
                      <MaterialIcons
                        name="keyboard-arrow-left"
                        size={35}
                        color="white"
                      />
                    </Pressable>
                  );
                },
                headerTintColor: "white",
                headerStyle: { backgroundColor: moradoOscuro },
                headerTitleAlign: "center",
              }}
            >
              <Stack.Screen
                name="inicio"
                component={NavBar}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen name="Pagar" component={Pagar} />

              <Stack.Screen name="Logistica" component={Logistica} />

              <Stack.Screen
                name="QRCode"
                component={QRCode}
                options={{
                  title: "Codigo de acceso",
                }}
              />

              <Stack.Screen
                name="ExitoScreen"
                component={Exito}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="ChatRoom"
                component={ChatRoom}
                options={({ route }: { route: Route }) => {
                  return {
                    header: () => (
                      <ChatRoomHeader
                        id={route.params?.id}
                        titulo={route.params?.titulo}
                        image={route.params?.image}
                      />
                    ),
                  };
                }}
              />

              <Stack.Screen
                name="DetalleChatRoom"
                component={DetalleChatRoom}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="SolicitudGuia"
                component={SolicitudStack}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="DetalleAventura"
                component={DetalleAventura}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="FechasAventura"
                component={FechasAventura}
                options={{
                  headerShown: false,
                }}
              />

              {/* Perfil */}
              <Stack.Screen
                name="PerfilScreen"
                component={Perfil}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="AgregarAventura"
                component={AgregarAventura}
                options={{
                  title: "Agregar experiencia",
                }}
              />

              <Stack.Screen
                name="AgregarAventura2"
                component={AgregarAventura2}
                options={{
                  title: "Ubicacion experiencia",
                }}
              />

              <Stack.Screen
                name="AgregarAventura3"
                component={AgregarAventura3}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="AgregarFecha"
                component={AgregarFecha}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="AgregarFecha2"
                component={Agregar2}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="AgregarFecha3"
                component={Agregar3}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="SeleccionaAventura"
                component={SeleccionaAventura}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="Admin"
                component={AdminStack}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="MisReservas"
                component={MisReservas}
                options={{
                  title: "Mis reservas",
                }}
              />

              <Stack.Screen
                name="DetalleReserva"
                component={DetalleReserva}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="MisFechas"
                component={MisFechas}
                options={{
                  title: "Mis fechas",
                }}
              />

              <Stack.Screen
                name="DetalleFecha"
                component={DetalleFecha}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="MisSolicitudes"
                component={MisSolicitudes}
                options={{
                  title: "Mis solicitudes",
                }}
              />

              <Stack.Screen name="Configuracion" component={Configuracion} />

              <Stack.Screen name="Ayuda" component={Ayuda} />

              <Stack.Screen
                name="Saldo"
                component={Saldo}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={"Busqueda"}
                component={BuscarAventura}
              />
            </Stack.Navigator>
          </ErrorRouter>
        </NavigationContainer>
      </SafeAreaProvider>
    </View>
  );
};

import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import {
  categorias,
  catFilter,
  colorFondo,
  enumToArray,
  getUserSub,
  listAventurasAutorizadas,
  moradoClaro,
  moradoOscuro,
  sendAdminNotification,
} from "../../../assets/constants";

import CuadradoImagen from "../../components/CuadradoImagen";
import { useNavigation } from "@react-navigation/native";
import Boton from "../../components/Boton";
import AddElemento from "./components/AddElemento";
import {
  AventuraSolicitudGuias,
  Categorias,
  Notificacion,
  StatusSolicitud,
  TipoNotificacion,
} from "../../models";
import { DataStore } from "@aws-amplify/datastore";
import { AventuraUsuarios } from "../../models";
import { Auth } from "@aws-amplify/auth";
import { SolicitudGuia } from "../../models";

const { height, width } = Dimensions.get("window");

export default ({ route }) => {
  // Mostrar solo aventuras que tengan minimo una fecha futura sin llenarse y cumpla los filtros

  // Variables iniciales
  const { esSelector } = route.params;

  let titulo;
  let descripcion;

  // Si es para seleccionar muchas aventuras
  if (esSelector) {
    titulo = "Selecciona aventuras";
    descripcion = "Selecciona las aventuras en las que te quieres certificar";
  }

  // Si es para hacer click en una sola aventura
  else {
    titulo = "Escoge aventura";
    descripcion = "Escoge la aventura a agregar la fecha";
  }
  const navigation = useNavigation();

  // Obtener aventuras
  const [aventuras, setAventuras] = useState(null);
  const [aventurasAMostrar, setAventurasAMostrar] = useState(null);

  useEffect(() => {
    fetchAventuras().then((r) => {
      setAventuras(r);
      setAventurasAMostrar(r);
    });
  }, []);

  const fetchAventuras = async () => {
    return await listAventurasAutorizadas(8, 0)
      // Obtener aventuras ya perimitidas
      .then(async (r) => {
        const {
          attributes: { sub },
        } = await Auth.currentUserInfo().catch((e) => { });

        // Obtener relaciones con usuario
        let aventurasAutorizadasAlUsr = (
          await DataStore.query(AventuraUsuarios).catch((e) => {
            Alert.alert("Error", "Error obteniendo aventuras autorizadas");
          })
        )
          .filter((c) => c.usuarioId === sub)
          .map((c) => c.aventuraId);

        r = r.map((ave, idx) => {
          return {
            ...ave,
            // Si es selector significa que queremos mostrar las aventuras no autorizadas
            notAllowed: esSelector
              ? aventurasAutorizadasAlUsr.includes(ave.id)
              : !aventurasAutorizadasAlUsr.includes(ave.id),
          };
        });

        if (esSelector) {
          // Filtrar solo mostrando las allowed
          r = r.filter((ave) => !ave.notAllowed);
          setSelectedItems(
            [...Array(r.length + 1).keys()].map((_, row) => {
              return [
                {
                  selected: false,
                },
                {
                  selected: false,
                },
              ];
            })
          );
        }

        return r;
      });
  };

  const [buscar, setBuscar] = useState("");

  // Variables del filtro
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState(enumToArray(Categorias).map(_ => true));
  const [filtrarAbierto, setFiltrarAbierto] = useState(false);

  // UI boton
  const [buttonLoading, setButtonLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [selectedItems, setSelectedItems] = useState(null);

  const handleBorrarBusqueda = () => {
    const nuevasAve = filtroSinBusqueda();
    setBuscar("");

    setAventurasAMostrar(nuevasAve);
  };

  // Funcion continuar solo en caso que sea selector
  const handleContinuar = async () => {
    setButtonLoading(true);
    // Extraer solos los id's de aventuras seleccionadas
    let listaAventuras = [];

    selectedItems.map((row) => {
      row.map((e) => {
        if (e.selected) {
          listaAventuras.push(e.aventura);
        }
      });
    });

    const sub = await getUserSub();

    if (listaAventuras.length === 0) {
      Alert.alert("Error", "Selecciona minimo una aventura a validar");
      return;
    }

    const solicitudGuia = await DataStore.save(
      new SolicitudGuia({
        status: StatusSolicitud.PENDIENTE,
        usuarioID: sub,
      })
    );

    // Crear relaciones a aventura para cada una
    await Promise.all(
      listaAventuras.map((aventura) => {
        return DataStore.save(
          new AventuraSolicitudGuias({
            aventuraId: aventura.id,
            solicitudGuiaId: solicitudGuia.id,
          })
        );
      })
    );

    sendAdminNotification({
      usuarioID: sub,

      titulo: "Nueva solicitud guia",
      descripcion:
        "Nuevas solicitudes para guia en: " +
        listaAventuras.map((e) => " " + e.titulo),
    });

    // Mandar notificacion
    await DataStore.save(
      new Notificacion({
        tipo: TipoNotificacion.SOLICITUDGUIA,

        titulo: "Nueva solicitud",
        descripcion:
          "Se ha creado una solicitud de guia para " +
          listaAventuras.map((e) => " " + e.titulo) +
          ", espera nuestra llamada!!",

        usuarioID: sub,

        showAt: new Date().getTime(),
      })
    );

    setButtonLoading(false);
    navigation.popToTop();
    navigation.navigate("ExitoScreen", {
      txtExito: "Solicitud enviada con exito, espera nuestra llamada!!",
      txtOnPress: "Volver al incio",
    });
  };

  const handlePressAventura = (aventura, row, column) => {
    if (esSelector) {
      let newSelectedItems = [...selectedItems];

      // Se cambia el valor del item seleccionado
      newSelectedItems[row][column].selected =
        !newSelectedItems[row][column].selected;

      // Se agrega el id del item seleccionado
      newSelectedItems[row][column].aventura = aventura;

      setSelectedItems(newSelectedItems);
    } else {
      navigation.navigate("AgregarFecha", {
        aventura,
      });
    }
  };

  const handleAventuraNoAutorizado = (aventura) => {
    async function handleSendSolicitud() {
      try {
        const sub = await getUserSub();

        // Verificar que no exista una solicitud pendiente para esa aventura
        const aventurasSolicitudPrevias = await DataStore.query(AventuraSolicitudGuias).then(
          async (r) => {
            return r.map((async (e) => {
              // Si el id de la aventura es igual a la solicitada y la solicitud esta en pendiente
              if (e.aventuraId === aventura.id) {
                const solicitudGuia = await DataStore.query(
                  SolicitudGuia,
                  e.solicitudGuiaId
                );


                if (solicitudGuia && solicitudGuia.status === StatusSolicitud.PENDIENTE) {
                  return true
                }

              }
              return false
            })).find(e => !!e)
          }
        );



        if (!!aventurasSolicitudPrevias) {
          Alert.alert("Error", "Ya enviaste una solicitud para esa aventura", [
            {
              text: "Cancelar",
            },
            {
              text: "Ver",
              onPress: () => navigation.navigate("MisSolicitudes"),
            },
          ]);
          return;
        }

        const solicitudGuia = await DataStore.save(
          new SolicitudGuia({
            status: StatusSolicitud.PENDIENTE,
            usuarioID: sub,
          })
        );

        // Crear relaciones a aventura para cada una
        await DataStore.save(
          new AventuraSolicitudGuias({
            aventuraId: aventura.id,
            solicitudGuiaId: solicitudGuia.id,
          })
        );

        // Notificacion a admins
        sendAdminNotification({
          usuarioID: sub,
          titulo: "Nueva solicitud guia",
          descripcion: "Nueva solicitud para guia en: " + aventura.titulo,
        });

        // Mandar notificacion
        await DataStore.save(
          new Notificacion({
            tipo: TipoNotificacion.SOLICITUDGUIA,

            titulo: "Nueva solicitud",
            descripcion:
              "Se ha creado una solicitud de guia para " +
              aventura.titulo +
              ", espera nuestra llamada!!",

            usuarioID: sub,
            showAt: new Date().getTime(),
          })
        );

        navigation.navigate("ExitoScreen", {
          txtExito: "Solicitud enviada con exito, espera nuestra llamada!!",
          txtOnPress: "Volver al incio",
        });
      } catch (error) {
        Alert.alert("Error", "Error creando solicitud");
        console.log(error);
      }
    }

    Alert.alert(
      "Error",
      "No estas autorizado a esta aventura, deseas enviar una solicitud?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: handleSendSolicitud,
        },
      ]
    );
  };

  const handleSelectCategoria = (index) => {
    let newCategoriasSelect = [...categoriasSeleccionadas];
    newCategoriasSelect[index] = !newCategoriasSelect[index];

    setCategoriasSeleccionadas(newCategoriasSelect);

    // Filtrar por categoria y por dificultad
    const nuevasAve = aventuras.filter((e) => {
      return (
        // Es igual al titulo en minusculas
        (e.titulo.toLowerCase().includes(buscar.toLowerCase()) ||
          // Es igual a la descripcion
          e.descripcion?.toLowerCase().includes(buscar.toLowerCase())) &&

        // Filtrar por categorias
        catFilter(newCategoriasSelect, e.categoria)

      );
    });
    setAventurasAMostrar(nuevasAve);
  };

  const handleChangeText = (text) => {
    setBuscar(text);

    let nuevasAve;

    // Si no hay texto solo aplicar filtros de categoria/dificultad
    if (text === "") {
      nuevasAve = filtroSinBusqueda();
    } else {
      nuevasAve = aplicarTodosLosFiltros(text);
    }

    setAventurasAMostrar(nuevasAve);
  };

  const filtroSinBusqueda = () => {
    return aventuras.filter((e) => {
      return (
        catFilter(categorias, e.categoria)
      );
    });
  };

  const aplicarTodosLosFiltros = (newText) => {
    return aventuras.filter((e) => {
      return (
        // Es igual al titulo en minusculas
        (e.titulo
          .toLowerCase()
          .includes(newText ? newText.toLowerCase() : buscar.toLowerCase()) ||
          // Es igual a la descripcion
          e.descripcion
            ?.toLowerCase()
            .includes(
              newText ? newText.toLowerCase() : buscar.toLowerCase()
            )) && // ALPINISMO
        catFilter(categorias, e.categoria)
      );
    });
  };

  const onRefresh = () => {
    setRefreshing(true);

    fetchAventuras().then((r) => {
      setAventuras(r);

      // Aplicar filtros a nuevas aventuras
      const nuevasAve = aplicarTodosLosFiltros();
      setAventurasAMostrar(nuevasAve);
    });
    setTimeout(() => {
      setRefreshing(false);
    }, 300);
  };

  const handleAddAventura = () => {
    Alert.alert(
      "Agregar aventura",
      "¿Deseas agregar una aventura nueva y certificarte en ella?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => navigation.navigate("AgregarAventura"),
        },
      ]
    );
  };

  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        ...styles.container,
        paddingTop: insets.top ? insets.top : 10,
      }}
    >
      <Header navigation={navigation} titulo={titulo} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <Text style={styles.textInfo}>{descripcion}</Text>
          {/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/}
          {/* $$$$$$$$$$     BUSCAR   $$$$$$$$$$$*/}
          {/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/}
          <View
            style={{
              backgroundColor: "#fff",
              flexDirection: "row",
              flex: 1,
              marginVertical: 10,
            }}
          >
            <TextInput
              style={{ padding: 0, flex: 1, padding: 10, paddingLeft: 40 }}
              value={buscar}
              placeholder="Buscar experiencias"
              placeholderTextColor={"#7E7F84"}
              onChangeText={handleChangeText}
            />
            <Feather
              name="search"
              size={25}
              color="#7E7F84"
              style={{
                marginRight: 5,
                position: "absolute",
                bottom: 10,
                left: 10,
              }}
            />
            {buscar.length !== 0 && (
              <Entypo
                onPress={handleBorrarBusqueda}
                style={{
                  marginRight: 5,
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                }}
                name="cross"
                size={24}
                color="black"
              />
            )}
          </View>

          {/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/}
          {/* $$$$$$$$$$    FILTRAR   $$$$$$$$$$$*/}
          {/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/}
          <View style={styles.filtrar}>
            <Pressable
              onPress={() => setFiltrarAbierto(!filtrarAbierto)}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: moradoOscuro,
                }}
              >
                Filtrar
              </Text>

              <MaterialIcons
                name={
                  filtrarAbierto ? "keyboard-arrow-up" : "keyboard-arrow-down"
                }
                size={35}
                color={moradoOscuro}
              />
            </Pressable>

            {filtrarAbierto ? (
              <View>
                {/* Categorias*/}
                <View
                  style={{
                    marginTop: 15,
                    marginBottom: 30,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    Categorias
                  </Text>

                  <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    style={{
                      marginTop: 20,
                      paddingBottom: 5,
                    }}
                  >
                    {categorias.map((item, index) => (
                      <Pressable
                        onPress={() => handleSelectCategoria(index)}
                        key={"Cat-" + index}
                        style={{
                          alignItems: "center",
                          width: 70,
                          marginRight: 10,
                        }}
                      >
                        <View
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 50,
                            backgroundColor: categoriasSeleccionadas[index]
                              ? moradoOscuro
                              : "#F4F6F6",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {/* Icono  */}
                          {item.icono(
                            categoriasSeleccionadas[index] ? "#fff" : "#000"
                          )}
                        </View>
                        <Text
                          style={{
                            textAlign: "center",
                          }}
                        >
                          {item.titulo}
                        </Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                </View>
              </View>
            ) : null}
          </View>

          {/* $$$$$$$$$$$$$*/}
          {/* Lista lugares*/}
          {/* $$$$$$$$$$$$$*/}
          {/* Mapear todas las aventuras */}
          {aventurasAMostrar === null ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: height / 2,
              }}
            >
              <ActivityIndicator size={"large"} color={"black"} />
            </View>
          ) : aventuras?.length === 0 ? (
            <Text style={styles.noAventuras}>No hay aventuras</Text>
          ) : (
            [...Array(Math.round(aventurasAMostrar.length / 2))].map(
              (_, row) => (
                <View
                  key={"row" + row}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 15,
                  }}
                >
                  {[
                    aventurasAMostrar[row * 2],
                    row * 2 + 1 < aventurasAMostrar.length &&
                    aventurasAMostrar[row * 2 + 1],
                  ].map((e, column) => {
                    if (!e) {
                      return (
                        // Si es el ultimo item y es impar agregar plus button
                        <View
                          key={"plusButton"}
                          style={{
                            marginBottom: 15,
                          }}
                        >
                          <AddElemento
                            tamañoCuadrado={width / 2 - 30}
                            onPress={() => handleAddAventura()}
                          />
                        </View>
                      );
                    }

                    return (
                      <CuadradoImagen
                        notAllowed={e.notAllowed}
                        selected={
                          esSelector
                            ? selectedItems[row][column]?.selected
                            : undefined
                        }
                        tamañoCuadrado={width / 2 - 30}
                        item={e}
                        key={"Ave" + column}
                        onPress={() =>
                          e.notAllowed
                            ? handleAventuraNoAutorizado(e)
                            : handlePressAventura(e, row, column)
                        }
                      />
                    );
                  })}
                </View>
              )
            )
          )}
          {
            // Si el numero de aventuras es par y hay aventuras
            aventurasAMostrar !== null &&
            aventuras?.length !== 0 &&
            aventurasAMostrar.length % 2 === 0 && (
              <View
                style={{
                  marginBottom: 15,
                }}
              >
                <AddElemento
                  tamañoCuadrado={width / 2 - 30}
                  onPress={() => handleAddAventura()}
                />
              </View>
            )
          }
        </View>
      </ScrollView>

      {esSelector && (
        <Boton
          style={{
            marginVertical: 20,
          }}
          loading={buttonLoading}
          titulo={"Continuar"}
          onPress={handleContinuar}
        />
      )}
    </View>
  );
};

function Header({ navigation, titulo }) {
  return (
    <View style={styles.selectContainer}>
      <Text style={styles.headerTitle}>{titulo}</Text>
      <MaterialIcons
        style={{
          padding: 5,
        }}
        onPress={() => navigation.pop()}
        name={"keyboard-arrow-left"}
        size={35}
        color={moradoOscuro}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorFondo,
    flex: 1,
    padding: 20,
    paddingBottom: 0,
    paddingTop: 10,
    position: "absolute",
    width,
    height,
  },

  filtrar: {
    borderRadius: 20,
  },

  selectContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  headerTitle: {
    flex: 1,
    position: "absolute",
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: moradoOscuro,
  },

  textInfo: {
    fontSize: 16,
    color: moradoClaro,
    textAlign: "center",
    marginBottom: 10,
  },
  noAventuras: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: moradoOscuro,
    marginTop: 20,
  },
});

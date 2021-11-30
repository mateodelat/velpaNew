import React, { useState } from 'react'
import {
    Dimensions,
    StyleSheet,
    View,
    ScrollView,
    Alert,
} from 'react-native'



import Boton from '../../components/Boton';
import { comisionVelpa, getUserSub, moradoClaro } from '../../../assets/constants';

import QueLlevar from './components/QueLlevar';
import Header from '../../components/header';
import HeaderMaterial from './components/HeaderMaterial';
import { DataStore } from '@aws-amplify/datastore';
import { Aventura } from '../../models';
import { EstadoAventura } from '../../models';
import { TipoNotificacion } from '../../models';
import { Notificacion } from '../../models';
import API from '@aws-amplify/api';
import { createAventura } from '../../graphql/mutations';

const { height } = Dimensions.get("window")

export default ({ navigation, route }) => {
    const aventura = route.params

    const [materialALlevar, setMaterialALlevar] = useState([["Obligatorio", ["material"]], ["Alimentacion", ["comida"]], ["Acampada", ["material"]]]);

    const [buttonLoading, setButtonLoading] = useState(false);
    const [modify, setModify] = useState(true);

    async function handleContinuar() {
        const sub = await getUserSub()


        setButtonLoading(true)

        // Filtrar a material con titulo
        const newMaterial = materialALlevar.filter(e => e[1].length !== 0)
        // Verificaciones
        const aventuraAEnviar = {
            ...aventura,
            materialDefault: JSON.stringify(newMaterial),
            comision: comisionVelpa,
            estadoAventura: EstadoAventura.PENDIENTE,
            usuarioID: sub,
        }

        // Existencia de parametros
        await API.graphql({ query: createAventura, variables: { input: aventuraAEnviar } })
            .then(async r => {
                // Notificacion de nueva aventura
                await DataStore.save(new Notificacion({
                    tipo: TipoNotificacion.SOLICITUDAVENTURA,

                    titulo: "Nueva solicitud",
                    descripcion: "Se ha creado una solicitud de aventura para " + aventura.titulo + " ,en breve nuestro equipo la revisara",
                    imagen: aventuraAEnviar.imagenDetalle[aventuraAEnviar.imagenFondoIdx],

                    usuarioID: sub,

                }))

                setButtonLoading(false)
                navigation.navigate("ExitoScreen", {
                    txtExito: "Solicitud enviada con exito, espera nuestra respuesta!!",
                })

            })
            .catch(e => {
                console.log(e)
                Alert.alert("Error", "Ocurrio un error creando la aventura")
            })
    }

    const handleModify = () => {
        setModify(!modify)
        if (modify) {
            const newMaterial = materialALlevar.filter(e => e[1].length !== 0)
            setMaterialALlevar(newMaterial)
        }

    }
    return (
        <View style={{ flex: 1, }}>
            <HeaderMaterial handleModify={handleModify} modify={modify} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.container}>
                <View style={{
                    marginBottom: 40,
                }}>
                    {/* Material a llevar */}
                    <View style={styles.queLlevarContainer}>
                        <QueLlevar
                            datos={materialALlevar}
                            modify={modify}
                            setDatos={setMaterialALlevar}
                        />
                    </View>

                    <View style={styles.line} />


                    <Boton
                        style={{
                            marginTop: 30,
                        }}
                        onPress={handleContinuar}
                        titulo={"Enviar"}
                    // loading={buttonLoading}
                    />

                </View>
            </ScrollView>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    textInput: {
        fontSize: 17,
        flex: 1,
        backgroundColor: "#f4f6f6",
        padding: 5,
        paddingLeft: 10,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: "transparent",
    },

    captionTxt: {
        fontSize: 15,
        color: "black",
        marginLeft: 5,
        marginBottom: 5,
    },


    queLlevarContainer: {
        flex: 1,
        minHeight: height - 225
    },
    line: {
        marginTop: 30,
        marginBottom: 10,
        borderTopWidth: .5,
        borderColor: moradoClaro,
        marginHorizontal: 20,

    },

    mapContainer: {
        width: '100%',
        height: height * 0.3,
        borderRadius: 7,
        overflow: "hidden",
        alignItems: 'center', justifyContent: 'center',
    },


    markerContainer: {
        backgroundColor: '#fff',
        alignItems: 'center', justifyContent: 'center',
        padding: 10,
        borderRadius: 200,
    },

    buscarContainer: {
        backgroundColor: "#f4f6f6",
        padding: 10,
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 7,
        flexDirection: 'row',
    },
})

import React, { useEffect, useState } from 'react'
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native'
import { Entypo } from '@expo/vector-icons';

import { Loading } from '../../../../components/Loading';
import { formatAMPM, getDetalleFecha, getMaterialAventura, meses } from '../../../../../assets/constants';
import API from '@aws-amplify/api';

export const getFechaFull = /* GraphQL */ `
  query GetFecha($id: ID!) {
    getFecha(id: $id) {
        comision
        createdAt
        denyNinos
        denyTercera
        messagingID
        personasTotales
        precio
        updatedAt
    }
  }
`;


// Funcion que tiene un boton para esconder el modal y un id de aventura para fetcharlo
export default ({ setModalVisible, data }) => {

    const { aventuraID, titulo, fechaID, nickname, tipo } = data

    if (tipo !== "fecha") return <></>

    const [loading, setLoading] = useState(true);
    const [route, setRoute] = useState({ params: {} });
    const [fecha, setFecha] = useState({});

    const formatDate = (fecha) => {
        fecha = new Date(fecha)

        const mes = meses[fecha.getMonth()]
        const dia = fecha.getDate()

        const hora = fecha.getHours()
        const minutos = fecha.getMinutes()
        const segundos = fecha.getSeconds()

        const result = dia + " " + mes + " " + formatAMPM(fecha)
        return result
    }

    useEffect(() => {
        fetch()
    }, []);

    const fetch = async () => {
        let result = await API.graphql({ query: getMaterialAventura, variables: { id: aventuraID } })

        const { materialAcampada, materialObligatorio, materialOpcional, alimentacion } = result.data.getAventura

        setRoute({
            params: {
                fechaID,
                materialAcampada,
                materialObligatorio,
                materialOpcional,
                alimentacion
            }
        })

        API.graphql({
            query: getFechaFull, variables: {
                id: fechaID
            }
        }).then(r => {
            r = r.data.getFecha
            setFecha(r)
            setLoading(false)
        })


    }
    const fechaCreado = formatDate(fecha.createdAt)
    const fechaUpdate = formatDate(fecha.updatedAt)


    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <View style={styles.header}>
                    <Pressable
                        onPress={() => setModalVisible(false)}
                        style={styles.button}
                    >
                        <Entypo name="cross" size={25} color="black" />
                    </Pressable>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 18,
                    }}>{titulo}</Text>

                </View>
                {loading ?
                    <Loading />
                    :

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={styles.body}>

                        <Text
                            style={{
                                fontWeight: 'bold',
                                textAlign: 'center',
                                fontSize: 18,
                            }}>{nickname} el {fechaCreado}</Text>
                        <Text style={styles.textoDesc}>Ultima actualizacion: {fechaUpdate}</Text>


                        <DetalleFecha
                            route={route}
                            admin={true}
                        />
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Text style={styles.textoDesc}>Permitir niños: </Text>
                            {fecha.denyNinos ?
                                <Entypo name="cross" size={30} color="red" />
                                :
                                <Entypo name="check" size={25} color="green" />
                            }

                        </View>


                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Text style={styles.textoDesc}>Permitir tercera edad: </Text>
                            {fecha.denyTercera ?
                                <Entypo name="cross" size={30} color="red" />
                                :
                                <Entypo name="check" size={25} color="green" />
                            }

                        </View>

                        <Text style={styles.textoDesc}>Id chat: {fecha.messagingID}</Text>

                        <Text style={styles.textoDesc}>Precio puesto por guia: ${fecha.precio}</Text>
                        <Text style={styles.textoDesc}>Personas maximas: {fecha.personasTotales}</Text>
                    </ScrollView>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    // Estilos del modal
    modalView: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

        overflow: "hidden"
    },
    centeredView: {
        flex: 1,
        padding: 15,
    },

    header: {
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    button: {
        position: 'absolute',
        left: 20,
        padding: 8,
    },

    body: {
        margin: 20,
    },

    textoDesc: {
        textAlign: 'center',
        fontSize: 18,
        marginVertical: 10,
    }
})

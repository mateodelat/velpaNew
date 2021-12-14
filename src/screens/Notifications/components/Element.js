import React, { useEffect, useState } from 'react'
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native'

import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';


import { moradoOscuro } from '../../../../assets/constants';
import { TipoNotificacion } from '../../../models';
import moment from 'moment';

const sizeIcon = 30
const Icon = ({ tipo }) => {
    switch (tipo) {
        case TipoNotificacion.RESERVACREADA:
            return <FontAwesome5
                name="calendar-check"
                size={sizeIcon}
                color={"black"}
            />

        case TipoNotificacion.RESERVAENFECHA:
            return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>

                <FontAwesome5 name="calendar-alt" size={sizeIcon} color="black" />
                <View
                    style={{
                        position: 'absolute',
                        right: -5,
                        top: 2,
                        borderRadius: 20,
                        padding: 3,
                        backgroundColor: '#fff',

                    }}
                >
                    <View style={{
                        width: 10,
                        height: 10,
                        backgroundColor: moradoOscuro,
                        borderRadius: 20,

                    }} />
                </View>
            </View>

        case TipoNotificacion.FECHACREADA:
            return <FontAwesome5
                name="calendar-plus"
                size={sizeIcon}
                color={"black"}
            />


        case TipoNotificacion.SOLICITUDGUIAAPROVADA:
            return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>

                <MaterialIcons name="notes" size={sizeIcon} color="black" />
                <Entypo
                    style={{
                        position: 'absolute',
                        right: -7,
                        top: -2,
                        backgroundColor: '#fff',
                        borderRadius: 20,
                        padding: 2,
                    }}
                    name="check" size={18} color={"green"}
                />
            </View>

        case TipoNotificacion.SOLICITUDGUIA:
            return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>

                <MaterialIcons name="notes" size={sizeIcon} color="black" />
                <Entypo
                    style={{
                        position: 'absolute',
                        right: -7,
                        top: -2,
                        backgroundColor: '#fff',
                        borderRadius: 20,
                        padding: 2,
                    }}
                    name="plus" size={18} color="black"
                />
            </View>


        case TipoNotificacion.SOLICITUDAVENTURA:
            return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>

                <FontAwesome5 name="mountain" size={sizeIcon} color="black" />
                <Entypo
                    style={{
                        position: 'absolute',
                        right: -7,
                        top: -2,
                        backgroundColor: '#fff',
                        borderRadius: 20,
                        padding: 2,
                    }}
                    name="plus" size={18} color="black"
                />
            </View>

        case TipoNotificacion.RECORDATORIOFECHA:
            return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>

                <MaterialCommunityIcons name="bell-ring-outline" size={sizeIcon + 5} color="black" />

            </View>


        case TipoNotificacion.CALIFICAUSUARIO:
            return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>

                <Feather name="user-check" size={sizeIcon} color="black" />
            </View>


        default:
            return <Image
                style={{ flex: 1, width: '100%', height: '100%', }}
                source={require("../../../../assets/VELPA.png")}
            />
            break;
    }
}

export default ({
    titulo,
    descripcion,
    tiempo: time,
    onPress,
    leido,
    tipo
}) => {

    const [tiempo, setTiempo] = useState(() => moment(time).from(moment()));

    useEffect(() => {
        const i = setInterval(() => {
            setTiempo(() => moment(time).from(moment()))
        }, 1000)

        return () => {

            clearTimeout(i)
        }
    }, [tiempo]);
    return (
        <Pressable
            onPress={onPress}
            style={styles.container}>
            {/* Puntito de notificacion */}
            {!leido && <View style={styles.unread}>

            </View>}

            {/* Imagen de notificacion */}
            <View style={styles.image}>
                <Icon
                    tipo={tipo}
                />

            </View>

            {/* Textos */}
            <View style={styles.textos}>
                <View style={{ flex: 1, }}>
                    <Text style={styles.titulo}
                        numberOfLines={1}
                    >{titulo}</Text>
                    <Text style={styles.descripcion}>{descripcion}</Text>

                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, }}>
                    <AntDesign name="clockcircle" size={15} color="gray" />

                    <Text style={styles.tiempo}>{tiempo}</Text>
                </View>

            </View>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        // paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },

    image: {
        width: 45,
        height: 45,
        alignItems: 'center', justifyContent: 'center',
        borderRadius: 60,
        marginRight: 10,
        backgroundColor: '#fff',
    },

    textos: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },

    titulo: {
        fontWeight: 'bold',
    },

    descripcion: {
        fontSize: 11,
        lineHeight: 13,
    },

    tiempo: {
        fontSize: 10,
        marginLeft: 4,
    },

    unread: {
        backgroundColor: moradoOscuro,
        height: 6,
        width: 6,
        position: 'absolute',
        left: 5,
        borderRadius: 10,
    }

})

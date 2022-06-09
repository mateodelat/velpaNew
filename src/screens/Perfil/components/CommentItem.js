import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import moment from 'moment';
import { moradoOscuro } from '../../../../assets/constants';
import Line from '../../../components/Line';

moment.locale('es')


export default function ({ content }) {
    const redondear = (numero, entero) => {
        if (!numero) return 0
        numero = (Math.round(numero / entero) * entero).toFixed(1)



        return numero
    }


    const nombre = content.owner.nombre ?
        (content.owner.nombre + " " + content.owner.apellido)
        : content.owner.nicnkame
    return (
        <View
            style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{ uri: content.owner.foto }}
                    style={styles.imageComent}
                />
                <View style={{ flex: 1, }}>
                    <Text style={styles.bold}>{nombre}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        {
                            content.calificacion !== null ?
                                [...Array(content.calificacion).keys()].map(e => (
                                    <Entypo
                                        key={e}
                                        style={styles.star}
                                        name="star"
                                        size={22}
                                        color="#F5BE18"
                                    />
                                ))
                                : null
                        }

                        <Text style={{ ...styles.bold, marginLeft: 5, flex: 1, }}>{redondear(content.calificacion, 1)}</Text>

                        <Text style={styles.timeAgo}>{moment(content.createdAt).fromNow()}</Text>

                    </View>

                </View>
            </View>
            {content.body && <Text style={styles.content}>{content.body}</Text>}

        </View>)
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },

    imageComent: {
        height: '100%',
        aspectRatio: 1,
        borderRadius: 100,
        marginRight: 20,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },

    bold: {
        fontWeight: 'bold',
    },

    timeAgo: {
        color: moradoOscuro,

    },

    content: {
        marginTop: 20,
        marginLeft: 20,
        color: moradoOscuro,

    }


})

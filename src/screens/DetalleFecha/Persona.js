import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import Calificacion from '../../components/Calificacion';



export default function ({ onPress, usuario }) {
    return (
        <Pressable
            onPress={onPress}
            style={{
                marginVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
            }}>

            <View style={styles.foto}>
                {usuario?.foto ? <Image
                    source={{ uri: usuario?.foto }} style={{ flex: 1 }} />
                    : <Feather
                        style={{
                            backgroundColor: "#f4f4f4",
                            borderRadius: 15,
                        }}
                        name="user"
                        size={50}
                        color="black"
                    />}
            </View>

            <View style={{ alignItems: 'flex-start', flex: 1, marginLeft: 15, }}>
                {(usuario.nombre || usuario.apellido) && <Text numberOfLines={1} style={{ fontSize: 16, }}>{usuario?.nombre} {usuario?.apellido}</Text>}
                <Text numberOfLines={1} style={styles.nickname}>@{usuario?.nickname}</Text>
            </View>

            {!!usuario && <Calificacion
                // hideNumResenas
                usuario={usuario}
            />}


        </Pressable >
    )
}

const styles = StyleSheet.create({

    foto: {
        width: 50,
        height: 50,
        borderRadius: 15,
        overflow: "hidden"
    },


    nickname: {
        fontSize: 16,
    }

})
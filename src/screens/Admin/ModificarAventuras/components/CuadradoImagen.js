import React, { useState } from 'react'
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native'

import { colorFondo, moradoOscuro, verdeTurquesa } from '../../../../../assets/constants';
import Flecha from '../../../../components/Flecha';
import { Loading } from '../../../../components/Loading';

import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { EstadoAventura } from '../../../../models';


const CuadradoImagen = ({
    tamañoCuadrado,
    style,
    item,
    selected,

    onPress,
    onLongPress,
    handleSelectElemento
}) => {
    const showSelected = selected === undefined ? false : true
    const estadoAventura = item.estadoAventura

    const [loading, setLoading] = useState(true);
    return (
        <Pressable
            onLongPress={onLongPress}
            onPress={showSelected ? handleSelectElemento : onPress}
            style={{
                borderRadius: 15,
                overflow: "hidden",
                width: tamañoCuadrado,
                height: tamañoCuadrado + 10,
                ...style
            }}>
            {/* Imagenes */}
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                {loading && <Loading containerStyle={{ position: 'absolute', }} indicator />}
                {item.imagenDetalle.length !== 0 && <Image
                    source={{ uri: item.imagenDetalle[item.imagenFondoIdx].uri }}
                    loadingIndicatorSource={<Loading indicator />}
                    onLoadEnd={() => {
                        setLoading(false)
                    }}
                    style={{
                        flex: 1,
                        width: '100%',
                        resizeMode: 'cover',
                    }} />}

            </View>

            <View style={{
                backgroundColor: '#F4F6F6',
                justifyContent: 'flex-end',
                padding: 7,
                paddingBottom: 10,
                height: 60,
                justifyContent: 'center',
            }}>

                <View style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginBottom: 3,
                }}>
                    <Text
                        numberOfLines={1}
                        style={{
                            flex: 1,
                            color: '#000',
                            fontSize: 16,
                        }}>{item?.titulo}</Text>

                    {/* {!showSelected && <Flecha />} */}
                </View>

                <View style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                }}>
                    <Ionicons name="person" size={15} color="gray" />
                    <Text
                        numberOfLines={1}
                        style={{
                            color: 'gray',
                            fontSize: 12,
                            marginLeft: 5,
                        }}>@{item?.usuario?.nickname}</Text>

                </View>
            </View>

            {/* Bolita de seleccionar elemento */}
            {showSelected &&
                <View style={styles.puntitoSelected}>

                    <View style={{
                        ...styles.puntitoInterior,
                        backgroundColor: selected ? moradoOscuro : "transparent",
                    }} />

                </View>

            }

            {/* Estado de la aventura condicional*/}
            <View style={{
                ...styles.estadoContainer,
                backgroundColor:
                    estadoAventura === EstadoAventura.AUTORIZADO ? verdeTurquesa
                        : estadoAventura === EstadoAventura.PENDIENTE ? "orange" :
                            '#d90936'
            }}>
                {
                    estadoAventura === EstadoAventura.AUTORIZADO ?
                        <AntDesign name="check" size={13} color="#fff" />
                        : estadoAventura === EstadoAventura.PENDIENTE ?
                            <Feather name="clock" size={13} color="white" />
                            :
                            <Feather name="x" size={13} color="white" />
                }
            </View>



        </Pressable >
    )
}

export default CuadradoImagen

const styles = StyleSheet.create({

    puntitoSelected: {
        backgroundColor: colorFondo,
        borderRadius: 10,
        opacity: 1,
        position: 'absolute',
        left: 10,
        top: 10,
        padding: 5,
    },

    puntitoInterior: {
        width: 10,
        height: 10,
        borderRadius: 10,

    },

    estadoContainer: {
        position: 'absolute',
        top: 7,
        right: 7,
        borderRadius: 20,
        padding: 3,
    }
})

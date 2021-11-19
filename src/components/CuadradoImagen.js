import React, { useState } from 'react'
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native'

import { Feather } from '@expo/vector-icons';
import Flecha from './Flecha';
import { colorFondo, moradoOscuro } from '../../assets/constants';
import { Loading } from './Loading';


const CuadradoImagen = ({
    tamañoCuadrado,
    onPress,
    style,
    item,
    selected,

    notAllowed
}) => {

    const [loading, setLoading] = useState(true);
    const showSelected = selected !== undefined
    return (
        <Pressable
            onPress={onPress}
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
                <Image
                    source={{ uri: item?.imagenDetalle[item?.imagenFondoIdx] }}
                    loadingIndicatorSource={<Loading indicator />}
                    onLoadEnd={() => {
                        setLoading(false)
                    }}
                    style={{
                        flex: 1,
                        width: '100%',
                        resizeMode: 'cover',
                    }} />

            </View>

            <View style={{
                backgroundColor: '#F4F6F6',
                justifyContent: 'flex-end',
                padding: 7,
                paddingBottom: 10,
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

                    {!showSelected && !notAllowed && <Flecha />}
                </View>

                <View style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <View style={{ flexDirection: 'row', }}>
                        <Feather name="clock" size={15} color="gray" />
                        <Text
                            numberOfLines={1}
                            style={{
                                color: 'gray',
                                fontSize: 12,
                            }}> {item?.duracion}</Text>

                    </View>

                    <View style={{ flexDirection: 'row', }}>
                        <Image
                            source={require("../../assets/icons/elevation.png")}
                            style={{
                                tintColor: "gray",
                                height: 20,
                                width: 20,
                            }}
                        />
                        <Text
                            numberOfLines={1}
                            style={{
                                color: 'gray',
                                fontSize: 12,
                            }}> {item?.altimetriaRecorrida}m</Text>

                    </View>


                </View>
            </View>

            {showSelected && <View style={{
                ...styles.puntitoSelected,

            }}>
                <View style={{
                    ...styles.puntitoInterior,
                    backgroundColor: selected ? moradoOscuro : "transparent",
                }}>

                </View>

            </View>}
            {notAllowed && <View style={styles.filtroNegro} />}

        </Pressable>
    )
}

export default CuadradoImagen

const styles = StyleSheet.create({
    puntitoSelected: {
        backgroundColor: colorFondo,
        borderRadius: 10,
        position: 'absolute',
        left: 10,
        top: 10,
        opacity: 1,
        padding: 5,
    },

    puntitoInterior: {
        width: 10,
        height: 10,
        borderRadius: 10,

    },

    filtroNegro: {
        width: '100%',
        height: '100%',
        backgroundColor: '#00000050',
        position: 'absolute',
    }
})

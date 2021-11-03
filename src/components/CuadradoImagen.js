import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

import { Feather } from '@expo/vector-icons';
import Flecha from './Flecha';
import { colorFondo, moradoClaro } from '../../assets/constants';


const CuadradoImagen = ({
    tamañoCuadrado,
    onPress,
    style,
    titulo,
    selected,

    notAllowed
}) => {
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
            <Image
                source={require("../../assets/IMG/Montana.jpg")}
                style={{
                    flex: 1,
                    width: '100%',
                    resizeMode: 'cover',
                }} />

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
                        }}>{titulo}</Text>

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
                            }}> 1-2 dias</Text>

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
                            }}> 860m</Text>

                    </View>


                </View>
            </View>

            {showSelected && <View style={{
                ...styles.puntitoSelected,

            }}>
                <View style={{
                    ...styles.puntitoInterior,
                    backgroundColor: selected ? moradoClaro : "transparent",
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
        opacity: 0.8,
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

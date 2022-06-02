import React, { useState } from 'react'
import { Alert, Animated, Dimensions, Image, ImageBackground, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native'

import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { moradoOscuro, } from '../../assets/constants';

import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default ({
    titulo,
    scrollY,
    imagen,
    maxHeight,
    showFilter
}) => {
    const { width } = Dimensions.get("screen")

    const navigation = useNavigation()

    const inputRangeHeader = [
        0,
        125,
    ]
    const insets = useSafeAreaInsets()

    const heightHeader = scrollY.interpolate({
        inputRange: inputRangeHeader,
        outputRange: [maxHeight, 75.6 + insets.top]
    })


    const tituloIzquierda = scrollY.interpolate({
        inputRange: inputRangeHeader,
        outputRange: [20, 75]
    })


    return (
        <Animated.View style={{
            height: heightHeader,
            width: '100%',
            position: 'absolute',
            minHeight: 75.6 + insets.top
        }}>
            <ImageBackground
                source={imagen}
                style={{
                    width: "100%",
                    height: '100%',
                }} >

                {/* Filtro negro */}
                <View style={{
                    backgroundColor: moradoOscuro + "40",
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                }} />

                <View style={{
                    position: 'absolute',
                    bottom: 20,
                    left: 0,
                    flexDirection: 'row',
                }}>
                    <Animated.View
                        style={{
                            width: tituloIzquierda,
                            maxWidth: 75,
                        }}
                    />
                    <Animated.Text
                        numberOfLines={1}
                        style={{
                            fontSize: 25,
                            color: '#fff',
                            textAlign: 'center',
                            width: width - (75 * 2),
                        }}>{titulo}</Animated.Text>

                </View>


                {/* Controles*/}
                <View style={{
                    justifyContent: 'space-between',
                    padding: 20,
                    paddingTop: insets.top + 20,
                    flexDirection: 'row',
                }}>
                    <MaterialIcons
                        onPress={() => navigation.pop()}
                        name={"keyboard-arrow-left"}
                        size={32}
                        color={"#fff"}
                        style={{
                            // backgroundColor: 'red',
                            position: 'absolute',
                            left: 10,
                            top: 10,
                            padding: 10,
                        }}
                    />

                    {showFilter && <AntDesign
                        onPress={() => Alert.alert("Mostrar filtros", "Filtros por rango fecha, personas, duracion, precio")}
                        name="filter"
                        size={30}
                        color="white" />}
                </View>


            </ImageBackground>
        </Animated.View>


    )
}


const styles = StyleSheet.create({
    fecha: {
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 16,
        color: moradoOscuro,
    }
})

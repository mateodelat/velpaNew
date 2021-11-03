import React, { useState } from 'react'
import { Alert, Animated, Dimensions, Image, ImageBackground, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native'

import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { moradoClaro, moradoOscuro, } from '../../assets/constants';

import { useNavigation } from '@react-navigation/native';


export default index = ({
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

    const heightHeader = scrollY.interpolate({
        inputRange: inputRangeHeader,
        outputRange: [maxHeight, 70]
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
            minHeight: 75.6
        }}>
            <ImageBackground
                source={imagen}
                style={{
                    width: "100%",
                    height: '100%',
                }} >

                {/* Filtro negro */}
                <View style={{
                    backgroundColor: moradoOscuro + "20",
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                }} />

                {/* Controles*/}
                <View style={{
                    justifyContent: 'space-between',
                    padding: 20,
                    flexDirection: 'row',
                }}>
                    <MaterialIcons
                        onPress={() => navigation.pop()}
                        name={"keyboard-arrow-left"}
                        size={35}
                        color={"#fff"}
                    />

                    {showFilter && <AntDesign
                        onPress={() => Alert.alert("Mostrar filtros", "Filtros por rango fecha, personas, duracion, precio")}
                        name="filter"
                        size={30}
                        color="white" />}
                </View>
                <View style={{
                    position: 'absolute',
                    bottom: 20,
                    left: 0,
                    flexDirection: 'row',
                }}>
                    <Animated.View
                        style={{
                            width: tituloIzquierda,
                            maxWidth: 75
                        }}
                    />
                    <Animated.Text
                        numberOfLines={1}
                        style={{
                            fontSize: 25,
                            fontWeight: "100",
                            color: '#fff',
                            textAlign: 'center',
                            width: width - (75 * 2),
                        }}>{titulo}</Animated.Text>

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
        color: moradoClaro,
    }
})
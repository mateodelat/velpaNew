import React from 'react'
import { Animated, Pressable, StyleSheet, View } from 'react-native'
import { moradoClaro, moradoOscuro } from '../../../assets/constants'


import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';



export default ({ scrollY, height, titulo, modalActive }) => {
    const navigation = useNavigation()

    const inputRange = [
        height * 0.10,
        height * 0.28,
    ]

    const opacity = scrollY.interpolate({
        inputRange,
        outputRange: [0, 1]
    })


    const opacityBackground = scrollY.interpolate({
        inputRange,
        outputRange: [0, 1]
    })

    if (modalActive) return <View style={{
        ...styles.container,
        backgroundColor: "#000",
        height: 30,
    }} />

    return (
        <View style={styles.container}>
            {/* Header con animaciones de fondo y titulo */}
            {/* Filtro morado de header */}
            <Animated.View style={{
                position: 'absolute',
                backgroundColor: moradoOscuro,
                opacity: opacityBackground,
                width: '100%',
                height: '100%',
            }} />


            <View style={styles.rowJustify}>
                <Pressable
                    onPress={() => navigation.pop()}
                    style={styles.backContainer}>
                    <MaterialIcons
                        name={"keyboard-arrow-left"}
                        size={35}
                        color={moradoOscuro}
                    />
                </Pressable>

                {/* Texto animado cuando se pasa la imagen */}
                <Animated.Text
                    numberOfLines={1}
                    style={{
                        ...styles.title
                        , opacity: opacity
                    }}>{titulo}</Animated.Text>

                <Pressable
                    style={{
                        ...styles.backContainer,
                        opacity: 0
                    }}>
                    <MaterialIcons
                        name={"keyboard-arrow-left"}
                        size={35}
                        color={moradoOscuro}
                    />
                </Pressable>
            </View>
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
    },

    rowJustify: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },

    backContainer: {
        alignSelf: 'flex-start',
        padding: 4,
        backgroundColor: '#fff',
        borderRadius: 20,
    },

    title: {
        fontSize: 20,
        flex: 1,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },


})

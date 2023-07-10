import React from 'react'
import {
    Animated,
    Dimensions,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native'

import { colorFondo, moradoClaro } from '../../../assets/constants'
import HeaderDetalleAventura from '../../navigation/components/HeaderDetalleAventura'



export default function ({ route }) {
    const { image, titulo } = route?.params


    const { width, height } = Dimensions.get("screen")



    // Variables de animacion
    const scrollY = React.useRef(new Animated.Value(0)).current

    const inputRangeBody = [
        height * 0.13,
        height * 0.22,
    ]

    const opacityBody = scrollY.interpolate({
        inputRange: inputRangeBody,
        outputRange: [1, 0]
    })

    return (
        <View style={{ flex: 1, }}>
            {/* Imagen de fondo */}
            <Image source={image} style={{
                height: height * 0.33,
                width: '100%',
                position: 'absolute',

            }} />



            {/* Cuerpo */}
            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
            >
                {/* Contenedor del tamaño de la imagen de fondo */}
                <View style={{
                    height: height * 0.33,
                }} />

                <View style={styles.body}>
                    {/* Titulo antes de scrollear */}
                    <Animated.Text style={{
                        fontSize: 18,
                        color: moradoClaro,
                        textAlign: 'left',
                        opacity: opacityBody
                    }}>{titulo}</Animated.Text>

                </View>

            </Animated.ScrollView>
            <HeaderDetalleAventura
                scrollY={scrollY}
                height={height}
                titulo={titulo}
            />


        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        borderRadius: 20,
        height: 4000,
        bottom: 20,
        backgroundColor: colorFondo,
        padding: 20,
    }

})

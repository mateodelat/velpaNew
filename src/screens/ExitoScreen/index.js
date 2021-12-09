import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { colorFondo, moradoOscuro } from '../../../assets/constants'
import { vibrar } from '../../../assets/constants/constant'

export default ({ navigation,
    route
}) => {

    useEffect(() => {
        vibrar('sucess')
    }, []);

    let txtExito = route.params?.txtExito
    let onPress = route.params?.onPress
    let txtOnPress = route.params?.txtOnPress

    txtExito = txtExito ? txtExito : "pago exitoso"
    onPress = onPress ? onPress : () => navigation.popToTop()
    txtOnPress = txtOnPress ? txtOnPress : "Volver al inicio"

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header} />


            <Image
                source={require("./components/imgExitoso.png")} style={{
                    width: 185,
                    height: 150,
                }} />
            <Text style={styles.txt}>{txtExito}</Text>

            <TouchableOpacity
                onPress={onPress}
                style={styles.buttonContainer}>
                <Text style={styles.buttonTxt}>{txtOnPress}</Text>
            </TouchableOpacity>

        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        alignItems: 'center', justifyContent: 'center',
        flex: 1,
        backgroundColor: colorFondo,
    },

    header: {
        height: 60,
        backgroundColor: moradoOscuro,
        position: 'absolute',
        top: 0,
        width: '100%',
    },

    txt: {
        fontSize: 16,
        marginTop: 15,
        marginHorizontal: 20,
        textAlign: 'center',
    },

    buttonContainer: {
        marginTop: 20,

        width: '40%',
        padding: 20,
        borderRadius: 10,
        backgroundColor: moradoOscuro,
        alignItems: 'center', justifyContent: 'center',

    },

    buttonTxt: {
        color: '#fff',
        fontSize: 16,
    }
})

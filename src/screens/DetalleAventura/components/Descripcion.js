import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'

const Descripcion = ({ descripcion }) => {

    const [detallesAbierto, setDetallesAbierto] = useState(false);

    const handleMas = () => {
        if (!detallesAbierto) {
            setDetallesAbierto(true)

        }

        else {
            setDetallesAbierto(false)

        }
    }


    return (
        <View style={styles.container}>
            <Text
                numberOfLines={detallesAbierto ? null : 3}
                style={styles.descripcion}

            >{descripcion}</Text>
            <Text style={styles.mas} onPress={handleMas}>{detallesAbierto ? "Ocultar" : "Ver mas"}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 17,
    },

    descripcion: {
        color: '#00000099',
        fontSize: 18,
        lineHeight: 20,
        marginTop: 10,
    },

    mas: {
        color: "#5b5b5b",
        textDecorationLine: "underline",
        fontSize: 18,
        marginTop: 10,
    },

});

export default Descripcion;
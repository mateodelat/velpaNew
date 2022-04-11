import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default ({
    cantidad,
    precio,

    titulo,
}) => {

    return (
        <View style={styles.container}>
            {/* Titulos */}
            <View style={{ width: '50%', }}>
                <Text style={styles.titulo}>{titulo}</Text>
                <Text style={styles.descripcion}>{`($ ${Math.round(precio)}/persona)`}</Text>
            </View>


            {!cantidad ? <Text style={styles.cantidad}>x{cantidad}</Text>
                : <Text style={styles.cantidad}>x{cantidad}</Text>}

            {cantidad ? <Text style={styles.precio}>$ {Math.round(precio) * cantidad}</Text>
                : <Text style={styles.precio}>-</Text>}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 10,

    },

    titulo: {
        fontSize: 18,
        // fontWeight: 'bold',
    },

    descripcion: {
        fontSize: 14,
        color: '#aaa',

    },

    cantidad: {
        width: 40,
        fontSize: 18,
        flex: 1,
    },

    precio: {
        width: '20%',
        // textAlign: 'center',
        fontSize: 18,
    }

})

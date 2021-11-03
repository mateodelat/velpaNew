import React from 'react'
import { TouchableOpacity, StyleSheet, Text, ActivityIndicator } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { moradoOscuro } from '../../assets/constants';

export default ({ onPress, titulo, loading, done, style }) => {
    if (loading !== undefined) {
        return (

            <TouchableOpacity
                disabled={
                    done ||
                    loading
                }
                style={[styles.boton, style]}
                onPress={onPress}>
                {loading ?
                    <ActivityIndicator
                        color={"white"}
                        size={'small'}
                    />
                    : done ?
                        <Entypo name="check" size={24} color="white" /> :
                        <Text style={{
                            fontSize: 16,
                            color: 'white',
                        }}>{titulo}</Text>
                }
            </TouchableOpacity>
        )
    }

    return (
        <TouchableOpacity
            style={[styles.boton, style]}
            onPress={onPress}>
            <Text style={{
                fontSize: 16,
                color: 'white',
                fontWeight: 'bold',
            }}>{titulo}</Text>
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    boton: {
        borderRadius: 10,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: moradoOscuro,
    },
});
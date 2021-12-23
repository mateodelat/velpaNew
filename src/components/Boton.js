import React from 'react'
import { TouchableOpacity, StyleSheet, Text, ActivityIndicator } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { tinto, moradoOscuro } from '../../assets/constants';

export default ({ onPress,
    titulo,
    loading,
    done,
    style,
    disabled,
    red
}) => {
    if (loading !== undefined) {
        return (

            <TouchableOpacity
                disabled={disabled !== undefined ? disabled : (
                    done ||
                    loading)
                }
                style={[{ backgroundColor: red ? tinto : moradoOscuro }, styles.boton, style,]}
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
            style={[{ backgroundColor: red ? tinto : moradoOscuro }, styles.boton, style,]}
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
    },
});
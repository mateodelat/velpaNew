import React from 'react'
import { StyleSheet, Text, Pressable, View } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { moradoOscuro } from '../../assets/constants';


const RadioButton = ({ checked, color }) => {
    color = color ? color : moradoOscuro
    return (
        <View
            style={{ ...styles.container, borderColor: color, backgroundColor: checked ? moradoOscuro : null }}>
            {checked && <Entypo name="check" size={20} color={"#fff"} />}
        </View>
    )
}

export default RadioButton

const styles = StyleSheet.create({
    container: {
        borderWidth: .5,
        width: 30,
        height: 30,
        alignItems: 'center', justifyContent: 'center',
        borderRadius: 30,
    }
})

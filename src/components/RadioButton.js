import React from 'react'
import { StyleSheet, Text, Pressable } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { moradoOscuro } from '../../assets/constants';


const RadioButton = ({ checked, setChecked, color }) => {
    color = color ? color : moradoOscuro
    return (
        <Pressable
            onPress={() => setChecked(!checked)}
            style={{ ...styles.container, borderColor: color, backgroundColor: checked ? moradoOscuro : null }}>
            {checked && <Entypo name="check" size={20} color={"#fff"} />}
        </Pressable>
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

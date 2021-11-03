import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const AddButton = ({ onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.container}>
            <Text style={{
                fontSize: 30,
                color: 'white'
            }}>+</Text>
        </TouchableOpacity>
    )
}

export default AddButton

const styles = StyleSheet.create({
    container: {
        opacity: 1,
        borderRadius: 50,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: 'gray',
        top: 10,
        right: 10,
    }
})

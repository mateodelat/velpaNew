import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Line = ({ style }) => {
    return (
        <View style={[styles.line, style]} />
    )
}

export default Line

const styles = StyleSheet.create({
    line: {
        margin: 20,

        borderTopWidth: 1,
        borderTopColor: 'lightgray',
    },


})

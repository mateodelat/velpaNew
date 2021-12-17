import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { moradoClaro, moradoOscuro } from '../../assets/constants'

import { LinearGradient } from 'expo-linear-gradient';


export default function ({
    style
}) {

    const expBaseLevel = 30
    const expNextLevel = 200
    const actualExp = 90

    const nivelRecorrido = Math.round(((actualExp - expBaseLevel) * 100) / (expNextLevel - expBaseLevel))

    return (
        <View style={{ ...style }}>
            <View style={styles.row}>
                <Text style={styles.baseLevel}>Nivel 1</Text>

                <Text numberOfLines={1} style={styles.expActual}>{actualExp}{nivelRecorrido > 25 && " exp"}</Text>

                <Text style={styles.nextLevel}>Nivel 2</Text>

            </View>

            <View style={styles.row}>
                <Text style={styles.experience}>{expBaseLevel} exp</Text>

                <View style={styles.levelContainer}>
                    <LinearGradient
                        colors={['#8b8ed6', moradoClaro, moradoOscuro]}
                        style={[styles.nivelRecorrido, { width: `${nivelRecorrido}%` }]}
                    >

                    </LinearGradient>


                </View>

                <Text style={[styles.experience, { textAlign: 'right', }]}>{expNextLevel} exp</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    levelContainer: {
        height: 5,
        borderRadius: 20,
        marginHorizontal: 10,
        backgroundColor: '#f5f5f5',
        overflow: 'hidden',
        flex: 1,

        justifyContent: 'center',
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
    },

    nivelRecorrido: {
        flex: 1,
        borderRadius: 20,
        minWidth: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    baseLevel: {
        fontWeight: 'bold',
    },

    experience: {
        color: "gray",
    },

    nextLevel: {
    },

    expActual: {
        color: '#fff',
        color: moradoOscuro,
        textAlign: 'center',
        fontSize: 13,
        marginBottom: 5,
        flex: 1,


        marginHorizontal: 5,

    }

})

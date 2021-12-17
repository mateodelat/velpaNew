import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { calculateLvl, moradoClaro, moradoOscuro } from '../../assets/constants'

import { LinearGradient } from 'expo-linear-gradient';
import HelpButton from './HelpButton';


export default function ({
    style,
    hideHelp,
    userExp
}) {
    userExp = userExp ? userExp : 0


    const {
        lvl,
        expBaseLevel,
        expNextLevel

    } = calculateLvl(userExp)


    const nivelRecorrido = Math.round(((userExp - expBaseLevel) * 100) / (expNextLevel - expBaseLevel))

    return (
        <View style={{ ...style }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,

            }}>

                <View style={{ alignItems: 'center', }}>
                    <Text style={styles.level}>Nivel {lvl}</Text>
                    <Text style={styles.experience}>{userExp}/{expNextLevel}</Text>
                </View>

                {!hideHelp && <HelpButton
                    style={{
                        position: 'absolute', right: 13,
                    }}
                />}
            </View>

            <View style={styles.levelContainer}>
                <LinearGradient
                    colors={['#8b8ed6', moradoClaro, moradoOscuro]}
                    style={[styles.nivelRecorrido, { width: `${nivelRecorrido}%` }]}
                >
                </LinearGradient>
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


        justifyContent: 'center',
    },

    nivelRecorrido: {
        flex: 1,
        borderRadius: 20,
        minWidth: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },

    header: {
        alignSelf: 'center',
    },

    experience: {
        color: "gray",
        fontSize: 12,
    },

    level: {
        fontWeight: 'bold',
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

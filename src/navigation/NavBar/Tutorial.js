import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'



export default function ({
    doneViewing
}) {
    const [step, setStep] = useState(0)

    return (

        <View
            onPress={() => {
                setStep(step + 1)
                console.log(step + 1)
            }}
            style={styles.container}>

            {/* Elemento de buscar */}
            {/* <RNHoleView
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(34,146,231,0.4)'
                }}
                holes={holes}
            >

            </RNHoleView> */}


            <Text>Tutorial de la app</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00000055',
    }
})

import React from 'react';
import { View, Image, ActivityIndicator } from 'react-native'
import Header from './header';
export const Loading = ({ containerStyle, valor, indicator, color }) => {
    valor !== undefined ? null : valor = 1

    if (indicator) {
        return <View style={{
            flex: 1,
            alignItems: 'center', justifyContent: 'center',
            ...containerStyle
        }}>
            <ActivityIndicator size={"large"} color={color ? color : "black"} />

        </View>
    }

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FCFCFD',
                ...containerStyle,
            }}>
            {!!valor ? <Image
                source={require("../../assets/IMG/velpaLoading.gif")} style={{
                    width: 100,
                    height: 100,
                }} /> : <Image source={require("../../assets/IMG/buscandoNorte.gif")}
                    style={{
                        width: 100,
                        height: 100,
                    }} />}
        </View>

    )
}



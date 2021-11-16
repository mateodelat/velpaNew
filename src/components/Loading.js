import React from 'react';
import { View, Image, ActivityIndicator } from 'react-native'
export const Loading = ({ containerStyle, valor, indicator }) => {
    valor !== undefined ? null : valor = 1

    if (indicator) {
        return <View style={{
            flex: 1,
            alignItems: 'center', justifyContent: 'center',

        }}>
            <ActivityIndicator size={"large"} color={"black"} />

        </View>
    }

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
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



import React from 'react';
import { View, Image } from 'react-native'
export const Loading = ({ containerStyle, valor }) => {
    valor !== undefined ? null : valor = 1

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



import React from 'react'
import { View } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { moradoOscuro } from '../../assets/constants';


const Flecha = () => {
    return (
        <View
            style={{
                borderRadius: 15,
                height: 20,
                width: 20,
                backgroundColor: moradoOscuro,
                alignItems: 'center', justifyContent: 'center',
            }}
        >
            <Feather
                name="arrow-right"
                size={13}
                color="#fff"
            />

        </View>
    )
}

export default Flecha

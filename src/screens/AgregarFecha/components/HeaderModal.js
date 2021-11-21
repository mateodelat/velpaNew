import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colorFondo, moradoClaro, moradoOscuro } from '../../../../assets/constants'
import { Entypo, Feather, MaterialIcons } from '@expo/vector-icons';

export default function ({
    handleCerrar,
    handleSave,

    titulo,
    style,
    modify,

    color
}) {

    return (
        <View style={[styles.container, style]}>
            <Text style={{
                flex: 1,
                fontSize: 20,
                color: color ? color : moradoOscuro,
                textAlign: 'center',
            }}>{titulo}</Text>


            <Entypo
                onPress={handleCerrar}
                name={"cross"}
                size={35}
                color={color ? color : moradoOscuro}
                style={styles.iconLeft}
            />
            {
                modify !== undefined && (modify ? <MaterialIcons
                    onPress={handleSave}
                    name={"check"}
                    size={35}
                    color={color ? color : "green"}
                    style={styles.iconRight}

                />
                    :
                    <Feather
                        onPress={handleSave}
                        name={"edit"}
                        size={35}
                        color={color ? color : moradoClaro}
                        style={styles.iconRight}

                    />)}


        </View>)
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colorFondo,
    },

    iconLeft: {
        position: 'absolute',
        left: 10,
    },


    iconRight: {
        position: 'absolute',
        right: 10,
    }


})

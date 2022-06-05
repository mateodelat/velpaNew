import React from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import { colorFondo, moradoClaro, moradoOscuro } from '../../../../assets/constants'
import { Entypo, Feather, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ({
    handleCerrar,
    handleSave,

    titulo,
    style,
    modify,

    color,

    buttonLoading,

    rightIcon,
}) {

    const insets = useSafeAreaInsets()
    return (
        <Pressable
            onPress={handleCerrar}

            style={{
                backgroundColor: colorFondo,
            }}>

            <View style={[styles.container, style, {
                marginTop: insets.top,
                height: insets.top ? 53 : 63
            }]}>
                <Text
                    numberOfLines={1}
                    style={{
                        flex: 1,
                        fontSize: 20,
                        color: color ? color : moradoOscuro,
                        textAlign: 'center',
                        marginHorizontal: 50,
                        fontWeight: 'bold',
                    }}>{titulo}</Text>


                <View style={styles.iconLeft}>

                    <Feather
                        name={"x"}
                        size={30}
                        color={color ? color : moradoOscuro}
                    />

                </View>

                {
                    rightIcon ? rightIcon :
                        modify !== undefined && (modify ?

                            buttonLoading ?
                                <View style={styles.iconRight}>
                                    <ActivityIndicator color={"#fff"} />

                                </View>
                                :
                                <View style={styles.iconRight}>

                                    <MaterialIcons
                                        onPress={handleSave}
                                        name={"check"}
                                        size={30}
                                        color={color ? color : "green"}

                                    />
                                </View>
                            :
                            <Feather
                                onPress={handleSave}
                                name={"edit"}
                                size={35}
                                color={color ? color : moradoClaro}
                                style={styles.iconRight}

                            />)}


            </View>
        </Pressable>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colorFondo,
        height: 63,
    },

    iconLeft: {
        position: 'absolute',
        paddingLeft: 10,

        height: 43,
        width: 43,
        alignItems: 'center', justifyContent: 'center',

    },


    iconRight: {
        position: 'absolute',
        right: 10,
        height: 43,
        width: 43,

        alignItems: 'center', justifyContent: 'center',
    }


})

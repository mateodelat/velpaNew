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
        <View

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


                <Pressable
                    onPress={handleCerrar}
                    style={{
                        ...styles.iconLeft,
                        height: insets.top ? 53 : 63,

                    }}>

                    <Feather
                        name={"x"}
                        size={30}
                        color={color ? color : moradoOscuro}
                    />

                </Pressable>

                {
                    rightIcon ? rightIcon :
                        modify !== undefined && (modify ?

                            buttonLoading ?
                                <View style={{
                                    ...styles.iconRight,
                                    height: insets.top ? 53 : 63,

                                }}>
                                    <ActivityIndicator color={"#fff"} />

                                </View>
                                :
                                <View style={{
                                    ...styles.iconRight,
                                    height: insets.top ? 53 : 63,

                                }}>

                                    <MaterialIcons
                                        onPress={handleSave}
                                        name={"check"}
                                        size={30}
                                        color={color ? color : moradoOscuro}

                                    />
                                </View>
                            :
                            <View style={{
                                ...styles.iconRight,
                                height: insets.top ? 53 : 63,

                            }}>
                                <Feather
                                    onPress={handleSave}
                                    name={"edit-2"}
                                    size={25}
                                    color={color ? color : moradoClaro}

                                />
                            </View>
                        )}


            </View>
        </View>

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
        paddingLeft: 15,

        padding: 18,
        alignItems: 'center', justifyContent: 'center',
    },


    iconRight: {
        position: 'absolute',
        right: 0,
        padding: 18,
        // backgroundColor: 'red',

        alignItems: 'center', justifyContent: 'center',
    }


})

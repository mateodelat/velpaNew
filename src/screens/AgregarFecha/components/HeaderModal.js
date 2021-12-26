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
                    }}>{titulo}</Text>


                <Entypo
                    name={"cross"}
                    size={35}
                    color={color ? color : moradoOscuro}
                    style={styles.iconLeft}
                />
                {
                    rightIcon ? rightIcon :
                        modify !== undefined && (modify ?

                            buttonLoading ?
                                <View style={{ ...styles.iconRight, width: 35, alignItems: 'center', }}>
                                    <ActivityIndicator color={"#fff"} />

                                </View>
                                :
                                <MaterialIcons
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
        left: 10,
        padding: 6,
    },


    iconRight: {
        position: 'absolute',
        right: 16,
    }


})

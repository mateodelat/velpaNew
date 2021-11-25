import React from 'react'
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native'
import { colorFondo, moradoClaro, moradoOscuro } from '../../../../assets/constants'

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';


export default function ({
    handleAgregarCert,
    certificaciones,

    eliminarCert,
    abrirImagenCert,

    certificacionEnabled,
    setCertificacionEnabled,
}) {
    return (
        <View style={styles.certificacionesContainer}>
            {/* Certificaciones */}
            <Pressable
                onPress={() => setCertificacionEnabled(!certificacionEnabled)}
                style={{
                    padding: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <MaterialCommunityIcons name="certificate" size={24} color="black" />
                <View style={styles.textContainer}>
                    <Text>¿Cuentas con alguna certificacion?</Text>
                </View>
                <Switch
                    trackColor={{
                        true: moradoOscuro + "20",
                        false: colorFondo
                    }}
                    thumbColor={moradoClaro}
                    onValueChange={() => setCertificacionEnabled(!certificacionEnabled)}
                    value={certificacionEnabled}
                />
            </Pressable>

            {
                certificacionEnabled
                && <View style={styles.mapCertificaciones}
                >

                    {/* Mapeo de certiFficaciones */}
                    {certificaciones.map((item, index) => {
                        return <Pressable
                            onPress={() => abrirImagenCert(item.uri, index)}
                            key={"archivo-", index}
                            style={{
                                flexDirection: 'row',
                                padding: 20,
                                paddingTop: 0,
                                alignItems: 'center',
                            }}>
                            <Text style={{
                                flex: 1,
                                textAlign: 'center',
                                color: 'blue',
                            }}>Imagen {index + 1}</Text>

                            <Feather name="minus" size={30} color="red" onPress={() => eliminarCert(index)} />
                        </Pressable>
                    })}
                    <Pressable
                        onPress={handleAgregarCert}
                        style={{
                            flexDirection: 'row',
                            padding: 20,
                            paddingTop: 0,
                            alignItems: 'center',
                        }}>
                        <Text style={{ flex: 1, textAlign: 'center', }}>Agregar certificacion</Text>
                        <Feather name="plus" size={30} color={moradoOscuro} />
                    </Pressable>


                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    certificacionesContainer: {
        borderRadius: 7,
        backgroundColor: "#fff",
        marginBottom: 40,
    },

    textContainer: {
        flex: 1,
        marginLeft: 15,
    },

})

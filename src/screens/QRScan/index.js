import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Dimensions, Alert } from 'react-native';
import { Camera } from 'expo-camera';

import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

const { height, width } = Dimensions.get("window")

export default function ({ cerrar, handleScanned }) {

    const [hasPermission, setHasPermission] = useState(null);

    const cameraRef = useRef()
    const [sound, setSound] = useState();

    const [cameraKey, setCameraKey] = useState(0);

    async function loadSound() {
        const { sound: s } = await Audio.Sound.createAsync(
            require('../../../assets/Sounds/QRScan.mp3')
        );

        setSound(s)
    }


    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');

            loadSound()
        })();

        return () => {
            sound?.unloadAsync()
        }
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }


    async function handleQrCodeScaned(data) {

        // Sonido de escaneo
        await sound.setPositionAsync(0)
        sound.playAsync()
        data = data?.data

        // Analizar el codigo escaneado
        try {
            data = JSON.parse(data)

            // Tiempo de retardo para volver a cargar la camara
            if (!data?.reserva) {
                Alert.alert("Error", "El codigo QR no es de una reservacion", [
                    {
                        onPress: reload,
                        text: "OK",
                    }
                ])
            }
            else {
                await handleScanned(data.reserva)
            }
            reload(0)


        } catch (e) {
            console.log(e)
            Alert.alert("Error", "El codigo QR no se pudo reconocer con el formato valido", [
                {
                    onPress: reload,
                    text: "OK",
                }
            ])
        }

        function reload(ms) {
            setTimeout(() => {
                setCameraKey(r => r + 1)

            }, ms ? ms : 1000);
        }



    }

    // function cerrar() {
    //     console.log({
    //         id: fecha.id,
    //         reservas: fecha.reservas.map(e => e.id)
    //     })


    // }


    const { width } = Dimensions.get("window")

    return (
        <View style={styles.container}>
            {/* Cabecera */}
            <View style={styles.header}>
                <Entypo
                    onPress={cerrar}

                    style={{
                        width: 40,
                    }}

                    name="cross" size={40} color="white" />


            </View>
            <View style={styles.camera}>
                <Camera
                    key={cameraKey}
                    onBarCodeScanned={handleQrCodeScaned}
                    ratio='4:3'
                    ref={cameraRef}
                    // useCamera2Api
                    style={StyleSheet.absoluteFill}
                    type={Camera.Constants.Type.back} />
                <MaterialCommunityIcons style={{ position: 'absolute', }} name="scan-helper" size={width - 80} color="white" />

            </View>
            <View style={{ flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center', padding: 20, }}>
                <Text style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: '#fff',
                    textAlign: 'center',

                }}>Escanear codigo qr de reservacion</Text>

            </View>

        </View>
    );
}
// react native
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        backgroundColor: '#000',

    },
    camera: {
        width: '100%',
        aspectRatio: 3 / 4,

        alignItems: 'center', justifyContent: 'center',

    },

    header: {
        height: 60,
        justifyContent: 'center',
        paddingHorizontal: 10,
    }
});
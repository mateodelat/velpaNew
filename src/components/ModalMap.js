import React, { useEffect, useRef, useState } from 'react'
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Alert,
    TextInput,
    Pressable,
    Keyboard,
    Modal,
} from 'react-native'


import MapView from "react-native-maps";





import { colorFondo, moradoOscuro, verificarUbicacion } from '../../assets/constants';


import { Loading } from './Loading';

import { Marker } from 'react-native-maps';
import HeaderModal from '../screens/AgregarFecha/components/HeaderModal';




const { height } = Dimensions.get("screen")

export default ({
    selectedPlace,

    modalVisible,
    setModalVisible
}) => {

    const [region, setRegion] = useState(null);

    const [locationPermision, setLocationPermision] = useState(null);

    useEffect(() => {
        if (locationPermision === null) {
            // Checar si la ubicacion esta activada
            verificarUbicacion()
                .then(async r => {
                    // Si no hay permisos de ubicacion
                    setLocationPermision(r)
                })

        }
        if (selectedPlace) {
            const region = {
                latitude: selectedPlace.latitude,
                longitude: selectedPlace.longitude,
                latitudeDelta: selectedPlace.latitudeDelta ? selectedPlace.latitudeDelta : 2,
                longitudeDelta: selectedPlace.longitudeDelta ? selectedPlace.longitudeDelta : 2,

            }
            setRegion(region)

        }

    }, [selectedPlace]);



    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View
                style={{ flex: 1, backgroundColor: colorFondo }}>
                {/* Header */}
                <HeaderModal
                    titulo={selectedPlace.titulo ? selectedPlace.titulo : "Mapa"}
                    handleCerrar={() => setModalVisible(false)}
                />


                <View style={{ flex: 1, }}>
                    {region && locationPermision !== null ? <MapView
                        provider={"google"}
                        mapType={"standard"}

                        showsUserLocation={locationPermision}
                        loadingEnabled={true}

                        loadingBackgroundColor={colorFondo}
                        initialRegion={region}
                        clusterColor={moradoOscuro}

                        style={{ ...StyleSheet.absoluteFill, }}
                    >
                        {/* Marcador de la ubicacion */}
                        {selectedPlace && <Marker
                            coordinate={region}
                        />}

                    </MapView> :
                        <Loading indicator />
                    }
                </View>
            </View>
        </Modal>
    )
}



const styles = StyleSheet.create({

})

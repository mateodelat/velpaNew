import React, { useState } from 'react'
import { Alert, Dimensions, StyleSheet, Text, View } from 'react-native'
import { colorFondo, container, moradoClaro } from '../../../../assets/constants'
import MapWithSearch from '../../../components/MapWithSearch'
import HeaderModal from './HeaderModal'

export default function ({ setModalVisible,
    setPuntoReunion,
    puntoReunion
}) {
    const { width, height } = Dimensions.get("window")

    const [selectedPlace, setSelectedPlace] = useState(puntoReunion);

    const handleCerrar = () => {
        setModalVisible(false)
    }

    const handleGuardar = () => {
        setPuntoReunion({
            ...selectedPlace
        })


        setModalVisible(false)
        Alert.alert("Exito", "Punto de reunion guardado con exito")
    }



    return (
        <View style={{
            flex: 1, position: 'absolute',
            width,
            height,
        }}>
            <HeaderModal
                style={{
                    backgroundColor: moradoClaro,
                }}
                handleCerrar={handleCerrar}
                titulo={"Punto de reunion"}
                color={"#fff"}


                modify={true}

                handleSave={handleGuardar}
            />
            <View style={styles.container}>
                <MapWithSearch
                    style={styles.map}
                    sugestionsContainerStyle={styles.sugestionsContainer}

                    previewTxt={null}
                    setSelectedPlace={setSelectedPlace}
                    selectedPlace={selectedPlace}
                />
                {!!selectedPlace && <Text
                    style={styles.nameLocationContainer}>{selectedPlace.ubicacionNombre}</Text>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorFondo,
        padding: 10,
    },

    nameLocationContainer: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
        left: 10,
        fontSize: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        textAlign: 'center',
        color: '#fff',
        backgroundColor: moradoClaro,

        borderBottomLeftRadius: 7,
        borderBottomRightRadius: 7,

    },

    map: {
        backgroundColor: colorFondo,
        padding: 0,
    },

    sugestionsContainer: {
        left: 0,
        top: 48,
    }

})

import React, { useState } from 'react'
import { Alert, Dimensions, StyleSheet, Text, View } from 'react-native'
import { colorFondo, moradoClaro } from '../../../../../assets/constants'
import HeaderModal from '../../../AgregarFecha/components/HeaderModal'
import MapWithSearch from '../../../../components/MapWithSearch'


export function ModalMap({ setModalVisible,
    handleGuardar,
    place,

    previewTxt,

    titulo
}) {
    const { width, height } = Dimensions.get("window")

    const [selectedPlace, setSelectedPlace] = useState(place);

    const handleCerrar = () => {
        setModalVisible(false)
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
                titulo={titulo ? titulo : "Ubicacion aventura"}
                color={"#fff"}


                modify={true}

                handleSave={() => handleGuardar(selectedPlace)}
            />
            <View style={styles.container}>
                <MapWithSearch
                    previewTxt={previewTxt}

                    sugestionsContainerStyle={styles.sugestionsContainer}

                    setSelectedPlace={setSelectedPlace}
                    selectedPlace={selectedPlace}
                />
                {!!selectedPlace && <Text
                    onPress={() => handleGuardar(selectedPlace)}
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
    },

    nameLocationContainer: {
        width: '100%',
        fontSize: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        textAlign: 'center',
        color: '#fff',
        backgroundColor: moradoClaro,

        borderBottomLeftRadius: 7,
        borderBottomRightRadius: 7,

    },

    sugestionsContainer: {
        left: 0,
        top: 48,
    }

})

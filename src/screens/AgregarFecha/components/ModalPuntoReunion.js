import React, { useState } from 'react'
import { Alert, Dimensions, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colorFondo, container, moradoClaro } from '../../../../assets/constants'
import MapWithSearch from '../../../components/MapWithSearch'
import HeaderModal from './HeaderModal'

export default function ({ setModalVisible,
    handleGuardar,
    puntoReunion
}) {
    const { width, height } = Dimensions.get("window")

    const [selectedPlace, setSelectedPlace] = useState(puntoReunion);

    const handleCerrar = () => {
        setModalVisible(false)
    }



    return (
        <View style={{
            flex: 1,
        }}>
            <HeaderModal
                style={{
                    backgroundColor: moradoClaro,
                }
                }
                handleCerrar={handleCerrar}
                titulo={"Punto de reunion"}
                color={"#fff"}


                modify={true}

                handleSave={() => handleGuardar(selectedPlace)}
            />
            <View style={styles.container}>
                <MapWithSearch
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
        top: 48,
    }

})

import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { colorFondo, container, moradoClaro } from '../../../../../assets/constants'
import HeaderModal from '../../../AgregarFecha/components/HeaderModal'
import QueLlevar from './QueLlevar';

export default function ({
    setModalVisible,
    data,
    handleSave
}) {
    const [material, setMaterial] = useState(data);

    return (
        <ScrollView style={{ flex: 1, backgroundColor: colorFondo, }}>
            <HeaderModal
                style={{
                    backgroundColor: moradoClaro,
                }}
                handleCerrar={() => setModalVisible(false)}
                titulo={"Material a llevar"}
                color={"#fff"}


                modify={true}

                handleSave={() => handleSave(material)}
            />
            <View style={{
                padding: 10,
            }}>
                <QueLlevar
                    datos={material}
                    modify={true}
                    setDatos={setMaterial}
                />

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

})

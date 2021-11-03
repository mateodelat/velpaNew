import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { moradoOscuro } from '../../../../assets/constants'

const Elemento = ({ index, item }) => {
    return (
        <Text style={styles.containerItem}
            key={"mo-" + index}
        >
            {/* <Text style={styles.text}>• </Text> */}
            <Text style={styles.text}>   {item}</Text>
        </Text>

    )
}

export default ({ datos, }) => {

    const vacio = datos.materialIncluido?.length === 0 && datos.materialAcampada?.length === 0 && datos.materialObligatorio?.length === 0 && datos.materialOpcional?.length === 0 && datos.alimentacion?.length === 0



    return (
        <View>
            {vacio && <Text style={{
                fontSize: 18,
                // fontWeight: 'bold',
                textAlign: 'center',
            }}>Nada que llevar</Text>}

            {/* Obligatorio */}
            {datos.materialObligatorio && datos.materialObligatorio.length !== 0 && <View style={styles.container}>
                <Text style={styles.title}>Obligatorio: </Text>
                {
                    datos.materialObligatorio.map((item, index) => (
                        <Elemento
                            key={index}
                            item={item}
                            index={index}
                        />
                    ))
                }
            </View>}

            {/* Opcional */}
            {datos.materialOpcional && datos.materialOpcional.length !== 0 && <View style={styles.container}>
                <Text style={styles.title}>Opcional: </Text>
                {
                    datos.materialOpcional.map((item, index) => (
                        <Elemento
                            key={index}
                            item={item}
                            index={index}
                        />
                    ))
                }
            </View>}

            {/* Alimentacion */}
            {datos.alimentacion && datos.alimentacion.length !== 0 && <View style={styles.container}>
                <Text style={styles.title}>Alimentacion: </Text>
                {
                    datos.alimentacion.map((item, index) => (
                        <Elemento
                            key={index}
                            item={item}
                            index={index}
                        />

                    ))
                }
            </View>}

            {/* Acampada */}
            {!!datos.materialAcampada && datos.materialAcampada.length !== 0 && <View style={styles.container}>
                <Text style={styles.title}>Acampar: </Text>
                {
                    datos.materialAcampada.map((item, index) => (
                        <Elemento
                            key={index}
                            item={item}
                            index={index}
                        />
                    ))
                }
            </View>}
        </View>
    )
}




const styles = StyleSheet.create({
    info: {
        fontSize: 17,
    },


    ///////////////////////
    title: {
        fontSize: 18,
        color: moradoOscuro,
    },

    container: {
        paddingVertical: 10,

    },

    containerItem: {
        padding: 2,
    },

    text: {
        fontSize: 17,
        padding: 4,
    }
});
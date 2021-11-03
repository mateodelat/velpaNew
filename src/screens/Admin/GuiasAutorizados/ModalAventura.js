import React, { useEffect, useState } from 'react'
import {
    Alert,
    Dimensions,
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native'
import { Entypo } from '@expo/vector-icons';

import { API } from 'aws-amplify';
import { fetchAventura } from '../../../../assets/constants';

import { Loading } from '../../../components/Loading';
// import DetalleAventuraScreen from '../../Explorar/3DetalleAventura/DetalleAventuraScreen';


// Funcion que tiene un boton para esconder el modal y un id de aventura para fetcharlo
export default ({ setModalVisible, id, titulo }) => {

    const { width } = Dimensions.get('screen');
    const [aventura, setAventura] = useState();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchAventura(id)
            .then(r => {
                setAventura(r)
                setLoading(false)
            })
            .catch(e => {
                console.log(e)
                Alert.alert("Error", "Error obteniendo aventura")
            })
    }, []);

    return (
        <View style={styles.centeredView} onPress={() => setModalVisible(false)}>
            <View style={styles.modalView}>
                <View style={styles.header}>
                    <Pressable
                        onPress={() => setModalVisible(false)}
                        style={styles.button}
                    >
                        <Entypo name="cross" size={25} color="black" />
                    </Pressable>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 18,
                    }}>{titulo}</Text>

                </View>

                {loading ? <Loading /> :
                    <DetalleAventuraScreen
                        aventura={aventura}
                        aventuraID={id}
                        editar={false}
                        width={width - 70}
                    />
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    // Estilos del modal
    modalView: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

        overflow: "hidden"
    },
    centeredView: {
        flex: 1,
        padding: 15,
    },

    header: {
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    button: {
        position: 'absolute',
        left: 20,
        padding: 8,
    },
})

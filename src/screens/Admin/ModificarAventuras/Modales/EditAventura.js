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
// import DetalleAventuraScreen from '../../../Explorar/3DetalleAventura/DetalleAventuraScreen';
import { fetchAventura, updateAventura, deleteAventura } from '../../../../../assets/constants';
import { Loading } from '../../../../components/Loading';
import { API } from 'aws-amplify';

// Funcion que tiene un boton para esconder el modal y un id de aventura para fetcharlo
export default ({ setModalVisible, id, titulo, indexCategoria, indexAventura, data, setData }) => {
    const [editing, setEditing] = useState(true);

    const { width } = Dimensions.get('screen');
    const [aventura, setAventura] = useState();
    const [loading, setLoading] = useState(true);
    const [aventuraDefault, setAventuraDefault] = useState({});

    useEffect(() => {
        fetchAventura(id)
            .then(r => {
                setAventura(r)
                setAventuraDefault(r)
                setLoading(false)
            })
            .catch(e => {
                console.log(e)
                Alert.alert("Error", "Error obteniendo aventura")
            })
    }, []);

    const handleDelete = () => {
        let newData
        newData = [...data]
        newData[indexCategoria].Aventuras.items.splice(indexAventura, 1)

        // Actualizar en database
        API.graphql({
            query: deleteAventura, variables: {
                input: {
                    id: aventura.id,
                }
            }
        }).then(r => {
            Alert.alert("Exito!!", "Aventura borrada con exito", [{
                text: "OK",
                onPress: () => {
                    setModalVisible(false)
                    setData(newData)
                }
            }])
        })
            .catch(e => {
                console.log(e)
                Alert.alert("Error", "Error borrando los datos")
            })
    }


    const handleSubmit = () => {
        // Si se estaba editando se actualiza la database
        if (editing && JSON.stringify(aventura) !== JSON.stringify(aventuraDefault)) {
            let newAventura
            newAventura = aventura
            API.graphql({
                query: updateAventura, variables: {
                    input: {
                        ...aventura,
                        // Regular el imagenDetalles para solo lista de llaves de s3
                        imagenDetalle: newAventura.imagenDetalle.map(e => e.key),

                        // Regular la imagen fondo para la llave
                        imagenFondo: newAventura.imagenFondo.key
                    }
                }
            })
                .then(r => {
                    setAventura({
                        ...aventura,
                    })

                    Alert.alert("Exito", "Aventura modificada con exito")
                })
                .catch(e => {
                    console.log(e)
                    Alert.alert("Error", "Error modificando aventura")
                })
            setEditing(!editing)
            return
        } else {
            setEditing(!editing)
        }
    }

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

                    <Pressable
                        onPress={handleSubmit}
                        style={{
                            position: 'absolute',
                            right: 20,
                            padding: 8,
                        }}
                    >
                        {editing ?
                            <Entypo name="check" size={25} color="green" />

                            :
                            <Text style={{
                                color: 'blue',
                                fontSize: 18,
                            }}>Editar</Text>
                        }
                    </Pressable>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 18,
                    }}>{titulo}</Text>

                </View>

                {loading ? <Loading /> :
                    <DetalleAventuraScreen
                        aventura={aventura}
                        setAventura={setAventura}
                        aventuraID={id}
                        editar={editing}
                        width={width - 70}
                    />
                }
                <Pressable
                    style={{ alignSelf: 'center', backgroundColor: '#fff', padding: 10, }}
                    onPress={() => {
                        Alert.alert("Borrar", "Seguro que quieres borrar esta categoria?", [{
                            text: "OK",
                            onPress: () => handleDelete()
                        }])

                    }}
                >
                    <Text style={styles.borrar}>Borrar</Text>
                </Pressable>

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
    borrar: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
    }

})

import { PureComponent } from "react"
import React from 'react'
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { shadowMedia } from "../../../../assets/constants"
import { MaterialIcons } from '@expo/vector-icons';


export default class AdventureItem extends PureComponent {
    constructor(props) {
        super(props)
        this.dimensions = Dimensions.get("screen")
    }

    render() {
        return (
            <View style={{
                width: this.dimensions.width,
            }}>
                <Pressable
                    onPress={() => this.props.navigation.navigate("DetalleAventura")}
                    style={styles.elementContainer}>
                    {/* Imagen de aventura */}
                    <View style={{
                        flex: 1,
                    }}>
                        <Image
                            source={this.props.item.image}
                            style={styles.imagenLista}
                        />
                    </View>

                    {/* Texto de descripcion */}
                    <View
                        style={styles.textoDescrpicion}>
                        <View style={{ flex: 1, }}>

                            {/* Titulo */}
                            <Text style={styles.titleTxt}>{this.props.item.titulo}</Text>

                            {/* Categoria */}
                            <Text style={styles.categoriaTxt}>{this.props.item.categoria}</Text>
                        </View>
                        <MaterialIcons
                            name={"keyboard-arrow-right"}
                            size={35}
                            color={"gray"}
                        />

                    </View>
                </Pressable>
            </View>)
    }
}

const styles = StyleSheet.create({
    elementContainer: {
        margin: 10,
        marginHorizontal: 20,
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 15,
        ...shadowMedia
    },

    imagenLista: {
        aspectRatio: 1,
        borderRadius: 10,
    },

    textoDescrpicion: {
        flex: 4,
        marginLeft: 15,
        alignItems: 'center',
        flexDirection: 'row',
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    categoriaTxt: {
        fontSize: 16,
        color: '#00000080',
    },

    titleTxt: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlignVertical: 'center',
    },

    precio: {
        fontSize: 16,
        fontWeight: 'bold',
    }
})

import React, { useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {
    mayusFirstLetter,
    moradoOscuro,
    shadowMedia
} from '../../../../assets/constants';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const dimensions = Dimensions.get('screen');


export default function ({ item }) {
    // const [loading, setLoading] = useState(true);

    // const navigation = useNavigation()

    // const handlePress = () => {
    //     navigation.navigate('DetalleAventura', { id: item.id });
    // };

    // const handleImageLoadEnd = () => {
    //     setLoading(false);
    // };

    return <View style={{ backgroundColor: 'red', width: 100, height: 100, }}></View >

    return <View style={{ width: dimensions.width }}>
        <Pressable onPress={handlePress} style={styles.elementContainer}>
            <View style={{ flex: 1 }}>
                {!!loading && (
                    <View
                        style={{
                            aspectRatio: 1,
                            position: 'absolute',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <ActivityIndicator color={moradoOscuro} size="large" />
                    </View>
                )}
                <Image
                    source={{ uri: item.imagenDetalle[item.imagenFondoIdx] }}
                    style={styles.imagenLista}
                    onLoadEnd={handleImageLoadEnd}
                />
            </View>

            <View style={styles.textoDescrpicion}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.titleTxt}>{String(item.titulo)}</Text>
                    <Text style={styles.categoriaTxt}>
                        {mayusFirstLetter(item.categoria)}
                    </Text>
                </View>
                <MaterialIcons name="keyboard-arrow-right" size={35} color="gray" />
            </View>
        </Pressable>
    </View>
};

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
        borderRadius: 10
    },
    textoDescrpicion: {
        flex: 4,
        marginLeft: 15,
        alignItems: 'center',
        flexDirection: 'row'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    categoriaTxt: {
        fontSize: 16,
        color: '#00000080'
    },
    titleTxt: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlignVertical: 'center'
    },
    precio: {
        fontSize: 16,
        fontWeight: 'bold'
    }
});


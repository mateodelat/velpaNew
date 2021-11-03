import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable, Alert } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { moradoOscuro } from '../../../assets/constants';

export default ({ title, navigation }) => {

    const handlePress = () => {
        navigation.navigate("Notificaciones")
    }

    return (
        <SafeAreaView style={styles.header}>

            {/* Campanita de notificaiones */}
            <Pressable
                onPress={() => navigation.navigate("Busqueda")}
                style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 16,
                }}>
                <Feather
                    name="search"
                    size={30}
                    color="white"
                />
            </Pressable>

            {/* Texto */}
            <View style={styles.headerTitle}>
                <Text style={styles.headerText} numberOfLines={1}>{title}</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerImg: {
        height: 26,
        width: 26,
        margin: 10
    },

    header: {
        width: '100%',
        height: 70,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: moradoOscuro,
        paddingHorizontal: 50,
        paddingBottom: 10,
    },
    headerText: {
        fontSize: 20,
        color: '#fff',
        letterSpacing: 1,
        textAlign: 'center',
    },
    icon: {
        position: 'absolute',
        left: 16,
    },

    headerTitle: {
        flexDirection: 'row',
    }
});
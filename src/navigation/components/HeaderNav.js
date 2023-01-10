import React from 'react';
import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { moradoOscuro } from '../../../assets/constants';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default ({ title }) => {

    const navigation = useNavigation()

    const { top } = useSafeAreaInsets()
    return (
        <SafeAreaView style={{
            ...styles.header,
            height: top + 60,
        }}>

            <View style={{
                marginTop: 10,
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
            }}>

                {/* Campanita de notificaiones */}
                <Feather
                    style={{
                        position: 'absolute',
                        right: 16,
                    }}
                    onPress={() => navigation.navigate("Busqueda")}

                    name="search"
                    size={30}
                    color="white"
                />

                {/* Texto */}
                <Text style={styles.headerText} numberOfLines={1}>{title}</Text>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        backgroundColor: moradoOscuro,
        paddingBottom: 10,
        height: 60,
    },
    headerText: {
        fontSize: 20,
        color: '#fff',
        letterSpacing: 1,
        textAlign: 'center',
        position: 'absolute',
    },
    icon: {
        position: 'absolute',
        left: 16,
    },

    headerTitle: {
        flexDirection: 'row',
    }
});
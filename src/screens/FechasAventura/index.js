import React, { useState } from 'react'
import { Animated, Dimensions, RefreshControl, StyleSheet, Text, View } from 'react-native'

import { colorFondo, moradoClaro, wait } from '../../../assets/constants';
import ElementoFecha from './components/ElementoFecha';
import HeaderConImagen from '../../components/HeaderConImagen';


export default index = ({ navigation }) => {
    const { height, width } = Dimensions.get("screen")

    const scrollY = React.useRef(new Animated.Value(0)).current
    const [refreshing, setRefreshing] = useState(false);


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => setRefreshing(false));
    }, []);


    return (
        <View style={{
            flex: 1,
            backgroundColor: colorFondo,
        }}>
            {/* Fechas */}
            <Animated.ScrollView
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                refreshControl={
                    <RefreshControl
                        style={{
                            position: 'absolute',
                            elevation: 20
                        }}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }

                showsVerticalScrollIndicator={false}
                style={{
                    padding: 20,
                    paddingTop: height * 0.24 + 20,
                }}>
                {/* Texto de fecha inicial */}
                <Text style={styles.fecha}>30 OCTUBRE</Text>

                <ElementoFecha />
                <ElementoFecha />
                <Text style={styles.fecha}>31 OCTUBRE</Text>

                <ElementoFecha />
                <ElementoFecha />
            </Animated.ScrollView >
            <HeaderConImagen
                titulo={"Nevado de colima"}
                imagen={require("../../../assets/IMG/cagatay-orhan-PYh4QCX_fmE-unsplash.jpg")}
                scrollY={scrollY}
                maxHeight={height * 0.24}
                showFilter={true}
            />
        </View >
    )
}


const styles = StyleSheet.create({
    fecha: {
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 16,
        color: moradoClaro,
    }
})

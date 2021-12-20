import React from 'react'
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper';

import { Entypo } from '@expo/vector-icons';
import { moradoClaro, moradoOscuro } from '../../../assets/constants';
import { StatusBar } from 'expo-status-bar';


const { width, height } = Dimensions.get("window")


export default function ModalOnboarding({
    doneViewing
}) {

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar hidden />
            <Onboarding
                pages={[
                    {

                        backgroundColor: moradoOscuro,
                        image: <Image
                            blurRadius={7}

                            style={styles.image}
                            source={require("../../../assets/IMG/onboarding/2.png")} />,
                        title: 'Descubre lugares increibles',
                        subtitle: 'Encuentra las mejores experiencias al aire libre cerca de ti',
                    },
                    {
                        backgroundColor: moradoClaro,
                        image: <Image
                            blurRadius={7}

                            style={styles.image}
                            source={require("../../../assets/IMG/onboarding/1.png")} />,
                        title: 'Se guia de Velpa',
                        subtitle: 'Disfruta de hacer lo que mas disfrutas mientras ganas dinero',
                    },
                    {
                        backgroundColor: moradoOscuro,
                        image: <Image
                            blurRadius={7}


                            style={styles.image}
                            source={require("../../../assets/IMG/onboarding/3.png")} />,
                        title: 'Te escuchamos',
                        subtitle: 'Escoge la experiencia que mas se adapte a tus necesidades y a tu presupuesto',
                    }
                ]}
                nextLabel={"Siguiente"}
                skipLabel={"Saltar"}

                showDone={true}
                DoneButtonComponent={({ isLight, onPress }) => <Entypo
                    onPress={onPress}
                    style={{ marginRight: 10, }}
                    name="check"
                    size={30}
                    color={isLight ? "black" : "white"}
                />}

                onSkip={doneViewing}
                onDone={doneViewing}
            />
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    image: {
        width: width,
        height: height,
        top: -(height / 2) + 65,

        resizeMode: "cover",


        position: 'absolute',

        opacity: 0.5

    }
})

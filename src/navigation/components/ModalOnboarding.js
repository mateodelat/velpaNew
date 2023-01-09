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
                            source={{ uri: "https://static.wixstatic.com/media/419deb_dc19b503d1fb4b179bfcfc64f9286f26~mv2.png" }} />,
                        title: 'Descubre lugares increibles',
                        subtitle: 'Encuentra las mejores experiencias al aire libre cerca de ti',
                    },
                    {
                        backgroundColor: moradoClaro,
                        image: <Image
                            blurRadius={7}

                            style={styles.image}
                            source={{ uri: "https://static.wixstatic.com/media/419deb_f02626a8e5d54b7a942fdcb834ded747~mv2.png" }} />,
                        title: 'Se guia de Velpa',
                        subtitle: 'Disfruta de hacer lo que mas disfrutas mientras ganas dinero',
                    },
                    {
                        backgroundColor: moradoOscuro,
                        image: <Image
                            blurRadius={7}


                            style={styles.image}
                            source={{ uri: "https://static.wixstatic.com/media/419deb_e391df79dfad4120b7951d8de9b25c8e~mv2.png" }} />,
                        title: 'Te escuchamos',
                        subtitle: 'Escoge la experiencia que mas se adapte a tus necesidades y a tu presupuesto',
                    }
                ]}
                nextLabel={"Siguiente"}
                skipLabel={"Saltar"}

                showDone={true}
                DoneButtonComponent={() => <Entypo
                    onPress={doneViewing}
                    style={{ paddingRight: 20, padding: 15 }}
                    name="check"
                    size={30}
                    color={"#fff"}
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

import React, { useState } from 'react'
import {
    Alert,
    Dimensions,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native'
import {
    colorFondo,
    moradoClaro,
    shadowMedia,
    moradoOscuro
} from '../../../assets/constants'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import AventurasPasadas from './components/AventurasPasadas';
import AventurasProximas from './components/AventurasProximas';


const imageSize = 110
const { width, height } = Dimensions.get("screen")

const Tab = createMaterialTopTabNavigator();



export default ({ navigation }) => {
    function handleGoBack() {
        navigation.pop()
    }



    const [pasadas, setPasadas] = useState(false);

    return (
        <View
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <Image
                source={require("../../../assets/IMG/cagatay-orhan-PYh4QCX_fmE-unsplash.jpg")}
                style={styles.imagenFondo}
                blurRadius={10}
            />

            {/* Header */}
            <View style={styles.header}>
                <MaterialIcons
                    name="keyboard-arrow-left"
                    size={40}
                    color={moradoClaro}
                    style={styles.backIcon}
                    onPress={handleGoBack} />
            </View>




            <View style={{
                height: (height * 0.24) - (imageSize / 2 + 10),

            }} />

            <View style={styles.innerContainer}>
                <View style={{
                    flexDirection: 'row',
                    marginHorizontal: 10,
                }}>
                    {/* Foto de perfil */}
                    <Image
                        source={require("../../../assets/IMG/Selfie.png")}
                        style={styles.image} />
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.nombre}>Mateo De La Torre</Text>
                        <Text style={styles.nickname}>@mateodelat</Text>

                        {/* Calificaciones */}
                        <View style={styles.calificacionesCont}>

                            <Entypo name="star" size={22} color="#F4984A" />
                            <Entypo name="star" size={22} color="#F4984A" />
                            <Entypo name="star" size={22} color="#F4984A" />
                            <Entypo name="star" size={22} color="#F4984A" />
                            <Entypo name="star" size={22} color="gray" />

                            <Text style={{
                                marginLeft: 5,
                            }}>(13)</Text>


                        </View>

                    </View>

                </View>

                {/* Antiguedad, numero de aventuras, */}
                <View style={styles.cuadrosContainer}>
                    <Pressable
                        style={styles.cuadro}>
                        <Text style={styles.titleCuadro}>10</Text>
                        <Text style={styles.descCuadro}>AVENTURAS COMO GUIA</Text>
                    </Pressable>
                    <View style={styles.cuadro}>
                        <Text style={styles.titleCuadro}>5 MESES</Text>
                        <Text style={styles.descCuadro}>ANTIGUEDAD{"\n"}</Text>
                    </View>
                    <Pressable
                        onPress={() => Alert.alert("", "Para ser superguia debes pasar una revision de nuestro equipo")}
                        style={styles.cuadro}>
                        <Text style={styles.titleCuadro}>SI</Text>

                        <View style={styles.question}>
                            <Text style={styles.questionTxt}>?</Text>
                        </View>


                        <Text style={styles.descCuadro}>SUPERGUIA{"\n"}</Text>
                    </Pressable>
                </View>

            </View>


            {/* Aventuras proximas y pasadas */}
            <View style={{
                ...styles.innerContainer,
                paddingHorizontal: 0,
                height: ((height * 0.24) - (imageSize / 2 + 10) + 223),
                flex: 1,
            }}>
                <Text style={styles.title}>Aventuras</Text>

                {/* <View style={{
                    flexDirection: 'row',
                    marginTop: 20,
                }}>

                    <Pressable
                        onPress={() => setPasadas(false)}
                        style={{ flex: 1, alignItems: 'center', }}
                    >
                        <Text style={{
                            ...styles.selectorTipo,
                            color: !pasadas ? moradoOscuro : moradoOscuro + "99",
                        }}>Proximas</Text>

                        {!pasadas && <View style={{
                            marginTop: 4,
                            height: 5,
                            width: 5,
                            backgroundColor: moradoOscuro,
                            borderRadius: 5,
                        }} />}
                    </Pressable>

                    <Pressable
                        onPress={() => setPasadas(true)}
                        style={{ flex: 1, alignItems: 'center', }}
                    >
                        <Text style={{
                            ...styles.selectorTipo,
                            color: pasadas ? moradoOscuro : moradoOscuro + "99",

                        }}>Pasadas</Text>

                        {pasadas && <View style={{
                            marginTop: 4,
                            height: 5,
                            width: 5,
                            backgroundColor: moradoOscuro,
                            borderRadius: 5,
                        }} />}

                    </Pressable>
                </View> */}

                <Tab.Navigator
                    screenOptions={{
                        tabBarPressOpacity: 0,
                        tabBarIndicatorStyle: {
                            backgroundColor: moradoOscuro,
                            marginBottom: 7,
                            width: 5,
                            height: 5,
                            left: width / 4 - 7.5,
                            borderRadius: 5,
                        },
                        tabBarPressColor: "transparent",
                        tabBarActiveTintColor: moradoOscuro,
                        tabBarInactiveTintColor: moradoOscuro + "88",
                        tabBarLabelStyle: {
                            fontSize: 16,
                        },
                        tabBarStyle: {
                            marginTop: 10,
                            elevation: 0,
                            backgroundColor: "transparent",
                            height: 60,
                            justifyContent: 'center',
                        },

                    }}

                >
                    <Tab.Screen name="Proximas" component={AventurasProximas} />
                    <Tab.Screen name="Pasadas" component={AventurasPasadas} />
                </Tab.Navigator>
                {/* {
                    pasadas ?
                        <AventurasPasadas />
                        :
                        <AventurasProximas />
                } */}


            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colorFondo,
        flex: 1,
    },

    header: {
        width: '100%',
        padding: 10,
        position: 'absolute',
    },

    backIcon: {
        padding: 5,
        backgroundColor: '#fff',
        alignSelf: 'flex-start',
        borderRadius: 50,
    },

    imagenFondo: {
        position: 'absolute',
        width: '100%',
        height: height * 0.24,

    },


    innerContainer: {
        marginHorizontal: 15,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        ...shadowMedia,
        marginBottom: 15,
    },

    image: {
        width: imageSize,
        height: imageSize,

        borderRadius: 10,

    },

    headerTextContainer: {
        marginHorizontal: 20,
        justifyContent: 'center',
    },

    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    nickname: {
        color: '#999',
    },

    calificacionesCont: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',

    },

    title: {
        color: moradoClaro,
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    },

    cuadrosContainer: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,

        borderTopColor: moradoClaro,
        borderTopWidth: .5,
    },

    cuadro: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    titleCuadro: {
        color: moradoClaro,
        fontSize: 20,
        fontWeight: 'bold',
    },

    descCuadro: {
        fontSize: 14,
        color: '#777',
        textAlign: 'center',
    },

    question: {
        position: 'absolute',
        right: 15,
        top: -5,

        backgroundColor: moradoClaro + "99",
        borderRadius: 100,

        width: 22,
        height: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },

    questionTxt: {
        fontWeight: 'bold',
        fontSize: 16,
        color: "white",

    },


    selectorTipo: {
        fontSize: 16,
        color: moradoOscuro,
        flex: 1,
        textAlign: 'center',
    }
})



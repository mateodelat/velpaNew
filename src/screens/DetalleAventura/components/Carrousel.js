import React, { useState, useRef, Fragment, useEffect } from 'react';
import {
    Animated,
    Image,
    View,
    StyleSheet,
    Pressable,
    ActivityIndicator,
    Dimensions,
} from 'react-native';
import { Video } from 'expo-av';

import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import DoubleClick from '../../../components/DoubleClick.js';



//Los 3 puntitos creados mediante views con color negro y radius para que sean circulos
const Indicator = ({ scrollX, height, width, data, opacity }) => {
    return <Animated.View
        style={{
            position: 'absolute',
            bottom: height / 20 + 20,
            flexDirection: 'row',
            borderRadius: 10,
            opacity
        }}
    >
        {data?.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width]
            const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.8, 1, 0.8],
                extrapolate: 'clamp'
            })

            const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.4, 0.8, 0.4],
                extrapolate: 'clamp'
            })

            return <Animated.View
                key={'inidicator-' + i}
                style={{
                    height: 15,
                    width: 15,
                    borderRadius: 15,
                    backgroundColor: 'white',
                    margin: 5,
                    opacity,
                    // transform: [{
                    //     scale
                    // }]
                }}>
            </Animated.View>
        })}
    </Animated.View>
}

export default ({
    scrollX,
    images,
    setModalVisible,
    width,
    height,
    setInitialImageIdx }) => {

    const data = images


    ////////////Indicador y ocultarlo tras cierto tiempo////////////
    const opacityIndicator = useRef(new Animated.Value(1)).current
    var tiempoIndicator

    const ocultarIndicator = () => {

        tiempoIndicator = setTimeout(() => {
            Animated.timing(
                opacityIndicator,
                {
                    toValue: 0,
                    duration: 350,
                    useNativeDriver: true
                }
            ).start();
        }, 1800);
    }

    useEffect(() => {
        ocultarIndicator()
    }, []);

    const [errorImagenes, setErrorImagenes] = useState([...Array(data?.length ? data.length - 1 : 0).keys()].map(() => false))


    /////////////VIDEO//////////////////
    // Variables para los videos
    const video = useRef(null);
    // Estatus del video
    const [status, setStatus] = useState({});
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [resizeMode, setResizeMode] = useState("cover");

    const viewConfig = useRef({
        itemVisiblePercentThreshold: 10,
    })

    // Cada que se cambia de elemento
    const onViewChange = useRef((props) => {
        const { viewableItems } = props
        if (viewableItems.length > 0) {
            clearTimeout(tiempoIndicator)
            props.changed[0].item.video ? video.current?.pauseAsync() : null
            opacityIndicator.setValue(1)
            ocultarIndicator()
        }
    })


    const handlePause = () => {
        status.isPlaying ?
            video.current.pauseAsync()
            : video.current.playAsync()
    }


    const handleVideoFullScreen = () => {
        setResizeMode("contain")
        video.current.presentFullscreenPlayer()
            .catch(e => {
                console.log(e)
            })

    }


    //////////MODIFICAR o VER IMAGENES/////////////////
    const handlePressImage = (index) => {

        let indexVideo
        let indexaAbrir

        // Logica para detectar si el elemento anterior al index a abrir es video
        indexaAbrir = index
        indexVideo = false
        data?.map((e, i) => {
            if (e.video) {
                indexVideo = i
            }
        })
        setInitialImageIdx((indexVideo === false || indexVideo > indexaAbrir ?
            indexaAbrir :
            indexaAbrir - 1
        ))
        setModalVisible(true)
    }

    return (
        <View style={styles.container}>
            {
                !data?.length ?
                    <View
                        style={{
                            ...styles.imgContainer,
                            width,
                            height,
                        }}
                    >
                    </View> : null
            }
            <Animated.FlatList
                data={data}
                horizontal
                scrollEventThrottle={32}
                pagingEnabled
                keyExtractor={(i, idx) => ("imagen-" + String(idx))}

                //Configuracion para pausar el video si se reproducio
                viewabilityConfig={viewConfig.current}
                onViewableItemsChanged={onViewChange.current}
                onScroll={
                    Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: true }
                    )}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    const isVideo = item.video
                    return (

                        <View
                            style={{ ...styles.imgContainer, width, height }}
                        >

                            {isVideo ?
                                <DoubleClick
                                    style={{ flex: 1, }}
                                    onPress={errorImagenes[index] ? null : handlePause}
                                    onDoublePress={errorImagenes[index] ? null : handleVideoFullScreen}
                                >
                                    <View style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flex: 1,
                                    }}>


                                        {errorImagenes[index] ?
                                            <Entypo
                                                name="video"
                                                size={50}
                                                color="black"
                                            />
                                            : <Fragment>

                                                {!videoLoaded && <ActivityIndicator
                                                    style={{
                                                        position: 'absolute',
                                                        alignSelf: 'center',
                                                    }}
                                                    color={"black"}
                                                    size={"large"}
                                                />}
                                                <Video
                                                    onError={(error) => {
                                                        console.log(error)
                                                        let newArray = [...errorImagenes]
                                                        newArray[index] = true
                                                        setErrorImagenes([...newArray])
                                                    }}

                                                    onFullscreenUpdate={({ fullscreenUpdate }) => {
                                                        if (fullscreenUpdate === 3) {
                                                            setResizeMode("cover")
                                                        }
                                                    }}
                                                    onLoad={() => setVideoLoaded(true)}
                                                    ref={video}
                                                    style={{ height, width }}
                                                    source={{ uri: item.uri }}
                                                    resizeMode={resizeMode}
                                                    isLooping
                                                    onPlaybackStatusUpdate={status => {
                                                        setStatus(() => status)
                                                    }}
                                                />
                                                <Animated.View
                                                    style={{
                                                        ...styles.fullScreen,
                                                        opacity: opacityIndicator
                                                    }}>
                                                    <MaterialIcons
                                                        onPress={() => handleVideoFullScreen()}
                                                        name="fullscreen"
                                                        size={35}
                                                        color="white"
                                                    />
                                                </Animated.View>
                                                {(!status.isPlaying && videoLoaded) &&
                                                    <FontAwesome5 style={{
                                                        position: 'absolute',
                                                        opacity: 0.8
                                                    }} name="play" size={30} color="white" />}
                                            </Fragment>}
                                    </View>
                                </DoubleClick>
                                :
                                <Pressable
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    onPress={() => errorImagenes[index] ? null : handlePressImage(index)}
                                >

                                    {errorImagenes[index] ?
                                        <Entypo
                                            name="image"
                                            size={50}
                                            color="black"
                                        />
                                        :
                                        <Image
                                            onError={({ nativeEvent: { error } }) => {
                                                console.log(item)
                                                console.log(error)
                                                let newArray = [...errorImagenes]
                                                newArray[index] = true
                                                setErrorImagenes([...newArray])
                                            }}
                                            source={{ uri: item.uri }}
                                            style={{ resizeMode: "cover", width, height, }}
                                        />
                                    }
                                    <Animated.View
                                        style={{
                                            ...styles.fullScreen,
                                            opacity: opacityIndicator
                                        }}>
                                        <MaterialIcons
                                            onPress={() => handlePressImage(index)}
                                            name="fullscreen"
                                            size={35}
                                            color="white"
                                        />
                                    </Animated.View>
                                </Pressable>
                            }

                        </View>

                    )
                }}
            />
            < Indicator
                opacity={opacityIndicator}
                data={data}
                scrollX={scrollX}
                height={height}
                width={width}
            />
        </View >
    );
}

const styles = StyleSheet.create({
    //contenedor general
    container: {
        alignItems: 'center',
        overflow: "hidden",
    },

    //Estilos de la imagen
    imgContainer: {
        overflow: 'hidden',
        justifyContent: 'center',
    },




    fullScreen: {
        bottom: 40,
        right: 10,
        position: 'absolute',
    }

});
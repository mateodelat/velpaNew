import React, { useState, useRef, Fragment, useEffect } from 'react';
import {
    Animated,
    Image,
    View,
    StyleSheet,
    Pressable,
    ActivityIndicator,
    Text,
    Alert,
} from 'react-native';
import { Video } from 'expo-av';

import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import DoubleClick from '../../../components/DoubleClick.js';
import { openImagePickerAsync, colorFondo, moradoOscuro, getBlob } from '../../../../assets/constants/index.js';
import Storage from '@aws-amplify/storage';



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
    setModalVisible,
    width,
    height,
    setInitialImageIdx,

    aventura,
    setAventura,

    images,
    setImages
}) => {

    const data = aventura.imagenDetalle


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
    const [uploading, setUploading] = useState(false);

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
                Alert.alert("Error mostrando el video en pantalla completa")
            })

    }

    const agregarImagenesAlVisor = (imgAdd) => {
        const imagenVisor = imgAdd.map(e => {
            return {
                ...e,
                url: e.uri
            }
        }).filter(e => !e.video)
        setImages(imagenVisor)


    }

    // Asignar index de imagen de fondo
    const handleSetImagenFondo = (index) => {

        setAventura({
            ...aventura,
            imagenFondoIdx: index === aventura.imagenFondoIdx ? null : index


        })
    }

    ///////////////////////////////////////////////////
    //////////MODIFICAR O VER IMAGENES/////////////////
    ///////////////////////////////////////////////////
    const handlePressItem = (index, visor) => {
        // Si queremos utilizar visor de imagen solo se muestra el modal
        if (visor) {
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


        } else {
            // Modificar imagen
            let newImagenDetalle
            newImagenDetalle = [...aventura.imagenDetalle]

            openImagePickerAsync()
                .then(async r => {
                    if (r) {
                        const isVideo = r.type === "video"
                        const key = "imagen-" + index + " ave-" + aventura.id + (isVideo ? ".mp4" : ".jpg")

                        if (isVideo) {
                            // Revisar que sea formato .mp4
                            if (!r.uri.endsWith(".mp4")) {
                                Alert.alert("Error", "Actualmente solo soportamos videos mp4")
                                return
                            }

                            if (!!newImagenDetalle.find(e => e.video)) {
                                // Revisar que sea el unico video
                                Alert.alert("Error", "Actualmente solo soportamos un solo video por aventura")
                                return
                            }
                        }

                        // Subir al bucket
                        setUploading(index)
                        const blobImagen = await getBlob(r.uri)
                        await Storage.put(key, blobImagen)

                        newImagenDetalle.splice(index, 1, {
                            uri: r.uri,
                            video: isVideo,
                            key
                        })

                        // Quitar errores
                        let newArray = [...errorImagenes]
                        newArray[index] = false
                        setErrorImagenes([...newArray])

                        setAventura({

                            ...aventura,
                            imagenDetalle: newImagenDetalle
                        })

                        agregarImagenesAlVisor(newImagenDetalle)

                        setUploading(null)
                    }
                })
                .catch(e => {
                    Alert.alert("Error", "Error subiendo el archivo")
                    console.log(e)
                })
        }
    }

    ////////////////////////////////////////// 
    //////////Eliminar imagen/////////////////
    //////////////////////////////////////////
    const handleRemoveImage = (index) => {
        let newImagenDetalle
        newImagenDetalle = [...aventura.imagenDetalle]

        newImagenDetalle.splice(index, 1)

        setAventura({
            ...aventura,

            // Reiniciar index si es mayor
            imagenFondoIdx: index <= aventura.imagenFondoIdx ? aventura.imagenFondoIdx : null,
            imagenDetalle: newImagenDetalle
        })

        agregarImagenesAlVisor(newImagenDetalle)
    }


    /////////////////////////////////////////////////////
    ////////////Agregar imagen a los lados///////////////
    /////////////////////////////////////////////////////
    const handleAddImage = (index, side) => {
        let newImagenDetalle
        newImagenDetalle = [...aventura.imagenDetalle]

        // Revisar que sean menos de 7 archivos
        if (newImagenDetalle.length > 7) {
            Alert.alert("Error", "Puedes agregar maximo 7 archivos,\n ¡Escoge las mejores fotos!")

            return
        }

        openImagePickerAsync()
            .then(async r => {
                if (r) {
                    const isVideo = r.type === "video"
                    if (isVideo) {
                        // Revisar que sea formato .mp4
                        if (!r.uri.endsWith(".mp4")) {
                            Alert.alert("Error", "Actualmente solo soportamos videos mp4")
                            return
                        }

                        // Revisar que sea el unico video
                        if (!!newImagenDetalle.find(e => e.video)) {
                            Alert.alert("Error", "Actualmente solo soportamos un solo video por aventura")
                            return
                        }
                    }

                    // Subir imagen a S3
                    const key = "imagen-" + index + " ave-" + aventura.id + (isVideo ? ".mp4" : ".jpg")


                    setAventura({
                        ...aventura,
                        imagenDetalle: newImagenDetalle
                    })

                    newImagenDetalle.splice(index + (side === "left" ? 0 : 1), 0, {
                        key,
                        uri: r.uri,
                        video: isVideo,
                    })

                    setUploading(index + (side === "left" ? 0 : 1))
                    const blobImagen = await getBlob(r.uri)
                    await Storage.put(key, blobImagen)

                    // Limpiar errores
                    let newArray = [...errorImagenes]
                    newArray[index + (side === "left" ? 0 : 1)] = false
                    setErrorImagenes([...newArray])

                    agregarImagenesAlVisor(newImagenDetalle)
                    setUploading(null)
                }
            })
            .catch(e => {
                Alert.alert("Error", "Error abriendo selector de imagenes, vuelve a intentarlo")
                console.log(e)
            })
    }



    return (
        <View style={styles.container}>
            {

                // Si no hay imagenes se renderiza un más
                data?.length === 0 ?
                    <Pressable
                        onPress={() => handleAddImage(0, "left")}
                        style={{
                            ...styles.imgContainer,
                            width,
                            height,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {uploading === 0 ? <Fragment>
                            <Text>Subiendo archivo...</Text>
                            <ActivityIndicator
                                color={"black"}
                                size={"large"}
                            />
                        </Fragment>

                            :
                            <>
                                <AntDesign
                                    name="plus"
                                    size={40}
                                    color="black"
                                />
                                <Text>Agregar imagen</Text>
                            </>
                        }

                    </Pressable>
                    :

                    // Si hay imagenes se renderizan
                    <>
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

                                if (uploading === index) {
                                    return (
                                        <View
                                            style={{
                                                ...styles.imgContainer,
                                                width,
                                                aspectRatio: 3 / 2,

                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Text>Subiendo archivo...</Text>
                                            <ActivityIndicator
                                                color={"black"}
                                                size={"large"}

                                            />
                                        </View>
                                    )
                                }


                                return (

                                    <View
                                        style={{ ...styles.imgContainer, width, height }}
                                    >

                                        {isVideo ?
                                            <DoubleClick
                                                style={{
                                                    flex: 1,
                                                }}
                                                onPress={errorImagenes[index] ? null : handlePause}
                                                onDoublePress={errorImagenes[index] ? null : () => handlePressItem(index)}
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
                                                            {(!status.isPlaying && videoLoaded) &&
                                                                <FontAwesome5 style={{
                                                                    position: 'absolute',
                                                                    opacity: 0.8
                                                                }} name="play" size={30} color="white" />}
                                                        </Fragment>}
                                                </View>
                                            </DoubleClick>
                                            :
                                            <View
                                                style={{
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
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


                                            </View>
                                        }
                                        <DoubleClick
                                            onPress={() => {
                                                isVideo ? handlePause() : handlePressItem(index)
                                            }}
                                            onDoublePress={() => {
                                                isVideo ? handleVideoFullScreen() :
                                                    handlePressItem(index, true)

                                            }}
                                            style={styles.controlesImagen}>

                                            <View style={{
                                                width: '100%',
                                                height: '100%',
                                                alignItems: 'center',
                                                position: 'absolute',
                                            }}>

                                                <Pressable
                                                    onPress={() => {
                                                        if (isVideo) Alert.alert("Error", "La imagen principal no puede ser un video")
                                                        else handleSetImagenFondo(index)
                                                    }}
                                                    style={{
                                                        ...styles.setImagenFondoContainer,
                                                        backgroundColor: aventura.imagenFondoIdx === index ? moradoOscuro : '#fff',
                                                    }}>
                                                    <Text style={{
                                                        color: aventura.imagenFondoIdx === index ? '#fff' : '#000',
                                                    }}>Imagen principal</Text>
                                                </Pressable>
                                            </View>


                                            {/* Boton borrar imagen */}
                                            <Pressable
                                                onPress={() => handleRemoveImage(index)}
                                                style={{
                                                    ...styles.iconContainer,
                                                    backgroundColor: '#ff0000',
                                                    alignSelf: 'flex-start',
                                                    position: 'absolute',
                                                    left: 10,
                                                    top: 10,
                                                }}>
                                                <Entypo
                                                    name="minus"
                                                    size={35}
                                                    color="white"
                                                />
                                            </Pressable>


                                            {/* Boton de agregar imagen izquierda*/}
                                            <Pressable
                                                onPress={() => handleAddImage(index, "left")}
                                                style={styles.iconContainer}>
                                                <Entypo
                                                    name="plus"
                                                    size={35}
                                                    color="black"
                                                />
                                            </Pressable>

                                            {/* Boton de agregar imagen derecha*/}
                                            <Pressable
                                                onPress={() => handleAddImage(index, "right")}
                                                style={styles.iconContainer}>
                                                <Entypo
                                                    name="plus"
                                                    size={35}
                                                    color="black"
                                                />
                                            </Pressable>
                                            <Animated.View
                                                style={{
                                                    ...styles.fullScreen,
                                                    opacity: opacityIndicator
                                                }}>
                                                <MaterialIcons
                                                    onPress={isVideo ? handleVideoFullScreen : () => handlePressItem(index, true)}
                                                    name="fullscreen"
                                                    size={35}
                                                    color="white"
                                                />
                                            </Animated.View>

                                        </DoubleClick>

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
                    </>}
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
    },

    iconContainer: {
        borderRadius: 35,
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: '#ffffff',
        justifyContent: 'center',

        width: 45,
        height: 45,

    },
    controlesImagen: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },

    setImagenFondoContainer: {
        top: 10,
        borderRadius: 20,
        backgroundColor: moradoOscuro,
        padding: 10,
    }
});
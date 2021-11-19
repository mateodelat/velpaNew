import React, { useRef, useState } from 'react'
import {
    Keyboard,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native'


import { Entypo } from '@expo/vector-icons';
import { moradoOscuro } from '../../../../assets/constants';

export default ({
    agregarALista,
    preview,
    textStyle,

    showMas
}) => {

    const [value, setValue] = useState(preview ? preview : "");
    const [editing, setEditing] = useState(false);

    const textInputRef = useRef()


    function handleSubmit() {
        Keyboard.dismiss()
        setEditing(false)
        if (value.length !== 0) {
            agregarALista(value)
            setValue("")
        }
    }

    function handlePressCuadro() {
        !textInputRef.current.isFocused() ? textInputRef.current.focus() : null
        setEditing(true)
        textInputRef.current.focus()
    }

    return (
        <Pressable
            onPress={handlePressCuadro}
            style={styles.container}>

            <TextInput
                ref={textInputRef}
                value={value}
                autoCapitalize="sentences"
                defaultValue={preview ? preview : null}
                onEndEditing={handleSubmit}
                onChangeText={setValue}
                onTouchStart={() => setEditing(true)}
                placeholder={!preview ? "Elemento" : null}
                placeholderTextColor={"#00000035"}
                style={{
                    ...styles.textInput,
                    ...textStyle,
                    padding: 5,
                    right: preview ? 5 : 0,
                    flex: preview ? 0 : 1,
                    backgroundColor: "#f4f6f6",
                }}
            />
            {!editing && preview &&
                <View style={{
                    position: 'absolute',
                    width: '100%',
                    alignItems: 'center',
                }}>

                    <Text style={{
                        ...styles.textoAgregar,
                    }}>{preview}</Text>
                </View>
            }


            <Entypo
                style={{
                    ...styles.icon,
                    paddingVertical: preview ? 0 : 10,
                    position: preview ? 'absolute' : "relative",
                    right: 0,
                }}
                name="plus"
                size={30}
                color={"black"}
            />

        </Pressable>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        marginLeft: 10,
    },

    textInput: {
        flex: 1,
        fontSize: 17,

    },

    textoAgregar: {
        fontSize: 17,
        padding: 5,
        right: 5,
        color: '#000',

        textAlign: 'center',
        color: moradoOscuro,
        backgroundColor: "#f4f6f6",
        borderRadius: 7,
    },

    icon: {
        padding: 10,

    },
})

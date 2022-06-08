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
import { Feather } from '@expo/vector-icons';
import { moradoOscuro } from '../../../../assets/constants';

export default ({
    agregarALista,
    preview,
    textStyle,

    colorMas
}) => {

    colorMas = colorMas ? colorMas : "black"

    const [value, setValue] = useState("");
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
                defaultValue={"Agregar material"}
                value={value}
                onEndEditing={handleSubmit}
                onChangeText={setValue}
                onTouchStart={() => setEditing(true)}
                style={{
                    ...styles.textInput,
                    borderBottomWidth: !preview ? 0.5 : 0,
                    ...textStyle
                }}
            />

            {!editing && preview && <Text style={[styles.textoAgregar, textStyle]}>{preview}</Text>}

            {editing ?
                <Feather
                    style={styles.icon}

                    name="check" size={25} color={moradoOscuro} onPress={handleSubmit} />
                :
                <Entypo
                    style={styles.icon}
                    name="plus"
                    size={30}
                    color={colorMas}
                />

            }
        </Pressable>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        marginLeft: 10,
    },

    textInput: {
        padding: 1,
        flex: 1,
        fontSize: 17,
        padding: 4,

    },

    textoAgregar: {
        fontSize: 17,
        padding: 4,
        paddingBottom: 0,

        flex: 1,
        color: '#333',
        position: 'absolute',

        width: '100%',
    },

    icon: {
        padding: 10,

    },
})

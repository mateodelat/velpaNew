import React, { useRef, useState } from 'react'
import {
    Keyboard,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native'


import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export default ({ addFunction, preview }) => {

    !preview ? preview = "Agregar material" : preview = preview

    const [value, setValue] = useState("");
    const [editing, setEditing] = useState(false);

    const textInputRef = useRef()


    function handleSubmit() {
        Keyboard.dismiss()
        setValue("")
        setEditing(false)
        addFunction(value)
    }

    function handleFocus() {
        !textInputRef.current.isFocused() ? textInputRef.current.focus() : null
        setEditing(true)
        textInputRef.current.focus()
    }


    return (
        <View style={{
            // backgroundColor: '#ebebeb',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            marginBottom: 20,
            marginTop: 10,
            borderBottomWidth: 1,
        }}
        >
            <Pressable
                onPress={handleFocus}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                }}>
                <TextInput
                    ref={textInputRef}
                    defaultValue={"Agregar material"}
                    textAlign={"left"}
                    value={value}
                    onEndEditing={handleSubmit}
                    onChangeText={setValue}
                    onTouchStart={() => setEditing(true)}
                    style={{
                        flex: 1,
                        fontSize: 17,
                        padding: 4,
                        marginLeft: 28,

                    }}
                />

                {!editing && <Text style={{
                    flex: 1,
                    textAlign: 'left',
                    color: '#000',
                    position: 'absolute',
                    fontSize: 17,
                    padding: 4,
                    marginLeft: 28,

                }}>{preview}</Text>}

                <View style={styles.icon}>
                    {editing ?
                        <Entypo

                            name="check" size={25} color="green" onPress={handleSubmit} />
                        :
                        <Entypo name="plus" size={30} color="black" onPress={handleFocus} />
                    }
                </View>
            </Pressable>


        </View >
    )
}


const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        borderRadius: 7,
        paddingLeft: 20,
        paddingTop: 10,
    },


    icon: {
        position: 'absolute',
        right: 10,
    }

})

import React from 'react'
import { FlatList, Modal, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Rating } from 'react-native-ratings';
import { formatCalificacion, moradoOscuro } from '../../../../assets/constants';
import { Loading } from '../../../components/Loading';
import HeaderModal from '../../AgregarFecha/components/HeaderModal';
import CommentItem from './CommentItem';

export default function ({
    setModalVisible,
    user,
    comments
}) {
    comments = comments.sort((a, b) => b.body || a.calificacion < b.calificacion)

    const lengthComments = comments.length

    const percentage5 = (comments.filter(c => c.calificacion === 5).length) * 100 / lengthComments
    const percentage4 = (comments.filter(c => c.calificacion === 4).length) * 100 / lengthComments
    const percentage3 = (comments.filter(c => c.calificacion === 3).length) * 100 / lengthComments
    const percentage2 = (comments.filter(c => c.calificacion === 2).length) * 100 / lengthComments
    const percentage1 = (comments.filter(c => c.calificacion === 1).length) * 100 / lengthComments


    return (
        <View style={{ flex: 1, backgroundColor: '#fff', }}>
            <HeaderModal
                titulo={"Reseñas"}
                handleCerrar={() => setModalVisible(false)}
            />

            {
                !user || !comments ?
                    <Loading indicator />
                    :

                    <View style={{ flex: 1, }}>
                        <View style={styles.header}>

                            <Text style={styles.calificacionTxt}>{formatCalificacion(user.calificacion)}</Text>
                            <Rating
                                readonly
                                ratingCount={5}
                                startingValue={user.calificacion}
                                fractions
                                imageSize={22}
                                type='custom'
                                ratingColor="#F5BE18"

                            />

                            <Text style={styles.numResenas}>Basado en {user.numResenas} reseñas</Text>


                            <View style={styles.rowCalif}>
                                <Text style={styles.tituloBarra}>Excelente</Text>

                                <View style={styles.barContainer}>
                                    <View style={{
                                        backgroundColor: 'green',
                                        width: `${percentage5}%`,
                                        ...styles.innerBar
                                    }} />
                                </View>
                            </View>


                            <View style={styles.rowCalif}>
                                <Text style={styles.tituloBarra}>Bueno</Text>

                                <View style={styles.barContainer}>
                                    <View style={{
                                        backgroundColor: '#A6D436',
                                        width: `${percentage4}%`,
                                        ...styles.innerBar
                                    }} />
                                </View>
                            </View>

                            <View style={styles.rowCalif}>
                                <Text style={styles.tituloBarra}>Medio</Text>

                                <View style={styles.barContainer}>
                                    <View style={{
                                        backgroundColor: '#F5E64F',
                                        width: `${percentage3}%`,
                                        ...styles.innerBar
                                    }} />
                                </View>
                            </View>

                            <View style={styles.rowCalif}>
                                <Text style={styles.tituloBarra}>Regular</Text>

                                <View style={styles.barContainer}>
                                    <View style={{
                                        backgroundColor: '#F3A527',
                                        width: `${percentage2}%`,
                                        ...styles.innerBar
                                    }} />
                                </View>
                            </View>

                            <View style={styles.rowCalif}>
                                <Text style={styles.tituloBarra}>Insuficiente</Text>

                                <View style={styles.barContainer}>
                                    <View style={{
                                        backgroundColor: 'red',
                                        width: `${percentage1}%`,
                                        ...styles.innerBar
                                    }} />
                                </View>
                            </View>
                        </View>

                        <FlatList
                            data={comments}
                            style={styles.flatList}
                            showsVerticalScrollIndicator={false}
                            ListFooterComponent={() => <View style={{
                                marginTop: 20,
                            }}>

                            </View>}
                            renderItem={({ item }) => (
                                <CommentItem
                                    content={item}
                                />


                            )}
                        />

                    </View>}

        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        justifyContent: 'center',
        margin: 20,

        paddingBottom: 20,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderColor: "lightgray",

    },

    rowCalif: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 3,
    },

    calificacionTxt: {
        fontSize: 50,
        marginBottom: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        color: moradoOscuro,
    },

    numResenas: {
        color: moradoOscuro,
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 5,

    },

    tituloBarra: {
        width: 80,
        marginRight: 10,
        color: moradoOscuro,
    },

    barContainer: {
        flex: 3,
        backgroundColor: "#0000001a",
        height: 7,
        borderRadius: 5,
    },

    innerBar: {
        flex: 1,
        borderRadius: 5,


    },

    flatList: {
        padding: 20,
    }

})

import { DataStore } from '@aws-amplify/datastore';
import React, { useEffect, useState } from 'react';

import { Calendar } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { addDays, colorFondo, diffDays, formatDate, getUserSub, moradoClaro, moradoOscuro, msInHour } from '../../../../assets/constants';
import { Loading } from '../../../components/Loading';
import { Fecha } from '../../../models';

import * as Haptics from 'expo-haptics';
import { vibrar } from '../../../../assets/constants/constant';


// Personalizar idiomas
LocaleConfig.locales["es"] = {
    monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    monthNamesShort: ["Ene.", "Feb.", "Mar", "Abr", "May", "Jun", "Jul.", "Ago", "Sep", "Oct", "Nov", "Dic"],
    dayNames: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
    dayNamesShort: ["Dom.", "Lun.", "Mar.", "Mie.", "Jue.", "Vie.", "Sab."],
    today: "Hoy"
};
LocaleConfig.defaultLocale = "es";


export default ({
    fechaInicial,
    fechaFinal,

    setFechaFinal,
    setFechaInicial,

}) => {
    const colorFondoLocked = "#cccccc"
    const colorTextoLocked = "#fff"

    // Fechas por defecto ya reservadas
    const [fechasExistentes, setFechasExistentes] = useState({});
    useEffect(() => {
        pedirFechasDelGuia()
    }, []);

    const pedirFechasDelGuia = async () => {
        const sub = await getUserSub()
        DataStore.query(Fecha, e => e
            .usuarioID("eq", sub)
            .fechaInicial("gt", new Date().getTime())
        )
            .then(r => {
                let diasMarcados = {}

                r.map(fecha => {

                    const { fechaInicial, fechaFinal } = fecha

                    const daysAdd = Math.floor(diffDays(fechaInicial, fechaFinal) + 1)

                    // Calcular diferencia de dias
                    let middleDays = {}
                    // Ciclo que va a revisar los dias intermedios
                    // Se le agrega al objeto los anteriores y aparte el nuevo dia
                    for (let i = 1; i < daysAdd; i++) {
                        middleDays = {
                            ...middleDays,
                            [addDays(fechaInicial, i)]: {
                                color: colorFondoLocked,
                                textColor: colorTextoLocked,
                                disableTouchEvent: true,
                            }
                        }
                    }
                    switch (daysAdd) {
                        case 1:
                            diasMarcados = {
                                ...diasMarcados,
                                // Primero
                                [formatDate(fechaInicial)]: {
                                    color: colorFondoLocked,
                                    textColor: colorTextoLocked,
                                    startingDay: true,
                                    disableTouchEvent: true,
                                    endingDay: true,
                                },
                            }
                            break;

                        case 2:
                            diasMarcados = {
                                ...diasMarcados,
                                // Primero
                                [formatDate(fechaInicial)]: {
                                    color: colorFondoLocked,
                                    textColor: colorTextoLocked,
                                    startingDay: true,
                                    disableTouchEvent: true,
                                    endingDay: false,
                                },
                                // Ultimo
                                [formatDate(fechaFinal)]: {
                                    disableTouchEvent: true,
                                    color: colorFondoLocked,
                                    textColor: colorTextoLocked,
                                    startingDay: false,
                                    endingDay: true,
                                },
                            }
                            break;

                        default:
                            diasMarcados = {
                                ...diasMarcados,
                                // Primero
                                [formatDate(fechaInicial)]: {
                                    color: colorFondoLocked,
                                    textColor: colorTextoLocked,
                                    startingDay: true,
                                    disableTouchEvent: true,
                                    endingDay: false,
                                },
                                ...middleDays,

                                // Ultimo
                                [formatDate(fechaFinal)]: {
                                    disableTouchEvent: true,
                                    color: colorFondoLocked,
                                    textColor: colorTextoLocked,
                                    startingDay: false,
                                    endingDay: true,
                                },
                            }
                            break;
                    }

                    // Se hacen los dias marcados a el primero, intermedios y ultimo

                })
                setFechasExistentes(diasMarcados)
            })
    }


    // Dias seleccionados
    const [markedDays, setmarkedDays] = useState({});


    const colorFondoSelected = moradoClaro
    const colorTexto = "#fff"


    // Si la segunda fecha es menor a la primera, se convierte en la primera
    // Si no entonces la segunda fecha se hace el ultimo dia
    const handleDayPress = (fecha) => {
        vibrar('light')
        // Dia inicial
        const { dateString } = fecha
        let { timestamp } = fecha

        // Obtener diferencia de horas contra el UTC y pasarlo a milis
        const offset = new Date().getTimezoneOffset() * 60 * 1000

        // Sumarle para ponerlo a las 8 de la hora local
        timestamp += offset

        // Si es la primera vez que se presiona la fecha
        if (!fechaInicial) {
            setmarkedDays({
                [dateString]: {
                    disableTouchEvent: false,
                    color: colorFondoSelected,
                    textColor: colorTexto,
                    startingDay: true,
                    endingDay: true,
                },
            })

            setFechaInicial(timestamp + 8 * msInHour)
            return
        }

        // Si ya tengo segunda fecha, se reinicia todo
        if (!!fechaFinal) {
            setFechaFinal(null)
            setFechaInicial(timestamp + 8 * msInHour)

            setmarkedDays({
                [dateString]: {
                    disableTouchEvent: false,
                    color: colorFondoSelected,
                    textColor: colorTexto,
                    startingDay: true,
                    endingDay: true,
                },
            })
            return
        }

        // Si se presiona una fecha posterior a la inicial
        if (timestamp > fechaInicial) {

            // Calcular diferencia de dias
            const daysAdd = diffDays(fechaInicial, timestamp)

            let middleDays = {}
            // Ciclo que va a revisar los dias intermedios
            // Se le agrega al objeto los anteriores y aparte el nuevo dia
            for (let i = 1; i < daysAdd; i++) {
                // Revisar que no intervenga con fechas bloqueadas
                if (!!fechasExistentes[addDays(fechaInicial, i)]) {
                    // Si interviene se hace el dia seleccionado el ulitmo
                    setmarkedDays({
                        [dateString]: {
                            disableTouchEvent: false,
                            color: colorFondoSelected,
                            textColor: colorTexto,
                            startingDay: true,
                            endingDay: true,
                        },
                    })

                    setFechaInicial(timestamp + 8 * msInHour)
                    return
                }


                middleDays = {
                    ...middleDays,
                    [addDays(fechaInicial, i)]: {
                        color: colorFondoSelected,
                        textColor: colorTexto
                    }
                }
            }

            // Se hacen los dias marcados a el primero, intermedios y ultimo
            setmarkedDays({
                // Primero
                [formatDate(fechaInicial)]: {
                    color: colorFondoSelected,
                    textColor: colorTexto,
                    startingDay: true,
                    endingDay: false,
                },
                ...middleDays,

                // Ultimo
                [dateString]: {
                    disableTouchEvent: false,
                    color: colorFondoSelected,
                    textColor: colorTexto,
                    startingDay: false,
                    endingDay: true,
                },
            })
            setFechaFinal(timestamp + 18 * msInHour)

        } else {
            // Se convierte en fecha inicial
            setmarkedDays({
                [dateString]: {
                    disableTouchEvent: false,
                    color: colorFondoSelected,
                    textColor: colorTexto,
                    startingDay: true,
                    endingDay: true,
                },
            })
            setFechaInicial(timestamp + 8 * msInHour)

        }


    }

    if (!fechasExistentes) return <Loading indicator containerStyle={{
        height: 350,
    }} />
    const fechaUnAño = new Date((Date.now() + 31540000000))
    return (

        <Calendar
            markingType={'period'}
            markedDates={{
                ...markedDays,
                ...fechasExistentes
            }}
            minDate={Date()}
            maxDate={fechaUnAño.toString()}
            onDayPress={handleDayPress}
            enableSwipeMonths={true}
            firstDay={1}

            onDayLongPress={(date) => {
                console.log(date)
            }}

            theme={{
                arrowColor: moradoOscuro,
                textMonthFontWeight: 'bold',
            }}

        />
    )
}
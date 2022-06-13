import { DataStore } from "@aws-amplify/datastore";
import React, { useEffect, useState } from "react";

import { Calendar } from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";
import { addDays, colorFondo, diffDays, formatDate, getUserSub, moradoClaro, moradoOscuro, msInDay, msInHour, updateItinerario } from "../../../../assets/constants";
import { Loading } from "../../../components/Loading";
import { Fecha } from "../../../models";

import { vibrar } from "../../../../assets/constants/constant";


// Personalizar idiomas
LocaleConfig.locales["es"] = {
    monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    monthNamesShort: ["Ene.", "Feb.", "Mar", "Abr", "May", "Jun", "Jul.", "Ago", "Sep", "Oct", "Nov", "Dic"],
    dayNames: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
    dayNamesShort: ["Dom.", "Lun.", "Mar.", "Mie.", "Jue.", "Vie.", "Sab."],
    today: "Hoy"
};
LocaleConfig.defaultLocale = "es";

export function calculateMarkedDays(fechaInicial, fechaFinal, enabled) {
    const colorFondo = enabled ? moradoOscuro : "#cccccc"
    const colorTexto = "#fff"

    const daysAdd = Math.floor(diffDays(fechaInicial, fechaFinal) + 1)

    // Calcular diferencia de dias
    let middleDays = {}
    // Ciclo que va a revisar los dias intermedios
    // Se le agrega al objeto los anteriores y aparte el nuevo dia
    for (let i = 1; i < daysAdd; i++) {
        middleDays = {
            ...middleDays,
            [addDays(fechaInicial, i)]: {
                color: colorFondo,
                textColor: colorTexto,
                disableTouchEvent: true,
            }
        }
    }
    switch (daysAdd) {
        case 1:
            return {
                // Primero
                [formatDate(fechaInicial)]: {
                    color: colorFondo,
                    textColor: colorTexto,
                    startingDay: true,
                    disableTouchEvent: true,
                    endingDay: true,
                },
            }

        case 2:
            return {
                // Primero
                [formatDate(fechaInicial)]: {
                    color: colorFondo,
                    textColor: colorTexto,
                    startingDay: true,
                    disableTouchEvent: true,
                    endingDay: false,
                },
                // Ultimo
                [formatDate(fechaFinal)]: {
                    disableTouchEvent: true,
                    color: colorFondo,
                    textColor: colorTexto,
                    startingDay: false,
                    endingDay: true,
                },
            }

        default:
            return {
                // Primero
                [formatDate(fechaInicial)]: {
                    color: colorFondo,
                    textColor: colorTexto,
                    startingDay: true,
                    disableTouchEvent: true,
                    endingDay: false,
                },
                ...middleDays,

                // Ultimo
                [formatDate(fechaFinal)]: {
                    disableTouchEvent: true,
                    color: colorFondo,
                    textColor: colorTexto,
                    startingDay: false,
                    endingDay: true,
                },
            }
    }
}

export default ({
    fecha,
    setFecha,

    editDisabled,
    fechaID,

    markedDays,
    setMarkedDays,

    denyFechasGuia
}) => {

    const {
        fechaInicial,
        fechaFinal
    } = fecha


    // Fechas existentes en historial del guia
    const [fechasExistentes, setFechasExistentes] = useState({});

    // Fechas existentes por estado de la fecha
    const [fechaInicialObj, setFechaInicialObj] = useState({});

    useEffect(() => {
        setFechaInicialObj(calculateMarkedDays(fechaInicial, fechaFinal, true))
        !denyFechasGuia && pedirFechasDelGuia()
    }, [])


    const pedirFechasDelGuia = async () => {
        let diasMarcados = {}

        const sub = await getUserSub()
        DataStore.query(Fecha, e => e
            .usuarioID("eq", sub)
            .fechaInicial("gt", new Date().getTime())
            .id("ne", fechaID)
            .cancelado("ne", true)
        )
            .then(r => {

                // Asignar la fecha si es que ya existe

                r.map(fecha => {

                    const { fechaInicial, fechaFinal } = fecha


                    // Se hacen los dias marcados a el primero, intermedios y ultimo con la funcion
                    diasMarcados = {
                        ...diasMarcados,
                        ...calculateMarkedDays(fechaInicial, fechaFinal)
                    }

                })

                setFechasExistentes(diasMarcados)
            })
    }


    const colorFondoSelected = moradoOscuro
    const colorTexto = "#fff"


    // Si la segunda fecha es menor a la primera, se convierte en la primera
    // Si no entonces la segunda fecha se hace el ultimo dia
    const handleDayPress = (date) => {
        // Eliminar la fecha del prinicipio
        fechaInicialObj && setFechaInicialObj({})

        vibrar("light")
        // Dia inicial
        const { dateString } = date

        let { timestamp } = date

        // Obtener diferencia de horas contra el UTC y pasarlo a milis
        const offset = new Date().getTimezoneOffset() * 60 * 1000

        // Sumarle para ponerlo a las 8 de la hora local
        timestamp += offset

        // Si es la primera vez que se presiona la fecha
        if (!fechaInicial) {
            setMarkedDays({
                [dateString]: {
                    disableTouchEvent: false,
                    color: colorFondoSelected,
                    textColor: colorTexto,
                    startingDay: true,
                    endingDay: true,
                },
            })
            setFecha({
                ...fecha,
                fechaInicial: timestamp + 8 * msInHour
            })
            return
        }

        // Si ya tengo segunda fecha, se reinicia todo
        if (fechaFinal) {

            setFecha({
                ...fecha,
                fechaInicial: timestamp + 8 * msInHour,
                fechaFinal: null,
            })

            setMarkedDays({
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
                    setMarkedDays({
                        [dateString]: {
                            disableTouchEvent: false,
                            color: colorFondoSelected,
                            textColor: colorTexto,
                            startingDay: true,
                            endingDay: true,
                        },
                    })

                    setFecha({
                        ...fecha,
                        fechaInicial: timestamp + 8 * msInHour,
                    })

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
            setMarkedDays({
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

            setFecha({
                ...fecha,
                itinerario: updateItinerario(fecha.itinerario, fechaInicial, (timestamp + 18 * msInHour)),
                fechaFinal: (timestamp + 18 * msInHour),
            })

        } else {
            // Se convierte en fecha inicial
            setMarkedDays({
                [dateString]: {
                    disableTouchEvent: false,
                    color: colorFondoSelected,
                    textColor: colorTexto,
                    startingDay: true,
                    endingDay: true,
                },
            })


            setFecha({
                ...fecha,
                itinerario: updateItinerario(fecha.itinerario, (timestamp + 8 * msInHour), fechaFinal),
                fechaInicial: (timestamp + 8 * msInHour),
            })

        }


    }


    if (!fechasExistentes) return <Loading indicator containerStyle={{
        height: 350,
    }} />
    const fechaUnAño = new Date((Date.now() + 31540000000))


    return (

        <Calendar
            markingType={"period"}
            markedDates={{
                ...markedDays,
                ...fechasExistentes,
                ...fechaInicialObj,
            }}
            minDate={Date()}
            maxDate={fechaUnAño.toString()}

            onDayPress={editDisabled ? null : handleDayPress}
            enableSwipeMonths={true}
            firstDay={1}

            theme={{
                arrowColor: moradoOscuro,
                textMonthFontWeight: "bold",
            }}

        />
    )
}
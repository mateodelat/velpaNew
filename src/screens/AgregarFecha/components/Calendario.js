import React, { useEffect, useState } from 'react';

import { Calendar } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { addDays, diffDays, formatDate, moradoClaro, moradoOscuro, msInHour } from '../../../../assets/constants';


// Personalizar idiomas
LocaleConfig.locales['es'] = {
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene.', 'Feb.', 'Mar', 'Abr', 'May', 'Jun', 'Jul.', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mie.', 'Jue.', 'Vie.', 'Sab.'],
    today: 'Hoy'
};
LocaleConfig.defaultLocale = 'es';


export default ({
    fechaInicial,
    fechaFinal,

    setFechaFinal,
    setFechaInicial,

}) => {

    // Fechas por defecto ya reservadas
    // Dias marcados
    const [markedDays, setmarkedDays] = useState({

    });


    const colorFondoSelected = moradoClaro
    const colorTexto = "#fff"


    // Si la segunda fecha es menor a la primera, se convierte en la primera
    // Si no entonces la segunda fecha se hace el ultimo dia
    const handleDayPress = (fecha) => {
        // Dia inicial
        const { dateString, timestamp } = fecha


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

    return (

        <Calendar
            markingType={'period'}
            markedDates={markedDays}
            minDate={Date()}
            maxDate={(Date.now() + 31540000000)}
            onDayPress={handleDayPress}
            enableSwipeMonths={true}
            firstDay={1}

            theme={{
                arrowColor: moradoOscuro,
                textMonthFontWeight: 'bold',
            }}

        />
    )
}
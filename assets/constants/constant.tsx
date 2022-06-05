import * as Haptics from 'expo-haptics';
import { getBadgeCountAsync } from 'expo-notifications';
import { TipoNotificacion } from '../../src/models';


export async function sendPushNotification(input: {
    title: String,
    descripcion: String,
    data: JSON,
    token: String,

}) {
    const badge = await getBadgeCountAsync()
    const {
        token,
        title,
        descripcion: body,
        data
    } = input
    const message = {
        to: token,
        sound: 'default',
        title,
        body,
        data,
        badge: badge + 1,
        priority: "high",
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    })
}


export async function sendNotification(params:{
    titulo:String,
    tipo: TipoNotificacion,
    descripcion: String,
    showAt: Number,
    usuarioID:String,
    fechaID:String,
    reservaID:String,
    
}) {
    const {
        titulo,
        tipo,
        descripcion,
        showAt,
        usuarioID,
        fechaID,
        reservaID,
    } = params
    console.log({
        titulo,
        tipo,
        descripcion,
        showAt,
        usuarioID,
        fechaID,
        reservaID,
    })

    // // Notificacion IN-APP
    // DataStore.save(new Notificacion({
    //     tipo,

    //     titulo,
    //     descripcion: "Tu experiencia en " + tituloAventura + " es en 1 semana, ya tienes todo listo?",

    //     showAt: (new Date(initialDate - msInDay * 7)).getTime(),

    //     usuarioID: sub,

    //     fechaID: fecha?.id,
    //     reservaID
    // }))


}

export const vibrar = (tipo: VibrationType) => {
    switch (tipo) {
        case "light":
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
            break;

        case "medium":
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
            break;

        case "heavy":
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
            break;

        case "error":
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
            break;

        case "sucess":
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
            break;

        case "select":
            Haptics.selectionAsync()
            break;

        default:
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
            break;
    }
}


export declare enum VibrationType {
    light = "light",
    medium = "medium",
    heavy = "heavy",

    select = "select",
    error = "error",
    sucess = "sucess"
}
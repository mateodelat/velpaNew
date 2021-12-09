import * as Haptics from 'expo-haptics';


export async function sendPushNotification(input: {
    title: String,
    descripcion: String,
    data: JSON,
    token: String,

}) {
    const {
        token,
        title,
        descripcion: body,
        data
    } = input
    console.log(input)
    const message = {
        to: token,
        sound: 'default',
        title,
        body,
        data,
        bade: "1",
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


declare enum VibrationType {
    light = "light",
    medium = "medium",
    heavy = "heavy",

    select = "select",
    error = "error",
    sucess = "sucess"
}
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
    }).then(r => r.json().then(console.log))
}



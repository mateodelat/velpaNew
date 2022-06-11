import { DataStore } from "aws-amplify";
import * as Haptics from "expo-haptics";
import {
  AndroidNotificationPriority,
  getBadgeCountAsync,
  scheduleNotificationAsync,
} from "expo-notifications";
import { Alert } from "react-native";

import { Notificacion, TipoPago } from "../../src/models";
import { TipoNotificacion } from "../../src/models";

const msInHour = 3600000;
const msInDay = 86400000;
const msInMinute = 60000;

export async function sendPushNotification(input: {
  title: String;
  descripcion: String;
  data: JSON | undefined;
  token: String;
}) {
  const { token, title, descripcion: body, data } = input;

  let message = {
    to: token,
    sound: "default",
    title,
    body,
    badge: 1,
    priority: "high",
    data,
  };

  if (!data) {
    delete message.data;
  }

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  }).then((r) => {
    console.log("Push notification send to ", token);
  });
}

export async function notificacionesRecordatorio({
  fechaID,
  reservaID,
  aventuraID,
  sub,

  fechaInicial,
  fechaFinal,

  tituloAventura,
  fechaImage,

  cliente,
  guia,

  scheduled,
}: {
  sub: string;
  fechaID: string;
  reservaID: string;
  aventuraID: string;

  fechaInicial: number;
  tituloAventura: string;
  fechaFinal: null | number;

  scheduled: boolean;

  // Datos del guia para la notificacion de calificar
  guia: null | {
    guiaID: string;
    nickname: string;
  };

  fechaImage: string;

  cliente: null | {
    tipoPago: TipoPago;
    precioTotal: number;
    nickname: string;
  };
}) {
  try {
    const tipoPago = cliente?.tipoPago;
    const precioTotal = cliente?.precioTotal;

    /*Enviar notificaciones:
    _Faltando 1 semana
    _Faltando 1 dia
    _Faltando 1 hora

    _A las 8 del dia siguiente si es dirigida al usuario
    */

    let finalDate = new Date(fechaFinal);
    if (fechaFinal) {
      // Poner fecha final al dia siguiente de que acabe a las 8
      if (finalDate.getHours() >= 8) {
        finalDate = new Date(finalDate.getTime() + msInDay);
      }
      finalDate.setHours(8);
    }

    const remainingFor1Week = Math.round(
      (fechaInicial - msInDay * 7 - new Date().getTime()) / 1000
    );
    const remainingFor1Day = Math.round(
      (fechaInicial - msInDay - new Date().getTime()) / 1000
    );
    const remainingFor1Hour = Math.round(
      (fechaInicial - msInHour - new Date().getTime()) / 1000
    );

    const remainingForNextDay = Math.round(
      (finalDate?.getTime() - new Date().getTime()) / 1000
    );

    let data = {
      fechaID,
      reservaID,

      // Hora creada en segundos
      createdAt: Math.round(new Date().getTime() / 1000),
      tipo: TipoNotificacion.RECORDATORIOFECHA,
    };

    // Si falta mas de una semana para la fecha enviar notificacion
    if (remainingFor1Week > 0) {
      // Alerta cel
      scheduled &&
        scheduleNotificationAsync({
          content: {
            title: "Todo listo??",
            body:
              "Tu experiencia en " +
              tituloAventura +
              " es en 1 semana, revisa que tengas todo listo",
            priority: AndroidNotificationPriority.HIGH,
            vibrate: [100],
            data: {
              ...data,
              timeShown: "1S",
            },
          },
          trigger: {
            seconds: remainingFor1Week,
          },
        });

      // Notificacion IN-APP
      DataStore.save(
        new Notificacion({
          tipo: data.tipo,

          titulo: "Experiencia en 1 semana",
          descripcion:
            "Tu experiencia en " +
            tituloAventura +
            " es en 1 semana, ya tienes todo listo?",

          showAt: new Date(fechaInicial - msInDay * 7).getTime(),

          usuarioID: sub,
          reservaID,

          fechaID,
        })
      );
    }

    // Si falta mas de una dia para la fecha enviar notificacion
    if (remainingFor1Day > 0) {
      // Alerta cel
      scheduled &&
        scheduleNotificationAsync({
          content: {
            title: "Solo falta 1 dia!!",
            body:
              "Tu experiencia en " +
              tituloAventura +
              " es mañana, revisa todo tu material y el punto de reunion",
            priority: AndroidNotificationPriority.MAX,
            vibrate: [100],
            data: {
              ...data,
              timeShown: "1D",
            },
          },
          trigger: {
            seconds: remainingFor1Day,
          },
        });

      // Notificacion IN-APP
      DataStore.save(
        new Notificacion({
          tipo: data.tipo,

          titulo: "Experiencia mañana",
          descripcion:
            "Tu experiencia en " +
            tituloAventura +
            " es mañana, revisa todo tu material y el punto de reunion",

          showAt: new Date(fechaInicial - msInDay).getTime(),

          usuarioID: sub,
          reservaID,

          fechaID,
        })
      );
    }

    // Enviar notificacion de en menos de 1 hora
    const descripcion1Hora = cliente
      ? "Tu experiencia en " +
        tituloAventura +
        " es en menos de 1 hora, no hagas esperar al guia!!" +
        (tipoPago === TipoPago.EFECTIVO
          ? "\nRecuerda llevar el pago de $" +
            precioTotal +
            " en efectivo de la aventura\n"
          : "\n") +
        "Ten a la mano el QR de tu reserva"
      : "Tu experiencia en " +
        tituloAventura +
        " es en menos de 1 hora, estate listo para recibir a los clientes y utiliza la app para registrar su entrada con codigo QR!!";

    // Alerta cel
    scheduled &&
      scheduleNotificationAsync({
        content: {
          title: "Estas a nada de irte",
          body: descripcion1Hora,
          priority: AndroidNotificationPriority.MAX,
          vibrate: [100],

          data: {
            ...data,
            timeShown: "1H",
          },
        },
        trigger: {
          seconds: remainingFor1Hour > 0 ? remainingFor1Hour : 1,
        },
      });

    // Notificacion IN-APP
    DataStore.save(
      new Notificacion({
        tipo: data.tipo,

        titulo: "Experiencia en menos de 1 hora",
        descripcion: descripcion1Hora,

        showAt: new Date(fechaInicial - msInHour).getTime(),

        usuarioID: sub,
        reservaID,

        fechaID,
      })
    );

    //   Si hay cliente es porque tenemos calificacion de guia
    if (cliente && fechaFinal) {
      // Enviar notificacion de califica al guia
      // Alerta cel
      scheduled &&
        scheduleNotificationAsync({
          content: {
            title:
              cliente.nickname + ", aydanos a hacer de Velpa un lugar mejor",
            body:
              "Calfica tu experiencia en " +
              tituloAventura +
              " con " +
              guia.nickname,
            data: {
              ...data,
              tipo: TipoNotificacion.CALIFICAUSUARIO,
            },
          },
          trigger: {
            seconds: remainingForNextDay,
          },
        });

      // Notificacion IN-APP
      DataStore.save(
        new Notificacion({
          tipo: TipoNotificacion.CALIFICAUSUARIO,

          titulo: "Califica tu experiencia",
          descripcion:
            cliente.nickname +
            ", ayudanos a hacer de Velpa un lugar mejor, calfica a " +
            guia.nickname +
            " en " +
            tituloAventura,

          showAt: finalDate.getTime(),

          usuarioID: sub,
          aventuraID: aventuraID,

          // Datos para buscar por si se cancela/mueve fecha o reserva
          reservaID,
          fechaID,

          imagen: fechaImage,

          guiaID: guia.guiaID,
        })
      );
    }
  } catch (error) {
    console.log(error);
    Alert.alert("Error", "Error mandando las notificaciones");
    return error;
  }
}

export async function sendNotification(params: {
  titulo: string;
  tipo: TipoNotificacion;
  descripcion: string;
  showAt: number;

  usuarioID: string;
  fechaID: string;
  reservaID: string;

  token: string;
}) {
  const {
    titulo,
    tipo,
    descripcion,
    showAt,
    usuarioID,
    fechaID,
    reservaID,
    token,
  } = params;

  if (token) {
    // Notificacion en celular
    sendPushNotification({
      title: titulo,
      descripcion,
      token,
      data: null,
    });
  }

  // Notificacion IN-APP
  DataStore.save(
    new Notificacion({
      tipo,

      titulo,
      descripcion,

      showAt,

      usuarioID,

      fechaID,
      reservaID,
    })
  );
}

export const vibrar = (tipo: VibrationType) => {
  switch (tipo) {
    case "light":
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      break;

    case "medium":
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      break;

    case "heavy":
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      break;

    case "error":
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      break;

    case "sucess":
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      break;

    case "select":
      Haptics.selectionAsync();
      break;

    default:
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      break;
  }
};

export declare enum VibrationType {
  light = "light",
  medium = "medium",
  heavy = "heavy",

  select = "select",
  error = "error",
  sucess = "sucess",
}

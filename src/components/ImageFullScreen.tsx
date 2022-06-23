import React, { Dispatch, SetStateAction } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

import { Entypo } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Funcion para ver las imagenes en pantalla completa
const ImageFullScreen = ({
  setModalVisible,
  images,
  titulo,
  initialImageIdx,
}: {
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  images: [
    {
      url: string;
      props?: {
        source: any;
      };
    }
  ];
  titulo?: string;
  initialImageIdx?: number;
}) => {
  initialImageIdx !== undefined ? initialImageIdx : 0;
  const { height } = Dimensions.get("screen");

  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        height,
        backgroundColor: "#000",
        paddingTop: insets.top,
      }}
    >
      <ImageViewer
        index={initialImageIdx}
        renderHeader={() => null}
        loadingRender={() => <ActivityIndicator size="large" color={"white"} />}
        enableSwipeDown={true}
        onSwipeDown={() => setModalVisible(false)}
        imageUrls={images}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          position: "absolute",
          width: "100%",
        }}
      >
        <Text style={styles.titulo}>{titulo}</Text>
        <Pressable onPress={() => setModalVisible(false)} style={styles.button}>
          <Entypo name="cross" size={24} color="white" />
        </Pressable>
      </View>
    </View>
  );
};

export default ImageFullScreen;

const styles = StyleSheet.create({
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
    position: "absolute",
    width: "100%",
    textAlign: "center",
  },

  button: {
    marginLeft: 20,
    padding: 6,
    alignSelf: "flex-start",
  },
});

import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, Image, Keyboard, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


import { colorFondo, moradoOscuro } from '../../assets/constants';
import Inicio from '../screens/Inicio';
import HeaderNav from './components/HeaderNav';

import MiPerfil from '../screens/MiPerfil';
import NotificationsTab from './NotificationsTab';
import ComponentePrueba from '../components/ComponentePrueba';
import ModalAgregar from './components/ModalAgregar';
import { useNavigation } from '@react-navigation/native';
import MapaAventuras from '../screens/MapaAventuras';


const Tab = createBottomTabNavigator()

const tamañoLogo = 35



const CustomPlus = ({ setModalVisible, esGuia }) => {
	const navigation = useNavigation()

	function handleSolicitarGuia() {
		navigation.navigate("SolicitudGuia")

	}
	function handlePress() {
		if (esGuia === null) {
			Alert.alert("Aun no puedes hacer eso")

		}

		else if (esGuia) {
			setModalVisible(true)
		}

		else {
			Alert.alert("No eres guia",
				"Debes ser guia para agregar nuevas aventuras o fechas, ¿Quieres aplicar para ser guia de Velpa?", [
				{
					text: "Cancelar",
					style: "cancel",
				},
				{
					text: "OK",
					style: "default",
					onPress: handleSolicitarGuia
				},
			])
		}
	}


	return <View style={{ justifyContent: 'center', alignItems: 'center', }}>

		<View style={{
			position: 'absolute',
			backgroundColor: '#F4F6F6',
			height: 90,
			width: 90,
			borderRadius: 100,
			bottom: 0,
			alignSelf: 'center',
		}} />
		<Pressable
			style={{
				top: -10,
				padding: 5,
				backgroundColor: '#fff',
				borderRadius: 70,

				...styles.shadow
			}}
			onPress={
				handlePress}
		>

			<View
				style={{
					width: 55,
					height: 55,
					borderRadius: 35,
					backgroundColor: moradoOscuro,
					alignItems: 'center', justifyContent: 'center',
				}}>
				<Entypo name="plus" size={50} color="white" />

				{/* <Image source={require("../../assets/icons/guia.png")} style={{
					width: 35,
					height: 35,
					tintColor: "white"

				}} /> */}
			</View>
		</Pressable>
	</View>
}

const Plus = () => {
	return null
}

const { width, height } = Dimensions.get("window")

export default () => {
	const [modalVisible, setModalVisible] = useState(false);
	const [esGuia, setEsGuia] = useState(null);

	useEffect(() => {
		verificarGuia()


	}, []);

	function verificarGuia() {
		setTimeout(() => {
			setEsGuia(true)
		}, 500);

	}

	return (
		<View style={{
			width,
			height,
		}}>

			<Tab.Navigator
				screenOptions={{
					headerShown: false,
					tabBarShowLabel: false,

					tabBarActiveTintColor: moradoOscuro,
					tabBarInactiveTintColor: "black",

					tabBarStyle: {
						paddingLeft: 10,
						paddingBottom: 10,
						elevation: 0,
						backgroundColor: '#F4F6F6',
						height: 80,
					},
				}}
			>
				<Tab.Screen
					name="Home"
					component={Inicio}
					options={{
						headerShown: true,
						header: ({ navigation }) => {
							return <HeaderNav title={"Velpa"} navigation={navigation} />
						},
						tabBarIcon: ({ color }) => (
							<View style={{ alignItems: 'center', justifyContent: 'center', }}>
								<Foundation name="home" size={tamañoLogo} color={color} />
								<Text
									numberOfLines={1}
									style={{
										fontSize: 12,
										fontWeight: 'bold',
										color
									}}>Inicio</Text>
							</View>
						),
					}}
				/>


				<Tab.Screen
					name="Explorar"
					component={MapaAventuras}

					options={{
						tabBarIcon: ({ color }) => (
							<View style={{ alignItems: 'center', justifyContent: 'center', }}>

								<Ionicons name="compass" size={tamañoLogo} color={color} />
								<Text
									numberOfLines={1}
									style={{
										fontSize: 12,
										fontWeight: 'bold',
										color
									}}>Mapa</Text>
							</View>)
					}}
				/>


				<Tab.Screen
					name={"Plus"}
					component={Plus}
					options={{
						tabBarButton: () => <CustomPlus
							esGuia={esGuia}
							setModalVisible={setModalVisible}
						/>
					}}
				/>


				<Tab.Screen
					name="Notificaciones"
					component={NotificationsTab}
					options={{
						tabBarIcon: ({ color, }) => {
							return (
								<View style={{ alignItems: 'center', justifyContent: 'center', }}>

									<FontAwesome5 name="bell" size={tamañoLogo} color={color} />
									<Text
										numberOfLines={1}
										style={{
											fontSize: 12,
											fontWeight: 'bold',
											color
										}}>Notificaciones</Text>

									{/* Indicador mensajes nuevos */}
									<View style={{
										height: 10,
										width: 10,
										borderRadius: 10,
										backgroundColor: 'red',
										position: 'absolute',
										top: 3,
										right: 24,
									}} />

								</View>)
						},
					}}
				/>

				<Tab.Screen
					name="Perfil"
					component={MiPerfil}
					options={{
						tabBarIcon: ({ color }) => (
							<View style={{ alignItems: 'center', justifyContent: 'center', }}>
								<FontAwesome name="user" size={tamañoLogo} color={color} />
								<Text
									numberOfLines={1}
									style={{
										fontSize: 12,
										fontWeight: 'bold',
										color
									}}>Perfil</Text>
							</View>

						)
					}}
				/>


			</Tab.Navigator>
			<Modal
				animationType="none"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<ModalAgregar
					setModalVisible={setModalVisible}
				/>
			</Modal>

		</View>
	)
}

const styles = StyleSheet.create({
	shadow: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.36,
		shadowRadius: 6.68,

		elevation: 11,
	}
});
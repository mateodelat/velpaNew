import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { moradoClaro, moradoOscuro } from '../../assets/constants';

export default function Header({ title, add, noArrow }) {

  const navigation = useNavigation()

  const handlePress = () => {
    navigation.pop()
  }

  return (
    <View style={{
      ...styles.header,
    }}>
      {noArrow ? null : <MaterialIcons name="keyboard-arrow-left" size={35} color="white" style={styles.icon} onPress={handlePress} />}
      {add && <MaterialIcons name="add" size={35} color="black" style={{
        position: 'absolute',
        right: 16,
      }} onPress={add} />}
      <View style={styles.headerTitle}>
        <Text style={styles.headerText} numberOfLines={1}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: moradoOscuro,
    paddingHorizontal: 50
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
    letterSpacing: 1,
    textAlign: 'center',
    // textAlignVertical: 'center'
  },
  icon: {
    position: 'absolute',
    left: 16,
  },

  headerTitle: {
    flexDirection: 'row',
  }
});
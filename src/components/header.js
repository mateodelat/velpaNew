import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { moradoOscuro } from '../../assets/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Header({ title, add, noArrow, iconRight }) {

  const navigation = useNavigation()

  const handlePress = () => {
    navigation.pop()
  }

  const insets = useSafeAreaInsets()
  return (
    <View style={{
      backgroundColor: moradoOscuro,
      paddingTop: insets.top,
    }}>
      <View style={{
        ...styles.header,
      }}>
        <View style={styles.headerTitle}>
          <Text style={styles.headerText} numberOfLines={1}>{title}</Text>
        </View>
        {noArrow ? null :
          <MaterialIcons name="keyboard-arrow-left" size={35} color="white" style={styles.icon} onPress={handlePress} />
        }
        {
          iconRight ? iconRight :
            add && <MaterialIcons name="add" size={35} color="black" style={{
              position: 'absolute',
              right: 16,
            }} onPress={add} />}
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
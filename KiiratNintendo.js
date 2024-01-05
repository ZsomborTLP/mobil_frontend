import React from 'react';
import { View, Text, StyleSheet, Button, Image, DefaultTheme, TouchableOpacity } from 'react-native';
import Ipcim from './Ipcim';
import { LinearGradient } from 'expo-linear-gradient';

const KiiratNintendo = ({ route, navigation }) => {
  const { nev } = route.params;
  const { kep } = route.params;
  const { ev } = route.params;
  const { ar } = route.params;


  return (
    <LinearGradient
      colors={['#AAD8E6', '#90EE90']}
      style={{ flex: 1, justifyContent: 'center' }}
    >

      <Text style={{ fontSize: 25, marginTop: 35, marginLeft: 15, marginRight: 15, textAlign: 'center' }}>{nev}</Text>
      <View style={styles.container}>

        <Image source={{ uri: `${Ipcim.Ipcim}${kep}` }} style={{ width: 200, height: 200, marginLeft: 'auto', marginRight: 'auto', borderRadius: 10 }} />
        <Text style={{ fontSize: 22, margin: 5, marginTop: 5 }}>Garancia {ev} év</Text>
        <Text style={{ fontSize: 25, marginBottom: 25, margin: 5, textAlign: 'right' }}>Termék ára: {ar} Ft</Text>

        <TouchableOpacity style={{ backgroundColor: "#06c995", width: 175, height: 45, padding: 8 ,borderRadius:5}} onPress={() => navigation.navigate('Kosarba', { nev: nev, ar: ar })}>
          <Text style={{ color: "black", textAlign: "center", fontSize: 18 }} >Kosárba tesz</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ backgroundColor: "#06c995", width: 135, height: 45, padding: 8 ,borderRadius:5,marginTop:15}} onPress={() => navigation.navigate('NintendoTart')}>
          <Text style={{ color: "black", textAlign: "center", fontSize: 18 }}>Vissza</Text>
        </TouchableOpacity>

      </View>
      <Image source={{ uri: `${Ipcim.Ipcim}logo.jpg` }} style={{ width: 75, height: 75, borderRadius: 55, marginBottom: 25, marginLeft: 25 }} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 25,
    marginLeft: 25,
    flex: 1,
    alignItems: 'center',
    marginTop: 45

  },
});

export default KiiratNintendo;
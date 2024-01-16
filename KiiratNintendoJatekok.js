import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ipcim from './Ipcim';
import { LinearGradient } from 'expo-linear-gradient';
import { WebView } from 'react-native-webview';


const KiiratNintendoJatekok = ({ route, navigation }) => {
  const { nev } = route.params;
  const { kep } = route.params;
  const { ev } = route.params;
  const { ar } = route.params;
  const { trailer } = route.params;

  const atvisz=()=>{
    navigation.navigate('Kosárba',{nev:nev,ar:ar});
    navigation.navigate("Home")
  }

  return (
    <LinearGradient
      colors={['#AAD8E6', '#90EE90']}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <WebView
        source={{ uri: `${trailer}` }}
        style={{ flex: 1, opacity: 0.72, width: 300 }}
      />

      <View style={styles.container}>
        <Text style={{ fontSize: 20 }}>{nev}</Text>
        <Image source={{ uri: `${Ipcim.Ipcim}${kep}` }} style={{ width: 125, height: 125, marginLeft: 'auto', marginRight: 'auto', borderRadius: 10, }} />
        <Text>Megjelenési év: {ev.split('T')[0]}</Text>
        <Text>Termék ára: {ar} Ft</Text>

        <TouchableOpacity style={{ backgroundColor: "#06c995", width: 175, height: 45, padding: 8, borderRadius: 5 }} onPress={() => atvisz()}>
          <Text style={{ color: "black", textAlign: "center", fontSize: 18 }} >Kosárba tesz</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{backgroundColor: "#06c995", width: 135, height: 45, padding: 8 ,borderRadius:5,marginTop:15}} onPress={() => navigation.navigate('Nintendo_Játékok')}>
          <Text style={{ color: "black", textAlign: "center", fontSize: 18 }} >Vissza</Text>
        </TouchableOpacity>
      </View>
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

export default KiiratNintendoJatekok;
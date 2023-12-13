import React from 'react';
import { View, Text, StyleSheet,Button,Image,DefaultTheme,TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ipcim from './Ipcim';
import { LinearGradient } from 'expo-linear-gradient';

const KiiratPlaystation = ({route,navigation}) => {
const {nev} = route.params;
const {kep} = route.params;
const {ev} = route.params;
const {ar} = route.params;


  return (
    <LinearGradient
      colors={['#AAD8E6', '#90EE90']}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
    <View style={styles.container}>
      <Text style={{fontSize:20}}>{nev}</Text>
      <Image source={{ uri: `${Ipcim.Ipcim}${kep}`}} style={{ width: 125, height: 125, marginLeft: 'auto', marginRight: 'auto', borderRadius: 10, }} />
      <Text>Garania: {ev} év</Text>
      <Text>Termék ára: {ar} Ft</Text>

      <TouchableOpacity style={{ backgroundColor: "#06c995", width: 175, height: 45, padding: 8 }} onPress={() => navigation.navigate('Kosarba',{nev:nev,ar:ar})}>
          <Text style={{ color: "black", textAlign: "center", fontSize: 18 }} >Kosárba tesz</Text>
        </TouchableOpacity>

      <TouchableOpacity style={{ backgroundColor: "#06c995", width: 175, height: 45, padding: 8 }} onPress={() => navigation.goBack()}>
          <Text style={{ color: "black", textAlign: "center", fontSize: 18 }} >Vissza</Text>
        </TouchableOpacity>

    </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight:25,
    marginLeft:25,
    flex: 1,
    alignItems: 'center',
    marginTop:45
    
  },
});

export default KiiratPlaystation;
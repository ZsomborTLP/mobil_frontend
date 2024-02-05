import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView, TextInput } from 'react-native';
import Ipcim from './Ipcim';
import { LinearGradient } from 'expo-linear-gradient';
import { WebView } from 'react-native-webview';


const KiiratXboxJatekok = ({ route, navigation }) => {
  const { nev } = route.params;
  const { kep } = route.params;
  const { id } = route.params;
  const { ev } = route.params;
  const { ar } = route.params;
  const { trailer } = route.params;


  const [data, setData] = useState([]);
  const [feltonev, setFeltoltonev] = useState('');
  const [feltoltoszoveg, setFeltoltoszoveg] = useState('');
  const [datum, setDatum] = useState('');
  const [isCollapsed, setCollapsed] = useState(true);
  var seged = Math.random(1, 500)

  const toggleCollapse = () => {
    setCollapsed(!isCollapsed);
  };

  const velemenyfeltoltes = async () => {
    /*console.log(id)
    console.log(feltonev)
    console.log(feltoltoszoveg)
    console.log(datum)*/
    if (feltonev != "" && feltoltoszoveg != "") {

      try {

        var adatok = {
          'id': id,
          'nev': feltonev,
          'comment': feltoltoszoveg,
          'datum': datum

        }

        const response = await fetch(`${Ipcim.Ipcim}VelemenyFeltoltes`, {
          method: 'POST',
          body: JSON.stringify(adatok),
          headers: { "Content-type": "application/json; charset=UTF-8" }

        });


        if (response.ok) {
          Alert.alert(
            'Felvitel sikeres!',
            ``,
            [
              {
                text: 'Ok',
                style: 'cancel',

              },
            ],
          );

          setFeltoltonev('')
          setFeltoltoszoveg('')

        }




      }
      catch (error) {
        console.error('Hiba a vélemény írás során:', error);
        Alert.alert(
          'Hiba történt!',
          'Kérjük, próbálja újra később',
          [
            {
              text: 'Ok',
              style: 'cancel',
            },
          ],
        );
      }
    }


    else {
      Alert.alert(
        'Kérem ne hagyjon üres mezőket!',
        '',
        [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ],

      );
    }

  }

  useEffect(() => {
    velemeny();
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var datum = year + '-' + month + '-' + date;
    setDatum(datum);

  }, [velemeny]);

  const velemeny = async () => {
    var adatok = {
      'trailer': trailer
    }

    try {
      const response = await fetch(`${Ipcim.Ipcim}velemeny`, {
        method: "POST",
        body: JSON.stringify(adatok),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      }

      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }


  }

  const felvitel = () => {
    navigation.navigate('Kosárba', { nev: nev, ar: ar, seged: seged });
    navigation.navigate('Home')
  }

  const felvitel2 = () => {
    navigation.navigate('Kosárba', { nev: nev, ar: ar, seged: seged })
  }

  const atvisz = () => {

    navigation.navigate("Home")
    Alert.alert(
      '',
      'Szeretnél még vásárolni?',
      [
        {
          text: 'Igen',
          onPress: () => felvitel(),
          style: 'cancel',

        },
        {
          text: 'Nem',
          onPress: () => felvitel2(),
          style: 'cancel',
        }
      ],

      //alert(nev)
    )
  }

  return (
    <LinearGradient
      colors={['#AAD8E6', '#90EE90']}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      
      <Text style={{ marginTop: -5 }}></Text>
        <View style={{ height: 250, width: 350,marginLeft:'auto',marginRight:'auto',justifyContent:'center' }}>
          <WebView
            source={{ uri: `${trailer}` }}
            style={{ flex: 1, opacity: 0.72 }}
          />
        </View>
      <ScrollView style={styles.container}>
      <Text style={{ textAlign: 'center', fontSize: 25, marginBottom: 5 }}>{nev}</Text>
        <Image source={{ uri: `${Ipcim.Ipcim}${kep}` }} style={{ width: 125, height: 125, marginLeft: 'auto', marginRight: 'auto', borderRadius: 10, }} />
        <Text style={{ textAlign: 'center', fontSize: 20,marginRight:'auto',marginLeft:'auto' }}>Megjelenési év: {ev.split('T')[0]}</Text>
        <Text style={{ textAlign: 'center', fontSize: 20,marginLeft:'auto',marginRight:'auto' }}>Termék ára: {ar} Ft</Text>

        <TouchableOpacity style={{ backgroundColor: "#06c995", width: 180, height: 50, padding: 8, borderRadius: 5,marginLeft:'auto',marginRight:'auto' }} onPress={() => atvisz()}>
          <Text style={{ color: "black", textAlign: "center", fontSize: 22 }} >Kosárba tesz</Text>
        </TouchableOpacity>


        <TouchableOpacity style={{ backgroundColor: "#06c995", width: 115, height: 45, padding: 8, borderRadius: 5, marginTop: 15,marginRight:'auto',marginLeft:'auto' }} onPress={() => navigation.goBack()}>
          <Text style={{ color: "black", textAlign: "center", fontSize: 18 }} >Vissza</Text>
        </TouchableOpacity>
<Text></Text>

        <Text style={{ fontSize: 20,marginLeft:'auto',marginRight:'auto' }}>Vélemények: </Text>

        {data.map((item) => {
          return (
            <View style={{ borderWidth: 1, borderColor: 'green', borderRadius: 7, marginBottom: 8 }} >
            <Text style={{marginLeft:30,fontSize:20}}>{item.velemeny_nev} <Text style={{ fontSize: 12, color: 'grey' }}>közzétéve: {item.velemeny_ido.split('T')[0]}:</Text></Text>
            <Text style={{fontSize:15,marginLeft:5}}>{item.velemeny_szoveg}</Text>
            </View>
          )
        }
        )}


        <TouchableOpacity style={{ backgroundColor: "#06c995", width: 155, height: 45, padding: 8, borderRadius: 5, marginTop: 15,marginLeft:'auto',marginRight:'auto' }} onPress={toggleCollapse}>
          <Text style={{ color: "black", textAlign: "center", fontSize: 20 }} >Vélemény írás</Text>
        </TouchableOpacity>
        <Text></Text>
        {isCollapsed ? null : (
          <View style={styles.collapsibleContent}>
            <View style={{ alignItems: 'center' }}>

              <Text style={{ marginRight: 285, fontSize: 25 }}>Név:</Text>
              <TextInput
                style={{ width: 240, height: 40, margin: 12, borderWidth: 1, padding: 10 }}
                placeholder="Pl: Fekete Ádám"
                onChangeText={newText => setFeltoltonev(newText)}
                defaultValue={feltonev}
              />

              <Text style={{ marginTop: 10, fontSize: 25, marginRight: 190 }}>Hozzászólás:</Text>
              <TextInput
                style={{ height: 40, width: 240, height: 240, margin: 12, borderWidth: 1, padding: 10, textAlignVertical: 'top' }}
                placeholder="Pl:Nekem a pókember film nem tetszett, a felétől unalmas és monoton volt az egész."
                onChangeText={newText => setFeltoltoszoveg(newText)}
                defaultValue={feltoltoszoveg}
                numberOfLines={20}
                multiline={true}
                keyboardType="email-address"
              />




              <View>
                <TouchableOpacity style={{ backgroundColor: "green", width: 185, height: 57, padding: 8, borderRadius: 25, marginTop: 15 }} onPress={() => velemenyfeltoltes()}>
                  <Text style={{ color: "black", textAlign: "center", fontSize: 26, marginTop: 1 }} >Hozzászólás</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        )}

        
      </ScrollView>
      
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {

    marginRight: 25,
    marginLeft: 25,
    flex: 1,
    marginTop:5
  },
});
export default KiiratXboxJatekok;

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import Ipcim from './Ipcim';

const Proba2 = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [komponensdata, setKomponensData] = useState([]);
  const [valasztott, valasztottKomponens] = useState();


  const getKomponens = async () => {
    try {
      const response = await fetch(`${Ipcim.Ipcim}KomponensSeged`);
      const json = await response.json();
      setKomponensData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    getMovies();
  };

  const keresfuggveny = async () => {
    //alert(valasztott)

    if (valasztott == '120') {
      getMovies()
    }
    else {
      var adatok = {
        'bevitel1': valasztott
      }

      try {
        const response = await fetch(`${Ipcim.Ipcim}keresszoveg`, {
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
  }


  const getMovies = async () => {
    try {
      const response = await fetch(`${Ipcim.Ipcim}pcAlkatresz`);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);

    }

  };

  useEffect(() => {
    getKomponens();


  }, []);

  return (

    <LinearGradient
      colors={['#AAD8E6', '#90EE90']}
      style={{ flex: 1 }}
    >
      <View style={{marginTop:-20}}>

        <Picker
          style={{ backgroundColor: "#06c995", margin: 25, height: 50, width: 200, padding: 5 }}
          mode="dropdown"
          dropdownIconColor={'white'}
          selectedValue={valasztott}
          onValueChange={(itemValue, itemIndex) => {
            valasztottKomponens(itemValue);

          }}

        >
          <Picker.Item style={{ backgroundColor: '#06c995', borderWidth: 1, borderColor: 'black' }} label='Összes' value='120' />

          {komponensdata.map((item) => {
            return (

              <Picker.Item style={{ backgroundColor: '#06c995', borderWidth: 1, borderColor: 'black' }} label={item.komponens_nev} value={item.komponens_id} />

            )
          }
          )}
        </Picker>

        <TouchableOpacity style={{ backgroundColor: "#06c995", width: 125, height: 45, padding: 8, borderRadius: 5, marginLeft: 245, marginTop: -77 }} onPress={() => keresfuggveny()}>
          <Text style={{ color: "black", textAlign: "center", fontSize: 18 }} >Keresés</Text>
        </TouchableOpacity>

      </View>
      <View style={{ flex: 1, padding: 24, marginTop: -10, marginBottom: -20 }}>

        {isLoading ? (
          
          <ActivityIndicator />
        ) : (

          <FlatList
          data={data}
          keyExtractor={({ alkatresz_id }) => alkatresz_id.toString()} 
          renderItem={({ item }) => (
            <View key={item.alkatresz_id.toString()}>
              <Text style={{ textAlign: 'center', fontSize: 20, marginBottom: 5 }}>
                {item.alkatresz_info}
              </Text>
              <Image source={{ uri: `${Ipcim.Ipcim}${item.alkatresz_kep}` }} style={{ width: 135, height: 135, marginLeft: 'auto', marginRight: 'auto', borderRadius: 10 }} />
              <Text style={{ textAlign: 'center', fontSize: 20 }}>{item.alkatresz_ar} FT</Text>
              <TouchableOpacity style={{ backgroundColor: "#06c995", width: 175, height: 45, padding: 8, marginLeft: 87, borderRadius: 5 }} onPress={() => navigation.navigate('Alkatrész', { nev: item.alkatresz_info, kep: item.alkatresz_kep, garancia: item.alkatresz_garancia, ar: item.alkatresz_ar })}>
                <Text style={{ color: "black", textAlign: "center", fontSize: 18 }} >Részletek</Text>
              </TouchableOpacity>
              <View style={{ marginTop: 15, marginBottom: 50, borderColor: 'gray', borderWidth: 1 }}></View>
            </View>
          )}
        />
        )}

      </View>
    </LinearGradient>


  );
};

export default Proba2;
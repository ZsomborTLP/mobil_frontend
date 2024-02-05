import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, TouchableOpacity, Text, ScrollView, TextInput,Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import Ipcim from './Ipcim'
import { Picker } from '@react-native-picker/picker';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [bevitel1, setBevitel1] = useState('');
  const [bevitel2, setBevitel2] = useState('');
  const [bevitel3, setBevitel3] = useState('');
  const [bevitel4, setBevitel4] = useState('');
  var [jelenlegidatum, setJelenlegidatum] = useState('');

  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  var datum = year + '-' + month + '-' + date;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [valasztott, valasztottKomponens] = useState();

  const getKomponens = async () => {
    try {
      const response = await fetch(`${Ipcim.Ipcim}KomponensSeged`);
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

  const createFormData = (photo, body = {}) => {
    const data = new FormData();
  
    if (!photo || (photo.cancelled || photo.canceled)) {
      console.warn('Photo selection was cancelled or failed.');
      return null;
    }
  
    if (photo.assets && photo.assets.length > 0) {
      const asset = photo.assets[0];
      data.append('photo', {
        name: 'photo.jpg',
        type: 'image/jpg',
        uri: asset.uri,
      });
    } else {
      data.append('photo', {
        name: 'photo.jpg',
        type: 'image/jpg',
        uri: Platform.OS === 'android' ? photo.uri.replace('file://', '') : photo.uri,
      });
    }
  
    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });
  
    return data;
  };

  const handleUploadPhoto = async () => {
    console.log(image)
    /*
    console.log(bevitel1)
    console.log(bevitel2)
    console.log(bevitel3)
    console.log(bevitel4)
    console.log(datum)
    console.log(valasztott)
    */
    if (bevitel1 != "" && bevitel2 != "" && bevitel3 != "" && bevitel4!="") {
      if (bevitel2.includes('@gmail.com') || bevitel2.includes('@freemail.hu') || bevitel2.includes('citromail.hu')) {

        try {
          if (!image) {
            alert('Válassz egy képet először!');
            return;
          }

          const response = await fetch(`${Ipcim.Ipcim}api/upload`, {
            method: 'POST',
            body: createFormData(image, { bevitel1: bevitel1, datum: datum, bevitel2: bevitel2, bevitel3: bevitel3, bevitel4: bevitel4, bevitel5: valasztott }),
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          if (!response.ok) {
            // throw new Error('Network request failed');
          }

          const uzenet = await response.text();
          console.log(uzenet)
        } catch (error) {
          console.log('error', error);
        }
      }
      else {
        Alert.alert(
          'Hiba történt a vásárlás során',
          'Kérjük, vásárlás során érvényes email címet adjon meg! (gmail,citromail,freemail)',
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
        'Kérem adja meg az adatait!',
        '',
        [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ],

      );
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.cancelled) {
      setImage(result);
    }
  };

  return (
    <LinearGradient
      colors={['#AAD8E6', '#90EE90']}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <ScrollView style={{ margin: 25, flex: 1 }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ padding: 10 }}>
            Termék neve:
          </Text>
          <TextInput
            style={{ width: 350, height: 40, margin: 5, fontSize: 16, backgroundColor: "#AAD8E6" }}
            placeholder="Ide ird a nevét a terméknek: "
            onChangeText={newText => setBevitel1(newText)}
            defaultValue={bevitel1}
          />

          <View style={{ width: 200, height: 200 }}>
            {image && <Image source={{ uri: image.uri }} style={{ flex: 1 }} />}
          </View>

          <TouchableOpacity style={{ backgroundColor: "#06c995", width: 175, height: 45, padding: 8, borderRadius: 5 }} onPress={pickImage}>
            <Text style={{ color: "black", textAlign: "center", fontSize: 18 }} >Kép kiválasztása</Text>
          </TouchableOpacity>

          <Picker style={{ backgroundColor: "#06c995", margin: 25, height: 50, width: 200, padding: 5 }}
            selectedValue={valasztott}
            mode='dialog'
            onValueChange={(itemValue, itemIndex) =>
              valasztottKomponens(itemValue)
            }>
            {data.map((item) => {
              return (
                <Picker.Item style={{ borderWidth: 1, borderColor: 'black' }} label={item.komponens_nev} value={item.komponens_id} />
              )
            }
            )}
          </Picker>

          <Text>Elérhetőség:</Text>
          <TextInput
            style={{ width: 350, height: 40, margin: 5, fontSize: 16, backgroundColor: "#AAD8E6" }}
            placeholder="Pl: Kiss.Ábel@gmail.com"
            onChangeText={newText => setBevitel2(newText)}
            defaultValue={bevitel2}
            keyboardType="email-address"

          />


          <Text>Termék állapota:</Text>
          <TextInput
            style={{ width: 350, height: 40, margin: 5, fontSize: 16, backgroundColor: "#AAD8E6" }}
            placeholder="Pl: Korszerű"
            onChangeText={newText => setBevitel3(newText)}
            defaultValue={bevitel3}
          />


          <Text>Termék ára:</Text>
          <TextInput
            style={{ width: 350, height: 40, margin: 5, fontSize: 16, backgroundColor: "#AAD8E6" }}
            placeholder="Pl: 12500"
            onChangeText={newText => setBevitel4(newText)}
            defaultValue={bevitel4}
            maxLength={7}
            keyboardType='numeric'
          />


          <TouchableOpacity style={{ backgroundColor: "green", width: 125, height: 45, padding: 10, borderRadius: 5, marginTop: 15 }} onPress={handleUploadPhoto}>
            <Text style={{ color: "white", textAlign: "center", fontSize: 18, marginTop: -1 }} >Feltöltés</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
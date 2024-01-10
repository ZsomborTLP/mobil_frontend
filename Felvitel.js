import React, { useState, useEffect } from 'react';
import { Button, Image, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import Ipcim from './Ipcim'



export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [bevitel1, setBevitel1] = useState('');
  const [bevitel2, setBevitel2] = useState('');
  const [bevitel3, setBevitel3] = useState('');
  const [bevitel4, setBevitel4] = useState('');
  var [jelenlegidatum, setJelenlegidatum] = useState('');

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
    /*
    var nap = new Date().getDate();
    var honap = new Date().getMonth() + 1;
    var ev = new Date().getFullYear();
    setJelenlegidatum = (ev + '-' + honap + '-' + nap)
*/
    getKomponens();
  }, []);

  const createFormData = (photo, body = {}) => {
    const data = new FormData();

    data.append('photo', {
      name: 'photo.jpg',
      type: 'image/jpg',
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    return data;
  };

  const handleUploadPhoto = async () => {
    
    
    try {
      if (!image) {
        console.log('Válassz egy képet először!');
        return;
      }

      const response = await fetch(`${Ipcim.Ipcim}api/upload`, {
        method: 'POST',
        body: createFormData(image, { bevitel1: bevitel1, bevitel2: bevitel2, bevitel3: bevitel3, bevitel4: bevitel4, bevitel5: valasztott }),
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert("Sikeres feltöltés!")
      if (!response.ok) {
        throw new Error('Network request failed');
      }

      const data = await response.json();
      console.log('response', data);
    } catch (error) {
      console.log('error', error.message);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

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

          {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}

          <TouchableOpacity style={{ backgroundColor: "#06c995", width: 175, height: 45, padding: 8, borderRadius: 5 }} onPress={() => pickImage()}>
            <Text style={{ color: "black", textAlign: "center", fontSize: 18 }} >Kép kiválasztása</Text>
          </TouchableOpacity>


          <Picker style={{ backgroundColor: "#06c995", margin: 25, height: 50, width: 200 }}
            selectedValue={valasztott}
            onValueChange={(itemValue, itemIndex) =>
              valasztottKomponens(itemValue)
            }>
            {data.map((item) => {
              return (
                <Picker.Item label={item.komponens_nev} value={item.komponens_id} />
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
          />


          <TouchableOpacity style={{ backgroundColor: "green", width: 125, height: 45, padding: 10, borderRadius: 5, marginTop: 15 }} onPress={() => handleUploadPhoto()}>
            <Text style={{ color: "white", textAlign: "center", fontSize: 18, marginTop: -1 }} >Feltöltés</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
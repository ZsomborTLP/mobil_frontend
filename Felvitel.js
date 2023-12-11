import React, { useState, useEffect } from 'react';
import { Button, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import Ipcim from './Ipcim'



export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [bevitel1, setBevitel1] = useState('');
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
        body: createFormData(image, { bevitel1: bevitel1 }),
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

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
    <View style={{ margin:25,flex: 1, alignItems: 'center' }}>
      <Text style={{ padding: 10 }}>
        Termék neve:
      </Text>

      <TextInput
        style={{ width:350, height: 40, margin: 5, fontSize:16, backgroundColor:"#AAD8E6" }}
        placeholder="Ide ird a nevét a terméknek: "
        onChangeText={newText => setBevitel1(newText)}
        defaultValue={bevitel1}
      />

      {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}

      <TouchableOpacity style={{backgroundColor:"#06c995",width:175,height:45,padding:8}} onPress={()=>pickImage()}>
         <Text style={{color:"black", textAlign:"center", fontSize:18}} >Kép kiválasztása</Text>
      </TouchableOpacity>


      <Picker style={{backgroundColor:"#06c995",margin:25,height:50,width:200}}
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



      <TouchableOpacity style={{backgroundColor:"green",width:105,height:45,padding:10}} onPress={()=>handleUploadPhoto()}>
         <Text style={{color:"white", textAlign:"center", fontSize:15}} >Feltöltés</Text>
      </TouchableOpacity>
    </View>
    </LinearGradient>
  );
}
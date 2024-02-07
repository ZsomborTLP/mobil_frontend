import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import Ipcim from './Ipcim';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';

const Kosárba = ({ route, navigation }) => {
  const { nev, ar,seged } = route.params || { nev: '', ar: 0,seged:0 };
  const [osszes, setOsszes] = useState(ar);
  const [adatok, setAdatok] = useState([]);
  
  //alert(nev)


  useEffect(() => {
    if (nev !== '' && ar !== 0) {
      //alert(seged)
      setAdatok((elozoAdatok) => [...elozoAdatok, { nev, ar }]);
      setOsszes((elozoOsszeg) => elozoOsszeg + ar);
    }
  }, [nev, ar, seged]);

  const torles = (index) => {
    const toroltAr = adatok[index].ar; 
    const ujAdatok = [...adatok];
    ujAdatok.splice(index, 1);
    setAdatok(ujAdatok);
    setOsszes((elozoOsszeg) => elozoOsszeg - toroltAr);
  };

  const urites = () => {
    if (osszes == 0) {
      Alert.alert(
        'A kosarad jelenleg üres!',
        '',
        [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ],
      );
      navigation.navigate('Home');
    }
    else{
      Alert.alert(
        '',
        'Biztos ki üríted a kosarad? ',
        [
          {
            text: 'Igen',
            onPress: () => veglegesurites(),
            style: 'cancel',
            
          },
          {
            text: 'Nem',
            style: 'cancel',
          }
        ],)
      };
    }

const veglegesurites=()=>{
  if (osszes == 0) {
    Alert.alert(
      'A kosarad jelenleg üres!',
      '',
      [
        {
          text: 'Ok',
          style: 'cancel',
        },
      ],
    );
    navigation.navigate('Home');
  }
  setAdatok([]);
  setOsszes(0);
}

  const vasarlas = () => {
    if (osszes !== 0) {
      navigation.navigate('Megerosit',{osszes:osszes});
    } else {
      Alert.alert(
        'A kosarad jelenleg üres!',
        '',
        [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ],
      );
      navigation.navigate('Home');
    }
  };

  return (
    <LinearGradient
      colors={['#AAD8E6', '#90EE90']}
      style={{ flex: 1, justifyContent: 'center' }}
    >
      {adatok.length === 0 ? (
  <View style={{}}>
    <Text style={{fontSize:22,marginTop:"70%",marginLeft:"18%",color:"grey"}}>A kosarad jelenleg üres.</Text>
  </View>
) : null}


      <ScrollView>
        <View>
          <FlatList
            data={adatok}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View key={item.id}>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>{item.nev}</Text>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>{item.ar} FT</Text>
                <TouchableOpacity
                  style={{ marginLeft: 300, backgroundColor: 'red', width: 45, height: 30, paddingTop: 8.5, borderRadius: 20 }}
                  onPress={() => torles(index)}>
                  <Text style={{ color: 'white', textAlign: 'center', fontSize: 8 }} >Törlés</Text>
                </TouchableOpacity>
                <View style={{ marginTop: 10 , marginBottom: 10, borderColor: 'gray', borderWidth: 1 }}></View>
              </View>
            )}
          />
        </View>
        
      </ScrollView>

      <View style={styles.controls} elevation={6}>
          <Text style={{ marginBottom: 20, fontSize: 20, marginLeft: 90, textAlign: 'center',marginBottom:-10, }}>Összes ár: {osszes} FT</Text>
          <Image source={{ uri: `${Ipcim.Ipcim}logo.jpg` }} style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 25, marginLeft: 25, marginTop: -50 ,marginBottom:60}} />
          <TouchableOpacity style={{ backgroundColor: '#06c995', width: 185, height: 60, padding: 8, marginLeft: 175, borderRadius: 25, marginTop: -70, paddingTop: 10,marginBottom:-65 }} onPress={() => vasarlas()}>
            <Text style={{ color: 'black', textAlign: 'center', fontSize: 25}} >Vásárlás</Text>
          </TouchableOpacity>
          <Text></Text>
          <TouchableOpacity style={{ backgroundColor: 'red', width: 135, height: 45, padding: 8, marginLeft: 10, borderRadius: 25,marginBottom:8 }} onPress={() => urites()}>
            <Text style={{ color: 'black', textAlign: 'center', fontSize: 18 }} >Kosár ürítése!</Text>
          </TouchableOpacity>
        </View>
    </LinearGradient>
  );
};
const styles = {
  controls: {
    
    borderRadius: 5, 
    padding: 20,
    marginLeft:-10,
    marginRight:-20, 
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    margin: 10, 
    marginBottom:-15,
    marginTop:-15,
    

    
  },
};

export default Kosárba;
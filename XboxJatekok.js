import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, Button ,TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ipcim from './Ipcim';

const XboxJatekok = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch(`${Ipcim.Ipcim}XboxJatekok`);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    
    <LinearGradient
      colors={['#AAD8E6', '#90EE90']}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      
      <View style={{ flex: 1, padding: 24,marginTop:-20,marginBottom:-20}}>

        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({ jatekok_id }) => jatekok_id}
            renderItem={({ item }) => (
              <View key={item.jatekok_id}>
                <Text style={{ textAlign: 'center', fontSize: 20, marginBottom: 5 }}>
                  {item.jatekok_nev}
                </Text>
                <Image source={{ uri: `${Ipcim.Ipcim}${item.jatekok_kep}` }} style={{ width: 125, height: 125, marginLeft: 'auto', marginRight: 'auto', borderRadius: 10 }} />


                <Text style={{textAlign: 'center', fontSize: 20 }}>{item.jatekok_ar} FT</Text>

            <TouchableOpacity style={{ backgroundColor: "#06c995", width: 175, height: 45, padding: 8, marginLeft: 78, borderRadius: 5 }} onPress={() => navigation.navigate('Játék_Xbox', {id:item.jatekok_id,nev:item.jatekok_nev, kep:item.jatekok_kep, ar:item.jatekok_ar, ev:item.jatekok_megjelenes, trailer:item.jatekok_trailer })}>
                <Text style={{ color: "black", textAlign: "center", fontSize: 18 }} >Részletek</Text>
            </TouchableOpacity>


                


                <View style={{ marginTop: 15, marginBottom: 20, borderColor: 'gray', borderWidth: 1 }}></View>

              </View>
            )}
          />


          
        )}

      </View>
    </LinearGradient>

    
  );
};

export default XboxJatekok;
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, Button ,TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ipcim from './Ipcim';

const Proba2 = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch(`${Ipcim.Ipcim}Playstationtart`);
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
      
      <View style={{ flex: 1, padding: 24, }}>

        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({ alkatresz_id }) => alkatresz_id}
            renderItem={({ item }) => (
              <View>
                <Text style={{ textAlign: 'center', fontSize: 20, marginBottom: 5 }}>
                  {item.alkatresz_info}
                </Text>
                <Image source={{ uri: `${Ipcim.Ipcim}${item.alkatresz_kep}` }} style={{ width: 125, height: 125, marginLeft: 'auto', marginRight: 'auto', borderRadius: 10 }} />


                <Text style={{ textAlign: 'center', fontSize: 20 }}>{item.alkatresz_ar} FT</Text>

            <TouchableOpacity style={{ textAlign:'center', backgroundColor: "#06c995", width: 175, height: 45, padding: 8,marginLeft:65 }} onPress={() => navigation.navigate('KiiratPlaystation', {nev:item.alkatresz_info, kep:item.alkatresz_kep, ar:item.alkatresz_ar, ev:item.alkatresz_garancia })}>
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
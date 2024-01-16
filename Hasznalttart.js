import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image ,TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ipcim from './Ipcim';

const Hasznalttart = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch(`${Ipcim.Ipcim}Hasznalttart`);
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
                  {item.hasznalt_info}
                </Text>
                <Image source={{ uri: `${Ipcim.Ipcim}${item.hasznalt_kep}` }} style={{ width: 125, height: 125, marginLeft: 'auto', marginRight: 'auto', borderRadius: 10 }} />


                <Text style={{ textAlign: 'center', fontSize: 20 }}>{item.hasznalt_ar} FT</Text>

            <TouchableOpacity style={{ backgroundColor: "#06c995", width: 175, height: 45, padding: 8, marginLeft: 82 ,marginRight:80}} onPress={() => navigation.navigate('HasználtTartozék', {nev:item.hasznalt_info, kep:item.hasznalt_kep, ar:item.hasznalt_ar, allapot:item.hasznalt_allapot })}>
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

export default Hasznalttart;
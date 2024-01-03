import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity,Alert } from 'react-native';
import Ipcim from './Ipcim';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';

const Kosarba = ({ route }) => {
    const { nev } = route.params;
    const { ar } = route.params;
    //const { adatok } = route.params;
    //const [ujAdatok, setUjAdatok] = useState(adatok);
    const [adatok, setAdatok] = useState([]);

    useEffect(() => {

        setAdatok((elozoAdatok) => [...elozoAdatok, [nev, ar]]);
    }, [nev, ar]);

    const torles = (index) => {
        const ujAdatok = [...adatok];
        ujAdatok.splice(index, 1);
        setAdatok(ujAdatok);
    };
    //
    const megvetted =()=>{
        Alert.alert(
            'Vásárlás sikeres!',
            'Az általad kiválasztott terméket, termékeket átveheted Debrecen, Piac utca 8. szám alatt, 5-8 munkanapon belül.',
            [
              {
                text: 'Ok',
                
                style: 'cancel',
              },
            ],
            
          );
    }
    return (
        <LinearGradient
            colors={['#AAD8E6', '#90EE90']}
            style={{ flex: 1, justifyContent: 'center' }}
        >
            <ScrollView>
                <View>
                    <FlatList
                        data={adatok}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item,index }) => (
                            <View>
                                <Text style={{ fontSize: 20, textAlign: 'center' }}>{item[0]}</Text>
                                <Text style={{ fontSize: 20, textAlign: 'center' }}>{item[1]} FT</Text>
                                <TouchableOpacity
                                    style={{ marginLeft: 300, backgroundColor: "red", width: 45, height: 30, paddingTop: 8.5, borderRadius: 20 }}
                                    onPress={() => torles(index)}>
                                    <Text style={{ color: "white", textAlign: "center", fontSize: 8 }} >Törlés</Text>
                                </TouchableOpacity>


                                <View style={{ marginTop: 15, marginBottom: 10, borderColor: 'gray', borderWidth: 1 }}></View>
                            </View>

                        )}
                    />

                </View>
                <View>

                    <TouchableOpacity style={{ marginRight: 'auto', marginLeft: 'auto', backgroundColor: "green", width: 105, height: 45, padding: 10 }} onPress={megvetted}>
                        <Text style={{ color: "white", textAlign: "center", fontSize: 15 }} >Vásárlás</Text>
                    </TouchableOpacity>
                    <Image source={{ uri: `${Ipcim.Ipcim}logo.jpg` }} style={{ width: 75, height: 75, borderRadius: 55, marginBottom: 25, marginLeft: 25, marginTop: -50 }} />
                </View>
            </ScrollView>



        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        marginRight: 25,
        marginLeft: 25,
        flex: 1,
        alignItems: 'center',
        marginTop: 5

    },
});

export default Kosarba;
import React, { useEffect, useState } from 'react';     
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import Ipcim from './Ipcim';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';


const Kosarba = ({ route, navigation }) => {
    const { nev } = route.params;
    const { ar } = route.params;
    const [osszes, setOsszes] = useState(0);
    //const { adatok } = route.params;
    //const [ujAdatok, setUjAdatok] = useState(adatok);
    const [adatok, setAdatok] = useState([]);



    useEffect(() => {

        setAdatok((elozoAdatok) => [...elozoAdatok, [nev, ar]]);
        setOsszes((elozoOsszeg) => elozoOsszeg + ar);
    }, [nev, ar]);

    useEffect(() => {
        if (ar === 0) {
            urites();
        }
    }, [ar]);


    

    const torles = (index) => {
        const toroltAr = adatok[index][1];
        const ujAdatok = [...adatok];
        ujAdatok.splice(index, 1);
        setAdatok(ujAdatok);
        setOsszes((elozoOsszeg) => elozoOsszeg - toroltAr);
    };

    const urites = () => {
        const ujAdat = []
        setAdatok(ujAdat);
        setOsszes(0)
    }

    const vasarlas=()=>{
        if(osszes!=0){
            navigation.navigate("Megerosit")
        }
        else{
            Alert.alert(
                'A kosarad jelenleg üres!',
                ``,
                [
                    {
                        text: 'Ok',
                        style: 'cancel',
                        
                    },
                ],
            );
            navigation.navigate('Home')
        }
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
                        renderItem={({ item, index }) => (

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
                    <Text style={{ marginBottom: 20, fontSize: 20, marginLeft: 90, textAlign: 'center' }}>Összes ár: {osszes}FT</Text>
                    <Image source={{ uri: `${Ipcim.Ipcim}logo.jpg` }} style={{ width: 75, height: 75, borderRadius: 55, marginBottom: 25, marginLeft: 25, marginTop: -50 }} />
                    <TouchableOpacity style={{ backgroundColor: "#06c995", width: 185, height: 60, padding: 8, marginLeft: 175, borderRadius: 25, marginTop: -50, paddingTop: 10 }} onPress={() => vasarlas()}>
                        <Text style={{ color: "black", textAlign: "center", fontSize: 25 }} >Vásárlás</Text>
                    </TouchableOpacity>

                    <Text></Text>

                    <TouchableOpacity style={{ backgroundColor: "red", width: 145, height: 45, padding: 8, marginLeft: 25, borderRadius: 25 }} onPress={() => urites()}>
                        <Text style={{ color: "black", textAlign: "center", fontSize: 18 }} >Kosár ürítése!</Text>
                    </TouchableOpacity>

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
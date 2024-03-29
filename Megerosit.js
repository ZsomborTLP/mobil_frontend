import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ipcim from './Ipcim';

const Megerosit = ({ navigation, route }) => {
    const { osszes } = route.params || { osszes: 0 }
    const [nev, setNev] = useState('');
    const [email, setEmail] = useState('');
    const [telefonszam, setTelefonszam] = useState('');
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var datum = year + '-' + month + '-' + date;

    const [ar, setAr] = useState(0);

    useEffect(() => {
        //alert(osszes)
    }, [osszes, datum],)
    const megVasarlas = async () => {

        if (nev != "" && email != "" && telefonszam != "") {
            if (!/\d/.test(nev)) {
                if (email.includes('@gmail.com') || email.includes('@freemail.hu') || email.includes('citromail.hu')) {
                    if (telefonszam.includes('.') || telefonszam.includes(',')) {
                        Alert.alert(
                            'Hiba történt a vásárlás során',
                            'Kérjük, érvényes telefonszámot adjon meg ("." és "," használata nélkül)',
                            [
                                {
                                    text: 'Ok',
                                    style: 'cancel',
                                },
                            ],
                        );
                    }
                    else {
                        try {

                            var adatok = {
                                'nev': nev,
                                'email': email,
                                'telefonszam': telefonszam,
                                'datum': datum,
                                'osszar': osszes
                            }

                            const response = await fetch(`${Ipcim.Ipcim}rendeles`, {
                                method: 'POST',
                                body: JSON.stringify(adatok),
                                headers: { "Content-type": "application/json; charset=UTF-8" }

                            });


                            if (response.ok) {
                                Alert.alert(
                                    'Vásárlás sikeres!',
                                    `További információkkal értesítjük önt emailben.`,
                                    [
                                        {
                                            text: 'Ok',
                                            style: 'cancel',

                                        },
                                    ],
                                );
                                navigation.navigate("Kosárba", { nev: nev, ar: ar });
                                navigation.navigate('Home')
                            }




                        }
                        catch (error) {
                            console.error('Hiba a vásárlás során:', error);
                            Alert.alert(
                                'Hiba történt a vásárlás során',
                                'Kérjük, próbálja újra később',
                                [
                                    {
                                        text: 'Ok',
                                        style: 'cancel',
                                    },
                                ],
                            );
                        }
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
            else{
                Alert.alert(
                    '',
                    'A neved ne tartalmazzon számot!',
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

        }
        return (
            <LinearGradient
                colors={['#AAD8E6', '#90EE90']}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            >
                <ScrollView style={{ margin: 25, flex: 1 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ padding: 10, fontSize: 25 }}>
                            Teljes név:
                        </Text>

                        <TextInput
                            style={{ width: 350, height: 40, margin: 5, fontSize: 16, backgroundColor: "#AAD8E6" }}
                            placeholder="Pl: Fekete Ádám"
                            onChangeText={newText => setNev(newText)}
                            defaultValue={nev}
                        />


                        <Text style={{ marginTop: 10, fontSize: 25 }}>Email cím:</Text>
                        <TextInput
                            style={{ width: 350, height: 40, margin: 5, fontSize: 16, backgroundColor: "#AAD8E6" }}
                            placeholder="Pl: Kiss.Ábel@gmail.com"
                            onChangeText={newText => setEmail(newText)}
                            defaultValue={email}
                            keyboardType="email-address"
                        />

                        <Text style={{ marginTop: 10, fontSize: 25 }}>Telefonszám:</Text>
                        <TextInput
                            style={{ width: 350, height: 40, margin: 5, fontSize: 16, backgroundColor: "#AAD8E6" }}
                            placeholder="Pl: 06362553580"
                            onChangeText={newText => setTelefonszam(newText)}
                            defaultValue={telefonszam}
                            keyboardType='numeric'
                            maxLength={11}
                        />
                        <View>
                            <TouchableOpacity style={{ backgroundColor: "green", width: 145, height: 57, padding: 8, borderRadius: 25, marginTop: 15 }} onPress={megVasarlas}>
                                <Text style={{ color: "black", textAlign: "center", fontSize: 26, marginTop: 1 }} >Vásárlás</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: "#06c995", width: 125, height: 45, padding: 8, borderRadius: 25, marginLeft: 11, marginTop: 15 }} onPress={() => navigation.goBack()}>
                                <Text style={{ color: "black", textAlign: "center", fontSize: 18 }} >Vissza</Text>
                            </TouchableOpacity>


                        </View>
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
            marginTop: 45

        },
    });

    export default Megerosit;
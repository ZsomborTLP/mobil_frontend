/*import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Text, View, Image, Button, TouchableOpacity, TextInput, StyleSheet, alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ipcim from './Ipcim';

const Hozzaszolas = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [text1, text2, onChangeText1, onChangeText2] = React.useState('');
    const [nev, setNev] = useState('')
    const [comment, setComment] = useState('');
    const [datum, setDatum] = useState('');





    useEffect(() => {

        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var datum = year + '-' + month + '-' + date;
        setDatum(datum);
    },[]);

    const HozzaszolasComment = async () => {
        alert(nev)
        alert(comment)
        if (nev != "" && comment != "") {
            try {

                var adatok = {
                    'nev': nev,
                    'comment': comment,
                    'datum': datum
                }

                const response = await fetch(`${Ipcim.Ipcim}CommentFeltoltes`, {
                    method: 'POST',
                    body: JSON.stringify(adatok),
                    headers: { "Content-type": "application/json; charset=UTF-8" }

                });
                if (response.ok) {
                    Alert.alert(
                        'Hozzászólás sikeres!',
                        ``,
                        [
                            {
                                text: 'Ok',
                                style: 'cancel',

                            },
                        ],
                    );
                    navigation.goBack();
                }
                else {
                    console.error('Fetch error:', response.statusText);
                }
            }
            catch (error) {
                console.error('Hiba: ', error);
                Alert.alert(
                    'Hiba történt',
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
            <View style={{ flex: 1, padding: 24 }}>

                <View>
                <TextInput
                        style={{ width: 350, height: 40, margin: 5, fontSize: 16, backgroundColor: "#AAD8E6" }}
                        placeholder="Név:"
                        onChangeText={newText => setNev(newText)}
                        defaultValue={nev}
                        maxLength={11}
                    />
                    <TextInput
                        style={{ width: 350, height: 40, margin: 5, fontSize: 16, backgroundColor: "#AAD8E6" }}
                        placeholder="Hozzászólás szövege:"
                        onChangeText={newText => setComment(newText)}
                        defaultValue={comment}
                        
                    />
                    
                   
                </View>


                <TouchableOpacity style={{ textAlign: 'center', backgroundColor: "#06c995", width: 175, height: 45, padding: 8, marginLeft: 93 }} onPress={ HozzaszolasComment}>
                    <Text style={{ color: "black", textAlign: "center", fontSize: 18 }} >Hozzászólás</Text>
                </TouchableOpacity>

            </View>
        </LinearGradient>


    );
};
const styles = StyleSheet.create({
    input1: {
        height: 40,
        width: 340,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    input2: {
        height: 40,
        width: 340,
        height: 240,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        textAlignVertical: 'top'
    },
});




export default Hozzaszolas;
*/

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ipcim from './Ipcim';

const Hozzaszolas = ({ navigation }) => {
    const [nev, setNev] = useState('');
    const [comment, setComment] = useState('');
    const [datum, setDatum] = useState('');



    useEffect(() => {

        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var datum = year + '-' + month + '-' + date;
        setDatum(datum);
    }, []);

    const Commenteles = async () => {

        if (nev != "" && comment != "") {
            if (!/\d/.test(nev)) {
                try {

                    var adatok = {
                        'nev': nev,
                        'comment': comment,
                        'datum': datum

                    }

                    const response = await fetch(`${Ipcim.Ipcim}CommentFeltoltes`, {
                        method: 'POST',
                        body: JSON.stringify(adatok),
                        headers: { "Content-type": "application/json; charset=UTF-8" }

                    });


                    if (response.ok) {
                        Alert.alert(
                            'Felvitel sikeres!',
                            ``,
                            [
                                {
                                    text: 'Ok',
                                    style: 'cancel',

                                },
                            ],
                        );
                        navigation.goBack()
                        setComment('')
                        setNev('')

                    }




                }
                catch (error) {
                    console.error('Hiba a vásárlás során:', error);
                    Alert.alert(
                        'Hiba történt!',
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
            else {
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
                'Kérem adja meg az adatokat!',
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
            <ScrollView style={{ flex: 1 }}>
                <View style={{ alignItems: 'center' }}>

                    <Text style={{ marginRight: 285, fontSize: 25 }}>Név:</Text>
                    <TextInput
                        style={{ height: 40, width: 340, margin: 12, borderWidth: 1, padding: 10, }}
                        placeholder="Pl: Fekete Ádám"
                        onChangeText={newText => setNev(newText)}
                        defaultValue={nev}
                    />


                    <Text style={{ marginTop: 10, fontSize: 25, marginRight: 190 }}>Hozzászólás:</Text>
                    <TextInput
                        style={{ height: 40, width: 340, height: 240, margin: 12, borderWidth: 1, padding: 10, textAlignVertical: 'top' }}
                        placeholder="Pl:Nekem a pókember film nem tetszett, a felétől unalmas és monoton volt az egész."
                        onChangeText={newText => setComment(newText)}
                        defaultValue={comment}
                        keyboardType="email-address"
                    />


                    <View>
                        <TouchableOpacity style={{ backgroundColor: "green", width: 185, height: 57, padding: 8, borderRadius: 25, marginTop: 15 }} onPress={Commenteles}>
                            <Text style={{ color: "black", textAlign: "center", fontSize: 26, marginTop: 1 }} >Hozzászólás</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: "#06c995", width: 125, height: 45, padding: 8, borderRadius: 25, marginLeft: 28, marginTop: 15 }} onPress={() => navigation.goBack()}>
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

export default Hozzaszolas;
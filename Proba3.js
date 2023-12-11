import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const proba3 = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getMovies = async () => {
        try {
            const response = await fetch('http://192.168.10.58:3000/eszkozok');
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
        <View style={{ flex: 1, padding: 24 }}>

            <Picker>


                {data.map((item) => {
                    return (
                        <Picker.item label={item.eszkozok_nev} value={item.eszkozok_id}/>
                    )
                }
                )}
            </Picker>
        </View>
    );
};

export default proba3;
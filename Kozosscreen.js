import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity } from 'react-native';
import Ipcim from './Ipcim';

const Kozosscreen = ({navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getMovies = async () => {
        try {
            const response = await fetch(Ipcim.Ipcim + 'eszkozok');
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
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={({ eszkozok_id }) => eszkozok_id}
                    renderItem={({ item }) => (
                        <View>
                            <Text>
                                {item.eszkozok_nev}
                            </Text>

                            <TouchableOpacity style={{ backgroundColor: "#06c995", width: 175, height: 45, padding: 8 }} onPress={() => navigation.navigate('Ujlap')}>
                                <Text style={{ color: "black", textAlign: "center", fontSize: 18 }} > ugras</Text>
                            </TouchableOpacity>

                        </View>
                    )}
                />
            )}
        </View>
    );
};

export default Kozosscreen;
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Ipcim from './Ipcim'

const App = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [text, setText] = useState('');

    const getMovies = async () => {
        try {
            const response = await fetch(`${Ipcim.Ipcim}osszesAlkatresz`);
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const keresfuggveny = async () => {
        alert(text)
        var adatok = {
            'bevitel1': text
        }

        try {
            const response = await fetch(`${Ipcim.Ipcim}keresszoveg`, {
                method: "POST",
                body: JSON.stringify(adatok),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            }

            );
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <View style={{ flex: 1, padding: 24 }}>
            <TextInput
                style={{ height: 40 }}
                placeholder="Add meg a keresndő szót!"
                onChangeText={newText => setText(newText)}
                defaultValue={text}
            />


            <TouchableOpacity style={{ backgroundColor: "#06c995", width: 175, height: 45, padding: 8, borderRadius: 5 }} onPress={() => keresfuggveny()}>
                <Text style={{ color: "black", textAlign: "center", fontSize: 18 }} >Kosárba tesz</Text>
            </TouchableOpacity>


            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={({ id }) => id}
                    renderItem={({ item }) => (
                        <Text>
                            {item.alkatresz_info}
                        </Text>
                    )}
                />

            )}


        </View>
    );
};

export default App;
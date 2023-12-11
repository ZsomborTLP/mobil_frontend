import React from 'react';
import { View, Text, StyleSheet, Button,FlatList } from 'react-native';

const Mogyoro = ({ navigation, route }) => {
    var tomb = [1, 2, 3, 4, 5]
    const [data, setData] = useState([]);
    const getMovies = async () => {
        try {
          const response = await fetch('http://192.168.10.58:3000/pcAlkatresz');
          const json = await response.json();
          setData(json);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
    

    return (
        <View style={styles.container}>
            <Text>Mogyoró képernyő</Text>
            <Button
                title="Részletek"
                onPress={() => navigation.navigate('Retek')}
            />

            {tomb.map((item) => {
                return (
                    <View>
                        <Text>{item}</Text>
                        <Button
                            title="Részletek"
                            onPress={() => navigation.navigate('Retek')}
                        />
                    </View>
                )
            }
            )}

<FlatList
            data={data}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
                <View>
                <Text>{item}</Text>
                <Button
                    title="Részletek"
                    onPress={() => navigation.navigate('Retek')}
                />
            </View>
            )}
          />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Mogyoro;
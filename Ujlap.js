import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Ujlap = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Szia</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});

export default Ujlap;
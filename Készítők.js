import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View,Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ipcim from './Ipcim';

const Készítők = () => {


    return (

        <LinearGradient
            colors={['#AAD8E6', '#90EE90']}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <View style={{ flex: 1, padding: 24 }}>
                <Text style={{fontSize:50,marginTop:45}}>Készítette:</Text>
                <Text style={{fontSize:30,textAlign:'center'}}>Hajdu Lajos</Text>
                <Text style={{textAlign:'center',fontSize:25}}>és</Text>
                <Text style={{fontSize:30,textAlign:'center'}}>Faur Zsombor</Text>
            </View>
            <Image source={{ uri: `${Ipcim.Ipcim}logo.jpg` }} style={{ width: 75, height: 75, borderRadius: 55, marginBottom: 25 }} />
        </LinearGradient>


    );
};

export default Készítők;
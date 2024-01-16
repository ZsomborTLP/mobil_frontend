import * as React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';

import Jatekok from './Jatekok';
import PC_Játékok from './PcJatekok';
import Nintendo_Játékok from './NintendoJatekok';
import Playstation_Játékok from './PlaystationJatekok';
import Xbox_Játékok from './XboxJatekok';

import PlaystationTartozék from './KiiratPlaystation';//KiiratPlaystation
import XboxTartozék from './KiiratXbox';//KiiratXbox
import Alkatrész from './Kiirat';//Kiirat
import NintendoTartozék from './KiiratNintendo';//KiiratNintendo
import HasználtTartozék from './KiiratHasznalt';//KiiratHasznalt

import Játék_PC from './KiiratPcJatekok';//KiiratPcJatekok
import Játék_Nintendo from './KiiratNintendoJatekok';//KiiratNintendoJatekok
import Játék_Playstation from './KiiratPlaystationJatekok';//KiiratPlaystationJatekok
import Játék_Xbox from './KiiratXboxJatekok';


import Alkatrészek from './Retek';//Retek
import NintendoTartozékok from './NintendoTart';//NintendoTart
import PlaystationTartozékok from './PlaystationTart';//PlaystationTart
import XboxTartozékok from './XboxTart';//XboxTart
import HasználtTartozékok from './Hasznalttart';//Hasznalttart

import Comment from './Comment';
import Hozzaszolas from './Hozzaszolas';
import Megerosit from './Megerosit'
import Felvitel from './felvitel';
import Kosárba from './Kosarba';
import Készítők from './Készítők';



function HomeScreen({ navigation }) {


  
  return (
    <LinearGradient
      colors={['#AAD8E6', '#90EE90']}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>



        <TouchableOpacity style={{ backgroundColor: "#06c995", width: 225, height: 65, padding: 18,borderTopRightRadius:20,borderTopLeftRadius:20,marginBottom:10  }} onPress={() => navigation.navigate('Alkatrészek')}>
          <Text style={{ color: "black", textAlign: "center", fontSize: 18 }} >Pc alkatrészek</Text>
        </TouchableOpacity>

       
        

        <TouchableOpacity style={{ backgroundColor: "#06c995",width: 225, height: 65, padding: 18, borderRadius: 5,marginBottom:10  }} onPress={() => navigation.navigate('NintendoTartozékok')}>
          <Text style={{ color: "black", textAlign: "center", fontSize: 18 }} >Nintendo tartozékok</Text>
        </TouchableOpacity>

        

        <TouchableOpacity style={{ textAlign:'center', backgroundColor: "#06c995", width: 225, height: 65, padding: 18,marginBottom:10,borderRadius: 5  }} onPress={() => navigation.navigate('PlaystationTartozékok')}>
          <Text style={{ color: "black", textAlign: "center", fontSize: 18 }} >Playstation tartozékok</Text>
        </TouchableOpacity>


        <TouchableOpacity style={{ backgroundColor: "#06c995", width: 225, height: 65 ,padding: 18, borderRadius: 5,marginBottom:10  }} onPress={() => navigation.navigate('XboxTartozékok')}>
          <Text style={{ color: "black", textAlign: "center", fontSize: 18}} >Xbox tartozékok</Text>
        </TouchableOpacity>


        <TouchableOpacity style={{ backgroundColor: "#06c995", width: 225, height: 65, padding: 18, borderRadius: 5,borderBottomRightRadius:20,borderBottomLeftRadius:20 }} onPress={() => navigation.navigate('HasználtTartozékok')}>
          <Text style={{ color: "black", textAlign: "center", fontSize: 18 }} >Használt termékek</Text>
        </TouchableOpacity>

      </View>
    </LinearGradient>
  );
}





function Root({ navigation, route }) {
  //{vanAdat?  : null}
  //const { vanAdat } = route.params ? route.params : { vanAdat: false };
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} ></Drawer.Screen>
      <Drawer.Screen name="Jatekok" component={Jatekok} ></Drawer.Screen>
      <Drawer.Screen name="Felvitel" component={Felvitel} ></Drawer.Screen>
      <Drawer.Screen name="Kosárba" component={Kosárba} ></Drawer.Screen>
      <Drawer.Screen name="Comment" component={Comment} ></Drawer.Screen>
      <Drawer.Screen name="Készítők" component={Készítők} ></Drawer.Screen>


    </Drawer.Navigator>
  );
}





const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    background: 'rgb(242, 242, 242)',
    primary: 'darkgreen',
    card: '#cacaca',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',

  },
};


export default function App() {
  return (

    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName="Root">
        <Stack.Screen name="Root" component={Root} options={{ headerShown: false }} />

        <Stack.Screen name="Alkatrész" component={Alkatrész} />
        <Stack.Screen name="NintendoTartozékok" component={NintendoTartozékok} />
        <Stack.Screen name="PlaystationTartozékok" component={PlaystationTartozékok} />
        <Stack.Screen name="XboxTartozékok" component={XboxTartozékok} />
        <Stack.Screen name="HasználtTartozékok" component={HasználtTartozékok} />


        <Stack.Screen name="Alkatrészek" component={Alkatrészek} />
        <Stack.Screen name="NintendoTartozék" component={NintendoTartozék} />
        <Stack.Screen name="PlaystationTartozék" component={PlaystationTartozék} />
        <Stack.Screen name="XboxTartozék" component={XboxTartozék} />
        <Stack.Screen name="HasználtTartozék" component={HasználtTartozék} />
        


        <Stack.Screen name="PC_Játékok" component={PC_Játékok} />
        <Stack.Screen name="Nintendo_Játékok" component={Nintendo_Játékok} />
        <Stack.Screen name="Playstation_Játékok" component={Playstation_Játékok} />
        <Stack.Screen name="Xbox_Játékok" component={Xbox_Játékok} />

        <Stack.Screen name="Játék_Xbox" component={Játék_Xbox} />
        <Stack.Screen name="Játék_PC" component={Játék_PC} />        
        <Stack.Screen name="Játék_Nintendo" component={Játék_Nintendo} />
        <Stack.Screen name="Játék_Playstation" component={Játék_Playstation} />
      

        <Stack.Screen name="Comment" component={Comment} />
        <Stack.Screen name="Hozzaszolas" component={Hozzaszolas} />
        <Stack.Screen name="Megerosit" component={Megerosit} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
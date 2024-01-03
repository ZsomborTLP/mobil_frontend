import * as React from 'react';
import { Button, View,TouchableOpacity,Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';


import KiiratPlaystation from './KiiratPlaystation';
import KiiratXbox from './KiiratXbox'
import Kiirat from './Kiirat';
import KiiratNintendo from './KiiratNintendo';


import Retek from './Retek';
import NintendoTart from './NintendoTart';
import PlaystationTart from './PlaystationTart';
import XboxTart from './XboxTart';


import Felvitel from './felvitel';
import Kosarba from './Kosarba';
import Készítők from './Készítők';



function HomeScreen({ navigation}) {
  
  return (
    <LinearGradient
      colors={['#AAD8E6', '#90EE90']}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
      <TouchableOpacity style={{ backgroundColor: "#06c995", width: 200, height: 45, padding: 8 }} onPress={() => navigation.navigate('Retek')}>
          <Text style={{ color: "black", textAlign: "center", fontSize: 18 }} >Pc alkatrészek</Text>
        </TouchableOpacity>
        <Text></Text>
        <TouchableOpacity style={{ backgroundColor: "#06c995", width: 200, height: 45, padding: 8 }} onPress={() => navigation.navigate('NintendoTart')}>
          <Text style={{ color: "black", textAlign: "center", fontSize: 18 }} >Nintendo tartozékok</Text>
        </TouchableOpacity>
        <Text></Text>
        <TouchableOpacity style={{ backgroundColor: "#06c995", width: 200, height: 45, padding: 8 }} onPress={() => navigation.navigate('PlaystationTart')}>
          <Text style={{ color: "black", textAlign: "center", fontSize: 18 }} >Playstation tartozékok</Text>
        </TouchableOpacity>
        <Text></Text>
        <TouchableOpacity style={{ backgroundColor: "#06c995", width: 200, height: 45, padding: 8 }} onPress={() => navigation.navigate('XboxTart')}>
          <Text style={{ color: "black", textAlign: "center", fontSize: 18 }} >Xbox tartozékok</Text>
        </TouchableOpacity>

      </View>
    </LinearGradient>
  );
}





function Root({ navigation ,route }) {
  //{vanAdat?  : null}
  //const { vanAdat } = route.params ? route.params : { vanAdat: false };
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} ></Drawer.Screen>
      <Drawer.Screen name="Felvitel" component={Felvitel} ></Drawer.Screen>
      <Drawer.Screen name="Kosarba" component={Kosarba} ></Drawer.Screen>
      

      <Drawer.Screen name="Készítők" component={Készítők} ></Drawer.Screen>

    </Drawer.Navigator>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
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
        
        <Stack.Screen name="Kiirat" component={Kiirat} />        
        <Stack.Screen name="NintendoTart" component={NintendoTart} />        
        <Stack.Screen name="PlaystationTart" component={PlaystationTart} />
        <Stack.Screen name="XboxTart" component={XboxTart} />

        <Stack.Screen name="Retek" component={Retek} />
        <Stack.Screen name="KiiratNintendo" component={KiiratNintendo} /> 
        <Stack.Screen name="KiiratPlaystation" component={KiiratPlaystation} />
        <Stack.Screen name="KiiratXbox" component={KiiratXbox} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
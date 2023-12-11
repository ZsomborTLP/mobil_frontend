import * as React from 'react';
import { Button, View,TouchableOpacity,Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';


import Proba from './Proba';
import Proba2 from './Proba2';
import Proba3 from './Proba3';
import Kiirat from './Kiirat';
import Retek from './Retek';
import Mogyoro from './Mogyoro';
import Felvitel from './felvitel';
import Lenyilo from './Lenyilo';

function HomeScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#AAD8E6', '#90EE90']}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          onPress={() => navigation.navigate('Notifications')}
          title="Go to notifications"
        />


        <TouchableOpacity style={{ backgroundColor: "#06c995", width: 175, height: 45, padding: 8 }} onPress={() => navigation.navigate('Retek')}>
          <Text style={{ color: "black", textAlign: "center", fontSize: 18 }} >Pc alkatrészek</Text>
        </TouchableOpacity>



      </View>
    </LinearGradient>
  );
}





function Root({ navigation }) {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} ></Drawer.Screen>
      <Drawer.Screen name="Felvitel" component={Felvitel} ></Drawer.Screen>
      <Drawer.Screen name="Lenyilo" component={Lenyilo} ></Drawer.Screen>


    </Drawer.Navigator>
  );
}
//<Drawer.Screen name="Notifications" component={NotificationsScreen} />
//<Drawer.Screen name="Próba" component={Proba_megjelenites} />
//<Drawer.Screen name="Próba3" component={Proba3_megjelenites} />
//<Drawer.Screen name="Pc alkatrészek" component={Proba2_megjelenites} ></Drawer.Screen>
//<Drawer.Screen name="Pc alkatrészek2" component={Retek_megjelenites} ></Drawer.Screen>
//<Drawer.Screen name="Mogyoró" component={Mogyoro} ></Drawer.Screen>

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

function Proba_megjelenites({ navigation }) {
  return (
    <Proba />
  );
}

function Retek_megjelenites({ navigation }) {
  return (
    <Retek />
  );
}


function Proba2_megjelenites({ navigation }) {
  return (
    <Proba2 />
  );
}

function Proba3_megjelenites({ navigation }) {
  return (
    <Proba />
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
        <Stack.Screen name="Retek" component={Retek} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
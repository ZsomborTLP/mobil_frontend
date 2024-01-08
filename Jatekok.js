import { Text, View,TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';



const Jatekok = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#AAD8E6', '#90EE90']}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
    <View style={{flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center' }}>
     
    <TouchableOpacity style={{ textAlign:'center', backgroundColor: "#06c995", width: 175, height: 45, padding: 8,  }} onPress={() => navigation.navigate('PcJatekok')}>
        <Text style={{ color: "black", textAlign: "center", fontSize: 18 }} >Pc játékok</Text>
    </TouchableOpacity>
    <Text></Text>
    <TouchableOpacity style={{ textAlign:'center', backgroundColor: "#06c995", width: 175, height: 45, padding: 8,  }} onPress={() => navigation.navigate('NintendoJatekok')}>
        <Text style={{ color: "black", textAlign: "center", fontSize: 18 }} >Nintendo játékok</Text>
    </TouchableOpacity>
    <Text></Text>
    <TouchableOpacity style={{ textAlign:'center', backgroundColor: "#06c995", width: 175, height: 45, padding: 8,  }} onPress={() => navigation.navigate('PlaystationJatekok')}>
        <Text style={{ color: "black", textAlign: "center", fontSize: 18 }} >Playstation játékok</Text>
    </TouchableOpacity>
    <Text></Text>
    <TouchableOpacity style={{ textAlign:'center', backgroundColor: "#06c995", width: 175, height: 45, padding: 8,  }} onPress={() => navigation.navigate('XboxJatekok')}>
        <Text style={{ color: "black", textAlign: "center", fontSize: 18 }} >Xbox játékok</Text>
    </TouchableOpacity>
    </View>
    </LinearGradient>
  );
};





export default Jatekok;
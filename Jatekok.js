import { Text, View,TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';



const Jatekok = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#AAD8E6', '#90EE90']}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
    <View style={{flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center' }}>
     
    <TouchableOpacity style={{ textAlign:'center', backgroundColor: "#06c995", width: 225, height: 65, padding: 17,borderTopRightRadius:20,borderTopLeftRadius:20,marginBottom:10  }} onPress={() => navigation.navigate('PC_Játékok')}>
        <Text style={{ color: "black", textAlign: "center", fontSize: 21 }} >Pc játékok</Text>
    </TouchableOpacity>
    
    <TouchableOpacity style={{ textAlign:'center', backgroundColor: "#06c995", width: 225, height: 65, padding: 17,marginBottom:10,borderRadius: 5  }} onPress={() => navigation.navigate('Nintendo_Játékok')}>
        <Text style={{ color: "black", textAlign: "center", fontSize: 21 }} >Nintendo játékok</Text>
    </TouchableOpacity>
    
    <TouchableOpacity style={{ textAlign:'center', backgroundColor: "#06c995", width: 225, height: 65, padding: 17,marginBottom:10,borderRadius: 5  }} onPress={() => navigation.navigate('Playstation_Játékok')}>
        <Text style={{ color: "black", textAlign: "center", fontSize: 21 }} >Playstation játékok</Text>
    </TouchableOpacity>
    
    <TouchableOpacity style={{ textAlign:'center', backgroundColor: "#06c995", width: 225, height: 65, padding: 17,borderBottomLeftRadius:20,borderBottomRightRadius:20  }} onPress={() => navigation.navigate('Xbox_Játékok')}>
        <Text style={{ color: "black", textAlign: "center", fontSize: 21 }} >Xbox játékok</Text>
    </TouchableOpacity>
    </View>
    </LinearGradient>
  );
};





export default Jatekok;
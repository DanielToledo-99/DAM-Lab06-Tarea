
import * as React from 'react';
import { View, Text, ScrollView, TextInput,TouchableOpacity, Button , SafeAreaView, FlatList,StyleSheet,Image} from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListItem from "./components/ListItem.js";
import { BlurView } from 'expo-blur';
import {getAuth , signInWithEmailAndPassword} from 'firebase/auth';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from './firebase-config';


const Drawer = createDrawerNavigator();
const productos = [
    {
      nombre: 'Iphone 12',
      descripcion: 'Un chip prodigioso. Tecnología 5G. Sistema avanzado de cámara dual. ',
      descripcion2: 'Un chip prodigioso. Tecnología 5G. Sistema avanzado de cámara dual. Esta descripcion es más larga de la que aparece en la pagina prinficla',
      id: '001',
      
    },
        {
      nombre: 'Iphone 11',
      descripcion: 'Y no iba a ser menos el iPhone 13 ',
      descripcion2:'Y no iba a ser menos el iPhone 13 Esta descripcion es más larga de la que aparece en la pagina prinficla',
      id: '002',
    },
        {
      nombre: 'Iphone 13',
      descripcion: 'Ceramic Shield, más duro que cualquier vidrio de smartphonel',
      descripcion2:'Ceramic Shield, más duro que cualquier vidrio de smartphonel Esta descripcion es más larga de la que aparece en la pagina prinficla',
      id: '003',
    },
        {
      nombre: 'Iphone X',
      descripcion: 'El nuevo gran angular captura un 47 % más de luz para lograr mejores instantáneas',
      descripcion2: 'El nuevo gran angular captura un 47 % más de luz para lograr mejores instantáneas Esta descripcion es más larga de la que aparece en la pagina prinficla',
      id: '004',
    },
        {
      nombre: 'Iphone 8 Plus',
      descripcion: 'El nuevo ultra gran angular muestra más detalle en las zonas oscuras de tus fotos',
      descripcion2: 'El nuevo ultra gran angular muestra más detalle en las zonas oscuras de tus fotos Esta descripcion es más larga de la que aparece en la pagina prinficla',
      id: '005',
    },
  ]
  const uri = "https://ak.picdn.net/shutterstock/videos/1060308725/thumb/1.jpg"
  const perfil = "https://randomuser.me/api/portraits/men/1.jpg"


function Videos({navigation}) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
  <View style={styles.container3}>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
        <View style={styles.buttons}>
          <Button
            title={status.isPlaying ? 'Pause' : 'Play'}
            onPress={() =>
              status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
            }
          />
        </View>
      </View>
  );
}

function HomeScreen({navigation}) {

  const {email, setEmail } = React.useState('')
  const {pass, setPassword} = React.useState('')
  const app = initializeApp (firebaseConfig);
  const auth = getAuth(app);

  const handleSingin = () =>{
      signInWithEmailAndPassword(auth,email,pass)
      .then((userCredential)=>{
        const user = userCredential;
        navigation.navigate('Vista')
      })
      .catch(error=>{
        console.log(error)
      })

  }

  return (

    <View style={styles.container}>
      <Image  source={uri} style={styles.image, StyleSheet.absoluteFill} />
      <View style={{width:100, height:100, backgroundColor:'purple', position:'absolute' }}>
      </View>
      <ScrollView contentContainerStyle={{
        flex:1,
        width:'100%',
        height:'100%',
        alignContent:'center',
        justifyContent:'center',
      }}>
      <BlurView intensity={100}>
      <View style={styles.login}>
      <Image source={ {uri:perfil}} style={styles.perfil} />
      <View>
      <Text style={{fontSize:18, fontWeight:'400', color:'white'}}>E-mail</Text>
      <TextInput onChangeText={(text)=> setEmail(text)} style={styles.input} placeholder= "ejemplo@ejemplo.com"/>
      </View>
      <View>
      <Text style={{fontSize:18, fontWeight:'400', color:'white'}}>Contraseña</Text>
      <TextInput  onChangeText={(text)=> setPassword(text)} style={styles.input} placeholder= "**********" secureTextEntry={true}/>
      </View>
      <TouchableOpacity  style={styles.button} onPress={ handleSingin}>
        <Text style={{fontSize:15,color:'white'}}>Login</Text>
      </TouchableOpacity>
      </View>

      </BlurView>

      </ScrollView>

    </View>
  );
}








function Detalle({navigation,route}){

  const { itemDes,itemnombre} = route.params;
  return(
    <View>
    <View>
    <View style = {styles.container2}>
      <Text style={{fontWeight:'bold',fontSize:23,marginVertical:3,color:'white'}}>{itemnombre}</Text>
  <Text style={{fontSize:11,color:'white'}}>{itemDes}</Text>
  <Text>
    
    </Text>
  <Image
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }} style={{  alignSelf:'center',  width: 182,
    height: 180,
    marginVertical:20}}
  />
    </View>
    
  </View>
  <NavigationContainer independent={true}>
      <MyTabs />
    </NavigationContainer>
  </View>
  )
}


const Tab = createBottomTabNavigator();






function Vista({navigation}){
  return(
    
    <SafeAreaView   style={{paddingHorizontal:10}} >

      <FlatList 
        ListHeaderComponent ={()=><Text style={{fontWeight:'bold',fontSize:21,marginVertical:10}}> MIS PRODUCTOS </Text>}
        ItemSeparatorComponent = {() => <View style={{marginBottom:10, }}/>}
        data = {productos}
        keyExtractor = {(item) => item.id}
        renderItem = {({item,index})=> {
        return(
          <TouchableOpacity 
            onPress={()=> navigation.navigate('Detalle',{
              itemDes:item.descripcion2,
              itemnombre:item.nombre,
              
              })
            }>
          <ListItem item = {item} />
          
        </TouchableOpacity>
        )
        }}
        />
             <View>
    <NavigationContainer independent={true}>
      <MyTabs />

    </NavigationContainer>
    </View>

    </SafeAreaView>

    
  );
}
function Settings(){
    return (
    <NavigationContainer>
      <Drawer.Navigator useLegacyImplementation initialRouteName="Home">
        <Drawer.Screen name="Home" />
        <Drawer.Screen name="Notifications"  />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Vista} />
      <Tab.Screen name="Settings" component={Settings} />
       <Tab.Screen name="Video" component={Videos} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Pagina de Inicio" component={HomeScreen} />
        <Stack.Screen name="Vista" component={Vista} />
        <Stack.Screen name="Detalle" component={Detalle} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



const styles =StyleSheet.create({
  container2:{
    backgroundColor: '#042940',
    padding:10,
    borderRadius:10,
  },

  container:{
    backgroundColor: '#fff',
    flex:1,
    alignItems:"center",
    justifyContent:"center",
  },
  image:{
    width:"100%",
    height:"100%",
    resizeMode:'cover',

  },
  login:{
    width: 288,
    height: 490,
    borderColor:'white',
    borderWidth:2,
    borderRadius:10,
    alignItems:"center",


  },
  perfil:{
    width:'26%',
    height:'15%',
    borderRadius:50,
    borderColor:'#fff',
    borderWidth:1,
    marginVertical:30,


  },
  input:{
    width:'250',
    height:'40',
    borderColor:'#fff',
    borderWidth:2,
    borderRadius:10,
    marginVertical:10,
    padding:10,
    backgroundColor:'#ffffff90',
    marginBottom:20,
  },
  button:{
    width:200,
    height:40,
    borderRadius:10,
    backgroundColor: '#00CFEB90',
    alignItems:'center',
    justifyContent:'center',
    marginVertical:10,
    borderColor:'#fff',
    borderWidth:1


  },
      container3: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },


})


export default App;
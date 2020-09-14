import React,{Component}from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    FlatList,
    ScrollView} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import { ListItem } from 'react-native-elements'

export default class PasswordScreen extends Component{
    constructor(){
      super();
      this.state={
        allPasswords : [],
        password:'',
        confirmPassword:'',
        website:'',
        username:'',
        isModalVisible:'false',
        userId:"Parth"
      }
      this.passwordsRef= null
    }

    static navigationOptions = { header: null };

    getAllPasswords =()=>{
      this.passwordsRef = db.collection("Passwords")
      .onSnapshot((snapshot)=>{
        var allPasswords = snapshot.docs.map((doc) => doc.data())
        console.log(allPasswords)
        this.setState({
          allPasswords : allPasswords
        });
      })
    }

  /*  renderItem = ( {item, i} ) =>{
      return (
        <ListItem
        key={i}
        title={item.title}
        subtitle={item.list}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        bottomDivider
      />
      )
    }

    keyExtractor = (item, index) => index.toString()*/

      componentDidMount(){
     this.getAllPasswords()
   }

   componentWillUnmount(){
     this.passwordsRef();
   }

    createPasswordsCollection=()=>{
      db.collection('Passwords').add({
        password:this.state.password,
        website:this.state.website,
        username:this.state.username
      })
    }

    
showModal = ()=>{
    return(
    <Modal
      animationType="fade"
      transparent={false}
      visible={this.state.isModalVisible}
      >
      <View style={styles.modalContainer}>
        <ScrollView style={{width:'100%'}}>
          <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
          <Text
            style={styles.modalTitle}
            >Passwords</Text>
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Password"}
            secureTextEntry = {false}
            onChangeText={(text)=>{
              this.setState({
                password: text
              })
            }}
          /><TextInput
            style={styles.formTextInput}
            placeholder ={"Website"}
            secureTextEntry = {false}
            onChangeText={(text)=>{
              this.setState({
                website: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Username"}
            secureTextEntry = {false}
            onChangeText={(text)=>{
              this.setState({
                username: text
              })
            }}
          />
          <View style={styles.modalBackButton}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress = {()=>{
                this.createPasswordsCollection()
              }}
            >
            <Text style={styles.registerButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalBackButton}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={()=>this.setState({"isModalVisible":false})}
            >
            <Text style={{color:'#ff5722'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </Modal>
  )
  }

    render(){
        return(
            <View style={styles.container}>
              {
            this.showModal()
              }
              <View style={{flex:1}}>
           {
             this.state.allPasswords.length === 0
             ?(
               <View style={styles.subtitle}>
                 <Text style={{ fontSize: 20}}>List of all Passwords</Text>
               </View>
             )
             :(
              <FlatList
              data={this.state.allPasswords}
              renderItem={({item})=>(
                <View style={{borderBottomWidth: 2}}>
                  <Text>{"Password: " + item.password}</Text>
                  <Text>{"Website: " + item.website}</Text>
                  <Text>{"Username: " + item.username}</Text>
                </View>
              )}
              keyExtractor= {(item, index)=> index.toString()}
            /> 
             )
           }
         </View>
              <MyHeader title="Passwords Screen" navigation ={this.props.navigation}/>
                <TouchableOpacity style={styles.button}
                  onPress={()=>this.setState({"isModalVisible":true})}>
                    <Text>
                        Add Passwords
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container:{
     flex:1,
     backgroundColor:'#F8BE85',
     alignItems: 'center',
     justifyContent: 'center'
   },
   profileContainer:{
     flex:1,
     justifyContent:'center',
     alignItems:'center',
   },
   title :{
     fontSize:65,
     fontWeight:'300',
     paddingBottom:30,
     color : '#ff3d00'
   },
   loginBox:{
     width: 300,
     height: 40,
     borderBottomWidth: 1.5,
     borderColor : '#ff8a65',
     fontSize: 20,
     margin:10,
     paddingLeft:10
   },
   KeyboardAvoidingView:{
     flex:1,
     justifyContent:'center',
     alignItems:'center'
   },
   modalTitle :{
     justifyContent:'center',
     alignSelf:'center',
     fontSize:30,
     color:'#ff5722',
     margin:50
   },
   modalContainer:{
     flex:1,
     borderRadius:20,
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:"#ffff",
     marginRight:30,
     marginLeft : 30,
     marginTop:80,
     marginBottom:80,
   },
   formTextInput:{
     width:"75%",
     height:35,
     alignSelf:'center',
     borderColor:'#ffab91',
     borderRadius:10,
     borderWidth:1,
     marginTop:20,
     padding:10
   },
   registerButton:{
     width:200,
     height:40,
     alignItems:'center',
     justifyContent:'center',
     borderWidth:1,
     borderRadius:10,
     marginTop:30
   },
   registerButtonText:{
     color:'#ff5722',
     fontSize:15,
     fontWeight:'bold'
   },
   cancelButton:{
     width:200,
     height:30,
     justifyContent:'center',
     alignItems:'center',
     marginTop:5,
   },
  
   button:{
     width:300,
     height:50,
     justifyContent:'center',
     alignItems:'center',
     borderRadius:25,
     backgroundColor:"#ff9800",
     shadowColor: "#000",
     shadowOffset: {
        width: 0,
        height: 8,
     },
     shadowOpacity: 0.30,
     shadowRadius: 10.32,
     elevation: 16,
     padding: 10
   },
   buttonText:{
     color:'#ffff',
     fontWeight:'200',
     fontSize:20
   }
  })
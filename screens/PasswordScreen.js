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
import styles from '../components/CommonStylesheet'
import EdiText from 'react-editext'
import firebaseService from "../components/FirebaseService";

export default class PasswordScreen extends Component{
    constructor(){
      super();
      this.state={
       // userId : firebase.auth().currentUser.email,
        allPasswords : [],
        emailId:'',
        password:'',
        website:'',
        username:'',
        confirmPassword:'',
        isModalVisible:'false',
        isDeletePressed:'false',
        id:''
      }
      this.passwordsRef= null
    }

    createUniqueId(){
      return Math.random().toString(36).substring(7);
    }

    goToEditForPasswords = (item) => () => this.props.navigation.navigate('EditForPasswords', item)

    createPasswordsCollection=()=>{
      var randomId = this.createUniqueId()
      db.collection('Passwords').add({
        website:this.state.website,
        username:this.state.username,
        password:this.state.password,
        userId:"Parth",
        id:randomId
      })
      this.setState({
        id: randomId
    });
    console.log(this.state.id)
    }

    static navigationOptions = {
      title: "PasswordsScreen",
    };

    getAllPasswords = () => {
        firebaseService.getAllPasswordsWithId((allPasswords) => {
            this.setState({
                allPasswords: allPasswords
            });
        })
    }
 
       componentDidMount(){
      this.getAllPasswords()
    }
 
    componentWillUnmount(){
      
    }

    onSave = val => {
      console.log('Edited Value -> ', val)
    }

    saveWithId = (id, list) => {
        return (title) => {
            console.log('Edited Value -> ' + title + ', id -> ' + id + ', list -> ' + list)
            console.log('Type of -> '+ typeof id )
            firebaseService.updatePasswords(id, {
                website: website,
                password: password,
                username:username,
                id:this.state.id,
                userId:"Parth"
            });
        }
    }

    deleteWithId = (id) => {
        return () => {
            firebaseService.deletePassword(id);
        }
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
            placeholder ={"Website"}
            secureTextEntry = {false}
            onChangeText={(text)=>{
              this.setState({
                website: text
              })
            }}
          /><TextInput
          style={styles.formTextInput}
          placeholder="Username"
          onChangeText={(text) => {
              this.setState({
                  username: text
              })
          }}
          />
          <TextInput
          style={styles.formTextInput}
          placeholder="Password"
          onChangeText={(text) => {
              this.setState({
                  password: text
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
              <MyHeader title="Passwords Screen" navigation ={this.props.navigation}/>
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
                  <TouchableOpacity style={styles.button}
                                      onPress={this.goToEditForPasswords(item)}>
                        <Text>
                        {item.website}
                        </Text>
                    </TouchableOpacity>
                    
                </View>
              )}
              keyExtractor= {(item, index)=> index.toString()}
            /> 
             )
           }
         </View>
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




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

export default class NotesScreen extends Component{
    constructor(){
      super();
      this.state={
       // userId : firebase.auth().currentUser.email,
        allNotes : [],
        emailId:'',
        password:'',
        list:'',
        title:'',
        confirmPassword:'',
        isModalVisible:'false',
        isDeletePressed:'false',
        id:''
      }
      this.notesRef= null
    }

    createUniqueId(){
      return Math.random().toString(36).substring(7);
    }

    goToTestNotesScreen = (item) => () => this.props.navigation.navigate('TestNotesScreen', item)

    createNotesCollection=()=>{
      var randomId = this.createUniqueId()
      db.collection('Notes').add({
        list:this.state.list,
        title:this.state.title,
        userId:"Parth",
        id:randomId
      })
      this.setState({
        id: randomId
    });
    console.log(this.state.id)
    }

    static navigationOptions = { header: null };

    getAllNotes = () => {
        firebaseService.getAllNotesWithId((allNotes) => {
            this.setState({
                allNotes: allNotes
            });
        })
    }

    setDataToAsyncStore = async () => {
      try {
          var title = this.state.title;
          await AsyncStorage.setItem('title', JSON.stringify(title));        
      } catch (error) {
          console.log('AsyncStorage set data error in List component', error.message)
      }
  } 
  
   /* getAllNotes =()=>{
      this.passwordsRef = db.collection("Notes").where("userId" ,'==', 'Parth')
      .onSnapshot((snapshot)=>{
        var allNotes = []
        snapshot.docs.map((doc) =>{
          var note = doc.data()
          note["doc_id"] = doc.id
          allNotes.push(note)
          console.log(allNotes)
        });
        this.setState({
          allNotes : allNotes
        });
      })
    }*/


 
       componentDidMount(){
      this.getAllNotes()
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
            firebaseService.updateNote(id, {
                list: list,
                title: title,
                id:this.state.id,
                userId:"Parth"
            });
        }
    }

    deleteWithId = (id) => {
        return () => {
            firebaseService.deleteNote(id);
        }
    }



    /*keyExtractor = (item, index) => index.toString()

    renderItem = ( {item, i} ) =>{
      console.log(item)
      return (
        <ListItem
          key={i}
          title={item.title}
          subtitle={item.list}
        />
      )
    }*/

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
            >Notes</Text>
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Title"}
            secureTextEntry = {false}
            onChangeText={(text)=>{
              this.setState({
                title: text
              })
            }}
          /><TextInput
          style={styles.formTextInput}
          placeholder="List"
          onChangeText={(text) => {
              this.setState({
                  list: text
              })
          }}
          multiline={true}
                      multiline
  numberOfLines={30}
          />
          <View style={styles.modalBackButton}>
            <TouchableOpacity
              style={styles.registerButton}
                onPress = {()=>{
                this.createNotesCollection()
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
              <MyHeader title="Notes Screen" navigation ={this.props.navigation}/>
              {
            this.showModal()
              }
              <View style={{flex:1}}>
           {
             
             this.state.allNotes.length === 0
             ?(
               
               <View style={styles.subtitle}>
                 <Text style={{ fontSize: 20}}>List of all Notes</Text>
               </View>
             )
             :(
              <FlatList
              data={this.state.allNotes}
              renderItem={({item})=>(
                <View style={{borderBottomWidth: 2}}>
                  <EdiText
                  onSave={this.saveWithId(item._id, item.list)}
                    type="text"
                    value={ item.title}>
                    </EdiText>
                  <Text style={{fontSize:27}}>{"List: " + item.list}</Text>
                  <TouchableOpacity style={styles.button}
                                      onPress={this.goToTestNotesScreen(item)}>
                        <Text>
                            View List
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                                      onPress={this.deleteWithId(item._id)}>
                        <Text>
                            Delete
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
                        Add Notes
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

}




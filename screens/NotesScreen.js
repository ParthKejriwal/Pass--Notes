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
        isDeletePressed:'false'
      }
      this.notesRef= null
    }

    createNotesCollection=()=>{
      db.collection('Notes').add({
        list:this.state.list,
        title:this.state.title,
        userId:"Parth"
      })
    }

    static navigationOptions = { header: null };


    getAllNotes =()=>{
      this.notesRef = db.collection("Notes")
      .onSnapshot((snapshot)=>{
        var allNotes = snapshot.docs.map((doc) => doc.data())
        this.setState({
          allNotes : allNotes
        });
      })
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
      this.notesRef();
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
          editible
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
                  <TouchableOpacity style={styles.button}
                    onPress={()=>this.setState({"isModalVisible":true})}><Text style={{fontSize:37}}>{"Title: " + item.title}</Text></TouchableOpacity>
                  <Text style={{fontSize:27}}>{"List: " + item.list}</Text>
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




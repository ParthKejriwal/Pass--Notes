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
        isModalVisible:'false'
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
            placeholder ={"List"}
            secureTextEntry = {false}
            onChangeText={(text)=>{
              this.setState({
                list: text
              })
            }}
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
                  <Text>{"Ttle: " + item.title}</Text>
                  <Text>{"List: " + item.list}</Text>
                </View>
              )}
              keyExtractor= {(item, index)=> index.toString()}
            /> 
             )
           }
         </View>
              <MyHeader title="Notes Screen" navigation ={this.props.navigation}/>
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

   subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
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
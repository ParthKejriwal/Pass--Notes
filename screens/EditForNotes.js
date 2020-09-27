import React,{Component}from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    ScrollView,
    KeyboardAvoidingView,
    TextInput,
    BackHandler 
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import styles from '../components/CommonStylesheet'
import EdiText from 'react-editext'
import firebaseService from "../components/FirebaseService";

export default class EditForNotes extends Component {

    constructor(){
        super()
        this.state={
            isButtonPressed:'false',
            isModalVisible:'false',
        }
    }

    goToNotesScreen=()=>{
        this.props.navigation.navigate('NotesScreen')
    }
  

    saveWithId = (id, list) => {
        return (title) => {
            console.log('Edited Value -> ' + title + ', id -> ' + id + ', list -> ' + list)
            console.log('Type of -> '+ typeof id )
            firebaseService.updateNote(id, {
                list: list,
                title: title,
                id:this.props.navigation.state.params._id,
                userId:"Parth"
            });
            this.setState({
                isButtonPressed: false
            });
        }
    }

    deleteWithId = (id) => {
        return () => {
            firebaseService.deleteNote(id);
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
                >Notes</Text>
              <TextInput
              style={styles.formTextInput}
              placeholder="List"
              onChangeText={(text) => {
                this.saveWithId(this.props.navigation.state.params._id,
                    this.props.navigation.state.params.list)
              }}
              />
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.registerButton}
                    onPress = {()=>{
                        this.saveWithId(this.props.navigation.state.params._id,
                        this.props.navigation.state.params.list)
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

    render() {
        if (this.state.isButtonPressed == true) {
            return (
                <View>
                    {
            this.showModal()
              }
              <TouchableOpacity style={styles.button}
                           onPress={()=>this.goToNotesScreen}>
                           <Text>
                               Back
                           </Text>
                       </TouchableOpacity>
                       <EdiText
                        onSave={this.saveWithId(this.props.navigation.state.params._id,
                            this.props.navigation.state.params.title)}
                        type="text"
                        value={this.props.navigation.state.params.title}>
                        </EdiText>
                        <EdiText
                        onSave={this.saveWithId(this.props.navigation.state.params._id,
                            this.props.navigation.state.params.list)}
                        type="text"
                        value={this.props.navigation.state.params.list}>
                        </EdiText>
                        <TouchableOpacity style={styles.button}
                           onPress={()=>this.setState({"isButtonPressed":true})}>
                           <Text>
                               Edit
                           </Text>
                       </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View>
                    {
            this.showModal()
              } 
                       <Text>
                           {this.props.navigation.state.params.title}
                        </Text>
                        <Text>
                           {this.props.navigation.state.params.list}
                        </Text>
                        <TouchableOpacity style={styles.button}
                           onPress={()=>this.setState({"isModalVisible":true})}>
                           <Text>
                             Add To The List
                           </Text>
                       </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                           onPress={()=>this.setState({"isButtonPressed":true})}>
                           <Text>
                               Edit
                           </Text>
                       </TouchableOpacity>
                </View>
            )
        }
        
    }
}
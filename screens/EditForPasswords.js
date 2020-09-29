import React,{Component}from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    ScrollView,
    KeyboardAvoidingView,
    TextInput,
    Button,
    SwipeableFlatlist
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import styles from '../components/CommonStylesheet'
import EdiText from 'react-editext'
import firebaseService from "../components/FirebaseService";
import Swipeable from 'react-native-swipeable-row';


export default class EditForNotes extends Component {

    constructor(){
        super()
        this.state={
            isButtonPressed:'false',
            isModalVisible:'false',
            isDeletePressed:'false'
        }
    }

    goToNotesScreen=()=>{
        this.props.navigation.navigate('NotesScreen')
    }
  

    saveWithId = (id, password) => {
        return (website) => {
            console.log('Edited Value -> ' + website + ', id -> ' + id + ', password -> ' + password)
            console.log('Type of -> '+ typeof id )
            firebaseService.updateNote(id, {
                password: password,
                website: website,
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
            firebaseService.deletePassword(id);
        }
    }

    render() {
        if (this.state.isButtonPressed == true) {
            return (
                <View>
             <Button title="Go back" onPress={() => this.props.navigation.goBack(null)} />
                       <EdiText
                        onSave={this.saveWithId(this.props.navigation.state.params._id,
                            this.props.navigation.state.params.password)}
                        type="text"
                        value={this.props.navigation.state.params.website}>
                        </EdiText>
                        <EdiText
                        onSave={this.saveWithId(this.props.navigation.state.params._id,
                            this.props.navigation.state.params.password)}
                        type="text"
                        value={this.props.navigation.state.params.password}>
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
              <Button title="Go back" onPress={() => this.props.navigation.goBack(null)} />
                        <Text>
                           {this.props.navigation.state.params.website}
                        </Text>
                        <Text>
                           {this.props.navigation.state.params.password}
                        </Text>
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
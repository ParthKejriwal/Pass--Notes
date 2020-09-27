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

export default class EditForPasswords extends Component {

    constructor(){
        super()
        this.state={
            isButtonPressed:'false',
            isModalVisible:'false',
        }
    }

    saveWithId = (id, password,username) => {
        return (website) => {
            console.log('Edited Value -> ' + website + ', id -> ' + id + ', password -> ' + password + ', username ->' + username)
            console.log('Type of -> '+ typeof id )
            firebaseService.updatePasswords(id, {
                website: website,
                password: password,
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
                       <EdiText
                        onSave={this.saveWithId(this.props.navigation.state.params._id,
                            this.props.navigation.state.params.website)}
                        type="text"
                        value={this.props.navigation.state.params.website}>
                        </EdiText>
                        <EdiText
                        onSave={this.saveWithId(this.props.navigation.state.params._id,
                            this.props.navigation.state.params.password)}
                        type="text"
                        value={this.props.navigation.state.params.password}>
                        </EdiText>
                        <EdiText
                        onSave={this.saveWithId(this.props.navigation.state.params._id,
                            this.props.navigation.state.params.username)}
                        type="text"
                        value={this.props.navigation.state.params.username}>
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
                       <Text>
                           {this.props.navigation.state.params.website}
                        </Text>
                        <Text>
                           {this.props.navigation.state.params.password}
                        </Text>
                        <Text>
                           {this.props.navigation.state.params.username}
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
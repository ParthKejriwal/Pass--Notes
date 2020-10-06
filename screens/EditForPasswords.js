import React, {Component} from 'react';
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


export default class EditForPasswords extends Component {

    constructor() {
        super()
        this.state = {
            isButtonPressed: 'false',
            isModalVisible: 'false',
            isDeletePressed: 'false'
        }
    }

    goToPasswordScreen = () => {
        this.props.navigation.navigate('PasswordScreen')
    }


    updateWebsite = (website) => {
        this.props.navigation.state.params.website = website;
        this.update(website, this.props.navigation.state.params.password,username);
    }

    updatePassword = (password) => {
        this.props.navigation.state.params.password = password;
        this.update(this.props.navigation.state.params.website, password,username)
    }

    updateUsername = (username) => {
        this.props.navigation.state.params.username = username;
        this.update(this.props.navigation.state.params.website, password,username)
    }

    update = (website, password,username) => {
        console.log('New website -> ' + website);
        console.log('New password -> ' + password);
        console.log('New username -> ' + username);
        firebaseService.updatePasswords(this.props.navigation.state.params._id, {
            password: password,
            website: website,
            username:username,
            id: this.props.navigation.state.params._id,
            userId: "Parth"
        });
        this.setState({
            isButtonPressed: false
        });
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
                    <Button title="Go back" onPress={this.goToPasswordScreen}/>
                    <EdiText
                        onSave={this.updateWebsite}
                        type="text"
                        value={this.props.navigation.state.params.website}>
                    </EdiText>
                    <EdiText
                        onSave={this.updateUsername}
                        type="text"
                        value={this.props.navigation.state.params.username}>
                    </EdiText>
                    <EdiText
                        onSave={this.updatePassword}
                        type="text"
                        value={this.props.navigation.state.params.password}>
                    </EdiText>
                    <TouchableOpacity style={styles.button}
                                      onPress={() => this.setState({"isButtonPressed": true})}>
                        <Text>
                            Edit
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View>
                    <Button title="Go back" onPress={this.goToPasswordScreen}/>
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
                                      onPress={() => this.setState({"isButtonPressed": true})}>
                        <Text>
                            Edit
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }

    }
}
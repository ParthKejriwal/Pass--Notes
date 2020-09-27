import React, {Component} from 'react';
import {Alert, KeyboardAvoidingView, Modal, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import styles from '../components/CommonStylesheet'

export default class SelectOrSignUpScreen extends Component {

    constructor() {
        super();
        this.state = {
            emailId: '',
            password: '',
            firstName: '',
            lastName: '',
            confirmPassword: '',
            isModalVisible: 'false'
        }
    }

    goToNotesScreen = () => {
        this.props.navigation.navigate('NotesScreen')
    }

    goToLoginForPasswordsScreen = () => {
        this.props.navigation.navigate('LoginForPasswordsScreen')
    }

    userSignUp = (emailId, password, confirmPassword) => {
        if (password !== confirmPassword) {
            return Alert.alert("password doesn't match\nCheck your password.")
        } else {
            firebase.auth().createUserWithEmailAndPassword(emailId, password)
                .then(() => {
                    db.collection('Users').add({
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        username: this.state.username,
                        emailId: this.state.emailId
                    })
                    return Alert.alert(
                        'User Added Successfully',
                        '',
                        [
                            {text: 'OK', onPress: () => this.setState({"isModalVisible": false})},
                        ]
                    );
                })
                .catch((error) => {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    return Alert.alert(errorMessage)
                });
        }
    }

    showModal = () => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.isModalVisible}
            >
                <View style={styles.modalContainer}>
                    <ScrollView style={{width: '100%'}}>
                        <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
                            <Text
                                style={styles.modalTitle}
                            >Registration</Text>
                            <TextInput
                                style={styles.formTextInput}
                                placeholder={"First Name"}
                                label={"First Name"}
                                maxLength={8}
                                onChangeText={(text) => {
                                    this.setState({
                                        firstName: text
                                    })
                                }}
                            />
                            <TextInput
                                style={styles.formTextInput}
                                placeholder={"Last Name"}
                                maxLength={8}
                                onChangeText={(text) => {
                                    this.setState({
                                        lastName: text
                                    })
                                }}
                            />
                            <TextInput
                                style={styles.formTextInput}
                                placeholder={"Email"}
                                keyboardType={'email-address'}
                                onChangeText={(text) => {
                                    this.setState({
                                        emailId: text
                                    })
                                }}
                            /><TextInput
                            style={styles.formTextInput}
                            placeholder={"Password"}
                            secureTextEntry={true}
                            onChangeText={(text) => {
                                this.setState({
                                    password: text
                                })
                            }}
                        /><TextInput
                            style={styles.formTextInput}
                            placeholder={"Confrim Password"}
                            secureTextEntry={true}
                            onChangeText={(text) => {
                                this.setState({
                                    confirmPassword: text
                                })
                            }}
                        />
                            <View style={styles.modalBackButton}>
                                <TouchableOpacity
                                    style={styles.registerButton}
                                    onPress={() =>
                                        this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                                    }
                                >
                                    <Text style={styles.registerButtonText}>Register</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.modalBackButton}>
                                <TouchableOpacity
                                    style={styles.cancelButton}
                                    onPress={() => this.setState({"isModalVisible": false})}
                                >
                                    <Text style={{color: '#ff5722'}}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <MyHeader title="Select Or Sign Up Screen" navigation={this.props.navigation}/>
                {
                    this.showModal()
                }
                <TouchableOpacity style={styles.button}
                                  onPress={this.goToLoginForPasswordsScreen}>
                    <Text>
                        Open Passwords
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                                  onPress={this.goToNotesScreen}>
                    <Text>
                        Open Notes
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                                  onPress={() => this.setState({isModalVisible: true})}>
                    <Text>
                        Do not have an account?click here
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
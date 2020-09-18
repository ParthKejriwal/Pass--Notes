import React, {Component} from 'react';
import {FlatList, KeyboardAvoidingView, Modal, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import MyHeader from '../components/MyHeader';
import styles from '../components/CommonStylesheet'
import firebaseService from "../components/FirebaseService";

export default class PasswordScreen extends Component {
    constructor() {
        super();
        this.state = {
            allPasswords: [],
            password: '',
            confirmPassword: '',
            website: '',
            username: '',
            isModalVisible: 'false',
            userId: "Parth"
        }
        this.passwordsRef = null
    }

    static navigationOptions = {header: null};

    refreshNotes = (allPasswords) => {
        this.setState({
            allPasswords: allPasswords
        });
    }

    componentDidMount() {
        firebaseService.getAllPasswords(this.refreshNotes);
    }

    componentWillUnmount() {
        this.passwordsRef();
    }

    createPasswordsCollection = () => {
        firebaseService.savePassword({
            password: this.state.password,
            website: this.state.website,
            username: this.state.username
        })
    }

    showModal = () => {
        return (
            <Modal
                animationType="fade"
                transparent={false}
                visible={this.state.isModalVisible}
            >
                <View style={styles.modalContainer}>
                    <ScrollView style={{width: '100%'}}>
                        <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
                            <Text
                                style={styles.modalTitle}
                            >Passwords</Text>
                            <TextInput
                                style={styles.formTextInput}
                                placeholder={"Password"}
                                secureTextEntry={false}
                                onChangeText={(text) => {
                                    this.setState({
                                        password: text
                                    })
                                }}
                            /><TextInput
                            style={styles.formTextInput}
                            placeholder={"Website"}
                            secureTextEntry={false}
                            onChangeText={(text) => {
                                this.setState({
                                    website: text
                                })
                            }}
                        />
                            <TextInput
                                style={styles.formTextInput}
                                placeholder={"Username"}
                                secureTextEntry={false}
                                onChangeText={(text) => {
                                    this.setState({
                                        username: text
                                    })
                                }}
                            />
                            <View style={styles.modalBackButton}>
                                <TouchableOpacity
                                    style={styles.registerButton}
                                    onPress={() => {
                                        this.createPasswordsCollection()
                                    }}
                                >
                                    <Text style={styles.registerButtonText}>Confirm</Text>
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
                <MyHeader title="Passwords Screen" navigation={this.props.navigation}/>

                {
                    this.showModal()
                }
                <View style={{flex: 1}}>
                    {
                        this.state.allPasswords.length === 0
                            ? (
                                <View style={styles.subtitle}>
                                    <Text style={{fontSize: 20}}>List of all Passwords</Text>
                                </View>
                            )
                            : (
                                <FlatList
                                    data={this.state.allPasswords}
                                    renderItem={({item}) => (
                                        <View style={{borderBottomWidth: 2}}>
                                            <Text>{"Password: " + item.password}</Text>
                                            <TouchableOpacity style={styles.button}
                                                              onPress={() => this.setState({"isModalVisible": true})}><Text>{"Website: " + item.website}</Text></TouchableOpacity>
                                            <Text>{"Username: " + item.username}</Text>
                                        </View>
                                    )}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            )
                    }
                </View>
                <TouchableOpacity style={styles.button}
                                  onPress={() => this.setState({"isModalVisible": true})}>
                    <Text>
                        Add Passwords
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

}
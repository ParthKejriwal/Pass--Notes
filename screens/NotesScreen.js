import React, {Component} from 'react';
import {FlatList, KeyboardAvoidingView, Modal, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import MyHeader from '../components/MyHeader';
import styles from '../components/CommonStylesheet'
import firebaseService from "../components/FirebaseService";

export default class NotesScreen extends Component {
    constructor() {
        super();
        this.state = {
            allNotes: [],
            emailId: '',
            password: '',
            list: '',
            title: '',
            confirmPassword: '',
            isModalVisible: 'false',
            isDeletePressed: 'false'
        }
        this.notesRef = null
    }

    createNotesCollection = () => {
        firebaseService.saveNotes({
            list: this.state.list,
            title: this.state.title
        })
    }

    static navigationOptions = {header: null};

    refreshNotes = (allNotes) => {
        this.setState({
            allNotes: allNotes
        });
    }

    componentDidMount() {
        firebaseService.getAllNotes(this.refreshNotes);
    }

    componentWillUnmount() {
        this.notesRef();
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
                            >Notes</Text>
                            <TextInput
                                style={styles.formTextInput}
                                placeholder={"Title"}
                                secureTextEntry={false}
                                onChangeText={(text) => {
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
                                    onPress={() => {
                                        this.createNotesCollection()
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
                <MyHeader title="Notes Screen" navigation={this.props.navigation}/>
                {
                    this.showModal()
                }
                <View style={{flex: 1}}>
                    {

                        this.state.allNotes.length === 0
                            ? (

                                <View style={styles.subtitle}>
                                    <Text style={{fontSize: 20}}>List of all Notes</Text>
                                </View>
                            )
                            : (
                                <FlatList
                                    data={this.state.allNotes}
                                    renderItem={({item}) => (
                                        <View style={{borderBottomWidth: 2}}>
                                            <TouchableOpacity style={styles.button}
                                                              onPress={() => this.setState({"isModalVisible": true})}><Text
                                                style={{fontSize: 37}}>{"Title: " + item.title}</Text></TouchableOpacity>
                                            <Text style={{fontSize: 27}}>{"List: " + item.list}</Text>
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
                        Add Notes
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

}




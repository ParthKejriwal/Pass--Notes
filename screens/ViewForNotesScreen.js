import React, {Component} from 'react';
import {FlatList, Modal, Text, TextInput, TouchableHighlight, View} from 'react-native';
import styles from '../components/CommonStylesheet'
import firebaseService from "../components/FirebaseService";

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isModalVisible: false,
            inputText: '',
            editedItem: 0,
        };
    }

    refreshNotes = (allNotes) => {
        this.setState({
            data: allNotes
        });
    }

    componentDidMount() {
        firebaseService.getAllNotes(this.refreshNotes);
    }

    setModalVisible = (bool) => {
        this.setState({isModalVisible: bool})
    }

    setInputText = (text) => {
        this.setState({inputText: text})
    }

    setEditedItem = (id) => {
        this.setState({editedItem: id})
    }

    handleEditItem = (editedItem) => {
        const newData = this.state.data.map(item => {
            if (item.id === editedItem) {
                item.title = this.state.inputText
                console.log(item.id)
                return item
            }
            return item
        })
        this.setState({data: newData})
    }

    renderItem = ({item}) => (
        <TouchableHighlight onPress={() => {
            this.setModalVisible(true);
            this.setInputText(item.title), this.setEditedItem(item.id)
        }}
                            underlayColor={'#f1f1f1'}>
            <View style={styles.item}>
                <View style={styles.marginLeft}>
                    <View style={[styles.menu, {backgroundColor: item.color}]}></View>
                    <View style={[styles.menu, {backgroundColor: item.color}]}></View>
                    <View style={[styles.menu, {backgroundColor: item.color}]}></View>
                </View>
                <Text style={styles.text}> {item.title} </Text>
            </View>
        </TouchableHighlight>
    )

    render() {
        return (
            <View style={styles.contentContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerText}> List Header </Text>
                </View>
                <FlatList
                    data={this.state.data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={this.renderItem}
                />
                <Modal animationType="fade" visible={this.state.isModalVisible}
                       onRequestClose={() => this.setModalVisible(false)}>
                    <View style={styles.modalView}>
                        <Text style={styles.text}>Change text:</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(text) => {
                                this.setState({inputText: text});
                                console.log('state ', this.state.inputText)
                            }}
                            defaultValue={this.state.inputText}
                            editable={true}
                            multiline={false}
                            maxLength={200}
                        />
                        <TouchableHighlight onPress={() => {
                            this.handleEditItem(this.state.editedItem);
                            this.setModalVisible(false)
                        }}
                                            style={[styles.touchableHighlight, {backgroundColor: 'orange'}]}
                                            underlayColor={'#f1f1f1'}>
                            <Text style={styles.text}>Save</Text>
                        </TouchableHighlight>
                    </View>
                </Modal>
            </View>
        )
    }
};
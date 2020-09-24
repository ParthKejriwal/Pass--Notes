import React,{Component}from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import styles from '../components/CommonStylesheet'
import EdiText from 'react-editext'
import firebaseService from "../components/FirebaseService";

export default class TestNotesScreen extends Component {

    render() {
        return (
            <View>
                <Text>
                    This is the test notes screen
                </Text>
                
            </View>
        )
    }
}
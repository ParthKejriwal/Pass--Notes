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
                   id is  {this.props.navigation.state.params._id}
                </Text>
                <Text>
                    title is  {this.props.navigation.state.params.title}
                </Text>
                <Text>
                    list is  {this.props.navigation.state.params.list}
                </Text>
            </View>
        )
    }
}
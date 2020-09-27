import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SelectOrSignUpScreen from './screens/SelectOrSignUpScreen'
import NotesScreen from './screens/NotesScreen'
import PasswordScreen from './screens/PasswordScreen'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import EditForNotes from './screens/EditForNotes';
import EditForPasswords from './screens/EditForPasswords';
import LoginForPasswordsScreen from './screens/LoginForPasswordsScreen.js'

export default function App() {
    return (
        <View style={styles.container}>
            <AppContainer/>
            <StatusBar style="auto"/>
        </View>
    );
}

var AppNavigator = createSwitchNavigator({
    SelectOrSignUpScreen: SelectOrSignUpScreen,
    NotesScreen: NotesScreen,
    LoginForPasswordsScreen:LoginForPasswordsScreen,
    PasswordScreen: PasswordScreen,
    EditForPasswords:EditForPasswords,
    EditForNotes:EditForNotes
})


const AppContainer = createAppContainer(AppNavigator)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

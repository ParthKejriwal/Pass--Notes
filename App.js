import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SelectOrSignUpScreen from './screens/SelectOrSignUpScreen'
import NotesScreen from './screens/NotesScreen'
import PasswordScreen from './screens/PasswordScreen'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import ViewForNotesScreen from './screens/ViewForNotesScreen'

export default function App() {
  return (
    <View style={styles.container}>
      <AppContainer />
      <StatusBar style="auto" />
    </View>
  );
}

var AppNavigator = createSwitchNavigator({
  SelectOrSignUpScreen:SelectOrSignUpScreen,
  ViewForNotesScreen:ViewForNotesScreen,PasswordScreen:PasswordScreen
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

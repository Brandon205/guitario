import React, { useState } from 'react';
import { Text, Platform, Pressable, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StringsNote from './components/StringsNote';
import Frequencies from './components/Frequencies'; // Will pull either the .android.js or just the .js one based on platform

const Stack = createNativeStackNavigator();

export default function App() {
  const [note, setNote] = useState("A");
  const [string, setString] = useState("6th (E)");
  const [noteColor, setNoteColor] = useState("#33CC33");
  const [stringColor, setStringColor] = useState("#D07173");

  let createNote = () => { // Generates a random note and its color and puts both into state
    let tempNote = (Math.floor(Math.random() * 7)).toString()

    switch (tempNote) {
      case "0":
        setNote("A")
        setNoteColor('#ff6300')
        break;
      case "1":
        setNote("B")
        setNoteColor('#99ff00')
        break;
      case "2":
        setNote("C")
        setNoteColor('#28ff00')
        break;
      case "3":
        setNote("D")
        setNoteColor('#007cff')
        break;
      case "4":
        setNote("E")
        setNoteColor('#4500ea')
        break;
      case "5":
        setNote("F")
        setNoteColor('#57009e')
        break;
      case "6":
        setNote("G")
        setNoteColor('#b30000')
        break;
      default:
        setNote("Uh oh, this should be a note... Try again")
    }
  }

  let createString = () => { // Generates a random string and its color and puts both into state
    let tempString = (Math.floor(Math.random() * 6)).toString()

    switch (tempString) {
      case "0":
        setString("6th (E)")
        setStringColor('#4500ea')
        break;
      case "1":
        setString("5th (A)")
        setStringColor('#ff6300')
        break;
      case "2":
        setString("4th (D)")
        setStringColor('#007cff')
        break;
      case "3":
        setString("3rd (G)")
        setStringColor('#b30000')
        break;
      case "4":
        setString("2nd (B)")
        setStringColor('#99ff00')
        break;
      case "5":
        setString("1st (e)")
        setStringColor('#4500ea')
        break;
      default:
        setString("Uh oh, this should be a string... Try again")
    }
  }

  let content;
  if (Platform.OS === 'web') {
    content = (
      <Stack.Screen name="Guitario" options={({ navigation }) => ({
        headerRight: () => (<Pressable title="Notes >" onPress={() => navigation.navigate('Notes')}><Text style={styles.headerText}>NOTES</Text></Pressable>)
      })}>
        { props => <Frequencies {...props} createNote={() => createNote()} createString={() => createString()} string={string} note={note} noteColor={noteColor} stringColor={stringColor} /> }
      </Stack.Screen>
    )
  } else {
    content = (
      <Stack.Screen name="Guitario" options={({ navigation }) => ({
        headerRight: () => (<Pressable onPress={() => navigation.navigate('Notes')}><Text style={styles.headerText}>GUITARIO</Text></Pressable>)
      })}>
        { props => <Frequencies {...props} createNote={() => createNote()} createString={() => createString()} string={string} note={note} noteColor={noteColor} stringColor={stringColor} /> }
      </Stack.Screen>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: '#19191B'}, headerTintColor: '#fff', headerTitleAlign: 'center', headerTitleStyle: {fontSize: 24, fontWeight: 'bold'}}}>
        {content}
        <Stack.Screen name="Notes" options={({ navigation }) => ({
          headerLeft: () => (<Pressable onPress={() => navigation.navigate('Guitario')}><Text style={styles.headerText}>GUITARIO</Text></Pressable>)
        })}>
          { props => <StringsNote {...props} createNote={() => createNote()} note={note} noteColor={noteColor} /> }
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 22,
    color: '#fff',
    marginRight: 15,
    marginLeft: 15,
    textDecorationLine: 'underline'
  }
})

import React, { useState } from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notes from './components/Notes';
import StringsNote from './components/StringsNote';
// import Frequencies from './components/Frequencies'; // FOR FUTURE RELEASE

const Stack = createNativeStackNavigator();

export default function App() {
  const [note, setNote] = useState("0")
  const [string, setString] = useState("E (6th)")
  const [noteColor, setNoteColor] = useState("#33CC33")
  const [stringColor, setStringColor] = useState("#D07173")

  let createNote = () => { // Generates a random note and its color and puts both into state
    let tempNote = (Math.floor(Math.random() * 7)).toString()

    switch (tempNote) {
      case "0":
        setNote("A")
        setNoteColor('#33CC33')
        break;
      case "1":
        setNote("B")
        setNoteColor('#8EC9FF')
        break;
      case "2":
        setNote("C")
        setNoteColor('#FF0000')
        break;
      case "3":
        setNote("D")
        setNoteColor('#FFFF00')
        break;
      case "4":
        setNote("E")
        setNoteColor('#C3F2FF')
        break;
      case "5":
        setNote("F")
        setNoteColor('#AB0034')
        break;
      case "6":
        setNote("G")
        setNoteColor('#FF7F00')
        break;
      default:
        setNote("Uh oh, this should be a note... Try again")
    }
  }

  let createString = () => { // Generates a random string and its color and puts both into state
    let tempString = (Math.floor(Math.random() * 6)).toString()

    switch (tempString) {
      case "0":
        setString("E (6th)")
        setStringColor('#D07173')
        break;
      case "1":
        setString("A (5th)")
        setStringColor('#F3F071')
        break;
      case "2":
        setString("D (4th)")
        setStringColor('#1861BF')
        break;
      case "3":
        setString("G (3rd)")
        setStringColor('#F3B54D')
        break;
      case "4":
        setString("B (2nd)")
        setStringColor('#50C839')
        break;
      case "5":
        setString("e (1st)")
        setStringColor('#CF27C4')
        break;
      default:
        setString("Uh oh, this should be a string... Try again")
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: '#19191B'}, headerTintColor: '#fff', headerTitleAlign: 'center', headerTitleStyle: {fontSize: 24, fontWeight: 'bold'}}}>
        <Stack.Screen name="Guitario" options={({ navigation }) => ({
          // headerRight: () => (<Button title="Frequencies ->" onPress={() => navigation.navigate('Frequencies')} />) // FOR FUTURE RELEASE
          headerRight: () => (<Button title="Guitario Notes >" onPress={() => navigation.navigate('Guitario Notes')} />)
        })}>
          { props => <Notes {...props} createNote={() => createNote()} createString={() => createString()} string={string} note={note} noteColor={noteColor} stringColor={stringColor} /> }
        </Stack.Screen>
        <Stack.Screen name="Guitario Notes" options={({ navigation }) => ({
          headerLeft: () => (<Button title="< Guitario" onPress={() => navigation.navigate('Guitario')} />)
        })}>
          { props => <StringsNote {...props} createNote={() => createNote()} note={note} noteColor={noteColor} /> }
          {/* { props => <Frequencies /> } FOR FUTURE RELEASE*/} 
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

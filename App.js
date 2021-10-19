import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notes from './components/Notes';
import StringsNote from './components/StringsNote';
const frets = require('./components/frets.json');

const Stack = createNativeStackNavigator();

export default function App() {
  const [note, setNote] = useState("0")
  const [string, setString] = useState("E (6th)")
  const [noteColor, setNoteColor] = useState("#33CC33")
  const [stringColor, setStringColor] = useState("#D07173")
  const [answer, setAnswer] = useState("5")

  useEffect(() => { // Adds listener for web users, also calls the initial createNote and createString
    if (Platform.OS === 'web') {
      document.addEventListener('keypress', (e) => {
        if (e.code === 'Space') {
          createNote()
          createString()
        }
      })
    }

    createNote()
    createString()

    return () => {
      if (Platform.OS === 'web') {
        document.removeEventListener('keypress')
      }
    }
}, [])


let createPair = () => { // When a string and a note are needed check to see if a non default string and note are ready
  console.log(string, note)
  if (string !== "6" && note !== "0") {
    setAnswer(frets[string][note])
    console.log(answer)
  }
}

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
        setNote("Uh oh, this should be a note...")
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
        setString("Uh oh, this should be a string...")
    }
    createPair()
  }

  return (
    <NavigationContainer>
      <Stack.Navigator style={styles.container}>
        <Stack.Screen name="Notes" component={ () => <Notes createNote={() => createNote()} createString={() => createString} string={string} note={note} noteColor={noteColor} stringColor={stringColor} answer={answer} /> } />
        <Stack.Screen name="String Notes" component={  () => <StringsNote createNote={() => createNote()} note={note} noteColor={noteColor} /> } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

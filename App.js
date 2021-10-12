import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Platform, Dimensions } from 'react-native';
import Notes from './components/Notes';
import StringsNote from './components/StringsNote';
import { NativeRouter, Route, Link } from 'react-router-native';
const frets = require('./components/frets.json')

export default function App() {
  const [note, setNote] = useState(undefined)
  const [string, setString] = useState(undefined)
  const [noteColor, setNoteColor] = useState(undefined)
  const [stringColor, setStringColor] = useState(undefined)
  const [answer, setAnswer] = useState(undefined)

  useEffect(() => {
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

  let createNote = () => {
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
    setAnswer(frets[tempString][tempNote])
  }

  let createString = () => {
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
  }

  return (
    <NativeRouter>
      <View style={styles.container}>
        <Route exact path="/" render={ () => <Notes createNote={() => createNote()} createString={() => createString} string={string} note={note} noteColor={noteColor} stringColor={stringColor} answer={answer} /> } />
        <Route exact path="/stringsNote" render={ () => <StringsNote createNote={() => createNote()} note={note} noteColor={noteColor} /> } />
        <Link to="/stringsNote"><Text>String Notes</Text></Link>
        <Link to="/"><Text>Home</Text></Link>
      </View>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

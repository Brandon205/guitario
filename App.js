import React from 'react';
import { StyleSheet, View } from 'react-native';
import Notes from './components/Notes';
import StringsNote from './components/StringsNote';

export default function App() {
  const [note, setNote] = useState(undefined)
  const [string, setString] = useState(undefined)
  const [noteColor, setNoteColor] = useState(undefined)
  const [stringColor, setStringColor] = useState(undefined)

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
    <View style={styles.container}>
      <Notes />
      <StringsNote />
    </View>
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

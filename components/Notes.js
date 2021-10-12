import React, { useState, useEffect} from 'react'
import { View, Text, Platform, StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
const frets = require('./frets.json')

export default function Notes() {
    const [note, setNote] = useState(undefined)
    const [string, setString] = useState(undefined)
    const [noteColor, setNoteColor] = useState(undefined)
    const [stringColor, setStringColor] = useState(undefined)
    const [answer, setAnswer] = useState(undefined)
    const [showAnswer, setShowAnswer] = useState(false)

    useEffect(() => {
        if (Platform.OS === 'web') {
            document.addEventListener('keypress', (e) => {
                if (e.code === 'Space') {
                    createNote()
                }
            })
        }

        createNote()

        return () => {
            if (Platform.OS === 'web') {
                document.removeEventListener('keypress')
            }
        }
    }, [])

    let createNote = () => {
        let tempNote = (Math.floor(Math.random() * 7)).toString()
        let tempString = (Math.floor(Math.random() * 6)).toString()

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

        setAnswer(frets[tempString][tempNote])
    }

    return (
        <View style={styles.container} onTouchStart={() => createNote()} onLong>
            <Text style={styles.noteText}>String: <Text style={{color: stringColor}}>{string}</Text></Text>
            <Text style={styles.noteText}>Note: <Text style={{color: noteColor}}>{note}</Text></Text>
            <Text style={{color: 'white'}}>*Tap anywhere on the screen to get a new note to play</Text>
            <TouchableOpacity style={styles.answer} onLongPress={() => setShowAnswer(true)} onPressOut={() => setShowAnswer(false)}><Text style={styles.answer}>*Press and hold here to see the correct fret</Text></TouchableOpacity>
            <Text style={{display: showAnswer ? 'inline-block' : 'none', color: 'white', fontSize: 20}}>{answer}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#292B36',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    noteText: {
        fontSize: 50,
        color: 'white'
    },
    answer: {
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold'
    }
})

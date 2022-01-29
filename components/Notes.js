import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Pressable, Platform} from 'react-native'
const frets = require('./frets.json')

export default function Notes(props) {
    const [showAnswer, setShowAnswer] = useState(false) // If the user is holding the show answer text set to true

    useEffect(() => { // Adds listener for web users, also calls the initial createNote and createString
        if (Platform.OS === 'web') {
          document.addEventListener('keypress', (e) => {
            if (e.code === 'Space') {
              setShowAnswer(false)
              props.createNote()
              props.createString()
            }
          })
        }
        setShowAnswer(false)
        props.createNote()
        props.createString()
    
        return () => {
          if (Platform.OS === 'web') {
            document.removeEventListener('keypress')
          }
        }
    }, [])

    let playThis = () => { // Calls the functions needed to change the note and string
        setShowAnswer(false)
        props.createNote()
        props.createString()
    }

    return (
        <View style={styles.container}>
            <Text style={{display: showAnswer ? 'flex' : 'none', color: 'white', fontSize: 30}}>Correct fret: {frets[props.string][props.note]}</Text>
            <View style={styles.toPlay} onTouchEnd={() => playThis()}>
                <Text style={styles.noteText}>String: <Text style={{color: props.stringColor}}>{props.string}</Text></Text>
                <Text style={styles.noteText}>Note: <Text style={{color: props.noteColor}}>{props.note}</Text></Text>
            </View>
            <Text style={{color: '#fff', marginTop: 15}}>*Tap the words above or hit the spacebar to generate a new note*</Text>
            <Pressable onPress={() => setShowAnswer(true)}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Stuck?</Text>
                </View>
            </Pressable>
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
        width: '100%',
        height: '100%'
    },
    noteText: {
        fontSize: 50,
        color: 'white',
        paddingTop: 20
    },
    answer: {
        fontSize: 12,
        marginTop: 15,
        color: 'white',
        fontWeight: 'bold'
    },
    toPlay: {
        display: 'flex',
        alignItems: 'center'
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '#2196F3',
        borderRadius: 20
    },
    buttonText: {
        color: 'white',
        padding: 10,
        fontSize: 20
    }
})

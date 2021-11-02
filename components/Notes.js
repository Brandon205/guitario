import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
const frets = require('./frets.json')

export default function Notes(props) {
    const [showAnswer, setShowAnswer] = useState(false) // If the user is holding the show answer text set to true

    let playThis = () => { // Calls the functions needed to change the note and string
        props.createNote()
        props.createString()
    }

    return (
        <View style={styles.container} onTouchStart={() => playThis()}>
            <Text style={styles.noteText}>String: <Text style={{color: props.stringColor}}>{props.string}</Text></Text>
            <Text style={styles.noteText}>Note: <Text style={{color: props.noteColor}}>{props.note}</Text></Text>
            <Text style={{color: '#fff'}}>*Tap anywhere on the screen to get a new note to play</Text>
            <TouchableOpacity style={styles.answer} onLongPress={() => setShowAnswer(true)} onPressOut={() => setShowAnswer(false)}><Text style={styles.answer}>*Press and hold here to see the correct fret</Text></TouchableOpacity>
            <Text style={{display: showAnswer ? 'flex' : 'none', color: 'white', fontSize: 20}}>{frets[props.string][props.note]}</Text>
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

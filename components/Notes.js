import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
const frets = require('./frets.json')

export default function Notes(props) {
    const [showAnswer, setShowAnswer] = useState(false) // If the user is holding the show answer text set to true

    let playThis = () => { // Calls the functions needed to change the note and string
        props.createNote()
        props.createString()
    }

    return (
        <View style={styles.container}>
            <Text style={{display: showAnswer ? 'flex' : 'none', color: 'white', fontSize: 30}}>Fret: {frets[props.string][props.note]}</Text>
            <View style={styles.toPlay} onTouchEnd={() => playThis()}>
                <Text style={styles.noteText}>String: <Text style={{color: props.stringColor}}>{props.string}</Text></Text>
                <Text style={styles.noteText}>Note: <Text style={{color: props.noteColor}}>{props.note}</Text></Text>
            </View>
            <Text style={{color: '#fff', marginTop: 15}}>*Tap above here on the screen to get a new note to play</Text>
            <TouchableOpacity style={styles.answer} onLongPress={() => setShowAnswer(true)} onPressOut={() => setShowAnswer(false)}><Text style={styles.answer}>*Press and hold here to see the correct fret</Text></TouchableOpacity>
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
    }
})

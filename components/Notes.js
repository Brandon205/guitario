import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable} from 'react-native'
const frets = require('./frets.json')

export default function Notes(props) {
    const [showAnswer, setShowAnswer] = useState(false) // If the user is holding the show answer text set to true

    let playThis = () => { // Calls the functions needed to change the note and string
        setShowAnswer(false)
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
            <Text style={{color: '#fff', marginTop: 15}}>*Tap "String" or "Note" above to generate a new note*</Text>
            {/* <TouchableOpacity style={styles.answer} onLongPress={() => setShowAnswer(true)} onPressOut={() => setShowAnswer(false)}><Text style={styles.answer}>*Press and hold here to see the correct fret</Text></TouchableOpacity> */}
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

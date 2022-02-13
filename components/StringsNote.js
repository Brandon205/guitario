import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

export default function StringsNote(props) {
    return (
        <Pressable style={styles.container} onTouchStart={() => props.createNote()}>
            <Text style={styles.noteText}>Note: <Text style={{color: props.noteColor}}>{props.note}</Text></Text>
            <View style={styles.textContainer}>
                <Text style={styles.text}>*Play the note on all of the strings</Text>
                <Text style={styles.text}>*Tap anywhere on the screen or tap the spacebar to generate a new note*</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({ // {color: '#fff', fontWeight: 'bold'}{color: '#fff', marginTop: 10}
    container: {
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#292B36',
        width: '100%',
        height: '100%'
    }, 
    textContainer: {
        color: '#fff',
        maxWidth: '75%'
    },
    noteText: {
        fontSize: 50,
        color: 'white',
        marginBottom: 18
    },
    text: {
        color: '#fff',
        marginTop: 10,
    }
    
})

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function StringsNote(props) {
    return (
        <View style={styles.container} onTouchStart={() => props.createNote()}>
            <Text style={styles.screenText}>Note: <Text style={{color: props.noteColor}}>{props.note}</Text></Text>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>*Play the above note on all of the strings</Text>
            <Text style={{color: '#fff', marginTop: 10}}>*Tap anywhere on the screen or hit the spacebar to generate a new note*</Text>
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
    screenText: {
        fontSize: 50,
        color: 'white',
        marginBottom: 18
    },
    
})

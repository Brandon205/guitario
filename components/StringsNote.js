import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

export default function StringsNote(props) {
    return (
        <View style={styles.container} onTouchStart={() => props.createNote()}>
            <Text style={styles.screenText}>Note: <Text style={{color: props.noteColor}}>{props.note}</Text></Text>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>*Play the above note on all of the strings</Text>
            <Text style={{color: '#fff'}}>*Tap anywhere on the screen to get a new note to play</Text>
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
    screenText: {
        fontSize: 50,
        color: 'white'
    },
    
})

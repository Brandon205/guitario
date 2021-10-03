import React, { useState, useEffect} from 'react'
import { View, Text, Platform, StyleSheet, Dimensions} from 'react-native'

export default function Notes() {
    const [note, setNote] = useState(undefined)
    const [string, setString] = useState(undefined)

    useEffect(() => {
        if (Platform.OS === 'web') {
            // Register keyboard event here if needed
        }

        createNote()

        return () => {
            // Unregister keyboard event here if needed
            // if (Platform.OS === 'web') {
            //     // Unregister keyboard event
            // }
        }
    }, [])

    let createNote = () => {
        let tempNote = Math.floor(Math.random() * 7)
        let tempString = Math.floor(Math.random() * 6)

        switch (tempNote) {
            case 0:
                setNote("A")
                break;
            case 1:
                setNote("B")
                break;
            case 2:
                setNote("C")
                break;
            case 3:
                setNote("D")
                break;
            case 4:
                setNote("E")
                break;
            case 5:
                setNote("F")
                break;
            case 6:
                setNote("G")
                break;
            default:
                setNote("Uh oh, this should be a note...")
        }

        switch (tempString) {
            case 0:
                setString("E (6th)")
                break;
            case 1:
                setString("A (5th)")
                break;
            case 2:
                setString("D (4th)")
                break;
            case 3:
                setString("G (3rd)")
                break;
            case 4:
                setString("B (2nd)")
                break;
            case 5:
                setString("e (1st)")
                break;
            default:
                setString("Uh oh, this should be a string...")
        }
    }

    return (
        <View style={styles.container} onTouchStart={() => createNote()}>
            <Text style={styles.noteText}>String: {string}</Text>
            <Text style={styles.noteText}>Note: {note}</Text>
            <Text style={{color: 'black'}}>*Tap anywhere on the screen to get a new set of notes</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'whitesmoke',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    noteText: {
        fontSize: 50,
        color: 'black'
    }
})

import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, Pressable, Button, Platform, Linking } from 'react-native'
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

    const handlePress = useCallback(async () => { // Handles the creation of the link that is in the app
        const supported = await Linking.canOpenURL("https://brandon205.github.io/guitario/");
    
        if (supported) { // Open the link with what makes sense depending on the type of link
            await Linking.openURL("https://brandon205.github.io/guitario/");
        } else {
        Alert.alert(`Don't know how to open this URL: https://brandon205.github.io/guitario/`);
        }
    });

    let content; // Dynamically display a link to the main site if mobile users want to go there
    if (Platform.OS !== 'web') {
        content = (
            <Button title="Go To the Full Site" onPress={() => handlePress()} />
        )
    } else {
        content = <></>
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>To Play</Text>
            <Text style={{display: showAnswer ? 'flex' : 'none', color: 'white', fontSize: 30}}>Correct fret: {frets[props.string][props.note]}</Text>
            <Pressable style={styles.toPlay} onPress={() => playThis()}>
                <Text style={styles.noteText}>String: <Text style={{color: props.stringColor}}>{props.string}</Text></Text>
                <Text style={styles.noteText}>Note: <Text style={{color: props.noteColor}}>{props.note}</Text></Text>
            </Pressable>

            <Text style={styles.text}>*Tap above or tap the spacebar to generate a new note to play*</Text>
            <Pressable onPress={() => setShowAnswer(!showAnswer)}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Stuck?</Text>
                </View>
            </Pressable>
            {content}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#292B36',
    },
    noteText: {
        fontSize: 50,
        color: 'white',
        paddingTop: 20
    },
    text: {
        color: '#fff',
        marginTop: 15,
        maxWidth: '75%'
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        textDecorationLine: 'underline',
        marginTop: 35
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
        marginBottom: 50,
        backgroundColor: '#2196F3',
        borderRadius: 20,
    },
    buttonText: {
        color: 'white',
        padding: 10,
        fontSize: 20
    }
})

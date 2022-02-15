import React, { useCallback } from 'react'
import { View, Text, StyleSheet, Pressable, Linking } from 'react-native'

export default function StringsNote(props) {

    const handlePress = useCallback(async () => { // Handles the creation of the link that is in the app
        const supported = await Linking.canOpenURL("https://github.com/Brandon205/guitario");
        console.log("hello")
    
        if (supported) { // Open the link with what makes sense depending on the type of link
            await Linking.openURL("https://github.com/Brandon205/guitario");
        } else {
        Alert.alert(`Don't know how to open this URL: https://github.com/Brandon205/guitario`);
        }
    });

    return (
        <Pressable style={styles.container} onTouchStart={() => props.createNote()}>
            <Text style={styles.noteText}>Note: <Text style={{color: props.noteColor}}>{props.note}</Text></Text>
            <View style={styles.textContainer}>
                <Text style={styles.text}>*Play the note on all of the strings</Text>
                <Text style={styles.text}>*Tap anywhere on the screen or tap the spacebar to generate a new note*</Text>
            </View>
            <View style={styles.cornerRibbon} onPress={() => handlePress()}>
                <Text style={styles.bannerText}>Github Page</Text>
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
    },
    cornerRibbon: {
        backgroundColor: '#FF6300',
        position: 'absolute',
        bottom: 25,
        left: 0,
        zIndex: 1,
        // transform: [{translateX: 30}, {translateY: 0}, {rotate: '45deg'}]
      },
    bannerText: {
        color: 'white',
        textAlign: 'center',
        width: 120,
        padding: 10,
    }
})

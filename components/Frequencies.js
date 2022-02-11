import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

export default function Frequencies() {
    const [recording, setRecording] = React.useState();

    async function startRecording() {
    try {
        console.log('Requesting permissions..');
        await Audio.requestPermissionsAsync();
        await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        }); 
        console.log('Starting recording..');
        const { recording } = await Audio.Recording.createAsync(
            Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(recording);
        console.log('Recording started');
    } catch (err) {
        console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() { // TEST RECORDING AT file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540brandonb205%252Fguitario/Audio/recording-8b74acc7-9ab6-441e-a4d8-18371302edc5.m4a
    console.log('Stopping recording..');
    // setRecording(undefined); // Maybe get rid of this to have an access point to the latest recording?
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); // Might use this to access the stored audio file
    console.log('Recording stopped and stored at', uri);
    }

    return (
        <View style={styles.container}>
            <Button title={recording ? 'Stop Recording' : 'Start Recording'} onPress={recording ? stopRecording : startRecording} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
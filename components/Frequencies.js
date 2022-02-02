import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Frequencies() {
    const [freq, setFreq] = useState(0);

    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let microphoneStream = null;
    let analyserNode = audioCtx.createAnalyser()
    let audioData = new Float32Array(analyserNode.fftSize);;
    let corrolatedSignal = new Float32Array(analyserNode.fftSize);;
    let localMaxima = new Array(10);

    function startPitchDetection() {
    navigator.mediaDevices.getUserMedia ({audio: true}).then((stream) => {
            microphoneStream = audioCtx.createMediaStreamSource(stream);
            microphoneStream.connect(analyserNode);

            audioData = new Float32Array(analyserNode.fftSize);
            corrolatedSignal = new Float32Array(analyserNode.fftSize);

            setInterval(() => {
                analyserNode.getFloatTimeDomainData(audioData);

                let pitch = getAutocorrolatedPitch();

                setFreq(pitch)
                // frequencyDisplayElement.innerHTML = `${pitch}`;
            }, 300);
        })
        .catch((err) => {
            console.log(err);
        });
}

function getAutocorrolatedPitch() {
    // First: autocorrolate the signal
    let maximaCount = 0;

    for (let l = 0; l < analyserNode.fftSize; l++) {
        corrolatedSignal[l] = 0;
        for (let i = 0; i < analyserNode.fftSize - l; i++) {
            corrolatedSignal[l] += audioData[i] * audioData[i + l];
        }
        if (l > 1) {
            if ((corrolatedSignal[l - 2] - corrolatedSignal[l - 1]) < 0
                && (corrolatedSignal[l - 1] - corrolatedSignal[l]) > 0) {
                localMaxima[maximaCount] = (l - 1);
                maximaCount++;
                if ((maximaCount >= localMaxima.length))
                    break;
            }
        }
    }

    // Second: find the average distance in samples between maxima
    let maximaMean = localMaxima[0];

    for (let i = 1; i < maximaCount; i++)
        maximaMean += localMaxima[i] - localMaxima[i - 1];

    maximaMean /= maximaCount;

    return audioCtx.sampleRate / maximaMean;
}

    return (
        <View style={styles.container}>
            <Text>Current frequency you are playing: </Text>
            <Text>{freq}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center'
    }
})
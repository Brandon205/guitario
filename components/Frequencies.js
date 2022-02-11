import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { noteFromPitch, centsOffFromPitch } from "../helpers/helper.js";
import autoCorrelate from "../helpers/autoCorrelate.js";

const audioCtx = new AudioContext();
const analyserNode = audioCtx.createAnalyser();
const buflen = 2048;
var buf = new Float32Array(buflen);

const noteStrings = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

export default function Frequencies() {
    const [source, setSource] = useState(null);
    const [started, setStart] = useState(false);
    const [pitchNote, setPitchNote] = useState("C");
    const [pitchScale, setPitchScale] = useState("4");
    const [pitch, setPitch] = useState("0");

    const updatePitch = (time) => {
        analyserNode.getFloatTimeDomainData(buf);
        var ac = autoCorrelate(buf, audioCtx.sampleRate);
        if (ac > -1) {
          let note = noteFromPitch(ac);
          let sym = noteStrings[note % 12];
          let scl = Math.floor(note / 12) - 1;
          let dtune = centsOffFromPitch(ac, note);
          setPitch(parseFloat(ac).toFixed(2) + " Hz");
          setPitchNote(sym);
          setPitchScale(scl);
          setDetune(dtune);
          setNotification(false);
          console.log(note, sym, scl, dtune, ac);
        }
      };

      useEffect(() => {
        if (source != null) {
          source.connect(analyserNode);
        }
      }, [source]);
    
      setInterval(updatePitch, 1);
    
      const start = async () => {
        const input = await getMicInput();
    
        if (audioCtx.state === "suspended") {
          await audioCtx.resume();
        }
        setStart(true);
        setNotification(true);
        setTimeout(() => setNotification(false), 5000);
        setSource(audioCtx.createMediaStreamSource(input));
      };
    
      const stop = () => {
        source.disconnect(analyserNode);
        setStart(false);
      };
    
      const getMicInput = () => {
        return navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            autoGainControl: false,
            noiseSuppression: false,
            latency: 0,
          },
        });
      };

    if (pitchNote === "A") { // TESTING OF LATER IMPLEMENTATION
        console.log("WINNER")
    }

    return (
        <View style={styles.container}>
            <Button title="Start" onPress={start} />
            <Text>{pitchNote}</Text>
            <Text>{pitch}</Text>
            <Button title="Stop" onPress={stop} />
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
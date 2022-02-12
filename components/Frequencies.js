import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Notes from './Notes.js';
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

export default function Frequencies(props) {
  const [source, setSource] = useState(null);
  const [started, setStart] = useState(false);
  const [pitchNote, setPitchNote] = useState("C");
  const [pitchScale, setPitchScale] = useState("4");
  const [pitch, setPitch] = useState("0");
  const [next, setNext] = useState(false) // For knowing if next note function has been run yet or not

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
      // setDetune(dtune);
      // setNotification(false);
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
    // setNotification(true);
    // setTimeout(() => setNotification(false), 5000);
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

  if (pitchNote === "A") { // TESTING OF LATER IMPLEMENTATION, use state to say whether it has ran
    console.log("WINNER")
  }

  let content;
  if (started) {
    content = (
      <Button title="Stop" onPress={stop} />
    )
  } else {
    content = (
      <Button title="Start" onPress={start} />
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.pitchText}>{pitchNote}</Text>
      <Text style={styles.pitchText}>{pitch}hz</Text>
      {content}
      <Notes createNote={() => props.createNote()} createString={() => props.createString()} string={props.string} note={props.note} noteColor={props.noteColor} stringColor={props.stringColor}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#292B36',
    width: '100%',
    height: '100%'
  },
  pitchText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 15
  }
})
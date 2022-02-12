import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Notes from './Frequencies.android.js';
import { noteFromPitch } from "../helpers/helper.js";
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
  const [pitchNote, setPitchNote] = useState("N/A");
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
      // let dtune = centsOffFromPitch(ac, note);
      setPitch(parseFloat(ac).toFixed(2) + " Hz");
      setPitchNote(sym);
      setPitchScale(scl);
      // setDetune(dtune);
      // setNotification(false);
      // console.log(note, sym, scl, dtune, ac);
    }
  };

  useEffect(() => { // When the source changes update it in the app
    if (source != null) {
      source.connect(analyserNode);
    }
  }, [source]);

  useEffect(() => { // Using the useEffect so that the state can be updated in App without causing an error
    if (next) {
      props.createNote()
      props.createString()
    }
  }, [next]);

  useEffect(() => { // Once the note is updated we need to change our "toggle" back otherwise we would update the note like 5 times in a second
    if (next) {
      setNext(false)
    }
  }, [props.note]);

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

  if (pitchNote === props.note) { // Checks if the user is playing the Current Note
    console.log('CORRECT note played')
    if (!next) { // If the note isn't already being changed then say it is and the UseEffect above will change it
      setNext(true)
    }
  }

  let content; // TODO: change buttons to pressables here
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
      <Notes createNote={() => props.createNote()} createString={() => props.createString()} string={props.string} note={props.note} noteColor={props.noteColor} stringColor={props.stringColor}/>
      <Text style={styles.title}>Currently Playing</Text>
      <Text style={styles.pitchText}>{pitchNote}</Text>
      <Text style={styles.pitchText}>{pitch}hz</Text>
      {content}
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
    marginTop: 12
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    color: 'white',
    textDecorationLine: 'underline'
  }
});

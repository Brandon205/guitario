import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
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

const noteColors = {
  "C": "#22ff00",
  "C#": "#00ff38",
  "D": "#007cff",
  "D#": "#0500ff",
  "E": "#4500ea",
  "F": "#57009e",
  "F#": "#55004f",
  "G": "#b30000",
  "G#": "#ee0000",
  "A": "#ff6300",
  "A#": "#ffec00",
  "B": "#99ff00",
}

export default function Frequencies(props) {
  const [source, setSource] = useState(null);
  const [started, setStart] = useState(false);
  const [pitchNote, setPitchNote] = useState("N/A");
  // const [pitchScale, setPitchScale] = useState("4");
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
      // setPitchScale(scl);
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
    console.log("updated", next)
  }, [next]);

  useEffect(() => { // Once the note is updated we need to change the "toggle" back otherwise we would update the note like 5 times in a second
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
    if (!next) { // If the note isn't already being changed then say it is and the UseEffect above will change it
      console.log("Correct Note played", pitchNote, props.note, next)
      setNext(true)
    }
  }

  let content; // For dynamically rendering the Start or Stop button
  if (started) {
    content = (
      <Pressable onPress={stop}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Stop</Text>
        </View>
      </Pressable>
    )
  } else {
    content = (
      <Pressable onPress={start}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Start</Text>
        </View>
      </Pressable>
    )
  }

  return (
    <View style={styles.container}>
      <Notes createNote={() => props.createNote()} createString={() => props.createString()} string={props.string} note={props.note} noteColor={props.noteColor} stringColor={props.stringColor}/>
      <Text style={styles.title}>Currently Playing</Text>
      <Text style={{color: noteColors[pitchNote], fontSize: 30, fontWeight: 'bold', marginTop: 12}}>{pitchNote}</Text>
      <Text style={{color: noteColors[pitchNote], fontSize: 30, fontWeight: 'bold', marginTop: 12}}>{pitch}hz</Text>
      {content}
      <View style={styles.cornerRibbon}>
        <Text style={styles.bannerText} onPress={() => handlePress()}>Github</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#292B36',
    overflow: 'visible'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    textDecorationLine: 'underline',
    marginTop: 55,
    marginBottom: 15
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#2196F3',
    borderRadius: 20,
    marginBottom: 70
    },
  buttonText: {
    color: 'white',
    padding: 10,
    fontSize: 20
  },
  cornerRibbon: {
    backgroundColor: '#FF6300',
    position: 'absolute',
    top: 25,
    right: 0,
    zIndex: 1,
    borderBottomLeftRadius: 25,
    borderTopLeftRadius: 25
  },
  bannerText: {
    color: 'white',
    textAlign: 'center',
    width: 120,
    padding: 10,
  }
});

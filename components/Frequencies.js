import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Notes from './Frequencies.android.js';
import useSound from 'use-sound';
import correctSound from '../assets/correct.mp3';
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
  "B"
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
  "B": "#99ff00"
}

export default function Frequencies(props) {
  const [source, setSource] = useState(null);
  const [started, setStart] = useState(false);
  const [pitchNote, setPitchNote] = useState("N/A");
  const [pitchScale, setPitchScale] = useState("4");
  const [pitch, setPitch] = useState("0");
  const [play] = useSound(correctSound);

  const updatePitch = (time) => {
    analyserNode.getFloatTimeDomainData(buf);
    var ac = autoCorrelate(buf, audioCtx.sampleRate);
    if (ac > -1) {
      let note = noteFromPitch(ac);
      let sym = noteStrings[note % 12];
      let scl = Math.floor(note / 12) - 1;
      setPitch(parseFloat(ac).toFixed(2) + " Hz");
      setPitchNote(sym);
      setPitchScale(scl);
      console.log(pitchScale);
    }
  };

  useEffect(() => { // When the source changes update it in the app
    if (source != null) {
      source.connect(analyserNode);
    }
  }, [source]);

  useEffect(() => { // Will check if the last played note is the correct one, if so it will make a new note to play
    if (pitchNote === props.note) {
      play();
      props.createNote()
      props.createString()
    }
  }, [pitchNote])

  setInterval(updatePitch, 1);

  const start = async () => {
    const input = await getMicInput();

    if (audioCtx.state === "suspended") {
      await audioCtx.resume();
    }
    setStart(true);
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
      <Text style={{color: noteColors[pitchNote], fontSize: 30, fontWeight: 'bold', marginTop: 12}}>{pitch}</Text>
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
    overflow: 'visible',
    minHeight: '100%'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    textDecorationLine: 'underline',
    marginTop: 45,
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
    width: 80,
    padding: 10,
  }
});

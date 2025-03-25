import { useState, useRef, useEffect } from "react";
import Navbar from "../Components/Navbar";

const NOTE_FREQUENCIES = {
  "C4": 261.63, "C#4": 277.18, "D4": 293.66, "D#4": 311.13,
  "E4": 329.63, "F4": 349.23, "F#4": 369.99, "G4": 392.00,
  "G#4": 415.30, "A4": 440.00, "A#4": 466.16, "B4": 493.88,
};

const getClosestNote = (frequency) => {
  let closestNote = "";
  let minDiff = Infinity;

  for (const [note, freq] of Object.entries(NOTE_FREQUENCIES)) {
    let diff = Math.abs(frequency - freq);
    if (diff < minDiff) {
      minDiff = diff;
      closestNote = note;
    }
  }

  return closestNote;
};

const Tuner = () => {
  const [note, setNote] = useState("");
  const [detuning, setDetuning] = useState(0);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);

  useEffect(() => {
    startTuning();
    return stopTuning;
  }, []);

  const startTuning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContextRef.current.createAnalyser();
      const mic = audioContextRef.current.createMediaStreamSource(stream);

      analyser.fftSize = 2048;
      mic.connect(analyser);
      analyserRef.current = analyser;
      dataArrayRef.current = new Float32Array(analyser.frequencyBinCount);

      detectPitch();
    } catch (error) {
      console.error("Microphone access denied!", error);
    }
  };

  const stopTuning = () => {
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  };

  const detectPitch = () => {
    if (!analyserRef.current) return;

    analyserRef.current.getFloatFrequencyData(dataArrayRef.current);
    let maxAmp = -Infinity;
    let peakIndex = 0;

    dataArrayRef.current.forEach((value, index) => {
      if (value > maxAmp) {
        maxAmp = value;
        peakIndex = index;
      }
    });

    const nyquist = audioContextRef.current.sampleRate / 2;
    const frequency = (peakIndex / analyserRef.current.frequencyBinCount) * nyquist;
    
    if (frequency > 50 && frequency < 2000) { // Ignore noise
      const closestNote = getClosestNote(frequency);
      const targetFreq = NOTE_FREQUENCIES[closestNote];
      setNote(closestNote);
      setDetuning(frequency - targetFreq);
    }

    requestAnimationFrame(detectPitch);
  };

  return (
    <div>
      <Navbar />      
      <h2>Tuner</h2>
      <p>🎵 Note: <strong>{note || "Listening..."}</strong></p>
      <p>{detuning === 0 ? "✅ In Tune" : detuning > 0 ? "⬆️ Sharp" : "⬇️ Flat"}</p>
    </div>
  );
};

export default Tuner;

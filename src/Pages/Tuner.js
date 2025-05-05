import { useState, useRef, useEffect } from "react";
import Navbar from "../Components/Navbar";

// Definimos las frecuencias específicas de las cuerdas de la guitarra
const STRING_FREQUENCIES = {
  "E2": 82.41,  // 6ta cuerda (E)
  "A2": 110.00, // 5ta cuerda (A)
  "D3": 146.83, // 4ta cuerda (D)
  "G3": 196.00, // 3ra cuerda (G)
  "B3": 246.94, // 2da cuerda (B)
  "E4": 329.63  // 1ra cuerda (E)
};

// Función para obtener la nota más cercana según la frecuencia detectada
const getClosestStringNote = (frequency) => {
  let closestNote = "";
  let minDiff = Infinity;

  // Iteramos sobre las frecuencias de las cuerdas para encontrar la más cercana
  for (const [note, freq] of Object.entries(STRING_FREQUENCIES)) {
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
  const [frequency, setFrequency] = useState(0); // Frecuencia detectada
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);

  useEffect(() => {
    startTuning();
    return stopTuning;
  }, []);

  // Función para iniciar el proceso de afinación
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

  // Función para detener el proceso de afinación
  const stopTuning = () => {
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  };

  // Función que detecta la frecuencia y ajusta la nota
  const detectPitch = () => {
    if (!analyserRef.current) return;

    analyserRef.current.getFloatFrequencyData(dataArrayRef.current);
    let maxAmp = -Infinity;
    let peakIndex = 0;

    // Encontramos el índice con la mayor amplitud
    dataArrayRef.current.forEach((value, index) => {
      if (value > maxAmp) {
        maxAmp = value;
        peakIndex = index;
      }
    });

    // Calculamos la frecuencia basada en el índice del pico
    const nyquist = audioContextRef.current.sampleRate / 2;
    const frequency = (peakIndex / analyserRef.current.frequencyBinCount) * nyquist;

    // Solo procesamos frecuencias entre 80 Hz y 350 Hz, que es el rango típico de las cuerdas de guitarra
    if (frequency > 80 && frequency < 350) {
      const closestNote = getClosestStringNote(frequency);
      const targetFreq = STRING_FREQUENCIES[closestNote];
      setNote(closestNote);
      setDetuning(frequency - targetFreq);
      setFrequency(frequency); // Actualizar la frecuencia detectada
    }

    requestAnimationFrame(detectPitch);
  };

  return (
    <div>
      <Navbar />
      <h2>Tuner</h2>
      <p>🎵 Note: <strong>{note || "Listening..."}</strong></p>
      <p>📡 Frequency: <strong>{frequency.toFixed(2)} Hz</strong></p> {/* Mostrar la frecuencia detectada */}
      <p>{detuning === 0 ? "✅ In Tune" : detuning > 0 ? "⬆️ Sharp" : "⬇️ Flat"}</p>
    </div>
  );
};

export default Tuner;

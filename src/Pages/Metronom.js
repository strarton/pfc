import { useState, useRef } from "react";
import Navbar from "../Components/Navbar";

const Metronom = () => {
  const [bpm, setBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef(null);
  const nextTickTimeRef = useRef(0);
  const schedulerRef = useRef(null);

  const playClick = (time) => {
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(1000, time); // 1kHz for click
    gainNode.gain.setValueAtTime(1, time); // Set volume
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.05); // Fade out

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(time);
    oscillator.stop(time + 0.1);
  };

  const scheduler = () => {
    while (nextTickTimeRef.current < audioContextRef.current.currentTime + 0.1) {
      playClick(nextTickTimeRef.current);
      nextTickTimeRef.current += 60 / bpm; // Schedule next click
    }
    schedulerRef.current = setTimeout(scheduler, 25); // Keep scheduling ahead
  };

  const startMetronome = () => {
    if (isPlaying) {
      clearTimeout(schedulerRef.current);
      setIsPlaying(false);
    } else {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      nextTickTimeRef.current = audioContextRef.current.currentTime;
      setIsPlaying(true);
      scheduler();
    }
  };

  const handleBpmChange = (event) => {
    setBpm(Number(event.target.value));
  };

  return (
    <div>
      <Navbar />
      <h2>Metronom</h2>
      <p>{bpm} BPM</p>
      <input type="range" min="40" max="240" value={bpm} onChange={handleBpmChange} />
      <br />
      <button onClick={startMetronome}>{isPlaying ? "Stop" : "Start"}</button>
    </div>
  );
};

export default Metronom;

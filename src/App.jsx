import React, { useState, useRef } from "react";
import "./App.css";
import Landing from "./components/Landing";
import Intro from "./components/Intro";
import RegistrationForm from "./components/RegistrationForm";
import songFile from "./assets/next.mp3";

const App = () => {
  const [step, setStep] = useState(0); // start at Landing
  const audioRef = useRef(null);

  // Function to start music and move to Intro
  const handleStart = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.log("Playback failed:", err);
      });
    }
    setStep(1); // move to Intro
  };

  return (
    <div>
      {/* Persistent audio (keeps playing across steps) */}
      <audio ref={audioRef} src={songFile} loop></audio>

      {step === 0 && <Landing onFinish={handleStart} />}
      {step === 1 && <Intro onFinish={() => setStep(2)} />}
      {step === 2 && <RegistrationForm />}
    </div>
  );
};

export default App;

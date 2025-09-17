import React, { useState, useRef, useEffect } from "react";
import Intro from "./components/Intro";
import RegistrationForm from "./components/RegistrationForm";
import songFile from "./assets/drake.mp3";

const App = () => {
  const [step, setStep] = useState(1);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        console.log("Autoplay blocked, will play on user interaction.");
      });
    }
  }, []);

  return (
    <div>
      {/* Persistent audio (keeps playing across steps) */}
      <audio ref={audioRef} src={songFile} autoPlay loop></audio>

      {step === 1 && <Intro onFinish={() => setStep(2)} />}
      {step === 2 && <RegistrationForm />}
    </div>
  );
};

export default App;

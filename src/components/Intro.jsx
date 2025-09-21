import React, { useState, useEffect } from "react";
import AnimatedText from "./AnimatedText";
import { FaLongArrowAltRight } from "react-icons/fa";
import ArrowRight from "./ArrowRight";

const Intro = ({ onFinish }) => {
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    // Show the skip button after 3 seconds
    const timer = setTimeout(() => {
      setShowSkip(true);
    }, 3000);

    return () => clearTimeout(timer); // cleanup
  }, []);

  return (
    <div className="intro-container">
       <img 
          src="/logos/seminar-logo.png" 
          alt="NEXT Seminar Logo" 
          className="landing-logo"
        />
      {/* Row with NEXT + animated words */}
      <div className="intro-text-row">
        <h1 className="intro-stagnant">NEXT</h1>

        <div className="intro-animated-wrapper">
          <AnimatedText
            words={[
              "OPPORTUNITY",
              "ROLE",
              "ADVENTURE",
              "CHALLENGE",
              "STORY",
              "EXPERIENCE",
              "CHAPTER",
              "CONFERENCE",
              "SEMINAR",
            ]}
            duration={10000}
            onComplete={onFinish}
          />
        </div>
      </div>
      
      <div className="intro-skip-container">
        {/* Skip button (only visible after 3s) */}
        {showSkip && (
          <button className="intro-skip-btn" onClick={onFinish}>
            Skip the Good Part <ArrowRight fill="white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Intro;

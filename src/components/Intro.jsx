import React, { useState, useEffect } from "react";
import AnimatedText from "./AnimatedText";
import { FaLongArrowAltRight } from "react-icons/fa";

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
    <div style={styles.container}>
      {/* Row with NEXT + animated words */}
      <div style={styles.textRow}>
        <h1 style={styles.stagnant}>NEXT</h1>

        <div style={styles.animatedWrapper}>
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
            onComplete={onFinish}
          />
        </div>
      </div>

      {/* Skip button (only visible after 3s) */}
      {showSkip && (
        <button style={styles.skipBtn} onClick={onFinish}>
          Skip the Good Part <FaLongArrowAltRight />
        </button>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#000",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
    position: "relative", // so we can position the button
    padding: "1rem", // Added padding for smaller screens
    boxSizing: "border-box", // Ensure padding doesn't cause overflow
  },
  textRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem", // Changed to relative unit
    flexWrap: "wrap", // Allow wrapping on small screens
  },
  stagnant: {
    fontSize: "clamp(2rem, 8vw, 3.5rem)", // Responsive font size
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: "1px", // Reduced for smaller screens
    margin: "0.5rem 0", // Added margin for spacing when wrapped
  },
  animatedWrapper: {
    minWidth: "min(300px, 90vw)", // Responsive min-width
    textAlign: "left",
    fontSize: "clamp(2rem, 8vw, 3.5rem)", // Responsive font size
    fontWeight: "bold",
  },
  skipBtn: {
    display: "flex", // align text + icon
    alignItems: "center", // vertically center them
    gap: "0.5rem", // space between text and arrow
    position: "absolute",
    bottom: "1rem", // Changed to relative unit
    right: "1rem", // Changed to relative unit
    padding: "0.75rem 1rem", // Changed to relative units
    fontSize: "clamp(0.8rem, 3vw, 1rem)", // Responsive font size
    fontWeight: "bold",
    background: "transparent",
    color: "#fff",
    cursor: "pointer",
    border: "none",
  },
};

// Media queries for additional responsiveness
const mediaQueries = `
  @media (max-width: 768px) {
    .text-row {
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .animated-wrapper {
      text-align: center;
    }
    
    .skip-btn {
      position: fixed;
      bottom: 1rem;
      right: 50%;
      transform: translateX(50%);
      width: 80%;
      max-width: 200px;
    }
  }
  
  @media (max-width: 480px) {
    .stagnant, .animated-wrapper {
      font-size: 1.8rem;
    }
    
    .text-row {
      gap: 0.25rem;
    }
  }
`;

// Add media queries to document
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = mediaQueries;
  document.head.appendChild(styleSheet);
}

export default Intro;

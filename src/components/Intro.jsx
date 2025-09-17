import React from "react";
import AnimatedText from "./AnimatedText";

const Intro = ({ onFinish }) => {
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

      {/* Skip button */}
      <button style={styles.skipBtn} onClick={onFinish}>
        Skip the Good Part →
      </button>
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
  },
  textRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
  },
  stagnant: {
    fontSize: "3.5rem",
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: "2px",
  },
  animatedWrapper: {
    minWidth: "300px",
    textAlign: "left",
    fontSize: "3.5rem",
    fontWeight: "bold",
  },
  skipBtn: {
    marginTop: "60px",
    padding: "12px 24px",
    fontSize: "1rem",
    fontWeight: "bold",
    border: "2px solid #fff",
    borderRadius: "30px",
    background: "transparent",
    color: "#fff",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

export default Intro;

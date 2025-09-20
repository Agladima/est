import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const Landing = ({ onFinish }) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>
        Ready to be part of the <br />
        very first <span style={styles.highlight}>NEXT</span> seminar?
      </h1>
      <button style={styles.startBtn} onClick={onFinish}>
        Start Here <FaLongArrowAltRight />
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#000",
    color: "#fff",
    textAlign: "center",
    padding: "5vw 2vw", // relative padding for responsiveness
    boxSizing: "border-box",
  },
  heading: {
    fontSize: "clamp(1.2rem, 5vw, 2.5rem)", // scales with screen
    fontWeight: "bold",
    marginBottom: "5vh", // spacing adapts to screen height
    lineHeight: "1.4",
  },
  highlight: {
    color: "#fff",
  },
  startBtn: {
    display: "flex", // align text + icon
    alignItems: "center", // vertically center them
    gap: "0.5rem", // space between text and arrow
    justifyContent: "center",

    padding: "0.7rem 1.5rem",
    fontSize: "clamp(0.8rem, 2.2vw, 1rem)",
    fontWeight: "bold",
    backgroundColor: "#fff",
    color: "#000",
    border: "2px solid #fff",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

// Add hover styles + media queries
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    button:hover {
      background-color: #000 !important;
      color: #fff !important;
      border: 2px solid #fff !important;
    }

    /* Small screen optimization */
    @media (max-width: 480px) {
      h1 {
        font-size: 1.3rem !important;
        line-height: 1.3 !important;
      }
      button {
        width: 80%;
        max-width: 220px;
      }
    }
  `;
  document.head.appendChild(style);
}

export default Landing;

import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import NEXTArrowRight from "./ArrowRight";

const Landing = ({ onFinish }) => {
  return (
    <div className="landing-container">
        <img 
          src="/logos/seminar-logo.png" 
          alt="NEXT Seminar Logo" 
          className="landing-logo"
        />
     
        <h1 className="landing-heading">
          Ready to be part of the
          very first <span className="landing-highlight">NEXT</span> seminar?
        </h1>

        <button className="landing-start-btn" onClick={onFinish}>
          Start Here <NEXTArrowRight />
        </button>

    </div>
  );
};

export default Landing;

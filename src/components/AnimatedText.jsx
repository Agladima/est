import React, { useEffect, useState } from "react";

const AnimatedText = ({ words, onComplete, stay = 1000, fade = 300 }) => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (index >= words.length) {
      // all done → call parent
      onComplete();
      return;
    }

    const showTimeout = setTimeout(() => {
      setVisible(false);
      // after fade out, move to next word
      setTimeout(() => {
        setIndex((prev) => prev + 1);
        setVisible(true);
      }, fade); // fade duration
    }, stay); // how long each word stays

    return () => clearTimeout(showTimeout);
  }, [index, words.length, onComplete, stay, fade]);

  if (index >= words.length) return null;

  return (
    <h2
      style={{
        fontSize: "2rem",
        opacity: visible ? 1 : 0,
        transition: `opacity ${fade}ms ease-in-out`,
      }}
    >
      {words[index]}
    </h2>
  );
};

export default AnimatedText;

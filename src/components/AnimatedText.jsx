import React, { useEffect, useState } from "react";

const AnimatedText = ({ words, onComplete, stay = 1000, fade = 300 }) => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (index >= words.length) {
      // all done → call parent
      onComplete();
      setIndex(0);
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
    <h2 className={`animated-text ${visible ? 'visible' : 'hidden'}`}>
      {words[index]}
    </h2>
  );
};

export default AnimatedText;


import { useState, useEffect } from "react";

const CHARS = "!<>-_\\\\/[]{}—=+*^?#________";

interface ScrambleTextProps {
  text: string;
  className?: string;
}

export function ScrambleText({ text, className = "" }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    let frame = 0;
    const maxFrames = 20;
    const originalLength = text.length;

    const interval = setInterval(() => {
      let scrambled = "";
      for (let i = 0; i < originalLength; i++) {
        if (i < (frame / maxFrames) * originalLength) {
          scrambled += text[i];
        } else {
          scrambled += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setDisplayText(scrambled);
      frame++;

      if (frame > maxFrames) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, 30);
  };

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  return (
    <span onMouseEnter={scramble} className={`inline-block ${className}`}>
      {displayText}
    </span>
  );
}

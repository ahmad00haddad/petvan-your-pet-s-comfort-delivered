import { useState, useEffect, useRef } from "react";

const CHARS = "!<>-_\\/[]{}=+*^?#";

interface ScrambleTextProps {
  text: string;
  className?: string;
}

export function ScrambleText({ text, className = "" }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isScrambling = useRef(false);

  const scramble = () => {
    if (isScrambling.current) return;
    isScrambling.current = true;

    let frame = 0;
    const maxFrames = 20;
    const originalLength = text.length;

    intervalRef.current = setInterval(() => {
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
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        isScrambling.current = false;
      }
    }, 30);
  };

  useEffect(() => {
    setDisplayText(text);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  return (
    <span onMouseEnter={scramble} className={`inline-block ${className}`}>
      {displayText}
    </span>
  );
}

"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

const SlotChar = ({ targetChar, delay, index }: { targetChar: string; delay: number; index: number }) => {
  // Start with the target char to ensure if hydration fails/stalls we see the correct text.
  // The effect will immediately kick in to shuffle it.
  const [displayChar, setDisplayChar] = useState(targetChar); 

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    // Delay the START of shuffling slightly per index to create a "wave" of chaos? 
    // Or just start immediately.
    // User complaint: "stalled at dkry". "dkry" was the computed start state.
    // By starting at targetChar, we avoid weird words.
    
    // Start shuffling immediately
    interval = setInterval(() => {
      setDisplayChar(CHARS[Math.floor(Math.random() * CHARS.length)]);
    }, 50);

    // Stop shuffling and lock to target
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setDisplayChar(targetChar);
    }, 1000 + delay * 200);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [targetChar, delay]);

  return (
    <motion.span
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="inline-block"
      style={{ minWidth: "0.5em" }} // Adjusted minWidth for cursive fonts which might be tighter
    >
      {displayChar}
    </motion.span>
  );
};

export const SlotText = ({ text, className = "" }: { text: string; className?: string }) => {
  return (
    <div className={`flex font-bold tracking-widest uppercase ${className}`}>
      {text.split("").map((char, i) => (
        <SlotChar key={i} targetChar={char} delay={i} index={i} />
      ))}
    </div>
  );
};
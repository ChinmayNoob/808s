import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Lyric {
  time: number;
  text: string;
}

interface LyricsDisplayProps {
  lyrics: Lyric[];
  currentTime: number;
}

export function LyricsDisplay({ lyrics, currentTime }: LyricsDisplayProps) {
  const [activeLyricIndex, setActiveLyricIndex] = useState(0);

  const springConfig = {
    type: "spring" as const,
    stiffness: 100,
    damping: 20,
    mass: 0.8,
  };

  useEffect(() => {
    const newIndex = lyrics.findIndex((lyric, index) => {
      const nextLyric = lyrics[index + 1];
      return (
        lyric.time <= currentTime &&
        (!nextLyric || nextLyric.time > currentTime)
      );
    });

    if (newIndex !== -1 && newIndex !== activeLyricIndex) {
      setActiveLyricIndex(newIndex);
    }
  }, [currentTime, lyrics, activeLyricIndex]);

  return (
    <div className="h-48 overflow-hidden w-full relative">
      <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

      <AnimatePresence mode="popLayout">
        {lyrics.map((lyric, index) => {
          const isActive = index === activeLyricIndex;
          const distance = Math.abs(index - activeLyricIndex);
          const isVisible = distance <= 3;

          if (!isVisible) return null;

          return (
            <motion.div
              key={`${index}-${lyric.time}`}
              layout
              initial={{
                opacity: 0,
                y: 30,
                scale: 0.95,
                filter: "blur(2px)",
              }}
              animate={{
                opacity: isActive ? 1 : Math.max(0.2, 1 - distance * 0.25),
                y: (index - activeLyricIndex) * 44,
                scale: isActive ? 1 : 1 - distance * 0.02,
                filter: isActive ? "blur(0px)" : `blur(${distance * 0.8}px)`,
              }}
              exit={{
                opacity: 0,
                y: -30,
                scale: 0.9,
                filter: "blur(3px)",
                transition: { ...springConfig, duration: 0.3 },
              }}
              transition={springConfig}
              className={`
                absolute left-0 right-0 text-center px-4 py-1 leading-relaxed
                ${isActive ? "text-primary font-semibold text-base" : "text-muted-foreground font-normal text-sm"}
              `}
              style={{
                top: "50%",
                transform: "translateY(-50%)",
                textShadow: isActive
                  ? "0 0 20px hsl(var(--primary) / 0.3)"
                  : "none",
                zIndex: isActive ? 2 : 1,
              }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  ...springConfig,
                  delay: isActive ? 0.1 : 0,
                }}
              >
                {lyric.text || "..."}
              </motion.span>

              {isActive && (
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 0.06 }}
                  exit={{ scaleX: 0, opacity: 0 }}
                  transition={{ ...springConfig, stiffness: 80 }}
                  className="absolute inset-0 bg-primary rounded-lg -z-10"
                />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

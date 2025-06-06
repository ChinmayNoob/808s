"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
    Volume2,
    VolumeX,
    SkipBack,
    SkipForward,
    Play,
    Pause,
    Repeat,
    Shuffle,
    Music,
    Sun,
    Moon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useMusicPlayerStore } from "@/store/use-music";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { LyricsDisplay } from "./lyrics";
import { FaSpotify } from "react-icons/fa6";
import Link from "next/link";

export default function MusicPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const { theme, setTheme } = useTheme();
    const {
        currentTrack,
        isPlaying,
        volume,
        shuffle,
        repeat,
        playlist,
        setTrack,
        setIsPlaying,
        setVolume,
        toggleShuffle,
        toggleRepeat,
        nextTrack,
        prevTrack,
    } = useMusicPlayerStore();
    const [trackDirection, setTrackDirection] = useState("");
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [showLyrics, setShowLyrics] = useState(false);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const progress =
                (audioRef.current.currentTime / audioRef.current.duration) * 100;
            setProgress(progress);
        }
    };

    const handleProgressChange = (newProgress: number[]) => {
        if (audioRef.current) {
            const newTime = (newProgress[0] / 100) * audioRef.current.duration;
            audioRef.current.currentTime = newTime;
            setProgress(newProgress[0]);
        }
    };

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentTrack]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        if (audioRef.current) {
            const updateTime = () => setCurrentTime(audioRef.current!.currentTime);
            audioRef.current.addEventListener("timeupdate", updateTime);
            return () => {
                audioRef?.current?.removeEventListener("timeupdate", updateTime);
            };
        }
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-background border rounded-lg shadow-lg">
            <div className="flex justify-end mb-4">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleTheme}
                >
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`cover-${currentTrack?.id}-${trackDirection}`}
                        className="w-64 h-64 rounded-lg overflow-hidden"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{
                            opacity: 0,
                            x: trackDirection === "next" ? -30 : 30,
                            scale: 0.8,
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="w-full h-full relative rounded-lg bg-muted flex items-center justify-center">
                            {currentTrack?.cover ? (
                                <Image
                                    src={currentTrack.cover}
                                    alt={currentTrack.title || "Album cover"}
                                    className="object-cover rounded-lg"
                                    fill
                                />
                            ) : (
                                <Image
                                    src="/images/music-notes.png"
                                    alt="Album cover"
                                    className="object-cover rounded-lg"
                                    fill
                                />
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
                <div className="flex-1 w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentTrack?.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="text-center md:text-left"
                        >
                            <h2 className="text-2xl font-bold mb-2 flex items-center justify-center md:justify-start gap-2">
                                {currentTrack?.title || "No track selected"}
                                {currentTrack?.hasLyrics && (
                                    <Button
                                        onClick={() => setShowLyrics(!showLyrics)}
                                        variant={"ghost"}
                                        size={"icon"}
                                    >
                                        <Music
                                            className={
                                                showLyrics ? "text-primary" : "text-muted-foreground"
                                            }
                                        />
                                    </Button>
                                )}
                            </h2>
                            <p className="text-muted-foreground mb-1">
                                {currentTrack?.artist || "Unknown artist"}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {currentTrack?.album || "Unknown album"}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                    {showLyrics && currentTrack?.hasLyrics ? (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`lyrics-${currentTrack?.id}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <LyricsDisplay
                                    lyrics={currentTrack.lyrics}
                                    currentTime={currentTime}
                                />
                            </motion.div>
                        </AnimatePresence>
                    ) : (
                        <div className="h-48">
                            <div className="mt-4">
                                <Slider
                                    value={[progress]}
                                    max={100}
                                    step={0.1}
                                    onValueChange={handleProgressChange}
                                    className="w-full"
                                />
                                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                                    <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
                                    <span>{formatTime(audioRef.current?.duration || 0)}</span>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center gap-4">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setVolume(volume === 0 ? 0.5 : 0)}
                                >
                                    {volume === 0 ? <VolumeX /> : <Volume2 />}
                                </Button>
                                <Slider
                                    value={[volume * 100]}
                                    max={100}
                                    step={1}
                                    onValueChange={(newVolume) => setVolume(newVolume[0] / 100)}
                                    className="w-full max-w-xs"
                                />
                            </div>
                            <div className="flex items-center justify-center md:justify-start gap-4 mt-4">
                                <Button variant="ghost" size="icon" onClick={toggleShuffle}>
                                    <Shuffle
                                        className={
                                            shuffle ? "text-primary" : "text-muted-foreground"
                                        }
                                    />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                        setTrackDirection("previous");
                                        if (!currentTrack && !isPlaying) {
                                            setIsPlaying(true);
                                            setTrack(playlist[playlist.length - 1]);
                                            return;
                                        }
                                        prevTrack();
                                    }}
                                >
                                    <SkipBack />
                                </Button>
                                <Button
                                    variant="default"
                                    size="icon"
                                    onClick={() => {
                                        if (!currentTrack && !isPlaying) {
                                            setTrackDirection("next");
                                            setIsPlaying(true);
                                            setTrack(playlist[0]);
                                            return;
                                        }
                                        setIsPlaying(!isPlaying);
                                    }}
                                >
                                    {isPlaying ? <Pause /> : <Play />}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                        setTrackDirection("next");
                                        if (!currentTrack && !isPlaying) {
                                            setIsPlaying(true);
                                            setTrack(playlist[0]);
                                            return;
                                        }
                                        nextTrack();
                                    }}
                                >
                                    <SkipForward />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={toggleRepeat}>
                                    <Repeat
                                        className={
                                            repeat ? "text-primary" : "text-muted-foreground"
                                        }
                                    />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-6">
                <div className="flex items-center justify-between">

                    <h3 className="text-lg font-bold mb-2 font-courier-prime">808s by Chinmayyy </h3>
                    <Link href="https://open.spotify.com/user/st3m6mykt196y2znl2zgp15xr?si=15f4f39e0a8041f2" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                        <Button variant="ghost" size="icon" className="cursor-pointer">
                            <FaSpotify />
                        </Button>
                    </Link>
                </div>
                <ul className="space-y-2">
                    {playlist.map((track) => (
                        <motion.li
                            key={track.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Button
                                variant="ghost"
                                className={cn(
                                    "w-full justify-start h-auto p-3",
                                    currentTrack?.id === track.id ? "bg-accent" : ""
                                )}
                                onClick={() => {
                                    setTrack(track);
                                    setIsPlaying(true);
                                }}
                            >
                                <div className="size-12 rounded mr-3 relative bg-muted flex items-center justify-center overflow-hidden">
                                    {track.cover ? (
                                        <Image
                                            src={track.cover}
                                            alt={track.title}
                                            className="object-cover"
                                            fill
                                        />
                                    ) : (
                                        <Music className="w-6 h-6 text-muted-foreground" />
                                    )}
                                </div>
                                <div className="text-left flex-1">
                                    <p className="font-medium">{track.title}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {track.artist}
                                    </p>
                                    {track.hasLyrics && (
                                        <p className="text-xs text-primary">Lyrics available</p>
                                    )}
                                </div>
                            </Button>
                        </motion.li>
                    ))}
                </ul>
            </div>
            <audio
                ref={audioRef}
                src={currentTrack?.audio}
                onEnded={nextTrack}
                onTimeUpdate={handleTimeUpdate}
            />
        </div>
    );
}

function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
} 
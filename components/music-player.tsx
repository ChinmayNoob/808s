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
    X,
} from "lucide-react";
import { useMusicPlayerStore } from "@/store/use-music";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { LyricsDisplay } from "./lyrics";
import { FaSpotify } from "react-icons/fa6";
import Link from "next/link";

export default function MusicPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
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

    const controlsBlock = (
        <>
            <div className="mt-4">
                <Slider
                    value={[progress]}
                    max={100}
                    step={0.1}
                    onValueChange={handleProgressChange}
                    className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground font-mono mt-1">
                    <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
                    <span>{formatTime(audioRef.current?.duration || 0)}</span>
                </div>
            </div>

            <div className="flex items-center justify-center gap-2 mt-3">
                <Button variant="ghost" size="icon" onClick={toggleShuffle}>
                    <Shuffle
                        className={shuffle ? "text-primary" : "text-muted-foreground"}
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
                    className="size-11 rounded-full"
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
                    {isPlaying ? <Pause className="size-5" /> : <Play className="size-5" />}
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
                        className={repeat ? "text-primary" : "text-muted-foreground"}
                    />
                </Button>
            </div>
        </>
    );

    return (
        <div className="w-full mx-auto p-5 bg-background border border-border/50 rounded-xl shadow-lg dark:shadow-2xl">
            <div className="h-[25rem] overflow-hidden relative">
            <AnimatePresence mode="wait">
                {showLyrics && currentTrack?.hasLyrics ? (
                    <motion.div
                        key="lyrics-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col justify-between h-[25rem] absolute inset-0"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="size-10 rounded-lg relative bg-muted shrink-0 overflow-hidden">
                                    {currentTrack.cover && (
                                        <Image
                                            src={currentTrack.cover}
                                            alt={currentTrack.title}
                                            className="object-cover"
                                            fill
                                        />
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold font-courier-prime truncate">
                                        {currentTrack.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground truncate">
                                        {currentTrack.artist}
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setShowLyrics(false)}
                            >
                                <X className="size-4" />
                            </Button>
                        </div>

                        <div className="flex-1 flex items-center">
                            <LyricsDisplay
                                lyrics={currentTrack.lyrics}
                                currentTime={currentTime}
                            />
                        </div>

                        <div>{controlsBlock}</div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="player-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col justify-center h-[25rem] absolute inset-0"
                    >
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`cover-${currentTrack?.id}-${trackDirection}`}
                                    className="w-56 h-56 rounded-xl overflow-hidden shadow-xl ring-1 ring-border/50"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{
                                        opacity: 0,
                                        x: trackDirection === "next" ? -30 : 30,
                                        scale: 0.8,
                                    }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="w-full h-full relative rounded-xl bg-muted flex items-center justify-center">
                                        {currentTrack?.cover ? (
                                            <Image
                                                src={currentTrack.cover}
                                                alt={currentTrack.title || "Album cover"}
                                                className="object-cover rounded-xl"
                                                fill
                                            />
                                        ) : (
                                            <Image
                                                src="/images/music-notes.png"
                                                alt="Album cover"
                                                className="object-cover rounded-xl"
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
                                        <h2 className="text-2xl font-bold font-courier-prime mb-1 flex items-center justify-center md:justify-start gap-2">
                                            {currentTrack?.title || "No track selected"}
                                            {currentTrack?.hasLyrics && (
                                                <Button
                                                    onClick={() => setShowLyrics(true)}
                                                    variant="ghost"
                                                    size="icon"
                                                >
                                                    <Music className="text-muted-foreground" />
                                                </Button>
                                            )}
                                        </h2>
                                        <p className="text-base text-muted-foreground mb-0.5">
                                            {currentTrack?.artist || "Unknown artist"}
                                        </p>
                                        <p className="text-sm text-muted-foreground/70">
                                            {currentTrack?.album || "Unknown album"}
                                        </p>
                                    </motion.div>
                                </AnimatePresence>

                                {controlsBlock}

                                <div className="mt-3 flex items-center gap-3">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="shrink-0"
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
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            </div>

            <div className="mt-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold mb-1 font-courier-prime tracking-wide">808s by Chinmayyy</h3>
                    <Link href="https://open.spotify.com/user/st3m6mykt196y2znl2zgp15xr?si=15f4f39e0a8041f2" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                        <Button variant="ghost" size="icon" className="cursor-pointer">
                            <FaSpotify />
                        </Button>
                    </Link>
                </div>
                <ul className="space-y-1">
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
                                    "w-full justify-start h-auto py-2 px-3 rounded-lg transition-colors",
                                    currentTrack?.id === track.id ? "bg-accent" : ""
                                )}
                                onClick={() => {
                                    setTrack(track);
                                    setIsPlaying(true);
                                }}
                            >
                                <div className="size-10 rounded-lg mr-3 relative bg-muted flex items-center justify-center overflow-hidden shrink-0">
                                    {track.cover ? (
                                        <Image
                                            src={track.cover}
                                            alt={track.title}
                                            className="object-cover"
                                            fill
                                        />
                                    ) : (
                                        <Music className="w-5 h-5 text-muted-foreground" />
                                    )}
                                </div>
                                <div className="text-left flex-1 min-w-0">
                                    <p className="font-medium truncate">{track.title}</p>
                                    <p className="text-sm text-muted-foreground truncate">
                                        {track.artist}
                                    </p>
                                </div>
                                {currentTrack?.id === track.id && isPlaying && (
                                    <div className="flex items-end gap-0.5 h-4 ml-2 shrink-0">
                                        <span className="w-0.5 bg-primary rounded-full animate-pulse" style={{ height: "60%", animationDelay: "0ms" }} />
                                        <span className="w-0.5 bg-primary rounded-full animate-pulse" style={{ height: "100%", animationDelay: "150ms" }} />
                                        <span className="w-0.5 bg-primary rounded-full animate-pulse" style={{ height: "40%", animationDelay: "300ms" }} />
                                    </div>
                                )}
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

import { create } from "zustand";

interface Lyric {
    time: number;
    text: string;
}

interface Track {
    id: string;
    title: string;
    artist: string;
    album: string;
    cover: string;
    audio: string;
    lyrics: Lyric[];
    hasLyrics: boolean;
}

interface MusicPlayerStore {
    currentTrack: Track | null;
    isPlaying: boolean;
    volume: number;
    shuffle: boolean;
    repeat: boolean;
    playlist: Track[];
    setTrack: (track: Track) => void;
    setIsPlaying: (isPlaying: boolean) => void;
    setVolume: (volume: number) => void;
    toggleShuffle: () => void;
    toggleRepeat: () => void;
    nextTrack: () => void;
    prevTrack: () => void;
}

export const useMusicPlayerStore = create<MusicPlayerStore>((set, get) => ({
    currentTrack: null,
    isPlaying: false,
    volume: 0.5,
    shuffle: false,
    repeat: false,
    playlist: [
        {
            id: "track-1",
            title: "Ivy",
            artist: "Frank Ocean",
            album: "Blonde",
            cover: "/images/ivy.png",
            audio: "/sounds/Ivy.mp3",
            hasLyrics: true,
            lyrics: [
                { time: 0.70, text: "I thought that I was dreamin' when you said you love me" },
                { time: 7.56, text: "The start of nothin'" },
                { time: 9.12, text: "I had no chance to prepare, I couldn't see you comin'" },
                { time: 15.77, text: "The start of nothin'" },
                { time: 17.13, text: "Ooh, I could hate you now" },
                { time: 21.18, text: "It's quite alright to hate me now" },
                { time: 25.51, text: "When we both know that deep down" },
                { time: 27.54, text: "The feeling still deep down is good" },
                { time: 33.72, text: "If I could see through walls" },
                { time: 35.61, text: "I could see you're faking" },
                { time: 37.96, text: "If you could see my thoughts" },
                { time: 39.67, text: "You would see our faces" },
                { time: 41.45, text: "Safe in my rental like an armored truck back then" },
                { time: 46.21, text: "We didn't give a fuck back then" },
                { time: 48.87, text: "I ain't a kid no more" },
                { time: 52.22, text: "We'll never be those kids again" },
                { time: 57.09, text: "We'd drive to Syd's" },
                { time: 58.54, text: "Had the X6 back then" },
                { time: 62.22, text: "Back then" },
                { time: 64.58, text: "No matter what I did" },
                { time: 66.59, text: "My waves wouldn't dip back then" },
                { time: 71.10, text: "Everything sucked back then" },
                { time: 73.51, text: "We were friends" },
                { time: 74.93, text: "I thought that I was dreamin' when you said you loved me" },
                { time: 81.43, text: "The start of nothin'" },
                { time: 83.20, text: "I had no chance to prepare, I couldn't see you comin'" },
                { time: 89.99, text: "The start of nothin'" },
                { time: 91.26, text: "Ooh, I could hate you now" },
                { time: 95.26, text: "It's quite alright to hate me now" },
                { time: 99.74, text: "But we both know that deep down" },
                { time: 101.61, text: "The feeling still deep down is good" },
                { time: 108.77, text: "In the halls of your hotel" },
                { time: 112.31, text: "Arm around my shoulder, so I could tell" },
                { time: 115.72, text: "How much I meant to you, meant it sincere back then" },
                { time: 120.54, text: "We had time to kill back then" },
                { time: 122.94, text: "You ain't a kid no more" },
                { time: 126.61, text: "We'll never be those kids again" },
                { time: 131.16, text: "It's not the same, ivory's illegal" },
                { time: 135.08, text: "Don't you remember?" },
                { time: 139.13, text: "I broke your heart last week" },
                { time: 141.56, text: "You'll probably feel better by the weekend" },
                { time: 145.15, text: "Still remember, had you going crazy" },
                { time: 148.09, text: "Screamin' my name" },
                { time: 149.82, text: "The feeling deep down is good" },
                { time: 157.17, text: "I thought that I was dreamin' when you said you loved me" },
                { time: 163.87, text: "The start of nothin'" },
                { time: 165.75, text: "I had no chance to prepare, couldn't see you comin'" },
                { time: 171.26, text: "And we started from nothin'" },
                { time: 173.70, text: "Ooh, I could hate you now" },
                { time: 177.77, text: "It's alright to hate me now" },
                { time: 182.33, text: "We both know that deep down" },
                { time: 184.20, text: "The feeling still deep down is good" },
                { time: 190.17, text: "All the things I didn't mean to say" },
                { time: 193.05, text: "I didn't mean to do" },
                { time: 198.32, text: "There were things you didn't need to say" },
                { time: 201.00, text: "Did you mean to? Mean to?" },
                { time: 205.55, text: "I've been dreamin' of you, dreamin' of you" },
                { time: 213.71, text: "I've been dreamin' of you, dreamin' of you" },
                { time: 221.87, text: "I've been dreamin', dreamin'" },
            ],
        },
        {
            id: "track-2",
            title: "Nights",
            artist: "Frank Ocean",
            album: "Blonde",
            cover: "/images/nights.png",
            audio: "/sounds/Nights.mp3",
            hasLyrics: true,
            lyrics: [
                { time: 3.72, text: "'Round your city, 'round the clock" },
                { time: 6.65, text: "Everybody needs you" },
                { time: 9.62, text: "No, you can't make everybody equal" },
                { time: 15.66, text: "Although you got beaucoup family" },
                { time: 18.50, text: "You don't even got nobody bein' honest with you" },
                { time: 23.19, text: "Breathe 'til I evaporated" },
                { time: 26.25, text: "My whole body see-through" },
                { time: 27.78, text: "Transportation, handmade (G)" },
                { time: 30.69, text: "And I know it better than most people" },
                { time: 33.75, text: "I don't trust 'em anyways" },
                { time: 36.55, text: "You can't break the law with them" },
                { time: 39.34, text: "Get some gushy, have a calm night" },
                { time: 41.14, text: "Shooters killin' left and right" },
                { time: 44.24, text: "Workin' through your worst night" },
                { time: 47.28, text: "If I get my money right, you know I won't need you" },
                { time: 50.34, text: "And I tell you, (Bitch)" },
                { time: 52.91, text: "I hope the sack is full up" },
                { time: 56.17, text: "I'm fuckin', no, I'm fucked up" },
                { time: 59.12, text: "Spend it when I get that, I ain't tryna keep you" },
                { time: 62.32, text: "Can't keep up a conversation, can't nobody reach you" },
                { time: 65.34, text: "Why your eyes well up?" },
                { time: 67.86, text: "Did you call me from a séance?" },
                { time: 69.57, text: "You are from my past life" },
                { time: 71.29, text: "Hope you're doin' well, bruh" },
                { time: 74.28, text: "I been out here head first, always like the head first" },
                { time: 77.02, text: "Signal comin' in and out" },
                { time: 80.22, text: "Hope you're doin' well, bruh" },
                { time: 83.28, text: "Everybody needs you" },
                { time: 86.18, text: "Everybody needs you" },
                { time: 88.30, text: "Ooh, nani, nani" },
                { time: 92.10, text: "This feel like a Quaalude" },
                { time: 94.36, text: "No sleep in my body" },
                { time: 96.93, text: "Ain't no bitch in my body, ah" },
                { time: 100.46, text: "New beginnin's, ahh" },
                { time: 104.12, text: "New beginnin's, wake up, ahh" },
                { time: 106.25, text: "The sun's goin' down" },
                { time: 108.65, text: "Time to start your day, bruh" },
                { time: 111.68, text: "Can't keep bein' laid off" },
                { time: 113.77, text: "You know you need the money if you gon' survive" },
                { time: 116.86, text: "The every night shit, the everyday shit" },
                { time: 119.87, text: "Droppin' baby off at home before my night shift" },
                { time: 122.96, text: "You know I can't hear none of that spend the night shit" },
                { time: 125.82, text: "That kumbaya shit" },
                { time: 127.31, text: "Wanna see nirvana, but don't want to die yet" },
                { time: 130.45, text: "Wanna feel that na-na though, could you come by?" },
                { time: 132.74, text: "Fuck with me after my shift" },
                { time: 135.08, text: "Know them boys wanna see me broke down and shit" },
                { time: 138.15, text: "Bummed out and shit, stressed out and shit, that's everyday shit" },
                { time: 142.39, text: "Shut the fuck up, I don't want your conversation" },
                { time: 145.42, text: "Rollin' marijuana, that's a cheap vacation" },
                { time: 148.38, text: "My everyday shit, every night shit, my everyday shit" },
                { time: 153.13, text: "(Every night shit)" },
                { time: 155.18, text: "(Night shit, night shit, night shit)" },
                { time: 160.85, text: "All my night" },
                { time: 162.53, text: "Been ready for you all my night" },
                { time: 165.57, text: "Been waitin' on you all my night" },
                { time: 167.87, text: "I'll buzz you in, just let me know when you outside" },
                { time: 172.45, text: "All my night" },
                { time: 174.86, text: "You been missin' all my night" },
                { time: 177.76, text: "Still got some good nights memorized" },
                { time: 181.35, text: "And the look back's gettin' me right" },
                { time: 221.06, text: "Every night fucks every day up" },
                { time: 223.72, text: "Every day patches the night up" },
                { time: 225.59, text: "On God you should match it, it's that KO" },
                { time: 228.13, text: "No white lighters 'til I fuck my 28th up" },
                { time: 230.95, text: "1998, my family had that Acura" },
                { time: 233.94, text: "Oh, the Legend" },
                { time: 236.18, text: "Kept at least six discs in the changer" },
                { time: 238.93, text: "Back when Boswell and Percy had it active" },
                { time: 241.72, text: "Couple bishops in the city buildin' mansions" },
                { time: 244.34, text: "All the reverends" },
                { time: 246.80, text: "Preachin' self-made millionaire status" },
                { time: 249.48, text: "When we could only eat at Shoney's on occasion" },
                { time: 252.37, text: "After 'trina hit I had to transfer campus" },
                { time: 254.92, text: "Your apartment, out in Houston's where I waited" },
                { time: 257.64, text: "Stayin' with you when I didn't have a address" },
                { time: 260.32, text: "Fuckin' on you when I didn't own a mattress" },
                { time: 263.01, text: "Workin' on a way to make it outta Texas" },
                { time: 265.39, text: "Every night" },
                { time: 267.11, text: "Droppin' baby off at home before my night shift, yah, yah" },
                { time: 272.53, text: "You know I can't hear none of that spend the night shit" },
                { time: 275.28, text: "That kumbaya shit" },
                { time: 276.65, text: "Wanna see nirvana, but don't want to die yet" },
                { time: 279.42, text: "Wanna feel that na-na though, could you come by?" },
                { time: 281.42, text: "Fuck with me after my shift" },
                { time: 283.08, text: "You know them boys wanna see me broke down" },
                { time: 285.49, text: "See me bummed out, stressed out, that's just everyday shit" },
                { time: 289.90, text: "Shut the fuck up, I don't want your conversation" },
                { time: 292.83, text: "Rollin' marijuana, that's a cheap vacation" },
                { time: 295.16, text: "My everyday shit, my everyday shit" },
                { time: 299.06, text: "My everyday shit, my everyday shit" },
                { time: 301.79, text: "My everyday shit, my everyday shit" },
                { time: 304.32, text: "My every night shit" },
            ],
        },
        {
            id: "track-3",
            title: "Lovers Rock",
            artist: "TV Girl",
            album: "French Exit",
            cover: "/images/lovers-rock.png",
            audio: "/sounds/Lovers-Rock.mp3",
            hasLyrics: true,
            lyrics: [
                { time: 10.68, text: "Are you sick of me?" },
                { time: 15.26, text: "Would you like to be?" },
                { time: 17.83, text: "I'm trying to tell you something" },
                { time: 21.53, text: "Something that I already said" },
                { time: 28.64, text: "You like a pretty boy" },
                { time: 33.57, text: "With a pretty voice" },
                { time: 36.15, text: "Who is trying to sell you something" },
                { time: 39.79, text: "Something that you already have" },
                { time: 45.78, text: "But if you're too drunk to drive, and the music is right" },
                { time: 51.03, text: "She might let you stay, but just for the night" },
                { time: 55.06, text: "And if she grabs for your hand, and drags you along" },
                { time: 59.90, text: "She might want a kiss before the end of this song" },
                { time: 64.27, text: "Because love can burn like a cigarette" },
                { time: 72.78, text: "And leave you with nothing" },
                { time: 77.31, text: "And leave you with nothing" },
                { time: 83.77, text: "While the others talked" },
                { time: 87.20, text: "We were listenin' to Lover's Rock" },
                { time: 91.65, text: "In her bedroom" },
                { time: 96.44, text: "In her bedroom" },
                { time: 101.85, text: "And if you start to kiss" },
                { time: 106.67, text: "And the record skips" },
                { time: 110.17, text: "Flip it over" },
                { time: 113.74, text: "And sit a little closer" },
                { time: 118.97, text: "But if you're too drunk to drive, and the music is right" },
                { time: 124.07, text: "She might let you stay, but just for the night" },
                { time: 128.08, text: "And if she grabs for your hand, and drags you along" },
                { time: 133.23, text: "She might want a kiss before the end of this song" },
                { time: 137.33, text: "Because love can burn like a cigarette" },
                { time: 145.88, text: "And leave you with nothing" },
                { time: 150.36, text: "And leave you with nothing" },
                { time: 152.82, text: "Now, how many men have you kissed?" },
                { time: 155.17, text: "Very few" },
                { time: 156.33, text: "But you offered me a kiss, why?" },
                { time: 160.06, text: "Such a foolish reason, I'm afraid" },
                { time: 163.10, text: "I just wanted to kiss you" },
                { time: 166.17, text: "Do-do, do-do-do-do-do" },
                { time: 170.53, text: "Do-do, do-do-do-do-do" },
                { time: 174.86, text: "Do-do, do-do-do-do-do" },
                { time: 179.56, text: "Do-do, do-do-do-do-do" },
                { time: 182.81, text: "Because love can burn like a cigarette (do-do, do-do-do-do-do)" },
                { time: 191.59, text: "And leave you alone with nothing (do-do, do-do-do-do-do)" },
                { time: 196.13, text: "And leave you alone with nothing (do)" },
            ],
        },
    ],
    setTrack: (track) => set({ currentTrack: track }),
    setIsPlaying: (isPlaying) => set({ isPlaying }),
    setVolume: (volume) => set({ volume }),
    toggleRepeat: () => set((state) => ({ repeat: !state.repeat })),
    toggleShuffle: () => set((state) => ({ shuffle: !state.shuffle })),
    nextTrack: () => {
        const { currentTrack, playlist, shuffle, repeat } = get();
        if (!currentTrack) return;

        const currentIndex = playlist.findIndex((p) => p.id === currentTrack.id);
        let nextIndex;
        if (shuffle) {
            nextIndex = Math.floor(Math.random() * playlist.length);
        } else {
            nextIndex = (currentIndex + 1) % playlist.length;
        }

        if (nextIndex === 0 && !repeat) {
            set({ currentTrack: playlist[0], isPlaying: false });
        } else {
            set({ currentTrack: playlist[nextIndex] });
        }
    },
    prevTrack: () => {
        const { currentTrack, playlist } = get();
        if (!currentTrack) return;

        const currentIndex = playlist.findIndex((p) => p.id === currentTrack.id);

        const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;

        set({ currentTrack: playlist[prevIndex] });
    },
}));

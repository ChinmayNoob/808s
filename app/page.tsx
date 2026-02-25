import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MusicPlayer from "@/components/music-player";


export default function Home() {
  return (
    <div className="h-screen overflow-y-auto overflow-x-hidden hide-scrollbar flex flex-col items-center justify-center px-4 py-6 relative">

      <span
        aria-hidden
        className="fixed bottom-0 left-1/2 -translate-x-1/2 translate-y-[35%] select-none pointer-events-none font-courier-prime font-bold text-[clamp(18rem,50vw,40rem)] leading-none tracking-tighter text-orange-500/[0.07] whitespace-nowrap z-0"
      >
        808s
      </span>
      <div className="w-full max-w-3xl relative z-10">
        <Header />
        <MusicPlayer />
        <Footer />
      </div>
    </div>
  );
}
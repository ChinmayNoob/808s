import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MusicPlayer from "@/components/music-player";


export default function Home() {
  return (
    <div className="px-4 py-6">
      <Header />
      <MusicPlayer />
      <Footer />
    </div>
  );
}
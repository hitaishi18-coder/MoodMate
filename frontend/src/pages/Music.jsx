import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

import VideoGrid from "../components/VideoGrid";
import VideoPlayerModal from "../components/VideoPlayerModal";

import {
  searchYouTube,
  getPopularMusicVideos
} from "../api/youtubeApi";
import Footer from "@/components/Footer";

// Predefined mood categories
const moods = [
  { name: "☕ Chill Lofi", query: "lofi hip hop radio" },
  { name: "💪 Workout", query: "gym workout motivation music" },
  { name: "🧘 Meditation", query: "deep meditation music" },
  { name: "🕺 Party", query: "pop hits 2024 party" },
  { name: "🧠 Focus", query: "deep focus music for studying" }
];

export default function Music() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 1. Load trending music initially
  useEffect(() => {
    async function loadMusic() {
      try {
        setLoading(true);
        const data = await getPopularMusicVideos();
        setVideos(data.items);
      } catch {
        setError("Failed to load music");
      } finally {
        setLoading(false);
      }
    }
    loadMusic();
  }, []);

  // 2. Search based on Mood Click
  async function handleMoodSearch(query) {
    try {
      setLoading(true);
      setVideos([]); // Clear current to show loading effect
      const data = await searchYouTube(query);
      setVideos(data.items);
    } catch {
      setError("Failed to load music");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <Navbar />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-4 pt-32 pb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-center text-zinc-900 dark:text-zinc-100 mb-8">
          🎧 Vibe Station
        </h1>

        {/* Mood Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {moods.map((mood) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={mood.name}
              onClick={() => handleMoodSearch(mood.query)}
              className="
                px-5 py-2.5 rounded-full text-sm font-medium
                border border-zinc-200 dark:border-zinc-800
                bg-white dark:bg-zinc-900
                text-zinc-700 dark:text-zinc-300
                hover:bg-zinc-100 dark:hover:bg-zinc-800
                shadow-sm transition-colors
              "
            >
              {mood.name}
            </motion.button>
          ))}
        </div>

        {loading && <p className="text-center text-zinc-500">Tuning the radio...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <VideoGrid 
          videos={videos}
          onVideoSelect={setSelectedVideo}
        />

        <VideoPlayerModal
          videoId={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      </motion.div>
      <Footer/>
    </div>
  );
}
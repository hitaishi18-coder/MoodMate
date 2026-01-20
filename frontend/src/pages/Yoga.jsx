import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Animation library
import Navbar from "@/components/Navbar";

import VideoSearchBar from "../components/VideoSearchBar";
import VideoGrid from "../components/VideoGrid";
import VideoPlayerModal from "../components/VideoPlayerModal";

import {
  searchYouTube,
  getPopularYogaVideos
} from "../api/youtubeApi";
import Footer from "@/components/Footer";

export default function Yoga() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 1. Load popular yoga videos on page start
  useEffect(() => {
    async function loadDefaultVideos() {
      try {
        setLoading(true);
        const data = await getPopularYogaVideos();
        setVideos(data.items);
      } catch {
        setError("Failed to load yoga videos");
      } finally {
        setLoading(false);
      }
    }
    loadDefaultVideos();
  }, []);

  // 2. Handle search requests from the SearchBar
  async function handleSearch(query) {
    try {
      setLoading(true);
      const data = await searchYouTube(query);
      setVideos(data.items);
    } catch {
      setError("Failed to search videos");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <Navbar />

      {/* Main Content Container with Animation */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4 pt-32 pb-12"
      >
        {/* Page Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100">
            🧘 Yoga & Fitness
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2">
            Find your inner peace and strength
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-10">
          <div className="w-full max-w-2xl">
            <VideoSearchBar
              onSearch={handleSearch}
              placeholders={[
                "Search morning yoga...",
                "Search full body stretch...",
                "Search meditation music...",
                "Search power yoga...",
                "Search pilates..."
              ]}
            />
          </div>
        </div>

        {/* Status Messages */}
        {loading && (
          <p className="text-center text-zinc-500 animate-pulse">Loading videos...</p>
        )}
        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {/* Video Grid */}
        <VideoGrid 
          videos={videos}
          onVideoSelect={setSelectedVideo}
        />

        {/* Modal Player */}
        <VideoPlayerModal
          videoId={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />

      </motion.div>
      <Footer/>
    </div>
  );
}
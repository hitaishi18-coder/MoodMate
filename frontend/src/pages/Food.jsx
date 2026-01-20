import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

import VideoSearchBar from "../components/VideoSearchBar";
import VideoGrid from "../components/VideoGrid";
import VideoPlayerModal from "../components/VideoPlayerModal";

import {
  searchYouTube,
  getPopularFoodVideos
} from "../api/youtubeApi";
import Footer from "@/components/Footer";

export default function Food() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 1. Load default healthy recipes
  useEffect(() => {
    async function loadDefaultVideos() {
      try {
        setLoading(true);
        const data = await getPopularFoodVideos();
        setVideos(data.items);
      } catch {
        setError("Failed to load food videos");
      } finally {
        setLoading(false);
      }
    }
    loadDefaultVideos();
  }, []);

  // 2. Handle user search
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

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4 pt-32 pb-12"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100">
            🥗 Healthy Recipes
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2">
            Nourish your body with delicious food
          </p>
        </div>

        {/* Search */}
        <div className="flex justify-center mb-10">
          <div className="w-full max-w-2xl">
            <VideoSearchBar
              onSearch={handleSearch}
              placeholders={[
                "Search healthy snacks...",
                "Search high protein vegan...",
                "Search smoothie recipes...",
                "Search meal prep ideas...",
                "Search keto diet..."
              ]}
            />
          </div>
        </div>

        {/* Loading / Error States */}
        {loading && <p className="text-center text-zinc-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Results */}
        <VideoGrid 
          videos={videos}
          onVideoSelect={setSelectedVideo}
        />

        {/* Player Modal */}
        <VideoPlayerModal
          videoId={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      </motion.div>
      <Footer/>
    </div>
   
  );
}
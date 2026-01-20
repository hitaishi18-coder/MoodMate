import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

import VideoSearchBar from "../components/VideoSearchBar";
import VideoGrid from "../components/VideoGrid";
import VideoPlayerModal from "../components/VideoPlayerModal";

import {
  searchYouTube,
  getPopularNewsVideos
} from "../api/youtubeApi";
import Footer from "@/components/Footer";

export default function News() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 1. Load breaking news on mount
  useEffect(() => {
    async function loadDefaultVideos() {
      try {
        setLoading(true);
        const data = await getPopularNewsVideos();
        setVideos(data.items);
      } catch {
        setError("Failed to load news videos");
      } finally {
        setLoading(false);
      }
    }
    loadDefaultVideos();
  }, []);

  // 2. Search Handler
  async function handleSearch(query) {
    try {
      setLoading(true);
      const data = await searchYouTube(query);
      setVideos(data.items);
    } catch {
      setError("Failed to search news");
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
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100">
            🌍 Global Headlines
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2">
            Stay updated with the latest events
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="w-full max-w-2xl">
            <VideoSearchBar
              onSearch={handleSearch}
              placeholders={[
                "Search tech news...",
                "Search space exploration...",
                "Search sports highlights...",
                "Search world politics...",
                "Search startup news..."
              ]}
            />
          </div>
        </div>

        {loading && <p className="text-center text-zinc-500">Updating news feed...</p>}
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
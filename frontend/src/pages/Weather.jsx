import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import VideoSearchBar from "../components/VideoSearchBar";
import { getWeather } from "../api/weatherApi";
import Footer from "@/components/Footer";

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  // 1. Fetch weather data
  async function handleSearch(city) {
    try {
      setError("");
      setWeather(null);
      const data = await getWeather(city);
      setWeather(data);
    } catch {
      setError("City not found. Please try again.");
      setWeather(null);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 pt-32 pb-12 flex flex-col items-center">
        
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          ☁️ Weather Forecast
        </h1>
        <p className="text-zinc-500 mb-8">Check current conditions instantly</p>

        <div className="w-full mb-8">
          <VideoSearchBar
            onSearch={handleSearch}
            placeholders={[
              "New York...",
              "London...",
              "Tokyo...",
              "Mumbai...",
              "Paris..."
            ]}
          />
        </div>

        {error && <p className="text-red-500 animate-bounce">{error}</p>}

        {/* Animated Result Card */}
        <AnimatePresence>
          {weather && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="
                w-full max-w-sm 
                bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl 
                border border-zinc-200 dark:border-zinc-800 
                shadow-2xl rounded-3xl p-8 text-center
              "
            >
              <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
                {weather.name}, {weather.sys.country}
              </h2>
              
              <div className="my-6">
                 {/* Large Temperature Display */}
                <span className="text-6xl font-extrabold text-zinc-900 dark:text-white tracking-tighter">
                  {Math.round(weather.main.temp)}°
                </span>
              </div>

              <div className="inline-block px-4 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 capitalize font-medium">
                {weather.weather[0].description}
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                <div>
                    <p className="text-xs text-zinc-500 uppercase">Humidity</p>
                    <p className="font-semibold text-zinc-800 dark:text-zinc-200">{weather.main.humidity}%</p>
                </div>
                 <div>
                    <p className="text-xs text-zinc-500 uppercase">Wind</p>
                    <p className="font-semibold text-zinc-800 dark:text-zinc-200">{weather.wind.speed} m/s</p>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer/>
    </div>
  );
}
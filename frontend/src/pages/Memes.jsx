import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getRandomMeme } from "../api/memeApi";
import { Button } from "@/components/ui/stateful-button";
import { motion } from "framer-motion";

export default function Memes() {
  const [meme, setMeme] = useState(null);

  useEffect(() => { loadNewMeme(); }, []);

  async function loadNewMeme() {
    const data = await getRandomMeme();
    setMeme(data);
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 pt-32 pb-20 flex flex-col items-center">

        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-10">
           Meme Gallery
        </h1>

        <div className="
          w-full bg-white dark:bg-zinc-900 
          border border-zinc-200 dark:border-zinc-800 
          rounded-3xl shadow-lg p-4 flex flex-col items-center min-h-[400px] justify-center
        ">
          {!meme ? (
            <p className="text-zinc-400">Fetching laughter...</p>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={meme.url} // Re-animate on new meme
              className="flex flex-col items-center"
            >
              <img
                src={meme.image}
                alt={meme.title}
                className="rounded-xl max-h-[500px] w-auto object-contain shadow-sm"
              />
              <p className="mt-6 text-lg font-medium text-zinc-800 dark:text-zinc-200 text-center px-4">
                {meme.title}
              </p>
            </motion.div>
          )}
        </div>

        <div className="mt-10">
          <Button onClick={loadNewMeme}>
            Next Meme
          </Button>
        </div>

      </div>
      <Footer />
    </div>
  );
}
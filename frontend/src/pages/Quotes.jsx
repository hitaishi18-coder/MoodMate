import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getRandomQuote } from "../api/quotesApi";
import { Button } from "@/components/ui/stateful-button";
import { motion } from "framer-motion";

export default function Quotes() {
  const [quote, setQuote] = useState(null);

  useEffect(() => { handleNewQuote(); }, []);

  async function handleNewQuote() {
    const data = await getRandomQuote();
    setQuote(data);
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 pt-36 pb-20 flex flex-col items-center">
        
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-10">
          Daily Wisdom
        </h1>

        <motion.div 
          key={quote?.text} // Triggers animation on change
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="
            w-full bg-white dark:bg-zinc-900 
            border border-zinc-200 dark:border-zinc-800 
            rounded-3xl shadow-xl p-10 md:p-14 text-center
            relative overflow-hidden
          "
        >
          {/* Decorative Quote Mark */}
          <div className="absolute top-4 left-6 text-6xl text-zinc-200 dark:text-zinc-800 font-serif">“</div>

          {!quote ? (
            <p className="text-zinc-400">Finding wisdom...</p>
          ) : (
            <>
              <p className="text-2xl md:text-3xl font-medium text-zinc-800 dark:text-zinc-100 leading-relaxed font-serif">
                {quote.text}
              </p>
              <p className="mt-8 text-zinc-500 dark:text-zinc-400 font-medium tracking-wide">
                — {quote.author || "Unknown"}
              </p>
            </>
          )}
        </motion.div>

        <div className="mt-12">
          <Button onClick={handleNewQuote}>
            Inspire Me
          </Button>
        </div>

      </div>
      <Footer />
    </div>
  );
}
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {
  getCategories,
  getRandomTenJokes,
  getJokesByType,
  getRandomJoke,
} from "../api/jokesApi";

import CategoryTabs from "../components/CategoryTabs";
import RandomJokeButton from "../components/RandomJokeButton";
import JokeCardStack from "../components/JokeCardStack";
import RandomJokeModal from "../components/RandomJokeModal";

export default function Jokes() {
  const [categories, setCategories] = useState([]);
  const [jokes, setJokes] = useState([]);
  const [revealedIds, setRevealedIds] = useState([]);
  const [randomJoke, setRandomJoke] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => { loadInitialData(); }, []);

  async function loadInitialData() {
    try {
      setLoading(true);
      setError("");
      const [cats, randomTen] = await Promise.all([
        getCategories(),
        getRandomTenJokes(),
      ]);
      setCategories(["All", ...cats]);
      setJokes(randomTen);
    } catch {
      setError("Failed to load jokes");
    } finally {
      setLoading(false);
    }
  }

  async function handleCategorySelect(category) {
    try {
      setLoading(true);
      setError("");
      setRevealedIds([]);
      const data = category === "All" ? await getRandomTenJokes() : await getJokesByType(category);
      setJokes(data);
    } catch {
      setError("Failed to load jokes");
    } finally {
      setLoading(false);
    }
  }

  function toggleReveal(id) {
    setRevealedIds((prev) =>
      prev.includes(id) ? prev.filter((jid) => jid !== id) : [...prev, id]
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 overflow-x-hidden">
      {/* Decorative background effects */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <div 
          className="absolute top-[10%] -left-[10%] w-[30%] h-[30%] bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-[100px]"
          style={{ transform: "rotate(-15deg)" }}
        />
        <div 
          className="absolute bottom-[20%] -right-[10%] w-[25%] h-[25%] bg-yellow-500/10 dark:bg-yellow-500/5 rounded-full blur-[100px]"
        />
      </div>

      <Navbar />

      <main className="relative z-10 max-w-5xl mx-auto px-4 pt-32 pb-20">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
             Laugh Lounge
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-4 text-lg">
            Lighten up your mood with our curated collection of jokes.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center gap-10 mb-16">
          <RandomJokeButton onClick={async () => setRandomJoke(await getRandomJoke())} />
          
          <div className="w-full">
            <CategoryTabs
              categories={categories}
              onSelect={handleCategorySelect}
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="relative min-h-[400px]">
          {loading && (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            </div>
          )}
          
          {error && (
            <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-center text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          {!loading && !error && (
            <JokeCardStack
              jokes={jokes}
              revealedIds={revealedIds}
              onToggle={toggleReveal}
            />
          )}
        </div>

        <RandomJokeModal
          joke={randomJoke}
          onClose={() => setRandomJoke(null)}
        />
      </main>

      <Footer />
    </div>
  );
}
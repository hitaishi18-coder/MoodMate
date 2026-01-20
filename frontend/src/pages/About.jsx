import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 overflow-x-hidden">
      {/* Decorative background effects */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <div 
          className="absolute top-[20%] right-[5%] w-[35%] h-[35%] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[120px]"
        />
        <div 
          className="absolute bottom-[10%] left-[5%] w-[30%] h-[30%] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[120px]"
        />
      </div>

      <Navbar />

      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-20">
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent mb-4">
            About Project
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl mx-auto">
            A personalized all-in-one wellness and productivity web application designed to uplift mood, improve focus, and organize daily life.
          </p>
        </div>

        {/* Section */}
        <div className="space-y-16">

          {/* Vision */}
          <section className="p-8 rounded-3xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-xl">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-500/10 text-purple-500">🎯</span>
              Project Vision
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
              MoodMate is built to provide users with a single space where entertainment, wellness, and productivity tools come together. Our mission is to help people stay balanced in a fast-paced world.
            </p>
          </section>

          {/* AI Assistant */}
          <section className="p-8 rounded-3xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-xl">
             <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-500/10 text-blue-500">🤖</span>
              AI Mood Assistant
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
              Our smart assistant doesn't just process commands; it understands your mood. Whether you're feeling tired, excited, or overwhelmed, it suggests the right tools—from a relaxing yoga session to a quick laugh with some jokes—to perfectly match your energy.
            </p>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center italic">Core Ecosystem</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { icon: "🧘", label: "Yoga" },
                { icon: "🎵", label: "Music" },
                { icon: "😂", label: "Jokes" },
                { icon: "🖼️", label: "Memes" },
                { icon: "💬", label: "Quotes" },
                { icon: "🌍", label: "News" },
                { icon: "🌦️", label: "Weather" },
                { icon: "📝", label: "Todo" },
                { icon: "💰", label: "Expense" },
              ].map((f) => (
                <div key={f.label} className="p-4 rounded-2xl bg-zinc-100/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 flex items-center gap-3">
                  <span className="text-2xl">{f.icon}</span>
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">{f.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Tech Stack */}
          <section className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-6">Tech Mastery</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {["React 19", "Vite 7", "Tailwind 4", "Framer Motion", "Clerk Auth"].map((tech) => (
                <span key={tech} className="px-4 py-2 rounded-full bg-zinc-200 dark:bg-zinc-800 text-sm font-semibold">
                  {tech}
                </span>
              ))}
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}

import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  Search, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  Clock,
  LayoutDashboard,
  Smile,
  Zap,
  Moon,
  Coffee
} from "lucide-react";

import Navbar from "../components/Navbar";
import HeroText from "../components/HeroText";
import Footer from "../components/Footer";
import FloatingAI from "../components/FloatingAI";

const dashboardLinks = [
  { to: "/jokes", label: "Jokes", icon: "😂", color: "from-orange-400 to-rose-400", size: "lg", desc: "Get a quick laugh" },
  { to: "/music", label: "Music", icon: "🎵", color: "from-blue-400 to-indigo-500", size: "md", desc: "Lo-fi & beats" },
  { to: "/yoga", label: "Yoga", icon: "🧘", color: "from-emerald-400 to-teal-500", size: "md", desc: "Stretch & relax" },
  { to: "/news", label: "News", icon: "🌍", color: "from-sky-400 to-blue-500", size: "sm", desc: "Daily digest" },
  { to: "/food", label: "Food", icon: "🥗", color: "from-green-400 to-emerald-500", size: "sm", desc: "Healthy eats" },
  { to: "/quotes", label: "Quotes", icon: "💬", color: "from-purple-400 to-fuchsia-500", size: "lg", desc: "Daily motivation" },
  { to: "/memes", label: "Memes", icon: "🖼️", color: "from-pink-400 to-rose-500", size: "md", desc: "Fresh laughs" },
  { to: "/weather", label: "Weather", icon: "💭", color: "from-cyan-400 to-sky-500", size: "sm", desc: "Forecast" },
  { to: "/todo", label: "Todo", icon: "✍️", color: "from-amber-400 to-orange-500", size: "md", desc: "Get it done" },
  { to: "/expense", label: "Expense", icon: "💰", color: "from-lime-400 to-green-500", size: "sm", desc: "Save money" },
  { to: "/timer", label: "Timer", icon: "⏰", color: "from-indigo-400 to-violet-500", size: "sm", desc: "Focus time" },
  { to: "/dailydiary", label: "Diary", icon: "📓", color: "from-violet-400 to-purple-600", size: "md", desc: "Reflect daily" },
];

const moods = [
  { label: "Productive", icon: <Zap className="w-4 h-4" />, color: "bg-amber-500" },
  { label: "Relaxed", icon: <Moon className="w-4 h-4" />, color: "bg-blue-500" },
  { label: "Energetic", icon: <Coffee className="w-4 h-4" />, color: "bg-orange-500" },
  { label: "Happy", icon: <Smile className="w-4 h-4" />, color: "bg-rose-500" },
];

export default function Home() {
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMood, setSelectedMood] = useState(null);

  const filteredLinks = dashboardLinks.filter(link => 
    link.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-indigo-500/30 overflow-x-hidden transition-colors duration-500">
      {/* Enhanced Multi-layer Mesh Grid */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div 
          className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] rounded-full opacity-[0.2] dark:opacity-[0.2] blur-[150px]"
          style={{ background: "radial-gradient(circle, var(--color-indigo-500) 0%, transparent 60%)" }}
        />
        <div 
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full opacity-[0.1] dark:opacity-[0.1] blur-[120px]"
          style={{ background: "radial-gradient(circle, var(--color-purple-500) 0%, transparent 70%)" }}
        />
        <div 
          className="absolute top-[30%] left-[40%] w-[40%] h-[40%] rounded-full opacity-[0.05] dark:opacity-[0.05] blur-[100px]"
          style={{ background: "radial-gradient(circle, var(--color-pink-500) 0%, transparent 70%)" }}
        />
      </div>

      <Navbar />

      <main className="relative z-10 pt-32 pb-20 px-4 md:px-8 space-y-20">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-16">
          
          {/* Hero Section */}
          <div className="flex flex-col items-center text-center space-y-10 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 text-foreground/80 text-sm font-bold backdrop-blur-3xl shadow-xl"
            >
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>CRAFTED FOR YOUR WELLBEING</span>
            </motion.div>

            <HeroText name={user?.firstName} />

            {/* Mood Selector & Search Wrapper */}
            <div className="w-full max-w-2xl space-y-8">
              {/* Mood Picker */}
              <div className="flex flex-wrap justify-center gap-3">
                {moods.map((mood) => (
                  <button
                    key={mood.label}
                    onClick={() => setSelectedMood(selectedMood === mood.label ? null : mood.label)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                      selectedMood === mood.label 
                      ? `${mood.color} text-white border-transparent scale-105 shadow-lg` 
                      : 'bg-slate-900/5 dark:bg-white/5 border-slate-900/10 dark:border-white/10 hover:bg-slate-900/10 dark:hover:bg-white/10 text-muted-foreground'
                    }`}
                  >
                    {mood.icon}
                    {mood.label}
                  </button>
                ))}
              </div>

              {/* Advanced Search */}
              <div className="relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                <input 
                  type="text"
                  placeholder="Find your favorite tool..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 rounded-3xl bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 focus:border-indigo-500/30 focus:ring-8 focus:ring-indigo-500/5 placeholder:text-muted-foreground/50 outline-none transition-all backdrop-blur-2xl text-lg font-medium shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* Bento Grid */}
          <div className="w-full space-y-10">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-3xl font-black italic tracking-tighter text-foreground uppercase">TOOLBOX</h2>
                <p className="text-muted-foreground font-bold text-xs uppercase tracking-[0.2em]">Curated for your {selectedMood || 'day'}</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10">
                 <UserButton afterSignOutUrl="/sign-in" />
              </div>
            </div>

            <motion.div 
              layout
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredLinks.map((link, index) => (
                  <motion.div
                    key={link.to}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.02 }}
                    className={link.size === 'lg' ? 'col-span-2' : 'col-span-1'}
                  >
                    <Link to={link.to} className="group block h-full">
                      <div className="relative h-full p-8 rounded-[2.5rem] bg-gradient-to-br from-slate-900/5 to-transparent dark:from-white/10 dark:to-transparent border border-slate-900/10 dark:border-white/10 hover:border-indigo-500/30 backdrop-blur-md transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_0_80px_-20px_rgba(99,102,241,0.2)] flex flex-col justify-between overflow-hidden">
                        
                        {/* Interactive Color Blob */}
                        <div className={`absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-gradient-to-br ${link.color} opacity-[0.05] blur-3xl group-hover:opacity-20 transition-opacity duration-1000`} />
                        
                        <div className="flex items-start justify-between relative z-10">
                          <span className="text-5xl drop-shadow-2xl grayscale-[0.2] group-hover:grayscale-0 transition-all">{link.icon}</span>
                          <div className={`p-4 rounded-[1.5rem] bg-gradient-to-br ${link.color} shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-500`}>
                            <ArrowRight className="w-5 h-5 text-white" />
                          </div>
                        </div>

                        <div className="mt-12 relative z-10">
                          <h3 className="text-2xl font-black text-foreground group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors tracking-tight leading-none">{link.label}</h3>
                          <p className="text-muted-foreground mt-2 font-medium text-sm transition-colors group-hover:text-foreground/70 dark:group-hover:text-slate-300">{link.desc}</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </main>

      <FloatingAI />
      <Footer />
    </div>
  );
}
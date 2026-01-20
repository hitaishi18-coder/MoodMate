import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // Import Footer
import { Bell, Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";

// Assets
import tone1 from "../assets/tone1.mp3";
import tone2 from "../assets/tone2.mp3";
import tone3 from "../assets/tone3.mp3";
import tone4 from "../assets/tone4.mp3";
import tone5 from "../assets/tone5.mp3";

export default function TimerAlarm() {
  const tones = [
    { name: "Peaceful", file: tone1 },
    { name: "Cheerful", file: tone2 },
    { name: "Alert", file: tone3 },
    { name: "Ring", file: tone4 },
    { name: "Classic", file: tone5 }
  ];

  /* --- STATES --- */
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedTone, setSelectedTone] = useState(tones[0].file);
  const audioRef = useRef(new Audio(selectedTone));

  const [seconds, setSeconds] = useState(1500); // 25 mins
  const [isRunning, setIsRunning] = useState(false);
  
  const [alarmTime, setAlarmTime] = useState("");
  const [alarmSet, setAlarmSet] = useState(false);

  /* --- SOUND LOGIC --- */
  useEffect(() => { audioRef.current = new Audio(selectedTone); }, [selectedTone]);

  function playSound() {
    if (!soundEnabled) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  }

  /* --- TIMER LOGIC --- */
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setIsRunning(false);
          playSound();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  /* --- ALARM LOGIC --- */
  useEffect(() => {
    if (!alarmSet) return;
    const check = setInterval(() => {
      const now = new Date();
      const current = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      if (current === alarmTime) {
        playSound();
        setAlarmSet(false);
      }
    }, 1000);
    return () => clearInterval(check);
  }, [alarmSet, alarmTime]);

  // Helpers
  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    // Use flex-col to push footer to bottom
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <Navbar />

      {/* Main Content: flex-grow ensures it takes available space */}
      <div className="flex-grow w-full max-w-4xl mx-auto px-4 pt-32 pb-12">
        <h1 className="text-3xl font-bold text-center text-zinc-900 dark:text-zinc-100 mb-10">
          ⏳ Focus & Wake
        </h1>

        {/* Global Sound Settings */}
        <div className="flex justify-center gap-4 mb-10">
           <select 
             className="px-4 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm"
             value={selectedTone}
             onChange={(e) => setSelectedTone(e.target.value)}
           >
             {tones.map(t => <option key={t.name} value={t.file}>{t.name}</option>)}
           </select>
           
           <button 
             onClick={() => setSoundEnabled(!soundEnabled)}
             className="p-2 rounded-lg bg-zinc-200 dark:bg-zinc-800 hover:opacity-80 transition"
           >
             {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
           </button>
        </div>

        {/* Grid for Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* === TIMER CARD === */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl flex flex-col items-center justify-between"
          >
            <h2 className="text-lg font-medium text-zinc-500 uppercase tracking-wide">Focus Timer</h2>
            
            <div className="text-7xl font-mono font-bold text-zinc-900 dark:text-white my-8 tracking-tighter">
              {formatTime(seconds)}
            </div>

            <div className="flex gap-4">
              {!isRunning ? (
                <button onClick={() => setIsRunning(true)} className="p-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full hover:scale-105 transition"><Play fill="currentColor" /></button>
              ) : (
                 <button onClick={() => setIsRunning(false)} className="p-4 bg-zinc-200 dark:bg-zinc-800 rounded-full hover:scale-105 transition"><Pause /></button>
              )}
              <button onClick={() => { setIsRunning(false); setSeconds(1500); }} className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"><RotateCcw size={20} /></button>
            </div>
          </motion.div>

          {/* === ALARM CARD === */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl flex flex-col items-center justify-center"
          >
            <h2 className="text-lg font-medium text-zinc-500 uppercase tracking-wide mb-6">Alarm Clock</h2>
            
            <input 
              type="time" 
              value={alarmTime}
              onChange={(e) => setAlarmTime(e.target.value)}
              className="text-4xl p-4 bg-zinc-100 dark:bg-zinc-950 rounded-xl border-none text-center font-bold mb-8 outline-none focus:ring-2 focus:ring-zinc-400"
            />

            {!alarmSet ? (
              <button 
                onClick={() => alarmTime && setAlarmSet(true)}
                className="w-full py-3 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black font-semibold hover:opacity-90 transition"
              >
                Set Alarm
              </button>
            ) : (
              <button 
                onClick={() => { setAlarmSet(false); setAlarmTime(""); }}
                className="w-full py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition flex items-center justify-center gap-2"
              >
                <Bell size={18} /> Cancel Alarm
              </button>
            )}
            
            {alarmSet && <p className="mt-4 text-green-500 text-sm font-medium animate-pulse">Alarm Active</p>}
          </motion.div>
          
        </div>
      </div>

      {/* Footer is now OUTSIDE the grid and max-w-4xl container */}
      <Footer />
    </div>
  );
}
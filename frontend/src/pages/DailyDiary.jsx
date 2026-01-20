import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Lock, Unlock, Save, Printer, Trash2, Image as ImageIcon, Calendar, X } from "lucide-react";

export default function DailyDiary() {

  /* ---------- PASSWORD LOCK ---------- */
  const correctPassword = "1234";
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleUnlock() {
    if (password === correctPassword) {
      setUnlocked(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  }

  /* ---------- DIARY STATES ---------- */
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [savedDates, setSavedDates] = useState([]);

  /* ---------- LOAD SAVED DATES ---------- */
  useEffect(() => {
    const keys = Object.keys(localStorage)
      .filter(key => key.startsWith("diary-"))
      .map(key => key.replace("diary-", ""));
    setSavedDates(keys.sort().reverse()); // Sort newest first
  }, []);

  /* ---------- LOAD SELECTED DIARY ---------- */
  useEffect(() => {
    const saved = localStorage.getItem("diary-" + date);
    if (saved) {
      const data = JSON.parse(saved);
      setText(data.text);
      setImages(data.images);
    } else {
      setText("");
      setImages([]);
    }
  }, [date]);

  /* ---------- ACTIONS ---------- */
  function saveDiary() {
    const data = { text, images };
    localStorage.setItem("diary-" + date, JSON.stringify(data));
    
    if (!savedDates.includes(date)) {
      setSavedDates(prev => [date, ...prev].sort().reverse());
    }
    alert("Diary Saved Successfully! 💾");
  }

  function deleteDiary(selectedDate) {
    if (!confirm("Are you sure you want to delete this entry?")) return;
    
    localStorage.removeItem("diary-" + selectedDate);
    setSavedDates(prev => prev.filter(d => d !== selectedDate));

    if (selectedDate === date) {
      setText("");
      setImages([]);
    }
  }

  function handleImageUpload(e) {
    const files = Array.from(e.target.files);
    const urls = files.map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...urls]);
  }

  function deleteImage(index) {
    setImages(prev => prev.filter((_, i) => i !== index));
  }

  function downloadPDF() {
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>Diary - ${date}</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #333; }
            h2 { border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
            .content { white-space: pre-wrap; line-height: 1.6; font-size: 16px; margin-bottom: 30px; }
            .gallery { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
            img { width: 100%; border-radius: 8px; border: 1px solid #ddd; }
          </style>
        </head>
        <body>
          <h2>📅 Diary Entry: ${date}</h2>
          <div class="content">${text.replace(/\n/g, "<br>")}</div>
          <div class="gallery">
            ${images.map(img => `<img src="${img}" />`).join("")}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  }

  /* ---------- LOCK SCREEN UI ---------- */
  if (!unlocked) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 w-full max-w-md text-center"
        >
          <div className="bg-zinc-100 dark:bg-zinc-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-zinc-600 dark:text-zinc-400" />
          </div>
          
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Private Diary</h2>
          <p className="text-zinc-500 mb-6">Enter password to access your memories</p>

          <input
            type="password"
            placeholder="Password (1234)"
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 mb-4 focus:ring-2 focus:ring-zinc-500 outline-none transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
          />
          
          {error && <p className="text-red-500 text-sm mb-4 animate-pulse">{error}</p>}

          <button 
            onClick={handleUnlock} 
            className="w-full py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            <Unlock size={18} /> Unlock
          </button>
        </motion.div>
      </div>
    );
  }

  /* ---------- MAIN UI ---------- */
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <Navbar />

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-grow w-full max-w-5xl mx-auto px-4 pt-32 pb-12"
      >
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
            📓 My Personal Diary
          </h1>
          
          {/* Date Picker */}
          <div className="relative group">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-zinc-500 outline-none cursor-pointer"
            />
          </div>
        </div>

        {/* Editor Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-6 mb-8">
          
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Dear Diary, today was...`}
            className="w-full h-64 bg-transparent border-none outline-none resize-none text-lg leading-relaxed text-zinc-800 dark:text-zinc-200 placeholder-zinc-400"
          />

          {/* Image Preview Grid */}
          {images.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
              {images.map((img, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={img} 
                    className="w-24 h-24 object-cover rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm" 
                    alt="diary memory" 
                  />
                  <button
                    onClick={() => deleteImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-md hover:scale-110"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            
            {/* Upload Button */}
            <label className="cursor-pointer flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
              <div className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800">
                <ImageIcon size={20} />
              </div>
              <span className="text-sm font-medium">Add Photos</span>
            </label>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button 
                onClick={saveDiary} 
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black font-medium hover:opacity-90 transition-all"
              >
                <Save size={18} /> Save
              </button>

              <button 
                onClick={downloadPDF} 
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
              >
                <Printer size={18} /> PDF
              </button>
            </div>
          </div>
        </div>

        {/* Saved Diaries List */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
            📅 Past Memories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {savedDates.length === 0 ? (
                <p className="text-zinc-400 col-span-full italic">No entries yet. Start writing today!</p>
              ) : (
                savedDates.map((d) => (
                  <motion.div
                    key={d}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`
                      group p-4 rounded-2xl border transition-all cursor-pointer flex justify-between items-center
                      ${d === date 
                        ? "bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 shadow-inner" 
                        : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 hover:shadow-md"
                      }
                    `}
                    onClick={() => setDate(d)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-950 text-zinc-500">
                        <Calendar size={18} />
                      </div>
                      <span className="font-medium text-zinc-700 dark:text-zinc-200">{d}</span>
                    </div>

                    <button
                      onClick={(e) => { e.stopPropagation(); deleteDiary(d); }}
                      className="text-zinc-400 hover:text-red-500 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all opacity-0 group-hover:opacity-100"
                      title="Delete Entry"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

      </motion.div>

      <Footer />
    </div>
  );
}
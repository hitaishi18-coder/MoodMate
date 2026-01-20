import { motion } from "motion/react";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";

export default function HeroText({ name }) {
  return (
    <HeroHighlight containerClassName="bg-transparent py-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center relative z-10"
      >
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground leading-[1.1] tracking-tight"
          style={{ textShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
        >
          <span className="bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">
            Hey {name || "there"},
          </span>
          <br />
          <span className="relative">
            elevate your 
            <Highlight className="mx-2 text-white font-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl px-4 py-1 shadow-lg shadow-indigo-500/20">
              vibe
            </Highlight>
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-muted-foreground text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed"
        >
          Your companion for a balanced mind, body, and soul. 
          Discover tools to transform your day.
        </motion.p>
      </motion.div>
    </HeroHighlight>
  );
}
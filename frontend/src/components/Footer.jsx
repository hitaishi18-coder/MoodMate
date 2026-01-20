import React from "react";
import { Cover } from "@/components/ui/cover";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { cn } from "@/lib/utils";

const socials = [
  {
    id: 1,
    name: "Instagram",
    designation: "@hitaishi18",
    image: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
    link: "https://instagram.com/hitaishi18",
  },
  {
    id: 2,
    name: "GitHub",
    designation: "@hitaishi18-coder",
    image: "https://cdn-icons-png.flaticon.com/512/733/733553.png",
    link: "https://github.com/hitaishi18-coder",
  },
  {
    id: 3,
    name: "LinkedIn",
    designation: "@Hitaishi Lohtia",
    image: "https://cdn-icons-png.flaticon.com/512/3536/3536505.png",
    link: "https://www.linkedin.com/in/hitaishi-lohtia-99a219256/",
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 w-full mt-14">

      {/* Thin Gradient Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

      {/* Glass Container */}
      <div
        className={cn(
          "bg-white/70 dark:bg-black/70 backdrop-blur-lg",
          "border-t border-black/10 dark:border-white/10"
        )}
      >
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* LEFT — Brand */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold text-black dark:text-white">
              Built with <Cover>MoodMate</Cover>
            </h2>
          </div>

          {/* CENTER — Tech Stack */}
          <div className="text-xs md:text-sm text-black/60 dark:text-white/60 text-center">
            Tech Stack:
            <span className="ml-2 font-medium text-black dark:text-white">
              React • Vite • Tailwind • Clerk • Aceternity UI
            </span>
          </div>

          {/* RIGHT — Socials */}
          <div className="flex justify-center">
            <AnimatedTooltip
              items={socials}
              onItemClick={(item) => window.open(item.link, "_blank")}
            />
          </div>

        </div>

        {/* Bottom Note */}
        <div className="text-center text-[11px] text-black/50 dark:text-white/50 pb-3">
          © {new Date().getFullYear()} MoodMate
        </div>
      </div>
    </footer>
  );
}

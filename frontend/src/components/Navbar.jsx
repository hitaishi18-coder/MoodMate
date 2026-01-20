import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "../components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun, Menu as MenuIcon, X } from "lucide-react";

export default function Navbar({ className }) {
  const [active, setActive] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    {
      item: "Home",
      links: [
        { href: "/", label: "Dashboard" },
        { href: "/about", label: "About Project" },
      ],
    },
    {
      item: "Fun Zone",
      links: [
        { href: "/jokes", label: "😂 Jokes" },
        { href: "/quotes", label: "💬 Quotes" },
        { href: "/memes", label: "🖼️ Memes" },
        { href: "/music", label: "🎵 Music" },
      ],
    },
    {
      item: "Wellness",
      links: [
        { href: "/yoga", label: "🧘 Yoga Training" },
        { href: "/food", label: "🥗 Healthy Food" },
      ],
    },
    {
      item: "Daily Updates",
      links: [
        { href: "/news", label: "🌍 News" },
        { href: "/weather", label: "💭 Weather" },
      ],
    },
    {
      item: "Tools",
      links: [
        { href: "/todo", label: "✍️ Todo" },
        { href: "/expense", label: "💰 Expense Tracker" },
        { href: "/timer", label: "⏰ Timer & Alarm" },
        { href: "/dailydiary", label: "📓 Daily Diary" },
      ],
    },
    {
      item: "Account",
      links: [
        { href: "/sign-in", label: "Login" },
        { href: "/sign-up", label: "Sign Up" },
        { href: "/profile", label: "Profile" },
      ],
    },
  ];

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 w-full flex justify-center items-center z-50 p-4 transition-all duration-300",
        className
      )}
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-4">
        <Menu setActive={setActive}>
          {navLinks.map((section) => (
            <MenuItem key={section.item} setActive={setActive} active={active} item={section.item}>
              <div className="flex flex-col space-y-3 text-sm">
                {section.links.map((link) => (
                  <HoveredLink key={link.href} href={link.href}>
                    {link.label}
                  </HoveredLink>
                ))}
              </div>
            </MenuItem>
          ))}
        </Menu>

        <button
          onClick={toggleTheme}
          className="p-3 rounded-full bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 shadow-lg hover:scale-110 transition-all"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-zinc-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center justify-between w-full max-w-md bg-white/80 dark:bg-zinc-900/80 px-6 py-3 rounded-full border border-black/5 dark:border-white/10 shadow-xl">
        <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">MoodMate</span>
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2">
            {theme === "dark" ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-zinc-700" />}
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 top-[80px] bg-white/95 dark:bg-zinc-950/95 p-6 md:hidden overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-300"
          style={{ height: "calc(100vh - 80px)" }}
        >
          <div className="grid grid-cols-1 gap-8 pb-10">
            {navLinks.map((section) => (
              <div key={section.item}>
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4">{section.item}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {section.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium text-zinc-800 dark:text-zinc-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
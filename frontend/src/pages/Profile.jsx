import { UserProfile } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Profile() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />

      <main className="relative pt-28 pb-20 px-4 min-h-[calc(100vh-80px)]">
        {/* Decorative background element */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[100px] pointer-events-none"
          style={{ zIndex: 0 }}
        />
        
        <div className="relative z-10 flex justify-center">
          <UserProfile path="/profile" routing="path" />
        </div>
      </main>

      <Footer />
    </div>
  );
}

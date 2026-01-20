import { NoiseBackground } from "@/components/ui/noise-background";

export default function NoiseButton({ text = "Click Me →" }) {
  return (
    <div
      className="
        rounded-2xl 
        w-full h-full 
        flex items-center justify-center
        shadow-md hover:shadow-xl
        hover:scale-[1.02]
        transition-all duration-300
        overflow-hidden
        bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800
      "
    >
      <NoiseBackground
        containerClassName="p-2 w-full h-full flex items-center justify-center"
        gradientColors={[
          "rgba(167, 139, 250, 0.4)", // Soft Purple
          "rgba(96, 165, 250, 0.4)",  // Soft Blue
          "rgba(251, 146, 60, 0.4)",  // Soft Orange
        ]}
      >
        <button className="
          pointer-events-none
          rounded-xl 
          bg-white/40 dark:bg-black/40 backdrop-blur-md
          border border-white/40 dark:border-white/10
          px-4 py-2 
          text-zinc-900 dark:text-white 
          font-bold tracking-tight
          shadow-sm
        ">
          {text}
        </button>
      </NoiseBackground>
    </div>
  );
}
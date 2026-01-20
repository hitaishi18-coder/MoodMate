import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FloatingAI() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi 👋 Tell me how you feel today." },
  ]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  function addMessage(sender, text) {
    setMessages((prev) => [...prev, { sender, text }]);
  }

  function handleUserMessage() {
    if (!input.trim()) return;

    const userText = input.toLowerCase();
    addMessage("user", input);
    setInput("");

    const rules = [
      { keywords: ["sad", "bored", "low"], reply: "Let’s cheer you up 😄 Open jokes or memes?", actions: ["jokes", "memes"] },
      { keywords: ["stressed", "tired"], reply: "Relax time 🌿 Yoga or music?", actions: ["yoga", "music"] },
      { keywords: ["hungry", "food"], reply: "Opening food 🍲", actions: ["food"], autoOpen: true },
      { keywords: ["music"], reply: "Opening music 🎵", actions: ["music"], autoOpen: true },
      { keywords: ["yoga"], reply: "Opening yoga 🧘", actions: ["yoga"], autoOpen: true },
      { keywords: ["jokes"], reply: "Opening jokes 😂", actions: ["jokes"], autoOpen: true },
      { keywords: ["news"], reply: "Opening news 📰", actions: ["news"], autoOpen: true },
      { keywords: ["weather"], reply: "Opening weather 🌦️", actions: ["weather"], autoOpen: true },
      { keywords: ["todo"], reply: "Opening todo 📝", actions: ["todo"], autoOpen: true },
      { keywords: ["expense"], reply: "Opening expense 💰", actions: ["expense"], autoOpen: true },
      { keywords: ["timer"], reply: "Opening timer ⏰", actions: ["timer"], autoOpen: true },
      { keywords: ["diary"], reply: "Opening daily diary 📖", actions: ["dailydiary"], autoOpen: true },
    ];

    const matched = rules.find(rule =>
      rule.keywords.some(word => userText.includes(word))
    );

    if (!matched) {
      addMessage("ai", "Try saying: 'I feel tired', 'open music', 'I am bored'");
      return;
    }

    addMessage("ai", matched.reply);

    if (matched.autoOpen) {
      setTimeout(() => navigate("/" + matched.actions[0]), 800);
      return;
    }

    matched.actions.forEach(action => {
      addMessage("ai-action", action);
    });
  }

  function handleAction(action) {
    navigate("/" + action);
  }

  return (
    <>
      {/* Floating Ask Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed left-4 bottom-10 z-50 px-4 py-2 rounded-full 
        bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-medium shadow-lg"
      >
        🤖 Ask
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed left-4 bottom-24 z-50 w-80 bg-white dark:bg-zinc-900 
        border dark:border-zinc-800 rounded-xl shadow-xl p-4">

          {/* Messages */}
          <div className="h-60 overflow-y-auto space-y-3 mb-3">
            {messages.map((msg, i) => {
              if (msg.sender === "ai-action") {
                return (
                  <button
                    key={i}
                    onClick={() => handleAction(msg.text)}
                    className="px-3 py-1 bg-indigo-600 text-white rounded-full text-xs mr-2"
                  >
                    Open {msg.text}
                  </button>
                );
              }

              return (
                <div
                  key={i}
                  className={`px-3 py-2 rounded-lg text-sm max-w-[85%] ${
                    msg.sender === "user"
                      ? "bg-indigo-600 text-white ml-auto"
                      : "bg-gray-100 dark:bg-zinc-800 text-black dark:text-white"
                  }`}
                >
                  {msg.text}
                </div>
              );
            })}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              className="flex-1 px-3 py-2 rounded-md border dark:border-zinc-700 bg-transparent outline-none text-sm"
            />
            <button
              onClick={handleUserMessage}
              className="px-3 py-2 bg-indigo-600 text-white rounded-md text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

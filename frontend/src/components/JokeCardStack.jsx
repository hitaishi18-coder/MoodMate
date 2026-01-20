export default function JokeCardStack({ jokes, revealedIds, onToggle }) {

  if (!jokes || jokes.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading jokes...
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6 mt-6">

      {jokes.map((joke) => (
        <div
          key={joke.id}
          className="
            max-w-3xl mx-auto 
            bg-white dark:bg-zinc-900
            border border-gray-200 dark:border-white/10
            rounded-2xl p-6
            shadow-lg
            hover:shadow-xl transition-all
          "
        >
          
          {/* Category Badge */}
          <span className="
            text-xs uppercase tracking-wider
            text-sky-600 dark:text-sky-400
            font-semibold
          ">
            {joke.type}
          </span>

          {/* Joke Setup */}
          <p className="text-xl font-semibold mt-2 text-gray-800 dark:text-gray-100">
            {joke.setup}
          </p>

          {/* Toggle Button */}
          <button
            onClick={() => onToggle(joke.id)}
            className="
              mt-3 text-sm font-medium
              text-emerald-600 dark:text-emerald-400
              hover:underline
            "
          >
            {revealedIds.includes(joke.id)
              ? "Hide Punchline"
              : "Show Punchline"}
          </button>

          {/* Punchline */}
          {revealedIds.includes(joke.id) && (
            <p className="
              mt-3 text-base
              text-emerald-700 dark:text-emerald-300
              italic
            ">
              {joke.punchline}
            </p>
          )}
        </div>
      ))}

    </div>
  );
}

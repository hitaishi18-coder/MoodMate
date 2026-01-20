export default function RandomJokeButton({ onClick }) {
  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={onClick}
        className="
          px-6 py-2 rounded-full
          bg-sky-600 text-white
          hover:bg-sky-700
          shadow-md hover:shadow-lg
          transition
        "
      >
        🎲 Random Joke
      </button>
    </div>
  );
}

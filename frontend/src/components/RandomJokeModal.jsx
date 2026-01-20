export default function RandomJokeModal({ joke, onClose }) {
  if (!joke) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-black p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-2">
          {joke.setup}
        </h3>
        <p className="text-emerald-400 mb-4">
          {joke.punchline}
        </p>
        <button onClick={onClose} className="underline">
          Close
        </button>
      </div>
    </div>
  );
}

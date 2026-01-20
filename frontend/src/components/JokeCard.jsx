export default function JokeCard({ joke, isRevealed, onToggle }) {
  return (
    <div style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
      
      <small>Type: {joke.type}</small>

      <h4>{joke.setup}</h4>

      <button onClick={() => onToggle(joke.id)}>
        {isRevealed ? "Hide Punchline" : "Show Punchline"}
      </button>

      {isRevealed && <p>{joke.punchline}</p>}
    </div>
  );
}

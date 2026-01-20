import quotes from "../data/quotes.json";

export async function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

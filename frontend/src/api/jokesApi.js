const BASE_URL = import.meta.env.VITE_JOKES_API_BASE;

// Fetch categories
export async function getCategories() {
  const res = await fetch(`${BASE_URL}/types`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

// Fetch 10 random jokes
export async function getRandomTenJokes() {
  const res = await fetch(`${BASE_URL}/random_ten`);
  if (!res.ok) throw new Error("Failed to fetch jokes");
  return res.json();
}

// Fetch jokes by category
export async function getJokesByType(type) {
  const res = await fetch(`${BASE_URL}/jokes/${type}/ten`);
  if (!res.ok) throw new Error("Failed to fetch jokes by type");
  return res.json();
}

// Fetch one random joke
export async function getRandomJoke() {
  const res = await fetch(`${BASE_URL}/random_joke`);
  if (!res.ok) throw new Error("Failed to fetch random joke");
  return res.json();
}

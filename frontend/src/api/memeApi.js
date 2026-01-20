export async function getRandomMeme() {
  const res = await fetch("http://localhost:5000/api/meme");
  return await res.json();
}

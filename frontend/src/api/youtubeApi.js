
const BASE_URL = import.meta.env.VITE_YOUTUBE_BASE_URL;

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;


/*
|--------------------------------------------------------------------------
| Function: searchYouTube(query)
|--------------------------------------------------------------------------
| Purpose:
| Search YouTube videos based on user input from search bar.
|
| Endpoint Used:
| GET https://www.googleapis.com/youtube/v3/search
|
| Query Parameters:
| part=snippet        → Returns title, description, thumbnails, channel info
| type=video         → Ensures only videos (not playlists or channels)
| maxResults=12      → Limits results to 12 videos
| q=${query}         → Search keyword entered by user
| key=${API_KEY}     → Authentication key
|
| Example Final URL:
| https://www.googleapis.com/youtube/v3/search
| ?part=snippet&type=video&maxResults=12&q=morning%20yoga&key=API_KEY
|--------------------------------------------------------------------------
*/
export async function searchYouTube(query) {
  const res = await fetch(
    `${BASE_URL}/search?part=snippet&type=video&maxResults=12&q=${query}&key=${API_KEY}`
  );

  // If request fails, throw an error
  if (!res.ok) throw new Error("Failed to fetch videos");

  // Convert response into JSON and return it
  return res.json();
}


/*
|--------------------------------------------------------------------------
| Function: getPopularYogaVideos()
|--------------------------------------------------------------------------
| Purpose:
| Load default yoga / fitness videos when page opens.
|
| Endpoint Used:
| GET https://www.googleapis.com/youtube/v3/search
|
| Query Parameters:
| part=snippet        → Returns video details
| type=video         → Only videos
| maxResults=12      → Show 12 videos on initial load
| q=yoga training    → Predefined search term
| key=${API_KEY}     → Authentication
|
| Example Final URL:
| https://www.googleapis.com/youtube/v3/search
| ?part=snippet&type=video&maxResults=12&q=yoga%20training&key=API_KEY
|--------------------------------------------------------------------------
*/
export async function getPopularYogaVideos() {
  const res = await fetch(
    `${BASE_URL}/search?part=snippet&type=video&maxResults=12&q=yoga training&key=${API_KEY}`
  );

  // Handle API error
  if (!res.ok) throw new Error("Failed to fetch videos");

  // Return JSON response
  return res.json();
}

/*
|--------------------------------------------------------------------------
| Function: getPopularFoodVideos()
|--------------------------------------------------------------------------
| Purpose:
| Load default healthy food / recipe videos when Food page opens.
|
| Query:
| q=healthy food recipes
|--------------------------------------------------------------------------
*/
export async function getPopularFoodVideos() {
  const res = await fetch(
    `${BASE_URL}/search?part=snippet&type=video&maxResults=12&q=healthy food recipes&key=${API_KEY}`
  );

  // Handle API error
  if (!res.ok) throw new Error("Failed to fetch videos");

  // Return JSON response
  return res.json();
}

/*
|--------------------------------------------------------------------------
| Function: getPopularNewsVideos()
|--------------------------------------------------------------------------
| Purpose:
| Load default news videos when News page opens.
|
| Query:
| q=latest news
|--------------------------------------------------------------------------
*/
export async function getPopularNewsVideos() {
  const res = await fetch(
    `${BASE_URL}/search?part=snippet&type=video&maxResults=12&q=latest news&key=${API_KEY}`
  );

  if (!res.ok) throw new Error("Failed to fetch videos");

  return res.json();
}

/*
|--------------------------------------------------------------------------
| Function: getPopularMusicVideos()
|--------------------------------------------------------------------------
| Purpose:
| Load default trending music videos when Music page opens.
|--------------------------------------------------------------------------
*/
export async function getPopularMusicVideos() {
  const res = await fetch(
    `${BASE_URL}/search?part=snippet&type=video&maxResults=12&q=trending music&key=${API_KEY}`
  );

  if (!res.ok) throw new Error("Failed to fetch music videos");

  return res.json();
}

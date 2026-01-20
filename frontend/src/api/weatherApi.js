const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const WEATHER_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export async function getWeather(city) {
    const res = await fetch(
        `${WEATHER_BASE_URL}?q=${city}&appid=${WEATHER_KEY}&units=metric`
    );

    if(!res.ok) throw new Error("city not found")
        return res.json();
}

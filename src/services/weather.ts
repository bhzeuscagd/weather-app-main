// 1. Definimos las interfaces para TypeScript
interface GeoResult {
  results?: {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country: string;
  }[];
}

interface WeatherData {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
  };
}

// 2. Función para buscar la ciudad (Latitud y Longitud)
export const getCoordinates = async (city: string) => {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=es&format=json`;
  
  const response = await fetch(url);
  const data = (await response.json()) as GeoResult;

  if (!data.results || data.results.length === 0) {
    throw new Error("Ciudad no encontrada");
  }

  return data.results[0]; // Retornamos la primera coincidencia
};

// 3. Función para obtener el clima usando Lat y Lon
export const getWeather = async (lat: number, lon: number) => {
  // Aquí pedimos: temperatura actual, humedad, viento, sensación térmica, y pronóstico diario
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    timezone: "auto",
  });

  const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
  
  const response = await fetch(url);
  return (await response.json()) as WeatherData;
};
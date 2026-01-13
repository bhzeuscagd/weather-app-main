// --- 1. INTERFACES ---

// 1. Definimos una interfaz para las unidades
export interface WeatherUnits {
    temperature_unit?: "celsius" | "fahrenheit";
    wind_speed_unit?: "kmh" | "mph" | "kn" | "ms";
    precipitation_unit?: "mm" | "inch";
}

// A. CREA ESTA NUEVA INTERFAZ (Define cómo es UNA ciudad)
export interface CityInfo {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country: string;
    admin1?: string; 
}

export interface GeoResult {
  // B. USA LA NUEVA INTERFAZ AQUÍ
  results?: CityInfo[]; 
}

export interface GeoResult {
  results?: {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country: string;
    admin1?: string; // Provincia/Estado (opcional)
  }[];
}

export interface DailyData {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
    precipitation_sum: number[];
}

export interface HourlyData {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
}

export interface WeatherData {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  daily: DailyData;
  hourly: HourlyData;
}

// --- 2. FUNCIONES DE SERVICIO ---

/**
 * Busca las coordenadas de una ciudad por nombre.
 */
export const getCoordinates = async (city: string) => {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error conectando con servicio de geocoding");
    
    const data = (await response.json()) as GeoResult;

    if (!data.results || data.results.length === 0) {
      throw new Error("Ciudad no encontrada");
    }

    return data.results[0];
  } catch (error) {
    console.error(error);
    return null; // O lanza el error según prefieras manejarlo
  }
};

/**
 * Obtiene el clima completo (Actual, Diario y Por Hora)
 */
export const getWeather = async (lat: number, lon: number, units: WeatherUnits ={}) => {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum",
    hourly: "temperature_2m,weather_code", // <--- IMPORTANTE: Esto trae las horas
    timezone: "auto",

    // 3. APLICAMOS LAS UNIDADES DINÁMICAS
    temperature_unit: units.temperature_unit || "celsius",
    wind_speed_unit: units.wind_speed_unit || "kmh",
    precipitation_unit: units.precipitation_unit || "mm",
  });

  const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error obteniendo datos del clima");
    
    return (await response.json()) as WeatherData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// --- 3. HELPER PARA FORMATEAR DATOS ---

/**
 * Transforma los datos 'hourly' (arrays separados) en una lista de objetos
 * fácil de recorrer con un .map() en el frontend.
 * * Limita los resultados a las próximas 24 horas por defecto.
 */
export const formatHourlyData = (hourlyData: WeatherData['hourly'], limit = 24) => {
  // Encontramos el índice de la hora actual para no mostrar horas pasadas
  const now = new Date();
  const currentHourIndex = hourlyData.time.findIndex(t => new Date(t) >= now);
  
  // Si no encuentra (ej. fin de pronóstico), empezamos desde 0
  const startIndex = currentHourIndex !== -1 ? currentHourIndex : 0;
  const endIndex = startIndex + limit;

  // Recortamos los arrays y los unimos
  const timeSlice = hourlyData.time.slice(startIndex, endIndex);
  const tempSlice = hourlyData.temperature_2m.slice(startIndex, endIndex);
  const codeSlice = hourlyData.weather_code.slice(startIndex, endIndex);

  return timeSlice.map((time, index) => ({
    time: new Date(time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    temperature: Math.round(tempSlice[index]), // Redondeamos para que se vea mejor
    weatherCode: codeSlice[index]
  }));
};

/**
 * FUNCIÓN MAESTRA:
 * Se encarga de leer la URL, buscar la ciudad y devolver el clima listo.
 * Si falla, devuelve null.
 */
export const loadWeatherFromUrl = async (searchParams: URLSearchParams) => {
  const city = searchParams.get("city") || "Bogota";

  // Extraemos las unidades de la URL del navegador
  const units: WeatherUnits = {
      temperature_unit: (searchParams.get("temperature_unit") as any) || "celsius",
      wind_speed_unit: (searchParams.get("wind_speed_unit") as any) || "kmh",
      precipitation_unit: (searchParams.get("precipitation_unit") as any) || "mm"
  };
  const coords = await getCoordinates(city); // Esto devuelve CityInfo o undefined
  
  if (!coords) return null;

  const weather = await getWeather(coords.latitude, coords.longitude, units);
  
  // TypeScript ahora sabe que 'coords' es de tipo CityInfo
  return weather ? { weather, geo: coords, units } : null;
};

/**
 * Busca sugerencias de ciudades para el autocompletado.
 * Devuelve un array vacío si hay error o no hay resultados.
 */
export const searchCitySuggestions = async (query: string) => {
  // Evitamos llamadas innecesarias si el texto es muy corto
  if (!query || query.length < 2) return [];

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) return [];
    
    const data = (await response.json()) as GeoResult;
    return data.results || [];
  } catch (error) {
    console.error("Error buscando sugerencias:", error);
    return [];
  }
};
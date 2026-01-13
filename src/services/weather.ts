// ==========================================
// SERVICIO DE CLIMA (API CLIENT)
// ==========================================
// Este archivo maneja todas las llamadas a la API externa (Open-Meteo).
// Define los tipos de datos (Interfaces) y las funciones de fetch.

// --- 1. DEFINICIÓN DE TIPOS (INTERFACES) ---

/**
 * Define las unidades de medida preferidas por el usuario.
 * Se pasan como parámetros a la API para obtener los datos en la unidad correcta.
 */
export interface WeatherUnits {
    temperature_unit?: "celsius" | "fahrenheit";
    wind_speed_unit?: "kmh" | "mph" | "kn" | "ms";
    precipitation_unit?: "mm" | "inch";
}

/**
 * Estructura de una ciudad devuelta por la API de Geocoding.
 */
export interface CityInfo {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country: string;
    admin1?: string; // Región/Estado administrativo
}

/**
 * Respuesta de la API de Geocoding.
 */
export interface GeoResult {
    results?: CityInfo[];
}

/**
 * Datos diarios crudos devueltos por la API.
 */
export interface DailyData {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
    precipitation_sum: number[];
}

/**
 * Datos por hora crudos devueltos por la API.
 */
export interface HourlyData {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
}

/**
 * Estructura completa de la respuesta del clima.
 */
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

// --- 2. FUNCIONES DE SERVICIO (API CALLS) ---

/**
 * Busca las coordenadas (latitud/longitud) de una ciudad dada su nombre.
 * Utiliza Open-Meteo Geocoding API.
 * 
 * @param city Nombre de la ciudad a buscar.
 * @returns El primer resultado encontrado (CityInfo) o null si falla.
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
    return null;
  }
};

/**
 * Obtiene el pronóstico meteorológico completo para unas coordenadas específicas.
 * Solicita datos actuales, diarios y por horas.
 * 
 * @param lat Latitud.
 * @param lon Longitud.
 * @param units Configuración de unidades (imperial/métrico).
 * @returns Objeto WeatherData con toda la información.
 */
export const getWeather = async (lat: number, lon: number, units: WeatherUnits ={}) => {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum",
    hourly: "temperature_2m,weather_code",
    timezone: "auto",

    // Configuración dinámica de unidades
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

// --- 3. ORQUESTADOR PRINCIPAL ---

/**
 * FUNCIÓN CONTROLADORA:
 * Coordina el flujo completo de obtención de datos desde la URL.
 * 1. Lee la ciudad y unidad de los parámetros de búsqueda.
 * 2. Obtiene las coordenadas de la ciudad.
 * 3. Obtiene el clima para esas coordenadas.
 * 
 * @param searchParams Objeto URLSearchParams de Astro.url.
 * @returns Objeto combinado { weather, geo, units } o null si algo falla.
 */
export const loadWeatherFromUrl = async (searchParams: URLSearchParams) => {
  // Si no hay ciudad, usamos "Bogota" como fallback
  const city = searchParams.get("city") || "Bogota";

  // Extraemos y casteamos las unidades
  const units: WeatherUnits = {
      temperature_unit: (searchParams.get("temperature_unit") as any) || "celsius",
      wind_speed_unit: (searchParams.get("wind_speed_unit") as any) || "kmh",
      precipitation_unit: (searchParams.get("precipitation_unit") as any) || "mm"
  };

  // Paso 1: Geocodificación
  const coords = await getCoordinates(city);
  
  if (!coords) return null;

  // Paso 2: Pronóstico
  const weather = await getWeather(coords.latitude, coords.longitude, units);
  
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
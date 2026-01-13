// ==========================================
// UTILIDADES DEL CLIMA (HELPERS)
// ==========================================
// Funciones puras para transformar y formatear los datos crudos de la API
// en estructuras fáciles de usar por los componentes de Astro.

import type { DailyData, HourlyData } from "./weather";
import type { WeatherData, CityInfo, WeatherUnits } from "./weather";

/**
 * Filtra y formatea las horas para una fecha específica.
 * Se usa en el componente HourlyForecast para mostrar solo las horas relevantes del día seleccionado.
 * 
 * Lógica:
 * 1. Encuentra el índice donde empieza el día seleccionado.
 * 2. Si es el día de HOY, adelanta el índice a la hora actual (no mostrar horas pasadas).
 * 3. Devuelve un slice de 24 horas a partir de ese punto.
 * 
 * @returns Objeto con arrays recortados de tiempo, temperatura y código de clima.
 */
export const getFilteredHours = (hourly: HourlyData, selectedDate: string) => {
    // 1. Encontrar inicio (00:00 o Hora Actual si es hoy)
    let startIndex = hourly.time.findIndex((t) => t.startsWith(selectedDate));
    if (startIndex === -1) return null;

    const now = new Date();
    // Nota: Usamos 'sv-SE' para obtener formato ISO YYYY-MM-DD local
    const localDate = now.toLocaleDateString('sv-SE'); 

    if (selectedDate === localDate) {
        const currentHourIndex = hourly.time.findIndex(t => new Date(t) >= now);
        if (currentHourIndex !== -1 && currentHourIndex > startIndex) {
            startIndex = currentHourIndex;
        }
    }

    // 2. Traemos 24 HORAS para llenar el carrusel/scroll
    const HOURS_TO_SHOW = 24; 
    const endIndex = startIndex + HOURS_TO_SHOW;

    return {
        time: hourly.time.slice(startIndex, endIndex),
        temperature_2m: hourly.temperature_2m.slice(startIndex, endIndex),
        weather_code: hourly.weather_code.slice(startIndex, endIndex),
    };
};


/**
 * Formatea los datos diarios para el componente DailyForecast.
 * Limita a 7 días y transforma la fecha en nombre del día (ej. "Mon", "Tue").
 * 
 * @returns Array de objetos con día, temps máx/min y código de clima.
 */
export const getFormattedDaily = (daily: DailyData) => {
    return daily.time.slice(0, 7).map((time, i) => {
        // Formatear fecha (Sun, Mon...)
        const dateObj = new Date(time + "T00:00:00");
        const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" });

        return {
            dayName: dayName,
            maxTemp: Math.round(daily.temperature_2m_max[i]),
            minTemp: Math.round(daily.temperature_2m_min[i]),
            code: daily.weather_code[i],
        };
    });
};


/**
 * Prepara los datos para la tarjeta principal (StatCard).
 * Combina datos geográficos, del clima actual y unidades.
 * 
 * @returns Objeto estructurado con toda la info lista para pintar en la UI.
 */
export const getStackCardData = (weather: WeatherData, geo: CityInfo, units: WeatherUnits) => {
    // Definimos los sufijos de unidades basados en la configuración
    const tempUnit = units.temperature_unit === "fahrenheit" ? "°F" : "°C";
    const windUnit = units.wind_speed_unit === "mph" ? "mph" : "km/h";
    const precipUnit = units.precipitation_unit === "inch" ? "in" : "mm";
    
    // Formateamos la fecha actual
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });

    return {
        city: geo.name,
        country: geo.country,
        date: dateStr,
        temp: Math.round(weather.daily.temperature_2m_max[0]),
        tempUnit: tempUnit,
        code: weather.daily.weather_code[0],
        feelsLike: Math.round(weather.current.apparent_temperature),
        humidity: weather.current.relative_humidity_2m,
        wind: Math.round(weather.current.wind_speed_10m),
        windUnit: windUnit,
        precip: weather.daily.precipitation_sum[0],
        precipUnit: precipUnit
    };

};



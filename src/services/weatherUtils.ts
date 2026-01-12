import type { DailyData, HourlyData } from "./weather";
import type { WeatherData, CityInfo } from "./weather";


export const getFilteredHours = (hourly: HourlyData, selectedDate: string) => {
    // 1. Encontrar inicio (00:00 o Hora Actual si es hoy)
    let startIndex = hourly.time.findIndex((t) => t.startsWith(selectedDate));
    if (startIndex === -1) return null;

    const now = new Date();
    // Nota: Usamos 'sv-SE' para obtener YYYY-MM-DD local
    const localDate = now.toLocaleDateString('sv-SE'); 

    if (selectedDate === localDate) {
        const currentHourIndex = hourly.time.findIndex(t => new Date(t) >= now);
        if (currentHourIndex !== -1 && currentHourIndex > startIndex) {
            startIndex = currentHourIndex;
        }
    }

    // 2. Traemos 24 HORAS para llenar el scroll
    const HOURS_TO_SHOW = 24; 
    const endIndex = startIndex + HOURS_TO_SHOW;

    return {
        time: hourly.time.slice(startIndex, endIndex),
        temperature_2m: hourly.temperature_2m.slice(startIndex, endIndex),
        weather_code: hourly.weather_code.slice(startIndex, endIndex),
    };
};


// --- NUEVA: LÓGICA PARA LOS DÍAS (DAILY) ---
// Esta función recibe los datos crudos y devuelve el array limpio listo para pintar
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


export const getStackCardData = (weather: WeatherData, geo: CityInfo) => {
    // 1. Fecha: "Sunday, Jan 11, 2026"
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
        code: weather.daily.weather_code[0],
        // Stats
        feelsLike: Math.round(weather.current.apparent_temperature),
        humidity: weather.current.relative_humidity_2m,
        wind: Math.round(weather.current.wind_speed_10m),
        precip: weather.daily.precipitation_sum[0]
    };
};



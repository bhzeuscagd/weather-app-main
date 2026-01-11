interface HourlyData {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
}

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
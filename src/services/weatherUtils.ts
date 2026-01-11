interface HourlyData {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
}

export const getFilteredHours = (hourly: HourlyData, selectedDate: string) => {
    // 1. Buscamos el rango de índices para el día seleccionado (00:00 a 23:00)
    const indices = hourly.time
        .map((t, i) => (t.startsWith(selectedDate) ? i : -1))
        .filter((i) => i !== -1);

    // Si no hay datos para ese día, retornamos null
    if (indices.length === 0) return null;

    let start = indices[0]; // Por defecto: 00:00
    const end = indices[indices.length - 1] + 1; // El final del día

    // 2. CORRECCIÓN: Ajuste para el día actual ("Hoy")
    const now = new Date();
    
    // Buscamos cuál es el índice que corresponde a "ahora mismo" en toda la lista
    const currentHourIndex = hourly.time.findIndex(t => new Date(t) >= now);

    // Si encontramos la hora actual Y esa hora está dentro del día que estamos viendo...
    // (Ej: Si seleccionaste "Hoy", currentHourIndex estará entre start y end)
    if (currentHourIndex !== -1 && currentHourIndex >= start && currentHourIndex < end) {
        start = currentHourIndex; // Movemos el inicio a la hora actual
    }

    // 3. Devolvemos el array cortado desde el nuevo 'start'
    return {
        time: hourly.time.slice(start, end),
        temperature_2m: hourly.temperature_2m.slice(start, end),
        weather_code: hourly.weather_code.slice(start, end),
    };
};
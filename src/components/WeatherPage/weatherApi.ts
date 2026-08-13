export const weatherApi = async (lat: string, lon: string) => {
    const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,weathercode&timezone=auto`,
    );

    if (!response.ok) throw new Error('Не вдалося завантажити прогноз');
    return await response.json();
}
import type { cityFetch } from "../utills/City";

export const searchCity = async (city: string): Promise<cityFetch[]> => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json`,
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data.filter(
    (el: cityFetch) =>
      el.type === 'town' ||
      el.type === 'city' ||
      el.type === 'administrative' ||
      el.type === 'village',
  );
}

export const searchCityByCords = async (lat: number, lon: number) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  data.name = String(data.address.city);
  return data;
} 
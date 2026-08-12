import { useState } from 'react';

interface Coordinates {
  lat: number;
  lon: number;
}

export const GeoLocationComponent = () => {
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError('Геолокація не підтримується вашим браузером');
      return;
    }

    setLoading(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError('Ви заборонили доступ до геолокації');
            break;
          case err.POSITION_UNAVAILABLE:
            setError('Інформація про місцезнаходження недоступна');
            break;
          case err.TIMEOUT:
            setError('Час очікування запиту минув');
            break;
          default:
            setError('Сталася невідома помилка');
        }
        setLoading(false);
      },
      {
        enableHighAccuracy: true, // Підвищена точність (за наявності GPS)
        timeout: 10000,           // Таймаут 10 секунд
        maximumAge: 0,            // Не використовувати кешовані дані
      }
    );
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 border rounded-xl max-w-sm mx-auto">
      <button
        onClick={getLocation}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {loading ? 'Отримання координат...' : 'Визначити моє місцезнаходження'}
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {coords && (
        <div className="text-slate-700 font-medium">
          <p>Широта (Lat): {coords.lat}</p>
          <p>Довгота (Lon): {coords.lon}</p>
        </div>
      )}
    </div>
  );
};
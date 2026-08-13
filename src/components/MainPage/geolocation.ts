export const getCurrentCoords = (): Promise<GeolocationCoordinates> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Геолокація не підтримується вашим браузером'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(pos.coords),
      (err) => {
        const messages: Record<number, string> = {
          [err.PERMISSION_DENIED]: 'Ви заборонили доступ до геолокації',
          [err.POSITION_UNAVAILABLE]: 'Інформація про місцезнаходження недоступна',
          [err.TIMEOUT]: 'Час очікування запиту минув',
        };
        reject(new Error(messages[err.code] || 'Сталася невідома помилка'));
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  });
};
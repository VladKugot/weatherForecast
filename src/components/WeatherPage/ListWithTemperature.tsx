import { useEffect, useState } from 'react';
import type { HourlyForecast } from '../utills/Weather';

interface Props {
  hourly: HourlyForecast;
  countDay: number;
}

export const ListWithTemperature: React.FC<Props> = ({ hourly, countDay }) => {
  const [dayEnd, setDayEnd] = useState<number | undefined>();

  useEffect(() => {
    if (hourly?.time && hourly.time.length > 0) {
      const firstDateStr = hourly.time[0];
      const currentDay = Number(firstDateStr.split('T')[0].split('-')[2]);
      setDayEnd(currentDay + countDay);
    }
  }, [hourly, countDay]);

  return (
    <div className="flex flex-col gap-1">
      {hourly.time && dayEnd &&
        hourly.time.map((el, index) => {
          if (Number(el.split('T')[0].split('-')[2]) < dayEnd) {
            return <>
                <span id='index'>{el} {hourly.temperature_2m[index]} {hourly.weathercode[index]}</span>
            </>;
          }
        })}
    </div>
  );
};

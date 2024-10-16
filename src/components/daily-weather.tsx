import React, { FC } from 'react';
import { type IList } from '../models/IDailyWeather';

interface DailyWeatherProps {
  nextFiveDays: IList[];
  convert: (value: number) => string;
}

const DailyWeather: FC<DailyWeatherProps> = ({ nextFiveDays, convert }) => {
  return (
    <div className="daily-days-wrapper">
      {nextFiveDays.map((day) =>
        <div className="daily-days-item" key={day.dt_txt}>
          <span>{day.dt_txt.split(' ')[0]}</span>

          <div className="daily-days-item-inner">
            <p>{convert(day.main.temp)}</p>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              width={50} alt=""
            />
          </div>


        </div>
      )}
    </div>
  );
};

export default DailyWeather;
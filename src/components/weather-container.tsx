import React, { useEffect, useState } from 'react';
import { useFetchDailyWeatherQuery } from '../store/rtk/weather';
import { useAppSelector } from '../hooks/use-app-selector';
import Loader from './UI/loader';
import DailyWeather from './daily-weather';
import { type IList } from '../models/IDailyWeather';
import Modal from './UI/modal';

const WeatherContainer = () => {
  const { type, query } = useAppSelector(state => state.weatherReducer);
  const { data, error, isLoading } = useFetchDailyWeatherQuery(query);
  const [nextFiveDays, setNextFiveDays] = useState<IList[]>([]);

  const convert = (fahrenheit: number): string => {
    if (type === 'fahrenheit') return `${fahrenheit.toString()} F`;

    const celsius = (fahrenheit - 32) * 5 / 9;

    return `${Math.round(celsius).toString()} C`;
  };

  function getNextFiveDaysForecast(weatherData: IList[]) {
    const nextFiveDays: IList[] = [];
    const addedDates = new Set();

    if (!Array.isArray(weatherData)) {
      console.error('Invalid weatherData format');
      return nextFiveDays;
    }

    for (const forecast of weatherData) {
      const forecastDate = forecast.dt_txt.split(' ')[0];

      if (!addedDates.has(forecastDate)) {
        nextFiveDays.push(forecast);
        addedDates.add(forecastDate);

        if (nextFiveDays.length === 5) {
          break;
        }
      }
    }

    return nextFiveDays;
  }

  useEffect(() => {
    if (data && Array.isArray(data.list)) {
      const forecast = getNextFiveDaysForecast(data.list);
      setNextFiveDays(forecast);
    } else {
      console.error('Invalid weather data or no list available');
    }
  }, [data]);

  if (!data) return null;
  if (isLoading) return <Loader/>;
  if (error) return (
    <Modal isShow={true} setIsShow={(show) => !show}>
      <h2>Weather not fount!</h2>
    </Modal>
  );

  return (
    <>
      <div className="weather-container">
        <div className="weather-left">
          <strong>{data.city.name}</strong>
          <h2>{convert(data.list[0].main.temp)}</h2>

          <img
            src={`https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`}
            width={200}
            alt=""
          />

          <b>{data.list[0].weather[0].main}</b>
        </div>
        <div className="weather-right">
          {data.list && data.list.slice(0, 4).map((weather) => (
            <div className="weather-daily-item" key={weather.dt_txt}>
              {weather.dt_txt.split(' ')[1]} {convert(weather.main.temp)}
              <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt=""/>
            </div>
          ))}
        </div>
      </div>

      <DailyWeather nextFiveDays={nextFiveDays} convert={convert}/>
    </>
  );
};

export default WeatherContainer;
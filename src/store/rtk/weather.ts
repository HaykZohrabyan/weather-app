import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IDailyWeather } from '../../models/IDailyWeather';

const baseUrl = 'https://api.openweathermap.org/data/2.5/';
const apiKey = 'c8024e1c45b5ab6682821fd42ded89ab';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl
  }),
  tagTypes: ['weather'],
  endpoints: (builder) => ({
    fetchDailyWeather: builder.query<IDailyWeather, string>({
      query: (city: string) => ({
        url: `forecast?q=${city}&exclude=hourly,daily&appid=${apiKey}`
      })
    })
  })
});

export const {
  useFetchDailyWeatherQuery,
  useLazyFetchDailyWeatherQuery
} = weatherApi;
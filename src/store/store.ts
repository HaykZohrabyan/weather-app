import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { weatherApi } from './rtk/weather';
import weatherReducer from './reducers/weather.slice';

const rootReducer = combineReducers({
  weatherReducer,
  [weatherApi.reducerPath]: weatherApi.reducer
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(weatherApi.middleware)
  });
};

export const store = setupStore();
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

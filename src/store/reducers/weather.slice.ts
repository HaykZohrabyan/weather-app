import { createSlice } from '@reduxjs/toolkit';

interface WeatherSlice {
  type: 'fahrenheit' | 'celsius';
  query: string;
  openModal: boolean
}

const initialState: WeatherSlice = {
  type: 'fahrenheit',
  query: 'yerevan',
  openModal: false,
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    changeWeatherType(state, action) {
      state.type = action.payload;
    },
    search(state, action) {
      state.query = action.payload;
    },
    showErrorModal(state, action) {
      state.openModal = action.payload;
    }
  }
});

export default weatherSlice.reducer;
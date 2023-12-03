import { configureStore } from '@reduxjs/toolkit';
import dataSlice from './features/data/dataSlice';
import countriesSlice from './features/countries/countriesSlice';

export const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
    countries: countriesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof store.dispatch>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import dataSlice from './features/data/dataSlice';

export const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof store.dispatch>;
export type AppDispatch = typeof store.dispatch;

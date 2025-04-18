import { configureStore } from '@reduxjs/toolkit';
import deliveriesSlice from './slices/deliveriesSlice';

export const store = configureStore({
  reducer: {
    deliveries: deliveriesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

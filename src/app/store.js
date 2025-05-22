import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import itemsReducer from '../features/items/itemsSlice';
import otherCostsReducer from '../features/otherCosts/otherCostsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    items: itemsReducer,
    otherCosts: otherCostsReducer,
  },
});
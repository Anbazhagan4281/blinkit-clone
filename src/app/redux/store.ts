// store.ts
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
	reducer: {
		cart: cartReducer, // Add cart reducer here
	},
});

// redux/slices/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Item {
	id: string;
	name: string;
	weight: string;
	price: string;
	image: string;
	quantity: number;  // Add a quantity field to track item count
}

interface CartState {
	items: Item[];
}

const initialState: CartState = {
	items: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<Item>) => {
			const existingItem = state.items.find(item => item.id === action.payload.id);
			if (existingItem) {
				// If item exists, increase its quantity
				existingItem.quantity += 1;
			} else {
				// Otherwise, add the item with quantity 1
				state.items.push({ ...action.payload, quantity: 1 });
			}
		},
		removeItem: (state, action: PayloadAction<string>) => {
			// Remove item from cart by id
			state.items = state.items.filter(item => item.id !== action.payload);
		},
		decreaseQuantity: (state, action: PayloadAction<string>) => {
			const existingItem = state.items.find(item => item.id === action.payload);
			if (existingItem && existingItem.quantity > 1) {
				existingItem.quantity -= 1; // Decrease quantity
			} else if (existingItem && existingItem.quantity === 1) {
				// If quantity is 1, remove the item
				state.items = state.items.filter(item => item.id !== action.payload);
			}
		},
		increaseQuantity: (state, action: PayloadAction<string>) => {
			const existingItem = state.items.find(item => item.id === action.payload);
			if (existingItem) {
				existingItem.quantity += 1; // Increase quantity
			}
		},
	},
});

export const { addItem, removeItem, decreaseQuantity, increaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;

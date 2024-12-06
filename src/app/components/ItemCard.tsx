// components/ItemCard.tsx
'use client';

import { useDispatch, useSelector } from 'react-redux';
import { addItem, decreaseQuantity, increaseQuantity } from '../redux/slices/cartSlice';

interface Item {
  id: string;
  name: string;
  weight: string;
  price: string;
  image: string;
}

export const ItemCard: React.FC<{ item: Item }> = ({ item }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.items); // Access cart items from Redux

  // Find the item in the cart (if exists)
  const cartItem = cartItems.find((cartItem: Item) => cartItem.name === item.name);

  const handleAddToCart = () => {
    dispatch(addItem(item));
  };

  const handleDecreaseQuantity = () => {
    dispatch(decreaseQuantity(item.id));
  };

  const handleIncreaseQuantity = () => {
    dispatch(increaseQuantity(item.id));
  };

  return (
    <div className="relative flex-shrink-0 w-48 h-[280px] border border-gray-200 rounded-lg p-4 shadow-md mb-4 mx-2">
      <div className="relative h-1/2">
        <img
          src={item.image}
          alt={item.name}
          className="object-cover w-full h-full rounded-t-lg"
        />
      </div>
      <div className="flex flex-col mt-4 h-1/2 p-2 rounded-b-lg">
        <p className="font-bold text-xs">{item.name}</p>
        <p className="text-sm text-gray-600">{item.weight}</p>
        <div className="flex justify-between items-center mt-auto">
          <p className="text-md">₹{item.price}</p>
          
          {/* If item is in the cart, show quantity controls */}
          {cartItem ? (
            <div className="flex items-center">
              <button
                className="py-1 px-2 text-lg border-[1px] text-white border-green-500 bg-green-500"
                onClick={handleDecreaseQuantity}
              >
                -
              </button>
              <button className="mx-2">{cartItem.quantity}</button>
              <button
                className="py-1 px-2 text-lg border-[1px] text-white border-green-500 bg-green-500"
                onClick={handleIncreaseQuantity}
              >
                +
              </button>
            </div>
          ) : (
            <button
              className="py-1 px-4 rounded border-[1px] text-green-500 border-green-500 transition-all"
              onClick={handleAddToCart}
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

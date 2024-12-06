// components/CartDrawer.tsx
'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, decreaseQuantity, increaseQuantity } from '../redux/slices/cartSlice';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.items); // Access cart items from Redux

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id)); // Dispatch removeItem action to remove item from the cart
  };

  const handleDecreaseQuantity = (id: string) => {
    dispatch(decreaseQuantity(id)); // Dispatch decreaseQuantity action
  };

  const handleIncreaseQuantity = (id: string) => {
    dispatch(increaseQuantity(id)); // Dispatch increaseQuantity action
  };

  // Calculate total, saved, and other charges
  const itemsTotal = cartItems.reduce((total: number, item: any) => total + (parseFloat(item.price.replace('₹', '')) * item.quantity), 0);
  const savedAmount = 3; // You can adjust based on any discounts or offers
  const deliveryCharge = 25;
  const handlingCharge = 5;
  const grandTotal = itemsTotal - savedAmount + deliveryCharge + handlingCharge;

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} z-20`}
      onClick={onClose}
    >
      <div
        className={`fixed top-0 right-0 w-80 h-full bg-white p-4 overflow-y-auto transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
      >
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            {/* Items List */}
            <ul className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <li key={item.id} className="flex space-x-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.weight}</p>
                    <p className="text-md text-gray-800">₹{item.price}</p>
                    <div className="flex items-center">
                      <button
                        className="text-red-600"
                        onClick={() => handleDecreaseQuantity(item.id)}
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="text-green-600"
                        onClick={() => handleIncreaseQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="text-red-600"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            {/* Bill Summary */}
            <div className="border-t-2 border-gray-300 pt-4">
              <div className="flex justify-between mb-2">
                <span>Items Total</span>
                <span>₹{itemsTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Saved</span>
                <span>₹{savedAmount}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Delivery Charge</span>
                <span>₹{deliveryCharge} FREE</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Handling Charge</span>
                <span>₹{handlingCharge}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mb-4">
                <span>Total</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>

              {/* Cancellation Policy */}
              <p className="text-sm text-gray-500 mb-4">
                Cancellation Policy: Orders cannot be cancelled once packed for delivery. In case of unexpected delays, a refund will be provided, if applicable.
              </p>

              <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 w-full"
                onClick={onClose}
              >
                Login to Proceed
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;

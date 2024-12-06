
'use client';
import { bestSellers } from "../helper";
// import { BestSellerCard } from "./BestSellerCard";

export const BestSellers: React.FC = () => (
  <div className="container mx-auto px-4 py-6">
    <h3 className="text-xl font-bold mb-4">Best Sellers</h3>
    <div
      className="flex overflow-x-auto scrollbar-hide space-x-4 py-2"
      style={{ scrollBehavior: 'smooth', overscrollBehavior: 'contain' }}
    >
      {bestSellers.map((item) => (
        <div
          key={item.id}
          className="flex-shrink-0 w-40 border border-gray-200 rounded-lg p-4 shadow-md"
        >
          {/* Image */}
          <img
            src={item.image}
            alt={item.name}
            className="object-cover w-full h-24 rounded-t-lg mb-2"
          />
          {/* Name */}
          <p className="font-bold text-sm">{item.name}</p>
          {/* Weight */}
          <p className="text-xs text-gray-600">{item.weight}</p>
          {/* Price and Add Button */}
          <div className="flex justify-between items-center mt-3">
            <p className="text-green-600 font-semibold text-sm">{item.price}</p>
            <button className="py-1 text-xs px-4 rounded border-[1px] text-green-500 border-green-500 transition-all">
              Add
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);


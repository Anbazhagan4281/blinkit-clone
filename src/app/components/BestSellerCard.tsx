'use client';

interface Item {
  id: string;
  name: string;
  weight: string;
  price: string;
  image: string;
}


export const BestSellerCard: React.FC<{ item: Item }> = ({ item }) => (
  <div className="flex items-center border border-gray-200 rounded-lg p-4 shadow-md mb-4">
    <img
      src={item.image}
      alt={item.name}
      className="object-cover w-24 h-24 rounded-md"
    />
    <div className="ml-4 flex flex-col justify-between">
      <p className="font-bold text-md">{item.name}</p>
      <p className="text-sm text-gray-600">{item.weight}</p>
      <div className="flex justify-between items-center mt-2">
        <p className="text-green-600 font-semibold">{item.price}</p>
        <button className="py-1 px-4 rounded bg-green-600 text-white transition-all hover:bg-green-700">
          Add
        </button>
      </div>
    </div>
  </div>
);

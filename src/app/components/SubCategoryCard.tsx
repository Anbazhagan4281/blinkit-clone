
'use client';

export const SubCategoryCard: React.FC<{ name: string; image: string }> = ({ name, image }) => (
  <div className="flex flex-col items-center bg-white rounded-lg transition-transform transform hover:scale-105">
    <img
      src={image}
      alt={name}
      className="object-cover rounded-t-lg w-full h-40"
    />
    <p className="text-center mt-2 font-bold">{name}</p>
  </div>
);

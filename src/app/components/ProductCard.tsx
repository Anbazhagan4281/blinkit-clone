interface ProductCardProps {
  name: string;
  price: string;
  imageUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, imageUrl }) => {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden">
      <img className="w-full h-48 object-cover" src={imageUrl} alt={name} />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-xl font-bold text-blue-600">{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;

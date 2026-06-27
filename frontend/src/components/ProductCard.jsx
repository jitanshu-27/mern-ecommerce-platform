import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 shadow">

      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover rounded"
      />

      <h2 className="text-xl font-bold mt-3">
        {product.name}
      </h2>

      <p className="text-gray-600">
        ₹{product.price}
      </p>

      <Link
        to={`/product/${product._id}`}
        className="inline-block mt-3 bg-black text-white px-4 py-2 rounded"
      >
        View Product
      </Link>

    </div>
  );
};

export default ProductCard;
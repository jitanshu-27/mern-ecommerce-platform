import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

import api from "../services/api";

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/products/${id}`);

      setProduct(data.product);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!product) {
    return <h1>Product Not Found</h1>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-10">

      <div>
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-lg"
        />
      </div>

      <div>

        <h1 className="text-4xl font-bold">
          {product.name}
        </h1>

        <p className="mt-4 text-gray-600">
          {product.description}
        </p>

        <h2 className="text-3xl font-bold mt-6">
          ₹{product.price}
        </h2>

        <p className="mt-4">
          Rating: {product.rating}
        </p>

        <p>
          Reviews: {product.numReviews}
        </p>

        <button
                onClick={() => addToCart(product)}
                disabled={product.countInStock === 0}
                className="mt-6 bg-black text-white px-6 py-3 rounded disabled:opacity-50"
              >
              {product.countInStock > 0
                ? "Add To Cart"
                : "Out Of Stock"}
        </button>

        <p className="mt-4">
          Brand: {product.brand}
        </p>

        <p>
          Category: {product.category}
        </p>

        <p>
          Stock: {product.countInStock}
        </p>

      </div>

    </div>
  );
};

export default ProductPage;
import { useEffect, useState } from "react";

import api from "../services/api";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

 const fetchProducts = async () => {
  try {
    const { data } = await api.get(
      `/products?keyword=${keyword}&category=${category}&page=${page}&min=${min}&max=${max}`
    );

    setProducts(data.products);
    setPages(data.pages);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  const delay = setTimeout(() => {
    fetchProducts();
  }, 500);

  return () => clearTimeout(delay);
}, [keyword, category, page, min, max]);


    if (loading) {
      return (
        <div className="grid md:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
        </div>
      );
    }

  return (
  <div>
    
    {loading ? (
      <h1>Loading...</h1>
    ) : (
      <>
        <h1 className="text-4xl font-bold mb-8">
          Latest Products
        </h1>
         
        <input
          type="text"
          placeholder="Search products..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border p-3 w-full mb-4 rounded"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-3 rounded mb-4 w-full"
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="home">Home</option>
        </select>

        <div className="flex gap-4 mb-6">
          <input
            type="number"
            placeholder="Min Price"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            className="border p-3 rounded w-full"
          />

          <input
            type="number"
            placeholder="Max Price"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            className="border p-3 rounded w-full"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>

        <div className="flex gap-2 mt-8">
          {[...Array(pages).keys()].map((x) => (
            <button
              key={x + 1}
              onClick={() => setPage(x + 1)}
              className={`px-4 py-2 border rounded ${
                page === x + 1
                  ? "bg-black text-white"
                  : ""
              }`}
            >
              {x + 1}
            </button>
          ))}
        </div>
      </>
    )}
  </div>
);
};

export default HomePage;
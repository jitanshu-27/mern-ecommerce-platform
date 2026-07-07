import { useEffect, useState } from "react";
import api from "../../services/api";

const ProductsPage = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {

      const { data } =
        await api.get("/products/admin");

      setProducts(data.products);

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Products
        </h1>

        <button
          className="bg-black text-white px-5 py-2 rounded"
        >
          Add Product
        </button>

      </div>

      <table className="w-full border">

        <thead>

          <tr className="bg-gray-200">

            <th className="p-3">
              Image
            </th>

            <th>Name</th>

            <th>Price</th>

            <th>Stock</th>

            <th>Category</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {products.map((product) => (

            <tr
              key={product._id}
              className="border-t text-center"
            >

              <td className="p-3">

                <img
                  src={`http://localhost:5000${product.image}`}
                  alt={product.name}
                  className="w-16 h-16 object-cover mx-auto"
                />

              </td>

              <td>{product.name}</td>

              <td>₹{product.price}</td>

              <td>{product.countInStock}</td>

              <td>{product.category}</td>

              <td>

                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>

                <button
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

};

export default ProductsPage;
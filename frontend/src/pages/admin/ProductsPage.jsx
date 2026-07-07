import { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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

  const deleteHandler = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmDelete) return;

  try {
    await api.delete(`/products/${id}`);

    toast.success("Product Deleted Successfully");

    fetchProducts();

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Delete Failed"
    );
  }
};

  return (

    <div className="p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Products
        </h1>

        <Link
          to="/admin/products/create"
          className="bg-black text-white px-5 py-2 rounded"
        >
          Add Product
        </Link>

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

                <Link
                  to={`/admin/products/${product._id}/edit`}
                  className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </Link>

                <button
                  onClick={() =>
                    deleteHandler(product._id)
                  }
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
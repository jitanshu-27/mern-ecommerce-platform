import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";

const CreateProductPage = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    price: "",
    countInStock: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {

      await api.post("/products", formData);

      toast.success("Product Created");

      navigate("/admin/products");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed"
      );

    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-6">
        Add Product
      </h1>

      <form
        onSubmit={submitHandler}
        className="space-y-4"
      >

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          className="border w-full p-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="border w-full p-3 rounded"
        />

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          onChange={handleChange}
          className="border w-full p-3 rounded"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          onChange={handleChange}
          className="border w-full p-3 rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          className="border w-full p-3 rounded"
        />

        <input
          type="number"
          name="countInStock"
          placeholder="Stock"
          onChange={handleChange}
          className="border w-full p-3 rounded"
        />

        <input
          type="text"
          name="image"
          placeholder="/uploads/iphone.jpg"
          onChange={handleChange}
          className="border w-full p-3 rounded"
        />

        <button
          className="bg-black text-white px-6 py-3 rounded"
        >
          Create Product
        </button>

      </form>

    </div>
  );
};

export default CreateProductPage;
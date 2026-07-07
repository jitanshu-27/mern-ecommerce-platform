import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";

const EditProductPage = () => {

  const { id } = useParams();

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

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {

      const { data } = await api.get(`/products/${id}`);

      setFormData(data.product);

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {

      await api.put(
        `/products/${id}`,
        formData
      );

      toast.success("Product Updated");

      navigate("/admin/products");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Update Failed"
      );

    }
  };

  return (

    <div className="max-w-2xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-6">
        Edit Product
      </h1>

      <form
        onSubmit={submitHandler}
        className="space-y-4"
      >

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border w-full p-3 rounded"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border w-full p-3 rounded"
        />

        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          className="border w-full p-3 rounded"
        />

        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border w-full p-3 rounded"
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="border w-full p-3 rounded"
        />

        <input
          type="number"
          name="countInStock"
          value={formData.countInStock}
          onChange={handleChange}
          className="border w-full p-3 rounded"
        />

        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="border w-full p-3 rounded"
        />

        <button
          className="bg-black text-white px-6 py-3 rounded"
        >
          Update Product
        </button>

      </form>

    </div>

  );

};

export default EditProductPage;
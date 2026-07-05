import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../services/api";

const PlaceOrderPage = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    shippingAddress,
  } = useCart();

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const shippingPrice = 0;
  const taxPrice = 0;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrderHandler = async () => {
    try {
      const orderItems = cartItems.map((item) => ({
        product: item._id,
        name: item.name,
        qty: item.qty,
        image: item.image,
        price: item.price,
      }));

      const { data } = await api.post("/orders", {
        orderItems,
        shippingAddress,
        paymentMethod: "Razorpay",
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });

      localStorage.setItem(
        "tempOrderId",
        data.order._id
      );

      navigate("/payment");

    } catch (err) {
      alert("Order creation failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Place Order
      </h1>

      <h2 className="text-xl">
        Total: ₹{totalPrice}
      </h2>

      <button
        onClick={placeOrderHandler}
        className="mt-6 bg-black text-white px-6 py-3 rounded"
      >
        Place Order
      </button>

    </div>
  );
};

export default PlaceOrderPage;
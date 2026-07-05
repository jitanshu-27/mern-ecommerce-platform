import { useNavigate } from "react-router-dom";

import api from "../services/api";

import loadRazorpay from "../utils/loadRazorpay";

import { useCart } from "../context/CartContext";

const PaymentPage = () => {

  const navigate = useNavigate();

  const {
    cartItems,
    shippingAddress,
  } = useCart();

  const totalPrice =
    cartItems.reduce(
      (acc, item) =>
        acc + item.price * item.qty,
      0
    );

  const paymentHandler =
    async () => {

      const loaded =
        await loadRazorpay();

      if (!loaded) {
        alert(
          "Razorpay SDK Failed"
        );
        return;
      }

      try {

        const { data } =
          await api.post(
            "/payment/create-order",
            {
              amount:
                totalPrice,
            }
          );

        const options = {
          key:
            import.meta.env
              .VITE_RAZORPAY_KEY,

          amount:
            data.order.amount,

          currency:
            data.order.currency,

          name:
            "MERN Shop",

          description:
            "Order Payment",

          order_id:
            data.order.id,

          handler:
            async (
              response
            ) => {

              await api.post(
                "/payment/verify",
                {
                  razorpay_order_id:
                    response.razorpay_order_id,

                  razorpay_payment_id:
                    response.razorpay_payment_id,

                  razorpay_signature:
                    response.razorpay_signature,

                  orderId:
                    localStorage.getItem(
                      "tempOrderId"
                    ),
                }
              );

              localStorage.removeItem("tempOrderId");

              navigate(
                "/success"
              );
            },
        };

        const razorpay =
          new window.Razorpay(
            options
          );

        razorpay.open();

      } catch (error) {
        alert(
          "Payment Failed"
        );
      }
    };

  return (
    <div>

      <h1 className="text-4xl font-bold">
        Payment
      </h1>

      <h2 className="mt-6 text-2xl">
        Total:
        ₹{totalPrice}
      </h2>

      <button
        onClick={
          paymentHandler
        }
        className="mt-6 bg-black text-white px-6 py-3 rounded"
      >
        Pay Now
      </button>

    </div>
  );
};

export default PaymentPage;
import {
  useEffect,
  useState,
} from "react";

import api from "../services/api";

const MyOrdersPage = () => {
  const [orders, setOrders] =
    useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders =
    async () => {
      try {
        const { data } =
          await api.get(
            "/orders/myorders"
          );

        setOrders(
          data.orders
        );
      } catch (error) {
        alert(
          "Failed to load orders"
        );
      }
    };

  return (
    <div>

      <h1 className="text-4xl font-bold mb-8">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p>
          No orders yet
        </p>
      ) : (
        <div className="space-y-4">

          {orders.map(
            (order) => (
              <div
                key={order._id}
                className="border p-4 rounded"
              >
                <p>
                  Order ID:
                  {order._id}
                </p>

                <p>
                  Total:
                  ₹
                  {
                    order.totalPrice
                  }
                </p>

                <p>
                  Paid:
                  {order.isPaid
                    ? "Yes"
                    : "No"}
                </p>
              </div>
            )
          )}

        </div>
      )}

    </div>
  );
};

export default MyOrdersPage;
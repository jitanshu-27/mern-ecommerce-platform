import { useCart } from "../context/CartContext";

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
  } = useCart();

  const totalPrice = cartItems.reduce(
    (acc, item) =>
      acc + item.price * item.qty,
    0
  );

  return (
    <div>

      <h1 className="text-4xl font-bold mb-8">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <h2>Your cart is empty</h2>
      ) : (
        <>
          <div className="space-y-4">

            {cartItems.map((item) => (
              <div
                key={item._id}
                className="border p-4 rounded flex justify-between"
              >
                <div>

                  <h3 className="font-bold">
                    {item.name}
                  </h3>

                  <p>
                    ₹{item.price}
                  </p>

                  <p>
                    Qty: {item.qty}
                  </p>

                </div>

                <button
                  onClick={() =>
                    removeFromCart(item._id)
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>

              </div>
            ))}

          </div>

          <div className="mt-8">

            <h2 className="text-2xl font-bold">
              Total: ₹{totalPrice}
            </h2>

          </div>
        </>
      )}

    </div>
  );
};

export default CartPage;
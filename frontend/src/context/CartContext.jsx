import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart
      ? JSON.parse(savedCart)
      : [];
  });

  const [shippingAddress, setShippingAddress] =
  useState(() => {
    const savedAddress =
      localStorage.getItem(
        "shippingAddress"
      );

    return savedAddress
      ? JSON.parse(savedAddress)
      : {
          address: "",
          city: "",
          postalCode: "",
          country: "",
        };
  });

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  const saveShippingAddress = (
  data
) => {
  setShippingAddress(data);

  localStorage.setItem(
    "shippingAddress",
    JSON.stringify(data)
  );
};

  const addToCart = (product) => {
    const exists = cartItems.find(
      (item) => item._id === product._id
    );

    if (exists) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id
            ? {
                ...item,
                qty: item.qty + 1,
              }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          ...product,
          qty: 1,
        },
      ]);
    }
  };

  const removeFromCart = (id) => {
  const product = cartItems.find(
    (item) => item._id === id
  );

  if (!product) return;

  if (product.qty === 1) {
    setCartItems(
      cartItems.filter(
        (item) => item._id !== id
      )
    );
  } else {
    setCartItems(
      cartItems.map((item) =>
        item._id === id
          ? {
              ...item,
              qty: item.qty - 1,
            }
          : item
      )
    );
  }
};

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        shippingAddress,
        saveShippingAddress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () =>
  useContext(CartContext);
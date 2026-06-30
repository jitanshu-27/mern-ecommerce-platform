import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { cartItems } = useCart();
  const { userInfo, logout } = useAuth();
  return (
    <nav className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex justify-between items-center h-16">

          <Link
            to="/"
            className="text-2xl font-bold"
          >
            MERN Shop
          </Link>

          <div className="flex gap-6">

            <Link to="/">
              Home
            </Link>

            <Link to="/cart">
              Cart ({cartItems.length})
            </Link>

            {
              userInfo ? (
                <>
                  <Link to="/profile">
                    Profile
                  </Link>

                  <button
                    onClick={logout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login">
                  Login
                </Link>
              )
            }

          </div>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, ShoppingCart } from "lucide-react";

const Navbar = () => {
  const location = useLocation(); // Get the current path
  const navigate = useNavigate(); // Use for programmatic navigation

  const togglePage = () => {
    if (location.pathname === "/") {
      navigate("/cart"); // If on Home, go to Cart
    } else {
      navigate("/"); // If on Cart, go to Home
    }
  };

  return (
    <div className="bottom-4 left-1/2 fixed flex gap-4 bg-gray-900 dark:bg-gray-800 shadow-lg p-3 rounded-full text-white -translate-x-1/2 transform">
      <button onClick={togglePage} className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full transition">
        {location.pathname === "/" ? <ShoppingCart size={24} /> : <Home size={24} />}
      </button>
    </div>
  );
};

export default Navbar;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

function App() {
  const [cart, setCart] = useState([]);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decreaseQuantity = (id) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item));
  };

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-bold text-3xl">🛒 Shopping App</h1>
          <button 
            onClick={toggleDarkMode}
            className="bg-gray-700 hover:bg-gray-800 shadow-lg px-4 py-2 rounded-lg text-white transition"
          >
            {darkMode ? "☀️" : "🌙 "}
          </button>
        </div>
        <Router>
          <Routes>
            <Route path="/" element={<ProductList cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />} />
            <Route path="/cart" element={<Cart cart={cart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeFromCart={removeFromCart} />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;

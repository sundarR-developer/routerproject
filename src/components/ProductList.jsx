import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = ({ cart, addToCart, removeFromCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="mx-auto px-4 py-8 container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-indigo-600 dark:text-indigo-400 text-3xl">🛍️ Trending Products</h1>
        <Link to="/cart" className="bg-indigo-600 hover:bg-indigo-700 shadow-lg px-5 py-2 rounded-lg text-white transition">
          🛒 ({cart.length})
        </Link>
      </div>

      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => {
          const inCart = cart.find((item) => item.id === product.id);

          return (
            <div key={product.id} className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl rounded-xl overflow-hidden hover:scale-105 transition duration-300 transform">
              <div className="p-4">
                <img src={product.image} alt={product.title} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md w-full h-48 object-contain" />
                <div className="mt-4">
                  <h2 className="font-semibold text-gray-800 dark:text-white text-lg truncate">{product.title}</h2>
                  <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm line-clamp-3">{product.description.slice(0, 70)}...</p>

                  <p className="mt-3 font-bold text-green-600 dark:text-green-400 text-xl">${product.price}</p>

                  {inCart ? (
                    <button onClick={() => removeFromCart(product.id)} className="bg-red-500 hover:bg-red-600 mt-3 py-2 rounded-lg w-full font-medium text-white transition">
                      ❌ Remove from Cart
                    </button>
                  ) : (
                    <button onClick={() => addToCart(product)} className="bg-green-500 hover:bg-green-600 mt-3 py-2 rounded-lg w-full font-medium text-white transition">
                      ➕ Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;

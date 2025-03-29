import { Link } from "react-router-dom";
import { Home } from "lucide-react"; // Import Home icon

const Cart = ({ cart, increaseQuantity, decreaseQuantity, removeFromCart }) => {
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = (totalPrice * 0.10).toFixed(2);
  const finalPrice = (totalPrice - discount).toFixed(2);

  return (
    <div className="mx-auto px-4 py-8 container">
      {/* Header with navigation back to home */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-gray-800 dark:text-gray-500 text-2xl md:text-3xl">🛒 Your Cart</h1>

        {/* Home Button (Icon Only) */}
        <Link to="/" className="bg-gray-700 hover:bg-gray-800 p-2 rounded-lg text-white transition">
          <Home size={24} />
        </Link>
      </div>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-lg text-center">Your cart is empty.</p>
      ) : (
        <div className="flex md:flex-row flex-col gap-6">
          {/* Cart Items - Scrollable on Mobile */}
          <div className="flex-1 max-h-[400px] md:max-h-none overflow-auto">
            {cart.map((item) => (
              <div key={item.id} className="flex sm:flex-row flex-col items-center bg-white dark:bg-gray-800 shadow-md mb-4 p-4 border rounded-lg">
                <img src={item.image} alt={item.title} className="bg-gray-100 dark:bg-gray-700 mr-4 p-2 rounded-md w-16 h-16 object-contain" />
                <div className="flex-grow sm:text-left text-center">
                  <h2 className="font-semibold text-gray-900 dark:text-white text-lg">{item.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300">${item.price} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                
                {/* Quantity Controls */}
                <div className="flex items-center mt-3 sm:mt-0">
                  <button onClick={() => decreaseQuantity(item.id)} className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 p-2 rounded-lg text-black dark:text-white transition">
                    ➖
                  </button>
                  <span className="mx-2 font-bold text-black dark:text-black text-lg">{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)} className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 p-2 rounded-lg text-black dark:text-white transition">
                    ➕
                  </button>
                </div>

                {/* Remove Button */}
                <button onClick={() => removeFromCart(item.id)} className="bg-black hover:bg-red-600 mt-3 sm:mt-0 sm:ml-4 p-2 rounded-lg text-white transition">
                  🗑️
                </button>
              </div>
            ))}
          </div>

          {/* Sticky Cart Summary on Desktop */}
          <div className="top-4 sticky bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg md:w-1/3">
            <h2 className="font-bold text-gray-900 dark:text-white text-xl">Order Summary</h2>
            <p className="text-gray-600 dark:text-gray-300">Subtotal: <span className="font-semibold">${totalPrice.toFixed(2)}</span></p>
            <p className="font-medium text-red-500">Discount (10%): -${discount}</p>
            <h2 className="font-bold text-green-600 dark:text-green-400 text-2xl">Final Price: ${finalPrice}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

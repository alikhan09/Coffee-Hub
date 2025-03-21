import React, { useState } from "react";

const Cart = ({ cart, clearCart }) => {
  const [showCart, setShowCart] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart(); // Clears the cart after placing the order
      setOrderPlaced(false);
      setShowCart(false);
    }, 2000);
  };

  return (
    <div>
      {/* Floating Cart Button */}
      <button
        onClick={() => setShowCart(!showCart)}
        className="fixed bottom-6 right-6 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg"
      >
        🛒 {cart.length}
      </button>

      {/* Cart Popup */}
      {showCart && (
        <div className="fixed bottom-16 right-6 bg-white shadow-lg p-4 rounded-lg w-64">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">Cart is empty</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between my-2">
                  <span>{item.name} x{item.quantity}</span>
                  <span>${item.price * item.quantity}</span>
                </div>
              ))}
              <hr />
              <p className="text-right font-bold">Total: ${total}</p>
              <button
                onClick={handlePlaceOrder}
                className="mt-4 w-full bg-green-500 text-white py-2 rounded"
              >
                Place Order
              </button>
            </>
          )}
        </div>
      )}

      {/* Order Confirmation Message */}
      {orderPlaced && (
        <div className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          Order Placed Successfully! ✅
        </div>
      )}
    </div>
  );
};

export default Cart;

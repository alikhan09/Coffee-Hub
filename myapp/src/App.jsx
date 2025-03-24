import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./components/Cart";
import Footer from "./components/Footer";

const App = () => {
  const [page, setPage] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Add item to cart
  const addToCart = (itemToAdd) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.name === itemToAdd.name && item.price === itemToAdd.price
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.name === itemToAdd.name && item.price === itemToAdd.price
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...itemToAdd, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (itemToRemove) => {
    setCart((prevCart) => {
      return prevCart.reduce((newCart, item) => {
        if (item.name === itemToRemove.name && item.price === itemToRemove.price) {
          if (item.quantity > 1) {
            newCart.push({ ...item, quantity: item.quantity - 1 });
          }
          // If quantity is 1, we don't push it (removes from cart)
        } else {
          newCart.push(item);
        }
        return newCart;
      }, []);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar setPage={setPage} setSelectedCategory={setSelectedCategory} />

      {/* Page Routing */}
      <div className="mt-16 p-6 flex-grow">
  {/* Show Home Page */}
  {page === "home" && !selectedCategory && <Home selectCategory={setSelectedCategory} />}

  {/* Show Menu when a category is selected */}
  {page === "home" && selectedCategory && (
    <Menu
      category={selectedCategory}
      goBack={() => setSelectedCategory(null)}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      cart={cart}
    />
  )}

  {/* About Page: Reset selectedCategory first */}
  {page === "about" && (
    <>
      {selectedCategory && setSelectedCategory(null)}
      <About />
    </>
  )}

  {/* Contact Page: Reset selectedCategory first */}
  {page === "contact" && (
    <>
      {selectedCategory && setSelectedCategory(null)}
      <Contact />
    </>
  )}
</div>

      {/* Cart Component (Always Visible) */}
      {cart.length > 0 && <Cart cart={cart} clearCart={clearCart} />}

      {/* Footer (Visible only on Home Page) */}
      {page === "home" && !selectedCategory && <Footer />}
    </div>
  );
};

export default App;

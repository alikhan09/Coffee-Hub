import React from "react";

const About = () => {
  return (
    <div className="relative bg-cover bg-center min-h-screen flex flex-col justify-center items-center text-white px-6"
      style={{ backgroundImage: "url('/assets/latte.jpg')" }}>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative text-center max-w-3xl">
        <h1 className="text-4xl font-bold mb-4 text-yellow-400 drop-shadow-lg">
          Welcome to Coffee Hub ☕🍔
        </h1>
        <p className="text-lg text-gray-200 mb-6 leading-relaxed">
          Located in the heart of <strong>Lahore</strong>, Coffee Hub is your go-to spot for **delicious coffee, juicy burgers, crispy pizzas, and authentic desi food**.  
          We take pride in serving fresh, high-quality meals made with love and passion.
        </p>

        {/* What We Offer Section */}
        <div className="bg-gray-900 bg-opacity-80 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🍽️ What We Offer</h2>
          <ul className="text-gray-300 text-lg space-y-2">
            <li>☕ **Premium Coffee** - From espresso to cappuccino, experience rich flavors.</li>
            <li>🍔 **Mouthwatering Burgers** - Juicy, grilled to perfection, and packed with taste.</li>
            <li>🍕 **Crispy Pizzas** - Freshly baked with a variety of toppings to choose from.</li>
            <li>🍛 **Authentic Desi Food** - Enjoy biryani, karahi, and traditional Pakistani delights.</li>
            <li>🥤 **Refreshing Beverages** - Cool down with our fresh juices and milkshakes.</li>
          </ul>
        </div>

        {/* Location */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-2">📍 Our Location</h2>
          <p className="text-gray-300 text-lg">
            **123 Food Street, Gulberg, Lahore, Pakistan**  
            Open daily from **10 AM to 11 PM**
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

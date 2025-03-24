import React from "react";
import { motion } from "framer-motion";
import images from "../utils/importimages";

const Menu = ({ category, goBack, addToCart, removeFromCart, cart }) => {
  const items = {
    Coffee: [
      { id: 1, name: "Espresso", price: 250, quantity: 0, image: images.espresso },
      { id: 2, name: "Latte", price: 300, quantity: 0, image: images.latte },
      { id: 3, name: "Cappuccino", price: 300, quantity: 0, image: images.cappuccino },
      { id: 4, name: "Ice Mocha", price: 250, quantity: 0, image: images.icemocha },
      { id: 5, name: "Double Chocolate Mocha", price: 300, quantity: 0, image: images.doublechocolate },
      { id: 6, name: "Black Coffee", price: 300, quantity: 0, image: images.blackcoffee },
    ],
    Burgers: [
      { id: 7, name: "Cheese Burger", price: 400, quantity: 0, image: images.cheeseburger },
      { id: 8, name: "Chicken Burger", price: 350, quantity: 0, image: images.chickenburger },
      { id: 9, name: "Beef Burger", price: 450, quantity: 0, image: images.beefburger },
      { id: 10, name: "Zinger Burger", price: 500, quantity: 0, image: images.zingerburger },
      { id: 11, name: "Double Patty Burger", price: 600, quantity: 0, image: images.doublepattyburger },
      { id: 12, name: "Veggie Burger", price: 300, quantity: 0, image: images.veggieburger },
    ],
    Pizza: [
      { id: 13, name: "Pepperoni Pizza", price: 700, quantity: 0, image: images.pepperonipizza },
      { id: 14, name: "Margherita Pizza", price: 650, quantity: 0, image: images.margherita },
      { id: 15, name: "BBQ Chicken Pizza", price: 750, quantity: 0, image: images.bbqchicken },
      { id: 16, name: "Tandoori Pizza", price: 720, quantity: 0, image: images.tandooripizza },
      { id: 17, name: "Four Cheese Pizza", price: 800, quantity: 0, image: images.fourcheese },
      { id: 18, name: "Mushroom Pizza", price: 680, quantity: 0, image: images.mushroompizza },
    ],
    DesiFood: [
      { id: 19, name: "Biryani", price: 500, quantity: 0, image: images.biryani },
      { id: 20, name: "Chicken Karahi", price: 900, quantity: 0, image: images.karahi },
      { id: 21, name: "Daal Chawal", price: 300, quantity: 0, image: images.daalchawal },
      { id: 22, name: "Nihari", price: 850, quantity: 0, image: images.nihari },
      { id: 23, name: "Haleem", price: 600, quantity: 0, image: images.haleem },
      { id: 24, name: "Paya", price: 700, quantity: 0, image: images.paya },
    ],
  };

  return (
    <div className="container mx-auto p-6">
      <button className="text-gray-600 hover:text-black mb-4" onClick={goBack}>⬅ Back</button>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{category} Menu</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items[category].map((item, index) => (
          <motion.div
            key={item.id}
            className="bg-white shadow-lg rounded-lg p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <img src={item.image} alt={item.name} className="w-100 h-80 object-cover rounded-md" />
            <h2 className="text-xl font-semibold text-gray-800 mt-4">{item.name}</h2>
            <p className="text-gray-600">Rs. {item.price}</p>

            <div className="flex justify-between mt-4">
              <motion.button
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                onClick={() => addToCart(item)}
                whileTap={{ scale: 0.9 }}
              >
                Add +
              </motion.button>
              <motion.button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                onClick={() => removeFromCart(item)}
                whileTap={{ scale: 0.9 }}
              >
                Remove -
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Menu;

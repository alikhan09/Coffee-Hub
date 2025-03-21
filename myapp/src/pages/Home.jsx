import React from "react";
import { motion } from "framer-motion";

const categories = [
  { name: "Coffee", image: "/assets/Coffee.jpg" },
  { name: "Burgers", image: "/assets/zingerburger.jpeg" },
  { name: "Pizza", image: "/assets/mushroompizza.jpg" },
  { name: "DesiFood", image: "/assets/karahi.jpeg" },
];

const Home = ({ selectCategory }) => {
  return (
    <div className="container mx-auto text-center mt-16 p-6">
      <motion.h1
        className="text-4xl font-bold text-gray-800 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Choose from MENU
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition duration-300"
            onClick={() => selectCategory(category.name)}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <img src={category.image} alt={category.name} className="w-full h-48 object-cover" />
            <h2 className="text-xl font-semibold text-gray-900 p-4">{category.name}</h2>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;

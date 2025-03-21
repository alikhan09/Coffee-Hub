import React from "react";
import { motion } from "framer-motion";

const Navbar = ({ setPage, setSelectedCategory }) => {
  return (
    <motion.nav
      className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-4 shadow-lg fixed w-full top-0 z-10"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1
          className="text-3xl font-extrabold cursor-pointer text-yellow-400 tracking-wide"
          onClick={() => {
            setPage("home");
            setSelectedCategory(null);
          }}
        >
          ☕ Coffee Hub
        </h1>

        {/* Navigation Links */}
        <ul className="flex space-x-8 text-lg">
          <li
            className="cursor-pointer hover:text-yellow-300 transition duration-300"
            onClick={() => {
              setPage("home");
              setSelectedCategory(null);
            }}
          >
            Home
          </li>
          <li
            className="cursor-pointer hover:text-yellow-300 transition duration-300"
            onClick={() => setPage("about")}
          >
            About Us
          </li>
          <li
            className="cursor-pointer hover:text-yellow-300 transition duration-300"
            onClick={() => setPage("contact")}
          >
            Contact Us
          </li>
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;

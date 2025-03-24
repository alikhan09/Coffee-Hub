import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons for menu toggle

const Navbar = ({ setPage, setSelectedCategory }) => {
  const [isOpen, setIsOpen] = useState(false); // State to control menu visibility

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
          className="text-2xl md:text-3xl font-extrabold cursor-pointer text-yellow-400 tracking-wide"
          onClick={() => {
            setPage("home");
            setSelectedCategory(null);
            setIsOpen(false); // Close menu on click
          }}
        >
          ☕ Coffee Hub
        </h1>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          {isOpen ? (
            <FiX className="text-3xl cursor-pointer" onClick={() => setIsOpen(false)} />
          ) : (
            <FiMenu className="text-3xl cursor-pointer" onClick={() => setIsOpen(true)} />
          )}
        </div>

        {/* Navigation Links (Desktop) */}
        <ul className="hidden md:flex space-x-8 text-lg">
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

      {/* Mobile Menu (Hidden by default, shown when `isOpen` is true) */}
      {isOpen && (
        <ul className="md:hidden flex flex-col items-center bg-gray-800 py-4 space-y-4">
          <li
            className="cursor-pointer text-lg hover:text-yellow-300"
            onClick={() => {
              setPage("home");
              setSelectedCategory(null);
              setIsOpen(false);
            }}
          >
            Home
          </li>
          <li
            className="cursor-pointer text-lg hover:text-yellow-300"
            onClick={() => {
              setPage("about");
              setIsOpen(false);
            }}
          >
            About Us
          </li>
          <li
            className="cursor-pointer text-lg hover:text-yellow-300"
            onClick={() => {
              setPage("contact");
              setIsOpen(false);
            }}
          >
            Contact Us
          </li>
        </ul>
      )}
    </motion.nav>
  );
};

export default Navbar;

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          {/* Left Side - Branding */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">☕ Coffee Hub</h2>
            <p className="text-gray-400 text-sm">Your Favorite Coffee, Just a Click Away!</p>
          </div>

          {/* Copyright Section */}
         <div className="text-center text-gray-400 text-sm mt-6">
          © {new Date().getFullYear()} Coffee Hub. All rights reserved.
        </div>

          {/* Right Side - Social Media Icons */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-2xl hover:text-blue-500 transition" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-2xl hover:text-pink-500 transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-2xl hover:text-blue-400 transition" />
            </a>
          </div>
        </div>

        
      </div>
    </footer>
  );
};

export default Footer;

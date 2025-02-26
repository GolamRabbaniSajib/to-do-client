import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-8 dark:bg-gray-900 dark:text-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          {/* Links Section */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <div className="space-y-2 mt-2 space-x-2">
              <Link to="/" className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-white">
                Home
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-white">
                About
              </Link>
              <Link to="/contact" className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-white">
                Contact
              </Link>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-6">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-white"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-white"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-white"
            >
              <FaTwitter size={24} />
            </a>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-8">
          <p className="text-gray-400 dark:text-gray-500">
            &copy; {new Date().getFullYear()} To-Do. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

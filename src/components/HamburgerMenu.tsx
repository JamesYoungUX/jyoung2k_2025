import React, { useState } from "react";
import { Link } from "react-router-dom";

interface HamburgerMenuProps {
  navLinks: Array<{ to: string; label: string }>;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ navLinks }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="flex flex-col justify-center items-center w-8 h-8 space-y-1 focus:outline-hidden"
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        />
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={closeMenu}
          />
          
          {/* Menu Panel */}
          <div className="absolute top-0 right-0 w-64 h-full bg-cyan-300 shadow-lg transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Close button */}
              <div className="flex justify-end p-4">
                <button
                  onClick={closeMenu}
                  className="text-black hover:text-opacity-80 transition-colors"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 px-4 py-8">
                <ul className="space-y-6">
                  {navLinks.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        onClick={closeMenu}
                        className="block text-black text-lg font-medium hover:text-opacity-80 transition-colors py-2"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <a
                      href="https://www.linkedin.com/in/jyoung2k/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                      className="block text-black text-lg font-medium hover:text-opacity-80 transition-colors py-2"
                    >
                      LinkedIn <span className="ml-2">→</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu; 
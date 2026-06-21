import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";
import Container from "./Container";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
      navigate("/");
    } catch (err) {
      console.error("Failed to log out:", err);
    }
  };

  const publicLinks = [
    { name: "Home", path: "/" },
    { name: "Books", path: "/books" },
    { name: "Pen Names", path: "/pen-names" },
    { name: "Blog", path: "/blog" },
    { name: "About", path: "/about" },
    { name: "Join The List", path: "/newsletter" }
  ];

  return (
    <nav className="bg-cream/95 backdrop-blur-md sticky top-0 z-50 border-b border-gold/15 transition-luxury font-sans">
      <Container>
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo - Serif AuthorHub */}
          <div className="flex-shrink-0">
            <Link to="/" className="group">
              <span className="font-serif font-bold text-2xl tracking-tight text-charcoal group-hover:text-gold transition-colors">
                AuthorHub
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {publicLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors py-2 ${
                    isActive
                      ? "text-gold border-b-2 border-gold font-semibold"
                      : "text-charcoal/80 hover:text-gold"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Actions: Newsletter, Search, User Auth controls (No desktop hamburger, no locks) */}
          <div className="hidden lg:flex items-center space-x-5">
            <Link
              to="/newsletter"
              className="px-5 py-2 border border-charcoal/60 hover:border-gold text-charcoal hover:text-gold bg-white hover:bg-gold/5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-luxury"
            >
              NEWSLETTER
            </Link>
            
            <button className="text-charcoal/80 hover:text-gold transition-colors p-1 cursor-pointer" title="Search">
              <FiSearch size={16} />
            </button>

            {/* User Session Profile controls */}
            {currentUser ? (
              <div className="flex items-center gap-3 border-l border-gold/25 pl-4">
                <span className="text-xs font-semibold text-charcoal">
                  Hi, {currentUser.displayName || "Reader"}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-1.5 border border-charcoal/40 hover:border-red-400 text-charcoal hover:text-red-500 rounded-full text-[9px] font-bold uppercase tracking-wider transition-luxury cursor-pointer"
                >
                  LOG OUT
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2 bg-[#1A3020] hover:bg-[#C5A880] text-cream hover:text-[#1A3020] rounded-full text-[10px] font-bold uppercase tracking-widest transition-luxury shadow-sm"
              >
                SIGN IN
              </Link>
            )}
          </div>

          {/* Mobile hamburger menu (hamburger shows only on mobile sizes) */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-forest-dark hover:text-gold transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-gold/15 bg-cream px-4 py-6 space-y-3 shadow-inner text-left">
          {publicLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block text-sm font-medium py-2.5 px-3 rounded ${
                  isActive
                    ? "bg-gold/10 text-gold font-semibold"
                    : "text-forest-dark hover:bg-gold/5"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="border-t border-gold/15 pt-4 mt-2 flex flex-col gap-3">
            <Link
              to="/newsletter"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center py-3 px-4 bg-[#1A3020] hover:bg-gold text-cream hover:text-forest-dark rounded-full text-xs font-semibold tracking-wider transition-luxury"
            >
              Join Newsletter
            </Link>
            
            {/* Conditional User Profile in Drawer Menu */}
            {currentUser ? (
              <div className="flex flex-col gap-2 pt-2 border-t border-gold/10">
                <span className="text-xs font-bold text-charcoal px-3 leading-none select-none">
                  Authenticated: {currentUser.displayName || "Reader"}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center py-2.5 px-4 border border-red-200 text-red-500 hover:bg-red-50 rounded-full text-xs font-semibold transition-luxury cursor-pointer w-full"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center py-2.5 px-4 border border-charcoal/40 text-charcoal hover:bg-charcoal/5 rounded-full text-xs font-semibold transition-luxury"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

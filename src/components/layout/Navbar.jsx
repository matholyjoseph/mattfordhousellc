import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX, FiLock, FiSearch } from "react-icons/fi";
import Container from "./Container";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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

          {/* Actions: Newsletter, Search, Menu, Admin Lock */}
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

            <button onClick={() => setIsOpen(!isOpen)} className="text-charcoal/80 hover:text-gold transition-colors p-1 cursor-pointer" title="Menu">
              <FiMenu size={18} />
            </button>

            <Link
              to="/admin/login"
              className="p-1 text-charcoal/40 hover:text-gold transition-colors"
              title="Admin Portal"
            >
              <FiLock size={13} />
            </Link>
          </div>


          {/* Mobile hamburger menu */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-forest-dark hover:text-gold transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-gold/15 bg-cream px-4 py-6 space-y-3 shadow-inner">
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
          <div className="border-t border-gold/15 pt-4 mt-2 flex flex-col gap-2">
            <Link
              to="/newsletter"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center py-3 px-4 bg-forest hover:bg-gold text-cream hover:text-forest-dark rounded-full text-xs font-semibold tracking-wider transition-luxury"
            >
              Join Newsletter
            </Link>
            <Link
              to="/admin/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-1 py-2 text-xs font-semibold text-forest-light hover:text-gold"
            >
              <FiLock size={12} /> Admin Portal
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

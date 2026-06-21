import { Link } from "react-router-dom";
import { FiGlobe, FiMail, FiEdit3 } from "react-icons/fi";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="bg-[#050C07] text-cream border-t border-gold/10 py-16 transition-luxury font-sans text-center">
      <Container className="space-y-6">
        
        {/* Logo */}
        <div className="flex justify-center">
          <Link to="/" className="font-serif font-bold text-3xl tracking-tight text-cream hover:text-gold transition-colors">
            AuthorHub
          </Link>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-cream/70">
          <Link to="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
          <span className="text-cream/20 select-none">•</span>
          <Link to="/terms" className="hover:text-gold transition-colors">Terms of Service</Link>
          <span className="text-cream/20 select-none">•</span>
          <Link to="/press-kit" className="hover:text-gold transition-colors">Press Kit</Link>
          <span className="text-cream/20 select-none">•</span>
          <Link to="/contact" className="hover:text-gold transition-colors">Contact</Link>
        </div>

        {/* Copyright */}
        <div className="text-xs text-cream/45 max-w-md mx-auto leading-relaxed font-light">
          <p>© 2024 Author Hub. All rights reserved. Crafted for the discovering reader.</p>
        </div>

        {/* Bottom Icons */}
        <div className="flex items-center justify-center gap-5 pt-4 text-cream/40 select-none">
          <a href="#" className="hover:text-gold transition-colors p-1" title="Globe">
            <FiGlobe size={15} />
          </a>
          <a href="#" className="hover:text-gold transition-colors p-1" title="Newsletter">
            <FiMail size={15} />
          </a>
          <a href="#" className="hover:text-gold transition-colors p-1" title="Edit">
            <FiEdit3 size={15} />
          </a>
        </div>

      </Container>
    </footer>
  );
}

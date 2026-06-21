import { Link } from "react-router-dom";
import { FiShoppingCart, FiBookOpen, FiArrowRight, FiCalendar } from "react-icons/fi";

export default function BookCard({ book }) {
  const { title, slug, coverUrl, penName, genres = [], description, status, releaseDate } = book;
  const primaryGenre = genres[0] || "Fiction";
  const isComingSoon = status === "Coming Soon";

  return (
    <div className="group flex flex-col justify-between bg-white border border-gold/15 rounded-xl p-5 hover:shadow-xl transition-luxury text-left">
      
      {/* Cover Image */}
      <Link to={`/books/${slug}`} className="block relative overflow-hidden bg-cream rounded-lg mb-5 aspect-[2/3] w-full">
        <img
          src={coverUrl}
          alt={title}
          className="w-full h-full object-cover rounded-lg book-shadow book-shadow-hover"
        />
        {status && (
          <div className="absolute top-3 right-3">
            <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 bg-forest text-cream rounded shadow">
              {status}
            </span>
          </div>
        )}
      </Link>

      {/* Metadata Line */}
      <div className="space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="bg-[#F4E6D6] text-gold-dark font-sans font-semibold text-[10px] px-2.5 py-0.5 rounded">
              {primaryGenre}
            </span>
            <span className="text-charcoal-light/80 font-sans font-light">
              by {penName}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif font-black text-xl text-forest-dark pt-1 tracking-tight leading-snug group-hover:text-gold transition-colors">
            <Link to={`/books/${slug}`}>{title}</Link>
          </h3>

          {/* Description */}
          <p className="text-xs text-charcoal-light leading-relaxed font-sans font-light line-clamp-2">
            {description}
          </p>
        </div>

        {/* Dynamic Icons / Metadata Row */}
        <div className="py-2 border-t border-gold/10 mt-2">
          {isComingSoon ? (
            <div className="flex items-center gap-2 text-[10px] font-bold text-gold-dark uppercase font-sans">
              <FiCalendar size={12} />
              <span>Released {releaseDate || "Soon"}</span>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-gold/75">
              <button className="hover:text-gold-dark transition-colors cursor-pointer" title="Buy link">
                <FiShoppingCart size={14} />
              </button>
              <button className="hover:text-gold-dark transition-colors cursor-pointer" title="Preview link">
                <FiBookOpen size={14} />
              </button>
              <Link to={`/books/${slug}`} className="hover:text-gold-dark transition-colors" title="Read details">
                <FiArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>

        {/* Action Buttons Stack */}
        <div className="space-y-2 pt-2">
          <Link
            to={`/books/${slug}`}
            className="block w-full py-2.5 text-center bg-forest hover:bg-forest-light text-cream font-sans font-bold text-xs uppercase tracking-widest rounded border-0 transition-luxury shadow-sm"
          >
            {isComingSoon ? "Pre-Order" : "View Details"}
          </Link>
          <a
            href="https://amazon.com"
            target="_blank"
            rel="noreferrer"
            className="block w-full py-2.5 text-center border border-gold/30 hover:bg-gold/10 text-forest font-sans font-bold text-xs uppercase tracking-widest rounded transition-luxury"
          >
            {isComingSoon ? "Notify Me" : "Buy Now"}
          </a>
        </div>
      </div>

    </div>
  );
}

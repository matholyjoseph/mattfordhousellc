import { useState, useEffect } from "react";
import { FiSearch, FiBookOpen, FiChevronDown } from "react-icons/fi";
import Container from "../../components/layout/Container";
import BookCard from "../../components/common/BookCard";
import EmptyState from "../../components/common/EmptyState";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { getBooks } from "../../services/bookService";
import { getGenres } from "../../services/genreService";
import { getPenNames } from "../../services/penNameService";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [penNames, setPenNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedPenName, setSelectedPenName] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(""); // "New Release", "Coming Soon", or ""
  
  const [activeDropdown, setActiveDropdown] = useState(null); // 'genre', 'penName', 'language' or null
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [visibleLimit, setVisibleLimit] = useState(8);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [fetchedBooks, fetchedGenres, fetchedPenNames] = await Promise.all([
          getBooks(),
          getGenres(),
          getPenNames()
        ]);
        
        // Show only published or comingSoon books to the public
        const publicBooks = fetchedBooks.filter(b => b.status === "published" || b.status === "comingSoon");
        
        setBooks(publicBooks);
        setGenres(fetchedGenres);
        
        // Only active pen names
        const activePens = fetchedPenNames.filter(p => p.status === "active");
        setPenNames(activePens);
      } catch (err) {
        console.error("Error loading library catalog data:", err);
        setError("Failed to load catalog books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter books dynamically in-memory
  useEffect(() => {
    let result = [...books];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        b => 
          (b.title || "").toLowerCase().includes(term) || 
          (b.subtitle || "").toLowerCase().includes(term) ||
          (b.shortHook || "").toLowerCase().includes(term) ||
          (b.fullDescription || "").toLowerCase().includes(term) ||
          (b.penName || "").toLowerCase().includes(term) ||
          (b.genre || "").toLowerCase().includes(term) ||
          (b.tropes || []).some(t => t.toLowerCase().includes(term))
      );
    }

    if (selectedGenre) {
      result = result.filter(b => b.genre && b.genre.toLowerCase() === selectedGenre.toLowerCase());
    }

    if (selectedPenName) {
      result = result.filter(b => b.penName && b.penName.toLowerCase() === selectedPenName.toLowerCase());
    }

    if (selectedLanguage) {
      result = result.filter(b => b.language && b.language.toLowerCase() === selectedLanguage.toLowerCase());
    }

    if (selectedStatus === "New Release") {
      result = result.filter(b => b.newRelease === true);
    } else if (selectedStatus === "Coming Soon") {
      result = result.filter(b => b.status === "comingSoon");
    }

    setFilteredBooks(result);
  }, [searchTerm, selectedGenre, selectedPenName, selectedLanguage, selectedStatus, books]);

  // Extract unique languages
  const languagesList = Array.from(new Set(books.map(b => b.language).filter(Boolean)));

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleSelectGenre = (genreName) => {
    setSelectedGenre(genreName);
    setActiveDropdown(null);
  };

  const handleSelectPenName = (name) => {
    setSelectedPenName(name);
    setActiveDropdown(null);
  };

  const handleSelectLanguage = (lang) => {
    setSelectedLanguage(lang);
    setActiveDropdown(null);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedGenre("");
    setSelectedPenName("");
    setSelectedLanguage("");
    setSelectedStatus("");
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 bg-cream">
        <LoadingSpinner className="w-10 h-10 text-forest" />
        <p className="text-xs text-charcoal/50 uppercase tracking-widest font-bold font-sans">Browsing catalog archives...</p>
      </div>
    );
  }

  return (
    <div className="pb-20 bg-cream text-charcoal font-sans text-left">
      
      {/* 1. HERO HEADER */}
      <section className="bg-cream-dark/20 border-b border-gold/10 py-16 text-center">
        <Container className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-forest-dark">
            Explore The Library
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-light leading-relaxed max-w-xl mx-auto font-light">
            Find your next read by genre, pen name, language, trope, or platform.
          </p>
          <div className="flex justify-center pt-2">
            <FiBookOpen className="text-gold text-2xl" />
          </div>
        </Container>
      </section>

      {error && (
        <Container className="mt-8">
          <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-xs text-red-600 font-sans text-center">
            {error}
          </div>
        </Container>
      )}

      {/* 2. SEARCH & FILTERS BAR */}
      <Container className="py-10">
        <div className="max-w-4xl mx-auto space-y-4">
          
          {/* Search bar */}
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-light/70" size={16} />
            <input
              type="text"
              placeholder="Search by title, trope, pen name, or genre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#EBE8E5]/50 border border-gold/15 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold text-xs sm:text-sm text-charcoal shadow-inner font-light"
            />
          </div>

          {/* Filters Pill Row */}
          <div className="relative flex flex-wrap gap-2 justify-center items-center py-2">
            
            {/* Genre Pill */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("genre")}
                className={`px-4 py-2 text-xs border rounded-full font-semibold tracking-wide flex items-center gap-1.5 transition-luxury cursor-pointer ${
                  selectedGenre 
                    ? "bg-forest text-cream border-forest" 
                    : "bg-white border-gold/25 hover:border-gold hover:text-gold text-charcoal-light"
                }`}
              >
                {selectedGenre || "Genre"}
                <FiChevronDown size={12} className={`transition-transform duration-200 ${activeDropdown === "genre" ? "rotate-180" : ""}`} />
              </button>
              {activeDropdown === "genre" && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-gold/15 rounded-lg shadow-xl py-1 z-30 font-sans">
                  <button onClick={() => handleSelectGenre("")} className="block w-full text-left px-4 py-2 text-xs hover:bg-cream-dark/30 text-charcoal-light">All Genres</button>
                  {genres.map(g => (
                    <button key={g.id} onClick={() => handleSelectGenre(g.name)} className="block w-full text-left px-4 py-2 text-xs hover:bg-cream-dark/30 text-charcoal font-semibold">{g.name}</button>
                  ))}
                </div>
              )}
            </div>

            {/* Pen Name Pill */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("penName")}
                className={`px-4 py-2 text-xs border rounded-full font-semibold tracking-wide flex items-center gap-1.5 transition-luxury cursor-pointer ${
                  selectedPenName 
                    ? "bg-forest text-cream border-forest" 
                    : "bg-white border-gold/25 hover:border-gold hover:text-gold text-charcoal-light"
                }`}
              >
                {selectedPenName || "Pen Name"}
                <FiChevronDown size={12} className={`transition-transform duration-200 ${activeDropdown === "penName" ? "rotate-180" : ""}`} />
              </button>
              {activeDropdown === "penName" && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-gold/15 rounded-lg shadow-xl py-1 z-30 font-sans">
                  <button onClick={() => handleSelectPenName("")} className="block w-full text-left px-4 py-2 text-xs hover:bg-cream-dark/30 text-charcoal-light">All Authors</button>
                  {penNames.map(p => (
                    <button key={p.id} onClick={() => handleSelectPenName(p.name)} className="block w-full text-left px-4 py-2 text-xs hover:bg-cream-dark/30 text-charcoal font-semibold">{p.name}</button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Pill */}
            {languagesList.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("language")}
                  className={`px-4 py-2 text-xs border rounded-full font-semibold tracking-wide flex items-center gap-1.5 transition-luxury cursor-pointer ${
                    selectedLanguage 
                      ? "bg-forest text-cream border-forest" 
                      : "bg-white border-gold/25 hover:border-gold hover:text-gold text-charcoal-light"
                  }`}
                >
                  {selectedLanguage || "Language"}
                  <FiChevronDown size={12} className={`transition-transform duration-200 ${activeDropdown === "language" ? "rotate-180" : ""}`} />
                </button>
                {activeDropdown === "language" && (
                  <div className="absolute left-0 mt-2 w-40 bg-white border border-gold/15 rounded-lg shadow-xl py-1 z-30 font-sans">
                    <button onClick={() => handleSelectLanguage("")} className="block w-full text-left px-4 py-2 text-xs hover:bg-cream-dark/30 text-charcoal-light">All Languages</button>
                    {languagesList.map(l => (
                      <button key={l} onClick={() => handleSelectLanguage(l)} className="block w-full text-left px-4 py-2 text-xs hover:bg-cream-dark/30 text-charcoal font-semibold">{l}</button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* New Release (Filled Gold) */}
            <button
              onClick={() => setSelectedStatus(selectedStatus === "New Release" ? "" : "New Release")}
              className={`px-4 py-2 text-xs border rounded-full font-semibold tracking-wide transition-luxury cursor-pointer ${
                selectedStatus === "New Release"
                  ? "bg-gold text-forest-dark border-gold shadow-md"
                  : "bg-gold/15 text-gold-dark border-gold/30 hover:bg-gold/25"
              }`}
            >
              New Release
            </button>

            {/* Coming Soon */}
            <button
              onClick={() => setSelectedStatus(selectedStatus === "Coming Soon" ? "" : "Coming Soon")}
              className={`px-4 py-2 text-xs border rounded-full font-semibold tracking-wide transition-luxury cursor-pointer ${
                selectedStatus === "Coming Soon"
                  ? "bg-forest text-cream border-forest shadow-md"
                  : "bg-white border-gold/25 hover:border-gold hover:text-gold text-charcoal-light"
              }`}
            >
              Coming Soon
            </button>

            {/* Clear All link if filters active */}
            {(searchTerm || selectedGenre || selectedPenName || selectedLanguage || selectedStatus) && (
              <button
                onClick={clearFilters}
                className="text-xs font-semibold text-gold hover:underline transition-all cursor-pointer pl-2"
              >
                Clear All
              </button>
            )}

          </div>

        </div>
      </Container>

      {/* 3. BOOK GRID */}
      <Container className="py-6">
        {filteredBooks.length > 0 ? (
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredBooks.slice(0, visibleLimit).map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>

            {/* Load More Button Capsule */}
            {filteredBooks.length > visibleLimit && (
              <div className="flex justify-center pt-8">
                <button 
                  onClick={() => setVisibleLimit(prev => prev + 8)}
                  className="px-8 py-3 bg-forest hover:bg-forest-light text-cream hover:text-gold-light rounded-full text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2 shadow-md transition-luxury cursor-pointer"
                >
                  Load More <FiChevronDown size={14} />
                </button>
              </div>
            )}
          </div>
        ) : (
          <EmptyState 
            title="No publications match your filter"
            message="No books found in our library catalog match the criteria you selected. Please try resetting your filters."
            actionLabel="Reset Search Filters"
            actionTo="#"
            onClick={clearFilters}
          />
        )}
      </Container>

    </div>
  );
}

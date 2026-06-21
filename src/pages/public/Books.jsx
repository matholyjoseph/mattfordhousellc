import { useState, useEffect } from "react";
import { FiSearch, FiBookOpen, FiChevronDown, FiChevronUp } from "react-icons/fi";
import Container from "../../components/layout/Container";
import BookCard from "../../components/common/BookCard";
import EmptyState from "../../components/common/EmptyState";
import { mockBooks } from "../../data/mockData";

export default function Books() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedPenName, setSelectedPenName] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  
  // Toggles for visual dropdown selection (mocked behavior for Phase 1/2)
  const [activeDropdown, setActiveDropdown] = useState(null); // 'genre', 'penName', 'language' or null

  const [filteredBooks, setFilteredBooks] = useState(mockBooks);
  const [visibleLimit, setVisibleLimit] = useState(4); // Match 4 items display of screenshot

  // Filter options list
  const genres = ["Gothic Mystery", "High Fantasy", "Philosophy", "Literary Fiction"];
  const penNames = ["Elias Thorne", "E.T. Penrose", "Thorne"];
  const languages = ["English"];

  useEffect(() => {
    let result = mockBooks;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        b => b.title.toLowerCase().includes(term) || 
             b.description.toLowerCase().includes(term) ||
             b.penName.toLowerCase().includes(term)
      );
    }

    if (selectedGenre) {
      result = result.filter(b => b.genres?.includes(selectedGenre));
    }

    if (selectedPenName) {
      result = result.filter(b => b.penName === selectedPenName);
    }

    if (selectedLanguage) {
      result = result.filter(b => b.language === selectedLanguage);
    }

    if (selectedStatus) {
      result = result.filter(b => b.status === selectedStatus);
    }

    setFilteredBooks(result);
  }, [searchTerm, selectedGenre, selectedPenName, selectedLanguage, selectedStatus]);

  const toggleDropdown = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  const handleSelectGenre = (genre) => {
    setSelectedGenre(genre);
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

      {/* 2. SEARCH & FILTERS BAR */}
      <Container className="py-10">
        <div className="max-w-4xl mx-auto space-y-4">
          
          {/* Search bar */}
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-light/70" size={16} />
            <input
              type="text"
              placeholder="Search by title, trope, pen name, or genre"
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
                    <button key={g} onClick={() => handleSelectGenre(g)} className="block w-full text-left px-4 py-2 text-xs hover:bg-cream-dark/30 text-charcoal font-semibold">{g}</button>
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
                    <button key={p} onClick={() => handleSelectPenName(p)} className="block w-full text-left px-4 py-2 text-xs hover:bg-cream-dark/30 text-charcoal font-semibold">{p}</button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Pill */}
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
                  {languages.map(l => (
                    <button key={l} onClick={() => handleSelectLanguage(l)} className="block w-full text-left px-4 py-2 text-xs hover:bg-cream-dark/30 text-charcoal font-semibold">{l}</button>
                  ))}
                </div>
              )}
            </div>

            {/* Platform Pill */}
            <button className="px-4 py-2 text-xs border border-gold/25 bg-white hover:border-gold hover:text-gold text-charcoal-light rounded-full font-semibold tracking-wide transition-luxury cursor-pointer">
              Platform
            </button>

            {/* Series Pill */}
            <button className="px-4 py-2 text-xs border border-gold/25 bg-white hover:border-gold hover:text-gold text-charcoal-light rounded-full font-semibold tracking-wide transition-luxury cursor-pointer">
              Series
            </button>

            {/* Tropes Pill */}
            <button className="px-4 py-2 text-xs border border-gold/25 bg-white hover:border-gold hover:text-gold text-charcoal-light rounded-full font-semibold tracking-wide transition-luxury cursor-pointer">
              Tropes
            </button>

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
                  onClick={() => setVisibleLimit(prev => prev + 4)}
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

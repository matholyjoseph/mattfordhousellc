import { useState } from "react";
import { Link } from "react-router-dom";

// Custom SVG Icons for Genres
function GenreBookIcon() {
  return (
    <svg className="w-4.5 h-4.5 text-charcoal/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20M4 19.5V3a1 1 0 0 1 1-1h15v16H6.5" />
    </svg>
  );
}

function GenreBriefcaseIcon() {
  return (
    <svg className="w-4.5 h-4.5 text-charcoal/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function GenreLinkedCirclesIcon() {
  return (
    <svg className="w-4.5 h-4.5 text-charcoal/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="8" cy="12" r="5" />
      <circle cx="16" cy="12" r="5" />
    </svg>
  );
}

function GenreHeartIcon() {
  return (
    <svg className="w-4.5 h-4.5 text-charcoal/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function GenreCutleryIcon() {
  return (
    <svg className="w-4.5 h-4.5 text-charcoal/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M6 2v4a3 3 0 003 3v13M9 2v7M12 2v4a3 3 0 00-3 3" />
      <path d="M18 2a3 3 0 00-3 3v7h6V5a3 3 0 00-3-3zM18 12v10" />
    </svg>
  );
}

function GenreWorkbookIcon() {
  return (
    <svg className="w-4.5 h-4.5 text-charcoal/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h16a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

// Custom SVG Icons for Tropes
function TropeRejectedIcon() {
  return (
    <svg className="w-4.5 h-4.5 text-charcoal/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <line x1="22" y1="9" x2="16" y2="15" />
      <line x1="16" y1="9" x2="22" y2="15" />
    </svg>
  );
}

function TropeClockIcon() {
  return (
    <svg className="w-4.5 h-4.5 text-charcoal/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l.73-.73" />
    </svg>
  );
}

function TropeDiamondIcon() {
  return (
    <svg className="w-4.5 h-4.5 text-charcoal/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 3h12l4 6-10 12L2 9z" />
      <path d="M11 3L5 9l7 12 7-12-6-6" />
    </svg>
  );
}

function TropeSwordsIcon() {
  return (
    <svg className="w-4.5 h-4.5 text-charcoal/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="4" y1="20" x2="20" y2="4" />
      <line x1="20" y1="20" x2="4" y2="4" />
      <path d="M6 18l2 2M18 18l-2 2M6 6l2-2M18 6l-2-2" />
    </svg>
  );
}

function TropeBabyIcon() {
  return (
    <svg className="w-4.5 h-4.5 text-charcoal/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2.5" />
      <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2.5" />
    </svg>
  );
}

function TropeLockIcon() {
  return (
    <svg className="w-4.5 h-4.5 text-charcoal/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

// Default fallback icon
function GenreDefaultIcon() {
  return (
    <svg className="w-4.5 h-4.5 text-charcoal/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01" />
    </svg>
  );
}

export default function AdminGenresTropes() {
  // 1. GENRES STATE
  const [genres, setGenres] = useState([
    { id: "1", name: "Werewolf Romance", books: 12, icon: <GenreBookIcon /> },
    { id: "2", name: "Billionaire Romance", books: 24, icon: <GenreBriefcaseIcon /> },
    { id: "3", name: "MM Romance", books: 18, icon: <GenreLinkedCirclesIcon /> },
    { id: "4", name: "Why Choose Romance", books: 9, icon: <GenreHeartIcon /> },
    { id: "5", name: "Cookbook", books: 2, icon: <GenreCutleryIcon /> },
    { id: "6", name: "Workbook", books: 5, icon: <GenreWorkbookIcon /> }
  ]);
  const [genreSearch, setGenreSearch] = useState("");
  const [newGenreName, setNewGenreName] = useState("");

  // 2. TROPES STATE
  const [tropes, setTropes] = useState([
    { id: "1", name: "Rejected Mate", books: 8, icon: <TropeRejectedIcon /> },
    { id: "2", name: "Second Chance", books: 15, icon: <TropeClockIcon /> },
    { id: "3", name: "Fated Mate", books: 11, icon: <TropeDiamondIcon /> },
    { id: "4", name: "Enemies to Lovers", books: 29, icon: <TropeSwordsIcon /> },
    { id: "5", name: "Secret Baby", books: 4, icon: <TropeBabyIcon /> },
    { id: "6", name: "Forbidden Romance", books: 13, icon: <TropeLockIcon /> }
  ]);
  const [tropeSearch, setTropeSearch] = useState("");
  const [newTropeName, setNewTropeName] = useState("");

  // Add handlers
  const handleAddGenre = () => {
    if (!newGenreName.trim()) return;
    const newGenre = {
      id: (genres.length + 1).toString(),
      name: newGenreName.trim(),
      books: 0,
      icon: <GenreDefaultIcon />
    };
    setGenres([...genres, newGenre]);
    setNewGenreName("");
  };

  const handleAddTrope = () => {
    if (!newTropeName.trim()) return;
    const newTrope = {
      id: (tropes.length + 1).toString(),
      name: newTropeName.trim(),
      books: 0,
      icon: <GenreDefaultIcon />
    };
    setTropes([...tropes, newTrope]);
    setNewTropeName("");
  };

  // Filter listings based on live searches
  const filteredGenres = genres.filter(g =>
    g.name.toLowerCase().includes(genreSearch.toLowerCase())
  );

  const filteredTropes = tropes.filter(t =>
    t.name.toLowerCase().includes(tropeSearch.toLowerCase())
  );

  return (
    <div className="space-y-10 font-sans text-left pb-16">
      
      {/* 1. PAGE HEADER */}
      <div>
        <h1 className="text-4xl sm:text-[40px] font-serif font-bold text-charcoal leading-tight tracking-tight">
          Genres & Tropes
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-light font-sans font-light mt-1.5">
          Manage the classification system for your library.
        </p>
      </div>

      {/* 2. TWO-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Column Left: Genres */}
        <div className="space-y-6">
          
          {/* Header Row */}
          <div className="flex items-center justify-between border-b border-[#E5E3DC]/40 pb-2">
            <div className="flex items-center gap-2 text-charcoal">
              {/* Tag SVG icon */}
              <svg className="w-5 h-5 text-charcoal" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a1.5 1.5 0 002.122 0l4.318-4.318a1.5 1.5 0 000-2.122L11.16 3.659A2.25 2.25 0 009.568 3z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
              </svg>
              <h2 className="font-serif font-bold text-2xl text-charcoal">Genres</h2>
            </div>
            <span className="text-charcoal/40 text-xs font-semibold select-none">
              {genres.length} Categories
            </span>
          </div>

          {/* Search & Add Inputs Card */}
          <div className="bg-white border border-[#E5E3DC]/60 rounded-3xl p-6 shadow-sm space-y-4">
            
            {/* Live Search */}
            <div className="relative bg-[#F5F4F0]/65 border border-[#E5E3DC]/60 rounded-xl px-4 py-3 flex items-center">
              <span className="text-charcoal/40 mr-2 shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search genres..."
                value={genreSearch}
                onChange={(e) => setGenreSearch(e.target.value)}
                className="w-full bg-transparent outline-none text-xs text-charcoal placeholder-charcoal/30 font-sans font-semibold"
              />
            </div>

            {/* Quick Add Form */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Add New Genre"
                value={newGenreName}
                onChange={(e) => setNewGenreName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddGenre()}
                className="flex-grow bg-[#F5F4F0]/65 border border-[#E5E3DC]/60 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-gold text-charcoal font-sans font-semibold"
              />
              <button
                onClick={handleAddGenre}
                className="w-12 h-11 bg-[#C5A880] hover:bg-[#0A180E] text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-sm transition-all duration-150 cursor-pointer shrink-0"
              >
                +
              </button>
            </div>

          </div>

          {/* Genres List container Card */}
          <div className="bg-white border border-[#E5E3DC]/60 rounded-3xl p-3 shadow-sm space-y-1">
            {filteredGenres.length > 0 ? (
              filteredGenres.map((genre) => (
                <div 
                  key={genre.id}
                  className="flex items-center gap-3 p-3.5 hover:bg-[#F9F9F8] transition-colors rounded-2xl cursor-pointer group"
                >
                  {/* Circular icon container */}
                  <div className="w-10 h-10 rounded-full bg-[#F5F4F0] flex items-center justify-center shrink-0 group-hover:bg-[#C5A880]/15 group-hover:text-gold transition-colors">
                    {genre.icon}
                  </div>
                  {/* Name and count */}
                  <div className="text-left">
                    <span className="block text-sm font-bold text-charcoal">
                      {genre.name}
                    </span>
                    <span className="block text-[11px] font-bold text-[#C5A880] mt-0.5">
                      {genre.books} Books
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-charcoal/40 font-medium">
                No matching genres found.
              </div>
            )}
          </div>

        </div>

        {/* Column Right: Tropes */}
        <div className="space-y-6">
          
          {/* Header Row */}
          <div className="flex items-center justify-between border-b border-[#E5E3DC]/40 pb-2">
            <div className="flex items-center gap-2 text-charcoal">
              {/* Badge SVG icon */}
              <svg className="w-5 h-5 text-charcoal" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
              <h2 className="font-serif font-bold text-2xl text-charcoal">Tropes</h2>
            </div>
            <span className="text-charcoal/40 text-xs font-semibold select-none">
              {tropes.length} Tropes
            </span>
          </div>

          {/* Search & Add Inputs Card */}
          <div className="bg-white border border-[#E5E3DC]/60 rounded-3xl p-6 shadow-sm space-y-4">
            
            {/* Live Search */}
            <div className="relative bg-[#F5F4F0]/65 border border-[#E5E3DC]/60 rounded-xl px-4 py-3 flex items-center">
              <span className="text-charcoal/40 mr-2 shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search tropes..."
                value={tropeSearch}
                onChange={(e) => setTropeSearch(e.target.value)}
                className="w-full bg-transparent outline-none text-xs text-charcoal placeholder-charcoal/30 font-sans font-semibold"
              />
            </div>

            {/* Quick Add Form */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Add New Trope"
                value={newTropeName}
                onChange={(e) => setNewTropeName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTrope()}
                className="flex-grow bg-[#F5F4F0]/65 border border-[#E5E3DC]/60 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-gold text-charcoal font-sans font-semibold"
              />
              <button
                onClick={handleAddTrope}
                className="w-12 h-11 bg-[#C5A880] hover:bg-[#0A180E] text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-sm transition-all duration-150 cursor-pointer shrink-0"
              >
                +
              </button>
            </div>

          </div>

          {/* Tropes List container Card */}
          <div className="bg-white border border-[#E5E3DC]/60 rounded-3xl p-3 shadow-sm space-y-1">
            {filteredTropes.length > 0 ? (
              filteredTropes.map((trope) => (
                <div 
                  key={trope.id}
                  className="flex items-center gap-3 p-3.5 hover:bg-[#F9F9F8] transition-colors rounded-2xl cursor-pointer group"
                >
                  {/* Circular icon container */}
                  <div className="w-10 h-10 rounded-full bg-[#F5F4F0] flex items-center justify-center shrink-0 group-hover:bg-[#C5A880]/15 group-hover:text-gold transition-colors">
                    {trope.icon}
                  </div>
                  {/* Name and count */}
                  <div className="text-left">
                    <span className="block text-sm font-bold text-charcoal">
                      {trope.name}
                    </span>
                    <span className="block text-[11px] font-bold text-[#C5A880] mt-0.5">
                      {trope.books} Books
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-charcoal/40 font-medium">
                No matching tropes found.
              </div>
            )}
          </div>

        </div>

      </div>

      {/* 3. COPYRIGHT FOOTER */}
      <div className="border-t border-[#E5E3DC] mt-16 pt-5 pb-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-medium text-charcoal/40 font-sans gap-4 select-none">
        <div>
          © 2024 Cinematic Editorial Publishing. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <Link to="/admin/support" className="hover:text-gold transition-colors">Support</Link>
          <Link to="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-gold transition-colors">Terms of Service</Link>
        </div>
      </div>

    </div>
  );
}

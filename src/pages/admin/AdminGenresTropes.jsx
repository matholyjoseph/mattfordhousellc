import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getGenres, createGenre, updateGenre, deleteGenre } from "../../services/genreService";
import { getTropes, createTrope, updateTrope, deleteTrope } from "../../services/tropeService";
import { getBooks } from "../../services/bookService";
import LoadingSpinner from "../../components/common/LoadingSpinner";

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
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 02 2h16a2 2 0 0 02-2v-7M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
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

function GenreDefaultIcon() {
  return (
    <svg className="w-4.5 h-4.5 text-charcoal/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01" />
    </svg>
  );
}

const getGenreIcon = (name) => {
  const n = name.toLowerCase();
  if (n.includes("werewolf") || n.includes("wolf") || n.includes("vampire") || n.includes("fantasy")) return <GenreBookIcon />;
  if (n.includes("billionaire") || n.includes("corporate") || n.includes("boss") || n.includes("business") || n.includes("briefcase")) return <GenreBriefcaseIcon />;
  if (n.includes("mm") || n.includes("lgbt") || n.includes("gay") || n.includes("bl") || n.includes("linked")) return <GenreLinkedCirclesIcon />;
  if (n.includes("choose") || n.includes("reverse") || n.includes("harem") || n.includes("romance") || n.includes("heart") || n.includes("love")) return <GenreHeartIcon />;
  if (n.includes("cook") || n.includes("recipe") || n.includes("food") || n.includes("dining")) return <GenreCutleryIcon />;
  if (n.includes("work") || n.includes("guide") || n.includes("journal") || n.includes("study") || n.includes("learn")) return <GenreWorkbookIcon />;
  return <GenreDefaultIcon />;
};

const getTropeIcon = (name) => {
  const n = name.toLowerCase();
  if (n.includes("reject") || n.includes("mate")) return <TropeRejectedIcon />;
  if (n.includes("chance") || n.includes("second") || n.includes("time") || n.includes("clock")) return <TropeClockIcon />;
  if (n.includes("fated") || n.includes("destiny") || n.includes("diamond") || n.includes("gem")) return <TropeDiamondIcon />;
  if (n.includes("enemy") || n.includes("enemies") || n.includes("rival") || n.includes("sword") || n.includes("fight")) return <TropeSwordsIcon />;
  if (n.includes("baby") || n.includes("secret") || n.includes("pregnancy") || n.includes("child")) return <TropeBabyIcon />;
  if (n.includes("forbidden") || n.includes("taboo") || n.includes("secret") || n.includes("lock") || n.includes("key")) return <TropeLockIcon />;
  return <GenreDefaultIcon />;
};

export default function AdminGenresTropes() {
  const [genres, setGenres] = useState([]);
  const [tropes, setTropes] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search & Add inputs
  const [genreSearch, setGenreSearch] = useState("");
  const [newGenreName, setNewGenreName] = useState("");
  const [tropeSearch, setTropeSearch] = useState("");
  const [newTropeName, setNewTropeName] = useState("");

  // Edit / Delete Modals state
  const [editingItem, setEditingItem] = useState(null); // { type: 'genre'|'trope', id, name }
  const [deletingItem, setDeletingItem] = useState(null); // { type: 'genre'|'trope', id, name }
  const [modalInputName, setModalInputName] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch initial data
  const fetchData = async () => {
    try {
      setLoading(true);
      const [fetchedGenres, fetchedTropes, fetchedBooks] = await Promise.all([
        getGenres(),
        getTropes(),
        getBooks()
      ]);
      setGenres(fetchedGenres);
      setTropes(fetchedTropes);
      setBooks(fetchedBooks);
    } catch (err) {
      console.error("Error fetching genres/tropes data:", err);
      setError("Failed to load catalog metadata. Please refresh page.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handlers
  const handleAddGenre = async () => {
    if (!newGenreName.trim()) return;
    try {
      setActionLoading(true);
      await createGenre({ name: newGenreName.trim() });
      setNewGenreName("");
      await fetchData();
    } catch (err) {
      console.error("Error creating genre:", err);
      setError("Failed to add genre.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddTrope = async () => {
    if (!newTropeName.trim()) return;
    try {
      setActionLoading(true);
      await createTrope({ name: newTropeName.trim() });
      setNewTropeName("");
      await fetchData();
    } catch (err) {
      console.error("Error creating trope:", err);
      setError("Failed to add trope.");
    } finally {
      setActionLoading(false);
    }
  };

  const openEditModal = (type, item) => {
    setEditingItem({ type, ...item });
    setModalInputName(item.name);
  };

  const handleSaveEdit = async () => {
    if (!modalInputName.trim() || !editingItem) return;
    try {
      setActionLoading(true);
      if (editingItem.type === "genre") {
        await updateGenre(editingItem.id, { name: modalInputName.trim() });
      } else {
        await updateTrope(editingItem.id, { name: modalInputName.trim() });
      }
      setEditingItem(null);
      await fetchData();
    } catch (err) {
      console.error("Error updating item:", err);
      setError("Failed to update item.");
    } finally {
      setActionLoading(false);
    }
  };

  const openDeleteModal = (type, item) => {
    setDeletingItem({ type, ...item });
  };

  const handleDeleteConfirm = async () => {
    if (!deletingItem) return;
    try {
      setActionLoading(true);
      if (deletingItem.type === "genre") {
        await deleteGenre(deletingItem.id);
      } else {
        await deleteTrope(deletingItem.id);
      }
      setDeletingItem(null);
      await fetchData();
    } catch (err) {
      console.error("Error deleting item:", err);
      setError("Failed to delete item.");
    } finally {
      setActionLoading(false);
    }
  };

  // Get dynamic counts
  const getGenreCount = (genreName) => {
    return books.filter(b => b.genre && b.genre.toLowerCase() === genreName.toLowerCase()).length;
  };

  const getTropeCount = (tropeName) => {
    return books.filter(b => b.tropes && b.tropes.some(t => t.toLowerCase() === tropeName.toLowerCase())).length;
  };

  // Filter listings based on searches
  const filteredGenres = genres.filter(g =>
    g.name && g.name.toLowerCase().includes(genreSearch.toLowerCase())
  );

  const filteredTropes = tropes.filter(t =>
    t.name && t.name.toLowerCase().includes(tropeSearch.toLowerCase())
  );

  if (loading) {
    return (
      <div className="py-24 text-center space-y-4">
        <LoadingSpinner className="w-12 h-12 text-forest mx-auto" />
        <p className="text-sm text-charcoal/60 font-medium">Fetching catalog structure...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 font-sans text-left pb-16 relative">
      
      {/* 1. PAGE HEADER */}
      <div>
        <h1 className="text-4xl sm:text-[40px] font-serif font-bold text-charcoal leading-tight tracking-tight">
          Genres & Tropes
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-light font-sans font-light mt-1.5">
          Manage categories and trope metadata tagging rules across all book directories.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-xs text-red-600 font-sans leading-relaxed text-left flex items-start gap-2">
          <span className="font-bold text-sm select-none">!</span>
          <span>{error}</span>
          <button onClick={() => setError("")} className="ml-auto font-bold text-red-800 hover:text-red-950">Dismiss</button>
        </div>
      )}

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
                disabled={actionLoading}
                className="w-12 h-11 bg-[#C5A880] hover:bg-[#0A180E] text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-sm transition-all duration-150 cursor-pointer shrink-0 disabled:opacity-50"
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
                  className="flex items-center justify-between p-3 hover:bg-[#F9F9F8] transition-colors rounded-2xl group"
                >
                  <div className="flex items-center gap-3">
                    {/* Circular icon container */}
                    <div className="w-10 h-10 rounded-full bg-[#F5F4F0] flex items-center justify-center shrink-0 group-hover:bg-[#C5A880]/15 group-hover:text-gold transition-colors">
                      {getGenreIcon(genre.name)}
                    </div>
                    {/* Name and count */}
                    <div className="text-left">
                      <span className="block text-sm font-bold text-charcoal">
                        {genre.name}
                      </span>
                      <span className="block text-[11px] font-bold text-[#C5A880] mt-0.5">
                        {getGenreCount(genre.name)} Books
                      </span>
                    </div>
                  </div>

                  {/* Actions (Pencil & Trash) */}
                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => openEditModal("genre", genre)}
                      className="w-8 h-8 rounded-lg hover:bg-gold/10 text-charcoal/60 hover:text-gold flex items-center justify-center transition-colors cursor-pointer"
                      title="Edit genre name"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => openDeleteModal("genre", genre)}
                      className="w-8 h-8 rounded-lg hover:bg-red-50 text-charcoal/60 hover:text-red-600 flex items-center justify-center transition-colors cursor-pointer"
                      title="Delete genre"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
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
                disabled={actionLoading}
                className="w-12 h-11 bg-[#C5A880] hover:bg-[#0A180E] text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-sm transition-all duration-150 cursor-pointer shrink-0 disabled:opacity-50"
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
                  className="flex items-center justify-between p-3 hover:bg-[#F9F9F8] transition-colors rounded-2xl group"
                >
                  <div className="flex items-center gap-3">
                    {/* Circular icon container */}
                    <div className="w-10 h-10 rounded-full bg-[#F5F4F0] flex items-center justify-center shrink-0 group-hover:bg-[#C5A880]/15 group-hover:text-gold transition-colors">
                      {getTropeIcon(trope.name)}
                    </div>
                    {/* Name and count */}
                    <div className="text-left">
                      <span className="block text-sm font-bold text-charcoal">
                        {trope.name}
                      </span>
                      <span className="block text-[11px] font-bold text-[#C5A880] mt-0.5">
                        {getTropeCount(trope.name)} Books
                      </span>
                    </div>
                  </div>

                  {/* Actions (Pencil & Trash) */}
                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => openEditModal("trope", trope)}
                      className="w-8 h-8 rounded-lg hover:bg-gold/10 text-charcoal/60 hover:text-gold flex items-center justify-center transition-colors cursor-pointer"
                      title="Edit trope name"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => openDeleteModal("trope", trope)}
                      className="w-8 h-8 rounded-lg hover:bg-red-50 text-charcoal/60 hover:text-red-600 flex items-center justify-center transition-colors cursor-pointer"
                      title="Delete trope"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
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

      {/* EDIT MODAL */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white border border-[#E5E3DC] rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4">
            <div className="text-left">
              <h3 className="font-serif font-bold text-xl text-charcoal">
                Edit {editingItem.type === "genre" ? "Genre" : "Trope"}
              </h3>
              <p className="text-xs text-charcoal/50 mt-1 font-sans">
                Adjust name catalog mapping values.
              </p>
            </div>
            
            <div className="space-y-1 text-left">
              <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider">
                Name
              </label>
              <input 
                type="text"
                value={modalInputName}
                onChange={(e) => setModalInputName(e.target.value)}
                className="w-full bg-[#F5F4F0]/65 border border-[#E5E3DC]/60 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-gold text-charcoal font-sans font-semibold"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setEditingItem(null)}
                disabled={actionLoading}
                className="flex-1 py-2.5 bg-[#FAF9F5] border border-[#E5E3DC] text-charcoal hover:bg-[#F5F4F0] rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer select-none"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={actionLoading || !modalInputName.trim()}
                className="flex-1 py-2.5 bg-[#1A3020] text-cream hover:bg-[#C5A880] hover:text-[#1A3020] rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer select-none flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {actionLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white border border-red-100 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4">
            <div className="text-left space-y-2">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 font-bold text-lg select-none">
                !
              </div>
              <h3 className="font-serif font-bold text-xl text-charcoal">
                Delete {deletingItem.type === "genre" ? "Genre" : "Trope"}?
              </h3>
              <p className="text-xs text-charcoal/60 leading-relaxed font-sans">
                Are you sure you want to delete <span className="font-bold text-charcoal">"{deletingItem.name}"</span>?
                This action is permanent and cannot be undone. Books currently referencing this metadata will show blank values.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeletingItem(null)}
                disabled={actionLoading}
                className="flex-1 py-2.5 bg-[#FAF9F5] border border-[#E5E3DC] text-charcoal hover:bg-[#F5F4F0] rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer select-none"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={actionLoading}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer select-none disabled:opacity-50"
              >
                {actionLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

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

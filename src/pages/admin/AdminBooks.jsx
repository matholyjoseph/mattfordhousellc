import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiSliders, FiStar, FiEdit3, FiTrash2, FiTrendingUp, FiImage, FiBook } from "react-icons/fi";
import { getBooks, deleteBook, updateBook } from "../../services/bookService";
import LoadingSpinner from "../../components/common/LoadingSpinner";

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Interactive search & filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [genreFilter, setGenreFilter] = useState("All");
  const [penNameFilter, setPenNameFilter] = useState("All");
  const [selectedIds, setSelectedIds] = useState([]);

  const navigate = useNavigate();

  // Load books on mount
  const loadBooks = async () => {
    setLoading(true);
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (err) {
      console.error("Failed to load books catalog:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  // Toggle single featured state directly in Firestore
  const toggleFeatured = async (id, currentVal) => {
    try {
      await updateBook(id, { featured: !currentVal });
      setBooks(prev => prev.map(b => b.id === id ? { ...b, featured: !currentVal } : b));
    } catch (err) {
      console.error("Failed to update featured status:", err);
    }
  };

  // Toggle selection
  const toggleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Select/Deselect All
  const toggleSelectAll = () => {
    if (selectedIds.length === books.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(books.map(b => b.id));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this book from the database? This action cannot be undone.")) {
      try {
        await deleteBook(id);
        setBooks(prev => prev.filter(b => b.id !== id));
        setSelectedIds(prev => prev.filter(item => item !== id));
        alert("Book successfully deleted.");
      } catch (err) {
        console.error("Failed to delete book:", err);
        alert("Delete failed. Please try again.");
      }
    }
  };

  // Filter lists options dynamically based on catalog values
  const genresList = Array.from(new Set(books.flatMap(b => b.genre ? [b.genre] : [])));
  const penNamesList = Array.from(new Set(books.map(b => b.penName).filter(Boolean)));

  // Filter logic
  const filteredBooks = books.filter(b => {
    const matchesSearch = (b.title || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (b.penName || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || b.status === statusFilter;
    const matchesGenre = genreFilter === "All" || b.genre === genreFilter;
    const matchesPenName = penNameFilter === "All" || b.penName === penNameFilter;
    return matchesSearch && matchesStatus && matchesGenre && matchesPenName;
  });

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
        <LoadingSpinner className="w-10 h-10 text-forest" />
        <p className="text-xs text-charcoal/50 uppercase tracking-widest font-bold">Synchronizing database indices...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans text-left pb-10">
      
      {/* 1. BREADCRUMBS & PAGE HEADER */}
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-charcoal/40 select-none">
            Library / Books
          </div>
          <h1 className="text-3xl sm:text-[36px] font-serif font-bold text-charcoal leading-tight">
            Manage Books
          </h1>
        </div>
        <Link
          to="/admin/books/new"
          className="px-5 py-2.5 bg-[#0A180E] hover:bg-[#C5A880] text-white hover:text-[#0A180E] font-sans font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all duration-150 flex items-center gap-1.5"
        >
          <span>+ Add Book</span>
        </Link>
      </div>

      {/* 2. SEARCH AND FILTER CARD */}
      <div className="bg-white border border-[#E5E3DC]/60 p-6 rounded-[24px] shadow-sm space-y-4">
        
        {/* Search Input */}
        <div className="relative w-full">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40">
            <FiSearch size={14} />
          </span>
          <input
            type="text"
            placeholder="Search by title or pen name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-xs bg-[#F5F4F0] border border-[#E5E3DC]/70 rounded-xl focus:outline-none focus:border-gold text-charcoal"
          />
        </div>

        {/* Dropdowns controls */}
        <div className="flex flex-wrap items-center gap-4">
          
          {/* Status Filter */}
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-[#F5F4F0] border border-[#E5E3DC]/70 rounded-xl text-xs text-charcoal/80 focus:outline-none cursor-pointer min-w-[120px]"
          >
            <option value="All">Status</option>
            <option value="published">Published</option>
            <option value="comingSoon">Coming Soon</option>
            <option value="draft">Draft</option>
          </select>

          {/* Genre Filter */}
          <select 
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
            className="px-4 py-2.5 bg-[#F5F4F0] border border-[#E5E3DC]/70 rounded-xl text-xs text-charcoal/80 focus:outline-none cursor-pointer min-w-[120px]"
          >
            <option value="All">Genre</option>
            {genresList.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>

          {/* Pen Name Filter */}
          <select 
            value={penNameFilter}
            onChange={(e) => setPenNameFilter(e.target.value)}
            className="px-4 py-2.5 bg-[#F5F4F0] border border-[#E5E3DC]/70 rounded-xl text-xs text-charcoal/80 focus:outline-none cursor-pointer min-w-[120px]"
          >
            <option value="All">Pen Name</option>
            {penNamesList.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

        </div>
      </div>

      {/* 3. CATALOG LIST TABLE CARD */}
      <div className="bg-white border border-[#E5E3DC]/50 rounded-[24px] shadow-sm overflow-hidden p-6 sm:p-8 space-y-6">
        
        {books.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <FiBook className="mx-auto text-charcoal/20" size={40} />
            <h4 className="font-serif font-bold text-lg text-charcoal">No Books Catalogued</h4>
            <p className="text-xs text-charcoal/50 max-w-sm mx-auto leading-relaxed">
              Start building your literary index by adding your first novel cover, synopsis details, and purchase buy links.
            </p>
            <Link
              to="/admin/books/new"
              className="inline-block px-5 py-2.5 bg-[#1A3020] text-cream rounded-full text-[10px] uppercase font-bold tracking-widest shadow hover:bg-gold transition-colors"
            >
              + Add First Book
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E5E3DC]/40 text-[10px] font-bold uppercase tracking-widest text-charcoal/40 select-none">
                  <th className="pb-4 pr-4 w-10">
                    <input 
                      type="checkbox"
                      checked={selectedIds.length === books.length && books.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded border-[#E5E3DC] text-forest focus:ring-forest-light h-4 w-4 cursor-pointer"
                    />
                  </th>
                  <th className="pb-4 pr-4">Cover</th>
                  <th className="pb-4 pr-4">Title & Pen Name</th>
                  <th className="pb-4 pr-4">Genre</th>
                  <th className="pb-4 pr-4">Language</th>
                  <th className="pb-4 pr-4">Status</th>
                  <th className="pb-4 pr-4 text-center">Featured</th>
                  <th className="pb-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E3DC]/30 text-xs sm:text-sm text-charcoal-light">
                {filteredBooks.map((b) => (
                  <tr key={b.id} className={`group hover:bg-[#F5F4F0]/30 transition-colors ${selectedIds.includes(b.id) ? 'bg-[#F5F4F0]/15' : ''}`}>
                    <td className="py-5 pr-4">
                      <input 
                        type="checkbox"
                        checked={selectedIds.includes(b.id)}
                        onChange={() => toggleSelect(b.id)}
                        className="rounded border-[#E5E3DC] text-forest focus:ring-forest-light h-4 w-4 cursor-pointer"
                      />
                    </td>
                    <td className="py-5 pr-4">
                      <div className="w-10 h-14 rounded bg-cream-dark border border-[#E5E3DC]/60 overflow-hidden flex items-center justify-center shadow shrink-0">
                        {b.coverImage ? (
                          <img src={b.coverImage} alt={b.title} className="w-full h-full object-cover animate-fade-in" />
                        ) : (
                          <FiImage className="text-charcoal/20" size={16} />
                        )}
                      </div>
                    </td>
                    <td className="py-5 pr-4 text-left">
                      <span className="block font-serif font-bold text-charcoal group-hover:text-gold transition-colors leading-tight">{b.title}</span>
                      <span className="block text-[11px] text-charcoal/50 font-sans font-light mt-0.5">{b.penName || "N/A"}</span>
                    </td>
                    <td className="py-5 pr-4">
                      <span className="px-2 py-0.5 bg-[#FFF3D4] text-[#8C5E28] rounded-md text-[9px] font-bold block w-fit select-none">
                        {b.genre || "N/A"}
                      </span>
                    </td>
                    <td className="py-5 pr-4 font-sans font-light">{b.language || "English"}</td>
                    <td className="py-5 pr-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold block w-fit select-none ${
                        b.status === "published" 
                          ? "bg-[#E2F0D9] text-[#2E6B40]" 
                          : b.status === "comingSoon" 
                            ? "bg-[#FFF3D4] text-[#A87900]" 
                            : "bg-[#F0EFF0] text-charcoal/60"
                      }`}>
                        <span className="inline-block w-1 h-1 rounded-full bg-current mr-1.5 align-middle" />
                        {b.status === "published" ? "Published" : b.status === "comingSoon" ? "Coming Soon" : "Draft"}
                      </span>
                    </td>
                    <td className="py-5 pr-4 text-center">
                      <button 
                        onClick={() => toggleFeatured(b.id, b.featured)}
                        className={`p-1.5 focus:outline-none transition-colors cursor-pointer ${b.featured ? 'text-gold' : 'text-charcoal/20 hover:text-gold/40'}`}
                        title={b.featured ? "Unfeature novel" : "Feature novel"}
                      >
                        <FiStar size={16} fill={b.featured ? "currentColor" : "none"} />
                      </button>
                    </td>
                    <td className="py-5 text-right whitespace-nowrap">
                      <div className="inline-flex gap-2">
                        <Link 
                          to={`/admin/books/edit/${b.id}`}
                          className="p-2 border border-[#E5E3DC] hover:border-gold hover:bg-gold/5 rounded-lg text-charcoal/40 hover:text-gold transition-colors"
                          title="Edit Details"
                        >
                          <FiEdit3 size={14} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(b.id)}
                          className="p-2 border border-[#E5E3DC] hover:border-red-300 hover:bg-red-50 rounded-lg text-charcoal/40 hover:text-red-500 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Table Footer */}
        {books.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E5E3DC]/30">
            <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal/40 font-sans">
              Showing {filteredBooks.length} of {books.length} books
            </span>

            {/* Simple Pagination */}
            <div className="flex items-center gap-1 select-none">
              <button className="w-8 h-8 rounded-lg border border-[#E5E3DC] text-charcoal/40 flex items-center justify-center hover:bg-[#F5F4F0] cursor-pointer">
                {"<"}
              </button>
              <button className="w-8 h-8 rounded-lg bg-[#0A180E] text-white flex items-center justify-center text-xs font-bold font-sans">
                1
              </button>
              <button className="w-8 h-8 rounded-lg border border-[#E5E3DC] text-charcoal/40 flex items-center justify-center hover:bg-[#F5F4F0] cursor-pointer">
                {">"}
              </button>
            </div>
          </div>
        )}

      </div>

      {/* 4. BOTTOM METRICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Active Pen Names Card */}
        <div className="bg-[#0A180E] text-white p-6 rounded-[24px] shadow-sm flex flex-col justify-between items-start space-y-4 relative overflow-hidden text-left">
          <div className="absolute right-0 bottom-0 opacity-[0.03] text-gold pointer-events-none translate-x-12 translate-y-12">
            <svg className="w-32 h-32" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="50" cy="50" r="40" />
            </svg>
          </div>
          <span className="text-[10px] uppercase font-bold text-gold tracking-wider block font-sans">
            Active Pen Names
          </span>
          <div className="space-y-2">
            <h3 className="text-3xl font-serif font-bold text-cream leading-none">
              {penNamesList.length} Profile(s)
            </h3>
            <div className="flex -space-x-3 pt-1 select-none">
              {penNamesList.map((name, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gold/30 border-2 border-[#0A180E] flex items-center justify-center text-[9px] font-bold text-white uppercase">
                  {name.substring(0, 2)}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Summary Card */}
        <div className="bg-white border border-[#E5E3DC]/50 p-6 rounded-[24px] shadow-sm flex flex-col justify-between items-start space-y-4 text-left">
          <span className="text-[10px] uppercase font-bold text-charcoal/40 tracking-wider block font-sans">
            Catalogue Summary
          </span>
          <div className="space-y-1 w-full">
            <h3 className="text-3xl font-serif font-bold text-charcoal leading-none">
              {books.filter(b => b.featured).length} Featured
            </h3>
            <span className="text-[10px] text-charcoal/50 font-sans font-semibold inline-flex items-center gap-1 pt-1">
              <span>Matches current homepage slider showcase</span>
            </span>
          </div>
        </div>

      </div>

      {/* 5. PAGE BOTTOM ESTATE TAG */}
      <div className="text-[9px] uppercase font-bold tracking-[0.25em] text-charcoal/30 text-center select-none pt-4">
        Built for the Elias Thorne Literary Estate
      </div>

    </div>
  );
}

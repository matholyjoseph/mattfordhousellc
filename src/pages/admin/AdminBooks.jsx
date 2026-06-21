import { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiSliders, FiStar, FiEdit3, FiTrash2, FiTrendingUp } from "react-icons/fi";

// Mini illustrated book cover placeholders
function WhispersPinesMiniCover() {
  return (
    <div className="w-10 h-14 rounded shadow border border-[#E5E3DC]/60 bg-[#0F1D13] flex items-center justify-center p-0.5 select-none overflow-hidden relative shrink-0">
      <svg className="w-full h-full text-gold" viewBox="0 0 30 40" fill="none" stroke="currentColor" strokeWidth="0.8">
        <circle cx="15" cy="12" r="3" fill="#C5A880" />
        <path d="M 5 35 L 15 20 L 25 35 Z M 10 35 L 15 25 L 20 35 Z" fill="#1A3020" />
        <line x1="8" y1="36" x2="22" y2="36" stroke="#C5A880" strokeWidth="0.5" />
      </svg>
    </div>
  );
}

function SilentPeakMiniCover() {
  return (
    <div className="w-10 h-14 rounded shadow border border-[#E5E3DC]/60 bg-[#1A3A4A] flex items-center justify-center p-0.5 select-none overflow-hidden relative shrink-0">
      <svg className="w-full h-full text-[#DFCDA9]" viewBox="0 0 30 40" fill="none" stroke="currentColor" strokeWidth="0.8">
        <path d="M 5 35 L 15 15 L 25 35 Z" fill="#253A4B" />
        <line x1="15" y1="15" x2="15" y2="35" stroke="#DFCDA9" strokeWidth="0.5" />
        <line x1="8" y1="36" x2="22" y2="36" stroke="#DFCDA9" strokeWidth="0.5" />
      </svg>
    </div>
  );
}

function GoldCoastMiniCover() {
  return (
    <div className="w-10 h-14 rounded shadow border border-[#E5E3DC]/60 bg-[#2C1910] flex items-center justify-center p-0.5 select-none overflow-hidden relative shrink-0">
      <svg className="w-full h-full text-gold" viewBox="0 0 30 40" fill="none" stroke="currentColor" strokeWidth="0.8">
        {/* Sun setting over ocean reflections */}
        <path d="M 0 25 Q 15 28 30 25 L 30 40 L 0 40 Z" fill="#4E3115" />
        <circle cx="15" cy="20" r="5" fill="#FFE8B0" />
        <line x1="5" y1="28" x2="25" y2="28" stroke="#FFE8B0" strokeWidth="1" />
        <line x1="8" y1="31" x2="22" y2="31" stroke="#C5A880" strokeWidth="0.8" />
        <line x1="12" y1="34" x2="18" y2="34" stroke="#C5A880" strokeWidth="0.5" />
      </svg>
    </div>
  );
}

export default function AdminBooks() {
  
  // Interactive search & filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [genreFilter, setGenreFilter] = useState("All");
  const [penNameFilter, setPenNameFilter] = useState("All");

  // Initial books list
  const [books, setBooks] = useState([
    {
      id: "1",
      cover: <WhispersPinesMiniCover />,
      title: "Whispers in the Pines",
      penName: "Elias Thorne",
      genres: ["Gothic", "Mystery"],
      language: "English",
      status: "Published",
      statusClass: "bg-[#E2F0D9] text-[#2E6B40]",
      featured: true,
      updated: "Oct 24, 2023"
    },
    {
      id: "2",
      cover: <SilentPeakMiniCover />,
      title: "The Silent Peak",
      penName: "Elias Thorne",
      genres: ["Thriller"],
      language: "German",
      status: "Coming Soon",
      statusClass: "bg-[#FFF3D4] text-[#A87900]",
      featured: false,
      updated: "Jan 12, 2024"
    },
    {
      id: "3",
      cover: <GoldCoastMiniCover />,
      title: "Gold Coast Legacy",
      penName: "Adam Woodrow",
      genres: ["Billionaire", "Romance"],
      language: "English",
      status: "Draft",
      statusClass: "bg-[#F0EFF0] text-charcoal/60",
      featured: false,
      updated: "Feb 02, 2024"
    }
  ]);

  // Bulk Selection States
  const [selectedIds, setSelectedIds] = useState([]);

  // Toggle single featured state
  const toggleFeatured = (id) => {
    setBooks(books.map(b => b.id === id ? { ...b, featured: !b.featured } : b));
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

  const handleDeleteMock = (id) => {
    if (confirm("Are you sure you want to delete this book? (Mock Action)")) {
      setBooks(books.filter(b => b.id !== id));
    }
  };

  // Filter logic
  const filteredBooks = books.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.penName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || b.status === statusFilter;
    const matchesGenre = genreFilter === "All" || b.genres.includes(genreFilter);
    const matchesPenName = penNameFilter === "All" || b.penName === penNameFilter;
    return matchesSearch && matchesStatus && matchesGenre && matchesPenName;
  });

  return (
    <div className="space-y-8 font-sans text-left pb-10">
      
      {/* 1. BREADCRUMBS & PAGE HEADER */}
      <div className="space-y-1">
        <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-charcoal/40 select-none">
          Library / Books
        </div>
        <h1 className="text-3xl sm:text-[36px] font-serif font-bold text-charcoal leading-tight">
          Manage Books
        </h1>
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
            placeholder="Search by title, pen name, or genre..."
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
            <option value="Published">Published</option>
            <option value="Coming Soon">Coming Soon</option>
            <option value="Draft">Draft</option>
          </select>

          {/* Genre Filter */}
          <select 
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
            className="px-4 py-2.5 bg-[#F5F4F0] border border-[#E5E3DC]/70 rounded-xl text-xs text-charcoal/80 focus:outline-none cursor-pointer min-w-[120px]"
          >
            <option value="All">Genre</option>
            <option value="Gothic">Gothic</option>
            <option value="Mystery">Mystery</option>
            <option value="Thriller">Thriller</option>
            <option value="Romance">Romance</option>
            <option value="Billionaire">Billionaire</option>
          </select>

          {/* Pen Name Filter */}
          <select 
            value={penNameFilter}
            onChange={(e) => setPenNameFilter(e.target.value)}
            className="px-4 py-2.5 bg-[#F5F4F0] border border-[#E5E3DC]/70 rounded-xl text-xs text-charcoal/80 focus:outline-none cursor-pointer min-w-[120px]"
          >
            <option value="All">Pen Name</option>
            <option value="Elias Thorne">Elias Thorne</option>
            <option value="Adam Woodrow">Adam Woodrow</option>
          </select>

          {/* More Filters Toggle */}
          <button className="px-4 py-2.5 border border-[#E5E3DC]/70 rounded-xl text-xs text-charcoal/60 hover:text-gold hover:border-gold/30 transition-colors flex items-center gap-1.5 cursor-pointer">
            <FiSliders size={13} />
            <span>Filters</span>
          </button>

        </div>
      </div>

      {/* 3. CATALOG LIST TABLE CARD */}
      <div className="bg-white border border-[#E5E3DC]/50 rounded-[24px] shadow-sm overflow-hidden p-6 sm:p-8 space-y-6">
        
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
                <th className="pb-4 pr-4">Last Updated</th>
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
                  <td className="py-5 pr-4">{b.cover}</td>
                  <td className="py-5 pr-4 text-left">
                    <span className="block font-serif font-bold text-charcoal group-hover:text-gold transition-colors leading-tight">{b.title}</span>
                    <span className="block text-[11px] text-charcoal/50 font-sans font-light mt-0.5">{b.penName}</span>
                  </td>
                  <td className="py-5 pr-4">
                    <div className="flex flex-col gap-1 w-fit">
                      {b.genres.map((g, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-[#FFF3D4] text-[#8C5E28] rounded-md text-[9px] font-bold block select-none">
                          {g}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-5 pr-4 font-sans font-light">{b.language}</td>
                  <td className="py-5 pr-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold block w-fit select-none ${b.statusClass}`}>
                      <span className="inline-block w-1 h-1 rounded-full bg-current mr-1.5 align-middle" />
                      {b.status}
                    </span>
                  </td>
                  <td className="py-5 pr-4 text-center">
                    <button 
                      onClick={() => toggleFeatured(b.id)}
                      className={`p-1.5 focus:outline-none transition-colors cursor-pointer ${b.featured ? 'text-gold' : 'text-charcoal/20 hover:text-gold/40'}`}
                      title={b.featured ? "Unfeature novel" : "Feature novel"}
                    >
                      <FiStar size={16} fill={b.featured ? "currentColor" : "none"} />
                    </button>
                  </td>
                  <td className="py-5 pr-4 font-sans font-light">{b.updated}</td>
                  <td className="py-5 text-right whitespace-nowrap">
                    <div className="inline-flex gap-2">
                      <Link 
                        to={`/admin/books`}
                        className="p-2 border border-[#E5E3DC] hover:border-gold hover:bg-gold/5 rounded-lg text-charcoal/40 hover:text-gold transition-colors"
                        title="Edit Details"
                      >
                        <FiEdit3 size={14} />
                      </Link>
                      <button 
                        onClick={() => handleDeleteMock(b.id)}
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

        {/* Table Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E5E3DC]/30">
          <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal/40 font-sans">
            Showing {filteredBooks.length} of {books.length} books
          </span>

          {/* Pagination */}
          <div className="flex items-center gap-1 select-none">
            <button className="w-8 h-8 rounded-lg border border-[#E5E3DC] text-charcoal/40 flex items-center justify-center hover:bg-[#F5F4F0] cursor-pointer">
              {"<"}
            </button>
            <button className="w-8 h-8 rounded-lg bg-[#0A180E] text-white flex items-center justify-center text-xs font-bold font-sans">
              1
            </button>
            <button className="w-8 h-8 rounded-lg border border-[#E5E3DC] text-charcoal/60 flex items-center justify-center hover:bg-[#F5F4F0] text-xs font-medium cursor-pointer">
              2
            </button>
            <button className="w-8 h-8 rounded-lg border border-[#E5E3DC] text-charcoal/60 flex items-center justify-center hover:bg-[#F5F4F0] text-xs font-medium cursor-pointer">
              3
            </button>
            <button className="w-8 h-8 rounded-lg border border-[#E5E3DC] text-charcoal/40 flex items-center justify-center hover:bg-[#F5F4F0] cursor-pointer">
              {">"}
            </button>
          </div>
        </div>

      </div>

      {/* 4. BOTTOM METRICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Words Card */}
        <div className="bg-white border border-[#E5E3DC]/50 p-6 rounded-[24px] shadow-sm flex flex-col justify-between items-start space-y-4">
          <span className="text-[10px] uppercase font-bold text-charcoal/40 tracking-wider block font-sans">
            Total Words Published
          </span>
          <div className="space-y-1">
            <h3 className="text-3xl font-serif font-bold text-charcoal leading-none">
              1,240,892
            </h3>
            <span className="text-[10px] text-[#2E6B40] font-sans font-semibold inline-flex items-center gap-1 pt-1">
              <FiTrendingUp size={12} />
              <span>+12k this month</span>
            </span>
          </div>
        </div>

        {/* Active Pen Names Card (Forest Green Background) */}
        <div className="bg-[#0A180E] text-white p-6 rounded-[24px] shadow-sm flex flex-col justify-between items-start space-y-4 relative overflow-hidden">
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
              3 Entities
            </h3>
            <div className="flex -space-x-3 pt-1 select-none">
              <div className="w-8 h-8 rounded-full bg-gold/30 border-2 border-[#0A180E] flex items-center justify-center text-[9px] font-bold text-white">ET</div>
              <div className="w-8 h-8 rounded-full bg-[#E2F0D9] border-2 border-[#0A180E] flex items-center justify-center text-[9px] font-bold text-[#2E6B40]">AW</div>
              <div className="w-8 h-8 rounded-full bg-[#FFF3D4] border-2 border-[#0A180E] flex items-center justify-center text-[9px] font-bold text-[#A87900]">LH</div>
            </div>
          </div>
        </div>

        {/* Storage Usage Card */}
        <div className="bg-white border border-[#E5E3DC]/50 p-6 rounded-[24px] shadow-sm flex flex-col justify-between items-start space-y-4 relative overflow-hidden">
          <span className="text-[10px] uppercase font-bold text-charcoal/40 tracking-wider block font-sans">
            Storage Usage
          </span>
          <div className="space-y-2 w-full">
            <h3 className="text-3xl font-serif font-bold text-charcoal leading-none">
              84%
            </h3>
            <div className="space-y-2 w-full pt-1.5 relative">
              <div className="w-full h-2 bg-[#F5F4F0] rounded-full overflow-hidden">
                <div className="h-full bg-gold rounded-full" style={{ width: '84%' }} />
              </div>
              
              {/* Cloud Backdrop */}
              <div className="absolute right-0 -bottom-1 text-charcoal/5 pointer-events-none select-none">
                <svg className="w-14 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                </svg>
              </div>
            </div>
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

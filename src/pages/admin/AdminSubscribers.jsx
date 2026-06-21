import { useState } from "react";
import { FiSearch, FiCalendar, FiDownload, FiChevronLeft, FiChevronRight, FiUsers, FiMail } from "react-icons/fi";

// Customized inline SVG icons for table row sources
function HomeIcon() {
  return (
    <svg className="w-3.5 h-3.5 inline mr-1.5 text-charcoal/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg className="w-3.5 h-3.5 inline mr-1.5 text-charcoal/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}

function MailIcon() {
  return (
    <span className="inline mr-1.5 text-charcoal/50 font-bold text-xs select-none">@</span>
  );
}

export default function AdminSubscribers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const mockSubs = [
    { 
      initials: "JD", 
      name: "Julian De Luca", 
      email: "j.deluca@example.com", 
      genre: "MM Romance", 
      genreClass: "bg-[#FFF8EE] text-[#C07E20] border-amber-200/50",
      source: <><HomeIcon />Homepage</>, 
      date: "Oct 12, 2023",
      avatarBg: "bg-[#FFF0D4] text-[#C07E20]"
    },
    { 
      initials: "EM", 
      name: "Elena Moretti", 
      email: "elena.writing@cloud.com", 
      genre: "Fantasy", 
      genreClass: "bg-[#ECFDFC] text-[#0D9488] border-teal-200/50",
      source: <><BookIcon />Book Detail</>, 
      date: "Oct 11, 2023",
      avatarBg: "bg-[#D1FAE5] text-[#0F766E]"
    },
    { 
      initials: "SR", 
      name: "Samuel Reed", 
      email: "s.reed.88@webmail.org", 
      genre: "MM Romance", 
      genreClass: "bg-[#FFF8EE] text-[#C07E20] border-amber-200/50",
      source: <><MailIcon />Newsletter Page</>, 
      date: "Oct 10, 2023",
      avatarBg: "bg-[#F3F4F6] text-[#4B5563]"
    },
    { 
      initials: "CH", 
      name: "Clara Hayes", 
      email: "clara.books@media.net", 
      genre: "Literary", 
      genreClass: "bg-[#F3F4F6] text-[#4B5563] border-gray-200/50",
      source: <><HomeIcon />Homepage</>, 
      date: "Oct 09, 2023",
      avatarBg: "bg-[#E5E7EB] text-[#374151]"
    }
  ];

  const handleExport = () => {
    alert("Exporting subscribers list to CSV format...");
  };

  return (
    <div className="space-y-8 font-sans text-left pb-16">
      
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] tracking-[0.2em] font-bold text-[#C5A880] uppercase block">
            Subscriber Base
          </span>
          <h1 className="text-4xl font-serif font-bold text-[#0E1D14] tracking-tight mt-1">
            Newsletter Subscribers
          </h1>
        </div>
        <button 
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 border border-[#C5A880]/40 hover:border-[#C5A880] hover:bg-[#C5A880]/5 text-[#A58860] hover:text-[#A58860] rounded-lg text-xs font-semibold tracking-wide transition-colors cursor-pointer select-none"
        >
          <FiDownload className="w-3.5 h-3.5" />
          <span>Export</span>
        </button>
      </div>

      {/* 2. Statistics Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Total Subscribers */}
        <div className="bg-white rounded-2xl p-6 border border-[#E5E3DC]/40 shadow-sm flex flex-col justify-between items-start space-y-4">
          <div className="w-full flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-[#F0F4F1] text-[#1A3020] flex items-center justify-center">
              <FiUsers size={16} />
            </div>
            <span className="text-[10px] font-bold text-[#2E6B40] bg-[#E2F0D9] px-2 py-0.5 rounded-full flex items-center gap-0.5">
              ↗ 12%
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal/40 block">
              Total Subscribers
            </span>
            <h3 className="text-3xl font-serif font-bold text-[#0E1D14] mt-1.5">
              12,482
            </h3>
          </div>
        </div>

        {/* Card 2: This Month */}
        <div className="bg-white rounded-2xl p-6 border border-[#E5E3DC]/40 shadow-sm flex flex-col justify-between items-start space-y-4">
          <div className="w-full flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-[#FAF5ED] text-[#A58860] flex items-center justify-center">
              <FiCalendar size={16} />
            </div>
            <span className="text-[10px] font-bold text-[#2E6B40] bg-[#E2F0D9] px-2 py-0.5 rounded-full">
              +842
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal/40 block">
              This Month
            </span>
            <h3 className="text-3xl font-serif font-bold text-[#0E1D14] mt-1.5">
              +6.4%
            </h3>
          </div>
        </div>

        {/* Card 3: Favorite Genre */}
        <div className="bg-white rounded-2xl p-6 border border-[#E5E3DC]/40 shadow-sm flex flex-col justify-between items-start space-y-4">
          <div className="w-9 h-9 rounded-xl bg-[#FDF2F2] text-red-500 flex items-center justify-center">
            <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal/40 block">
              Favorite Genre
            </span>
            <h3 className="text-2xl font-serif font-bold text-[#0E1D14] mt-1.5 leading-tight">
              MM Romance
            </h3>
          </div>
        </div>

        {/* Card 4: Latest Signup */}
        <div className="bg-white rounded-2xl p-6 border border-[#E5E3DC]/40 shadow-sm flex flex-col justify-between items-start space-y-4">
          <div className="w-9 h-9 rounded-xl bg-[#F4F4F4] text-charcoal flex items-center justify-center">
            <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal/40 block">
              Latest Signup
            </span>
            <h3 className="text-2xl font-serif font-bold text-[#0E1D14] mt-1.5 leading-tight">
              2 minutes ago
            </h3>
          </div>
        </div>

      </div>

      {/* 3. Filters / Search Row */}
      <div className="flex flex-col md:flex-row items-center gap-4 justify-between bg-white border border-[#E5E3DC]/40 p-4 rounded-2xl shadow-sm">
        
        {/* Search input */}
        <div className="relative w-full md:max-w-md">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/40">
            <FiSearch size={14} />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full bg-[#F5F4F0] border border-[#E5E3DC] rounded-xl px-4 py-3 pl-10 text-xs text-charcoal focus:outline-none focus:border-gold font-sans"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Favorite Genre Dropdown */}
          <div className="relative w-1/2 md:w-44">
            <select 
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full bg-[#F5F4F0] border border-[#E5E3DC] rounded-xl px-4 py-3 pr-8 text-xs text-charcoal focus:outline-none focus:border-gold appearance-none font-sans font-semibold cursor-pointer"
            >
              <option value="">Favorite Genre</option>
              <option value="MM Romance">MM Romance</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Literary">Literary</option>
            </select>
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal/40 pointer-events-none">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </div>

          {/* Signup Date Filter */}
          <button
            onClick={() => alert("Date filtering option triggered.")}
            className="w-1/2 md:w-44 bg-[#F5F4F0] border border-[#E5E3DC] rounded-xl px-4 py-3 text-xs text-charcoal hover:bg-[#E5E3DC]/30 transition-all font-sans font-semibold flex items-center justify-between cursor-pointer"
          >
            <span>Signup Date</span>
            <FiCalendar className="text-charcoal/40 shrink-0" size={14} />
          </button>
        </div>

      </div>

      {/* 4. Table Grid */}
      <div className="bg-white border border-[#E5E3DC]/40 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E5E3DC]/30 text-[10px] font-bold uppercase tracking-widest text-[#2C302E]/60 bg-[#FBFBFB]">
                <th className="p-5 pl-8">Name</th>
                <th className="p-5">Email</th>
                <th className="p-5">Genre</th>
                <th className="p-5">Source</th>
                <th className="p-5 pr-8">Date Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E3DC]/25 text-xs text-charcoal-light">
              {mockSubs
                .filter(sub => {
                  const matchSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                      sub.email.toLowerCase().includes(searchTerm.toLowerCase());
                  const matchGenre = selectedGenre ? sub.genre === selectedGenre : true;
                  return matchSearch && matchGenre;
                })
                .map((sub, idx) => (
                  <tr key={idx} className="hover:bg-[#F5F4F0]/20 transition-colors">
                    {/* Name */}
                    <td className="p-5 pl-8 flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${sub.avatarBg} flex items-center justify-center font-bold text-xs shadow-sm select-none`}>
                        {sub.initials}
                      </div>
                      <span className="font-bold text-charcoal">{sub.name}</span>
                    </td>
                    {/* Email */}
                    <td className="p-5 font-mono text-[11px] text-charcoal/70">{sub.email}</td>
                    {/* Genre */}
                    <td className="p-5">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wider select-none ${sub.genreClass}`}>
                        {sub.genre}
                      </span>
                    </td>
                    {/* Source */}
                    <td className="p-5 font-sans font-light flex items-center h-full pt-6 text-charcoal/60">
                      {sub.source}
                    </td>
                    {/* Date */}
                    <td className="p-5 pr-8 font-sans font-light text-charcoal/50">{sub.date}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="bg-[#FBFBFB] border-t border-[#E5E3DC]/30 p-5 px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-sans text-charcoal/50 select-none">
          <span>Showing 1-10 of 12,482 subscribers</span>
          <div className="flex items-center gap-1.5">
            <button className="w-8 h-8 rounded-full border border-[#E5E3DC]/60 hover:bg-[#E5E3DC]/20 flex items-center justify-center transition-colors cursor-pointer">
              <FiChevronLeft size={14} />
            </button>
            <button className="w-8 h-8 rounded-full bg-[#0A180E] text-white flex items-center justify-center font-semibold">
              1
            </button>
            <button className="w-8 h-8 rounded-full hover:bg-[#E5E3DC]/25 flex items-center justify-center transition-colors cursor-pointer">
              2
            </button>
            <button className="w-8 h-8 rounded-full hover:bg-[#E5E3DC]/25 flex items-center justify-center transition-colors cursor-pointer">
              3
            </button>
            <span className="px-1 text-charcoal/30">...</span>
            <button className="w-10 h-8 rounded-full hover:bg-[#E5E3DC]/25 flex items-center justify-center transition-colors cursor-pointer">
              1249
            </button>
            <button className="w-8 h-8 rounded-full border border-[#E5E3DC]/60 hover:bg-[#E5E3DC]/20 flex items-center justify-center transition-colors cursor-pointer">
              <FiChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* 5. Tagline Signature Footer */}
      <div className="flex flex-col items-center justify-center pt-8 space-y-3">
        {/* Styled gold lineart logo representing Aethelgard tower/flag */}
        <div className="w-8 h-10 text-[#C5A880]">
          <svg className="w-full h-full" viewBox="0 0 30 40" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 5 L20 10 L15 10 Z" fill="#C5A880" />
            <line x1="15" y1="5" x2="15" y2="35" />
            <rect x="10" y="32" width="10" height="3" rx="0.5" />
            <path d="M 8 32 C 10 20, 20 20, 22 32 Z" />
          </svg>
        </div>
        <p className="font-serif italic text-sm text-[#C5A880]/80">
          Curated with intent, written for the ages.
        </p>
      </div>

    </div>
  );
}

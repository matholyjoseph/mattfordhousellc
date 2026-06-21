import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminNewBook() {
  const navigate = useNavigate();

  // Input states
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [slug, setSlug] = useState("");
  const [penName, setPenName] = useState("Elias Thorne");
  const [genre, setGenre] = useState("Epic Fantasy");
  const [language, setLanguage] = useState("English (US)");
  const [seriesName, setSeriesName] = useState("The Eternal Library");
  const [bookNumber, setBookNumber] = useState("1");
  const [releaseDate, setReleaseDate] = useState("");
  const [status, setStatus] = useState("Draft");

  // Premium feature: automatically generate slug from title
  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    setSlug(generatedSlug);
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert(`Book "${title}" has been successfully added! (Mock Action)`);
    navigate("/admin/books");
  };

  return (
    <div className="space-y-8 font-sans text-left pb-10">
      
      {/* 1. BREADCRUMBS & PAGE HEADER */}
      <div className="space-y-1">
        <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-charcoal/40 select-none">
          Library / Books / New Entry
        </div>
        <h1 className="text-3xl sm:text-[36px] font-serif font-bold text-charcoal leading-tight">
          Add New Book
        </h1>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* 2. BASIC INFORMATION CARD */}
        <div className="bg-white p-8 sm:p-10 rounded-[32px] border border-[#E5E3DC]/40 shadow-xl space-y-8">
          
          {/* Card Header */}
          <div className="flex items-center gap-3 select-none">
            <div className="w-8 h-8 rounded-full bg-[#162A1D]/10 text-[#162A1D] flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-charcoal">
              Basic Information
            </h2>
          </div>

          {/* Form Input Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            
            {/* Book Title */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-charcoal/60 tracking-widest block font-sans">
                Book Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Whispers of the High Peaks"
                value={title}
                onChange={handleTitleChange}
                className="w-full bg-transparent border-b border-[#E5E3DC] focus:border-gold pb-2 outline-none text-sm text-charcoal placeholder-charcoal/30 pt-1 font-sans transition-colors"
              />
            </div>

            {/* Subtitle */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-charcoal/60 tracking-widest block font-sans">
                Subtitle
              </label>
              <input
                type="text"
                placeholder="e.g. A Tale of Shadow and Stone"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full bg-transparent border-b border-[#E5E3DC] focus:border-gold pb-2 outline-none text-sm text-charcoal placeholder-charcoal/30 pt-1 font-sans transition-colors"
              />
            </div>

            {/* URL Slug prefixing */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-charcoal/60 tracking-widest block font-sans">
                URL Slug
              </label>
              <div className="flex items-center text-sm border-b border-[#E5E3DC] focus-within:border-gold pb-2 pt-1 transition-colors font-sans">
                <span className="text-charcoal/40 select-none">eliasthorne.com/books/</span>
                <input
                  type="text"
                  required
                  placeholder="whispers-high-peaks"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="bg-transparent border-none outline-none pl-1 w-full text-charcoal placeholder-charcoal/30"
                />
              </div>
            </div>

            {/* Pen Name Selector */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-charcoal/60 tracking-widest block font-sans">
                Pen Name
              </label>
              <div className="relative border-b border-[#E5E3DC] focus-within:border-gold pb-2 transition-colors">
                <select
                  value={penName}
                  onChange={(e) => setPenName(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm text-charcoal appearance-none pt-1 font-sans cursor-pointer"
                >
                  <option value="Elias Thorne">Elias Thorne</option>
                  <option value="Adam Woodrow">Adam Woodrow</option>
                  <option value="Laura Dalton">Laura Dalton</option>
                  <option value="Lucien Hart">Lucien Hart</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal/40">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Genre Selector */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-charcoal/60 tracking-widest block font-sans">
                Genre
              </label>
              <div className="relative border-b border-[#E5E3DC] focus-within:border-gold pb-2 transition-colors">
                <select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm text-charcoal appearance-none pt-1 font-sans cursor-pointer"
                >
                  <option value="Epic Fantasy">Epic Fantasy</option>
                  <option value="Gothic Mystery">Gothic Mystery</option>
                  <option value="Suspense Thriller">Suspense Thriller</option>
                  <option value="Billionaire Romance">Billionaire Romance</option>
                  <option value="Culinary Arts">Culinary Arts</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal/40">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Language Selector */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-charcoal/60 tracking-widest block font-sans">
                Language
              </label>
              <div className="relative border-b border-[#E5E3DC] focus-within:border-gold pb-2 transition-colors">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm text-charcoal appearance-none pt-1 font-sans cursor-pointer"
                >
                  <option value="English (US)">English (US)</option>
                  <option value="English (UK)">English (UK)</option>
                  <option value="German">German</option>
                  <option value="French">French</option>
                  <option value="Spanish">Spanish</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal/40">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Series Name */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-charcoal/60 tracking-widest block font-sans">
                Series Name
              </label>
              <input
                type="text"
                placeholder="The Eternal Library"
                value={seriesName}
                onChange={(e) => setSeriesName(e.target.value)}
                className="w-full bg-transparent border-b border-[#E5E3DC] focus:border-gold pb-2 outline-none text-sm text-charcoal placeholder-charcoal/30 pt-1 font-sans transition-colors"
              />
            </div>

            {/* Book Number */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-charcoal/60 tracking-widest block font-sans">
                Book Number
              </label>
              <input
                type="text"
                placeholder="1"
                value={bookNumber}
                onChange={(e) => setBookNumber(e.target.value)}
                className="w-full bg-transparent border-b border-[#E5E3DC] focus:border-gold pb-2 outline-none text-sm text-charcoal placeholder-charcoal/30 pt-1 font-sans transition-colors"
              />
            </div>

            {/* Release Date */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-charcoal/60 tracking-widest block font-sans">
                Release Date
              </label>
              <div className="relative border-b border-[#E5E3DC] focus-within:border-gold pb-2 transition-colors">
                <input
                  type="date"
                  required
                  value={releaseDate}
                  onChange={(e) => setReleaseDate(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm text-[#555] pt-1 font-sans cursor-pointer"
                />
              </div>
            </div>

            {/* Status Button Toggle controls */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-charcoal/60 tracking-widest block font-sans">
                Status
              </label>
              <div className="flex gap-3 pt-1 select-none">
                {["Draft", "Published", "Coming Soon"].map((opt) => {
                  const isActive = status === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setStatus(opt)}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold font-sans transition-all duration-200 border cursor-pointer ${
                        isActive 
                          ? "bg-[#0A180E] border-[#0A180E] text-white shadow" 
                          : "bg-white border-[#E5E3DC] text-charcoal/70 hover:border-gold/30 hover:bg-[#F5F4F0]/30"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* 3. FORM ACTIONS BAR */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-4 border-t border-[#E5E3DC]/30">
          
          {/* Cancel button */}
          <button
            type="button"
            onClick={() => navigate("/admin/books")}
            className="text-charcoal/70 hover:text-gold font-semibold text-xs sm:text-sm font-sans flex items-center gap-1.5 transition-colors cursor-pointer focus:outline-none"
          >
            <span>← Cancel and Return</span>
          </button>

          {/* Save/Publish triggers */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                alert(`Draft "${title || 'Untitled Book'}" saved successfully!`);
                navigate("/admin/books");
              }}
              className="flex-1 sm:flex-initial px-6 py-3.5 bg-white hover:bg-[#F5F4F0]/30 border border-[#E5E3DC] rounded-xl text-xs sm:text-sm font-bold text-charcoal transition-all shadow-sm cursor-pointer"
            >
              Save Draft
            </button>
            <button
              type="submit"
              className="flex-1 sm:flex-initial px-8 py-3.5 bg-[#0A180E] hover:bg-gold text-white hover:text-[#0A180E] rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer"
            >
              Publish Book
            </button>
          </div>

        </div>

      </form>

    </div>
  );
}

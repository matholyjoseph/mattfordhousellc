import { useState } from "react";
import { FiUploadCloud, FiBook, FiEye, FiSliders, FiHome, FiMail, FiBookmark, FiList, FiPlus } from "react-icons/fi";

// SVG cover placeholders
function SilentPineMockCover() {
  return (
    <div className="w-12 h-16 rounded bg-[#0F1D13] border border-gold/20 flex flex-col justify-between p-1 shrink-0 overflow-hidden shadow">
      <div className="text-[5px] text-gold/80 font-serif leading-none mt-1">THE SILENT PINE</div>
      <svg className="w-6 h-6 text-gold/30 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 2 L19 14 L15 14 L20 20 L4 20 L9 14 L5 14 Z" />
      </svg>
      <div className="text-[3px] text-gold/40 text-center uppercase tracking-widest leading-none mb-0.5">Thorne</div>
    </div>
  );
}

function EchoesPeakMockCover() {
  return (
    <div className="w-12 h-16 rounded bg-[#2D4C35] border border-gold/20 flex flex-col justify-between p-1 shrink-0 overflow-hidden shadow">
      <div className="text-[5px] text-cream/90 font-serif leading-none mt-1">ECHOES OF PEAKS</div>
      <svg className="w-6 h-6 text-gold/30 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M 4 20 L 12 5 L 20 20 Z" />
      </svg>
      <div className="text-[3px] text-cream/50 text-center uppercase tracking-widest leading-none mb-0.5">Thorne</div>
    </div>
  );
}

function WriterMockPhoto() {
  return (
    <div className="w-20 h-20 rounded-xl bg-cream-dark border border-[#E5E3DC] flex items-center justify-center p-1 overflow-hidden relative shadow-inner">
      <svg className="w-full h-full text-charcoal/20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="50" cy="35" r="18" />
        <path d="M20 85 C20 60, 80 60, 80 85 Z" fill="currentColor" opacity="0.4" />
        {/* Cabin window line */}
        <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
      </svg>
    </div>
  );
}

export default function AdminHomepageSettings() {
  const [formData, setFormData] = useState({
    headline: "Unveiling the Mysteries of the North",
    subtitle: "A journey through silent peaks.",
    primaryButtonLabel: "Read Now",
    primaryLink: "https://eliasthorne.com/books/the-silent-peak",
    aboutHeadline: "A Voice from the Wilderness",
    bioSnippet: "Evelyn Thorne writes from a cabin tucked deep within the Cascades. Her prose is inspired by the crunch of fallen leaves and the haunting silence of the alpine night.",
    booksCount: "12",
    reviewsCount: "5k+",
    platformsCount: "4",
    genresCount: "3",
    newsletterHeading: "Join the Mountain Inner Circle",
    newsletterDescription: "Monthly updates, exclusive reviews, and previews."
  });

  const [previewMode, setPreviewMode] = useState("mobile"); // mobile, desktop

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Homepage settings successfully synchronized and saved!");
  };

  return (
    <div className="space-y-6 font-sans text-left pb-16">
      
      {/* Split Columns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Editor (8 Cols) */}
        <form 
          id="homepage-settings-form"
          onSubmit={handleSave} 
          className="lg:col-span-7 space-y-6"
        >
          
          {/* Card 1: Hero Section */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5E3DC]/40 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-charcoal flex items-center gap-2 border-b border-[#E5E3DC]/25 pb-3">
              <span className="text-[#C5A880] text-sm">▲</span>
              <span>Hero Section</span>
            </h3>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Headline</label>
                <input 
                  type="text" 
                  value={formData.headline}
                  onChange={(e) => handleInputChange("headline", e.target.value)}
                  placeholder="Unveiling the Mysteries of the North"
                  className="w-full px-3 py-2 text-xs bg-[#F5F4F0] border border-[#E5E3DC] rounded-xl focus:outline-none focus:border-gold text-charcoal"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Subtitle</label>
                <textarea 
                  rows="2"
                  value={formData.subtitle}
                  onChange={(e) => handleInputChange("subtitle", e.target.value)}
                  placeholder="A brief hook about your literary world..."
                  className="w-full px-3 py-2 text-xs bg-[#F5F4F0] border border-[#E5E3DC] rounded-xl focus:outline-none focus:border-gold text-charcoal"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Primary Button Label</label>
                  <input 
                    type="text" 
                    value={formData.primaryButtonLabel}
                    onChange={(e) => handleInputChange("primaryButtonLabel", e.target.value)}
                    placeholder="Read Now"
                    className="w-full px-3 py-2 text-xs bg-[#F5F4F0] border border-[#E5E3DC] rounded-xl focus:outline-none focus:border-gold text-charcoal"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Primary Link</label>
                  <input 
                    type="text" 
                    value={formData.primaryLink}
                    onChange={(e) => handleInputChange("primaryLink", e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 text-xs bg-[#F5F4F0] border border-[#E5E3DC] rounded-xl focus:outline-none focus:border-gold text-charcoal"
                  />
                </div>
              </div>

              {/* Upload Dropzone placeholder */}
              <div className="border-2 border-dashed border-[#E5E3DC] rounded-2xl p-6 text-center hover:border-gold transition-colors select-none cursor-pointer flex flex-col items-center justify-center space-y-2">
                <FiUploadCloud size={24} className="text-charcoal/40" />
                <span className="text-[11px] font-bold text-charcoal/70">Upload Hero Cover Image</span>
                <span className="text-[9px] text-charcoal/40">Recommended: 1920×1080 px (WebP or JPEG)</span>
              </div>

            </div>
          </div>

          {/* Card 2: Featured Books */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5E3DC]/40 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-[#E5E3DC]/25 pb-3">
              <h3 className="font-serif font-bold text-lg text-charcoal flex items-center gap-2">
                <FiBook size={18} className="text-[#C5A880]" />
                <span>Featured Books</span>
              </h3>
              <button 
                type="button" 
                onClick={() => alert("Add featured book modal triggered.")}
                className="text-[11px] font-bold text-[#C5A880] hover:text-[#A58860] flex items-center gap-1 cursor-pointer"
              >
                <FiPlus size={12} />
                <span>Add Book</span>
              </button>
            </div>

            {/* List with drag-handles simulation */}
            <div className="space-y-2">
              <div className="flex items-center justify-between border border-[#E5E3DC]/55 p-3 rounded-xl hover:border-gold/30 bg-[#FBFBF9]/35">
                <div className="flex items-center gap-3">
                  <FiList className="text-charcoal/30 cursor-grab shrink-0" size={14} />
                  <SilentPineMockCover />
                  <div>
                    <span className="block text-xs font-bold text-charcoal leading-tight">The Silent Pine</span>
                    <span className="block text-[10px] text-charcoal/40 font-light mt-0.5">Published Oct 2023</span>
                  </div>
                </div>
                <button type="button" className="text-red-400 hover:text-red-500 text-[10px] font-bold">Remove</button>
              </div>

              <div className="flex items-center justify-between border border-[#E5E3DC]/55 p-3 rounded-xl hover:border-gold/30 bg-[#FBFBF9]/35">
                <div className="flex items-center gap-3">
                  <FiList className="text-charcoal/30 cursor-grab shrink-0" size={14} />
                  <EchoesPeakMockCover />
                  <div>
                    <span className="block text-xs font-bold text-charcoal leading-tight">Echoes of the Peaks</span>
                    <span className="block text-[10px] text-charcoal/40 font-light mt-0.5">Published Jan 2024</span>
                  </div>
                </div>
                <button type="button" className="text-red-400 hover:text-red-500 text-[10px] font-bold">Remove</button>
              </div>
            </div>
          </div>

          {/* Card 3: About Section */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5E3DC]/40 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-charcoal flex items-center gap-2 border-b border-[#E5E3DC]/25 pb-3">
              <span className="text-[#C5A880] text-sm">👤</span>
              <span>About Section</span>
            </h3>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">About Headline</label>
                <input 
                  type="text" 
                  value={formData.aboutHeadline}
                  onChange={(e) => handleInputChange("aboutHeadline", e.target.value)}
                  placeholder="A Voice from the Wilderness"
                  className="w-full px-3 py-2 text-xs bg-[#F5F4F0] border border-[#E5E3DC] rounded-xl focus:outline-none focus:border-gold text-charcoal"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Biography Snippet</label>
                <textarea 
                  rows="3"
                  value={formData.bioSnippet}
                  onChange={(e) => handleInputChange("bioSnippet", e.target.value)}
                  placeholder="Bio snippet details..."
                  className="w-full px-3 py-2 text-xs bg-[#F5F4F0] border border-[#E5E3DC] rounded-xl focus:outline-none focus:border-gold text-charcoal leading-relaxed"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Card 4: Stats & Achievements */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5E3DC]/40 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-charcoal flex items-center gap-2 border-b border-[#E5E3DC]/25 pb-3">
              <FiSliders size={18} className="text-[#C5A880]" />
              <span>Stats & Achievements</span>
            </h3>

            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-bold text-charcoal/50 tracking-wider block">Books</label>
                <input 
                  type="text" 
                  value={formData.booksCount}
                  onChange={(e) => handleInputChange("booksCount", e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F5F4F0] border border-[#E5E3DC] rounded-xl text-center font-bold text-charcoal"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-bold text-charcoal/50 tracking-wider block">Reviews</label>
                <input 
                  type="text" 
                  value={formData.reviewsCount}
                  onChange={(e) => handleInputChange("reviewsCount", e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F5F4F0] border border-[#E5E3DC] rounded-xl text-center font-bold text-charcoal"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-bold text-charcoal/50 tracking-wider block">Platforms</label>
                <input 
                  type="text" 
                  value={formData.platformsCount}
                  onChange={(e) => handleInputChange("platformsCount", e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F5F4F0] border border-[#E5E3DC] rounded-xl text-center font-bold text-charcoal"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-bold text-charcoal/50 tracking-wider block">Genres</label>
                <input 
                  type="text" 
                  value={formData.genresCount}
                  onChange={(e) => handleInputChange("genresCount", e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F5F4F0] border border-[#E5E3DC] rounded-xl text-center font-bold text-charcoal"
                />
              </div>
            </div>
          </div>

          {/* Card 5: Newsletter Hook */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5E3DC]/40 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-charcoal flex items-center gap-2 border-b border-[#E5E3DC]/25 pb-3">
              <FiMail size={18} className="text-[#C5A880]" />
              <span>Newsletter Hook</span>
            </h3>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Heading</label>
                <input 
                  type="text" 
                  value={formData.newsletterHeading}
                  onChange={(e) => handleInputChange("newsletterHeading", e.target.value)}
                  placeholder="Join the Inner Circle"
                  className="w-full px-3 py-2 text-xs bg-[#F5F4F0] border border-[#E5E3DC] rounded-xl focus:outline-none focus:border-gold text-charcoal"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Description</label>
                <input 
                  type="text" 
                  value={formData.newsletterDescription}
                  onChange={(e) => handleInputChange("newsletterDescription", e.target.value)}
                  placeholder="Monthly updates..."
                  className="w-full px-3 py-2 text-xs bg-[#F5F4F0] border border-[#E5E3DC] rounded-xl focus:outline-none focus:border-gold text-charcoal"
                />
              </div>
            </div>
          </div>

        </form>

        {/* Right Column: Live Viewport Preview (5 Cols) */}
        <div className="lg:col-span-5 lg:sticky lg:top-6 space-y-4 select-none">
          <div className="flex justify-between items-center">
            <span className="text-xs uppercase font-bold tracking-wider text-charcoal/50">Live Preview</span>
            <div className="flex items-center bg-[#F5F4F0] rounded-lg p-0.5 border border-[#E5E3DC]/60">
              <button 
                onClick={() => setPreviewMode("desktop")}
                className={`p-1.5 rounded transition-all cursor-pointer ${previewMode === "desktop" ? "bg-white text-[#C5A880] shadow-sm" : "text-charcoal/40"}`}
                title="Desktop View"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </button>
              <button 
                onClick={() => setPreviewMode("mobile")}
                className={`p-1.5 rounded transition-all cursor-pointer ${previewMode === "mobile" ? "bg-white text-[#C5A880] shadow-sm" : "text-charcoal/40"}`}
                title="Mobile View"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <line x1="12" y1="18" x2="12" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Smartphone device frame */}
          <div className="relative mx-auto max-w-[280px] sm:max-w-[310px] bg-[#0E1D14] p-3 rounded-[40px] shadow-2xl border-4 border-[#2C302E]">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#2C302E] rounded-full z-20 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-black/45" />
            </div>
            
            {/* Screen Content Wrapper */}
            <div className="bg-[#FDFBF7] rounded-[30px] overflow-hidden min-h-[500px] max-h-[580px] overflow-y-auto relative text-center text-charcoal text-[9px] pt-4 font-sans custom-scroll">
              
              {/* Site URL bar mockup */}
              <div className="bg-[#FAF9F5] border-b border-[#E5E3DC] py-1 text-[7px] text-charcoal/40 font-mono tracking-wide uppercase select-none mb-1">
                mountain-library.com/home
              </div>

              {/* Hero Banner Render */}
              <div className="bg-[#0E1D14] text-cream p-5 py-8 space-y-3 relative overflow-hidden flex flex-col items-center">
                <h4 className="font-serif font-bold text-base leading-tight text-white max-w-[200px]">
                  {formData.headline || "Headline Title"}
                </h4>
                <p className="text-[8px] text-[#C5A880]/85 font-light leading-relaxed max-w-[170px]">
                  {formData.subtitle || "Subtitle hook line goes here..."}
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <button className="bg-[#C5A880] text-[#0E1D14] font-bold text-[7px] uppercase tracking-wider py-1 px-3.5 rounded-full">
                    {formData.primaryButtonLabel || "Read"}
                  </button>
                  <button className="border border-white/40 text-white font-semibold text-[7px] uppercase tracking-wider py-1 px-3.5 rounded-full bg-white/5">
                    Explore
                  </button>
                </div>
              </div>

              {/* Featured Works Section */}
              <div className="py-6 px-4 space-y-4 bg-white">
                <div className="relative flex items-center justify-center">
                  <div className="h-px bg-[#E5E3DC] w-full absolute" />
                  <span className="relative bg-white px-3 font-serif font-bold text-[10px] text-charcoal uppercase tracking-widest">
                    Featured Works
                  </span>
                </div>
                
                <div className="flex items-center justify-center gap-4">
                  <div className="flex flex-col items-center space-y-1.5">
                    <SilentPineMockCover />
                    <span className="font-bold text-[8px] text-charcoal">The Silent Pine</span>
                  </div>
                  <div className="flex flex-col items-center space-y-1.5">
                    <EchoesPeakMockCover />
                    <span className="font-bold text-[8px] text-charcoal">Echoes of Peaks</span>
                  </div>
                </div>
              </div>

              {/* About Section Render */}
              <div className="py-6 px-4 space-y-3 bg-[#FDFBF7] text-left">
                <h4 className="font-serif font-bold text-xs text-[#0E1D14] leading-tight">
                  {formData.aboutHeadline || "About Headline"}
                </h4>
                <div className="flex gap-3 items-start">
                  <p className="text-[7.5px] leading-relaxed text-charcoal/70 font-light flex-1">
                    {formData.bioSnippet || "Biography paragraph info..."}
                  </p>
                  <WriterMockPhoto />
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* 5. Mockup Footer Section */}
      <footer className="border-t border-[#E5E3DC] pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] text-charcoal/40 font-sans tracking-wide">
        <span>© 2024 Cinematic Editorial Publishing. All rights reserved.</span>
        <div className="flex items-center gap-4 font-semibold">
          <a href="#support" className="hover:text-gold transition-colors">Support</a>
          <a href="#privacy" className="hover:text-gold transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-gold transition-colors">Terms of Service</a>
        </div>
      </footer>

    </div>
  );
}

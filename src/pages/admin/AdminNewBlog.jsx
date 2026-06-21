import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  FiFileText, FiImage, FiTag, FiChevronDown, FiSend
} from "react-icons/fi";

// High-fidelity SVG illustration representing a fountain pen on an open notebook under soft lighting
function OpenDiaryFeaturedPlaceholder() {
  return (
    <div className="w-full aspect-[16/9] bg-[#161412] rounded-xl overflow-hidden relative shadow-md border border-[#E5E3DC]/40 select-none">
      <svg className="w-full h-full" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Background table surface gradient */}
          <linearGradient id="deskGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3827" />
            <stop offset="100%" stopColor="#0A180E" />
          </linearGradient>
          
          {/* Warm lamp light glow */}
          <radialGradient id="lampGlow" cx="20%" cy="20%" r="90%">
            <stop offset="0%" stopColor="#FFEFA6" stopOpacity="0.35" />
            <stop offset="40%" stopColor="#FFDF80" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Page gradient for depth */}
          <linearGradient id="pageLeft" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#E1D7C6" />
            <stop offset="10%" stopColor="#FAF5EC" />
            <stop offset="100%" stopColor="#F2EAE0" />
          </linearGradient>
          <linearGradient id="pageRight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#DCD0BD" />
            <stop offset="10%" stopColor="#FAF5EC" />
            <stop offset="100%" stopColor="#ECE2D5" />
          </linearGradient>

          {/* Drop shadow for the book */}
          <filter id="bookShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="15" dy="25" stdDeviation="20" floodColor="#000000" floodOpacity="0.5" />
          </filter>
          
          {/* Drop shadow for the pen */}
          <filter id="penShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="8" dy="12" stdDeviation="6" floodColor="#000000" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Desk Surface */}
        <rect width="1200" height="630" fill="url(#deskGrad)" />
        <rect width="1200" height="630" fill="url(#lampGlow)" />

        {/* The Open Journal */}
        <g transform="rotate(-4 600 315)" filter="url(#bookShadow)">
          {/* Leather Cover Backing */}
          <rect x="230" y="90" width="740" height="460" rx="20" fill="#42251B" stroke="#2B160E" strokeWidth="4" />
          <rect x="225" y="85" width="750" height="470" rx="22" fill="none" stroke="#C5A880" strokeWidth="1.5" opacity="0.3" />

          {/* Paper Stack Left Page */}
          <path d="M 260 110 C 450 105, 540 120, 580 130 L 580 520 C 540 510, 450 495, 260 500 Z" fill="url(#pageLeft)" />
                
          {/* Paper Stack Right Page */}
          <path d="M 940 110 C 750 105, 660 120, 620 130 L 620 520 C 660 510, 750 495, 940 500 Z" fill="url(#pageRight)" />

          {/* Page spine shading */}
          <path d="M 580 130 C 595 131, 605 131, 620 130 L 620 520 C 605 521, 595 521, 580 520 Z" fill="#D2C4B1" opacity="0.8" />
          <line x1="600" y1="128" x2="600" y2="522" stroke="#5C4D3C" strokeWidth="2.5" opacity="0.7" />

          {/* Left Page Content (Subtle lines) */}
          <g stroke="#7A6C5E" strokeWidth="2" strokeLinecap="round" opacity="0.4" transform="translate(20, 0)">
            <path d="M 280 160 H 520 M 280 195 H 500 M 280 230 H 530 M 280 265 H 480 M 280 300 H 510 M 280 335 H 490 M 280 370 H 520 M 280 405 H 460 M 280 440 H 500" strokeDasharray="8 5 4 5" />
          </g>

          {/* Right Page Content */}
          <g stroke="#7A6C5E" strokeWidth="2" strokeLinecap="round" opacity="0.4" transform="translate(10, 0)">
            <path d="M 640 160 H 880 M 640 195 H 860 M 640 230 H 890 M 640 265 H 840 M 640 300 H 870 M 640 335 H 850 M 640 370 H 880 M 640 405 H 830 M 640 440 H 860" strokeDasharray="9 4 5 4" />
          </g>
          
          {/* Bookmark ribbon */}
          <path d="M 600 128 C 590 200, 630 380, 660 550" stroke="#8C251C" strokeWidth="12" strokeLinecap="round" fill="none" opacity="0.9" />
          <path d="M 600 128 C 590 200, 630 380, 660 550" stroke="#B83A2E" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.9" />
        </g>

        {/* The Fountain Pen (Lying diagonally) */}
        <g transform="translate(10, 0)" filter="url(#penShadow)">
          <g transform="rotate(25 620 300)">
            {/* Pen Body (Dark Charcoal/Green Marble) */}
            <rect x="400" y="280" width="380" height="24" rx="12" fill="#1C2E24" stroke="#101C15" strokeWidth="2" />
            
            {/* Pen Cap */}
            <rect x="630" y="278" width="160" height="28" rx="6" fill="#15241D" stroke="#0E1813" strokeWidth="2" />
            
            {/* Gold Clip */}
            <rect x="660" y="274" width="90" height="6" rx="3" fill="#D4AF37" />
            <path d="M 750 274 L 755 285 L 745 285 Z" fill="#D4AF37" />
            
            {/* Gold Bands */}
            <rect x="630" y="278" width="8" height="28" fill="#D4AF37" />
            <rect x="782" y="278" width="8" height="28" fill="#D4AF37" />
            <rect x="400" y="280" width="12" height="24" fill="#D4AF37" />
            <rect x="520" y="280" width="6" height="24" fill="#D4AF37" />
            
            {/* Nib */}
            <rect x="375" y="284" width="25" height="16" fill="#111" />
            <path d="M 375 282 L 330 286 L 310 292 L 330 298 L 375 302 Z" fill="#D4AF37" stroke="#AA8010" strokeWidth="1" />
            <path d="M 355 288 L 325 292 L 355 296 Z" fill="#ECEFF1" />
            <line x1="310" y1="292" x2="350" y2="292" stroke="#222" strokeWidth="1.2" />
            <circle cx="350" cy="292" r="2.5" fill="#222" />
          </g>
        </g>

        {/* Lamp Glow Overlay */}
        <rect width="1200" height="630" fill="url(#lampGlow)" style={{ mixBlendMode: "overlay" }} />
      </svg>
    </div>
  );
}

export default function AdminNewBlog() {
  const navigate = useNavigate();

  // Blog inputs
  const [title, setTitle] = useState("A Journey Through Forgotten Libraries");
  const [slug, setSlug] = useState("new-journey-into-words");
  const [content, setContent] = useState(
    "The scent of aged paper and leather-bound secrets is a universal language for those who live in the margins of stories. I remember the first time I stepped into the Library of Saint-Émilion, where time seemed to fold like an accordion...\n\nStart typing your masterpiece here. Use the toolbar above to style your narrative. Intellectual depth and quiet luxury await every paragraph."
  );

  // SEO details
  const [metaTitle, setMetaTitle] = useState("A Journey Through Forgotten L");
  const [metaDescription, setMetaDescription] = useState(
    "Explore the sensory world of vintage book collections and the architectural beauty of Europe's hidden libraries with author Elias Thorne."
  );

  // Sidebar controls
  const [category, setCategory] = useState("Literature & Essays");
  const [connectedBook, setConnectedBook] = useState("None");
  const [tags, setTags] = useState(["Philosophy", "History"]);
  const [newTag, setNewTag] = useState("");

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    setSlug(generatedSlug);
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && newTag.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(newTag.trim())) {
        setTags([...tags, newTag.trim()]);
      }
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handlePublish = (e) => {
    e.preventDefault();
    alert(`Blog post "${title}" published successfully! (Mock Action)`);
    navigate("/admin/blogs");
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
      
      {/* 1. TOP HEADER BAR - Styled exactly like the mockup */}
      <div className="w-full bg-white border-b border-[#E5E3DC] h-20 px-8 flex items-center justify-between z-20 shrink-0">
        <h1 className="text-2xl sm:text-[28px] font-serif font-bold text-charcoal tracking-tight">
          Write Blog Post
        </h1>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                alert(`Draft for "${title || 'Untitled'}" saved successfully!`);
                navigate("/admin/blogs");
              }}
              className="px-5 py-2 bg-white border border-[#E5E3DC] hover:bg-[#F5F4F0] rounded-lg text-xs font-bold text-charcoal shadow-sm cursor-pointer transition-all duration-150"
            >
              Save Draft
            </button>
            <button
              type="button"
              onClick={handlePublish}
              className="px-6 py-2 bg-[#0A180E] hover:bg-[#C5A880] text-white hover:text-[#0A180E] rounded-lg text-xs font-bold shadow-md cursor-pointer transition-all duration-150"
            >
              Publish
            </button>
          </div>

          {/* Vertical divider */}
          <div className="h-6 w-px bg-[#E5E3DC]" />

          {/* Notification, Mail, and Profile */}
          <div className="flex items-center gap-4 text-charcoal/75">
            <button className="hover:text-gold transition-colors relative cursor-pointer" title="Notifications">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
              <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>
            
            <button className="hover:text-gold transition-colors cursor-pointer" title="Messages">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </button>

            {/* Profile Avatar Placeholder */}
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#C5A880]/30 bg-[#C5A880]/15 flex items-center justify-center font-serif font-bold text-[10px] text-charcoal">
              <svg className="w-full h-full text-charcoal-dark" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM8 34c0-6 6-8 12-8s12 2 12 8" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN GRID COLUMN */}
      <div className="flex-grow p-6 md:p-8 w-full max-w-[1400px] mx-auto text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Editor & SEO */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Post Title Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#E5E3DC]/60 shadow-sm space-y-3">
              <input
                type="text"
                placeholder="Enter post title..."
                value={title}
                onChange={handleTitleChange}
                className="w-full bg-transparent outline-none text-3xl sm:text-4xl font-serif font-bold text-charcoal placeholder-charcoal/20 border-none leading-tight"
              />
              {/* Slug link row */}
              <div className="flex items-center gap-1.5 text-xs text-charcoal/40 font-sans">
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span>eliasthorne.com/blog/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="bg-transparent border-none outline-none font-bold underline text-charcoal/80 w-full cursor-pointer focus:text-gold"
                />
              </div>
            </div>

            {/* Rich Editor Toolbar Card */}
            <div className="bg-white border border-[#E5E3DC]/60 rounded-2xl shadow-sm overflow-hidden flex flex-col">
              
              {/* Formatting Toolbar */}
              <div className="bg-[#F9F9F8] border-b border-[#E5E3DC]/60 p-3 flex flex-wrap items-center gap-1.5 select-none">
                
                <button type="button" className="w-8 h-8 rounded-md hover:bg-white hover:shadow-sm text-charcoal/70 hover:text-charcoal flex items-center justify-center font-bold text-xs transition-all">B</button>
                <button type="button" className="w-8 h-8 rounded-md hover:bg-white hover:shadow-sm text-charcoal/70 hover:text-charcoal flex items-center justify-center italic text-xs transition-all">I</button>
                <button type="button" className="w-8 h-8 rounded-md hover:bg-white hover:shadow-sm text-charcoal/70 hover:text-charcoal flex items-center justify-center underline text-xs transition-all">U</button>
                
                <div className="h-5 w-px bg-[#E5E3DC] mx-2" />
                
                <button type="button" className="w-8 h-8 rounded-md hover:bg-white hover:shadow-sm text-charcoal/70 hover:text-charcoal flex items-center justify-center font-serif text-sm transition-all">T</button>
                <button type="button" className="w-8 h-8 rounded-md hover:bg-white hover:shadow-sm text-charcoal/70 hover:text-charcoal flex items-center justify-center font-serif text-lg leading-none transition-all">”</button>
                
                <div className="h-5 w-px bg-[#E5E3DC] mx-2" />
                
                <button type="button" className="w-8 h-8 rounded-md hover:bg-white hover:shadow-sm text-charcoal/70 hover:text-charcoal flex items-center justify-center transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                </button>
                <button type="button" className="w-8 h-8 rounded-md hover:bg-white hover:shadow-sm text-charcoal/70 hover:text-charcoal flex items-center justify-center transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                  </svg>
                </button>

                <div className="h-5 w-px bg-[#E5E3DC] mx-2" />

                <button type="button" className="w-8 h-8 rounded-md hover:bg-white hover:shadow-sm text-charcoal/70 hover:text-charcoal flex items-center justify-center transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                  </svg>
                </button>
                <button type="button" className="w-8 h-8 rounded-md hover:bg-white hover:shadow-sm text-charcoal/70 hover:text-charcoal flex items-center justify-center transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </button>
                <button type="button" className="w-8 h-8 rounded-md hover:bg-white hover:shadow-sm text-charcoal/70 hover:text-charcoal flex items-center justify-center transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                  </svg>
                </button>

                <div className="flex-grow" />

                <button type="button" className="w-8 h-8 rounded-md hover:bg-white hover:shadow-sm text-charcoal/70 hover:text-charcoal flex items-center justify-center transition-all" title="Toggle Fullscreen">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75v4.5m0-4.5h-4.5m4.5 0L15 9m5.25 11.25v-4.5m0 4.5h-4.5m4.5 0L15 15" />
                  </svg>
                </button>

              </div>

              {/* Editable Content area - Serif font as in Mockup */}
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-96 p-6 focus:outline-none text-base text-charcoal-light leading-relaxed font-serif font-light resize-none bg-transparent"
                placeholder="Start typing your masterpiece here..."
              />

            </div>

            {/* SEO & Visibility Panel */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E3DC]/60 shadow-sm space-y-6">
              
              {/* Title with badge */}
              <div className="flex items-center justify-between select-none">
                <h3 className="font-serif font-bold text-xl text-charcoal">
                  SEO & Visibility
                </h3>
                <span className="px-2.5 py-0.5 bg-[#FFF3D4] text-[#8C5E28] rounded-full text-[9px] font-bold block tracking-wider">
                  OPTIMIZED
                </span>
              </div>

              {/* SEO Inputs & Google Mockup */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Meta Inputs */}
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-charcoal/40 tracking-widest block font-sans">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      className="w-full bg-[#F5F4F0]/60 border border-[#E5E3DC] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-gold text-charcoal font-sans font-semibold transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-charcoal/40 tracking-widest block font-sans">
                      Meta Description
                    </label>
                    <textarea
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      rows="3"
                      className="w-full bg-[#F5F4F0]/60 border border-[#E5E3DC] rounded-xl p-4 text-xs focus:outline-none focus:border-gold text-charcoal resize-none leading-relaxed font-sans font-semibold transition-colors h-[100px]"
                    />
                  </div>
                </div>

                {/* Google Result Preview */}
                <div className="space-y-2 text-left">
                  <span className="text-[10px] uppercase font-bold text-charcoal/40 tracking-widest block mb-2 font-sans select-none">
                    Google Preview
                  </span>
                  
                  <div className="bg-white border border-[#E5E3DC]/60 rounded-xl p-5 text-left space-y-2 shadow-sm min-h-[175px]">
                    {/* Google blue/brown title */}
                    <h4 className="font-serif font-bold text-[#8C5E28] hover:underline cursor-pointer text-[15px] leading-tight">
                      {metaTitle || "A Journey Through Forgotten Libraries"} | Elias Thorne
                    </h4>
                    {/* Green route prefix */}
                    <div className="text-[11px] text-[#2E6B40] font-sans flex items-center gap-1 font-medium leading-none">
                      <span>eliasthorne.com</span>
                      <span>›</span>
                      <span>blog</span>
                      <span>›</span>
                      <span className="max-w-[120px] truncate">{slug || "new-journey-into-words"}</span>
                    </div>
                    {/* Gray snippet */}
                    <p className="text-[12px] text-charcoal/70 leading-relaxed font-sans font-light">
                      {metaDescription || "Explore the sensory world of vintage book collections..."}
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Right Side: Settings widgets */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Post Status widget */}
            <div className="bg-white p-5 rounded-2xl border border-[#E5E3DC]/60 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-[#E5E3DC]/30 pb-3 select-none">
                <FiSend size={15} className="text-charcoal/75" />
                <h4 className="font-serif font-bold text-sm text-charcoal">Post Status</h4>
              </div>

              <div className="space-y-3 text-xs font-sans">
                <div className="flex justify-between items-center">
                  <span className="text-charcoal/50 font-light">Status</span>
                  <span className="font-bold text-charcoal">Draft</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-charcoal/50 font-light">Visibility</span>
                  <span className="font-bold text-charcoal">Public</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-charcoal/50 font-light">Schedule</span>
                  <span className="font-bold text-charcoal">Immediately</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert("Previewing post layout... (Mock Action)")}
                className="w-full py-3 bg-[#EAE8E3] hover:bg-[#C5A880] text-charcoal hover:text-[#0A180E] text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all duration-150 shadow-sm cursor-pointer mt-2"
              >
                Preview Post
              </button>
            </div>

            {/* Featured Image widget */}
            <div className="bg-white p-5 rounded-2xl border border-[#E5E3DC]/60 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-[#E5E3DC]/30 pb-3 select-none">
                <FiImage size={15} className="text-charcoal/75" />
                <h4 className="font-serif font-bold text-sm text-charcoal">Featured Image</h4>
              </div>

              {/* High-fidelity Open diary placeholder SVG */}
              <OpenDiaryFeaturedPlaceholder />

              <span className="block text-[9px] text-charcoal/40 font-sans font-light select-none text-center">
                Recommended size: 1200 × 630 px
              </span>
            </div>

            {/* Category widget */}
            <div className="bg-white p-5 rounded-2xl border border-[#E5E3DC]/60 shadow-sm space-y-4">
              <div className="space-y-2 relative text-left">
                <label className="text-[10px] uppercase font-bold text-charcoal/60 tracking-widest block font-sans select-none">
                  Category
                </label>
                
                {/* Rounded Box Select */}
                <div className="relative bg-[#F5F4F0]/60 border border-[#E5E3DC] rounded-xl px-4 py-3 focus-within:border-gold transition-colors">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-transparent outline-none text-xs text-charcoal appearance-none font-sans cursor-pointer font-bold pr-8"
                  >
                    <option value="Literature & Essays">Literature & Essays</option>
                    <option value="Writing Updates">Writing Updates</option>
                    <option value="Behind the Scenes">Behind the Scenes</option>
                    <option value="Publishing Tips">Publishing Tips</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal/50">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Connected Book widget */}
            <div className="bg-white p-5 rounded-2xl border border-[#E5E3DC]/60 shadow-sm space-y-4">
              <div className="space-y-2 relative text-left">
                <label className="text-[10px] uppercase font-bold text-charcoal/60 tracking-widest block font-sans select-none">
                  Connected Book
                </label>
                
                {/* Rounded Box Select */}
                <div className="relative bg-[#F5F4F0]/60 border border-[#E5E3DC] rounded-xl px-4 py-3 focus-within:border-gold transition-colors">
                  <select
                    value={connectedBook}
                    onChange={(e) => setConnectedBook(e.target.value)}
                    className="w-full bg-transparent outline-none text-xs text-charcoal appearance-none font-sans cursor-pointer font-bold pr-8"
                  >
                    <option value="None">None</option>
                    <option value="Whispers in the Pines">Whispers in the Pines</option>
                    <option value="The Silent Peak">The Silent Peak</option>
                    <option value="Gold Coast Legacy">Gold Coast Legacy</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal/50">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags widget */}
            <div className="bg-white p-5 rounded-2xl border border-[#E5E3DC]/60 shadow-sm space-y-4">
              <div className="space-y-3 relative text-left">
                <label className="text-[10px] uppercase font-bold text-charcoal/60 tracking-widest block font-sans select-none">
                  Tags
                </label>
                
                {/* Tags List block */}
                <div className="flex flex-wrap gap-2 py-1">
                  {tags.map((t) => (
                    <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFF3D4] text-[#8C5E28] rounded-full text-[10px] font-bold select-none">
                      <span>{t}</span>
                      <button 
                        type="button" 
                        onClick={() => handleRemoveTag(t)}
                        className="hover:text-red-500 font-bold focus:outline-none cursor-pointer text-xs"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                {/* Add tags input */}
                <div className="relative bg-[#F5F4F0]/60 border border-[#E5E3DC] rounded-xl px-4 py-3 focus-within:border-gold transition-colors flex items-center">
                  <input
                    type="text"
                    placeholder="Add tags..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={handleAddTag}
                    className="w-full bg-transparent outline-none text-xs text-charcoal placeholder-charcoal/30 font-sans font-semibold"
                  />
                  <span className="text-charcoal/40 shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a1.5 1.5 0 002.122 0l4.318-4.318a1.5 1.5 0 000-2.122L11.16 3.659A2.25 2.25 0 009.568 3z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* 3. PAGE BOTTOM STATUS BAR */}
        <div className="border-t border-[#E5E3DC] mt-16 pt-5 pb-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-medium text-charcoal/40 font-sans gap-4 select-none">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-charcoal/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
              </svg>
              Last saved: 2 minutes ago
            </span>
            <span>Word Count: 1,204</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link to="/admin/support" className="hover:text-gold transition-colors">Support</Link>
            <span>© 2024 Elias Thorne. All rights reserved.</span>
          </div>
        </div>

      </div>

    </div>
  );
}

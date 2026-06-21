import { useState } from "react";
import Container from "../../components/layout/Container";
import { FiCheck } from "react-icons/fi";

// High-fidelity B&W SVG Image Placeholders
function NotebookPlaceholder() {
  return (
    <div className="w-full aspect-[3/4] bg-[#1E1E1E] rounded-2xl overflow-hidden relative shadow-lg border border-[#2D2D2D] group">
      <svg className="w-full h-full" viewBox="0 0 300 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="notebookBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2D2D2D" />
            <stop offset="100%" stopColor="#121212" />
          </linearGradient>
          <linearGradient id="lightBeam" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFF" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#FFF" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#FFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="300" height="400" fill="url(#notebookBg)" />
        {/* Wooden desk planks at bottom */}
        <rect x="0" y="330" width="300" height="70" fill="#18100E" />
        <line x1="0" y1="360" x2="300" y2="360" stroke="#0A0605" strokeWidth="2" />
        {/* Shadow */}
        <rect x="35" y="85" width="230" height="210" rx="8" fill="#000" opacity="0.4" />
        {/* Notebook cover */}
        <rect x="40" y="75" width="220" height="200" rx="8" fill="#242C30" stroke="#333E44" strokeWidth="2" />
        {/* Gold foil text on cover */}
        <text x="150" y="155" fill="#C5A880" fontSize="13" fontFamily="Playfair Display, serif" letterSpacing="3" textAnchor="middle" fontWeight="bold">ELIAS THORNE</text>
        <text x="150" y="175" fill="#C5A880" fontSize="8" fontFamily="Inter, sans-serif" letterSpacing="4" textAnchor="middle" opacity="0.8">JOURNAL NOTES</text>
        {/* Elastic band */}
        <rect x="215" y="75" width="12" height="200" fill="#121719" />
        {/* Sun stripes */}
        <polygon points="0,0 80,0 230,400 0,400" fill="url(#lightBeam)" />
        <polygon points="130,0 220,0 350,400 260,400" fill="url(#lightBeam)" />
      </svg>
      {/* Label overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
        <span className="text-[10px] text-gold uppercase tracking-widest font-sans font-bold">Notebook & Sunlight</span>
      </div>
    </div>
  );
}

function StackedBooksPlaceholder() {
  return (
    <div className="w-full aspect-[3/4] bg-[#1A1A1A] rounded-2xl overflow-hidden relative shadow-lg border border-[#2D2D2D] group">
      <svg className="w-full h-full" viewBox="0 0 300 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="spineShade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#444" />
            <stop offset="50%" stopColor="#222" />
            <stop offset="100%" stopColor="#111" />
          </linearGradient>
        </defs>
        <rect width="300" height="400" fill="#131313" />
        <rect x="0" y="0" width="300" height="400" fill="url(#spineShade)" opacity="0.15" />
        
        {/* Stack of books spine views */}
        {/* Book 1 (Bottom) */}
        <rect x="25" y="315" width="250" height="50" rx="4" fill="#3D2825" stroke="#1D0F0D" strokeWidth="2" />
        <line x1="45" y1="315" x2="45" y2="365" stroke="#C5A880" strokeWidth="2" />
        <line x1="235" y1="315" x2="235" y2="365" stroke="#C5A880" strokeWidth="2" />
        
        {/* Book 2 */}
        <rect x="30" y="270" width="240" height="42" rx="4" fill="#1C2E24" stroke="#0C1B12" strokeWidth="2" />
        <line x1="50" y1="270" x2="50" y2="312" stroke="#A58860" strokeWidth="1.5" />
        <line x1="230" y1="270" x2="230" y2="312" stroke="#A58860" strokeWidth="1.5" />
        
        {/* Book 3 */}
        <rect x="27" y="230" width="246" height="38" rx="4" fill="#253A4B" stroke="#10202B" strokeWidth="2" />
        <line x1="47" y1="230" x2="47" y2="268" stroke="#C5A880" strokeWidth="1.8" />
        <line x1="227" y1="230" x2="227" y2="268" stroke="#C5A880" strokeWidth="1.8" />
        
        {/* Book 4 */}
        <rect x="34" y="192" width="232" height="36" rx="4" fill="#4A2F13" stroke="#2D1A06" strokeWidth="2" />
        <line x1="54" y1="192" x2="54" y2="228" stroke="#A58860" strokeWidth="1.5" />
        
        {/* Book 5 */}
        <rect x="30" y="156" width="240" height="34" rx="4" fill="#5C252D" stroke="#3B1016" strokeWidth="2" />
        <line x1="50" y1="156" x2="50" y2="190" stroke="#C5A880" strokeWidth="1.5" />
        
        {/* Book 6 (Top) */}
        <rect x="38" y="124" width="224" height="30" rx="3" fill="#2E2E2E" stroke="#1E1E1E" strokeWidth="1.5" />
        <line x1="58" y1="124" x2="58" y2="154" stroke="#C5A880" strokeWidth="1.2" />
        
        {/* Shading/Highlights overlay */}
        <rect x="0" y="0" width="300" height="400" fill="url(#spineShade)" opacity="0.35" style={{ mixBlendMode: "multiply" }} />
      </svg>
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
        <span className="text-[10px] text-gold uppercase tracking-widest font-sans font-bold">Stacked Book Spines</span>
      </div>
    </div>
  );
}

function OpenDiaryPlaceholder() {
  return (
    <div className="w-full aspect-[3/4] bg-[#161616] rounded-2xl overflow-hidden relative shadow-lg border border-[#2D2D2D] group">
      <svg className="w-full h-full" viewBox="0 0 300 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="deskLampGlow" cx="150" cy="120" r="180" fx="150" fy="100">
            <stop offset="0%" stopColor="#FFF3D4" stopOpacity="0.2" />
            <stop offset="60%" stopColor="#FFEAA7" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="300" height="400" fill="#14110F" />
        
        {/* Open Diary shadow */}
        <rect x="25" y="95" width="250" height="220" rx="10" fill="#000" opacity="0.5" />
        
        {/* Diary leather cover backing */}
        <rect x="30" y="90" width="240" height="210" rx="8" fill="#3D2520" />
        
        {/* Pages */}
        {/* Left page */}
        <path d="M 40 100 C 95 98, 140 102, 148 103 L 148 297 C 140 296, 95 292, 40 295 Z" fill="#F3ECE0" stroke="#D1C7BD" strokeWidth="1" />
        {/* Right page */}
        <path d="M 260 100 C 205 98, 160 102, 152 103 L 152 297 C 160 296, 205 292, 260 295 Z" fill="#F3ECE0" stroke="#D1C7BD" strokeWidth="1" />
        
        {/* Page binding center fold */}
        <rect x="148" y="103" width="4" height="194" fill="#A89C90" />
        
        {/* Handwritten text lines on left page */}
        <path d="M 50 120 H 135 M 50 135 H 130 M 50 150 H 138 M 55 165 H 132 M 50 180 H 135 M 50 195 H 125 M 50 210 H 138 M 55 225 H 130 M 50 240 H 135" stroke="#7A6C5E" strokeWidth="1" strokeDasharray="3,2.5" />
        
        {/* Handwritten text lines on right page */}
        <path d="M 165 120 H 250 M 165 135 H 245 M 165 150 H 252 M 168 165 H 240 M 165 180 H 248 M 165 195 H 235 M 165 210 H 252 M 168 225 H 245 M 165 240 H 248" stroke="#7A6C5E" strokeWidth="1" strokeDasharray="3,2.5" />
        
        {/* Modern pen diagonally resting */}
        {/* Pen Shadow */}
        <line x1="100" y1="260" x2="200" y2="140" stroke="#000" strokeWidth="5" opacity="0.35" strokeLinecap="round" />
        {/* Pen body */}
        <line x1="95" y1="255" x2="195" y2="135" stroke="#1F1F1F" strokeWidth="4" strokeLinecap="round" />
        <line x1="95" y1="255" x2="195" y2="135" stroke="#C5A880" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="12,4" />
        {/* Pen clip */}
        <line x1="175" y1="155" x2="185" y2="145" stroke="#C5A880" strokeWidth="1" />
        
        {/* Soft yellow lamp glow */}
        <circle cx="150" cy="200" r="160" fill="url(#deskLampGlow)" />
      </svg>
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
        <span className="text-[10px] text-gold uppercase tracking-widest font-sans font-bold">Open Journal & Pen</span>
      </div>
    </div>
  );
}

function LibraryArmchairPlaceholder() {
  return (
    <div className="w-full aspect-[3/4] bg-[#111111] rounded-2xl overflow-hidden relative shadow-lg border border-[#262626] group">
      <svg className="w-full h-full" viewBox="0 0 300 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="chairShade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E1E1E" />
            <stop offset="100%" stopColor="#050505" />
          </linearGradient>
          <radialGradient id="lightRay" cx="150" cy="50" r="280" fx="150" fy="0">
            <stop offset="0%" stopColor="#FFF" stopOpacity="0.08" />
            <stop offset="60%" stopColor="#FFF" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Background wall */}
        <rect width="300" height="400" fill="#0A0A0A" />
        
        {/* Bookshelves in background */}
        <rect x="10" y="20" width="280" height="180" fill="#121212" stroke="#080808" strokeWidth="1" />
        <line x1="10" y1="80" x2="290" y2="80" stroke="#080808" strokeWidth="2" />
        <line x1="10" y1="140" x2="290" y2="140" stroke="#080808" strokeWidth="2" />
        {/* Books blocks */}
        <rect x="20" y="30" width="45" height="50" fill="#222" opacity="0.3" />
        <rect x="75" y="35" width="60" height="45" fill="#333" opacity="0.3" />
        <rect x="150" y="25" width="50" height="55" fill="#1A1A1A" opacity="0.3" />
        <rect x="210" y="30" width="70" height="50" fill="#2B2B2B" opacity="0.3" />
        
        {/* Cozy Armchair */}
        <ellipse cx="150" cy="350" rx="85" ry="18" fill="#000" opacity="0.7" />
        
        {/* Chair backrest */}
        <path d="M 85 200 C 85 170, 215 170, 215 200 L 210 290 L 90 290 Z" fill="url(#chairShade)" stroke="#222" strokeWidth="1.5" />
        {/* Tufted buttons lines */}
        <circle cx="120" cy="220" r="1.5" fill="#C5A880" opacity="0.6" />
        <circle cx="150" cy="220" r="1.5" fill="#C5A880" opacity="0.6" />
        <circle cx="180" cy="220" r="1.5" fill="#C5A880" opacity="0.6" />
        
        {/* Chair armrests */}
        <path d="M 70 250 C 70 230, 88 230, 95 250 L 95 310 C 85 320, 70 310, 70 290 Z" fill="#161616" stroke="#252525" strokeWidth="1" />
        <path d="M 230 250 C 230 230, 212 230, 205 250 L 205 310 C 215 320, 230 310, 230 290 Z" fill="#161616" stroke="#252525" strokeWidth="1" />
        
        {/* Chair seat cushion */}
        <path d="M 90 280 H 210 C 215 295, 215 310, 210 320 H 90 C 85 310, 85 295, 90 280 Z" fill="#1C1C1C" stroke="#2D2D2D" strokeWidth="1" />
        
        {/* Open book on the seat */}
        <path d="M 125 295 L 140 298 L 155 295 L 158 303 L 140 306 L 122 303 Z" fill="#7A1D1D" />
        <path d="M 140 298 C 135 297, 127 295, 126 297 L 124 302 C 125 300, 133 302, 140 303 Z" fill="#FFFBF2" />
        <path d="M 140 298 C 145 297, 153 295, 154 297 L 156 302 C 155 300, 147 302, 140 303 Z" fill="#FFFBF2" />
        
        {/* Chair legs */}
        <line x1="95" y1="320" x2="88" y2="345" stroke="#000" strokeWidth="5" />
        <line x1="205" y1="320" x2="212" y2="345" stroke="#000" strokeWidth="5" />
        
        {/* Moody lighting Ray */}
        <polygon points="100,0 200,0 280,400 20,400" fill="url(#lightRay)" />
      </svg>
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
        <span className="text-[10px] text-gold uppercase tracking-widest font-sans font-bold">Library Reading Corner</span>
      </div>
    </div>
  );
}

export default function Newsletter() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [favoriteGenre, setFavoriteGenre] = useState("Romance");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <div className="pb-0 bg-[#FDFBF7] text-charcoal font-sans text-left">
      
      {/* 1. HERO & SIGNUP CARD SECTION */}
      <section className="pt-20 pb-24 text-center">
        <Container className="max-w-3xl">
          <h1 className="text-[44px] sm:text-[56px] font-serif font-bold text-charcoal leading-tight tracking-tight">
            Join The Reader List
          </h1>
          <p className="text-sm sm:text-base text-charcoal-light leading-relaxed max-w-xl mx-auto font-light font-sans mt-3">
            Get new release alerts, book updates, exclusive previews, and reading recommendations delivered directly to your study.
          </p>

          <div className="mt-12 max-w-[480px] mx-auto bg-[#F5F4F0]/65 p-8 sm:p-10 rounded-[32px] border border-[#E5E3DC]/60 shadow-xl space-y-6 text-left">
            {success ? (
              <div className="text-center py-10 space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-[#1A3020]/10 text-[#1A3020] flex items-center justify-center shadow-inner">
                  <FiCheck size={28} className="text-[#1A3020]" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-charcoal pt-2">Thank You!</h3>
                <p className="text-xs sm:text-sm text-charcoal-light font-sans font-light leading-relaxed max-w-xs mx-auto">
                  You have successfully joined the reader list. Check your inbox soon for updates.
                </p>
                <button
                  onClick={() => {
                    setSuccess(false);
                    setFirstName("");
                    setEmail("");
                  }}
                  className="mt-4 px-6 py-2 border border-gold text-charcoal hover:bg-gold/10 rounded-full text-xs font-semibold uppercase tracking-wider transition-luxury cursor-pointer"
                >
                  Subscribe Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* First Name Input */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-charcoal/60 tracking-widest block font-sans">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Elias"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-white border border-[#E5E3DC] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-gold text-charcoal transition-colors shadow-sm"
                  />
                </div>

                {/* Email Address Input */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-charcoal/60 tracking-widest block font-sans">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="reader@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-[#E5E3DC] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-gold text-charcoal transition-colors shadow-sm"
                  />
                </div>

                {/* Favorite Genre Selector */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-charcoal/60 tracking-widest block font-sans">
                    Favorite Genre
                  </label>
                  <div className="relative">
                    <select
                      value={favoriteGenre}
                      onChange={(e) => setFavoriteGenre(e.target.value)}
                      className="w-full bg-white border border-[#E5E3DC] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-gold text-charcoal transition-colors shadow-sm appearance-none cursor-pointer"
                    >
                      <option value="Romance">Romance</option>
                      <option value="Suspense">Suspense</option>
                      <option value="Culinary">Culinary</option>
                      <option value="High Fantasy">High Fantasy</option>
                      <option value="Mystery">Mystery</option>
                    </select>
                    {/* Custom Arrow */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal/40">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#EBD3AC] hover:bg-gold text-forest-dark font-sans font-bold text-xs uppercase tracking-[0.25em] rounded-xl shadow-md transition-luxury cursor-pointer"
                  >
                    Join the List
                  </button>
                </div>

              </form>
            )}
          </div>
        </Container>
      </section>

      {/* 2. GREEN PERKS SECTION */}
      <section className="py-20 bg-[#142318] text-white text-center">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
            
            {/* Perk 1 */}
            <div className="space-y-4">
              <svg className="w-6 h-6 text-gold mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3 className="font-serif font-semibold text-lg text-white">
                New Release Alerts
              </h3>
              <p className="text-xs sm:text-[13px] text-cream/70 font-sans font-light leading-relaxed max-w-xs mx-auto">
                Be the first to know when a new story drops.
              </p>
            </div>

            {/* Perk 2 */}
            <div className="space-y-4">
              <svg className="w-6 h-6 text-gold mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3 className="font-serif font-semibold text-lg text-white">
                Exclusive Sneak Peeks
              </h3>
              <p className="text-xs sm:text-[13px] text-cream/70 font-sans font-light leading-relaxed max-w-xs mx-auto">
                Get access to deleted scenes and early chapters.
              </p>
            </div>

            {/* Perk 3 */}
            <div className="space-y-4">
              <svg className="w-6 h-6 text-gold mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3 className="font-serif font-semibold text-lg text-white">
                Reading Order Guides
              </h3>
              <p className="text-xs sm:text-[13px] text-cream/70 font-sans font-light leading-relaxed max-w-xs mx-auto">
                Never lose your place in a series again.
              </p>
            </div>

            {/* Perk 4 */}
            <div className="space-y-4">
              <svg className="w-6 h-6 text-gold mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 20h9" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3 className="font-serif font-semibold text-lg text-white">
                Special Book Updates
              </h3>
              <p className="text-xs sm:text-[13px] text-cream/70 font-sans font-light leading-relaxed max-w-xs mx-auto">
                Direct notes from the author's desk.
              </p>
            </div>

          </div>
        </Container>
      </section>

      {/* 3. PROMISE QUOTE SECTION */}
      <section className="py-20 bg-cream text-center">
        <Container>
          <div className="w-16 h-px bg-gold/40 mx-auto mb-8" />
          <blockquote className="font-serif text-2xl sm:text-3xl italic text-charcoal leading-relaxed max-w-2xl mx-auto">
            “No spam. Just thoughtful updates when there is something worth sharing.”
          </blockquote>
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C5A880] font-sans block mt-5">
            THE READER'S PROMISE
          </span>
        </Container>
      </section>

      {/* 4. FOUR PLACEHOLDERS GALLERY SECTION */}
      <section className="pb-20 bg-cream">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <NotebookPlaceholder />
            <StackedBooksPlaceholder />
            <OpenDiaryPlaceholder />
            <LibraryArmchairPlaceholder />
          </div>
        </Container>
      </section>

      {/* 5. WAITING TEXT SECTION */}
      <section className="py-16 border-t border-[#E5E3DC] bg-cream text-center">
        <Container className="space-y-3">
          <h2 className="font-serif font-bold text-3xl sm:text-[38px] text-charcoal">
            Your next favorite read may already be waiting.
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-light font-sans font-light max-w-md mx-auto leading-relaxed">
            Join over 15,000 readers who journey through the stories of Elias Thorne.
          </p>
        </Container>
      </section>

    </div>
  );
}

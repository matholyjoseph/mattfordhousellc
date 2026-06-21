import { Link } from "react-router-dom";
import Container from "../../components/layout/Container";
import { FiArrowRight } from "react-icons/fi";

// Local component for custom library window portrait placeholder
function LibraryWindowPlaceholder() {
  return (
    <div className="w-full aspect-[4/5] sm:aspect-square bg-gradient-to-b from-[#2E1D18] via-[#1A0E0B] to-[#0D0504] rounded-[24px] border border-gold/20 shadow-2xl relative overflow-hidden flex items-center justify-center p-6 select-none group">
      {/* Detail Illustration in SVG */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 480" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Wall/Wood Shading */}
          <linearGradient id="wallShade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E120F" />
            <stop offset="60%" stopColor="#0F0806" />
            <stop offset="100%" stopColor="#080302" />
          </linearGradient>
          {/* Gothic Window Warm Light */}
          <radialGradient id="windowGlow" cx="50%" cy="35%" r="55%" fx="50%" fy="30%">
            <stop offset="0%" stopColor="#FFE8B0" stopOpacity="0.85" />
            <stop offset="30%" stopColor="#F5B05C" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#873F1C" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#1C0E07" stopOpacity="0" />
          </radialGradient>
          {/* Banker's Lamp Shade Green */}
          <linearGradient id="lampGreen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2E6B40" />
            <stop offset="100%" stopColor="#0F3818" />
          </linearGradient>
          {/* Soft Shadow under shelves */}
          <linearGradient id="shelfShadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Ambient background shadow */}
        <rect width="400" height="480" fill="url(#wallShade)" />

        {/* --- Back Wall Window --- */}
        {/* Large Gothic Arch Window Outline */}
        <path d="M 120 380 L 120 180 A 80 80 0 0 1 280 180 L 280 380 Z" fill="#1C0E07" />
        {/* Glowing window pane background */}
        <path d="M 124 380 L 124 182 A 76 76 0 0 1 276 182 L 276 380 Z" fill="url(#windowGlow)" />
        
        {/* Gothic Window Tracery / Stone Mullions */}
        {/* Central Vertical Mullion */}
        <line x1="200" y1="100" x2="200" y2="380" stroke="#0D0604" strokeWidth="4" />
        {/* Left Side Mullion */}
        <line x1="162" y1="180" x2="162" y2="380" stroke="#0D0604" strokeWidth="2.5" />
        {/* Right Side Mullion */}
        <line x1="238" y1="180" x2="238" y2="380" stroke="#0D0604" strokeWidth="2.5" />
        
        {/* Gothic Arch Ribs / Tracery */}
        <path d="M 124 180 A 76 76 0 0 1 276 180" fill="none" stroke="#0D0604" strokeWidth="4" />
        <path d="M 162 180 A 38 38 0 0 1 238 180" fill="none" stroke="#0D0604" strokeWidth="3" />
        <path d="M 124 180 A 38 38 0 0 1 200 180" fill="none" stroke="#0D0604" strokeWidth="2" />
        <path d="M 200 180 A 38 38 0 0 1 276 180" fill="none" stroke="#0D0604" strokeWidth="2" />

        {/* Circular rose detail in top center */}
        <circle cx="200" cy="145" r="14" fill="none" stroke="#0D0604" strokeWidth="3" />
        <circle cx="200" cy="145" r="6" fill="#F5B05C" />

        {/* Horizontal Window Transoms */}
        <line x1="124" y1="240" x2="276" y2="240" stroke="#0D0604" strokeWidth="3" />
        <line x1="124" y1="310" x2="276" y2="310" stroke="#0D0604" strokeWidth="3" />

        {/* Soft Window Sun Ray overlay */}
        <polygon points="124,180 276,180 320,440 80,440" fill="url(#windowGlow)" opacity="0.15" />

        {/* --- Bookshelves (Left & Right Flanks) --- */}
        {/* LEFT BOOKSHELF */}
        <rect x="0" y="0" width="105" height="420" fill="#1C0E07" stroke="#0D0604" strokeWidth="2" />
        {/* Shelf 1 */}
        <rect x="0" y="90" width="105" height="8" fill="#2E1C16" />
        <rect x="0" y="98" width="105" height="12" fill="url(#shelfShadow)" />
        {/* Books on Shelf 1 */}
        <rect x="10" y="30" width="14" height="60" fill="#8B2635" />
        <rect x="24" y="25" width="16" height="65" fill="#3D5A80" />
        <rect x="40" y="40" width="12" height="50" fill="#C5A880" />
        <path d="M 52 90 L 68 75 L 82 79 L 66 94 Z" fill="#2E6B40" />

        {/* Shelf 2 */}
        <rect x="0" y="180" width="105" height="8" fill="#2E1C16" />
        <rect x="0" y="188" width="105" height="12" fill="url(#shelfShadow)" />
        {/* Books on Shelf 2 */}
        <rect x="15" y="120" width="15" height="60" fill="#4A5859" />
        <rect x="30" y="115" width="12" height="65" fill="#A27B5C" />
        <rect x="42" y="130" width="18" height="50" fill="#1E3A27" />
        <rect x="60" y="110" width="15" height="70" fill="#8B2635" />
        <rect x="75" y="125" width="16" height="55" fill="#2C3E50" />

        {/* Shelf 3 */}
        <rect x="0" y="270" width="105" height="8" fill="#2E1C16" />
        <rect x="0" y="278" width="105" height="12" fill="url(#shelfShadow)" />
        {/* Books on Shelf 3 */}
        <rect x="8" y="210" width="16" height="60" fill="#A58860" />
        <rect x="24" y="200" width="18" height="70" fill="#3E2723" />
        <rect x="42" y="215" width="14" height="55" fill="#2E6B40" />
        <rect x="56" y="220" width="12" height="50" fill="#8B2635" />
        <path d="M 68 270 L 88 250 L 98 258 L 78 278 Z" fill="#3D5A80" />

        {/* Shelf 4 */}
        <rect x="0" y="360" width="105" height="8" fill="#2E1C16" />
        <rect x="0" y="368" width="105" height="12" fill="url(#shelfShadow)" />
        {/* Books on Shelf 4 */}
        <rect x="12" y="300" width="18" height="60" fill="#2C3E50" />
        <rect x="30" y="295" width="14" height="65" fill="#C5A880" />
        <rect x="44" y="310" width="16" height="50" fill="#8B2635" />
        <rect x="60" y="290" width="20" height="70" fill="#1A3020" />

        {/* RIGHT BOOKSHELF */}
        <rect x="295" y="0" width="105" height="420" fill="#1C0E07" stroke="#0D0604" strokeWidth="2" />
        {/* Shelf 1 */}
        <rect x="295" y="90" width="105" height="8" fill="#2E1C16" />
        <rect x="295" y="98" width="105" height="12" fill="url(#shelfShadow)" />
        {/* Books on Shelf 1 */}
        <rect x="310" y="25" width="15" height="65" fill="#3D5A80" />
        <rect x="325" y="35" width="13" height="55" fill="#8B2635" />
        <rect x="338" y="20" width="18" height="70" fill="#1E3A27" />
        <path d="M 356 90 L 372 75 L 382 82 L 366 97 Z" fill="#C5A880" />

        {/* Shelf 2 */}
        <rect x="295" y="180" width="105" height="8" fill="#2E1C16" />
        <rect x="295" y="188" width="105" height="12" fill="url(#shelfShadow)" />
        {/* Books on Shelf 2 */}
        <rect x="305" y="125" width="14" height="55" fill="#A58860" />
        <rect x="319" y="110" width="16" height="70" fill="#3E2723" />
        <rect x="335" y="120" width="18" height="60" fill="#8B2635" />
        <rect x="353" y="130" width="12" height="50" fill="#3D5A80" />
        <rect x="365" y="115" width="15" height="65" fill="#2E6B40" />

        {/* Shelf 3 */}
        <rect x="295" y="270" width="105" height="8" fill="#2E1C16" />
        <rect x="295" y="278" width="105" height="12" fill="url(#shelfShadow)" />
        {/* Books on Shelf 3 */}
        <rect x="315" y="210" width="20" height="60" fill="#8B2635" />
        <rect x="335" y="205" width="12" height="65" fill="#C5A880" />
        <rect x="347" y="200" width="18" height="70" fill="#1A3020" />
        <rect x="365" y="220" width="15" height="50" fill="#3D5A80" />

        {/* Shelf 4 */}
        <rect x="295" y="360" width="105" height="8" fill="#2E1C16" />
        <rect x="295" y="368" width="105" height="12" fill="url(#shelfShadow)" />
        {/* Books on Shelf 4 */}
        <rect x="305" y="290" width="18" height="70" fill="#3E2723" />
        <rect x="323" y="300" width="15" height="60" fill="#2E6B40" />
        <rect x="338" y="310" width="14" height="50" fill="#8B2635" />
        <path d="M 352 360 L 372 340 L 382 348 L 362 368 Z" fill="#A58860" />

        {/* --- Foreground: Desk --- */}
        <rect x="80" y="410" width="240" height="70" fill="#000" opacity="0.4" rx="20" />
        <rect x="110" y="410" width="180" height="50" fill="#1C0E07" stroke="#0D0604" strokeWidth="2.5" />
        <rect x="130" y="430" width="30" height="35" fill="#0D0604" />
        <rect x="240" y="430" width="30" height="35" fill="#0D0604" />

        {/* Desk Top */}
        <polygon points="90,410 310,410 320,440 80,440" fill="#2E1C16" stroke="#0D0604" strokeWidth="2.5" />
        <rect x="120" y="418" width="160" height="12" fill="none" stroke="#C5A880" strokeWidth="0.8" opacity="0.5" />

        {/* Desk Lamp (Left) */}
        <polygon points="120,350 70,440 160,440" fill="url(#windowGlow)" opacity="0.3" style={{ mixBlendMode: "screen" }} />
        <ellipse cx="115" cy="385" rx="8" ry="4" fill="#C5A880" stroke="#8A6621" strokeWidth="1" />
        <path d="M 115 385 C 115 375, 122 362, 120 355" fill="none" stroke="#C5A880" strokeWidth="2.5" />
        <rect x="108" y="348" width="24" height="10" rx="4" fill="url(#lampGreen)" stroke="#0D0604" strokeWidth="1" />
        <circle cx="120" cy="355" r="2" fill="#C5A880" />
        <circle cx="120" cy="358" r="4" fill="#FFF7D6" filter="blur(1px)" />

        {/* Open Book (Center) */}
        <rect x="180" y="420" width="40" height="15" fill="#000" opacity="0.5" />
        <path d="M 178 422 L 198 424 L 218 422 L 216 428 L 198 430 L 180 428 Z" fill="#8B2635" />
        <path d="M 198 424 C 192 423, 182 419, 180 422 C 180 425, 190 427, 198 425 Z" fill="#FFFBF2" stroke="#A58860" strokeWidth="0.5" />
        <path d="M 198 424 C 204 423, 214 419, 216 422 C 216 425, 206 427, 198 425 Z" fill="#FFFBF2" stroke="#A58860" strokeWidth="0.5" />
        <line x1="184" y1="422" x2="194" y2="423" stroke="#555" strokeWidth="0.5" strokeDasharray="2,1" />
        <line x1="184" y1="424" x2="192" y2="425" stroke="#555" strokeWidth="0.5" strokeDasharray="1.5,1" />
        <line x1="202" y1="423" x2="212" y2="422" stroke="#555" strokeWidth="0.5" strokeDasharray="2,1" />
        <line x1="202" y1="425" x2="210" y2="424" stroke="#555" strokeWidth="0.5" strokeDasharray="1.5,1" />
        <path d="M 198 425 L 198 431" stroke="#8B2635" strokeWidth="1" fill="none" />

        {/* Papers */}
        <polygon points="235,420 255,422 250,432 230,430" fill="#FAF5E6" stroke="#C5A880" strokeWidth="0.5" />
        
        {/* Inkwell & Quill */}
        <circle cx="268" cy="422" r="3" fill="#C5A880" stroke="#0D0604" strokeWidth="0.5" />
        <path d="M 268 421 C 265 412, 258 402, 252 396" fill="none" stroke="#FFFBF2" strokeWidth="1" />

        {/* Ambient glow overlay */}
        <circle cx="200" cy="240" r="220" fill="url(#windowGlow)" opacity="0.12" style={{ mixBlendMode: "color-dodge" }} />
      </svg>

      {/* Detail overlay panel */}
      <div className="absolute bottom-5 left-5 right-5 bg-[#0F1D13]/90 backdrop-blur-md rounded-xl p-4 border border-gold/25 text-left transition-all duration-300 group-hover:border-gold">
        <span className="text-[9px] uppercase tracking-widest text-gold font-sans font-bold block mb-1">
          IMAGE PLACEHOLDER
        </span>
        <h3 className="font-serif text-cream font-bold text-sm leading-snug">
          Gothic Library & Grand Arched Window
        </h3>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <div className="pb-0 bg-cream text-charcoal font-sans text-left">
      
      {/* 1. TITLE HEADER SECTION */}
      <section className="pt-20 pb-6 text-center">
        <Container>
          <span className="text-[11px] uppercase font-bold tracking-[0.2em] text-[#C5A880] font-sans block mb-3">
            ESTABLISHED PRESENCE
          </span>
          <h1 className="text-[44px] sm:text-[56px] font-serif font-bold italic text-charcoal leading-tight">
            About The Author Brand
          </h1>
          <p className="text-sm sm:text-base text-charcoal-light leading-relaxed max-w-xl mx-auto font-light font-sans mt-3">
            One home for many stories, many genres, and many reader journeys.
          </p>
          <div className="h-16 w-px bg-gold/40 mx-auto mt-8 mb-16" />
        </Container>
      </section>

      {/* 2. LITERARY UNIVERSE SECTION */}
      <section className="pb-24 bg-cream">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Image Column */}
            <div className="lg:col-span-6 flex justify-center">
              <LibraryWindowPlaceholder />
            </div>

            {/* Right Text Column */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <h2 className="text-3xl sm:text-[40px] font-serif font-bold text-charcoal leading-tight">
                A Curated Literary Universe
              </h2>
              <div className="h-[3px] w-12 bg-gold mt-4 mb-8" />
              
              <div className="text-sm sm:text-[15px] text-charcoal-light leading-[1.75] font-sans font-light space-y-5">
                <p>
                  Welcome to the heart of a multifaceted writing collect. This hub isn't just a website; it's a curated space designed for the modern reader who refuses to be confined to a single shelf.
                </p>
                <p>
                  Under the Elias Thorne umbrella, we bridge the gap between seemingly disparate worlds. From the heart-fluttering intimacy of romance to the meticulous precision of artisanal cookbooks, and the dark intrigue of psychological thrillers, every project is unified by a commitment to exceptional storytelling and intellectual depth.
                </p>
                <p>
                  Whether you follow our work across major retailers or discover us through independent platforms, this hub serves as your North Star for updates, exclusive content, and a seamless discovery experience across all pen names.
                </p>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* 3. CORE PHILOSOPHY SECTION */}
      <section className="py-24 bg-[#F5F4F0]/60 relative overflow-hidden border-y border-[#E5E3DC]">
        {/* Background circular vector lines decoration exactly like image */}
        <div className="absolute top-0 right-0 opacity-[0.05] text-[#A58860] pointer-events-none translate-x-20 -translate-y-20">
          <svg className="w-[500px] h-[500px]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="100" cy="0" r="90" />
            <circle cx="100" cy="0" r="70" />
            <circle cx="100" cy="0" r="50" />
          </svg>
        </div>

        <Container className="space-y-16">
          
          {/* Section Header */}
          <div className="space-y-2 text-center">
            <h2 className="text-3xl sm:text-[38px] font-serif font-bold text-charcoal">
              Our Core Philosophy
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-light font-sans font-light max-w-md mx-auto">
              Building a better bridge between author and reader.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Philosophy Card 1 */}
            <div className="bg-white p-10 rounded-[24px] border border-[#E5E3DC]/60 shadow-sm hover:shadow-md transition-luxury flex flex-col text-left space-y-6">
              <div className="w-12 h-12 rounded-full bg-[#1A3020] text-gold flex items-center justify-center font-sans shadow-sm border border-gold/20">
                <svg className="w-5 h-5 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="14.5" y1="12.5" x2="18" y2="16" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <h3 className="font-serif font-bold text-[20px] text-charcoal">
                Easy Book Discovery
              </h3>
              <p className="text-xs sm:text-[13px] text-charcoal-light leading-relaxed font-sans font-light">
                We've eliminated the friction of finding your next read. Navigate through genres and themes with intuitive mapping across our entire library.
              </p>
            </div>

            {/* Philosophy Card 2 */}
            <div className="bg-white p-10 rounded-[24px] border border-[#E5E3DC]/60 shadow-sm hover:shadow-md transition-luxury flex flex-col text-left space-y-6">
              <div className="w-12 h-12 rounded-full bg-[#1A3020] text-gold flex items-center justify-center font-sans shadow-sm border border-gold/20">
                <svg className="w-5 h-5 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <h3 className="font-serif font-bold text-[20px] text-charcoal">
                Reader-First Experience
              </h3>
              <p className="text-xs sm:text-[13px] text-charcoal-light leading-relaxed font-sans font-light">
                Emphasis on high-quality production, accessible formatting, and a community-driven approach that listens to reader feedback.
              </p>
            </div>

            {/* Philosophy Card 3 */}
            <div className="bg-white p-10 rounded-[24px] border border-[#E5E3DC]/60 shadow-sm hover:shadow-md transition-luxury flex flex-col text-left space-y-6">
              <div className="w-12 h-12 rounded-full bg-[#1A3020] text-gold flex items-center justify-center font-sans shadow-sm border border-gold/20">
                <svg className="w-5 h-5 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  <path d="M6 6h10M6 10h10M6 14h6" strokeWidth="1.5" />
                </svg>
              </div>
              <h3 className="font-serif font-bold text-[20px] text-charcoal">
                Stories Across Genres
              </h3>
              <p className="text-xs sm:text-[13px] text-charcoal-light leading-relaxed font-sans font-light">
                The catalog spans romance, suspense, and culinary arts, ensuring there is a home for every kind of curiosity within our archive.
              </p>
            </div>

          </div>

        </Container>
      </section>

      {/* 4. MEET THE COLLECTIVE SECTION */}
      <section className="py-24 bg-cream">
        <Container className="space-y-12">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 border-b border-gold/15 pb-8">
            <div className="space-y-3 text-left">
              <h2 className="text-3xl sm:text-[38px] font-serif font-bold text-charcoal">
                Meet The Collective
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-light font-sans font-light max-w-xl leading-relaxed">
                Each name represents a distinct voice, a unique promise to the reader, and a new world to explore.
              </p>
            </div>
            <div className="shrink-0 text-left">
              <Link
                to="/pen-names"
                className="px-6 py-3 bg-[#0A180E] hover:bg-gold text-cream hover:text-[#0A180E] font-sans font-bold text-xs uppercase tracking-wider rounded-full shadow transition-luxury inline-flex items-center gap-2 group"
              >
                <span>Meet The Pen Names</span>
                <span className="w-5 h-5 rounded-full bg-cream/10 flex items-center justify-center text-cream group-hover:bg-[#0A180E]/10 group-hover:text-[#0A180E] transition-colors">
                  <FiArrowRight size={11} />
                </span>
              </Link>
            </div>
          </div>

          {/* Three Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Laura Dalton Link */}
            <Link 
              to="/pen-names/laura-dalton"
              className="bg-white py-12 px-6 rounded-2xl border border-gold/10 hover:border-gold/30 hover:shadow-md transition-luxury flex flex-col items-center text-center group cursor-pointer"
            >
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#C5A880] font-sans block mb-2">
                ROMANCE
              </span>
              <h3 className="font-serif font-bold text-2xl italic text-charcoal mt-1 group-hover:text-gold transition-colors">
                Laura Dalton
              </h3>
              <p className="text-xs sm:text-[13px] text-charcoal-light font-sans font-light mt-1">
                Emotional Journeys & Intimacy
              </p>
            </Link>

            {/* Lucien Hart Link */}
            <Link
              to="/pen-names/lucien-hart"
              className="bg-white py-12 px-6 rounded-2xl border border-gold/10 hover:border-gold/30 hover:shadow-md transition-luxury flex flex-col items-center text-center group cursor-pointer"
            >
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#C5A880] font-sans block mb-2">
                SUSPENSE
              </span>
              <h3 className="font-serif font-bold text-2xl italic text-charcoal mt-1 group-hover:text-gold transition-colors">
                Lucien Hart
              </h3>
              <p className="text-xs sm:text-[13px] text-charcoal-light font-sans font-light mt-1">
                Psychological Thrillers
              </p>
            </Link>

            {/* Adam Woodrow Link */}
            <Link
              to="/pen-names/adam-woodrow"
              className="bg-white py-12 px-6 rounded-2xl border border-gold/10 hover:border-gold/30 hover:shadow-md transition-luxury flex flex-col items-center text-center group cursor-pointer"
            >
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#C5A880] font-sans block mb-2">
                CULINARY
              </span>
              <h3 className="font-serif font-bold text-2xl italic text-charcoal mt-1 group-hover:text-gold transition-colors">
                Adam Woodrow
              </h3>
              <p className="text-xs sm:text-[13px] text-charcoal-light font-sans font-light mt-1">
                Artisanal Living & Cookery
              </p>
            </Link>

          </div>

        </Container>
      </section>

      {/* 5. RETAILERS SECTION */}
      <section className="bg-[#F5F4F0]/30 border-y border-[#E5E3DC] py-12">
        <Container>
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#A58860] font-sans block mb-6 text-center select-none">
            AVAILABLE WHEREVER YOU READ
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-charcoal/60 font-serif font-bold text-base sm:text-lg select-none">
            <span className="hover:text-gold transition-colors cursor-pointer">Amazon</span>
            <span className="hover:text-gold transition-colors cursor-pointer">Apple Books</span>
            <span className="hover:text-gold transition-colors cursor-pointer">Kobo</span>
            <span className="hover:text-gold transition-colors cursor-pointer">Google Play</span>
            <span className="hover:text-gold transition-colors cursor-pointer">B&N</span>
            <span className="hover:text-gold transition-colors cursor-pointer">D2D</span>
          </div>
        </Container>
      </section>

      {/* 6. BROWSE BOOKS CALL TO ACTION BANNER */}
      <section className="py-20 bg-cream">
        <Container>
          <div className="max-w-5xl mx-auto py-16 px-8 sm:px-20 rounded-[32px] bg-gradient-to-b from-[#102919] to-[#050C07] border border-gold/20 shadow-2xl text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(197,168,128,0.12),transparent_70%)] pointer-events-none"></div>
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-gold/5 blur-3xl pointer-events-none"></div>
            
            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-[44px] text-cream relative z-10 leading-tight">
              Start exploring the library today
            </h2>
            <p className="text-xs sm:text-sm text-cream/70 leading-relaxed font-sans font-light max-w-xl mx-auto mt-4 relative z-10">
              Dive into a new world. Your next favorite story is waiting among our curated shelves.
            </p>
            <div className="pt-4 relative z-10">
              <Link
                to="/books"
                className="inline-block px-10 py-4 bg-[#FCE6C1] hover:bg-gold text-[#0A180E] font-sans font-bold text-xs uppercase tracking-wider rounded-full shadow-lg transition-luxury hover:scale-105"
              >
                Browse Books
              </Link>
            </div>
          </div>
        </Container>
      </section>

    </div>
  );
}


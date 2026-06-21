import { useParams, Link } from "react-router-dom";
import { FiArrowRight, FiMail, FiBookOpen } from "react-icons/fi";
import Container from "../../components/layout/Container";
import { mockPenNames, mockBooks } from "../../data/mockData";

// Local component for B&W cover placeholders in Complete Bibliography
function BibliographyCover({ id }) {
  const baseClass = "w-full aspect-[4/5] bg-gradient-to-b from-[#EDEDED] to-[#D5D5D5] rounded-lg border border-black/10 flex items-center justify-center p-4 relative overflow-hidden select-none";
  if (id === 1) {
    // Fraying Hearts - geometric crystal outline
    return (
      <div className={baseClass}>
        <svg className="w-16 h-16 text-black/40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <polygon points="50,15 80,45 80,75 50,85 20,75 20,45" />
          <line x1="50" y1="15" x2="50" y2="85" />
          <line x1="20" y1="45" x2="80" y2="45" />
          <line x1="20" y1="75" x2="80" y2="75" />
          <line x1="50" y1="50" x2="20" y2="45" />
          <line x1="50" y1="50" x2="80" y2="45" />
          <line x1="50" y1="50" x2="20" y2="75" />
          <line x1="50" y1="50" x2="80" y2="75" />
        </svg>
      </div>
    );
  }
  if (id === 2) {
    // Mind & Bone - silhouette of man in spotlight
    return (
      <div className={baseClass}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,white_20%,transparent_70%)]" />
        <svg className="w-16 h-16 text-black/60 relative z-10" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      </div>
    );
  }
  if (id === 3) {
    // The Peak - Mountain outline B&W
    return (
      <div className={baseClass}>
        <svg className="w-20 h-20 text-black/50" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
          <polygon points="50,15 90,85 10,85" />
          <polygon points="50,40 75,85 25,85" />
          <line x1="50" y1="15" x2="35" y2="85" />
          <line x1="50" y1="15" x2="65" y2="85" />
        </svg>
      </div>
    );
  }
  if (id === 4) {
    // The Heritage - Abstract textures
    return (
      <div className={baseClass}>
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full text-black" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M0 0 L100 100 M0 20 L100 80 M0 40 L100 60 M0 60 L100 40 M0 80 L100 20" />
          </svg>
        </div>
        <span className="font-serif text-lg font-bold text-black/45 tracking-widest uppercase">E.T.</span>
      </div>
    );
  }
  if (id === 5) {
    // Mist Light - Seagull flying
    return (
      <div className={baseClass}>
        <svg className="w-14 h-14 text-black/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 12C5 9, 8 9, 12 12C16 9, 19 9, 22 12 C18 13, 14 13, 12 12 C10 13, 6 13, 2 12 Z" fill="currentColor" />
        </svg>
      </div>
    );
  }
  if (id === 6) {
    // Ink & Ash - Typewriter keyboard circular keys pattern
    return (
      <div className={baseClass}>
        <svg className="w-16 h-16 text-black/40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="30" cy="30" r="8" />
          <circle cx="50" cy="30" r="8" />
          <circle cx="70" cy="30" r="8" />
          <circle cx="40" cy="50" r="8" />
          <circle cx="60" cy="50" r="8" />
          <circle cx="50" cy="70" r="8" />
        </svg>
      </div>
    );
  }
  if (id === 7) {
    // Lost Trail - Compass silhouette
    return (
      <div className={baseClass}>
        <svg className="w-16 h-16 text-black/50" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="50" cy="50" r="35" />
          <circle cx="50" cy="50" r="3" fill="currentColor" />
          <polygon points="50,25 55,47 50,50 45,47" fill="currentColor" />
          <polygon points="50,75 55,53 50,50 45,53" />
        </svg>
      </div>
    );
  }
  if (id === 8) {
    // The Evergreen - pine leaf outline
    return (
      <div className={baseClass}>
        <svg className="w-14 h-14 text-black/45" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
          <line x1="50" y1="10" x2="50" y2="90" strokeWidth="2" />
          <path d="M50 20 L80 35 M50 20 L20 35" />
          <path d="M50 35 L80 50 M50 35 L20 50" />
          <path d="M50 50 L80 65 M50 50 L20 65" />
          <path d="M50 65 L80 80 M50 65 L20 80" />
        </svg>
      </div>
    );
  }
  return null;
}

// Local component for Mountain Library Series Covers
function MountainSeriesCover({ bookId }) {
  if (bookId === 1) {
    return (
      <div className="w-full aspect-[2/3] bg-[#1E3A27] rounded-xl border border-gold/25 p-4 flex flex-col justify-between shadow-lg relative overflow-hidden select-none">
        {/* Mountain lines */}
        <div className="absolute inset-0 opacity-20 flex items-center justify-center">
          <svg className="w-full h-full text-gold" viewBox="0 0 100 150" fill="none" stroke="currentColor" strokeWidth="1">
            <polygon points="50,20 90,120 10,120" />
            <polygon points="50,50 80,120 20,120" />
            <line x1="50" y1="20" x2="50" y2="120" />
            <rect x="47" y="110" width="6" height="6" fill="currentColor" />
          </svg>
        </div>
        <div className="text-center font-serif text-cream relative z-10 space-y-1">
          <h4 className="text-[10px] uppercase tracking-widest text-gold-light font-sans font-semibold">Book I</h4>
          <h3 className="text-sm font-bold leading-tight">The Silent Peak</h3>
        </div>
        <div className="text-center font-sans text-[8px] uppercase tracking-widest text-gold-light/60 relative z-10">
          Adam Woodrow
        </div>
      </div>
    );
  }
  if (bookId === 2) {
    return (
      <div className="w-full aspect-[2/3] bg-gradient-to-b from-[#3E2723] to-[#1D0C08] rounded-xl border border-gold/25 p-4 flex flex-col justify-between shadow-lg relative overflow-hidden select-none">
        {/* Fireplace flames */}
        <div className="absolute inset-0 opacity-25 flex items-center justify-center">
          <svg className="w-full h-full text-orange-500" viewBox="0 0 100 150" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M50 50 C60 70, 70 80, 50 110 C30 80, 40 70, 50 50 Z" fill="currentColor" />
            <path d="M50 70 C55 85, 60 90, 50 110 C40 90, 45 85, 50 70 Z" fill="#E65100" />
            <line x1="20" y1="120" x2="80" y2="120" stroke="#C5A880" strokeWidth="3" />
          </svg>
        </div>
        <div className="text-center font-serif text-cream relative z-10 space-y-1">
          <h4 className="text-[10px] uppercase tracking-widest text-gold-light font-sans font-semibold">Book II</h4>
          <h3 className="text-sm font-bold leading-tight">Echoes in the Pine</h3>
        </div>
        <div className="text-center font-sans text-[8px] uppercase tracking-widest text-gold-light/60 relative z-10">
          Adam Woodrow
        </div>
      </div>
    );
  }
  if (bookId === 3) {
    return (
      <div className="w-full aspect-[2/3] bg-gradient-to-b from-[#253E3F] to-[#0F1D1E] rounded-xl border border-gold/25 p-4 flex flex-col justify-between shadow-lg relative overflow-hidden select-none">
        {/* Geometric reflection and trees */}
        <div className="absolute inset-0 opacity-30 flex items-center justify-center">
          <svg className="w-full h-full text-gold" viewBox="0 0 100 150" fill="none" stroke="currentColor" strokeWidth="1">
            <rect x="25" y="35" width="50" height="70" strokeWidth="1.5" />
            <path d="M30 110 L35 95 L40 110 Z" />
            <path d="M70 110 L75 95 L80 110 Z" />
            <line x1="10" y1="110" x2="90" y2="110" strokeDasharray="3,3" />
          </svg>
        </div>
        <div className="text-center font-serif text-cream relative z-10 space-y-1">
          <h4 className="text-[10px] uppercase tracking-widest text-gold-light font-sans font-semibold">Book III</h4>
          <h3 className="text-sm font-bold leading-tight">The Altimeter's Edge</h3>
        </div>
        <div className="text-center font-sans text-[8px] uppercase tracking-widest text-gold-light/60 relative z-10">
          Adam Woodrow
        </div>
      </div>
    );
  }
  return null;
}

// Fallback cover for other authors
function FallbackBookCover({ title, index }) {
  const bgGradients = [
    "from-[#1E3A27] to-[#122217]",
    "from-[#3E2723] to-[#1D0C08]",
    "from-[#253E3F] to-[#0F1D1E]",
    "from-[#2C302E] to-[#121413]"
  ];
  const grad = bgGradients[index % bgGradients.length];
  return (
    <div className={`w-full aspect-[2/3] bg-gradient-to-b ${grad} rounded-xl border border-gold/25 p-4 flex flex-col justify-between shadow-lg relative overflow-hidden select-none`}>
      <div className="absolute inset-0 opacity-15 flex items-center justify-center">
        <svg className="w-full h-full text-gold" viewBox="0 0 100 150" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="50" cy="75" r="30" />
          <line x1="50" y1="15" x2="50" y2="135" />
        </svg>
      </div>
      <div className="text-center font-serif text-cream relative z-10 space-y-1">
        <h4 className="text-[10px] uppercase tracking-widest text-gold-light font-sans">Publication</h4>
        <h3 className="text-xs font-bold leading-tight line-clamp-2">{title}</h3>
      </div>
      <div className="text-center font-sans text-[8px] uppercase tracking-widest text-gold-light/60 relative z-10">
        Elias Thorne
      </div>
    </div>
  );
}

// Portrait placeholder for the author
function PortraitPlaceholder({ slug }) {
  return (
    <div className="w-[300px] sm:w-[340px] aspect-[4/5] bg-gradient-to-b from-[#2D4C35] to-[#0F1D13] rounded-2xl flex flex-col items-center justify-center p-6 text-center border border-gold/20 shadow-2xl relative overflow-hidden group">
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg className="w-full h-full text-gold" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
          <circle cx="50" cy="50" r="40" />
          <polygon points="50,15 80,75 20,75" />
          <line x1="10" y1="10" x2="90" y2="90" />
        </svg>
      </div>
      <svg className="w-24 h-24 text-gold/30 mb-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
      <h3 className="font-serif font-semibold text-cream text-lg">
        {slug === "adam-woodrow" ? "Adam Woodrow" : slug === "laura-dalton" ? "Laura Dalton" : slug === "lucien-hart" ? "Lucien Hart" : "Benjamin Fairfax"}
      </h3>
      <p className="text-[10px] uppercase tracking-widest text-gold-light font-sans mt-1">Portrait Placeholder</p>
    </div>
  );
}

export default function PenNameDetail() {
  const { slug } = useParams();

  // Find persona
  const author = mockPenNames.find(p => p.slug === slug) || mockPenNames[0];

  // Filter books published by this pen name
  const authorBooks = mockBooks.filter(b => b.penName === author.name);

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed to ${author.name} updates!`);
  };

  // Specific bibliography for Adam Woodrow
  const bibliographyData = [
    { id: 1, title: "Fraying Hearts", genre: "Romantic Suspense" },
    { id: 2, title: "Mind & Bone", genre: "Psychological Series" },
    { id: 3, title: "The Peak", genre: "Mountain Romance" },
    { id: 4, title: "The Heritage", genre: "Family Drama" },
    { id: 5, title: "Mist Light", genre: "Suspense Drama" },
    { id: 6, title: "Ink & Ash", genre: "Survival Memoir" },
    { id: 7, title: "Lost Trail", genre: "Adventure Romance" },
    { id: 8, title: "The Evergreen", genre: "Short Story Collection" }
  ];

  // Specific timeline data for Adam Woodrow
  const timelineData = [
    {
      title: "The Silent Peak",
      status: "Available Now",
      desc: "The introduction to the rugged world of the Peaks, where it all began."
    },
    {
      title: "Echoes in the Pine",
      status: "Available Now",
      desc: "The journey continues deeper into the psychological mystery of the range."
    },
    {
      title: "The Altimeter's Edge",
      status: "Special Edition Restock",
      desc: "The climactic resolution of the survival romance and mystery."
    },
    {
      title: "Forrest Tinker",
      status: "Coming Winter 2026",
      desc: "A standalone spin-off set in the same haunting wilderness."
    }
  ];

  const getTimelineData = () => {
    if (slug === "adam-woodrow") return timelineData;
    return authorBooks.map((b, idx) => ({
      title: b.title,
      status: b.status || "Available Now",
      desc: b.description || "A captivating publication in this author's library."
    }));
  };

  const getBibliographyData = () => {
    if (slug === "adam-woodrow") return bibliographyData;
    return authorBooks.map((b, idx) => ({
      id: idx + 1,
      title: b.title,
      genre: b.genres ? b.genres.join(", ") : "Fiction",
      slug: b.slug
    }));
  };

  const seriesName = slug === "adam-woodrow" ? "The Mountain Library Series" : `${author.name} Collection`;
  const seriesSub = slug === "adam-woodrow" 
    ? "A saga of survival at high altitude—inspired by the things that make wild places a refuge for explorers."
    : `Explore the curated stories and unique worlds written under the name of ${author.name}.`;

  const timelineItems = getTimelineData();
  const bibliographyItems = getBibliographyData();

  return (
    <div className="pb-1 bg-cream text-charcoal font-sans text-left">
      
      {/* 1. HERO SECTION (FULL BLEED) */}
      <section className="bg-forest text-cream py-16 lg:py-20 relative overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(197,168,128,0.06),transparent_60%)]"></div>

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Outline badges */}
              <div className="flex flex-wrap gap-2.5">
                {slug === "adam-woodrow" ? (
                  <>
                    <span className="px-3 py-1 border border-gold/45 rounded-full text-[10px] uppercase font-bold tracking-widest text-gold-light bg-gold/5">
                      Romantic Suspense
                    </span>
                    <span className="px-3 py-1 border border-gold/45 rounded-full text-[10px] uppercase font-bold tracking-widest text-gold-light bg-gold/5">
                      Survivalist Fiction
                    </span>
                  </>
                ) : (
                  <span className="px-3 py-1 border border-gold/45 rounded-full text-[10px] uppercase font-bold tracking-widest text-gold-light bg-gold/5">
                    {author.genreName}
                  </span>
                )}
              </div>

              {/* Title - styled monochromatic matching the design screenshot */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-forest-dark mt-2 leading-none">
                {author.name}
              </h1>

              {/* Bio Description */}
              <p className="text-sm sm:text-base text-cream/70 leading-relaxed max-w-xl font-light font-sans">
                {slug === "adam-woodrow" 
                  ? "Adam Woodrow is the voice behind internationally acclaimed series. Blending atmospheric survivalism with deep psychological exploration, his narratives capture the quiet forces of the human spirit."
                  : author.bio}
              </p>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-6">
                <a 
                  href="#series" 
                  className="inline-flex items-center gap-2 text-xs font-semibold text-gold-light hover:text-gold transition-colors uppercase tracking-widest"
                >
                  Discover Works <span className="text-sm">↓</span>
                </a>
                <button className="px-6 py-2.5 border border-[#C5A880] text-[#C5A880] hover:bg-[#C5A880]/15 hover:text-white rounded-full text-xs font-semibold tracking-wider transition-luxury uppercase bg-transparent">
                  View Active Project
                </button>
              </div>
            </div>

            {/* Right Portrait Column */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative">
                {/* Portrait Placeholder */}
                <PortraitPlaceholder slug={slug} />
                
                {/* Circular overlapping badge */}
                <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-[#EBD3AC] hover:bg-gold text-forest-dark flex flex-col items-center justify-center text-[9px] font-bold uppercase tracking-wider text-center p-2.5 shadow-xl leading-tight select-none rotate-12 transition-luxury cursor-default z-20">
                  <span>New Release</span>
                  <span className="text-[7px] opacity-80 mt-0.5">Out Now</span>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* 2. SERIES SECTION */}
      <section id="series" className="py-20 bg-cream">
        <Container className="space-y-12">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-gold/15 pb-6">
            <div className="space-y-2 text-left">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest-dark">
                {seriesName}
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-light font-sans font-light max-w-2xl">
                {seriesSub}
              </p>
            </div>
            <div className="shrink-0 text-left sm:text-right">
              <Link
                to="/books"
                className="text-[10px] font-bold tracking-widest text-[#A58860] hover:text-gold uppercase transition-colors"
              >
                Read Series in Order
              </Link>
            </div>
          </div>
          
          {/* Books Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {slug === "adam-woodrow" ? (
              <>
                <div className="space-y-4 flex flex-col text-left group">
                  <Link to="/books/the-silent-peak">
                    <MountainSeriesCover bookId={1} />
                  </Link>
                  <h3 className="font-serif font-bold text-xl text-forest-dark mt-2 group-hover:text-gold transition-colors">
                    The Silent Peak
                  </h3>
                  <p className="text-xs text-charcoal-light font-sans font-light">Book I • Available Now</p>
                  <Link to="/books/the-silent-peak" className="inline-flex items-center gap-1 text-xs font-semibold text-charcoal-light hover:text-gold transition-colors mt-1">
                    View Details <FiArrowRight size={12} />
                  </Link>
                </div>

                <div className="space-y-4 flex flex-col text-left group">
                  <div className="cursor-default">
                    <MountainSeriesCover bookId={2} />
                  </div>
                  <h3 className="font-serif font-bold text-xl text-forest-dark mt-2">
                    Echoes in the Pine
                  </h3>
                  <p className="text-xs text-charcoal-light font-sans font-light">Book II • Available Now</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-charcoal-light/50 cursor-default mt-1">
                    View Details <FiArrowRight size={12} />
                  </span>
                </div>

                <div className="space-y-4 flex flex-col text-left group">
                  <div className="cursor-default">
                    <MountainSeriesCover bookId={3} />
                  </div>
                  <h3 className="font-serif font-bold text-xl text-forest-dark mt-2">
                    The Altimeter's Edge
                  </h3>
                  <p className="text-xs text-charcoal-light font-sans font-light">Book III • In Production</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-charcoal-light/50 cursor-default mt-1">
                    View Details <FiArrowRight size={12} />
                  </span>
                </div>
              </>
            ) : (
              authorBooks.map((b, idx) => (
                <div key={b.id} className="space-y-4 flex flex-col text-left group">
                  <Link to={`/books/${b.slug}`}>
                    <FallbackBookCover title={b.title} index={idx} />
                  </Link>
                  <h3 className="font-serif font-bold text-xl text-forest-dark mt-2 group-hover:text-gold transition-colors">
                    {b.title}
                  </h3>
                  <p className="text-xs text-charcoal-light font-sans font-light">{b.series ? `${b.series}, Book ${b.bookNum}` : b.status}</p>
                  <Link to={`/books/${b.slug}`} className="inline-flex items-center gap-1 text-xs font-semibold text-charcoal-light hover:text-gold transition-colors mt-1">
                    View Details <FiArrowRight size={12} />
                  </Link>
                </div>
              ))
            )}
          </div>

        </Container>
      </section>

      {/* 3. READING JOURNEY TIMELINE & LANDSCAPE */}
      {timelineItems.length > 0 && (
        <section className="py-20 bg-[#F5F4F0]/40">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Timeline */}
              <div className="lg:col-span-6 text-left space-y-8">
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest-dark">
                  Reading Journey
                </h2>
                
                <div className="space-y-8 mt-10 relative pl-8 border-l-2 border-gold/25">
                  {timelineItems.map((item, idx) => (
                    <div key={idx} className="relative text-left space-y-1.5">
                      {/* Circle Timeline Point */}
                      <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-forest-dark border-4 border-cream flex items-center justify-center shadow-sm z-10">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                      </div>
                      <h4 className="font-serif font-bold text-lg text-forest-dark leading-none">{item.title}</h4>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-gold-dark font-sans block">
                        {item.status}
                      </span>
                      <p className="text-xs sm:text-[13px] text-charcoal-light font-sans font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Forest Landscape Placeholder */}
              <div className="lg:col-span-6">
                <div className="w-full h-[400px] bg-gradient-to-b from-[#324D3E] to-[#172D21] rounded-2xl relative overflow-hidden shadow-md flex items-end">
                  {/* SVG landscape silhouette of pine trees */}
                  <div className="absolute inset-0 opacity-15 flex items-center justify-center">
                    <svg className="w-[120%] h-[120%] text-gold" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
                      <circle cx="50" cy="55" r="45" />
                      <line x1="0" y1="55" x2="100" y2="55" />
                    </svg>
                  </div>
                  <svg className="w-full h-48 text-[#0D1B13] fill-current" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <path d="M0 40 L10 25 L15 30 L25 15 L30 20 L40 5 L45 12 L55 2 L65 18 L70 14 L80 28 L85 24 L100 40 Z" />
                    <path d="M0 40 L15 30 L28 20 L35 25 L48 10 L52 15 L62 5 L75 22 L88 15 L100 40 Z" opacity="0.5" fill="#14261C" />
                  </svg>
                  <div className="absolute top-6 right-6 px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full border border-white/10 text-[10px] text-cream/70 font-sans tracking-widest uppercase">
                    Misty Range Landscape
                  </div>
                </div>
              </div>

            </div>
          </Container>
        </section>
      )}

      {/* 4. COMPLETE BIBLIOGRAPHY */}
      <section className="py-20 bg-cream">
        <Container className="space-y-10 text-center">
          <div className="space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest-dark">
              Complete Bibliography
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-light font-sans font-light leading-relaxed">
              Explore every title written by {author.name}, from early works to the most recent psychological explorations.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mt-12">
            {bibliographyItems.map((b) => (
              <div key={b.id} className="bg-white p-5 rounded-2xl border border-gold/10 hover:border-gold/25 hover:shadow-md transition-luxury flex flex-col justify-between">
                <div className="space-y-4">
                  <BibliographyCover id={b.id} />
                  <div className="space-y-1 text-left">
                    <h4 className="font-serif font-bold text-base text-forest-dark line-clamp-1">
                      {b.title}
                    </h4>
                    <p className="text-[11px] text-charcoal-light font-sans font-light">
                      {b.genre}
                    </p>
                  </div>
                </div>
                <div className="pt-4 text-left">
                  <Link
                    to={b.slug ? `/books/${b.slug}` : "/books"}
                    className="text-[9px] uppercase font-bold tracking-widest text-[#A58860] hover:text-gold transition-colors"
                  >
                    View Book
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. NEWSLETTER BANNER */}
      <section className="pb-16 bg-cream">
        <Container>
          <div className="max-w-4xl mx-auto py-12 px-8 sm:px-16 rounded-[24px] bg-[#F5F4F0] border border-gold/15 shadow-sm text-center relative overflow-hidden my-4">
            
            {/* Envelope silhouette overlay */}
            <div className="absolute top-6 right-8 opacity-[0.03] text-charcoal pointer-events-none hidden md:block">
              <svg className="w-28 h-28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </div>

            <div className="space-y-3 relative z-10 max-w-2xl mx-auto">
              <h3 className="font-serif font-bold text-2xl text-forest-dark">
                Get updates from {author.name}
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-light font-sans font-light leading-relaxed">
                Join the inner circle for exclusive chapters, author notes, and early access to the next mountain saga.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <input
                type="text"
                required
                placeholder="Your Name"
                className="px-4 py-3 text-xs bg-white border border-charcoal/15 rounded-md focus:outline-none focus:ring-1 focus:ring-gold text-charcoal w-full sm:w-64 shadow-sm"
              />
              <input
                type="email"
                required
                placeholder="Email Address"
                className="px-4 py-3 text-xs bg-white border border-charcoal/15 rounded-md focus:outline-none focus:ring-1 focus:ring-gold text-charcoal w-full sm:w-64 shadow-sm"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-forest-dark hover:bg-gold text-cream hover:text-forest-dark rounded-full text-xs font-bold uppercase tracking-widest transition-luxury shadow-md shrink-0 w-full sm:w-auto cursor-pointer"
              >
                Subscribe
              </button>
            </form>

            <p className="text-[10px] text-charcoal-light/60 mt-4 relative z-10">
              By subscribing, you agree to receive writing updates and marketing emails.
            </p>
          </div>
        </Container>
      </section>

    </div>
  );
}

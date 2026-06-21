import { Link } from "react-router-dom";
import { FiArrowRight, FiBookOpen } from "react-icons/fi";
import Container from "../../components/layout/Container";
import { mockPenNames, mockBooks } from "../../data/mockData";

// Local component for custom premium profile avatar placeholders
function PenNameAvatar({ slug, initials }) {
  if (slug === "laura-dalton") {
    return (
      <div className="p-0.5 bg-white rounded-full border border-gold/25 shadow-sm inline-block">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-forest-dark to-forest-light flex flex-col items-center justify-center shadow relative overflow-hidden">
          {/* Stylized female portrait silhouette */}
          <svg className="w-12 h-12 text-gold/35" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          <span className="absolute bottom-2 text-[9px] font-semibold text-gold-light tracking-wider bg-forest-dark/80 px-2 py-0.5 rounded-full border border-gold/25">
            LD
          </span>
        </div>
      </div>
    );
  }
  if (slug === "lucien-hart") {
    return (
      <div className="p-0.5 bg-white rounded-full border border-gold/25 shadow-sm inline-block">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-forest-dark to-[#2C302E] flex flex-col items-center justify-center shadow relative overflow-hidden">
          {/* Stylized male portrait silhouette */}
          <svg className="w-12 h-12 text-gold/35" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          <span className="absolute bottom-2 text-[9px] font-semibold text-gold-light tracking-wider bg-forest-dark/80 px-2 py-0.5 rounded-full border border-gold/25">
            LH
          </span>
        </div>
      </div>
    );
  }
  if (slug === "benjamin-fairfax") {
    return (
      <div className="p-0.5 bg-white rounded-full border border-gold/25 shadow-sm inline-block">
        <div className="w-24 h-24 rounded-full bg-[#E2F0D9] flex items-center justify-center shadow relative">
          <span className="font-serif font-bold text-2xl text-[#385723] tracking-tight">BF</span>
        </div>
      </div>
    );
  }
  return (
    <div className="p-0.5 bg-white rounded-full border border-gold/25 shadow-sm inline-block">
      <div className="w-24 h-24 rounded-full bg-cream-dark flex items-center justify-center shadow">
        <span className="font-serif font-bold text-xl text-forest">{initials}</span>
      </div>
    </div>
  );
}

// Local component for custom book cover placeholder
function BookCoverPlaceholder({ initials }) {
  return (
    <div className="w-10 h-14 bg-gradient-to-b from-[#122217] to-forest-dark border border-gold/30 rounded flex flex-col items-center justify-center text-[9px] font-bold text-gold font-serif shadow-md relative overflow-hidden select-none">
      {/* Tiny gold bookmark detail */}
      <div className="absolute top-0 right-1.5 w-1 h-3.5 bg-gold/30" />
      <span>{initials}</span>
    </div>
  );
}

export default function PenNames() {
  // Filter out the featured persona (Adam Woodrow)
  const listPersonas = mockPenNames.filter(p => !p.featured);
  const featuredWoodrow = mockPenNames.find(p => p.featured) || mockPenNames[0];

  // Get the latest release for the featured highlight card (The Silent Peak)
  const silentPeak = mockBooks.find(b => b.slug === "the-silent-peak") || mockBooks[0];

  return (
    <div className="pb-16 bg-cream text-charcoal font-sans text-left">
      
      {/* 1. HERO SECTION */}
      <section className="py-16 text-center bg-cream relative overflow-hidden">
        {/* Large abstract mountain background vector logo - concentric thin outline triangles */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none z-0">
          <svg className="w-[450px] h-[450px] text-forest" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
            <polygon points="50,10 90,85 10,85" />
            <polygon points="50,22 80,78 20,78" strokeDasharray="1,1" />
            <line x1="50" y1="10" x2="50" y2="85" />
          </svg>
        </div>

        <Container className="relative z-10 space-y-4">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-forest-dark">
            Meet The Pen Names
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-light leading-relaxed max-w-xl mx-auto font-light font-sans">
            Each name opens the door to a different reading world. Explore the distinct voices and curated stories written under Elias Thorne's various creative identities.
          </p>
          <div className="h-px w-20 bg-gold/45 mx-auto mt-6" />
        </Container>
      </section>

      {/* 2. THREE PEN NAME CARDS GRID */}
      <Container className="pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {listPersonas.map((p) => (
            <div 
              key={p.slug}
              className="bg-[#F5F4F0] p-8 sm:p-10 rounded-[24px] flex flex-col justify-between items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gold/5 hover:border-gold/20 hover:shadow-md transition-luxury"
            >
              <div className="space-y-4 flex flex-col items-center">
                {/* Circle portrait placeholder */}
                <PenNameAvatar slug={p.slug} initials={p.photoUrl} />

                {/* Info */}
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-xl text-forest-dark mt-2">{p.name}</h3>
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-gold-dark font-sans block">
                    {p.genreName}
                  </span>
                </div>

                <p className="text-xs sm:text-[13px] text-charcoal-light leading-relaxed font-sans font-light max-w-xs">
                  {p.bio}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  {p.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-2.5 py-0.5 bg-[#FCFAF5] text-[#C5A880] border border-gold/20 rounded font-sans font-medium tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* View button */}
              <div className="pt-8 w-full flex justify-center">
                <Link
                  to={`/pen-names/${p.slug}`}
                  className="px-6 py-2 bg-white border border-charcoal/15 hover:border-gold hover:bg-gold/5 text-charcoal hover:text-gold rounded-full text-xs font-semibold font-sans tracking-wide transition-luxury shadow-sm flex items-center gap-1.5"
                >
                  View Books <FiArrowRight size={12} className="opacity-80" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* 3. FEATURED HIGHLIGHT (Adam Woodrow) */}
      <section className="bg-forest text-cream py-20 relative overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(197,168,128,0.06),transparent_60%)]"></div>

        <Container className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Left Image Offset with premium portrait placeholder */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative">
                {/* Gold offset frame */}
                <div className="absolute -inset-2.5 border border-gold/25 rounded-2xl translate-x-3.5 -translate-y-3.5 z-0 pointer-events-none"></div>
                
                {/* Portrait Placeholder */}
                <div className="w-[280px] sm:w-[320px] h-[350px] sm:h-[390px] bg-gradient-to-b from-[#2D4C35] to-[#1A3020] rounded-2xl flex flex-col items-center justify-center p-6 text-center border border-gold/20 shadow-2xl relative overflow-hidden z-10">
                  {/* Subtle nested geometric pattern */}
                  <div className="absolute inset-0 opacity-15 pointer-events-none">
                    <svg className="w-full h-full text-gold" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
                      <circle cx="50" cy="50" r="40" />
                      <polygon points="50,15 80,75 20,75" />
                      <line x1="10" y1="10" x2="90" y2="90" />
                    </svg>
                  </div>
                  {/* Stylized Avatar Silhouette */}
                  <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/35 flex items-center justify-center text-gold text-2xl font-serif mb-4 relative z-10">
                    AW
                  </div>
                  <h3 className="font-serif font-semibold text-cream text-lg relative z-10">Adam Woodrow</h3>
                  <p className="text-[9px] uppercase tracking-widest text-gold-light font-sans relative z-10">Portrait Placeholder</p>
                  <div className="h-px w-10 bg-gold/35 my-3 relative z-10" />
                  <p className="text-xs text-cream/55 max-w-[200px] leading-relaxed relative z-10">
                    Suspense & Survivalist Author
                  </p>
                </div>
              </div>
            </div>

            {/* Right details */}
            <div className="md:col-span-7 space-y-6">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-gold-light font-sans block">
                Featured Highlight
              </span>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-cream tracking-tight leading-tight">
                {featuredWoodrow.name}
              </h2>
              
              <div className="border-l-2 border-[#C5A880] pl-5 py-1 my-6">
                <p className="text-base sm:text-lg text-gold font-serif font-light italic leading-relaxed">
                  “The mountain doesn't care about your story, which is exactly why it's the perfect place to write one.”
                </p>
              </div>

              <p className="text-xs sm:text-sm text-cream/85 leading-relaxed font-sans font-light">
                {featuredWoodrow.bio}
              </p>

              {/* Latest Release card */}
              <div className="space-y-3 pt-2">
                <span className="text-[9px] uppercase font-bold text-gold-light tracking-[0.15em] block font-sans">
                  Latest Release
                </span>
                <Link 
                  to={`/books/${silentPeak.slug}`}
                  className="w-full max-w-md bg-[#0F1D13] border border-gold/15 hover:border-gold/30 rounded-xl p-4 flex items-center justify-between hover:bg-[#122217] transition-luxury cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <BookCoverPlaceholder initials="SP" />
                    <div className="text-left font-sans">
                      <h4 className="font-bold text-xs sm:text-sm text-cream">{silentPeak.title}</h4>
                      <p className="text-[10px] sm:text-xs text-cream/55 mt-0.5">{silentPeak.series}, Book {silentPeak.bookNum}</p>
                    </div>
                  </div>
                  <FiArrowRight size={16} className="text-gold" />
                </Link>
              </div>

              {/* CTA button */}
              <div className="pt-4">
                <Link
                  to={`/pen-names/${featuredWoodrow.slug}`}
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#EBD3AC] hover:bg-gold text-forest-dark font-sans font-bold text-xs uppercase tracking-wider rounded-full shadow-lg transition-luxury"
                >
                  Discover All Works <FiBookOpen size={14} />
                </Link>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* 4. NOT SURE WHERE TO START BANNER */}
      <section className="py-20">
        <Container>
          <div className="bg-[#F5F4F0] border border-gold/15 rounded-[24px] p-8 sm:p-16 text-center max-w-3xl mx-auto space-y-6 shadow-sm">
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-forest-dark">
              Not sure where to start?
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-light font-sans font-light leading-relaxed max-w-xl mx-auto">
              Whether you're looking for heart-pounding romance, culinary inspiration, or a quiet mystery by the fireplace, we have a world waiting for you.
            </p>
            <div className="pt-2">
              <Link
                to="/books"
                className="px-8 py-3.5 bg-forest-dark hover:bg-gold text-cream hover:text-forest-dark font-sans font-bold text-xs uppercase tracking-wider rounded-full shadow transition-luxury inline-block"
              >
                Browse All Books
              </Link>
            </div>
          </div>
        </Container>
      </section>

    </div>
  );
}

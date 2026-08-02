import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiBookOpen } from "react-icons/fi";
import Container from "../../components/layout/Container";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { getPenNames } from "../../services/penNameService";
import { getBooks } from "../../services/bookService";

function PenNameAvatar({ profileImage, name, initials }) {
  if (profileImage) {
    return (
      <div className="p-0.5 bg-white rounded-full border border-gold/25 shadow-sm inline-block">
        <div className="w-24 h-24 rounded-full overflow-hidden shadow bg-[#112318] flex items-center justify-center">
          <img src={profileImage} alt={name} className="w-full h-full object-cover" />
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

function BookCoverPlaceholder({ coverImage, initials }) {
  if (coverImage) {
    return (
      <div className="w-10 h-14 rounded overflow-hidden shadow-md shrink-0">
        <img src={coverImage} alt="Book cover" className="w-full h-full object-cover" />
      </div>
    );
  }
  return (
    <div className="w-10 h-14 bg-gradient-to-b from-[#122217] to-forest-dark border border-gold/30 rounded flex flex-col items-center justify-center text-[9px] font-bold text-gold font-serif shadow-md relative overflow-hidden select-none shrink-0">
      <div className="absolute top-0 right-1.5 w-1 h-3.5 bg-gold/30" />
      <span>{initials}</span>
    </div>
  );
}

export default function PenNames() {
  const [penNames, setPenNames] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [fetchedPenNames, fetchedBooks] = await Promise.all([
          getPenNames(),
          getBooks()
        ]);
        
        // Filter active pen names
        const activePens = fetchedPenNames.filter(p => p.status === "active");
        // Sort by displayOrder ascending
        activePens.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

        setPenNames(activePens);
        setBooks(fetchedBooks);
      } catch (err) {
        console.error("Error loading pen names catalog:", err);
        setError("Failed to load author profiles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 bg-cream">
        <LoadingSpinner className="w-10 h-10 text-forest" />
        <p className="text-xs text-charcoal/50 uppercase tracking-widest font-bold font-sans">Meeting the authors...</p>
      </div>
    );
  }

  if (penNames.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-8 bg-cream text-charcoal">
        <h2 className="font-serif font-bold text-2xl text-forest-dark">No Authors Found</h2>
        <p className="text-xs text-charcoal/60 mt-2 max-w-sm">We are currently setting up Elias Thorne's catalog profiles. Please check back soon.</p>
        <Link to="/" className="mt-6 px-6 py-2.5 bg-forest-dark hover:bg-gold text-cream hover:text-forest-dark rounded-full text-xs font-bold font-sans transition-luxury">
          Go To Homepage
        </Link>
      </div>
    );
  }

  // Find the featured persona or fallback to first active pen name
  const featuredWoodrow = penNames.find(p => p.featured) || penNames[0];
  const listPersonas = penNames.filter(p => p.id !== featuredWoodrow.id);

  // Find latest release for the featured author
  const authorBooks = books.filter(b => b.penName && b.penName.toLowerCase() === featuredWoodrow.name.toLowerCase());
  // Sort by releaseDate descending, fallback to updatedAt
  authorBooks.sort((a, b) => {
    if (a.releaseDate && b.releaseDate) {
      return new Date(b.releaseDate) - new Date(a.releaseDate);
    }
    return (b.updatedAt?.seconds || 0) - (a.updatedAt?.seconds || 0);
  });
  const latestBook = authorBooks[0];

  return (
    <div className="pb-16 bg-cream text-charcoal font-sans text-left">
      
      {/* 1. HERO SECTION */}
      <section className="py-16 text-center bg-cream relative overflow-hidden">
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

      {error && (
        <Container className="mb-8">
          <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-xs text-red-600 font-sans text-center">
            {error}
          </div>
        </Container>
      )}

      {/* 2. PEN NAME CARDS GRID */}
      {listPersonas.length > 0 && (
        <Container className="pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listPersonas.map((p) => {
              const initials = p.name ? p.name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase() : "PN";
              return (
                <div 
                  key={p.id}
                  className="bg-[#F5F4F0] p-8 sm:p-10 rounded-[24px] flex flex-col justify-between items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gold/5 hover:border-gold/20 hover:shadow-md transition-luxury"
                >
                  <div className="space-y-4 flex flex-col items-center">
                    <PenNameAvatar profileImage={p.profileImage} name={p.name} initials={initials} />

                    <div className="space-y-1">
                      <h3 className="font-serif font-bold text-xl text-forest-dark mt-2">{p.name}</h3>
                      <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-gold-dark font-sans block">
                        {p.genreFocus || "Fiction"}
                      </span>
                    </div>

                    <p className="text-xs sm:text-[13px] text-charcoal-light leading-relaxed font-sans font-light max-w-xs line-clamp-4">
                      {p.shortBio || "No biographical information provided yet."}
                    </p>
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
              );
            })}
          </div>
        </Container>
      )}

      {/* 3. FEATURED HIGHLIGHT */}
      {featuredWoodrow && (
        <section className="bg-forest text-cream py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(197,168,128,0.06),transparent_60%)]"></div>

          <Container className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center">
              
              {/* Left Image Offset */}
              <div className="md:col-span-5 flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-2.5 border border-gold/25 rounded-2xl translate-x-3.5 -translate-y-3.5 z-0 pointer-events-none"></div>
                  
                  <div className="w-[280px] sm:w-[320px] h-[350px] sm:h-[390px] bg-gradient-to-b from-[#2D4C35] to-[#1A3020] rounded-2xl flex flex-col items-center justify-center p-6 text-center border border-gold/20 shadow-2xl relative overflow-hidden z-10">
                    {featuredWoodrow.profileImage ? (
                      <img src={featuredWoodrow.profileImage} alt={featuredWoodrow.name} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <>
                        <div className="absolute inset-0 opacity-15 pointer-events-none">
                          <svg className="w-full h-full text-gold" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
                            <circle cx="50" cy="50" r="40" />
                            <polygon points="50,15 80,75 20,75" />
                            <line x1="10" y1="10" x2="90" y2="90" />
                          </svg>
                        </div>
                        <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/35 flex items-center justify-center text-gold text-2xl font-serif mb-4 relative z-10">
                          {featuredWoodrow.name ? featuredWoodrow.name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase() : "PN"}
                        </div>
                        <h3 className="font-serif font-semibold text-cream text-lg relative z-10">{featuredWoodrow.name}</h3>
                        <p className="text-[9px] uppercase tracking-widest text-gold-light font-sans relative z-10">Portrait Placeholder</p>
                        <div className="h-px w-10 bg-gold/35 my-3 relative z-10" />
                        <p className="text-xs text-cream/55 max-w-[200px] leading-relaxed relative z-10">
                          {featuredWoodrow.genreFocus || "Fiction"}
                        </p>
                      </>
                    )}
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
                
                {featuredWoodrow.shortBio && (
                  <div className="border-l-2 border-[#C5A880] pl-5 py-1 my-6">
                    <p className="text-base sm:text-lg text-gold font-serif font-light italic leading-relaxed">
                      “{featuredWoodrow.shortBio}”
                    </p>
                  </div>
                )}

                <p className="text-xs sm:text-sm text-cream/85 leading-relaxed font-sans font-light">
                  {featuredWoodrow.fullBio || "No full biography provided yet."}
                </p>

                {/* Latest Release card */}
                {latestBook && (
                  <div className="space-y-3 pt-2">
                    <span className="text-[9px] uppercase font-bold text-gold-light tracking-[0.15em] block font-sans">
                      Latest Release
                    </span>
                    <Link 
                      to={`/books/${latestBook.slug}`}
                      className="w-full max-w-md bg-[#0F1D13] border border-gold/15 hover:border-gold/30 rounded-xl p-4 flex items-center justify-between hover:bg-[#122217] transition-luxury cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <BookCoverPlaceholder 
                          coverImage={latestBook.coverImage || latestBook.coverUrl} 
                          initials={latestBook.title ? latestBook.title.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase() : "BK"} 
                        />
                        <div className="text-left font-sans">
                          <h4 className="font-bold text-xs sm:text-sm text-cream">{latestBook.title}</h4>
                          <p className="text-[10px] sm:text-xs text-cream/55 mt-0.5">
                            {latestBook.seriesName ? `${latestBook.seriesName}, Book ${latestBook.bookNumber || 1}` : `${latestBook.genre}`}
                          </p>
                        </div>
                      </div>
                      <FiArrowRight size={16} className="text-gold" />
                    </Link>
                  </div>
                )}

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
      )}

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

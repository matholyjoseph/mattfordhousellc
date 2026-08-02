import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FiArrowRight, FiBookOpen } from "react-icons/fi";
import Container from "../../components/layout/Container";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { getPenNameBySlug } from "../../services/penNameService";
import { getBooks } from "../../services/bookService";
import { createSubscriber } from "../../services/subscriberService";

// Local component for cover placeholders in Complete Bibliography
function BibliographyCover({ coverImage, title }) {
  if (coverImage) {
    return (
      <div className="w-full aspect-[4/5] rounded-lg overflow-hidden shadow border border-black/10">
        <img src={coverImage} alt={title} className="w-full h-full object-cover" />
      </div>
    );
  }
  return (
    <div className="w-full aspect-[4/5] bg-gradient-to-b from-[#EDEDED] to-[#D5D5D5] rounded-lg border border-black/10 flex items-center justify-center p-4 relative overflow-hidden select-none">
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full text-black" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M0 0 L100 100 M0 20 L100 80 M0 40 L100 60 M0 60 L100 40 M0 80 L100 20" />
        </svg>
      </div>
      <span className="font-serif text-lg font-bold text-black/45 tracking-widest uppercase">
        {title ? title.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase() : "BK"}
      </span>
    </div>
  );
}

// Local component for Book Series Covers
function SeriesBookCover({ coverImage, title, index }) {
  if (coverImage) {
    return (
      <div className="w-full aspect-[2/3] rounded-xl overflow-hidden shadow-lg border border-gold/25">
        <img src={coverImage} alt={title} className="w-full h-full object-cover" />
      </div>
    );
  }

  const bgGradients = [
    "bg-[#1E3A27]",
    "bg-gradient-to-b from-[#3E2723] to-[#1D0C08]",
    "bg-gradient-to-b from-[#253E3F] to-[#0F1D1E]",
    "bg-gradient-to-b from-[#2C302E] to-[#121413]"
  ];
  const bg = bgGradients[index % bgGradients.length];

  return (
    <div className={`w-full aspect-[2/3] ${bg} rounded-xl border border-gold/25 p-4 flex flex-col justify-between shadow-lg relative overflow-hidden select-none`}>
      <div className="absolute inset-0 opacity-20 flex items-center justify-center">
        <svg className="w-full h-full text-gold" viewBox="0 0 100 150" fill="none" stroke="currentColor" strokeWidth="1">
          <polygon points="50,20 90,120 10,120" />
          <polygon points="50,50 80,120 20,120" />
          <line x1="50" y1="20" x2="50" y2="120" />
        </svg>
      </div>
      <div className="text-center font-serif text-cream relative z-10 space-y-1">
        <h4 className="text-[10px] uppercase tracking-widest text-gold-light font-sans font-semibold">Book {index + 1}</h4>
        <h3 className="text-sm font-bold leading-tight line-clamp-2">{title}</h3>
      </div>
      <div className="text-center font-sans text-[8px] uppercase tracking-widest text-gold-light/60 relative z-10">
        Elias Thorne
      </div>
    </div>
  );
}

// Portrait placeholder for the author
function PortraitPlaceholder({ name, profileImage }) {
  if (profileImage) {
    return (
      <div className="w-[300px] sm:w-[340px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-gold/20 relative group z-10">
        <img src={profileImage} alt={name} className="w-full h-full object-cover" />
      </div>
    );
  }
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
        {name}
      </h3>
      <p className="text-[10px] uppercase tracking-widest text-gold-light font-sans mt-1">Portrait Placeholder</p>
    </div>
  );
}

export default function PenNameDetail() {
  const { slug } = useParams();
  const [author, setAuthor] = useState(null);
  const [authorBooks, setAuthorBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Newsletter State
  const [subscriberName, setSubscriberName] = useState("");
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [subscribedMsg, setSubscribedMsg] = useState("");

  useEffect(() => {
    const fetchAuthorAndBooks = async () => {
      try {
        setLoading(true);
        setError("");
        const profile = await getPenNameBySlug(slug);
        if (!profile) {
          setError("Author profile not found.");
          setLoading(false);
          return;
        }
        setAuthor(profile);

        const allBooks = await getBooks();
        const filteredBooks = allBooks.filter(
          b => b.penName && b.penName.toLowerCase() === profile.name.toLowerCase()
        );

        // Sort books by bookNumber or releaseDate
        filteredBooks.sort((a, b) => {
          if (a.seriesName === b.seriesName && a.bookNumber !== undefined && b.bookNumber !== undefined) {
            return (parseInt(a.bookNumber) || 0) - (parseInt(b.bookNumber) || 0);
          }
          if (a.releaseDate && b.releaseDate) {
            return new Date(a.releaseDate) - new Date(b.releaseDate);
          }
          return 0;
        });

        setAuthorBooks(filteredBooks);
      } catch (err) {
        console.error("Error loading author details:", err);
        setError("Failed to synchronize author directory records.");
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorAndBooks();
  }, [slug]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!subscriberName.trim() || !subscriberEmail.trim() || !author) return;

    try {
      setSubscribing(true);
      await createSubscriber({
        fullName: subscriberName.trim(),
        email: subscriberEmail.trim(),
        subscribedTo: author.name,
        source: `author_page_${slug}`
      });
      setSubscriberName("");
      setSubscriberEmail("");
      setSubscribedMsg(`Thank you for subscribing to ${author.name}'s newsletter!`);
    } catch (err) {
      console.error("Error saving subscriber:", err);
      alert("Failed to subscribe. Please try again.");
    } finally {
      setSubscribing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 bg-cream">
        <LoadingSpinner className="w-10 h-10 text-forest" />
        <p className="text-xs text-charcoal/50 uppercase tracking-widest font-bold font-sans">Connecting author chronicle...</p>
      </div>
    );
  }

  if (error || !author) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-8 bg-cream text-charcoal">
        <h2 className="font-serif font-bold text-2xl text-red-600">{error || "Author Not Found"}</h2>
        <p className="text-xs text-charcoal/60 mt-2 max-w-sm">We are unable to find the requested profile slug. It may have been disabled or deleted.</p>
        <Link to="/pen-names" className="mt-6 px-6 py-2.5 bg-forest-dark hover:bg-gold text-cream hover:text-forest-dark rounded-full text-xs font-bold font-sans transition-luxury">
          Back to Authors List
        </Link>
      </div>
    );
  }

  // Build timeline items dynamically
  const timelineItems = authorBooks.map(b => ({
    title: b.title,
    status: b.status === "published" ? "Available Now" : b.status === "comingSoon" ? "Coming Soon" : "In Production",
    desc: b.shortHook || b.subtitle || "A key title in this author's curated collection."
  }));

  const seriesName = author.genreFocus ? `${author.name}: ${author.genreFocus}` : `${author.name} Catalog`;
  const seriesSub = `Explore the complete catalog and unique storytelling worlds written under the name of ${author.name}.`;

  return (
    <div className="pb-1 bg-cream text-charcoal font-sans text-left">
      
      {/* 1. HERO SECTION (FULL BLEED) */}
      <section className="bg-forest text-cream py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(197,168,128,0.06),transparent_60%)]"></div>

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="flex flex-wrap gap-2.5">
                <span className="px-3 py-1 border border-gold/45 rounded-full text-[10px] uppercase font-bold tracking-widest text-gold-light bg-gold/5">
                  {author.genreFocus || "Fiction"}
                </span>
                {author.featured && (
                  <span className="px-3 py-1 border border-gold-light rounded-full text-[10px] uppercase font-bold tracking-widest text-[#1A3020] bg-gold-light">
                    Featured Creator
                  </span>
                )}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-forest-dark mt-2 leading-none">
                {author.name}
              </h1>

              <p className="text-sm sm:text-base text-cream/70 leading-relaxed max-w-xl font-light font-sans">
                {author.shortBio || `${author.name} writes captivating narratives crafted with attention to atmosphere and emotional depth.`}
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-6">
                <a 
                  href="#series" 
                  className="inline-flex items-center gap-2 text-xs font-semibold text-gold-light hover:text-gold transition-colors uppercase tracking-widest"
                >
                  Discover Works <span className="text-sm">↓</span>
                </a>
                <a 
                  href="#newsletter"
                  className="px-6 py-2.5 border border-[#C5A880] text-[#C5A880] hover:bg-[#C5A880]/15 hover:text-white rounded-full text-xs font-semibold tracking-wider transition-luxury uppercase bg-transparent text-center"
                >
                  Subscribe to Updates
                </a>
              </div>
            </div>

            {/* Right Portrait Column */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative">
                <PortraitPlaceholder name={author.name} profileImage={author.profileImage} />
                
                {timelineItems.length > 0 && timelineItems[0].status === "Coming Soon" && (
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-[#EBD3AC] hover:bg-gold text-forest-dark flex flex-col items-center justify-center text-[9px] font-bold uppercase tracking-wider text-center p-2.5 shadow-xl leading-tight select-none rotate-12 transition-luxury cursor-default z-20">
                    <span>Coming</span>
                    <span className="text-[7px] opacity-80 mt-0.5">Soon</span>
                  </div>
                )}
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* 2. SERIES / NOVELS SECTION */}
      <section id="series" className="py-20 bg-cream">
        <Container className="space-y-12">
          
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
                Browse All Books
              </Link>
            </div>
          </div>
          
          {authorBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {authorBooks.map((b, idx) => (
                <div key={b.id} className="space-y-4 flex flex-col text-left group">
                  <Link to={`/books/${b.slug}`}>
                    <SeriesBookCover coverImage={b.coverImage || b.coverUrl} title={b.title} index={idx} />
                  </Link>
                  <h3 className="font-serif font-bold text-xl text-forest-dark mt-2 group-hover:text-gold transition-colors line-clamp-1">
                    {b.title}
                  </h3>
                  <p className="text-xs text-charcoal-light font-sans font-light">
                    {b.seriesName ? `${b.seriesName}, Book ${b.bookNumber || 1}` : b.genre || "Standalone"} • {b.status === "published" ? "Available" : b.status === "comingSoon" ? "Coming Soon" : "Draft"}
                  </p>
                  <Link to={`/books/${b.slug}`} className="inline-flex items-center gap-1 text-xs font-semibold text-charcoal-light hover:text-gold transition-colors mt-1">
                    View Details <FiArrowRight size={12} />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-charcoal/45 italic text-sm">
              No novels registered under this profile yet.
            </div>
          )}

        </Container>
      </section>

      {/* Biography Section */}
      {author.fullBio && (
        <section className="py-16 bg-[#F5F4F0]/40 border-y border-[#E5E3DC]/30">
          <Container className="max-w-3xl text-left space-y-6">
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-forest-dark">
              Biography & Inspiration
            </h3>
            <div className="text-xs sm:text-sm text-charcoal-light leading-relaxed font-sans font-light space-y-4 whitespace-pre-wrap">
              {author.fullBio}
            </div>
          </Container>
        </section>
      )}

      {/* 3. READING JOURNEY TIMELINE & LANDSCAPE */}
      {timelineItems.length > 0 && (
        <section className="py-20 bg-cream">
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

              {/* Right Forest Landscape */}
              <div className="lg:col-span-6">
                <div className="w-full h-[350px] bg-gradient-to-b from-[#324D3E] to-[#172D21] rounded-2xl relative overflow-hidden shadow-md flex items-end">
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
                </div>
              </div>

            </div>
          </Container>
        </section>
      )}

      {/* 4. COMPLETE BIBLIOGRAPHY */}
      {authorBooks.length > 0 && (
        <section className="py-20 bg-[#F5F4F0]/30 border-t border-[#E5E3DC]/30">
          <Container className="space-y-10 text-center">
            <div className="space-y-3 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest-dark">
                Complete Bibliography
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-light font-sans font-light leading-relaxed">
                Explore every title written by {author.name}, from initial publications to recent releases.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mt-12">
              {authorBooks.map((b) => (
                <div key={b.id} className="bg-white p-5 rounded-2xl border border-gold/10 hover:border-gold/25 hover:shadow-md transition-luxury flex flex-col justify-between">
                  <div className="space-y-4">
                    <BibliographyCover coverImage={b.coverImage || b.coverUrl} title={b.title} />
                    <div className="space-y-1 text-left">
                      <h4 className="font-serif font-bold text-base text-forest-dark line-clamp-1">
                        {b.title}
                      </h4>
                      <p className="text-[11px] text-charcoal-light font-sans font-light">
                        {b.genre || "Fiction"}
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 text-left">
                    <Link
                      to={`/books/${b.slug}`}
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
      )}

      {/* 5. NEWSLETTER BANNER */}
      <section id="newsletter" className="pb-16 pt-8 bg-cream">
        <Container>
          <div className="max-w-4xl mx-auto py-12 px-8 sm:px-16 rounded-[24px] bg-[#F5F4F0] border border-gold/15 shadow-sm text-center relative overflow-hidden my-4">
            
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
                Join the inner circle for exclusive chapters, author notes, and early access to the next publication releases.
              </p>
            </div>

            {subscribedMsg ? (
              <div className="mt-8 p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-2xl text-sm font-semibold max-w-md mx-auto">
                {subscribedMsg}
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                <input
                  type="text"
                  required
                  value={subscriberName}
                  onChange={(e) => setSubscriberName(e.target.value)}
                  placeholder="Your Name"
                  className="px-4 py-3 text-xs bg-white border border-charcoal/15 rounded-md focus:outline-none focus:ring-1 focus:ring-gold text-charcoal w-full sm:w-64 shadow-sm"
                />
                <input
                  type="email"
                  required
                  value={subscriberEmail}
                  onChange={(e) => setSubscriberEmail(e.target.value)}
                  placeholder="Email Address"
                  className="px-4 py-3 text-xs bg-white border border-charcoal/15 rounded-md focus:outline-none focus:ring-1 focus:ring-gold text-charcoal w-full sm:w-64 shadow-sm"
                />
                <button
                  type="submit"
                  disabled={subscribing}
                  className="px-8 py-3 bg-forest-dark hover:bg-gold text-cream hover:text-forest-dark rounded-full text-xs font-bold uppercase tracking-widest transition-luxury shadow-md shrink-0 w-full sm:w-auto cursor-pointer"
                >
                  {subscribing ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
            )}

            <p className="text-[10px] text-charcoal-light/60 mt-4 relative z-10">
              By subscribing, you agree to receive writing updates and marketing emails.
            </p>
          </div>
        </Container>
      </section>

    </div>
  );
}

import { useParams, Link } from "react-router-dom";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import Container from "../../components/layout/Container";

// Local component for Whispers in the Pines book cover placeholder in sidebar
function WhispersCover() {
  return (
    <div className="w-full aspect-[2/3] bg-[#1E3A27] rounded-lg border border-gold/30 p-4 flex flex-col justify-between shadow-md relative overflow-hidden select-none">
      {/* Pine forest lines */}
      <div className="absolute inset-0 opacity-20 flex items-center justify-center">
        <svg className="w-full h-full text-gold" viewBox="0 0 100 150" fill="none" stroke="currentColor" strokeWidth="1">
          <polygon points="50,20 90,120 10,120" />
          <polygon points="50,50 80,120 20,120" />
          <line x1="50" y1="20" x2="50" y2="120" />
        </svg>
      </div>
      <div className="text-center font-serif text-cream relative z-10 space-y-1">
        <h4 className="text-[8px] uppercase tracking-widest text-gold-light font-sans font-semibold">Novel</h4>
        <h3 className="text-xs font-bold leading-tight">Whispers in the Pines</h3>
      </div>
      <div className="text-center font-sans text-[7px] uppercase tracking-widest text-gold-light/60 relative z-10">
        Elias Thorne
      </div>
    </div>
  );
}

// Local component for related cover placeholders at the bottom
function RelatedCover({ type }) {
  const baseClass = "w-full aspect-[16/10] bg-gradient-to-br from-[#EAE8E3] to-[#D5D2CA] rounded-xl flex items-center justify-center p-3 relative overflow-hidden select-none border border-black/5 shadow-sm";
  if (type === "candle") {
    return (
      <div className={baseClass}>
        <svg className="w-12 h-12 text-black/20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="35" y="60" width="30" height="25" />
          <line x1="50" y1="20" x2="50" y2="60" strokeWidth="2" />
          <path d="M50 10 C53 15, 50 20, 50 20 C50 20, 47 15, 50 10 Z" fill="#C5A880" />
        </svg>
      </div>
    );
  }
  if (type === "letters") {
    return (
      <div className={baseClass}>
        <svg className="w-12 h-12 text-black/20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="25" y="30" width="50" height="40" rx="2" />
          <line x1="25" y1="30" x2="50" y2="50" />
          <line x1="75" y1="30" x2="50" y2="50" />
        </svg>
      </div>
    );
  }
  if (type === "archives") {
    return (
      <div className={baseClass}>
        <svg className="w-12 h-12 text-black/20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <line x1="20" y1="20" x2="20" y2="80" />
          <line x1="40" y1="20" x2="40" y2="80" />
          <line x1="60" y1="20" x2="60" y2="80" />
          <line x1="80" y1="20" x2="80" y2="80" />
        </svg>
      </div>
    );
  }
  return null;
}

export default function BlogDetail() {
  const { slug } = useParams();

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Subscribed to the newsletter!");
  };

  const relatedPosts = [
    {
      slug: "solitude-first-draft",
      coverType: "candle",
      category: "TECHNIQUE",
      title: "The Solitude of the First Draft",
      date: "September 24, 2028"
    },
    {
      slug: "letters-from-coast",
      coverType: "letters",
      category: "INSPIRATION",
      title: "Letters From the Coast",
      date: "August 15, 2028"
    },
    {
      slug: "exploring-great-archives",
      coverType: "archives",
      category: "READING",
      title: "Exploring the Great Archives",
      date: "July 30, 2028"
    }
  ];

  return (
    <div className="pb-0 bg-cream text-charcoal font-sans text-left">
      <Container className="py-10 max-w-5xl">
        
        {/* Back Link */}
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-forest hover:text-gold mb-10 transition-colors"
        >
          <FiArrowLeft /> Back to Journal
        </Link>

        <article className="space-y-10">
          
          {/* Metadata & Title */}
          <div className="text-center space-y-4">
            <span className="inline-block px-3 py-1 bg-[#FDFBF7] border border-[#C5A880]/20 rounded-full text-[10px] uppercase font-bold tracking-widest text-[#C5A880] font-sans">
              BEHIND THE SCENES
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-forest-dark tracking-tight leading-tight max-w-3xl mx-auto">
              The Architecture of Silence: On Writing Suspense
            </h1>
            <p className="text-xs text-charcoal-light/80 font-sans tracking-wide">
              October 12, 2028 &nbsp;|&nbsp; By Elias Thorne
            </p>
          </div>

          {/* Large Hero Banner Image Placeholder */}
          <div className="w-full h-80 sm:h-[400px] bg-gradient-to-br from-[#1E2522] to-[#0A0D0C] rounded-2xl border border-gold/15 shadow-lg relative overflow-hidden flex items-center justify-center p-6 select-none">
            {/* SVG drawing of desk lamp and window looking into forest */}
            <div className="absolute inset-0 opacity-20 flex items-center justify-center">
              <svg className="w-[120%] h-[120%] text-gold" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
                {/* Window */}
                <rect x="40" y="15" width="45" height="50" />
                <line x1="62.5" y1="15" x2="62.5" y2="65" />
                <line x1="40" y1="40" x2="85" y2="40" />
                {/* Lamp */}
                <circle cx="20" cy="45" r="8" />
                <path d="M20 45 L20 85" strokeWidth="2" />
                <line x1="12" y1="85" x2="28" y2="85" strokeWidth="3" />
                {/* Pine trees in window */}
                <polygon points="62,20 67,35 57,35" fill="currentColor" opacity="0.3" />
                <polygon points="72,25 77,40 67,40" fill="currentColor" opacity="0.3" />
              </svg>
            </div>
            <div className="text-center relative z-10 space-y-2">
              <span className="text-xs uppercase tracking-widest text-gold-light font-sans font-semibold">Hero Banner Placeholder</span>
              <h3 className="font-serif text-cream font-bold text-lg sm:text-xl max-w-md">Desk, Lamp & Misty Forest Window</h3>
            </div>
          </div>

          {/* Content & Related Book Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-6">
            
            {/* Left Column: Related Book Recommendation Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Recommendation card */}
              <div className="bg-[#F5F4F0] p-6 rounded-2xl border border-gold/10 shadow-[0_4px_20px_rgba(0,0,0,0.01)] space-y-4 text-left">
                <WhispersCover />
                <div className="space-y-1.5">
                  <h4 className="font-serif font-bold text-base text-forest-dark">Whispers in the Pines</h4>
                  <p className="text-xs text-charcoal-light font-sans font-light leading-relaxed">
                    "Some secrets are buried too deep for the mind to carry."
                  </p>
                </div>
                <Link
                  to="/books/whispers-in-the-pines"
                  className="w-full text-center py-2.5 bg-white border border-charcoal/15 hover:border-gold hover:bg-gold/5 text-charcoal text-[10px] font-bold tracking-widest uppercase rounded-lg transition-luxury shadow-sm block"
                >
                  View Book
                </Link>
              </div>

              {/* Share links */}
              <div className="text-left space-y-3 pl-2">
                <span className="text-[9px] uppercase font-bold tracking-widest text-charcoal-light/75 block">Share This Post</span>
                <div className="flex gap-2">
                  <button className="p-2 border border-charcoal/15 rounded-full hover:border-gold hover:text-gold transition-luxury cursor-pointer">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8.59 13.51l6.83 3.98m-.02-10.98l-6.79 3.96M16 5c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 11c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zM8 12c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"/></svg>
                  </button>
                  <button className="p-2 border border-charcoal/15 rounded-full hover:border-gold hover:text-gold transition-luxury cursor-pointer">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </button>
                  <button className="p-2 border border-charcoal/15 rounded-full hover:border-gold hover:text-gold transition-luxury cursor-pointer">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/></svg>
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Prose Article Body */}
            <div className="lg:col-span-8 text-left space-y-6">
              
              {/* Introduction with Drop Cap */}
              <div className="text-sm sm:text-[15px] text-charcoal font-sans font-light leading-relaxed">
                <span className="float-left text-6xl font-serif font-semibold text-forest-dark mr-3 mt-1.5 leading-none">S</span>
                ilence is rarely empty. In the world of suspense, silence is a structural element—a foundation upon which the reader builds their own anxieties. When I sit down to draft a new chapter, I don't think about what sounds to include. I think about the weight of the absence of sound.
              </div>

              <h3 className="font-serif font-bold text-xl sm:text-2xl text-forest-dark pt-4">
                The Rhythm of the Unsaid
              </h3>
              <p className="text-sm sm:text-[15px] text-charcoal font-sans font-light leading-relaxed">
                Suspense is a pacing game. It's the art of giving the reader just enough information to keep them walking, but not enough to let them see where they're going. It's the difference between a jump scare and a slow-ticking sense of dread.
              </p>

              {/* Blockquote Quote Box */}
              <div className="border-l-2 border-[#C5A880] pl-5 py-2 my-8">
                <p className="text-base sm:text-lg text-gold font-serif font-light italic leading-relaxed">
                  “The most terrifying thing isn't the monster behind the door; it's the fact that you can hear the door latch slowly turning in absolute silence.”
                </p>
              </div>

              <p className="text-sm sm:text-[15px] text-charcoal font-sans font-light leading-relaxed">
                When building a scene, I follow a few core principles to maintain this atmospheric tension:
              </p>

              {/* Bullet Points with custom check dot */}
              <ul className="space-y-3 my-6 pl-2">
                <li className="flex items-start gap-3 text-xs sm:text-sm text-charcoal font-sans font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] shrink-0 mt-2" />
                  <span>Focus on sensory details that imply a larger, unseen presence.</span>
                </li>
                <li className="flex items-start gap-3 text-xs sm:text-sm text-charcoal font-sans font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] shrink-0 mt-2" />
                  <span>Use short, rhythmic sentences to simulate an increased heart rate.</span>
                </li>
                <li className="flex items-start gap-3 text-xs sm:text-sm text-charcoal font-sans font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] shrink-0 mt-2" />
                  <span>Allow the characters' internal panic to remain unspoken.</span>
                </li>
              </ul>

              {/* Writer's Tip Green Card */}
              <div className="bg-[#1A3020] text-cream p-6 sm:p-8 rounded-2xl border border-gold/25 my-8 text-left space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#EAD3AE] font-sans block flex items-center gap-1.5">
                  ✏️ Writer's Tip
                </span>
                <p className="text-xs sm:text-[13px] text-cream/85 font-sans font-light leading-relaxed">
                  Try describing a character's environment solely through what they can no longer hear. If they're in a forest, trace the sudden loss of birdsong, signal a predator, or just a change in the wind.
                </p>
              </div>

              <h3 className="font-serif font-bold text-xl sm:text-2xl text-forest-dark pt-4">
                Space Between the Lines
              </h3>
              
              {/* Typewriter Grayscale Pattern Placeholder */}
              <div className="w-full aspect-[16/10] bg-gradient-to-br from-[#EAE8E3] to-[#D5D2CA] rounded-2xl border border-black/5 flex flex-col items-center justify-center p-6 relative overflow-hidden select-none my-6">
                <div className="absolute inset-0 opacity-15 flex items-center justify-center">
                  <svg className="w-full h-full text-black" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
                    <circle cx="50" cy="50" r="30" />
                    <rect x="20" y="20" width="60" height="60" />
                    <line x1="0" y1="0" x2="100" y2="100" />
                  </svg>
                </div>
                <span className="font-serif text-sm font-semibold text-black/40">Grayscale Photo Placeholder</span>
                <span className="text-[10px] text-black/35 font-sans mt-1">Typewriter, polaroids and coffee cup</span>
              </div>
              <p className="text-[11px] text-charcoal-light/75 font-sans font-light italic text-center mt-2 pb-4">
                Every physical object in a thriller must carry the weight of potential conflict.
              </p>

              <p className="text-sm sm:text-[15px] text-charcoal font-sans font-light leading-relaxed">
                Ultimately, the architecture of silence is about trust. Trusting that your reader's imagination is far more powerful than any detailed description you could provide. By leaving space, you invite them to inhabit the story, and that is where the true suspense lives.
              </p>
            </div>

          </div>
        </article>

        {/* Continue Reading Section */}
        <div className="space-y-8 pt-16 border-t border-gold/15 mt-20">
          <div className="flex items-end justify-between border-b border-gold/15 pb-4">
            <h3 className="font-serif font-bold text-2xl text-forest-dark">Continue Reading</h3>
            <Link 
              to="/blog"
              className="text-[10px] font-bold tracking-widest text-[#A58860] hover:text-gold uppercase transition-colors"
            >
              Explore Journal →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedPosts.map((p, idx) => (
              <div 
                key={p.slug}
                className="bg-white border border-gold/10 p-5 rounded-2xl flex flex-col justify-between hover:shadow-md hover:border-gold/25 transition-luxury text-left space-y-4"
              >
                <RelatedCover type={p.coverType} />
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold tracking-wider text-[#C5A880] block">
                    {p.category}
                  </span>
                  <h4 className="font-serif font-bold text-sm text-forest-dark hover:text-gold transition-colors leading-snug line-clamp-2">
                    <Link to="/blog">{p.title}</Link>
                  </h4>
                  <span className="text-[9px] font-sans font-light italic text-charcoal-light/70 block pt-1">{p.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </Container>

      {/* newsletter CTA at footer bottom */}
      <section className="bg-forest text-cream py-16 text-center border-t border-gold/20 mt-20">
        <Container className="space-y-6 max-w-xl mx-auto">
          <h3 className="font-serif font-bold text-2xl text-[#EAD3AE] uppercase tracking-widest leading-none">
            join the newsletter
          </h3>
          <p className="text-xs sm:text-sm text-cream/70 leading-relaxed font-sans font-light">
            Receive monthly letters on writing, exclusive book updates, and glimpses into the hidden corners of the creative life.
          </p>
          <form onSubmit={handleSubscribe} className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <input
              type="email"
              required
              placeholder="Email Address"
              className="w-full sm:w-64 px-4 py-2.5 text-xs bg-forest-dark border border-gold/30 rounded focus:outline-none focus:ring-1 focus:ring-gold text-cream"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-[#EAD3AE] hover:bg-gold text-forest-dark text-xs font-bold tracking-widest uppercase rounded shadow transition-luxury cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </Container>
      </section>

    </div>
  );
}

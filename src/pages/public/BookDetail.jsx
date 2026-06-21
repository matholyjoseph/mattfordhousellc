import { useParams, Link } from "react-router-dom";
import { 
  FiArrowLeft, FiShoppingCart, FiBookOpen, FiChevronRight, 
  FiMail, FiCalendar, FiArrowRight 
} from "react-icons/fi";
import Container from "../../components/layout/Container";
import Button from "../../components/common/Button";
import { mockBooks } from "../../data/mockData";

export default function BookDetail() {
  const { slug } = useParams();

  // Find book matching slug or fallback to first book
  const book = mockBooks.find(b => b.slug === slug) || mockBooks[0];

  // Get series books (books in same series, or other books as fallback)
  const seriesBooks = mockBooks
    .filter(b => b.slug !== book.slug && (b.series === book.series || b.series.includes("Northern")))
    .slice(0, 3);

  // Fallback if no series books are found
  const displayedRelated = seriesBooks.length > 0 ? seriesBooks : mockBooks.filter(b => b.slug !== book.slug).slice(0, 3);

  const handleScrollToDescription = () => {
    const element = document.getElementById("about-this-book");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="pb-20 font-sans text-left bg-cream">
      
      {/* 1. TOP HERO SECTION */}
      <section className="bg-cream-dark/20 border-b border-gold/15 py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            
            {/* Left Cover Art */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative p-2 bg-white border border-gold/15 rounded-lg shadow-md max-w-[250px] sm:max-w-[300px]">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-full rounded book-shadow"
                />
              </div>
            </div>

            {/* Right Information */}
            <div className="lg:col-span-8 space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-[#F4E6D6] text-gold-dark font-sans font-semibold text-[10px] px-3 py-1 rounded-full border border-gold/10">
                  {book.genres[0]}
                </span>
                <span className="bg-[#EBEBEB] text-charcoal-light font-sans font-semibold text-[10px] px-3 py-1 rounded-full">
                  {book.language}
                </span>
                <span className="bg-[#E2F0D9] text-[#385723] font-sans font-semibold text-[10px] px-3 py-1 rounded-full border border-green-200">
                  Available Now
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-charcoal-light/75 font-sans block">
                  {book.penName}
                </span>
                <h1 className="text-3xl sm:text-5xl font-serif font-bold text-forest-dark tracking-tight leading-tight">
                  {book.title}
                </h1>
                <p className="text-sm sm:text-base text-charcoal-light italic font-serif mt-1 font-light">
                  A {book.genres[0]} of the North
                </p>
              </div>

              {/* Quote box */}
              <div className="border-l-4 border-gold pl-4 py-1.5 my-4">
                <p className="text-base sm:text-lg text-charcoal font-serif font-light italic leading-relaxed">
                  "A secluded mountain lodge holds secrets older than the trees themselves."
                </p>
              </div>

              {/* Capsule Action buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://amazon.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-2.5 bg-forest hover:bg-forest-light text-cream rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-md transition-luxury"
                >
                  <FiShoppingCart size={13} />
                  Buy Now
                </a>
                <button
                  onClick={handleScrollToDescription}
                  className="px-6 py-2.5 border border-gold/40 hover:bg-gold/10 text-forest rounded-full text-xs font-bold uppercase tracking-widest transition-luxury cursor-pointer"
                >
                  Read Description
                </button>
              </div>

            </div>

          </div>
        </Container>
      </section>

      {/* 2. RETAILER STRIP */}
      <section className="bg-cream-dark/30 border-b border-gold/15 py-6 text-center">
        <Container>
          <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-charcoal-light/70 mb-4 block">
            Available at these retailers
          </span>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Amazon", "Apple Books", "Kobo", "Draft2Digital", "Google Play", "Barnes & Noble"
            ].map(retailer => (
              <a
                key={retailer}
                href="#"
                className="bg-white border border-gold/15 hover:border-gold px-4 py-2 rounded text-xs font-bold text-forest shadow-sm transition-luxury"
              >
                {retailer}
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. MAIN WORKSPACE GRID */}
      <section className="py-12">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column (prose and tropes) */}
            <div className="lg:col-span-8 space-y-8">
              {/* About book */}
              <div id="about-this-book" className="space-y-4 scroll-mt-24">
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-forest-dark mb-4">
                  About This Book
                </h3>
                <div className="text-sm sm:text-base text-charcoal-light leading-relaxed font-sans font-light whitespace-pre-line space-y-4">
                  {book.description}
                </div>
              </div>

              {/* Tropes */}
              {book.tropes && book.tropes.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-gold/10">
                  <h4 className="text-[10px] uppercase font-bold text-gold-dark tracking-wider block">Story Tropes</h4>
                  <div className="flex flex-wrap gap-2">
                    {book.tropes.map((t) => (
                      <span key={t} className="text-xs px-3 py-1.5 bg-[#F4E6D6]/60 text-gold-dark border border-gold/15 rounded font-sans font-medium">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Sneak peek */}
              {book.sneakPeek && (
                <div className="bg-forest text-cream rounded-xl p-8 space-y-4 shadow-md relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(197,168,128,0.06),transparent_50%)]"></div>
                  <h4 className="font-serif font-bold text-lg text-gold-light relative z-10 flex items-center gap-2">
                    <FiBookOpen /> Sneak Peek
                  </h4>
                  <p className="text-xs sm:text-sm text-cream/90 italic leading-relaxed font-sans font-light relative z-10 pl-4 border-l-2 border-gold">
                    "{book.sneakPeek}"
                  </p>
                  <div className="pt-2 relative z-10">
                    <button
                      onClick={() => alert("Preview chapter loading...")}
                      className="px-6 py-2.5 bg-[#DFCDA9] hover:bg-[#C5A880] text-forest-dark font-sans font-bold text-xs uppercase tracking-widest rounded transition-luxury cursor-pointer"
                    >
                      Read Preview
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column (book metadata card) */}
            <div className="lg:col-span-4">
              <div className="bg-white border border-gold/15 p-6 rounded-xl shadow-sm space-y-6">
                <h3 className="font-serif font-bold text-lg text-forest-dark border-b border-gold/15 pb-2">
                  Book Details
                </h3>
                
                <div className="divide-y divide-gold/10 text-xs font-sans">
                  <div className="py-2.5 flex justify-between gap-4">
                    <span className="text-charcoal-light font-light">Series</span>
                    <span className="font-semibold text-forest-dark text-right">{book.series || "None"}</span>
                  </div>
                  {book.bookNum && (
                    <div className="py-2.5 flex justify-between gap-4">
                      <span className="text-charcoal-light font-light">Book Number</span>
                      <span className="font-semibold text-forest-dark text-right">{book.bookNum}</span>
                    </div>
                  )}
                  <div className="py-2.5 flex justify-between gap-4">
                    <span className="text-charcoal-light font-light">Genre</span>
                    <span className="font-semibold text-forest-dark text-right">{book.genres[0]}</span>
                  </div>
                  <div className="py-2.5 flex justify-between gap-4">
                    <span className="text-charcoal-light font-light">Language</span>
                    <span className="font-semibold text-forest-dark text-right">{book.language}</span>
                  </div>
                  <div className="py-2.5 flex justify-between gap-4">
                    <span className="text-charcoal-light font-light">Release Date</span>
                    <span className="font-semibold text-forest-dark text-right">{book.releaseDate}</span>
                  </div>
                  <div className="py-2.5 flex justify-between gap-4">
                    <span className="text-charcoal-light font-light">Pen Name</span>
                    <span className="font-semibold text-forest-dark text-right">{book.penName}</span>
                  </div>
                </div>

                {/* Decorative mountain vector logo */}
                <div className="flex justify-center pt-4 opacity-40">
                  <svg className="w-10 h-10 text-gold fill-current" viewBox="0 0 24 24">
                    <path d="M12 2L1 21h22L12 2zm0 4l7.5 13h-15L12 6z"/>
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* 4. IN THIS SERIES SECTION */}
      {displayedRelated.length > 0 && (
        <section className="py-16 border-t border-gold/15 bg-cream-dark/10">
          <Container>
            <div className="flex justify-between items-end mb-10">
              <div>
                <span className="text-[10px] uppercase font-bold text-gold tracking-widest block font-sans mb-1">
                  Continue The Journey
                </span>
                <h3 className="font-serif font-black text-2xl sm:text-3xl text-forest-dark">
                  In This Series
                </h3>
              </div>
              <Link
                to="/books"
                className="text-xs font-bold uppercase tracking-widest text-forest-light hover:text-gold transition-colors inline-flex items-center gap-1 font-sans"
              >
                View Library <FiArrowRight />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {displayedRelated.map((b) => (
                <div key={b.id} className="group space-y-4">
                  <Link to={`/books/${b.slug}`} className="block relative aspect-[2/3] w-full rounded-lg overflow-hidden bg-cream-dark">
                    <img
                      src={b.coverUrl}
                      alt={b.title}
                      className="w-full h-full object-cover book-shadow book-shadow-hover rounded-lg"
                    />
                  </Link>
                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-base text-forest-dark group-hover:text-gold transition-colors">
                      <Link to={`/books/${b.slug}`}>{b.title}</Link>
                    </h4>
                    <span className="text-[10px] text-charcoal-light font-sans font-medium uppercase block">
                      {b.series} #{b.bookNum || "1"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 5. NEWSLETTER SIGNUP */}
      <section className="py-16 bg-forest text-cream border-t-2 border-gold/30">
        <Container className="max-w-3xl text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-cream">
            Want new release alerts?
          </h2>
          <p className="text-xs sm:text-sm text-cream/70 font-sans font-light leading-relaxed max-w-xl mx-auto">
            Join the Thorne Society for exclusive excerpts, behind-the-scenes research, and early access to every new release.
          </p>

          <form 
            onSubmit={(e) => { e.preventDefault(); alert("Subscribed!"); }}
            className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto pt-2"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="px-4 py-3 bg-forest-dark border border-gold/25 rounded-full focus:outline-none focus:ring-1 focus:ring-gold text-xs text-cream flex-1"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-gold hover:bg-gold-light text-forest-dark font-sans font-bold text-xs uppercase tracking-widest rounded-full shadow transition-luxury cursor-pointer"
            >
              Subscribe
            </button>
          </form>
          <span className="text-[10px] text-cream/50 font-sans font-light block">
            Respecting your privacy. Opt-out at any time.
          </span>
        </Container>
      </section>

    </div>
  );
}

import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  FiShoppingCart, FiBookOpen, 
  FiArrowRight, FiArrowLeft 
} from "react-icons/fi";
import Container from "../../components/layout/Container";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { getBookBySlug, getBooks } from "../../services/bookService";
import { createSubscriber } from "../../services/subscriberService";

const RETAILER_NAMES = {
  amazon: "Amazon",
  appleBooks: "Apple Books",
  kobo: "Kobo",
  draft2Digital: "Draft2Digital",
  googlePlay: "Google Play",
  barnesNoble: "Barnes & Noble",
  other: "Other Retailer"
};

export default function BookDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Newsletter State
  const [subEmail, setSubEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [subscribedMsg, setSubscribedMsg] = useState("");

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        setLoading(true);
        setError("");
        const bookData = await getBookBySlug(slug);
        if (!bookData) {
          setError("Book not found.");
          setLoading(false);
          return;
        }
        setBook(bookData);

        // Fetch related books
        const allBooks = await getBooks();
        // Filter out current book, and get books in same series or same genre
        let related = allBooks.filter(
          b => b.id !== bookData.id && (b.status === "published" || b.status === "comingSoon")
        );
        
        const sameSeries = related.filter(
          b => b.seriesName && bookData.seriesName && b.seriesName.toLowerCase() === bookData.seriesName.toLowerCase()
        );

        if (sameSeries.length > 0) {
          setRelatedBooks(sameSeries.slice(0, 3));
        } else {
          // Fall back to same genre or author
          const sameGenre = related.filter(
            b => b.genre && bookData.genre && b.genre.toLowerCase() === bookData.genre.toLowerCase()
          );
          setRelatedBooks(sameGenre.length > 0 ? sameGenre.slice(0, 3) : related.slice(0, 3));
        }
      } catch (err) {
        console.error("Error loading book detail:", err);
        setError("Failed to load book records from catalog database.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, [slug]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!subEmail.trim() || !book) return;
    try {
      setSubscribing(true);
      await createSubscriber({
        fullName: "Thorne Society Reader",
        email: subEmail.trim(),
        subscribedTo: book.penName || "Elias Thorne",
        source: `book_detail_${slug}`
      });
      setSubEmail("");
      setSubscribedMsg("Welcome to the Thorne Society!");
    } catch (err) {
      console.error("Subscriber save failed:", err);
      alert("Failed to subscribe. Please try again.");
    } finally {
      setSubscribing(false);
    }
  };

  const handleScrollToDescription = () => {
    const element = document.getElementById("about-this-book");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 bg-cream">
        <LoadingSpinner className="w-10 h-10 text-forest" />
        <p className="text-xs text-charcoal/50 uppercase tracking-widest font-bold font-sans">Retrieving novel scroll details...</p>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-8 bg-cream text-charcoal">
        <h2 className="font-serif font-bold text-2xl text-red-600">{error || "Book Not Found"}</h2>
        <p className="text-xs text-charcoal/60 mt-2 max-w-sm">We are unable to find the requested book slug in the catalog.</p>
        <Link to="/books" className="mt-6 px-6 py-2.5 bg-forest-dark hover:bg-gold text-cream hover:text-forest-dark rounded-full text-xs font-bold font-sans transition-luxury">
          Back to Library Catalog
        </Link>
      </div>
    );
  }

  // Find first available purchase link
  const links = book.platformLinks || {};
  const activeRetailers = Object.entries(links).filter(([_, url]) => url && url.trim() !== "");
  const primaryBuyUrl = activeRetailers[0]?.[1] || "#";

  return (
    <div className="pb-20 font-sans text-left bg-cream">
      
      {/* 1. TOP HERO SECTION */}
      <section className="bg-cream-dark/20 border-b border-gold/15 py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            
            {/* Left Cover Art */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative p-2 bg-white border border-gold/15 rounded-lg shadow-md max-w-[250px] sm:max-w-[300px] w-full">
                {book.coverImage ? (
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full rounded book-shadow"
                  />
                ) : (
                  <div className="w-full aspect-[2/3] bg-gradient-to-b from-[#122217] to-forest-dark border border-gold/30 rounded flex flex-col items-center justify-center text-center p-6 text-gold font-serif select-none">
                    <span className="font-bold text-base">{book.title}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Information */}
            <div className="lg:col-span-8 space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 text-xs">
                {book.genre && (
                  <span className="bg-[#F4E6D6] text-gold-dark font-sans font-semibold text-[10px] px-3 py-1 rounded-full border border-gold/10">
                    {book.genre}
                  </span>
                )}
                <span className="bg-[#EBEBEB] text-charcoal-light font-sans font-semibold text-[10px] px-3 py-1 rounded-full">
                  {book.language || "English"}
                </span>
                <span className={`font-sans font-semibold text-[10px] px-3 py-1 rounded-full border ${
                  book.status === "published" 
                    ? "bg-[#E2F0D9] text-[#385723] border-green-200" 
                    : "bg-amber-50 text-amber-800 border-amber-100"
                }`}>
                  {book.status === "published" ? "Available Now" : "Coming Soon"}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-charcoal-light/75 font-sans block">
                  {book.penName || "Elias Thorne"}
                </span>
                <h1 className="text-3xl sm:text-5xl font-serif font-bold text-forest-dark tracking-tight leading-tight">
                  {book.title}
                </h1>
                {book.subtitle && (
                  <p className="text-sm sm:text-base text-charcoal-light italic font-serif mt-1 font-light">
                    {book.subtitle}
                  </p>
                )}
              </div>

              {/* Short Hook */}
              {book.shortHook && (
                <div className="border-l-4 border-gold pl-4 py-1.5 my-4">
                  <p className="text-base sm:text-lg text-charcoal font-serif font-light italic leading-relaxed">
                    "{book.shortHook}"
                  </p>
                </div>
              )}

              {/* Capsule Action buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                {activeRetailers.length > 0 ? (
                  <a
                    href={primaryBuyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-2.5 bg-forest hover:bg-forest-light text-cream rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-md transition-luxury"
                  >
                    <FiShoppingCart size={13} />
                    Buy Now
                  </a>
                ) : (
                  <span className="px-6 py-2.5 bg-gray-200 text-gray-500 rounded-full text-xs font-bold uppercase tracking-widest cursor-not-allowed">
                    Coming Soon to Retailers
                  </span>
                )}
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
      {activeRetailers.length > 0 && (
        <section className="bg-cream-dark/30 border-b border-gold/15 py-6 text-center">
          <Container>
            <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-charcoal-light/70 mb-4 block">
              Available at these retailers
            </span>
            <div className="flex flex-wrap justify-center gap-3">
              {activeRetailers.map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white border border-gold/15 hover:border-gold px-4 py-2 rounded text-xs font-bold text-forest shadow-sm transition-luxury"
                >
                  {RETAILER_NAMES[key] || key}
                </a>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 3. MAIN WORKSPACE GRID */}
      <section className="py-12">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column (prose and tropes) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* About book */}
              <div id="about-this-book" className="space-y-4 scroll-mt-24 text-left">
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-forest-dark mb-4">
                  About This Book
                </h3>
                <div className="text-sm sm:text-base text-charcoal-light leading-relaxed font-sans font-light whitespace-pre-line space-y-4">
                  {book.fullDescription || book.description || "No full description catalogued yet."}
                </div>
              </div>

              {/* Tropes */}
              {book.tropes && book.tropes.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-gold/10 text-left">
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
            </div>

            {/* Right Column (book metadata card) */}
            <div className="lg:col-span-4">
              <div className="bg-white border border-gold/15 p-6 rounded-xl shadow-sm space-y-6 text-left">
                <h3 className="font-serif font-bold text-lg text-forest-dark border-b border-gold/15 pb-2">
                  Book Details
                </h3>
                
                <div className="divide-y divide-gold/10 text-xs font-sans">
                  <div className="py-2.5 flex justify-between gap-4">
                    <span className="text-charcoal-light font-light">Series</span>
                    <span className="font-semibold text-forest-dark text-right">{book.seriesName || "Standalone"}</span>
                  </div>
                  {book.bookNumber && (
                    <div className="py-2.5 flex justify-between gap-4">
                      <span className="text-charcoal-light font-light">Book Number</span>
                      <span className="font-semibold text-forest-dark text-right">Book {book.bookNumber}</span>
                    </div>
                  )}
                  {book.genre && (
                    <div className="py-2.5 flex justify-between gap-4">
                      <span className="text-charcoal-light font-light">Genre</span>
                      <span className="font-semibold text-forest-dark text-right">{book.genre}</span>
                    </div>
                  )}
                  <div className="py-2.5 flex justify-between gap-4">
                    <span className="text-charcoal-light font-light">Language</span>
                    <span className="font-semibold text-forest-dark text-right">{book.language || "English"}</span>
                  </div>
                  {book.releaseDate && (
                    <div className="py-2.5 flex justify-between gap-4">
                      <span className="text-charcoal-light font-light">Release Date</span>
                      <span className="font-semibold text-forest-dark text-right">{book.releaseDate}</span>
                    </div>
                  )}
                  <div className="py-2.5 flex justify-between gap-4">
                    <span className="text-charcoal-light font-light">Author</span>
                    <span className="font-semibold text-forest-dark text-right">{book.penName || "Elias Thorne"}</span>
                  </div>
                </div>

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
      {relatedBooks.length > 0 && (
        <section className="py-16 border-t border-gold/15 bg-cream-dark/10">
          <Container>
            <div className="flex justify-between items-end mb-10 text-left">
              <div>
                <span className="text-[10px] uppercase font-bold text-gold tracking-widest block font-sans mb-1">
                  Continue The Journey
                </span>
                <h3 className="font-serif font-black text-2xl sm:text-3xl text-forest-dark">
                  {book.seriesName ? `In The ${book.seriesName} Series` : "Recommended Reads"}
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
              {relatedBooks.map((b) => (
                <div key={b.id} className="group space-y-4 text-left">
                  <Link to={`/books/${b.slug}`} className="block relative aspect-[2/3] w-full rounded-lg overflow-hidden bg-cream-dark border border-gold/10 shadow-sm">
                    {b.coverImage ? (
                      <img
                        src={b.coverImage}
                        alt={b.title}
                        className="w-full h-full object-cover book-shadow book-shadow-hover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-b from-[#122217] to-forest-dark text-gold font-serif flex items-center justify-center p-6 text-center">
                        <span className="text-sm font-semibold">{b.title}</span>
                      </div>
                    )}
                  </Link>
                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-base text-forest-dark group-hover:text-gold transition-colors line-clamp-1">
                      <Link to={`/books/${b.slug}`}>{b.title}</Link>
                    </h4>
                    <span className="text-[10px] text-charcoal-light font-sans font-medium uppercase block">
                      {b.seriesName ? `${b.seriesName} #${b.bookNumber || 1}` : b.genre}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 5. NEWSLETTER SIGNUP */}
      <section className="py-16 bg-forest text-cream border-t-2 border-gold/30 text-center">
        <Container className="max-w-3xl space-y-6">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-cream">
            Want new release alerts?
          </h2>
          <p className="text-xs sm:text-sm text-cream/70 font-sans font-light leading-relaxed max-w-xl mx-auto">
            Join the Thorne Society for exclusive excerpts, behind-the-scenes research, and early access to every new release.
          </p>

          {subscribedMsg ? (
            <div className="p-4 bg-[#E2F0D9]/10 border border-gold/30 text-gold-light rounded-2xl text-sm font-semibold max-w-md mx-auto">
              {subscribedMsg}
            </div>
          ) : (
            <form 
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto pt-2"
            >
              <input
                type="email"
                required
                value={subEmail}
                onChange={(e) => setSubEmail(e.target.value)}
                placeholder="Enter your email address"
                className="px-4 py-3 bg-forest-dark border border-gold/25 rounded-full focus:outline-none focus:ring-1 focus:ring-gold text-xs text-cream flex-1"
              />
              <button
                type="submit"
                disabled={subscribing}
                className="px-8 py-3 bg-gold hover:bg-gold-light text-forest-dark font-sans font-bold text-xs uppercase tracking-widest rounded-full shadow transition-luxury cursor-pointer"
              >
                {subscribing ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          )}
          <span className="text-[10px] text-cream/50 font-sans font-light block">
            Respecting your privacy. Opt-out at any time.
          </span>
        </Container>
      </section>

    </div>
  );
}

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Container from "../../components/layout/Container";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { getBlogBySlug, getBlogs } from "../../services/blogService";
import { getBooks } from "../../services/bookService";
import { createSubscriber } from "../../services/subscriberService";

// Related book recommendation sidebar card
function ConnectedBookCard({ book }) {
  if (!book) return null;
  return (
    <div className="bg-[#F5F4F0] p-6 rounded-2xl border border-gold/10 shadow-[0_4px_20px_rgba(0,0,0,0.01)] space-y-4 text-left">
      <div className="w-full aspect-[2/3] bg-[#1E3A27] rounded-lg border border-gold/30 p-2 flex flex-col justify-between shadow-md relative overflow-hidden select-none">
        {book.coverImage ? (
          <img src={book.coverImage} alt={book.title} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <>
            <div className="absolute inset-0 opacity-20 flex items-center justify-center">
              <svg className="w-full h-full text-gold" viewBox="0 0 100 150" fill="none" stroke="currentColor" strokeWidth="1">
                <polygon points="50,20 90,120 10,120" />
              </svg>
            </div>
            <div className="text-center font-serif text-cream relative z-10 space-y-1 mt-2">
              <h4 className="text-[8px] uppercase tracking-widest text-gold-light font-sans font-semibold">Novel</h4>
              <h3 className="text-xs font-bold leading-tight line-clamp-2">{book.title}</h3>
            </div>
            <div className="text-center font-sans text-[7px] uppercase tracking-widest text-gold-light/60 relative z-10 mb-2">
              {book.penName || "Elias Thorne"}
            </div>
          </>
        )}
      </div>
      <div className="space-y-1.5 text-left">
        <h4 className="font-serif font-bold text-base text-forest-dark line-clamp-1">{book.title}</h4>
        <p className="text-xs text-charcoal-light font-sans font-light leading-relaxed line-clamp-2">
          {book.shortHook || book.subtitle || "Explore this novel in our collection."}
        </p>
      </div>
      <Link
        to={`/books/${book.slug}`}
        className="w-full text-center py-2.5 bg-white border border-charcoal/15 hover:border-gold hover:bg-gold/5 text-charcoal text-[10px] font-bold tracking-widest uppercase rounded-lg transition-luxury shadow-sm block"
      >
        View Book
      </Link>
    </div>
  );
}

// Local component for related cover placeholders at the bottom
function RelatedCover({ image, category, title }) {
  if (image) {
    return (
      <div className="w-full aspect-[16/10] rounded-xl overflow-hidden shadow-sm border border-black/5">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
    );
  }
  return (
    <div className="w-full aspect-[16/10] bg-gradient-to-br from-[#EAE8E3] to-[#D5D2CA] rounded-xl flex items-center justify-center p-3 relative overflow-hidden select-none border border-black/5 shadow-sm">
      <svg className="w-12 h-12 text-black/20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="25" y="30" width="50" height="40" rx="2" />
        <line x1="25" y1="30" x2="50" y2="50" />
      </svg>
      <span className="font-serif text-[10px] font-bold text-black/30 absolute bottom-3 uppercase">{category || "Journal"}</span>
    </div>
  );
}

export default function BlogDetail() {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [connectedBook, setConnectedBook] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Newsletter State
  const [subEmail, setSubEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [subscribedMsg, setSubscribedMsg] = useState("");

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoading(true);
        setError("");
        const blogData = await getBlogBySlug(slug);
        if (!blogData) {
          setError("Journal entry not found.");
          setLoading(false);
          return;
        }
        setPost(blogData);

        // Fetch books & other blogs in parallel
        const [allBooks, allBlogs] = await Promise.all([
          getBooks(),
          getBlogs()
        ]);

        // Find connected book if matching
        if (blogData.connectedBook && blogData.connectedBook !== "None") {
          const matchBook = allBooks.find(
            b => b.title.toLowerCase() === blogData.connectedBook.toLowerCase()
          );
          if (matchBook) {
            setConnectedBook(matchBook);
          }
        } else {
          // Default fallback to first book
          const defaultBook = allBooks.filter(b => b.status === "published")[0];
          setConnectedBook(defaultBook);
        }

        // Get 3 other related blog posts (excluding current one)
        const others = allBlogs.filter(
          b => b.id !== blogData.id && b.status === "published"
        );
        setRelatedPosts(others.slice(0, 3));

      } catch (err) {
        console.error("Error fetching blog details:", err);
        setError("Failed to load journal entry.");
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [slug]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!subEmail.trim()) return;
    try {
      setSubscribing(true);
      await createSubscriber({
        fullName: "Journal Reader",
        email: subEmail.trim(),
        source: `blog_detail_${slug}`
      });
      setSubEmail("");
      setSubscribedMsg("Welcome to the newsletter!");
    } catch (err) {
      console.error(err);
      alert("Failed to subscribe. Please try again.");
    } finally {
      setSubscribing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 bg-cream">
        <LoadingSpinner className="w-10 h-10 text-forest" />
        <p className="text-xs text-charcoal/50 uppercase tracking-widest font-bold font-sans">Opening chronicle records...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-8 bg-cream text-charcoal">
        <h2 className="font-serif font-bold text-2xl text-red-600">{error || "Article Not Found"}</h2>
        <p className="text-xs text-charcoal/60 mt-2 max-w-sm">We are unable to locate the requested journal article in our archives.</p>
        <Link to="/blog" className="mt-6 px-6 py-2.5 bg-forest-dark hover:bg-gold text-cream hover:text-forest-dark rounded-full text-xs font-bold font-sans transition-luxury">
          Back to Journal
        </Link>
      </div>
    );
  }

  const formatDate = (timeObj) => {
    if (!timeObj) return "Journal Entry";
    const date = timeObj.toDate ? timeObj.toDate() : new Date(timeObj);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

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
              {post.category || "Behind the Scenes"}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-forest-dark tracking-tight leading-tight max-w-3xl mx-auto">
              {post.title}
            </h1>
            <p className="text-xs text-charcoal-light/80 font-sans tracking-wide">
              {formatDate(post.updatedAt || post.createdAt)} &nbsp;|&nbsp; By Elias Thorne
            </p>
          </div>

          {/* Banner Image / Cover */}
          <div className="w-full h-80 sm:h-[400px] bg-gradient-to-br from-[#1E2522] to-[#0A0D0C] rounded-2xl border border-gold/15 shadow-lg relative overflow-hidden flex items-center justify-center p-6 select-none bg-cream-dark">
            {post.coverImage ? (
              <img src={post.coverImage} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <>
                <div className="absolute inset-0 opacity-20 flex items-center justify-center">
                  <svg className="w-[120%] h-[120%] text-gold" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
                    <rect x="40" y="15" width="45" height="50" />
                    <line x1="62.5" y1="15" x2="62.5" y2="65" />
                    <line x1="40" y1="40" x2="85" y2="40" />
                  </svg>
                </div>
                <div className="text-center relative z-10 space-y-2">
                  <span className="text-xs uppercase tracking-widest text-gold-light font-sans font-semibold">The Dispatch Journal</span>
                  <h3 className="font-serif text-cream font-bold text-lg sm:text-xl max-w-md">{post.title}</h3>
                </div>
              </>
            )}
          </div>

          {/* Content & Related Book Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-6">
            
            {/* Left Column: Related Book Recommendation Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              
              {connectedBook && (
                <ConnectedBookCard book={connectedBook} />
              )}

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
                </div>
              </div>

            </div>

            {/* Right Column: Prose Article Body */}
            <div className="lg:col-span-8 text-left space-y-6">
              
              {/* HTML Content Body from React Quill / rich-text editor */}
              <div 
                className="prose prose-stone max-w-none text-sm sm:text-[15px] text-charcoal font-sans font-light leading-relaxed whitespace-pre-wrap space-y-4"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags association */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4 border-t border-gold/10">
                  {post.tags.map(t => (
                    <span key={t} className="text-[10px] px-2.5 py-0.5 bg-[#F5F4F0] text-gold-dark border border-gold/15 rounded font-sans font-medium">
                      #{t}
                    </span>
                  ))}
                </div>
              )}

            </div>

          </div>
        </article>

        {/* Continue Reading Section */}
        {relatedPosts.length > 0 && (
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
              {relatedPosts.map((p) => (
                <div 
                  key={p.id}
                  className="bg-white border border-gold/10 p-5 rounded-2xl flex flex-col justify-between hover:shadow-md hover:border-gold/25 transition-luxury text-left space-y-4"
                >
                  <RelatedCover image={p.coverImage} category={p.category} title={p.title} />
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-[#C5A880] block">
                      {p.category || "Journal"}
                    </span>
                    <h4 className="font-serif font-bold text-sm text-forest-dark hover:text-gold transition-colors leading-snug line-clamp-2">
                      <Link to={`/blog/${p.slug}`}>{p.title}</Link>
                    </h4>
                    <span className="text-[9px] font-sans font-light italic text-charcoal-light/70 block pt-1">{formatDate(p.updatedAt || p.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
          
          {subscribedMsg ? (
            <div className="p-3 bg-white/10 border border-gold/30 rounded text-center text-xs text-gold-light font-semibold">
              {subscribedMsg}
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <input
                type="email"
                required
                value={subEmail}
                onChange={(e) => setSubEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full sm:w-64 px-4 py-2.5 text-xs bg-forest-dark border border-gold/30 rounded focus:outline-none focus:ring-1 focus:ring-gold text-cream"
              />
              <button
                type="submit"
                disabled={subscribing}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#EAD3AE] hover:bg-gold text-forest-dark text-xs font-bold tracking-widest uppercase rounded shadow transition-luxury cursor-pointer"
              >
                {subscribing ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          )}
        </Container>
      </section>

    </div>
  );
}

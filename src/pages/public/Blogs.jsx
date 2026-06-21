import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiImage } from "react-icons/fi";
import Container from "../../components/layout/Container";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { getBlogs } from "../../services/blogService";
import { getBooks } from "../../services/bookService";
import { createSubscriber } from "../../services/subscriberService";

// Dynamic cover preview for latest releases in sidebar
function SideBookCover({ book }) {
  if (!book) return null;
  return (
    <Link 
      to={`/books/${book.slug}`}
      className="w-20 h-28 bg-[#122217] rounded shadow border border-gold/30 flex flex-col justify-between p-2 text-center relative overflow-hidden select-none group shrink-0"
    >
      {book.coverImage ? (
        <img src={book.coverImage} alt={book.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform" />
      ) : (
        <>
          <div className="absolute inset-0 opacity-20 flex items-center justify-center">
            <svg className="w-full h-full text-gold" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="50" cy="50" r="30" />
            </svg>
          </div>
          <div className="font-serif text-[7px] font-bold text-cream tracking-wider uppercase leading-tight mt-1 z-10 line-clamp-2">
            {book.title}
          </div>
          <div className="font-sans text-[5px] text-gold-light tracking-widest uppercase z-10">
            {book.penName || "Elias Thorne"}
          </div>
        </>
      )}
    </Link>
  );
}

// Blog cover image or placeholder
function BlogCover({ image, category, title }) {
  if (image) {
    return (
      <div className="w-full h-full overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover hover:scale-102 transition-transform duration-500" />
      </div>
    );
  }
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#EAE8E3] to-[#D5D2CA] flex flex-col items-center justify-center p-6 relative overflow-hidden select-none">
      <svg className="w-16 h-16 text-forest/15 absolute bottom-4 left-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 3c-1.66 0-3 1.34-3 3 0 .28.04.55.11.81l-8.62 8.62c-.26-.07-.53-.11-.81-.11-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3c0-.28-.04-.55-.11-.81l8.62-8.62c.26.07.53.11.81.11 1.66 0 3-1.34 3-3s-1.34-3-3-3z" />
      </svg>
      <span className="font-serif text-sm font-bold text-black/30 tracking-widest text-center uppercase z-10 max-w-[200px]">
        {category || "The Journal"}
      </span>
    </div>
  );
}

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [latestBooks, setLatestBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  // Newsletter State
  const [subEmail, setSubEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [subscribedMsg, setSubscribedMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [fetchedBlogs, fetchedBooks] = await Promise.all([
          getBlogs(),
          getBooks()
        ]);

        // Filter out drafts
        const publishedBlogs = fetchedBlogs.filter(b => b.status === "published");
        // Sort by date / timestamp descending
        publishedBlogs.sort((a, b) => {
          const timeA = a.updatedAt?.seconds || a.createdAt?.seconds || 0;
          const timeB = b.updatedAt?.seconds || b.createdAt?.seconds || 0;
          return timeB - timeA;
        });

        setBlogs(publishedBlogs);

        // Sort books by releaseDate desc and pick top 2
        const publicBooks = fetchedBooks.filter(b => b.status === "published" || b.status === "comingSoon");
        publicBooks.sort((a, b) => {
          if (a.releaseDate && b.releaseDate) {
            return new Date(b.releaseDate) - new Date(a.releaseDate);
          }
          return (b.updatedAt?.seconds || 0) - (a.updatedAt?.seconds || 0);
        });
        setLatestBooks(publicBooks.slice(0, 2));

      } catch (err) {
        console.error("Error loading journal entries:", err);
        setError("Failed to load journal entries from database.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle category filtering
  useEffect(() => {
    if (selectedCategory && selectedCategory !== "All Posts") {
      setFilteredBlogs(blogs.filter(b => b.category && b.category.toLowerCase() === selectedCategory.toLowerCase()));
    } else {
      setFilteredBlogs(blogs);
    }
  }, [selectedCategory, blogs]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!subEmail.trim()) return;

    try {
      setSubscribing(true);
      await createSubscriber({
        fullName: "Journal Reader",
        email: subEmail.trim(),
        source: "journal_page"
      });
      setSubEmail("");
      setSubscribedMsg("Welcome to The Dispatch!");
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
        <p className="text-xs text-charcoal/50 uppercase tracking-widest font-bold font-sans">Retrieving journal archives...</p>
      </div>
    );
  }

  // Extract unique categories from published blogs
  const categoriesList = ["All Posts", ...Array.from(new Set(blogs.map(b => b.category).filter(Boolean)))];

  // Pick first featured blog
  const featuredPost = blogs.find(b => b.featured === true) || blogs[0];
  const gridPosts = filteredBlogs.filter(b => b.id !== featuredPost?.id);

  // Curated popular posts from the list
  const popularPosts = blogs.slice(0, 3);

  // Helper to format dates
  const formatDate = (timeObj) => {
    if (!timeObj) return "Journal Entry";
    const date = timeObj.toDate ? timeObj.toDate() : new Date(timeObj);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  return (
    <div className="pb-16 bg-cream text-charcoal font-sans text-left">
      <Container className="py-6">
        
        {/* Title Header */}
        <div className="text-center py-10">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-forest-dark">
            From The Journal
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-light leading-relaxed max-w-xl mx-auto font-light font-sans mt-3">
            Book updates, reading guides, cover reveals, and notes from the publishing desk.
          </p>
          <div className="h-px w-20 bg-gold/45 mx-auto mt-6 mb-12" />
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl text-xs text-red-600 text-center">
            {error}
          </div>
        )}

        {/* 1. FEATURED ARTICLE */}
        {featuredPost && (selectedCategory === "All Posts" || (featuredPost.category && featuredPost.category.toLowerCase() === selectedCategory.toLowerCase())) && (
          <div className="bg-[#F5F4F0] p-6 sm:p-8 rounded-[24px] border border-gold/10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            
            {/* Left Cover */}
            <div className="lg:col-span-6 rounded-2xl overflow-hidden shadow-sm h-full min-h-[260px] max-h-[360px] bg-cream-dark">
              <BlogCover 
                image={featuredPost.coverImage} 
                category={featuredPost.category} 
                title={featuredPost.title} 
              />
            </div>

            {/* Right details */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="inline-block px-3 py-1 bg-white border border-gold/30 rounded text-[9px] uppercase font-bold tracking-widest text-[#C5A880] font-sans">
                {featuredPost.category || "Feature"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-dark leading-snug hover:text-gold transition-colors">
                <Link to={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
              </h2>
              <p className="text-xs sm:text-[13px] text-charcoal-light leading-relaxed font-sans font-light line-clamp-4">
                {featuredPost.excerpt || "Dive into this article to explore bookish updates and publishing notes."}
              </p>
              
              <div className="pt-6 border-t border-gold/15 flex items-center justify-between mt-6">
                <span className="text-[10px] font-sans font-light italic text-charcoal-light/75 uppercase tracking-wider">
                  {formatDate(featuredPost.updatedAt || featuredPost.createdAt)}
                </span>
                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="text-xs font-bold uppercase tracking-wider text-forest hover:text-gold flex items-center gap-1.5 transition-colors"
                >
                  Read Post →
                </Link>
              </div>
            </div>

          </div>
        )}

        {/* 2. FILTER PILLS ROW */}
        {categoriesList.length > 1 && (
          <div className="flex flex-wrap items-center gap-2.5 mb-12">
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-luxury shadow-sm cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#0F1D13] text-cream border-0 animate-fade-in"
                    : "bg-white text-charcoal hover:bg-[#F5F4F0] border border-charcoal/15"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* 3. SPLIT MAIN CONTENT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Article Grid */}
          <div className="lg:col-span-8">
            {gridPosts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {gridPosts.map((post) => (
                  <article 
                    key={post.id}
                    className="bg-white rounded-2xl overflow-hidden border border-gold/10 hover:border-gold/25 hover:shadow-md transition-luxury flex flex-col justify-between"
                  >
                    <div className="h-48 relative overflow-hidden bg-cream-dark">
                      <BlogCover image={post.coverImage} category={post.category} title={post.title} />
                    </div>
                    <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                      <div className="space-y-2 text-left">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A880] font-sans block">
                          {post.category || "General"}
                        </span>
                        <h3 className="font-serif font-bold text-lg text-forest-dark hover:text-gold transition-colors leading-snug line-clamp-2">
                          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>
                        <p className="text-xs text-charcoal-light font-sans font-light leading-relaxed line-clamp-3">
                          {post.excerpt || "Click to explore this journal entry."}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-gold/15 flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                        <span className="font-sans font-light italic text-charcoal-light/70 normal-case">{formatDate(post.updatedAt || post.createdAt)}</span>
                        <Link 
                          to={`/blog/${post.slug}`}
                          className="text-forest hover:text-gold flex items-center gap-1 transition-colors"
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center bg-[#F5F4F0]/40 rounded-xl border border-gold/10">
                <p className="text-xs text-charcoal-light italic">No posts found in this category.</p>
              </div>
            )}
          </div>

          {/* Right: Sidebar */}
          <div className="lg:col-span-4 space-y-10">
            
            {/* Popular Posts */}
            {popularPosts.length > 0 && (
              <div className="bg-[#F5F4F0]/40 p-6 rounded-2xl border border-gold/10 space-y-4 shadow-sm text-left">
                <h3 className="font-serif font-bold text-lg text-forest-dark border-b border-gold/10 pb-3">
                  Recent Entries
                </h3>
                <div className="space-y-4">
                  {popularPosts.map((post) => (
                    <div key={post.id} className="border-b border-gold/10 pb-4 last:border-b-0 last:pb-0 space-y-1">
                      <span className="text-[9px] uppercase font-bold tracking-widest text-[#C5A880] font-sans block">
                        {post.category || "Journal"}
                      </span>
                      <h4 className="font-serif font-bold text-xs text-forest hover:text-gold transition-colors block mt-0.5 line-clamp-2">
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Latest Releases */}
            {latestBooks.length > 0 && (
              <div className="space-y-4 text-left">
                <h3 className="font-serif font-bold text-lg text-forest-dark">
                  Latest Releases
                </h3>
                <div className="flex gap-4 pt-2">
                  {latestBooks.map(b => (
                    <SideBookCover key={b.id} book={b} />
                  ))}
                </div>
              </div>
            )}

            {/* The Dispatch Newsletter */}
            <div className="bg-forest text-cream p-6 rounded-2xl border border-gold/25 relative overflow-hidden shadow-md text-left">
              <div className="absolute top-4 right-4 opacity-[0.03] text-cream pointer-events-none">
                <svg className="w-20 h-20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>

              <div className="space-y-2 relative z-10">
                <h3 className="font-serif font-bold text-xl text-cream">The Dispatch</h3>
                <p className="text-xs text-cream/70 leading-relaxed font-sans font-light">
                  Receive monthly letters on literature, philosophy, and early access to new chapters.
                </p>
              </div>

              {subscribedMsg ? (
                <div className="mt-6 p-3 bg-white/10 border border-gold/30 rounded text-center text-xs text-gold-light font-semibold">
                  {subscribedMsg}
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="mt-6 space-y-3 relative z-10">
                  <input
                    type="email"
                    required
                    value={subEmail}
                    onChange={(e) => setSubEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-3 py-2.5 text-xs bg-forest-dark border border-gold/30 rounded focus:outline-none focus:ring-1 focus:ring-gold text-cream"
                  />
                  <button
                    type="submit"
                    disabled={subscribing}
                    className="w-full py-2.5 bg-gold hover:bg-gold-light text-forest-dark text-[10px] font-bold tracking-widest uppercase rounded-full shadow transition-luxury cursor-pointer"
                  >
                    {subscribing ? "Subscribing..." : "Subscribe Now"}
                  </button>
                </form>
              )}

              <span className="text-[8px] font-sans font-bold tracking-[0.2em] text-gold-light/60 text-center block mt-4 relative z-10">
                RESPECTING YOUR PRIVACY, ALWAYS.
              </span>
            </div>

          </div>

        </div>

      </Container>
    </div>
  );
}

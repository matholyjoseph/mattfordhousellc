import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/layout/Container";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

// Local component for custom book cover placeholders in the sidebar
function SideBookCover({ type }) {
  if (type === "obsidian") {
    return (
      <div className="w-20 h-28 bg-[#122217] rounded shadow border border-gold/30 flex flex-col justify-between p-2.5 text-center relative overflow-hidden select-none">
        {/* Gold geometry pattern */}
        <div className="absolute inset-0 opacity-25 flex items-center justify-center">
          <svg className="w-full h-full text-gold" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="50" cy="50" r="30" />
            <circle cx="50" cy="50" r="20" />
            <polygon points="50,10 90,50 50,90 10,50" />
          </svg>
        </div>
        <div className="font-serif text-[7px] font-bold text-cream tracking-wider uppercase leading-tight mt-1 z-10">
          The Obsidian Path
        </div>
        <div className="font-sans text-[5px] text-gold-light tracking-widest uppercase z-10">
          Elias Thorne
        </div>
      </div>
    );
  }
  if (type === "north") {
    return (
      <div className="w-20 h-28 bg-[#FCFAF5] rounded shadow border border-gold/30 flex flex-col justify-between p-2.5 text-center relative overflow-hidden select-none">
        {/* Gold mountain outline */}
        <div className="absolute inset-0 opacity-35 flex items-center justify-center">
          <svg className="w-full h-full text-gold" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
            <polygon points="50,25 80,75 20,75" />
            <polygon points="50,45 68,75 32,75" strokeDasharray="1,1" />
            <line x1="50" y1="25" x2="50" y2="75" />
          </svg>
        </div>
        <div className="font-serif text-[7px] font-bold text-forest-dark tracking-wider uppercase leading-tight mt-1 z-10">
          Write Your North
        </div>
        <div className="font-sans text-[5px] text-gold-dark tracking-widest uppercase z-10">
          Elias Thorne
        </div>
      </div>
    );
  }
  return null;
}

// Local component for custom article cover placeholders
function BlogCoverPlaceholder({ type }) {
  const baseClass = "w-full h-full bg-gradient-to-br from-[#EAE8E3] to-[#D5D2CA] flex items-center justify-center p-4 relative overflow-hidden select-none";
  if (type === "quill") {
    return (
      <div className={`${baseClass} min-h-[280px]`}>
        <svg className="w-24 h-24 text-forest/15 absolute bottom-4 left-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 3c-1.66 0-3 1.34-3 3 0 .28.04.55.11.81l-8.62 8.62c-.26-.07-.53-.11-.81-.11-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3c0-.28-.04-.55-.11-.81l8.62-8.62c.26.07.53.11.81.11 1.66 0 3-1.34 3-3s-1.34-3-3-3z" />
        </svg>
        <svg className="w-32 h-32 text-black/20 relative z-10" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="20" y="35" width="60" height="40" rx="3" />
          <line x1="20" y1="45" x2="80" y2="45" />
          <line x1="20" y1="55" x2="80" y2="55" />
          <path d="M65 20 C60 25, 50 45, 55 60 C50 65, 45 68, 40 70" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }
  if (type === "typewriter") {
    return (
      <div className="w-full h-48 bg-[#D2C8BC] flex items-center justify-center relative overflow-hidden select-none">
        <svg className="w-full h-full text-black/10 absolute inset-0" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="20" cy="30" r="8" />
          <circle cx="50" cy="30" r="8" />
          <circle cx="80" cy="30" r="8" />
          <circle cx="35" cy="60" r="8" />
          <circle cx="65" cy="60" r="8" />
        </svg>
        <span className="font-serif text-sm font-bold text-black/35 tracking-widest relative z-10">THE WRITING DESK</span>
      </div>
    );
  }
  if (type === "mist") {
    return (
      <div className="w-full h-48 bg-gradient-to-b from-[#A4C3B2] to-[#CCE3DE] flex items-center justify-center relative overflow-hidden select-none">
        <svg className="w-full h-24 absolute bottom-0 text-[#6B9080] fill-current" viewBox="0 0 100 40" preserveAspectRatio="none">
          <path d="M0 40 L15 15 L30 25 L50 10 L65 20 L80 5 L100 25 L100 40 Z" />
          <path d="M0 40 L25 25 L45 15 L68 28 L85 18 L100 25 L100 40 Z" opacity="0.6" fill="#A4C3B2" />
        </svg>
        <span className="font-serif text-[10px] font-semibold uppercase tracking-widest text-[#154734] absolute top-4 right-4 bg-white/40 px-2 py-0.5 rounded">Misty Highlands</span>
      </div>
    );
  }
  if (type === "stack") {
    return (
      <div className="w-full h-48 bg-[#E9E4DC] flex items-center justify-center relative overflow-hidden select-none">
        <svg className="w-16 h-16 text-black/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <rect x="5" y="4" width="14" height="3" rx="1" />
          <rect x="4" y="9" width="16" height="3" rx="1" />
          <rect x="5" y="14" width="14" height="3" rx="1" />
          <rect x="3" y="19" width="18" height="3" rx="1" />
        </svg>
      </div>
    );
  }
  if (type === "notebook") {
    return (
      <div className="w-full h-48 bg-[#DDD5CA] flex items-center justify-center relative overflow-hidden select-none">
        <svg className="w-20 h-20 text-black/25" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
          <rect x="15" y="20" width="35" height="60" />
          <rect x="50" y="20" width="35" height="60" />
          <line x1="50" y1="20" x2="50" y2="80" strokeDasharray="2,2" />
          <circle cx="20" cy="15" r="5" />
        </svg>
      </div>
    );
  }
  return null;
}

export default function Blogs() {
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  
  const defaultPosts = [
    {
      slug: "unveiling-midnight-almanac-hidden-histories",
      coverType: "quill",
      category: "Cover Reveals",
      title: 'Unveiling "The Midnight Almanac": A Journey into Hidden Histories',
      excerpt: "After three years of meticulous research and drafting, I am thrilled to finally share the visual identity of my upcoming historical thriller. Dive into the symbolism behind the symbols...",
      date: "October 24, 2028",
      featured: true
    },
    {
      slug: "architecture-of-silence-writing-suspense",
      coverType: "typewriter",
      category: "Writing Updates",
      title: "The Architecture of Silence: On Writing Suspense",
      excerpt: "Suspense isn't just about what happens; it's about what doesn't happen. Exploring the space between the words...",
      date: "Oct 12, 2028"
    },
    {
      slug: "map-of-mist-geography-highlands",
      coverType: "mist",
      category: "Companion Guides",
      title: "A Map of the Mist: Geography of the Highlands Series",
      excerpt: "A visual companion to the locations that inspired the Highlands series, from the forgotten lochs to the crumbling castles.",
      date: "Sep 28, 2028"
    },
    {
      slug: "where-to-begin-thorne-universe",
      coverType: "stack",
      category: "Reading Order",
      title: "Where to Begin? Navigating the Thorne Universe",
      excerpt: "With over twenty titles across three pen names, here is the definitive guide to entering the world of Thorne.",
      date: "Sep 15, 2028"
    },
    {
      slug: "crafting-sigil-art-direction-midnight",
      coverType: "notebook",
      category: "Behind The Book",
      title: "Crafting the Sigil: The Art Direction of 'Midnight'",
      excerpt: "A collaboration with illustrator Sarah Vance to create the unique iconography for the Thorne Limited Editions.",
      date: "Aug 30, 2028"
    }
  ];

  const [filteredBlogs, setFilteredBlogs] = useState(defaultPosts);

  useEffect(() => {
    if (selectedCategory && selectedCategory !== "All Posts") {
      setFilteredBlogs(defaultPosts.filter(b => b.category === selectedCategory));
    } else {
      setFilteredBlogs(defaultPosts);
    }
  }, [selectedCategory]);

  const filterCategories = [
    "All Posts",
    "New Releases",
    "Reading Order",
    "Cover Reveals",
    "Behind The Book",
    "Writing Updates",
    "Companion Guides"
  ];

  const popularPosts = [
    {
      category: "WRITING",
      title: "10 Rules for Writing Gripping First Chapters"
    },
    {
      category: "UPDATES",
      title: "Why I Write Under Three Different Pen Names"
    },
    {
      category: "GUIDES",
      title: "The Best Libraries in the World: My Personal List"
    }
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Subscribed to The Dispatch!");
  };

  const featuredPost = defaultPosts.find(b => b.featured);
  const gridPosts = filteredBlogs.filter(b => !b.featured);

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

        {/* 1. FEATURED ARTICLE */}
        {featuredPost && (selectedCategory === "All Posts" || selectedCategory === "Cover Reveals") && (
          <div className="bg-[#F5F4F0] p-6 sm:p-8 rounded-[24px] border border-gold/10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            
            {/* Left Cover Placeholder */}
            <div className="lg:col-span-6 rounded-2xl overflow-hidden shadow-sm h-full">
              <BlogCoverPlaceholder type="quill" />
            </div>

            {/* Right details */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="inline-block px-3 py-1 bg-white border border-gold/30 rounded text-[9px] uppercase font-bold tracking-widest text-[#C5A880] font-sans">
                {featuredPost.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-dark leading-snug hover:text-gold transition-colors">
                <Link to={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
              </h2>
              <p className="text-xs sm:text-[13px] text-charcoal-light leading-relaxed font-sans font-light">
                {featuredPost.excerpt}
              </p>
              
              <div className="pt-6 border-t border-gold/15 flex items-center justify-between mt-6">
                <span className="text-[10px] font-sans font-light italic text-charcoal-light/75 uppercase tracking-wider">
                  {featuredPost.date}
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
        <div className="flex flex-wrap items-center gap-2.5 mb-12">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-luxury shadow-sm cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#0F1D13] text-cream border-0"
                  : "bg-white text-charcoal hover:bg-[#F5F4F0] border border-charcoal/15"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3. SPLIT MAIN CONTENT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Article Grid */}
          <div className="lg:col-span-8">
            {gridPosts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {gridPosts.map((post) => (
                  <article 
                    key={post.slug}
                    className="bg-white rounded-2xl overflow-hidden border border-gold/10 hover:border-gold/25 hover:shadow-md transition-luxury flex flex-col justify-between"
                  >
                    <div className="h-48 relative overflow-hidden bg-cream-dark">
                      <BlogCoverPlaceholder type={post.coverType} />
                    </div>
                    <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                      <div className="space-y-2 text-left">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A880] font-sans block">
                          {post.category}
                        </span>
                        <h3 className="font-serif font-bold text-lg text-forest-dark hover:text-gold transition-colors leading-snug line-clamp-2">
                          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>
                        <p className="text-xs text-charcoal-light font-sans font-light leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-gold/15 flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                        <span className="font-sans font-light italic text-charcoal-light/70 normal-case">{post.date}</span>
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

            {/* Pagination Controls */}
            {gridPosts.length > 0 && (
              <div className="flex items-center justify-center gap-4 py-12">
                <button className="p-2 border border-charcoal/15 rounded-full hover:border-gold hover:bg-gold/5 text-charcoal hover:text-gold transition-luxury cursor-default">
                  <FiArrowLeft size={12} className="opacity-50" />
                </button>
                <span className="text-xs text-charcoal-light font-medium font-sans">Page 1 of 12</span>
                <button className="p-2 border border-charcoal/15 rounded-full hover:border-gold hover:bg-gold/5 text-charcoal hover:text-gold transition-luxury cursor-pointer">
                  <FiArrowRight size={12} />
                </button>
              </div>
            )}
          </div>

          {/* Right: Sidebar */}
          <div className="lg:col-span-4 space-y-10">
            
            {/* Popular Posts */}
            <div className="bg-[#F5F4F0]/40 p-6 rounded-2xl border border-gold/10 space-y-4 shadow-sm text-left">
              <h3 className="font-serif font-bold text-lg text-forest-dark border-b border-gold/10 pb-3">
                Popular Posts
              </h3>
              <div className="space-y-4">
                {popularPosts.map((post, idx) => (
                  <div key={idx} className="border-b border-gold/10 pb-4 last:border-b-0 last:pb-0 space-y-1">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-[#C5A880] font-sans block">
                      {post.category}
                    </span>
                    <h4 className="font-serif font-bold text-xs text-forest hover:text-gold transition-colors block mt-0.5 line-clamp-2">
                      {post.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest Releases */}
            <div className="space-y-4 text-left">
              <h3 className="font-serif font-bold text-lg text-forest-dark">
                Latest Releases
              </h3>
              <div className="flex gap-4 pt-2">
                <SideBookCover type="obsidian" />
                <SideBookCover type="north" />
              </div>
            </div>

            {/* The Dispatch Newsletter */}
            <div className="bg-forest text-cream p-6 rounded-2xl border border-gold/25 relative overflow-hidden shadow-md text-left">
              {/* Envelope watermark silhouette overlay */}
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

              <form onSubmit={handleSubscribe} className="mt-6 space-y-3 relative z-10">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  className="w-full px-3 py-2.5 text-xs bg-forest-dark border border-gold/30 rounded focus:outline-none focus:ring-1 focus:ring-gold text-cream"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-gold hover:bg-gold-light text-forest-dark text-[10px] font-bold tracking-widest uppercase rounded-full shadow transition-luxury cursor-pointer"
                >
                  Subscribe Now
                </button>
              </form>

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

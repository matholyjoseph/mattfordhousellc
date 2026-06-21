import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { 
  FiMoon, FiLayers, FiCompass, FiBookOpen, 
  FiMessageSquare, FiTrendingUp, FiCheckCircle, FiGlobe, FiArrowRight 
} from "react-icons/fi";
import Container from "../../components/layout/Container";
import Button from "../../components/common/Button";
import { mockBooks } from "../../data/mockData";

export default function Home() {
  const genresList = [
    { name: "Werewolf Romance", count: 12, icon: <FiMoon className="text-gold" size={20} /> },
    { name: "Billionaire Romance", count: 8, icon: <FiTrendingUp className="text-gold" size={20} /> },
    { name: "MM Romance", count: 15, icon: <FiCheckCircle className="text-gold" size={20} /> },
    { name: "Why Choose", count: 4, icon: <FiMessageSquare className="text-gold" size={20} /> },
    { name: "Cookbooks", count: 4, icon: <FiLayers className="text-gold" size={20} /> },
    { name: "Workbooks", count: 2, icon: <FiBookOpen className="text-gold" size={20} /> },
    { name: "Companion Guides", count: 5, icon: <FiCompass className="text-gold" size={20} /> },
    { name: "Translated", count: 18, icon: <FiGlobe className="text-gold" size={20} /> },
  ];

  // Helper to color-code status badges like the design
  const getBadgeClass = (status) => {
    switch (status) {
      case "New Release":
        return "bg-[#EBE2D5] text-forest-dark border-gold/10";
      case "Cookbook":
        return "bg-cream-dark text-forest-light border-gold/10";
      case "Workbook":
        return "bg-blue-50 text-blue-900 border-blue-100";
      default:
        return "bg-[#F7EFE5] text-gold-dark border-gold/20";
    }
  };

  return (
    <div className="space-y-24 pb-20 bg-cream text-charcoal font-sans text-left">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-forest text-cream pt-16 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(197,168,128,0.08),transparent_60%)]"></div>

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div 
              className="lg:col-span-6 space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-[1.1] text-cream">
                Discover Stories <br />That Stay With You
              </h1>
              <p className="text-sm sm:text-base text-cream/70 font-light leading-relaxed max-w-xl">
                Explore emotional romance, gripping paranormal, practical guides, and unforgettable books across every platform.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Button to="/books" variant="secondary" className="rounded-full px-8 font-bold text-xs uppercase tracking-wider">
                  Explore Books
                </Button>
                <Button to="/books/whispers-in-the-pines" variant="outline" className="rounded-full px-8 text-cream border-cream/35 hover:bg-cream/10 hover:border-cream font-bold text-xs uppercase tracking-wider">
                  Latest Release
                </Button>
              </div>
            </motion.div>

            {/* Right layered covers */}
            <div className="lg:col-span-6 flex justify-center items-center h-[340px] relative mt-12 lg:mt-0 px-6">
              <div className="flex items-center justify-center -space-x-12 relative w-full max-w-lg">
                
                {/* Whispers in the Pines */}
                <motion.div 
                  className="w-40 sm:w-44 aspect-[2/3] transform rotate-[-12deg] -translate-y-4 hover:translate-y-[-12px] hover:rotate-[-8deg] transition-luxury hover:z-30 cursor-pointer"
                  initial={{ opacity: 0, x: -50, rotate: -20 }}
                  animate={{ opacity: 1, x: 0, rotate: -12 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <img
                    src="/whispers_in_the_pines.png"
                    alt="Whispers in the Pines"
                    className="w-full h-full object-cover rounded shadow-2xl border border-white/10"
                  />
                </motion.div>

                {/* The Emerald Crown */}
                <motion.div 
                  className="w-44 sm:w-48 aspect-[2/3] transform rotate-[-4deg] translate-y-2 hover:translate-y-[-6px] hover:rotate-[0deg] transition-luxury z-10 hover:z-30 cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 2 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  <img
                    src="/emerald_crown.png"
                    alt="The Emerald Crown"
                    className="w-full h-full object-cover rounded shadow-2xl border border-white/10"
                  />
                </motion.div>

                {/* Sinking Roots */}
                <motion.div 
                  className="w-44 sm:w-48 aspect-[2/3] transform rotate-[4deg] translate-y-0 hover:translate-y-[-8px] hover:rotate-[0deg] transition-luxury z-15 hover:z-30 cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <img
                    src="/sinking_roots.png"
                    alt="Sinking Roots"
                    className="w-full h-full object-cover rounded shadow-2xl border border-white/10"
                  />
                </motion.div>

                {/* The Glass Orchard */}
                <motion.div 
                  className="w-40 sm:w-44 aspect-[2/3] transform rotate-[12deg] -translate-y-4 hover:translate-y-[-12px] hover:rotate-[8deg] transition-luxury hover:z-30 cursor-pointer"
                  initial={{ opacity: 0, x: 50, rotate: 20 }}
                  animate={{ opacity: 1, x: 0, rotate: 12 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <img
                    src="/glass_orchard.png"
                    alt="The Glass Orchard"
                    className="w-full h-full object-cover rounded shadow-2xl border border-white/10"
                  />
                </motion.div>

              </div>
            </div>

          </div>
        </Container>

        {/* Waves SVG */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] transform translate-y-[1px]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] text-cream fill-current">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
          </svg>
        </div>
      </section>

      {/* 2. THE FEATURED COLLECTION */}
      <section>
        <Container>
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-forest-dark">
              The Featured Collection
            </h2>
            <div className="h-0.5 w-16 bg-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockBooks.map((book) => (
              <motion.div 
                key={book.id}
                className="group flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Link to={`/books/${book.slug}`} className="block relative aspect-[2/3] w-full rounded-lg overflow-hidden bg-cream-dark mb-4">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover book-shadow book-shadow-hover rounded-lg"
                  />
                </Link>

                <div className="space-y-2 mt-2">
                  <div className="flex items-center">
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 border rounded-full font-sans ${getBadgeClass(book.status)}`}>
                      {book.status}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-forest-dark line-clamp-1 group-hover:text-gold transition-colors">
                    {book.title}
                  </h3>
                  <span className="text-[10px] text-charcoal-light font-sans font-medium">
                    By {book.penName}
                  </span>
                  <p className="text-xs text-charcoal-light line-clamp-2 leading-relaxed font-sans font-light">
                    {book.description}
                  </p>
                  <Link 
                    to={`/books/${book.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-forest-dark hover:text-gold uppercase tracking-wider pt-2 border-b border-transparent hover:border-gold transition-luxury w-fit"
                  >
                    View Book <FiArrowRight size={12} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. BROWSE BY GENRE */}
      <section className="py-20 bg-cream-dark/20 border-y border-gold/10">
        <Container>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-serif font-bold text-forest-dark tracking-tight">
                Browse Your Favorites
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-light font-light mt-1 font-sans">
                Explore diverse narratives and practical knowledge across our related genre collections.
              </p>
            </div>
            <Link
              to="/books"
              className="text-xs font-bold uppercase tracking-widest text-forest-light hover:text-gold transition-colors underline decoration-gold underline-offset-4 shrink-0"
            >
              View All Genres
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {genresList.map((genre, i) => (
              <motion.div
                key={genre.name}
                className="bg-white border border-gold/15 p-5 rounded-lg flex items-center justify-between hover:shadow-md transition-luxury cursor-pointer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-cream rounded-full border border-gold/10">
                    {genre.icon}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-forest-dark">{genre.name}</h4>
                    <span className="text-[10px] text-charcoal-light font-sans font-light">{genre.count} Books</span>
                  </div>
                </div>
                <FiArrowRight size={14} className="text-gold/60" />
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. ABOUT BRAND */}
      <section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="md:col-span-5 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-3 border border-gold/30 rounded-lg translate-x-2 translate-y-2 z-0"></div>
                <img
                  src="/elias_thorne.png"
                  alt="Elias Thorne portrait"
                  className="w-full max-w-[280px] sm:max-w-[340px] rounded-lg shadow-xl relative z-10 border border-gold/20"
                />
              </div>
            </div>

            <div className="md:col-span-7 text-left space-y-5">
              <span className="text-[10px] uppercase font-bold tracking-widest text-gold font-sans block">
                The Literary Voice
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest-dark tracking-tight leading-tight">
                Crafting Worlds Where Hearts and Minds Converge.
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-light leading-relaxed font-sans font-light">
                Elias Thorne is more than a name; it's a commitment to the art of storytelling. Our mission is to bridge the gap between emotional resonance and intellectual depth, offering readers an escape that feels both familiar and strikingly new.
              </p>
              <p className="text-xs sm:text-sm text-charcoal-light leading-relaxed font-sans font-light">
                Whether it's the pulse-pounding tension of a paranormal bond or the quiet contemplation of a culinary journey, every word is selected to leave a lasting impression. We believe books are not just read; they are lived.
              </p>
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-forest-dark hover:text-gold border-b-2 border-gold pb-1 transition-luxury"
                >
                  Read Our Story <FiArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. STATS STRIP */}
      <section className="bg-forest text-cream py-10 border-y border-gold/30">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: "45+", label: "Published Works" },
              { val: "12", label: "Genres Explored" },
              { val: "1M+", label: "Reader Reviews" },
              { val: "15", label: "Global Platforms" }
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <h3 className="text-3xl sm:text-4xl font-serif font-bold text-gold-light">{stat.val}</h3>
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-cream/70 block">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. NEWSLETTER */}
      <section className="py-8">
        <Container className="max-w-3xl text-center space-y-8">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest-dark">
              Stay Inspired
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-light font-sans font-light leading-relaxed max-w-xl mx-auto">
              Join our private literary circle for exclusive previews, author letters, and bookish surprises delivered directly to your inbox.
            </p>
          </div>

          <form 
            onSubmit={(e) => { e.preventDefault(); alert("Subscribed!"); }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-stretch max-w-xl mx-auto"
          >
            <input
              type="text"
              required
              placeholder="First Name"
              className="px-4 py-3 bg-white border border-gold/20 rounded focus:outline-none focus:ring-1 focus:ring-gold text-xs text-charcoal flex-1"
            />
            <input
              type="email"
              required
              placeholder="Email Address"
              className="px-4 py-3 bg-white border border-gold/20 rounded focus:outline-none focus:ring-1 focus:ring-gold text-xs text-charcoal flex-1"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-gold hover:bg-gold-light text-forest-dark font-sans font-bold text-xs uppercase tracking-widest rounded shadow transition-luxury cursor-pointer"
            >
              Subscribe
            </button>
          </form>
          <span className="text-[10px] text-charcoal-light font-sans font-light block">
            Respecting your privacy. Opt-out at any time.
          </span>
        </Container>
      </section>

    </div>
  );
}

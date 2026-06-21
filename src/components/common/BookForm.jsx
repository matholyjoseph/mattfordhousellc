import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import ImageUpload from "./ImageUpload";
import LoadingSpinner from "./LoadingSpinner";
import slugify from "slugify";

export default function BookForm({ 
  initialData = {}, 
  onSubmit, 
  onCancel, 
  loading = false 
}) {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    slug: "",
    penName: "",
    genre: "",
    language: "English",
    seriesName: "",
    bookNumber: "",
    releaseDate: "",
    status: "draft",
    coverImage: "",
    bannerImage: "",
    shortHook: "",
    fullDescription: "",
    tropes: [],
    platformLinks: {
      amazon: "",
      appleBooks: "",
      kobo: "",
      draft2Digital: "",
      googlePlay: "",
      barnesNoble: "",
      other: ""
    },
    featured: false,
    bestseller: false,
    newRelease: false,
    showOnHomepage: false,
    ...initialData
  });

  const [penNames, setPenNames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [tropesList, setTropesList] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [isSlugTouched, setIsSlugTouched] = useState(false);
  const [error, setError] = useState("");

  // Load dropdown options from Firestore
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const penSnap = await getDocs(collection(db, "pennames"));
        setPenNames(penSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const genreSnap = await getDocs(collection(db, "genres"));
        setGenres(genreSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const tropeSnap = await getDocs(collection(db, "tropes"));
        setTropesList(tropeSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error("Error loading dropdown data:", err);
      } finally {
        setLoadingOptions(false);
      }
    };
    fetchOptions();
  }, []);

  // Update slug dynamically based on title if the slug field hasn't been manually edited
  const handleTitleChange = (e) => {
    const titleVal = e.target.value;
    setFormData(prev => {
      const updated = { ...prev, title: titleVal };
      if (!isSlugTouched) {
        updated.slug = slugify(titleVal, { lower: true, strict: true });
      }
      return updated;
    });
  };

  const handleSlugChange = (e) => {
    setIsSlugTouched(true);
    setFormData(prev => ({ ...prev, slug: e.target.value }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePlatformLinkChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      platformLinks: {
        ...prev.platformLinks,
        [platform]: value
      }
    }));
  };

  const handleTropeToggle = (tropeName) => {
    setFormData(prev => {
      const current = prev.tropes || [];
      const updated = current.includes(tropeName)
        ? current.filter(t => t !== tropeName)
        : [...current, tropeName];
      return { ...prev, tropes: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title.trim()) {
      setError("Book Title is required.");
      return;
    }
    if (!formData.slug.trim()) {
      setError("URL Slug is required.");
      return;
    }

    // Published book validation
    if (formData.status === "published") {
      const hasLinks = Object.values(formData.platformLinks).some(
        link => link && link.trim() !== ""
      );
      if (!hasLinks) {
        setError("Recommends providing at least one purchase store platform link for published novels.");
        return;
      }
    }

    if (onSubmit) {
      onSubmit(formData);
    }
  };

  if (loadingOptions) {
    return (
      <div className="py-12 text-center space-y-4">
        <LoadingSpinner className="w-8 h-8 text-forest mx-auto" />
        <p className="text-xs text-charcoal/50">Fetching directory configurations...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 font-sans text-charcoal">
      
      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-xs text-red-600 font-sans leading-relaxed text-left flex items-start gap-2">
          <span className="font-bold text-sm select-none">!</span>
          <span>{error}</span>
        </div>
      )}

      {/* Grid wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Major Inputs (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* General Metadata */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5E3DC]/40 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg border-b border-[#E5E3DC]/25 pb-3 text-left">
              Book Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 text-left">
                <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Book Title</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={handleTitleChange}
                  className="w-full px-3 py-2 text-xs bg-[#F5F4F0] border border-[#E5E3DC] rounded-xl focus:outline-none focus:border-gold"
                  placeholder="e.g. Whispers in the Pines"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">URL Slug</label>
                <input 
                  type="text" 
                  value={formData.slug}
                  onChange={handleSlugChange}
                  className="w-full px-3 py-2 text-xs bg-[#F5F4F0] border border-[#E5E3DC] rounded-xl focus:outline-none focus:border-gold font-mono"
                  placeholder="whispers-in-the-pines"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Subtitle / Hookline</label>
                <input 
                  type="text" 
                  value={formData.subtitle}
                  onChange={(e) => handleInputChange("subtitle", e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F5F4F0] border border-[#E5E3DC] rounded-xl focus:outline-none focus:border-gold"
                  placeholder="A hauntingly beautiful gothic romance"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Language</label>
                <input 
                  type="text" 
                  value={formData.language}
                  onChange={(e) => handleInputChange("language", e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F5F4F0] border border-[#E5E3DC] rounded-xl focus:outline-none focus:border-gold"
                  placeholder="English"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Series Name</label>
                <input 
                  type="text" 
                  value={formData.seriesName}
                  onChange={(e) => handleInputChange("seriesName", e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F5F4F0] border border-[#E5E3DC] rounded-xl focus:outline-none focus:border-gold"
                  placeholder="The Mountain Retreat Series"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Book Number</label>
                <input 
                  type="number" 
                  value={formData.bookNumber}
                  onChange={(e) => handleInputChange("bookNumber", e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F5F4F0] border border-[#E5E3DC] rounded-xl focus:outline-none focus:border-gold"
                  placeholder="1"
                />
              </div>
            </div>

            <div className="space-y-1 text-left">
              <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Short Pitch / Hook</label>
              <input 
                type="text" 
                value={formData.shortHook}
                onChange={(e) => handleInputChange("shortHook", e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F5F4F0] border border-[#E5E3DC] rounded-xl focus:outline-none focus:border-gold"
                placeholder="A brief teaser snippet displayed on book thumbnails..."
              />
            </div>

            <div className="space-y-1 text-left">
              <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Full Book Description</label>
              <textarea 
                rows="6"
                value={formData.fullDescription}
                onChange={(e) => handleInputChange("fullDescription", e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#F5F4F0] border border-[#E5E3DC] rounded-xl focus:outline-none focus:border-gold leading-relaxed"
                placeholder="Enter rich details, plot summaries, and synopses..."
              ></textarea>
            </div>
          </div>

          {/* Platform buy links grid */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5E3DC]/40 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg border-b border-[#E5E3DC]/25 pb-3 text-left">
              Platform Purchase Links
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.keys(formData.platformLinks).map((platform) => (
                <div key={platform} className="space-y-1 text-left">
                  <label className="text-[9px] uppercase font-bold text-charcoal/50 tracking-wider block">
                    {platform === "draft2Digital" ? "Draft 2 Digital" : platform === "appleBooks" ? "Apple Books" : platform === "googlePlay" ? "Google Play" : platform === "barnesNoble" ? "Barnes & Noble" : platform}
                  </label>
                  <input 
                    type="text" 
                    value={formData.platformLinks[platform]}
                    onChange={(e) => handlePlatformLinkChange(platform, e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 text-xs bg-[#F5F4F0] border border-[#E5E3DC] rounded-xl focus:outline-none focus:border-gold"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Options & Dropdowns (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Status & Entities dropdowns */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5E3DC]/40 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg border-b border-[#E5E3DC]/25 pb-3 text-left">
              Status & Authors
            </h3>

            <div className="space-y-3.5">
              <div className="space-y-1 text-left">
                <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Publishing Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="w-full bg-[#F5F4F0] border border-[#E5E3DC] rounded-xl px-3 py-2.5 text-xs text-charcoal focus:outline-none cursor-pointer"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="comingSoon">Coming Soon</option>
                </select>
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Pen Name Focus</label>
                {penNames.length === 0 ? (
                  <div className="text-[10px] text-red-500 font-semibold p-1">
                    No pen names registered. Create one in 'Pen Names' menu first.
                  </div>
                ) : (
                  <select
                    value={formData.penName}
                    onChange={(e) => handleInputChange("penName", e.target.value)}
                    className="w-full bg-[#F5F4F0] border border-[#E5E3DC] rounded-xl px-3 py-2.5 text-xs text-charcoal focus:outline-none cursor-pointer"
                  >
                    <option value="">Select Pen Name</option>
                    {penNames.map(p => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                )}
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Library Genre</label>
                {genres.length === 0 ? (
                  <div className="text-[10px] text-amber-600 font-semibold p-1">
                    No genres registered. Create one in 'Genres & Tropes' or write manually below.
                  </div>
                ) : (
                  <select
                    value={formData.genre}
                    onChange={(e) => handleInputChange("genre", e.target.value)}
                    className="w-full bg-[#F5F4F0] border border-[#E5E3DC] rounded-xl px-3 py-2.5 text-xs text-charcoal focus:outline-none cursor-pointer"
                  >
                    <option value="">Select Genre</option>
                    {genres.map(g => (
                      <option key={g.id} value={g.name}>{g.name}</option>
                    ))}
                  </select>
                )}
                {/* Manual Fallback Input */}
                <input
                  type="text"
                  placeholder="Or write manually..."
                  value={formData.genre}
                  onChange={(e) => handleInputChange("genre", e.target.value)}
                  className="w-full px-3 py-2 mt-1.5 text-xs bg-[#F5F4F0] border border-[#E5E3DC] rounded-xl focus:outline-none focus:border-gold"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Release Date</label>
                <input 
                  type="date" 
                  value={formData.releaseDate}
                  onChange={(e) => handleInputChange("releaseDate", e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F5F4F0] border border-[#E5E3DC] rounded-xl focus:outline-none text-charcoal cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Book Art uploads */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5E3DC]/40 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg border-b border-[#E5E3DC]/25 pb-3 text-left">
              Illustrative Cover Art
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-1 text-left">
                <span className="text-[10px] uppercase font-bold text-charcoal/50 block">Cover Image</span>
                <ImageUpload 
                  value={formData.coverImage}
                  onChange={(result) => handleInputChange("coverImage", result ? result.url : "")}
                  folder="books"
                />
              </div>

              <div className="space-y-1 text-left">
                <span className="text-[10px] uppercase font-bold text-charcoal/50 block">Banner Image</span>
                <ImageUpload 
                  value={formData.bannerImage}
                  onChange={(result) => handleInputChange("bannerImage", result ? result.url : "")}
                  folder="books"
                />
              </div>
            </div>
          </div>

          {/* Tropes Multi-Select list */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5E3DC]/40 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg border-b border-[#E5E3DC]/25 pb-3 text-left">
              Trope Associations
            </h3>
            {tropesList.length === 0 ? (
              <p className="text-xs text-charcoal/40 italic text-left">No tropes registered. Create some in 'Genres & Tropes'.</p>
            ) : (
              <div className="flex flex-wrap gap-2 text-left">
                {tropesList.map(t => {
                  const active = (formData.tropes || []).includes(t.name);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleTropeToggle(t.name)}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-bold border transition-colors cursor-pointer select-none ${
                        active
                          ? "bg-[#1A3020] text-cream border-[#1A3020]"
                          : "bg-white text-charcoal border-[#E5E3DC] hover:border-gold/60"
                      }`}
                    >
                      {t.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Visibility & Toggles */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5E3DC]/40 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg border-b border-[#E5E3DC]/25 pb-3 text-left">
              Exhibits & Promotions
            </h3>

            <div className="space-y-3 text-left text-xs font-semibold text-charcoal/80 select-none">
              <label className="flex items-center justify-between cursor-pointer">
                <span>Featured Title</span>
                <input 
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => handleInputChange("featured", e.target.checked)}
                  className="rounded border-[#E5E3DC] text-forest focus:ring-forest-light h-4.5 w-4.5 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span>Bestseller Badge</span>
                <input 
                  type="checkbox"
                  checked={formData.bestseller}
                  onChange={(e) => handleInputChange("bestseller", e.target.checked)}
                  className="rounded border-[#E5E3DC] text-forest focus:ring-forest-light h-4.5 w-4.5 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span>New Release</span>
                <input 
                  type="checkbox"
                  checked={formData.newRelease}
                  onChange={(e) => handleInputChange("newRelease", e.target.checked)}
                  className="rounded border-[#E5E3DC] text-forest focus:ring-forest-light h-4.5 w-4.5 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span>Show on Homepage</span>
                <input 
                  type="checkbox"
                  checked={formData.showOnHomepage}
                  onChange={(e) => handleInputChange("showOnHomepage", e.target.checked)}
                  className="rounded border-[#E5E3DC] text-forest focus:ring-forest-light h-4.5 w-4.5 cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 bg-[#FAF9F5] border border-[#E5E3DC] text-charcoal hover:bg-[#F5F4F0] rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer select-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-[#1A3020] hover:bg-[#C5A880] text-cream hover:text-[#1A3020] rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer select-none flex items-center justify-center gap-1.5"
            >
              {loading ? (
                <>
                  <LoadingSpinner className="w-3.5 h-3.5 text-cream" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>Save Book</span>
              )}
            </button>
          </div>

        </div>

      </div>

    </form>
  );
}

import { useState } from "react";
import { FiX, FiPlus } from "react-icons/fi";

// Custom SVG Avatars for Reader Previews
function SarahAvatar() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <clipPath id="sarahClip">
          <circle cx="50" cy="50" r="46" />
        </clipPath>
        <linearGradient id="sarahBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF2D4" />
          <stop offset="100%" stopColor="#FFEAA7" />
        </linearGradient>
      </defs>
      <g clipPath="url(#sarahClip)">
        <rect width="100" height="100" fill="url(#sarahBg)" />
        <circle cx="50" cy="38" r="22" fill="#663399" opacity="0.6" />
        <circle cx="35" cy="48" r="15" fill="#4B0082" />
        <circle cx="65" cy="48" r="15" fill="#4B0082" />
        <circle cx="50" cy="47" r="15" fill="#FFD2A1" />
        <path d="M35 44 C 40 38, 60 38, 65 44 C 60 48, 55 45, 50 48 C 45 45, 40 48, 35 44 Z" fill="#4B0082" />
        <circle cx="45" cy="45" r="1.5" fill="#222" />
        <circle cx="55" cy="45" r="1.5" fill="#222" />
        <path d="M49 48 Q50 49 51 48" stroke="#222" strokeWidth="0.8" fill="none" />
        <path d="M47 52 Q50 55 53 52" stroke="#8C251C" strokeWidth="0.8" fill="none" />
        <path d="M26 100 Q35 75 50 75 Q65 75 74 100 Z" fill="#8E44AD" />
      </g>
    </svg>
  );
}

function MarcusAvatar() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <clipPath id="marcusClip">
          <circle cx="50" cy="50" r="46" />
        </clipPath>
        <linearGradient id="marcusBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E2F0D9" />
          <stop offset="100%" stopColor="#9BC53D" />
        </linearGradient>
      </defs>
      <g clipPath="url(#marcusClip)">
        <rect width="100" height="100" fill="url(#marcusBg)" />
        <circle cx="50" cy="38" r="20" fill="#333" />
        <circle cx="50" cy="47" r="14" fill="#FEE1D3" />
        <path d="M36 38 C 40 32, 60 32, 64 38 C 60 42, 50 42, 36 38 Z" fill="#222" />
        <circle cx="44" cy="46" r="3.5" fill="none" stroke="#222" strokeWidth="1" />
        <circle cx="56" cy="46" r="3.5" fill="none" stroke="#222" strokeWidth="1" />
        <line x1="48" y1="46" x2="52" y2="46" stroke="#222" strokeWidth="1" />
        <circle cx="44" cy="46" r="1" fill="#111" />
        <circle cx="56" cy="46" r="1" fill="#111" />
        <path d="M47 52 Q50 55 53 52" stroke="#8C251C" strokeWidth="0.8" fill="none" />
        <path d="M25 100 L38 72 L50 78 L62 72 L75 100 Z" fill="#2980B9" />
      </g>
    </svg>
  );
}

function DefaultAvatar() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full text-charcoal/40">
      <rect width="100" height="100" fill="#FAF6EE" />
      <circle cx="50" cy="38" r="18" fill="currentColor" opacity="0.35" />
      <path d="M20 90 C 20 70, 35 65, 50 65 C 65 65, 80 70, 80 90 Z" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

export default function AdminReviews() {
  // Reviews state listing
  const [reviews, setReviews] = useState([
    {
      id: "1",
      reviewer: "Sarah J.",
      source: "Verified Purchase",
      book: "Whispers in the Pines",
      rating: 5,
      status: "Published",
      date: "Oct 24, 2023",
      comment: "A hauntingly beautiful narrative that stays with you long after the final page is turned. Elias has a gift for atmosphere.",
      avatar: <SarahAvatar />
    },
    {
      id: "2",
      reviewer: "Marcus Reed",
      source: "Goodreads",
      book: "The Silent Library",
      rating: 5,
      status: "Draft",
      date: "Oct 20, 2023",
      comment: "A breathtaking and cerebral mystery. Elias Thorne weaves history and suspense together seamlessly. Highly recommended!",
      avatar: <MarcusAvatar />
    }
  ]);

  const [selectedReviewId, setSelectedReviewId] = useState("1");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form input states
  const [reviewerName, setReviewerName] = useState("");
  const [reviewerSource, setReviewerSource] = useState("Verified Purchase");
  const [bookTitle, setBookTitle] = useState("Whispers in the Pines");
  const [rating, setRating] = useState(5);
  const [status, setStatus] = useState("Published");
  const [comment, setComment] = useState("");

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!reviewerName.trim() || !comment.trim()) return;

    const newReview = {
      id: (reviews.length + 1).toString(),
      reviewer: reviewerName.trim(),
      source: reviewerSource,
      book: bookTitle,
      rating: parseInt(rating),
      status: status,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      comment: comment.trim(),
      avatar: <DefaultAvatar />
    };

    setReviews([...reviews, newReview]);
    setSelectedReviewId(newReview.id);
    setIsModalOpen(false);

    // Reset fields
    setReviewerName("");
    setComment("");
    setRating(5);
  };

  // Find active selected review detail
  const activeReview = reviews.find(r => r.id === selectedReviewId) || reviews[0];

  // Helper to render outlined stars as in mockup
  const renderStars = (ratingValue) => {
    return (
      <div className="flex gap-0.5 text-gold justify-start select-none">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i} 
            className="w-4.5 h-4.5 shrink-0" 
            fill={i < ratingValue ? "none" : "none"} 
            stroke="#C5A880" 
            strokeWidth="1.5" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.153-.437.772-.437.925 0l2.091 5.972a.75.75 0 00.701.508l6.326.47c.475.035.667.625.322.956l-4.78 4.582a.75.75 0 00-.218.67l1.196 6.275c.09.474-.413.84-.823.578l-5.385-3.416a.75.75 0 00-.739 0l-5.385 3.416c-.41.262-.913-.104-.823-.578l1.196-6.275a.75.75 0 00-.218-.67L2.483 11.4c-.345-.33-.153-.92.322-.956l6.326-.47a.75.75 0 00.701-.508l2.091-5.972z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-10 font-sans text-left pb-16">
      
      {/* 1. PAGE HEADER ROW */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl sm:text-[40px] font-serif font-bold text-charcoal leading-tight tracking-tight">
            Manage Reviews
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-light font-sans font-light mt-1.5">
            Curation and management of reader testimonials across all platforms.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2.5 bg-[#0A180E] hover:bg-[#C5A880] text-white hover:text-[#0A180E] font-sans font-bold text-xs uppercase tracking-wider rounded-full shadow transition-all duration-150 flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <span>+</span>
          <span>Add Review</span>
        </button>
      </div>

      {/* 2. TWO-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Reviews Table */}
        <div className="lg:col-span-7 bg-white border border-[#E5E3DC]/60 rounded-[28px] overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="text-charcoal/50 border-b border-[#E5E3DC]/60 uppercase tracking-widest font-bold font-sans text-[10px]">
                <th className="p-5">Reviewer</th>
                <th className="p-5">Book</th>
                <th className="p-5">Rating</th>
                <th className="p-5">Status</th>
                <th className="p-5">Date</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((rev) => (
                <tr 
                  key={rev.id}
                  onClick={() => setSelectedReviewId(rev.id)}
                  className={`border-b border-[#E5E3DC]/30 hover:bg-[#FAF9F6] cursor-pointer transition-colors ${
                    selectedReviewId === rev.id ? "bg-[#FAF9F6] font-semibold" : ""
                  }`}
                >
                  {/* Reviewer Details */}
                  <td className="p-5 font-sans text-left">
                    <span className="block text-sm font-bold text-charcoal leading-tight">
                      {rev.reviewer}
                    </span>
                    <span className="block text-[10px] text-charcoal/40 mt-1">
                      {rev.source}
                    </span>
                  </td>
                  
                  {/* Book Title */}
                  <td className="p-5 font-serif italic text-sm text-charcoal/80">
                    {rev.book}
                  </td>
                  
                  {/* Rating Stars */}
                  <td className="p-5">
                    {renderStars(rev.rating)}
                  </td>
                  
                  {/* Status Badges */}
                  <td className="p-5 select-none">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider ${
                      rev.status === "Published" 
                        ? "bg-[#E2F0D9] text-[#2E6B40]" 
                        : "bg-[#EBEBEB] text-[#555]"
                    }`}>
                      {rev.status}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="p-5 text-charcoal/50 font-medium">
                    {rev.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Column: Site Preview & Statistics */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Card 1: Public Site Preview (styled forest green) */}
          <div className="bg-[#0E1D14] rounded-[28px] p-8 relative overflow-hidden shadow-md text-left flex flex-col justify-between min-h-[300px]">
            {/* Big faint double quotes icon in background */}
            <span className="absolute top-2 right-8 text-[#FAF6EE] opacity-[0.05] font-serif text-[120px] select-none pointer-events-none leading-none">
              ”
            </span>

            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#FDFBF7]/60 block mb-6 font-sans select-none">
                Public Site Preview
              </span>

              {/* Stars outline */}
              {renderStars(activeReview.rating)}

              {/* Review Comment Quote */}
              <p className="text-lg sm:text-[20px] text-[#FAF6EE] italic font-serif leading-relaxed font-light mt-5 mb-8">
                "{activeReview.comment}"
              </p>
            </div>

            {/* Profile Avatar Card */}
            <div className="flex items-center gap-3 border-t border-[#FAF6EE]/10 pt-5 mt-auto">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#C5A880]/30 flex items-center justify-center shrink-0 bg-white">
                {activeReview.avatar}
              </div>
              <div className="text-left select-none">
                <span className="block text-sm font-bold text-[#FAF6EE]">
                  {activeReview.reviewer}
                </span>
                <span className="block text-[10px] uppercase font-bold tracking-wider text-[#C5A880] mt-0.5">
                  Review for '{activeReview.book}'
                </span>
              </div>
            </div>

          </div>

          {/* Card 2: Review Overview (Metrics) */}
          <div className="bg-white border border-[#E5E3DC]/60 rounded-[28px] p-6 shadow-sm space-y-5">
            <h4 className="font-serif font-bold text-xl text-charcoal">
              Review Overview
            </h4>

            {/* Average Rating Row */}
            <div className="flex justify-between items-center select-none">
              <span className="text-xs text-charcoal/50 font-medium">
                Average Rating
              </span>
              <div className="flex items-center gap-1 font-sans font-bold text-base text-charcoal">
                <span>4.9</span>
                <svg className="w-4.5 h-4.5 text-gold fill-gold" viewBox="0 0 24 24">
                  <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.87 1.4-8.168L.132 9.21l8.2-1.192L12 .587z" />
                </svg>
              </div>
            </div>

            {/* Rating Bar */}
            <div className="w-full bg-[#F5F4F0] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#0A180E] h-full rounded-full w-[98%]" />
            </div>

            {/* Grid statistics boxes */}
            <div className="grid grid-cols-2 gap-4 pt-1">
              
              {/* Total reviews */}
              <div className="bg-[#F5F4F0]/60 p-4 rounded-2xl flex flex-col items-center justify-center space-y-1 select-none">
                <span className="text-[9px] uppercase font-bold text-charcoal/40 tracking-wider">
                  Total
                </span>
                <span className="text-3xl font-bold text-charcoal font-sans">
                  124
                </span>
              </div>

              {/* New this month */}
              <div className="bg-[#F5F4F0]/60 p-4 rounded-2xl flex flex-col items-center justify-center space-y-1 select-none">
                <span className="text-[9px] uppercase font-bold text-charcoal/40 tracking-wider">
                  New This Month
                </span>
                <span className="text-3xl font-bold text-[#2E6B40] font-sans">
                  +12
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* 3. MODAL FOR ADDING REVIEW */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#0F1D13]/55 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          
          <div className="bg-white rounded-[32px] p-8 max-w-md w-full border border-[#E5E3DC] shadow-2xl relative space-y-6 text-left">
            
            {/* Close trigger */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-6 top-6 text-charcoal/40 hover:text-charcoal transition-colors cursor-pointer"
            >
              <FiX size={20} />
            </button>

            {/* Modal Title */}
            <div className="space-y-1 border-b border-[#E5E3DC]/60 pb-3">
              <h3 className="font-serif font-bold text-2xl text-charcoal">
                Add Reader Review
              </h3>
              <p className="text-[11px] text-charcoal/50 font-sans font-light">
                Manually record a reader testimonial from external sources.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleAddReview} className="space-y-4">
              
              {/* Reviewer Name */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-widest block font-sans">
                  Reviewer Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  className="w-full bg-[#F5F4F0]/60 border border-[#E5E3DC] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-gold text-charcoal font-sans font-semibold transition-colors"
                />
              </div>

              {/* Grid 2x2 for Source and Book */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* Source */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-widest block font-sans">
                    Review Source
                  </label>
                  <select
                    value={reviewerSource}
                    onChange={(e) => setReviewerSource(e.target.value)}
                    className="w-full bg-[#F5F4F0]/60 border border-[#E5E3DC] rounded-xl px-3 py-3 text-xs focus:outline-none focus:border-gold text-charcoal font-sans font-semibold transition-colors"
                  >
                    <option value="Verified Purchase">Verified Purchase</option>
                    <option value="Goodreads">Goodreads</option>
                    <option value="Amazon Review">Amazon Review</option>
                    <option value="Personal Email">Personal Email</option>
                  </select>
                </div>

                {/* Connected Book */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-widest block font-sans">
                    Reviewed Book
                  </label>
                  <select
                    value={bookTitle}
                    onChange={(e) => setBookTitle(e.target.value)}
                    className="w-full bg-[#F5F4F0]/60 border border-[#E5E3DC] rounded-xl px-3 py-3 text-xs focus:outline-none focus:border-gold text-charcoal font-sans font-semibold transition-colors"
                  >
                    <option value="Whispers in the Pines">Whispers in the Pines</option>
                    <option value="The Silent Library">The Silent Library</option>
                    <option value="Gold Coast Legacy">Gold Coast Legacy</option>
                  </select>
                </div>

              </div>

              {/* Grid 2x2 for Rating and Status */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* Rating select */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-widest block font-sans">
                    Star Rating (1-5)
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full bg-[#F5F4F0]/60 border border-[#E5E3DC] rounded-xl px-3 py-3 text-xs focus:outline-none focus:border-gold text-charcoal font-sans font-semibold transition-colors"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                </div>

                {/* Status select */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-widest block font-sans">
                    Moderation Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-[#F5F4F0]/60 border border-[#E5E3DC] rounded-xl px-3 py-3 text-xs focus:outline-none focus:border-gold text-charcoal font-sans font-semibold transition-colors"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>

              </div>

              {/* Review comment */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-widest block font-sans">
                  Review Comment / Testimonial
                </label>
                <textarea
                  required
                  rows="4"
                  placeholder="e.g. A hauntingly beautiful narrative that stays with you..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-[#F5F4F0]/60 border border-[#E5E3DC] rounded-xl p-4 text-xs focus:outline-none focus:border-gold text-charcoal font-sans font-semibold resize-none leading-relaxed"
                />
              </div>

              {/* Actions row */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5E3DC]/60 mt-6 select-none">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-white border border-[#E5E3DC] text-charcoal font-bold text-xs rounded-xl hover:bg-[#F5F4F0] transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#0A180E] hover:bg-gold text-white hover:text-[#0A180E] font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Record Review
                </button>
              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

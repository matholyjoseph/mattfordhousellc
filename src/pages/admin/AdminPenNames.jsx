import { useState } from "react";
import { FiUserPlus, FiX } from "react-icons/fi";

// Pen Name Card component matching the mockup structure
function PenNameCard({ penName }) {
  // Renders the correct avatar placeholder (vector SVG illustration) based on type
  const renderAvatar = () => {
    if (penName.type === "adam") {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <clipPath id="adamClip">
              <circle cx="50" cy="50" r="46" />
            </clipPath>
            <linearGradient id="adamBg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E2F0D9" />
              <stop offset="100%" stopColor="#8BB888" />
            </linearGradient>
          </defs>
          <g clipPath="url(#adamClip)">
            <rect width="100" height="100" fill="url(#adamBg)" />
            <path d="M15 100 Q 30 60 45 100 M 55 100 Q 70 50 85 100" fill="#2E6B40" opacity="0.3" />
            <circle cx="50" cy="45" r="18" fill="#FCE5CD" />
            <path d="M32 45 C32 25 68 25 68 45 C68 48 65 52 50 52 C35 52 32 48 32 45 Z" fill="#EAEAEA" />
            <path d="M35 44 C35 32 65 32 65 44 C65 52 60 55 50 55 C40 55 35 52 35 44 Z" fill="#FCE5CD" />
            <path d="M43 45 H47 M53 45 H57" stroke="#666" strokeWidth="1" strokeLinecap="round" />
            <path d="M48 48 Q50 51 52 48" stroke="#D5A6BD" strokeWidth="1" fill="none" />
            <path d="M45 51 Q50 53 55 51" stroke="#444" strokeWidth="0.8" fill="none" />
            <path d="M42 50 Q50 51 58 50 C58 52 42 52 42 50 Z" fill="#EAEAEA" />
            <path d="M38 48 Q50 64 62 48 C62 58 58 64 50 64 C42 64 38 58 38 48 Z" fill="#EAEAEA" />
            <path d="M32 45 C30 35 38 28 50 28 C62 28 70 35 68 45 C67 40 60 32 50 32 C40 32 33 40 32 45 Z" fill="#D3D3D3" />
            <path d="M22 100 L35 70 L50 78 L65 70 L78 100 Z" fill="#1C2F42" />
            <path d="M42 70 L50 78 L58 70 L50 82 Z" fill="#FFFFFF" />
            <path d="M48 76 L52 76 L50 90 Z" fill="#3D5A80" />
          </g>
        </svg>
      );
    }
    if (penName.type === "laura") {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <clipPath id="lauraClip">
              <circle cx="50" cy="50" r="46" />
            </clipPath>
            <linearGradient id="lauraBg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FAD0C4" />
              <stop offset="100%" stopColor="#FFD1FF" />
            </linearGradient>
          </defs>
          <g clipPath="url(#lauraClip)">
            <rect width="100" height="100" fill="url(#lauraBg)" />
            <circle cx="80" cy="70" r="25" fill="#FFEAA7" opacity="0.4" />
            <circle cx="34" cy="46" r="16" fill="#A75D3B" />
            <circle cx="66" cy="46" r="16" fill="#A75D3B" />
            <circle cx="50" cy="34" r="18" fill="#A75D3B" />
            <circle cx="50" cy="47" r="15" fill="#FEE1D3" />
            <path d="M35 38 Q50 30 65 38 C60 48 55 45 50 48 C45 45 40 48 35 38 Z" fill="#C06C47" />
            <path d="M32 46 Q30 65 37 72 C37 60 40 55 38 48 Z" fill="#C06C47" />
            <path d="M68 46 Q70 65 63 72 C63 60 60 55 62 48 Z" fill="#C06C47" />
            <circle cx="44" cy="46" r="4" fill="none" stroke="#3A2218" strokeWidth="1.2" />
            <circle cx="56" cy="46" r="4" fill="none" stroke="#3A2218" strokeWidth="1.2" />
            <line x1="48" y1="46" x2="52" y2="46" stroke="#3A2218" strokeWidth="1.2" />
            <circle cx="44" cy="46" r="1.5" fill="#333" />
            <circle cx="56" cy="46" r="1.5" fill="#333" />
            <path d="M49 50 Q50 51 51 50" stroke="#C06C47" strokeWidth="1" fill="none" />
            <path d="M47 54 Q50 57 53 54" stroke="#8C251C" strokeWidth="0.8" fill="none" />
            <path d="M26 100 Q35 74 50 74 Q65 74 74 100 Z" fill="#2E5A44" />
            <path d="M42 74 Q50 82 58 74" stroke="#DCD0BD" strokeWidth="2" fill="none" />
          </g>
        </svg>
      );
    }
    
    // Default initials avatar for Lucien Hart and new dynamic ones
    const initials = penName.name 
      ? penName.name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase() 
      : "PN";
    return (
      <div className="w-full h-full rounded-full bg-[#112318] text-[#FDFBF7] flex items-center justify-center font-serif font-bold text-xl select-none">
        {initials}
      </div>
    );
  };

  return (
    <div className="bg-white border border-[#E5E3DC]/60 rounded-[32px] p-8 shadow-sm flex flex-col items-center text-center space-y-6 relative hover:shadow-md transition-all duration-200">
      
      {/* Outer Golden Border frame for avatar circle */}
      <div className="w-24 h-24 rounded-full p-1 border border-[#C5A880] flex items-center justify-center select-none shrink-0">
        <div className="w-full h-full rounded-full overflow-hidden shadow-inner">
          {renderAvatar()}
        </div>
      </div>

      <div className="space-y-2 select-none">
        {/* Status Badge */}
        <span className="inline-block px-3 py-0.5 bg-[#E2F0D9] text-[#2E6B40] rounded-full text-[9px] font-bold tracking-wider uppercase">
          {penName.status || "Active"}
        </span>

        {/* Display Name */}
        <h3 className="font-serif font-bold text-2xl text-charcoal leading-tight">
          {penName.name}
        </h3>

        {/* Primary Genre / Subtitle */}
        <p className="text-xs font-semibold text-[#C5A880] tracking-wide font-sans">
          {penName.genre}
        </p>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[#E5E3DC]/60" />

      {/* 2-Column Metrics */}
      <div className="w-full grid grid-cols-2 gap-4">
        
        {/* Published books */}
        <div className="space-y-0.5 select-none">
          <span className="block text-[9px] uppercase font-bold text-charcoal/40 tracking-wider">
            Published
          </span>
          <span className="block text-2xl font-bold text-charcoal font-sans">
            {penName.books}
          </span>
          <span className="block text-[9px] uppercase font-bold text-charcoal/40 tracking-wider">
            Books
          </span>
        </div>

        {/* Subscribers / Followers */}
        <div className="space-y-0.5 border-l border-[#E5E3DC]/50 select-none">
          <span className="block text-[9px] uppercase font-bold text-charcoal/40 tracking-wider">
            Subscribers
          </span>
          <span className="block text-2xl font-bold text-charcoal font-sans">
            {penName.followers}
          </span>
          <span className="block text-[9px] uppercase font-bold text-charcoal/40 tracking-wider">
            Followers
          </span>
        </div>

      </div>

    </div>
  );
}

export default function AdminPenNames() {
  const [penNames, setPenNames] = useState([
    {
      id: "1",
      name: "Adam Woodrow",
      genre: "High Fantasy",
      status: "ACTIVE",
      books: 12,
      followers: "4.2k",
      type: "adam"
    },
    {
      id: "2",
      name: "Laura Dutton",
      genre: "Paranormal Romance",
      status: "ACTIVE",
      books: 8,
      followers: "2.8k",
      type: "laura"
    },
    {
      id: "3",
      name: "Lucien Hart",
      genre: "MM Romance",
      status: "ACTIVE",
      books: 5,
      followers: "1.5k",
      type: "lucien"
    }
  ]);

  // Modal creation states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [booksCount, setBooksCount] = useState("0");
  const [followersCount, setFollowersCount] = useState("0");

  const handleCreate = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Convert follower input to correct string representation (e.g. adding 'k' if large)
    let formattedFollowers = followersCount;
    const num = parseFloat(followersCount);
    if (!isNaN(num) && num >= 1000) {
      formattedFollowers = (num / 1000).toFixed(1) + "k";
    }

    const newPersona = {
      id: (penNames.length + 1).toString(),
      name: name.trim(),
      genre: genre.trim() || "Unspecified Genre",
      status: "ACTIVE",
      books: parseInt(booksCount) || 0,
      followers: formattedFollowers || "0",
      type: "initials"
    };

    setPenNames([...penNames, newPersona]);
    setIsModalOpen(false);

    // Reset fields
    setName("");
    setGenre("");
    setBooksCount("0");
    setFollowersCount("0");
  };

  return (
    <div className="space-y-10 font-sans text-left pb-16">
      
      {/* 1. PAGE HEADER ROW */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl sm:text-[40px] font-serif font-bold text-charcoal leading-tight tracking-tight">
            Manage Pen Names
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-light font-sans font-light mt-1.5">
            Organize and curate your literary identities across different genres.
          </p>
        </div>

        {/* Gold Add Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-[#FCE5CD] hover:bg-[#C5A880] text-[#7A5B36] hover:text-[#0A180E] font-sans font-bold text-xs uppercase tracking-wider rounded-full shadow transition-all duration-150 flex items-center gap-2 cursor-pointer shrink-0"
        >
          <FiUserPlus size={14} />
          <span>Add Pen Name</span>
        </button>
      </div>

      {/* 2. GRID OF CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Render Active Profiles */}
        {penNames.map((pen) => (
          <PenNameCard key={pen.id} penName={pen} />
        ))}

        {/* Dashed Create Card */}
        <div 
          onClick={() => setIsModalOpen(true)}
          className="border-2 border-dashed border-[#E5E3DC] hover:border-gold rounded-[32px] p-8 flex flex-col items-center justify-center min-h-[340px] cursor-pointer transition-all duration-150 text-center bg-transparent group space-y-4 shadow-sm hover:shadow-md"
        >
          <div className="w-16 h-16 rounded-full bg-[#F5F4F0] text-charcoal/40 group-hover:bg-[#C5A880]/15 group-hover:text-gold flex items-center justify-center transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <span className="text-sm font-bold text-charcoal/50 group-hover:text-charcoal transition-colors font-sans">
            Create New Pen Name
          </span>
        </div>

      </div>

      {/* 3. INTERACTIVE SLIDE-OVER MODAL DIALOG */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#0F1D13]/55 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          
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
                Create New Pen Name
              </h3>
              <p className="text-[11px] text-charcoal/50 font-sans font-light">
                Introduce a new literary persona to your author catalog.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleCreate} className="space-y-4">
              
              {/* Pen Name */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-widest block font-sans">
                  Pen Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Laura Dutton"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#F5F4F0]/60 border border-[#E5E3DC] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-gold text-charcoal font-sans font-semibold transition-colors"
                />
              </div>

              {/* Primary Genre */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-widest block font-sans">
                  Primary Genre / Subtitle
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Paranormal Romance"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="w-full bg-[#F5F4F0]/60 border border-[#E5E3DC] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-gold text-charcoal font-sans font-semibold transition-colors"
                />
              </div>

              {/* 2-Column fields for initial numbers */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* Books count */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-widest block font-sans">
                    Books Published
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={booksCount}
                    onChange={(e) => setBooksCount(e.target.value)}
                    className="w-full bg-[#F5F4F0]/60 border border-[#E5E3DC] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-gold text-charcoal font-sans font-semibold transition-colors"
                  />
                </div>

                {/* Followers count */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-widest block font-sans">
                    Subscribers / Followers
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={followersCount}
                    placeholder="e.g. 2800"
                    onChange={(e) => setFollowersCount(e.target.value)}
                    className="w-full bg-[#F5F4F0]/60 border border-[#E5E3DC] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-gold text-charcoal font-sans font-semibold transition-colors"
                  />
                </div>

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
                  Add Persona
                </button>
              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { 
  FiLayout, FiBook, FiEdit3, FiUsers, FiSettings, FiLogOut, FiMenu, FiX, FiSearch, FiBell, FiMail,
  FiFileText, FiMessageSquare, FiSliders, FiHome
} from "react-icons/fi";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/admin/login");
  };

  // Detect custom header page (e.g. Write Blog Post which handles its own full-width topbar)
  const isCustomHeaderPage = location.pathname === "/admin/blogs/new" || location.pathname.startsWith("/admin/blogs/edit/");

  // Detect light theme sidebar pages
  const isLightTheme = location.pathname === "/admin/blogs/new" || location.pathname.startsWith("/admin/blogs/edit/");

  // Detect specific page conditions
  const isPenNamesPage = location.pathname === "/admin/pen-names";
  const isGenresTropesPage = location.pathname === "/admin/genres-tropes";
  const isReviewsPage = location.pathname === "/admin/reviews";

  // Menu items config for light vs dark layouts
  const lightMenuItems = [
    { id: "dashboard", label: "Dashboard", path: "/admin", icon: <FiLayout size={18} /> },
    { id: "books", label: "Books", path: "/admin/books", icon: <FiBook size={18} /> },
    { id: "blog", label: "Blog", path: "/admin/blogs", icon: <FiEdit3 size={18} /> },
    { id: "subscribers", label: "Subscribers", path: "/admin/subscribers", icon: <FiUsers size={18} /> },
    { id: "settings", label: "Settings", path: "/admin/site-settings", icon: <FiSettings size={18} /> },
  ];

  // Specific menu items for Reviews page mockup
  const reviewsMenuItems = [
    { id: "books", label: "Books", path: "/admin/books", icon: <FiBook size={18} /> },
    { id: "blog", label: "Blog Posts", path: "/admin/blogs", icon: <FiFileText size={18} /> },
    { id: "pen-names", label: "Pen Names", path: "/admin/pen-names", icon: <FiEdit3 size={18} /> },
    { id: "genres-tropes", label: "Genres & Tropes", path: "/admin/genres-tropes", icon: <FiSliders size={18} /> },
    { id: "reviews", label: "Reviews", path: "/admin/reviews", icon: <FiMessageSquare size={18} /> },
    { id: "settings", label: "Site Settings", path: "/admin/site-settings", icon: <FiSettings size={18} /> },
  ];

  // Dark sidebar lists all items in mockup order for other pages
  const darkMenuItems = [
    { id: "pen-names", label: "Pen Names", path: "/admin/pen-names", icon: <FiEdit3 size={18} /> },
    { id: "dashboard", label: "Dashboard", path: "/admin", icon: <FiLayout size={18} /> },
    { id: "books", label: "Books", path: "/admin/books", icon: <FiBook size={18} /> },
    { id: "blogs", label: "Blog Posts", path: "/admin/blogs", icon: <FiFileText size={18} /> },
    { id: "genres-tropes", label: "Genres & Tropes", path: "/admin/genres-tropes", icon: <FiSliders size={18} /> },
    { id: "reviews", label: "Reviews", path: "/admin/reviews", icon: <FiMessageSquare size={18} /> },
    { id: "subscribers", label: "Subscribers", path: "/admin/subscribers", icon: <FiUsers size={18} /> },
  ];

  const darkSecondaryItems = [
    { id: "homepage", label: "Homepage Settings", path: "/admin/homepage-settings", icon: <FiHome size={18} /> },
    { id: "settings", label: "Site Settings", path: "/admin/site-settings", icon: <FiSettings size={18} /> },
  ];

  const menuItems = isLightTheme 
    ? lightMenuItems 
    : isReviewsPage 
      ? reviewsMenuItems 
      : darkMenuItems;

  // Dynamic branding text based on mockup screenshots
  const brandName = isGenresTropesPage 
    ? "Mountain Library" 
    : isReviewsPage 
      ? "Elias Thorne" 
      : "Library Admin";

  const brandSubtitle = isLightTheme 
    ? "PREMIUM BRAND" 
    : isGenresTropesPage || isReviewsPage
      ? "AUTHOR DASHBOARD" 
      : "Mountain Retreat";

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col md:flex-row transition-colors duration-300 font-sans">
      
      {/* Mobile Header */}
      <header className="md:hidden bg-[#0A180E] text-cream border-b border-gold/20 px-4 py-4 flex items-center justify-between z-30">
        <Link to="/admin" className="font-serif font-bold text-lg tracking-wide text-cream flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gold text-[#0A180E] flex items-center justify-center font-bold text-xs">L</div>
          <span>Library Admin</span>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-cream hover:text-gold transition-colors focus:outline-none"
          aria-label="Toggle sidebar menu"
        >
          {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </header>

      {/* Sidebar Panel - Custom Light/Dark theme depending on mockup */}
      <aside 
        className={`fixed md:sticky top-0 left-0 bottom-0 z-40 w-64 border-r p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out md:translate-x-0 shrink-0 ${
          isLightTheme 
            ? "bg-[#F9F9F8] text-charcoal border-[#E5E3DC]/60" 
            : "bg-[#0E1D14] text-[#E5E3DC] border-[#1B3322]"
        } ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="space-y-6">
          
          {/* Logo / Branding */}
          <div className={`flex items-center gap-3 select-none py-2 border-b ${isLightTheme ? "border-[#E5E3DC]/40" : "border-white/10"}`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isLightTheme ? "bg-[#0A180E] text-white" : "bg-[#FDFBF7] text-[#0A180E]"}`}>
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className={`font-serif font-bold text-sm leading-none ${isLightTheme ? "text-charcoal" : "text-white"}`}>
                {brandName}
              </span>
              <span className="text-[8px] uppercase font-bold tracking-widest mt-1.5 leading-none text-[#C5A880]">
                {brandSubtitle}
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1 text-left">
            {menuItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.path === "/admin"}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => {
                  const baseClasses = "flex items-center gap-3 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200";
                  if (isLightTheme) {
                    return `${baseClasses} rounded-l-lg border-r-4 ${
                      isActive
                        ? "bg-[#EAE8E3] text-charcoal border-[#0A180E] font-bold shadow-sm"
                        : "text-charcoal/60 hover:bg-[#EAE8E3]/35 hover:text-charcoal border-transparent"
                    }`;
                  } else {
                    // Dark theme sidebar
                    if (isGenresTropesPage || isReviewsPage) {
                      // Left border indicator for specific mockups
                      return `${baseClasses} rounded-r-lg border-l-4 ${
                        isActive
                          ? "bg-[#162A1D] text-white border-[#C5A880] font-bold"
                          : "text-[#E5E3DC]/70 hover:bg-white/5 hover:text-white border-transparent"
                      }`;
                    } else {
                      // Standard right border indicator for dark theme
                      return `${baseClasses} rounded-l-lg border-r-4 ${
                        isActive
                          ? "bg-[#1B3322] text-white border-[#FDFBF7] font-bold"
                          : "text-[#E5E3DC]/70 hover:bg-white/5 hover:text-white border-transparent"
                      }`;
                    }
                  }
                }}
              >
                <span className="shrink-0">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}

            {/* Separator and Secondary Links for Dark Theme (Hidden on Reviews) */}
            {!isLightTheme && !isReviewsPage && (
              <>
                <div className="h-px bg-white/10 my-4" />
                
                {darkSecondaryItems.map((item) => (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) => {
                      const baseClasses = "flex items-center gap-3 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200";
                      if (isGenresTropesPage) {
                        return `${baseClasses} rounded-r-lg border-l-4 ${
                          isActive
                            ? "bg-[#162A1D] text-white border-[#C5A880] font-bold"
                            : "text-[#E5E3DC]/70 hover:bg-white/5 hover:text-white border-transparent"
                        }`;
                      } else {
                        return `${baseClasses} rounded-l-lg border-r-4 ${
                          isActive
                            ? "bg-[#1B3322] text-white border-[#FDFBF7] font-bold"
                            : "text-[#E5E3DC]/70 hover:bg-white/5 hover:text-white border-transparent"
                        }`;
                      }
                    }}
                  >
                    <span className="shrink-0">{item.icon}</span>
                    <span>{item.label}</span>
                  </NavLink>
                ))}

                {/* Logout link */}
                <button
                  onClick={() => {
                    setSidebarOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 rounded-l-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 border-r-4 border-transparent text-red-400 hover:bg-white/5 hover:text-red-300 text-left cursor-pointer"
                >
                  <FiLogOut size={18} className="shrink-0" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </nav>
        </div>

        {/* Bottom Panel - Hidden on Genres page, custom for Reviews page */}
        {!isGenresTropesPage && (
          <div className={`border-t select-none space-y-4 pt-4 ${isLightTheme ? "border-[#E5E3DC]/40" : "border-white/10"}`}>
            {isLightTheme && (
              <button
                onClick={() => {
                  setSidebarOpen(false);
                  navigate("/admin/blogs/new");
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#0A180E] hover:bg-[#C5A880] hover:text-[#0A180E] text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow transition-all duration-150 cursor-pointer"
              >
                <span>+</span>
                <span>New Entry</span>
              </button>
            )}

            {/* User Profile avatar box */}
            <div className="flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-[#C5A880]/30 bg-[#C5A880]/15 flex items-center justify-center shrink-0">
                {isLightTheme ? (
                  <svg className="w-full h-full text-charcoal-dark" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 21a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM8 34c0-6 6-8 12-8s12 2 12 8" />
                  </svg>
                ) : isReviewsPage ? (
                  /* ET monogram for Reviews page bottom profile */
                  <div className="w-full h-full bg-[#FAF6EE] text-[#0A180E] flex items-center justify-center font-serif font-bold text-xs select-none">
                    ET
                  </div>
                ) : (
                  /* Eleanor Vance vector portrait SVG */
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                      <clipPath id="eleanorClip">
                        <circle cx="50" cy="50" r="46" />
                      </clipPath>
                      <linearGradient id="eleanorBg" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#DFCDA9" />
                        <stop offset="100%" stopColor="#C5A880" />
                      </linearGradient>
                    </defs>
                    <g clipPath="url(#eleanorClip)">
                      <rect width="100" height="100" fill="url(#eleanorBg)" />
                      <circle cx="50" cy="36" r="20" fill="#3D251E" />
                      <circle cx="50" cy="46" r="14" fill="#FDD6C4" />
                      <path d="M36 38 Q50 32 64 38 C60 42 55 40 50 44 C45 40 40 42 36 38 Z" fill="#4E3129" />
                      <path d="M34 44 L36 52 L40 44 Z" fill="#4E3129" />
                      <path d="M66 44 L64 52 L60 44 Z" fill="#4E3129" />
                      <circle cx="45" cy="45" r="1.5" fill="#3D251E" />
                      <circle cx="55" cy="45" r="1.5" fill="#3D251E" />
                      <path d="M49 48 Q50 49 51 48" stroke="#4E3129" strokeWidth="0.8" fill="none" />
                      <path d="M46 52 Q50 55 54 52" stroke="#8C251C" strokeWidth="0.8" fill="none" />
                      <path d="M25 100 L38 72 L50 78 L62 72 L75 100 Z" fill="#2C302E" />
                      <path d="M40 72 L50 78 L60 72 Z" fill="#FDFBF7" />
                    </g>
                  </svg>
                )}
              </div>
              <div className="text-left">
                <span className={`block text-xs font-bold leading-tight ${isLightTheme ? "text-charcoal font-semibold" : "text-white"}`}>
                  {isLightTheme ? "Elias Thorne" : "Elias Thorne"}
                </span>
                <span className={`block text-[9px] uppercase font-bold tracking-wider ${isLightTheme ? "text-charcoal/40" : "text-[#C5A880]"}`}>
                  {isLightTheme ? "Administrator" : isReviewsPage ? "Admin Access" : "Lead Author"}
                </span>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Overlay for mobile drawer */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-[#0F1D13]/40 z-30 md:hidden transition-opacity"
        />
      )}

      {/* Right Column Workspace */}
      <div className="flex-grow flex flex-col min-h-screen relative overflow-hidden">
        
        {/* Top Header Bar (Desktop Only) - Dynamic styling */}
        {!isCustomHeaderPage && (
          <div className="hidden md:flex bg-white border-b border-[#E5E3DC] h-20 px-8 items-center justify-between z-20">
            
            {/* Search bar */}
            <div className="relative w-80">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/40">
                <FiSearch size={14} />
              </span>
              <input
                type="text"
                placeholder={
                  isPenNamesPage 
                    ? "Search pen names..." 
                    : isGenresTropesPage 
                      ? "Search the library..." 
                      : isReviewsPage
                        ? "Search reviews, books, or reviewers..."
                        : "Search books, subscribers, or posts..."
                }
                className="w-full pl-9 pr-4 py-2 text-xs bg-[#F5F4F0] border border-[#E5E3DC] rounded-full focus:outline-none focus:border-gold text-charcoal"
              />
            </div>

            {/* Action Row */}
            <div className="flex items-center gap-6">
              
              {/* Add Book Button / Add New Book Button - Hidden on Genres and Reviews pages */}
              {!isGenresTropesPage && !isReviewsPage && (
                <Link
                  to="/admin/books/new"
                  className="px-5 py-2.5 bg-[#0A180E] hover:bg-[#C5A880] text-white hover:text-[#0A180E] font-sans font-bold text-xs uppercase tracking-wider rounded-full shadow transition-all duration-150 flex items-center gap-1.5"
                >
                  <span>{isPenNamesPage ? "+ Add New Book" : "+ Add Book"}</span>
                </Link>
              )}

              {/* Notification Bell */}
              <button className="text-charcoal/65 hover:text-[#C5A880] transition-colors relative cursor-pointer" title="Notifications">
                <FiBell size={16} />
                <span className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${
                  isPenNamesPage 
                    ? "bg-[#FCDAA2] border border-white" 
                    : isGenresTropesPage 
                      ? "hidden" 
                      : "bg-red-500"
                }`} />
              </button>

              {/* Settings gear icon - Specific for GenresTropes page */}
              {isGenresTropesPage && (
                <button className="text-charcoal/65 hover:text-[#C5A880] transition-colors cursor-pointer" title="Settings">
                  <FiSettings size={16} />
                </button>
              )}

              {/* User Profile dropdown */}
              {(!isPenNamesPage || isGenresTropesPage) && (
                <div className="flex items-center gap-3 border-l border-[#E5E3DC] pl-6 select-none">
                  {isGenresTropesPage ? null : (
                    <div className="text-right">
                      <span className="block text-xs font-bold text-charcoal leading-tight">Elias Thorne</span>
                      <span className="block text-[9px] uppercase font-bold text-charcoal/40 tracking-wider">Administrator</span>
                    </div>
                  )}
                  <div className="w-9 h-9 rounded-full bg-[#C5A880]/25 border border-[#C5A880]/40 flex items-center justify-center font-serif font-bold text-xs text-charcoal-dark overflow-hidden">
                    <svg className="w-full h-full text-charcoal" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20 21a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM8 34c0-6 6-8 12-8s12 2 12 8" />
                    </svg>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

        {/* Scrollable Work Area */}
        <div className="flex-grow overflow-y-auto bg-[#FDFBF7]">
          <main className={isCustomHeaderPage ? "p-0" : "p-6 md:p-8 w-full max-w-7xl mx-auto text-left"}>
            <Outlet />
          </main>
        </div>

      </div>

    </div>
  );
}

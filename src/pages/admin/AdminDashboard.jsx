import { Link } from "react-router-dom";
import { FiEdit3, FiFileText, FiLink2, FiImage, FiChevronRight, FiPlusCircle, FiTag, FiDatabase, FiExternalLink } from "react-icons/fi";

// Mini illustrated book cover placeholders
function WhispersPinesMiniCover() {
  return (
    <div className="w-10 h-14 rounded shadow border border-[#E5E3DC]/60 bg-[#0F1D13] flex items-center justify-center p-0.5 select-none overflow-hidden relative shrink-0">
      <svg className="w-full h-full text-gold" viewBox="0 0 30 40" fill="none" stroke="currentColor" strokeWidth="0.8">
        <circle cx="15" cy="12" r="3" fill="#C5A880" />
        <path d="M 5 35 L 15 20 L 25 35 Z M 10 35 L 15 25 L 20 35 Z" fill="#1A3020" />
        <line x1="8" y1="36" x2="22" y2="36" stroke="#C5A880" strokeWidth="0.5" />
      </svg>
    </div>
  );
}

function SilentPeakMiniCover() {
  return (
    <div className="w-10 h-14 rounded shadow border border-[#E5E3DC]/60 bg-[#1A3A4A] flex items-center justify-center p-0.5 select-none overflow-hidden relative shrink-0">
      <svg className="w-full h-full text-[#DFCDA9]" viewBox="0 0 30 40" fill="none" stroke="currentColor" strokeWidth="0.8">
        <path d="M 5 35 L 15 15 L 25 35 Z" fill="#253A4B" />
        <line x1="15" y1="15" x2="15" y2="35" stroke="#DFCDA9" strokeWidth="0.5" />
        <line x1="8" y1="36" x2="22" y2="36" stroke="#DFCDA9" strokeWidth="0.5" />
      </svg>
    </div>
  );
}

function EchoesRavineMiniCover() {
  return (
    <div className="w-10 h-14 rounded shadow border border-[#E5E3DC]/60 bg-[#4A2F13] flex items-center justify-center p-0.5 select-none overflow-hidden relative shrink-0">
      <svg className="w-full h-full text-gold" viewBox="0 0 30 40" fill="none" stroke="currentColor" strokeWidth="0.8">
        <path d="M 12 40 L 14 15 L 16 15 L 18 40 Z" fill="#DFCDA9" />
        <circle cx="15" cy="10" r="3" fill="#DFCDA9" />
        <line x1="8" y1="36" x2="22" y2="36" stroke="#DFCDA9" strokeWidth="0.5" />
      </svg>
    </div>
  );
}

export default function AdminDashboard() {
  
  const metrics = [
    { label: "Total Books", count: "24", trend: "+2 this year", trendClass: "bg-[#E2F0D9] text-[#2E6B40]" },
    { label: "Published", count: "18", trend: "75% active", trendClass: "bg-[#EBEBEB] text-[#555]" },
    { label: "Coming Soon", count: "6", trend: "Next in Nov", trendClass: "bg-[#F5E6D3] text-[#8C5E28]" },
    { label: "Blog Posts", count: "142", trend: "Weekly trend: High", trendClass: "bg-[#E2F0D9] text-[#2E6B40]" },
    { label: "Subscribers", count: "12.4k", trend: "+85 today", trendClass: "bg-[#E2F0D9] text-[#2E6B40]" },
    { label: "Pen Names", count: "3", trend: "Verified", trendClass: "bg-[#EBEBEB] text-[#555]" },
  ];

  const recentBooks = [
    {
      cover: <WhispersPinesMiniCover />,
      title: "Whispers in the Pines",
      penName: "Elias Thorne",
      status: "Published",
      statusClass: "bg-[#E2F0D9] text-[#2E6B40]",
      updated: "Oct 24, 2023"
    },
    {
      cover: <SilentPeakMiniCover />,
      title: "The Silent Peak",
      penName: "E.T. Vance",
      status: "Coming Soon",
      statusClass: "bg-[#FFF3D4] text-[#A87900]",
      updated: "Oct 20, 2023"
    },
    {
      cover: <EchoesRavineMiniCover />,
      title: "Echoes of the Ravine",
      penName: "Elias Thorne",
      status: "Draft",
      statusClass: "bg-[#F0EFF0] text-charcoal/60",
      updated: "Oct 15, 2023"
    }
  ];

  const recentSubscribers = [
    { initials: "JD", name: "Julianne Darcy", email: "j.darcy@email.com", time: "2m ago", bg: "bg-[#E2F0D9] text-[#2E6B40]" },
    { initials: "MS", name: "Marcus Sterling", email: "m.sterling@web.com", time: "1h ago", bg: "bg-[#F0EFF0] text-charcoal/50" },
    { initials: "LW", name: "Lyra Woods", email: "lyra.woods@mail.org", time: "3h ago", bg: "bg-[#FFF3D4] text-[#A87900]" }
  ];

  const quickActions = [
    { label: "Add New Post", desc: "Create a blog update", icon: <FiPlusCircle size={18} />, path: "/admin/blogs/new" },
    { label: "Manage Categories", desc: "Organize book metadata", icon: <FiTag size={18} />, path: "/admin/genres-tropes" },
    { label: "Site Backup", desc: "Backup database records", icon: <FiDatabase size={18} />, path: "/admin/settings" },
    { label: "View Live Site", desc: "Open customer front-end", icon: <FiExternalLink size={18} />, path: "/" }
  ];

  return (
    <div className="space-y-10 font-sans text-left pb-10">
      
      {/* 1. WELCOME HEADER */}
      <div>
        <h1 className="text-4xl sm:text-[40px] font-serif font-bold text-charcoal leading-tight tracking-tight">
          Welcome Back, Elias
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-light font-sans font-light mt-1.5">
          Here is an overview of your literary archive for today.
        </p>
      </div>

      {/* 2. METRICS ROW */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {metrics.map((m, i) => (
          <div 
            key={i} 
            className="bg-white border border-[#E5E3DC]/60 p-5 rounded-[20px] shadow-sm flex flex-col justify-between items-start space-y-4 hover:shadow-md transition-luxury"
          >
            <div>
              <span className="text-[10px] uppercase font-bold text-charcoal/40 tracking-wider block font-sans">
                {m.label}
              </span>
              <h3 className="text-3xl font-bold text-charcoal mt-1.5 leading-none">
                {m.count}
              </h3>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold block select-none ${m.trendClass}`}>
              {m.trend}
            </span>
          </div>
        ))}
      </div>

      {/* 3. CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Recent Books Table */}
        <div className="lg:col-span-8 bg-white border border-[#E5E3DC]/50 rounded-[24px] shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-xl text-charcoal">
              Recent Books
            </h3>
            <Link 
              to="/admin/books" 
              className="text-xs font-semibold text-[#C5A880] hover:text-[#A58860] flex items-center gap-1 transition-colors"
            >
              <span>View All Books</span>
              <FiChevronRight size={14} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E5E3DC]/40 text-[10px] font-bold uppercase tracking-widest text-charcoal/40">
                  <th className="pb-4 font-semibold">Cover</th>
                  <th className="pb-4 font-semibold">Title</th>
                  <th className="pb-4 font-semibold">Pen Name</th>
                  <th className="pb-4 font-semibold">Status</th>
                  <th className="pb-4 font-semibold">Updated</th>
                  <th className="pb-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E3DC]/30 text-xs sm:text-sm text-charcoal-light">
                {recentBooks.map((b, i) => (
                  <tr key={i} className="group hover:bg-[#F5F4F0]/30 transition-colors">
                    <td className="py-4 pr-4">{b.cover}</td>
                    <td className="py-4 pr-4 font-serif font-bold text-charcoal group-hover:text-gold transition-colors">{b.title}</td>
                    <td className="py-4 pr-4 font-sans font-light">{b.penName}</td>
                    <td className="py-4 pr-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold block w-fit select-none ${b.statusClass}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-4 pr-4 font-sans font-light">{b.updated}</td>
                    <td className="py-4 text-right">
                      <Link 
                        to={`/admin/books`} 
                        className="inline-block p-2 text-charcoal/40 hover:text-gold transition-colors"
                        title="Edit Book"
                      >
                        <FiEdit3 size={14} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Subscribers & Health Check */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Recent Subscribers Card */}
          <div className="bg-white border border-[#E5E3DC]/50 rounded-[24px] shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="p-6 space-y-6">
              <h3 className="font-serif font-bold text-xl text-charcoal text-left">
                Recent Subscribers
              </h3>
              
              <div className="space-y-4">
                {recentSubscribers.map((sub, i) => (
                  <div key={i} className="flex items-center justify-between text-left">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full ${sub.bg} flex items-center justify-center font-bold text-xs shadow-sm`}>
                        {sub.initials}
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-charcoal leading-tight">{sub.name}</span>
                        <span className="block text-[10px] text-charcoal/50 font-sans font-light">{sub.email}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-charcoal/40 font-sans font-light shrink-0">{sub.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom link panel */}
            <Link 
              to="/admin/subscribers"
              className="bg-[#F5F4F0] hover:bg-gold/10 text-charcoal/70 hover:text-gold border-t border-[#E5E3DC]/40 py-4 text-center text-[10px] font-bold uppercase tracking-wider transition-colors block cursor-pointer select-none"
            >
              Manage All 12.4k Subscribers
            </Link>
          </div>

          {/* Health Check Card */}
          <div className="bg-[#F5F4F0] border border-[#E5E3DC]/50 rounded-[24px] shadow-sm p-6 space-y-6">
            <h3 className="font-serif font-bold text-xl text-charcoal text-left">
              Health Check
            </h3>

            <div className="space-y-3.5">
              
              {/* Draft Posts */}
              <div className="flex items-center justify-between text-left">
                <div className="flex items-center gap-3 text-charcoal/75">
                  <FiFileText size={16} className="text-charcoal/40" />
                  <span className="text-xs sm:text-sm font-sans font-light">Draft Posts</span>
                </div>
                <span className="px-2 py-0.5 bg-white border border-[#E5E3DC]/60 rounded-md text-[10px] font-bold text-charcoal/70">
                  12
                </span>
              </div>

              {/* Missing Buy Links */}
              <div className="flex items-center justify-between text-left">
                <div className="flex items-center gap-3 text-charcoal/75">
                  <FiLink2 size={16} className="text-charcoal/40" />
                  <span className="text-xs sm:text-sm font-sans font-light">Missing Buy Links</span>
                </div>
                <span className="px-2 py-0.5 bg-red-50 border border-red-100 rounded-md text-[10px] font-bold text-red-600">
                  3
                </span>
              </div>

              {/* Books Without Covers */}
              <div className="flex items-center justify-between text-left">
                <div className="flex items-center gap-3 text-charcoal/75">
                  <FiImage size={16} className="text-charcoal/40" />
                  <span className="text-xs sm:text-sm font-sans font-light">Books Without Covers</span>
                </div>
                <span className="px-2 py-0.5 bg-yellow-50 border border-yellow-100 rounded-md text-[10px] font-bold text-yellow-600">
                  1
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* 4. QUICK ACTIONS SECTION */}
      <div className="space-y-5">
        <h3 className="font-serif font-bold text-2xl text-charcoal">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, i) => (
            <Link
              key={i}
              to={action.path}
              className="bg-white border border-[#E5E3DC]/60 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-gold/30 transition-luxury flex items-center gap-4 text-left group"
            >
              <div className="w-10 h-10 rounded-full bg-[#F5F4F0] group-hover:bg-gold/15 text-charcoal/60 group-hover:text-gold flex items-center justify-center transition-colors">
                {action.icon}
              </div>
              <div>
                <span className="block text-sm font-bold text-charcoal group-hover:text-gold transition-colors">{action.label}</span>
                <span className="block text-[11px] text-charcoal/50 font-sans font-light leading-tight mt-0.5">{action.desc}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}

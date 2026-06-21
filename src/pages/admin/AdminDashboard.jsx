import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FiEdit3, FiFileText, FiLink2, FiImage, FiChevronRight, FiPlusCircle, 
  FiTag, FiDatabase, FiExternalLink, FiUsers, FiStar, FiBook, FiHome 
} from "react-icons/fi";
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebase";
import ImageUpload from "../../components/common/ImageUpload";
import LoadingSpinner from "../../components/common/LoadingSpinner";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({
    totalBooks: 0,
    publishedBooks: 0,
    comingSoonBooks: 0,
    blogsCount: 0,
    subscribersCount: 0,
    penNamesCount: 0
  });
  
  const [dbBooks, setDbBooks] = useState([]);
  const [dbSubs, setDbSubs] = useState([]);
  const [draftPostsCount, setDraftPostsCount] = useState(0);
  const [missingLinksCount, setMissingLinksCount] = useState(0);
  const [noCoversCount, setNoCoversCount] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // 1. Fetch books
        const booksSnap = await getDocs(collection(db, "books"));
        const booksList = booksSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // 2. Fetch blogs
        const blogsSnap = await getDocs(collection(db, "blogs"));
        const blogsList = blogsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // 3. Fetch subscribers
        const subsSnap = await getDocs(collection(db, "subscribers"));
        const subsList = subsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // 4. Fetch pen names
        const penSnap = await getDocs(collection(db, "pennames"));
        const penList = penSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Compute counts
        const total = booksList.length;
        const published = booksList.filter(b => b.status === "published").length;
        const coming = booksList.filter(b => b.status === "comingSoon").length;
        const drafts = blogsList.filter(p => p.status === "draft").length;

        // Health Checks
        const missingLinks = booksList.filter(b => {
          if (b.status !== "published") return false;
          const links = b.platformLinks || {};
          return !Object.values(links).some(link => link && link.trim() !== "");
        }).length;

        const noCovers = booksList.filter(b => !b.coverImage || b.coverImage.trim() === "").length;

        setCounts({
          totalBooks: total,
          publishedBooks: published,
          comingSoonBooks: coming,
          blogsCount: blogsList.length,
          subscribersCount: subsList.length,
          penNamesCount: penList.length
        });

        // Set recent books: sort by updatedAt desc or default
        const sortedBooks = [...booksList].sort((a, b) => {
          const tA = a.updatedAt?.seconds || a.createdAt?.seconds || 0;
          const tB = b.updatedAt?.seconds || b.createdAt?.seconds || 0;
          return tB - tA;
        }).slice(0, 3);
        setDbBooks(sortedBooks);

        // Set recent subs: take top 3
        const sortedSubs = [...subsList].sort((a, b) => {
          const tA = a.createdAt?.seconds || 0;
          const tB = b.createdAt?.seconds || 0;
          return tB - tA;
        }).slice(0, 3);
        setDbSubs(sortedSubs);
        
        setDraftPostsCount(drafts);
        setMissingLinksCount(missingLinks);
        setNoCoversCount(noCovers);

      } catch (err) {
        console.error("Error loading dashboard metrics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const metrics = [
    { label: "Total Books", count: counts.totalBooks, trend: "In Archive", trendClass: "bg-[#EBEBEB] text-[#555]" },
    { label: "Published", count: counts.publishedBooks, trend: "Active on Store", trendClass: "bg-[#E2F0D9] text-[#2E6B40]" },
    { label: "Coming Soon", count: counts.comingSoonBooks, trend: "Pre-order phase", trendClass: "bg-[#F5E6D3] text-[#8C5E28]" },
    { label: "Blog Posts", count: counts.blogsCount, trend: "Content Feed", trendClass: "bg-[#EBEBEB] text-[#555]" },
    { label: "Subscribers", count: counts.subscribersCount, trend: "Newsletter list", trendClass: "bg-[#E2F0D9] text-[#2E6B40]" },
    { label: "Pen Names", count: counts.penNamesCount, trend: "Profiles", trendClass: "bg-[#EBEBEB] text-[#555]" },
  ];

  const quickActions = [
    { label: "Add New Book", desc: "Catalogue a novel", icon: <FiPlusCircle size={18} />, path: "/admin/books/new" },
    { label: "Write Blog Post", desc: "Create a blog update", icon: <FiFileText size={18} />, path: "/admin/blogs/new" },
    { label: "Genres & Tropes", desc: "Organize library metadata", icon: <FiTag size={18} />, path: "/admin/genres-tropes" },
    { label: "Update Homepage", desc: "Adjust landing sections", icon: <FiHome size={18} />, path: "/admin/homepage-settings" }
  ];

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <LoadingSpinner className="w-10 h-10 text-forest" />
        <p className="text-xs text-charcoal/50 uppercase tracking-widest font-bold">Synchronizing database indices...</p>
      </div>
    );
  }

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
            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold block select-none ${m.trendClass}`}>
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

          {dbBooks.length === 0 ? (
            <div className="py-12 border border-dashed border-[#E5E3DC]/60 rounded-xl text-center space-y-3">
              <FiBook className="mx-auto text-charcoal/20" size={32} />
              <p className="text-xs text-charcoal/50">No books catalogued in Firestore. Let's add your first book!</p>
              <Link 
                to="/admin/books/new"
                className="inline-block px-4 py-2 bg-[#1A3020] text-cream rounded-full text-[10px] uppercase tracking-wider font-bold shadow hover:bg-gold transition-colors"
              >
                + Add Book
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E3DC]/40 text-[10px] font-bold uppercase tracking-widest text-charcoal/40">
                    <th className="pb-4 font-semibold">Cover</th>
                    <th className="pb-4 font-semibold">Title</th>
                    <th className="pb-4 font-semibold">Pen Name</th>
                    <th className="pb-4 font-semibold">Status</th>
                    <th className="pb-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E3DC]/30 text-xs sm:text-sm text-charcoal-light">
                  {dbBooks.map((b) => (
                    <tr key={b.id} className="group hover:bg-[#F5F4F0]/30 transition-colors">
                      <td className="py-4 pr-4">
                        <div className="w-10 h-14 rounded bg-cream-dark border border-[#E5E3DC]/60 overflow-hidden flex items-center justify-center shadow shrink-0">
                          {b.coverImage ? (
                            <img src={b.coverImage} alt={b.title} className="w-full h-full object-cover" />
                          ) : (
                            <FiImage className="text-charcoal/20" size={16} />
                          )}
                        </div>
                      </td>
                      <td className="py-4 pr-4 font-serif font-bold text-charcoal group-hover:text-gold transition-colors">{b.title}</td>
                      <td className="py-4 pr-4 font-sans font-light">{b.penName || "N/A"}</td>
                      <td className="py-4 pr-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold block w-fit select-none ${
                          b.status === "published" 
                            ? "bg-[#E2F0D9] text-[#2E6B40]" 
                            : b.status === "comingSoon" 
                              ? "bg-[#FFF3D4] text-[#A87900]" 
                              : "bg-[#F0EFF0] text-charcoal/60"
                        }`}>
                          {b.status === "published" ? "Published" : b.status === "comingSoon" ? "Coming Soon" : "Draft"}
                        </span>
                      </td>
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
          )}
        </div>

        {/* Right Column: Subscribers & Health Check */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Recent Subscribers Card */}
          <div className="bg-white border border-[#E5E3DC]/50 rounded-[24px] shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="p-6 space-y-6">
              <h3 className="font-serif font-bold text-xl text-charcoal text-left">
                Recent Subscribers
              </h3>
              
              {dbSubs.length === 0 ? (
                <div className="py-6 text-center space-y-2">
                  <FiUsers className="mx-auto text-charcoal/20" size={24} />
                  <p className="text-xs text-charcoal/40 font-light">No subscribers registered yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {dbSubs.map((sub, i) => (
                    <div key={i} className="flex items-center justify-between text-left">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#E5E7EB] text-[#374151] flex items-center justify-center font-bold text-xs shadow-sm select-none">
                          {sub.email ? sub.email.substring(0, 2).toUpperCase() : "SR"}
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-charcoal leading-tight truncate max-w-[120px]">
                            {sub.email ? sub.email.split("@")[0] : "Reader"}
                          </span>
                          <span className="block text-[10px] text-charcoal/50 font-sans font-light truncate max-w-[150px]">
                            {sub.email}
                          </span>
                        </div>
                      </div>
                      <span className="text-[9px] text-[#2E6B40] bg-[#E2F0D9] px-2 py-0.5 rounded-full font-bold">New</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom link panel */}
            <Link 
              to="/admin/subscribers"
              className="bg-[#F5F4F0] hover:bg-gold/10 text-charcoal/70 hover:text-gold border-t border-[#E5E3DC]/40 py-4 text-center text-[10px] font-bold uppercase tracking-wider transition-colors block cursor-pointer select-none"
            >
              Manage All {counts.subscribersCount} Subscribers
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
                  {draftPostsCount}
                </span>
              </div>

              {/* Missing Buy Links */}
              <div className="flex items-center justify-between text-left">
                <div className="flex items-center gap-3 text-charcoal/75">
                  <FiLink2 size={16} className="text-charcoal/40" />
                  <span className="text-xs sm:text-sm font-sans font-light">Missing Buy Links</span>
                </div>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  missingLinksCount > 0 ? "bg-red-50 border border-red-100 text-red-600" : "bg-white border border-[#E5E3DC]/60 text-charcoal/70"
                }`}>
                  {missingLinksCount}
                </span>
              </div>

              {/* Books Without Covers */}
              <div className="flex items-center justify-between text-left">
                <div className="flex items-center gap-3 text-charcoal/75">
                  <FiImage size={16} className="text-charcoal/40" />
                  <span className="text-xs sm:text-sm font-sans font-light">Books Without Covers</span>
                </div>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  noCoversCount > 0 ? "bg-yellow-50 border border-yellow-100 text-yellow-600" : "bg-white border border-[#E5E3DC]/60 text-charcoal/70"
                }`}>
                  {noCoversCount}
                </span>
              </div>

            </div>
          </div>

          {/* Firebase Connectivity Test Panel */}
          <FirebaseTestPanel />

          {/* Cloudinary Asset Test Panel */}
          <CloudinaryTestPanel />

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

function FirebaseTestPanel() {
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [logs, setLogs] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const addLog = (msg) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const runTest = async () => {
    setStatus("loading");
    setLogs([]);
    setErrorMsg("");
    addLog("Starting Firebase Firestore connectivity roundtrip test...");

    try {
      addLog("Attempting to write document to 'connection_tests' collection...");
      const docRef = await addDoc(collection(db, "connection_tests"), {
        testedAt: serverTimestamp(),
        runner: "Elias Thorne Admin Dashboard",
        status: "operational"
      });
      addLog(`Doc successfully written. Generated Doc ID: ${docRef.id}`);

      addLog("Attempting to read collection 'connection_tests'...");
      const snapshot = await getDocs(collection(db, "connection_tests"));
      addLog(`Read operation successful. Found ${snapshot.size} test record(s) in collection.`);

      addLog(`Attempting to clean up/delete test document: ${docRef.id}...`);
      await deleteDoc(doc(db, "connection_tests", docRef.id));
      addLog("Cleanup delete operation successful.");

      addLog("Firebase connection test completed successfully! Firestore is fully operational.");
      setStatus("success");
    } catch (err) {
      console.error(err);
      addLog(`Test failed: ${err.message}`);
      setErrorMsg(err.message || "An unexpected error occurred during database access.");
      setStatus("error");
    }
  };

  return (
    <div className="bg-white border border-[#E5E3DC]/50 rounded-[24px] shadow-sm p-6 space-y-4">
      <h3 className="font-serif font-bold text-xl text-charcoal text-left flex items-center gap-2">
        <FiDatabase className="text-[#C5A880] shrink-0" size={20} />
        <span>Database Test</span>
      </h3>
      <p className="text-xs text-charcoal/60 leading-relaxed text-left font-sans">
        Verify that Vite environment variables bind properly and Firestore reads, writes, and deletes are working correctly.
      </p>

      {status === "loading" && (
        <div className="bg-[#F5F4F0] p-3.5 rounded-xl border border-[#E5E3DC]/30 text-left font-mono text-[10px] text-charcoal-light space-y-1 max-h-32 overflow-y-auto">
          {logs.map((log, idx) => (
            <div key={idx}>{log}</div>
          ))}
        </div>
      )}

      {status === "success" && (
        <div className="space-y-3">
          <div className="bg-[#E2F0D9] border border-[#2E6B40]/15 p-3 rounded-xl text-left text-xs text-[#2E6B40] font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2E6B40]" />
            <span>Connection Test Successful</span>
          </div>
          <div className="bg-[#F5F4F0] p-3.5 rounded-xl border border-[#E5E3DC]/30 text-left font-mono text-[10px] text-charcoal-light space-y-1 max-h-32 overflow-y-auto">
            {logs.map((log, idx) => (
              <div key={idx}>{log}</div>
            ))}
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="space-y-3">
          <div className="bg-red-50 border border-red-100 p-3 rounded-xl text-left text-xs text-red-600 font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600 shrink-0" />
            <span>Connection Test Failed</span>
          </div>
          <div className="bg-red-50/50 p-3.5 rounded-xl border border-red-100/45 text-left font-mono text-[10px] text-red-600 space-y-1 max-h-32 overflow-y-auto">
            {logs.map((log, idx) => (
              <div key={idx}>{log}</div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={runTest}
        disabled={status === "loading"}
        className="w-full py-2.5 bg-[#0A180E] hover:bg-[#C5A880] text-white hover:text-[#0A180E] font-sans font-bold text-xs uppercase tracking-wider rounded-xl transition-luxury shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Running Test..." : "Run Connection Test"}
      </button>
    </div>
  );
}

function CloudinaryTestPanel() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div className="bg-white border border-[#E5E3DC]/50 rounded-[24px] shadow-sm p-6 space-y-4">
      <h3 className="font-serif font-bold text-xl text-charcoal text-left flex items-center gap-2">
        <FiImage className="text-[#C5A880] shrink-0" size={20} />
        <span>Cloudinary Asset Test</span>
      </h3>
      <p className="text-xs text-charcoal/60 leading-relaxed text-left font-sans">
        Upload an image directly to Cloudinary. This will verify that your cloud name and unsigned upload preset bind properly.
      </p>
      
      <ImageUpload 
        value={imageUrl} 
        onChange={(result) => setImageUrl(result ? result.url : "")} 
        folder="tests"
      />
    </div>
  );
}

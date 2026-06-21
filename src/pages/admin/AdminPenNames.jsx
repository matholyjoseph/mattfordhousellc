import { useState, useEffect } from "react";
import { FiUserPlus, FiX, FiEdit, FiTrash2, FiGlobe, FiInfo } from "react-icons/fi";
import { getPenNames, createPenName, updatePenName, deletePenName } from "../../services/penNameService";
import ImageUpload from "../../components/common/ImageUpload";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import slugify from "slugify";

function PenNameCard({ penName, onEdit, onDelete }) {
  // Initials fallback
  const initials = penName.name 
    ? penName.name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase() 
    : "PN";

  return (
    <div className="bg-white border border-[#E5E3DC]/60 rounded-[32px] p-8 shadow-sm flex flex-col items-center text-center space-y-6 relative hover:shadow-md transition-all duration-200">
      
      {/* Edit/Delete overlay buttons */}
      <div className="absolute top-6 right-6 flex items-center gap-1">
        <button
          onClick={() => onEdit(penName)}
          className="p-2 border border-[#E5E3DC]/60 text-charcoal/40 hover:text-gold hover:border-gold/30 hover:bg-gold/5 rounded-lg transition-colors cursor-pointer"
          title="Edit Profile"
        >
          <FiEdit size={13} />
        </button>
        <button
          onClick={() => onDelete(penName.id)}
          className="p-2 border border-[#E5E3DC]/60 text-charcoal/40 hover:text-red-500 hover:border-red-200 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
          title="Delete Profile"
        >
          <FiTrash2 size={13} />
        </button>
      </div>

      {/* Avatar portrait circle */}
      <div className="w-24 h-24 rounded-full p-1 border border-[#C5A880] flex items-center justify-center select-none shrink-0">
        <div className="w-full h-full rounded-full overflow-hidden shadow-inner bg-[#112318] flex items-center justify-center">
          {penName.profileImage ? (
            <img src={penName.profileImage} alt={penName.name} className="w-full h-full object-cover" />
          ) : (
            <span className="font-serif font-bold text-xl text-[#FDFBF7]">{initials}</span>
          )}
        </div>
      </div>

      <div className="space-y-2 select-none w-full">
        {/* Status Badge */}
        <span className={`inline-block px-3 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase ${
          penName.status === "active" ? "bg-[#E2F0D9] text-[#2E6B40]" : "bg-gray-100 text-gray-500"
        }`}>
          {penName.status || "active"}
        </span>

        {/* Display Name */}
        <h3 className="font-serif font-bold text-2xl text-charcoal leading-tight truncate">
          {penName.name}
        </h3>

        {/* Primary Genre / Subtitle */}
        <p className="text-xs font-semibold text-[#C5A880] tracking-wide font-sans truncate">
          {penName.genreFocus || "General Fiction"}
        </p>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[#E5E3DC]/60" />

      {/* Bio snippet */}
      <p className="text-xs text-charcoal/60 leading-relaxed font-sans line-clamp-3 w-full h-12">
        {penName.shortBio || "No biographical tease provided yet."}
      </p>

    </div>
  );
}

export default function AdminPenNames() {
  const [penNames, setPenNames] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null); // Null for create, ID string for edit
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [shortBio, setShortBio] = useState("");
  const [fullBio, setFullBio] = useState("");
  const [genreFocus, setGenreFocus] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [socialLinks, setSocialLinks] = useState({ twitter: "", instagram: "", facebook: "" });
  const [displayOrder, setDisplayOrder] = useState("0");
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState("active");
  
  const [isSlugTouched, setIsSlugTouched] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadPenNames = async () => {
    setLoading(true);
    try {
      const data = await getPenNames();
      setPenNames(data);
    } catch (err) {
      console.error("Failed to load pen names:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPenNames();
  }, []);

  // Update slug automatically when typing name (if slug hasn't been edited manually)
  const handleNameChange = (val) => {
    setName(val);
    if (!isSlugTouched && !editId) {
      setSlug(slugify(val, { lower: true, strict: true }));
    }
  };

  const handleEdit = (profile) => {
    setEditId(profile.id);
    setName(profile.name || "");
    setSlug(profile.slug || "");
    setShortBio(profile.shortBio || "");
    setFullBio(profile.fullBio || "");
    setGenreFocus(profile.genreFocus || "");
    setProfileImage(profile.profileImage || "");
    setSocialLinks(profile.socialLinks || { twitter: "", instagram: "", facebook: "" });
    setDisplayOrder(profile.displayOrder || "0");
    setFeatured(profile.featured || false);
    setStatus(profile.status || "active");
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this pen name? All books using this pen name will show a 'N/A' author focus.")) {
      try {
        await deletePenName(id);
        setPenNames(prev => prev.filter(p => p.id !== id));
        alert("Pen name deleted successfully.");
      } catch (err) {
        console.error(err);
        alert("Failed to delete pen name.");
      }
    }
  };

  const handleOpenCreate = () => {
    setEditId(null);
    setName("");
    setSlug("");
    setShortBio("");
    setFullBio("");
    setGenreFocus("");
    setProfileImage("");
    setSocialLinks({ twitter: "", instagram: "", facebook: "" });
    setDisplayOrder("0");
    setFeatured(false);
    setStatus("active");
    setIsSlugTouched(false);
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (!slug.trim()) return;

    setSaving(true);
    const profilePayload = {
      name: name.trim(),
      slug: slug.trim(),
      shortBio: shortBio.trim(),
      fullBio: fullBio.trim(),
      genreFocus: genreFocus.trim(),
      profileImage: profileImage,
      socialLinks: socialLinks,
      displayOrder: parseInt(displayOrder) || 0,
      featured: featured,
      status: status
    };

    try {
      if (editId) {
        // Edit mode
        await updatePenName(editId, profilePayload);
        setPenNames(prev => prev.map(p => p.id === editId ? { id: editId, ...profilePayload } : p));
        alert("Pen name updated successfully.");
      } else {
        // Create mode
        const newId = await createPenName(profilePayload);
        setPenNames(prev => [...prev, { id: newId, ...profilePayload }]);
        alert("Pen name created successfully.");
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save pen name document. Please verify environment keys.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
        <LoadingSpinner className="w-10 h-10 text-forest" />
        <p className="text-xs text-charcoal/50 uppercase tracking-widest font-bold">Synchronizing database indices...</p>
      </div>
    );
  }

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
          onClick={handleOpenCreate}
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
          <PenNameCard 
            key={pen.id} 
            penName={pen} 
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}

        {/* Dashed Create Card */}
        <div 
          onClick={handleOpenCreate}
          className="border-2 border-dashed border-[#E5E3DC] hover:border-gold rounded-[32px] p-8 flex flex-col items-center justify-center min-h-[340px] cursor-pointer transition-all duration-155 text-center bg-transparent group space-y-4 shadow-sm hover:shadow-md"
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

      {/* 3. INTERACTIVE MODAL DIALOG */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#0F1D13]/55 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto animate-fade-in">
          
          <div className="bg-white rounded-[32px] p-8 max-w-lg w-full border border-[#E5E3DC] shadow-2xl relative space-y-6 text-left my-8">
            
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
                {editId ? "Edit Pen Name Profile" : "Create New Pen Name"}
              </h3>
              <p className="text-[11px] text-charcoal/50 font-sans font-light">
                Introduce or adjust a literary persona under your publishing brand.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="w-full bg-[#F5F4F0]/60 border border-[#E5E3DC] rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-gold text-charcoal font-sans font-semibold transition-colors"
                  />
                </div>

                {/* Slug */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-widest block font-sans">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="laura-dutton"
                    value={slug}
                    onChange={(e) => {
                      setIsSlugTouched(true);
                      setSlug(e.target.value);
                    }}
                    className="w-full bg-[#F5F4F0]/60 border border-[#E5E3DC] rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-gold text-charcoal font-mono transition-colors"
                  />
                </div>

                {/* Primary Genre Focus */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-widest block font-sans">
                    Primary Genre Focus
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Paranormal Romance"
                    value={genreFocus}
                    onChange={(e) => setGenreFocus(e.target.value)}
                    className="w-full bg-[#F5F4F0]/60 border border-[#E5E3DC] rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-gold text-charcoal font-sans font-semibold transition-colors"
                  />
                </div>

                {/* Display Order */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-widest block font-sans">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(e.target.value)}
                    className="w-full bg-[#F5F4F0]/60 border border-[#E5E3DC] rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-gold text-charcoal font-sans font-semibold transition-colors"
                  />
                </div>
              </div>

              {/* Short Bio */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-widest block font-sans">
                  Short Teaser Bio
                </label>
                <input
                  type="text"
                  placeholder="A one-sentence bio hook displayed on cards..."
                  value={shortBio}
                  onChange={(e) => setShortBio(e.target.value)}
                  className="w-full bg-[#F5F4F0]/60 border border-[#E5E3DC] rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-gold text-charcoal font-sans transition-colors"
                />
              </div>

              {/* Full Bio */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-widest block font-sans">
                  Full Biography
                </label>
                <textarea
                  rows="3"
                  placeholder="Detail novel list, backgrounds, and inspirations..."
                  value={fullBio}
                  onChange={(e) => setFullBio(e.target.value)}
                  className="w-full bg-[#F5F4F0]/60 border border-[#E5E3DC] rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-gold text-charcoal font-sans transition-colors leading-relaxed"
                ></textarea>
              </div>

              {/* Upload Portrait */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-charcoal/50 tracking-widest block font-sans">Profile Portrait</span>
                <ImageUpload 
                  value={profileImage}
                  onChange={(result) => setProfileImage(result ? result.url : "")}
                  folder="pen-names"
                />
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-2 gap-4 bg-[#FBFBF9] border border-[#E5E3DC]/60 p-3.5 rounded-2xl select-none text-xs font-semibold text-charcoal">
                <label className="flex items-center justify-between cursor-pointer pr-4 border-r border-[#E5E3DC]/40">
                  <span>Featured Profile</span>
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="rounded border-[#E5E3DC] text-forest focus:ring-forest-light h-4 w-4 cursor-pointer"
                  />
                </label>

                <div className="flex items-center justify-between pl-4">
                  <span>Profile Status</span>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="bg-transparent text-xs font-bold text-charcoal outline-none cursor-pointer"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
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
                  disabled={saving}
                  className="px-6 py-2.5 bg-[#0A180E] hover:bg-gold text-white hover:text-[#0A180E] font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                >
                  {saving ? (
                    <>
                      <LoadingSpinner className="w-3 h-3 text-white" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Persona</span>
                  )}
                </button>
              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

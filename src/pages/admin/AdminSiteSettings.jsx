import { useState } from "react";
import { 
  FiSliders, FiShare2, FiShoppingCart, FiLayout, FiLock, FiUploadCloud, FiGlobe 
} from "react-icons/fi";

export default function AdminSiteSettings() {
  const [formData, setFormData] = useState({
    websiteName: "Elias Thorne",
    defaultMetaTitle: "",
    metaDescription: "",
    facebook: "",
    instagram: "",
    tiktok: "",
    youtube: "",
    pinterest: "",
    twitterX: "",
    amazonAuthor: "",
    appleBooks: "",
    kobo: "",
    draft2Digital: "",
    googlePlay: "",
    barnesNoble: "",
    footerDescription: "Crafted for the literary soul. Elias Thorne's worlds explore the intersection of myth and modernity, darkness and...",
    copyrightText: "© 2024 Elias Thorne. All rights reserved.",
    privacyLink: "/privacy-policy",
    termsLink: "/terms",
    adminEmail: "admin@eliasthorne.com"
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Global site configurations saved and published successfully!");
  };

  return (
    <div className="space-y-10 font-sans text-left pb-16">
      
      {/* Settings Form Container */}
      <form 
        id="site-settings-form" 
        onSubmit={handleSave} 
        className="space-y-8 max-w-4xl"
      >
        
        {/* Section 1: General Settings */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E3DC]/40 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-xl text-[#0E1D14] flex items-center gap-2.5 border-b border-[#E5E3DC]/25 pb-3">
            <FiSliders size={20} className="text-[#C5A880]" />
            <span>General Settings</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Website Name</label>
              <input 
                type="text" 
                value={formData.websiteName}
                onChange={(e) => handleInputChange("websiteName", e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#FBFBF9] border border-[#E5E3DC] rounded-xl focus:outline-none focus:border-gold text-charcoal"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Default Meta Title</label>
              <input 
                type="text" 
                value={formData.defaultMetaTitle}
                onChange={(e) => handleInputChange("defaultMetaTitle", e.target.value)}
                placeholder="e.g. Elias Thorne | Contemporary"
                className="w-full px-3.5 py-2.5 text-xs bg-[#FBFBF9] border border-[#E5E3DC] rounded-xl focus:outline-none focus:border-gold text-charcoal"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Meta Description</label>
            <textarea 
              rows="3"
              value={formData.metaDescription}
              onChange={(e) => handleInputChange("metaDescription", e.target.value)}
              placeholder="Enter SEO description..."
              className="w-full px-3.5 py-2.5 text-xs bg-[#FBFBF9] border border-[#E5E3DC] rounded-xl focus:outline-none focus:border-gold text-charcoal leading-relaxed"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Logo Dropzone */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Logo Upload</span>
              <div className="border-2 border-dashed border-[#E5E3DC] hover:border-gold rounded-2xl p-6 text-center select-none cursor-pointer flex flex-col items-center justify-center space-y-2">
                <FiUploadCloud size={20} className="text-charcoal/40" />
                <span className="text-[11px] font-bold text-charcoal/70">Click to upload brand logo</span>
              </div>
            </div>
            {/* Favicon Dropzone */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Favicon</span>
              <div className="border-2 border-dashed border-[#E5E3DC] hover:border-gold rounded-2xl p-6 text-center select-none cursor-pointer flex flex-col items-center justify-center space-y-2">
                <svg className="w-5 h-5 text-charcoal/40" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-[11px] font-bold text-charcoal/70">Click to upload .ico or .png</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Social Connectivity */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E3DC]/40 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-xl text-[#0E1D14] flex items-center gap-2.5 border-b border-[#E5E3DC]/25 pb-3">
            <FiShare2 size={20} className="text-[#C5A880]" />
            <span>Social Connectivity</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Facebook</label>
              <input 
                type="text" 
                value={formData.facebook}
                onChange={(e) => handleInputChange("facebook", e.target.value)}
                placeholder="https://facebook.com/..."
                className="w-full px-3.5 py-2.5 text-xs bg-[#FBFBF9] border border-[#E5E3DC] rounded-xl focus:outline-none focus:border-gold text-charcoal"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Instagram</label>
              <input 
                type="text" 
                value={formData.instagram}
                onChange={(e) => handleInputChange("instagram", e.target.value)}
                placeholder="https://instagram.com/..."
                className="w-full px-3.5 py-2.5 text-xs bg-[#FBFBF9] border border-[#E5E3DC] rounded-xl focus:outline-none focus:border-gold text-charcoal"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">TikTok</label>
              <input 
                type="text" 
                value={formData.tiktok}
                onChange={(e) => handleInputChange("tiktok", e.target.value)}
                placeholder="https://tiktok.com/@..."
                className="w-full px-3.5 py-2.5 text-xs bg-[#FBFBF9] border border-[#E5E3DC] rounded-xl focus:outline-none focus:border-gold text-charcoal"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">YouTube</label>
              <input 
                type="text" 
                value={formData.youtube}
                onChange={(e) => handleInputChange("youtube", e.target.value)}
                placeholder="https://youtube.com/..."
                className="w-full px-3.5 py-2.5 text-xs bg-[#FBFBF9] border border-[#E5E3DC] rounded-xl focus:outline-none focus:border-gold text-charcoal"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Pinterest</label>
              <input 
                type="text" 
                value={formData.pinterest}
                onChange={(e) => handleInputChange("pinterest", e.target.value)}
                placeholder="https://pinterest.com/..."
                className="w-full px-3.5 py-2.5 text-xs bg-[#FBFBF9] border border-[#E5E3DC] rounded-xl focus:outline-none focus:border-gold text-charcoal"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Twitter / X</label>
              <input 
                type="text" 
                value={formData.twitterX}
                onChange={(e) => handleInputChange("twitterX", e.target.value)}
                placeholder="https://x.com/..."
                className="w-full px-3.5 py-2.5 text-xs bg-[#FBFBF9] border border-[#E5E3DC] rounded-xl focus:outline-none focus:border-gold text-charcoal"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Store Platform URLs */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E3DC]/40 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-xl text-[#0E1D14] flex items-center gap-2.5 border-b border-[#E5E3DC]/25 pb-3">
            <FiShoppingCart size={20} className="text-[#C5A880]" />
            <span>Store Platform URLs</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Amazon Author Page</label>
              <input 
                type="text" 
                value={formData.amazonAuthor}
                onChange={(e) => handleInputChange("amazonAuthor", e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#FBFBF9] border border-[#E5E3DC] rounded-xl focus:outline-none focus:border-gold text-charcoal"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Apple Books</label>
              <input 
                type="text" 
                value={formData.appleBooks}
                onChange={(e) => handleInputChange("appleBooks", e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#FBFBF9] border border-[#E5E3DC] rounded-xl focus:outline-none focus:border-gold text-charcoal"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Kobo</label>
              <input 
                type="text" 
                value={formData.kobo}
                onChange={(e) => handleInputChange("kobo", e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#FBFBF9] border border-[#E5E3DC] rounded-xl focus:outline-none focus:border-gold text-charcoal"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Draft2Digital</label>
              <input 
                type="text" 
                value={formData.draft2Digital}
                onChange={(e) => handleInputChange("draft2Digital", e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#FBFBF9] border border-[#E5E3DC] rounded-xl focus:outline-none focus:border-gold text-charcoal"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Google Play</label>
              <input 
                type="text" 
                value={formData.googlePlay}
                onChange={(e) => handleInputChange("googlePlay", e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#FBFBF9] border border-[#E5E3DC] rounded-xl focus:outline-none focus:border-gold text-charcoal"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Barnes & Noble</label>
              <input 
                type="text" 
                value={formData.barnesNoble}
                onChange={(e) => handleInputChange("barnesNoble", e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#FBFBF9] border border-[#E5E3DC] rounded-xl focus:outline-none focus:border-gold text-charcoal"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Footer Customization */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E3DC]/40 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-xl text-[#0E1D14] flex items-center gap-2.5 border-b border-[#E5E3DC]/25 pb-3">
            <FiLayout size={20} className="text-[#C5A880]" />
            <span>Footer Customization</span>
          </h3>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Footer Description</label>
              <textarea 
                rows="3"
                value={formData.footerDescription}
                onChange={(e) => handleInputChange("footerDescription", e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#FBFBF9] border border-[#E5E3DC] rounded-xl focus:outline-none focus:border-gold text-charcoal leading-relaxed"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Copyright Text</label>
                <input 
                  type="text" 
                  value={formData.copyrightText}
                  onChange={(e) => handleInputChange("copyrightText", e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FBFBF9] border border-[#E5E3DC] rounded-xl focus:outline-none focus:border-gold text-charcoal"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Privacy Policy Link</label>
                <input 
                  type="text" 
                  value={formData.privacyLink}
                  onChange={(e) => handleInputChange("privacyLink", e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FBFBF9] border border-[#E5E3DC] rounded-xl focus:outline-none focus:border-gold text-charcoal"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Terms of Use Link</label>
                <input 
                  type="text" 
                  value={formData.termsLink}
                  onChange={(e) => handleInputChange("termsLink", e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FBFBF9] border border-[#E5E3DC] rounded-xl focus:outline-none focus:border-gold text-charcoal"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Admin Account */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E3DC]/40 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-xl text-[#0E1D14] flex items-center gap-2.5 border-b border-[#E5E3DC]/25 pb-3">
            <FiLock size={20} className="text-[#C5A880]" />
            <span>Admin Account</span>
          </h3>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div className="space-y-1 w-full sm:max-w-md">
              <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-wider block">Admin Email Address</label>
              {/* input with red-accented border line representing locked credential state */}
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 rounded-l" />
                <input 
                  type="email" 
                  readOnly
                  value={formData.adminEmail}
                  className="w-full pl-4 pr-3.5 py-2.5 text-xs bg-[#FAF9F5] border border-[#E5E3DC] rounded-xl text-charcoal font-semibold outline-none select-all"
                />
              </div>
            </div>
            <button 
              type="button"
              onClick={() => alert("Please consult your Firebase Auth settings to initialize password updates.")}
              className="px-5 py-2.5 border border-[#E5E3DC] hover:border-gold text-charcoal hover:text-gold rounded-xl text-xs font-bold transition-all cursor-pointer w-full sm:w-auto shadow-sm select-none"
            >
              Change Password
            </button>
          </div>
        </div>

      </form>

      {/* Styled mockup footer */}
      <footer className="border-t border-[#E5E3DC] pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] text-charcoal/40 font-sans tracking-wide">
        <span>© 2024 Premium Author Brand Admin. All rights reserved.</span>
        <div className="flex items-center gap-4 font-semibold">
          <a href="#support" className="hover:text-gold transition-colors">Support</a>
          <a href="#privacy" className="hover:text-gold transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-gold transition-colors">Terms of Service</a>
        </div>
      </footer>

    </div>
  );
}

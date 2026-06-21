import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";

export default function AdminSiteSettings() {
  const navigate = useNavigate();

  const handleSave = (e) => {
    e.preventDefault();
    alert("Mock site settings saved!");
  };

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-3xl font-serif font-bold text-forest-dark">Global Site Settings</h1>
        <p className="text-xs text-charcoal-light font-light mt-1">Configure global site name and social link networks.</p>
      </div>

      <form onSubmit={handleSave} className="bg-white border border-gold/15 p-6 rounded-xl space-y-4 max-w-2xl text-left">
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold text-forest-light tracking-wider block">Website Title Name</label>
          <input 
            type="text" 
            defaultValue="A. W. Author Hub"
            className="w-full px-3 py-2 text-xs bg-cream-dark/30 border border-gold/20 rounded focus:outline-none focus:ring-1 focus:ring-gold text-charcoal"
          />
        </div>

        <div className="space-y-4 pt-4 border-t border-gold/10">
          <h3 className="font-serif font-bold text-base text-forest-dark">Social Media Networks</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-forest-light tracking-wider block">Twitter Link</label>
              <input 
                type="text" 
                defaultValue="https://twitter.com/awauthor"
                className="w-full px-3 py-2 text-xs bg-cream-dark/30 border border-gold/20 rounded focus:outline-none focus:ring-1 focus:ring-gold text-charcoal"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-forest-light tracking-wider block">Instagram Link</label>
              <input 
                type="text" 
                defaultValue="https://instagram.com/awauthor"
                className="w-full px-3 py-2 text-xs bg-cream-dark/30 border border-gold/20 rounded focus:outline-none focus:ring-1 focus:ring-gold text-charcoal"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button onClick={() => navigate("/admin")} variant="outline" size="sm">Cancel</Button>
          <Button type="submit" variant="primary" size="sm">Save Settings</Button>
        </div>
      </form>
    </div>
  );
}

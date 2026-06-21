import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";

export default function AdminHomepageSettings() {
  const navigate = useNavigate();

  const handleSave = (e) => {
    e.preventDefault();
    alert("Mock homepage settings saved!");
  };

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-3xl font-serif font-bold text-forest-dark">Homepage Settings</h1>
        <p className="text-xs text-charcoal-light font-light mt-1">Configure layout contents of the site landing page.</p>
      </div>

      <form onSubmit={handleSave} className="bg-white border border-gold/15 p-6 rounded-xl space-y-4 max-w-2xl">
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold text-forest-light tracking-wider block">Hero Banner Header</label>
          <input 
            type="text" 
            defaultValue="Escape Into Worlds of Romance & Mystery"
            className="w-full px-3 py-2 text-xs bg-cream-dark/30 border border-gold/20 rounded focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold text-forest-light tracking-wider block">Hero Subtext</label>
          <textarea 
            rows="3"
            defaultValue="I am A. W. Author. Browse my library of publications, follow my blog, and purchase editions through international platforms."
            className="w-full px-3 py-2 text-xs bg-cream-dark/30 border border-gold/20 rounded focus:outline-none focus:ring-1 focus:ring-gold"
          ></textarea>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button onClick={() => navigate("/admin")} variant="outline" size="sm">Cancel</Button>
          <Button type="submit" variant="primary" size="sm">Save Settings</Button>
        </div>
      </form>
    </div>
  );
}

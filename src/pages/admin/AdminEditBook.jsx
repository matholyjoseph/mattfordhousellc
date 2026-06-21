import { useParams, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";

export default function AdminEditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    alert(`Mock edit book ${id} update triggered!`);
    navigate("/admin/books");
  };

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-3xl font-serif font-bold text-forest-dark">Edit Book Profile</h1>
        <p className="text-xs text-charcoal-light font-light mt-1">Update book details for record ID: {id}</p>
      </div>

      <form onSubmit={handleUpdate} className="bg-white border border-gold/15 p-6 rounded-xl space-y-4 max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-forest-light tracking-wider block">Book Title</label>
            <input 
              type="text" 
              required 
              defaultValue="Shadows of the Forest"
              className="w-full px-3 py-2 text-xs bg-cream-dark/30 border border-gold/20 rounded focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-forest-light tracking-wider block">Pen Name</label>
            <select className="w-full px-3 py-2 text-xs bg-cream-dark/30 border border-gold/20 rounded focus:outline-none focus:ring-1 focus:ring-gold" defaultValue="A. W. Forest">
              <option>A. W. Forest</option>
              <option>Sarah J. Gold</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold text-forest-light tracking-wider block">Book Description</label>
          <textarea 
            rows="5"
            defaultValue="An elegant gothic novel featuring dramatic twists, ancient curses, and long-forgotten promises."
            className="w-full px-3 py-2 text-xs bg-cream-dark/30 border border-gold/20 rounded focus:outline-none focus:ring-1 focus:ring-gold"
          ></textarea>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button onClick={() => navigate("/admin/books")} variant="outline" size="sm">Cancel</Button>
          <Button type="submit" variant="primary" size="sm">Update Book</Button>
        </div>
      </form>
    </div>
  );
}

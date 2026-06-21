import { Link } from "react-router-dom";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import Button from "../../components/common/Button";

export default function AdminBlogs() {
  const mockBlogs = [
    { id: "1", title: "My Writing Process: From Idea to Finished Draft", date: "2026-05-18", status: "published" },
    { id: "2", title: "Exploring Curses in Fantasy Fiction", date: "2026-04-20", status: "draft" }
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-forest-dark">Manage Blogs</h1>
          <p className="text-xs text-charcoal-light font-light mt-1">Draft, schedule, or publish writing updates.</p>
        </div>
        <Button to="/admin/blogs/new" variant="primary" size="sm" className="flex items-center gap-1">
          <FiPlus /> Write Post
        </Button>
      </div>

      <div className="bg-white border border-gold/15 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-cream-dark/30 text-forest-dark border-b border-gold/15 font-bold">
              <th className="p-4">Title</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockBlogs.map((blog) => (
              <tr key={blog.id} className="border-b border-gold/10 hover:bg-cream-dark/10">
                <td className="p-4 font-bold text-forest">{blog.title}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    blog.status === "published" 
                      ? "bg-forest/10 text-forest" 
                      : "bg-charcoal/10 text-charcoal-light"
                  }`}>
                    {blog.status}
                  </span>
                </td>
                <td className="p-4 text-charcoal-light">{blog.date}</td>
                <td className="p-4 text-right flex justify-end gap-2">
                  <Link 
                    to={`/admin/blogs/edit/${blog.id}`}
                    className="p-1.5 border border-gold/40 hover:bg-gold/10 rounded text-gold-dark transition-colors"
                    title="Edit"
                  >
                    <FiEdit2 size={12} />
                  </Link>
                  <button 
                    onClick={() => alert("Mock delete blog post triggered!")}
                    className="p-1.5 border border-red-200 hover:bg-red-50 rounded text-red-600 transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <FiTrash2 size={12} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

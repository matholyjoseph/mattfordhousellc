import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookForm from "../../components/common/BookForm";
import { getBookById, updateBook } from "../../services/bookService";
import LoadingSpinner from "../../components/common/LoadingSpinner";

export default function AdminEditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const loadBook = async () => {
      setLoading(true);
      try {
        const data = await getBookById(id);
        if (data) {
          setBookData(data);
        } else {
          alert("Book document not found.");
          navigate("/admin/books");
        }
      } catch (err) {
        console.error("Failed to load book record:", err);
        alert("Failed to load book details from Firestore.");
        navigate("/admin/books");
      } finally {
        setLoading(false);
      }
    };
    loadBook();
  }, [id, navigate]);

  const handleSubmit = async (formData) => {
    setUpdating(true);
    try {
      await updateBook(id, formData);
      alert(`Book "${formData.title}" has been successfully updated!`);
      navigate("/admin/books");
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to update the book details inside database.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
        <LoadingSpinner className="w-10 h-10 text-forest" />
        <p className="text-xs text-charcoal/50 uppercase tracking-widest font-bold">Retrieving book details from Firestore...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans text-left pb-10">
      
      {/* 1. BREADCRUMBS & PAGE HEADER */}
      <div className="space-y-1">
        <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-charcoal/40 select-none">
          Library / Books / Edit Profile
        </div>
        <h1 className="text-3xl sm:text-[36px] font-serif font-bold text-charcoal leading-tight">
          Edit Book Profile
        </h1>
        <p className="text-xs text-charcoal/40 font-light mt-1">Update book details for record ID: {id}</p>
      </div>

      {/* Book Form wrapper */}
      <div className="mt-6">
        {bookData && (
          <BookForm 
            initialData={bookData}
            onSubmit={handleSubmit} 
            onCancel={() => navigate("/admin/books")}
            loading={updating}
          />
        )}
      </div>

    </div>
  );
}

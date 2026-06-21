import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookForm from "../../components/common/BookForm";
import { createBook } from "../../services/bookService";

export default function AdminNewBook() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await createBook(formData);
      alert(`Book "${formData.title}" has been successfully added!`);
      navigate("/admin/books");
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to save the book details. Please check your data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 font-sans text-left pb-10">
      
      {/* 1. BREADCRUMBS & PAGE HEADER */}
      <div className="space-y-1">
        <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-charcoal/40 select-none">
          Library / Books / New Entry
        </div>
        <h1 className="text-3xl sm:text-[36px] font-serif font-bold text-charcoal leading-tight">
          Add New Book
        </h1>
      </div>

      {/* Reusable Book Form wrapper */}
      <div className="mt-6">
        <BookForm 
          onSubmit={handleSubmit} 
          onCancel={() => navigate("/admin/books")}
          loading={loading}
        />
      </div>

    </div>
  );
}

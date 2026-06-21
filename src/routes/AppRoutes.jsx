import { Routes, Route } from "react-router-dom";

// Layouts
import PublicLayout from "../components/layout/PublicLayout";
import AdminLayout from "../components/layout/AdminLayout";
import ProtectedRoute from "../components/layout/ProtectedRoute";

// Public Pages
import Home from "../pages/public/Home";
import Books from "../pages/public/Books";
import BookDetail from "../pages/public/BookDetail";
import PenNames from "../pages/public/PenNames";
import PenNameDetail from "../pages/public/PenNameDetail";
import Blogs from "../pages/public/Blogs";
import BlogDetail from "../pages/public/BlogDetail";
import About from "../pages/public/About";
import Newsletter from "../pages/public/Newsletter";
import Contact from "../pages/public/Contact";

// Admin Pages
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminBooks from "../pages/admin/AdminBooks";
import AdminNewBook from "../pages/admin/AdminNewBook";
import AdminEditBook from "../pages/admin/AdminEditBook";
import AdminBlogs from "../pages/admin/AdminBlogs";
import AdminNewBlog from "../pages/admin/AdminNewBlog";
import AdminEditBlog from "../pages/admin/AdminEditBlog";
import AdminPenNames from "../pages/admin/AdminPenNames";
import AdminGenresTropes from "../pages/admin/AdminGenresTropes";
import AdminReviews from "../pages/admin/AdminReviews";
import AdminSubscribers from "../pages/admin/AdminSubscribers";
import AdminHomepageSettings from "../pages/admin/AdminHomepageSettings";
import AdminSiteSettings from "../pages/admin/AdminSiteSettings";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes with Navbar/Footer Layout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:slug" element={<BookDetail />} />
        <Route path="/pen-names" element={<PenNames />} />
        <Route path="/pen-names/:slug" element={<PenNameDetail />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />

        <Route path="/about" element={<About />} />
        <Route path="/newsletter" element={<Newsletter />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Admin Login Route (Independent Layout) */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin Dashboard Routes with Sidebar Layout */}
      <Route element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/books" element={<AdminBooks />} />
        <Route path="/admin/books/new" element={<AdminNewBook />} />
        <Route path="/admin/books/edit/:id" element={<AdminEditBook />} />
        <Route path="/admin/blogs" element={<AdminBlogs />} />
        <Route path="/admin/blogs/new" element={<AdminNewBlog />} />
        <Route path="/admin/blogs/edit/:id" element={<AdminEditBlog />} />
        <Route path="/admin/pen-names" element={<AdminPenNames />} />
        <Route path="/admin/genres-tropes" element={<AdminGenresTropes />} />
        <Route path="/admin/reviews" element={<AdminReviews />} />
        <Route path="/admin/subscribers" element={<AdminSubscribers />} />
        <Route path="/admin/homepage-settings" element={<AdminHomepageSettings />} />
        <Route path="/admin/site-settings" element={<AdminSiteSettings />} />
      </Route>

      {/* Fallback Catch-all -> Home */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}


import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../common/LoadingSpinner";

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="text-center space-y-4">
          <LoadingSpinner className="w-10 h-10 mx-auto text-forest" />
          <p className="text-xs text-charcoal/50 uppercase tracking-widest font-bold">Verifying Credentials...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/admin/login" replace />;
  }

  // Double-check admin role just in case
  if (currentUser.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6">
        <div className="bg-white border border-[#E5E3DC] p-8 rounded-2xl max-w-md w-full text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
            !
          </div>
          <div className="space-y-2">
            <h1 className="font-serif text-2xl font-bold text-forest-dark">Unauthorized Access</h1>
            <p className="text-xs text-charcoal/60 leading-relaxed">
              Your account does not have administrator access. Please log in with a registered admin email or Google account.
            </p>
          </div>
          <Navigate to="/admin/login" replace />
        </div>
      </div>
    );
  }

  return children;
}

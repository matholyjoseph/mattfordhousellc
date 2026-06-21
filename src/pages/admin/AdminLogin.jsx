import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../../components/common/LoadingSpinner";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");
  const [localLoading, setLocalLoading] = useState(false);

  const { loginAdmin: login, loginAdminWithGoogle: loginWithGoogle, currentUser, error: authError } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect directly to admin
  useEffect(() => {
    if (currentUser && currentUser.role === "admin") {
      navigate("/admin");
    }
  }, [currentUser, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLocalError("");
    setLocalLoading(true);

    try {
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      console.error("Authentication error:", err);
      // Auth Denied is handled inside verifyAndSetAdmin and context error sets
      setLocalError(err.message || "Failed to authenticate as administrator.");
    } finally {
      setLocalLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLocalError("");
    setLocalLoading(true);

    try {
      await loginWithGoogle();
      navigate("/admin");
    } catch (err) {
      console.error("Google authentication error:", err);
      setLocalError(err.message || "Failed to authenticate via Google.");
    } finally {
      setLocalLoading(false);
    }
  };

  const displayError = localError || authError;

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-[#FDFBF7] py-10 px-4 relative overflow-hidden font-sans">
      
      {/* Background circular lines pattern matching mockup */}
      <div className="absolute right-0 top-0 opacity-[0.03] text-[#A58860] pointer-events-none translate-x-32 -translate-y-32">
        <svg className="w-[600px] h-[600px]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="100" cy="0" r="90" />
          <circle cx="100" cy="0" r="70" />
          <circle cx="100" cy="0" r="50" />
        </svg>
      </div>

      <div className="absolute left-0 bottom-0 opacity-[0.03] text-[#A58860] pointer-events-none -translate-x-32 translate-y-32">
        <svg className="w-[600px] h-[600px]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="0" cy="100" r="90" />
          <circle cx="0" cy="100" r="70" />
          <circle cx="0" cy="100" r="50" />
        </svg>
      </div>

      {/* Spacer */}
      <div className="flex-grow-0 h-4" />

      {/* Central Login Card */}
      <div className="w-full max-w-[440px] bg-white p-8 sm:p-10 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-[#E5E3DC]/30 relative z-10">
        
        {/* Book Icon */}
        <div className="flex justify-center mb-4">
          <svg className="w-8 h-8 text-[#1A3020]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
        </div>

        {/* Brand Name */}
        <h3 className="font-serif font-bold text-xl text-charcoal text-center mb-2">
          Elias Thorne
        </h3>

        {/* Title */}
        <h2 className="font-serif font-bold text-[28px] text-charcoal text-center leading-tight mb-2">
          Admin Dashboard
        </h2>

        {/* Description */}
        <p className="text-xs sm:text-[13px] text-charcoal-light font-sans font-light text-center leading-relaxed max-w-[280px] mx-auto mb-6">
          Sign in to manage books, blog posts, pen names, and site content.
        </p>

        {/* Error Feedback */}
        {displayError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 text-left font-sans flex items-start gap-2 leading-relaxed">
            <span className="font-bold text-sm select-none">!</span>
            <span>{displayError}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* Email field */}
          <div className="space-y-2 relative text-left">
            <label className="text-[10px] uppercase font-bold text-charcoal/60 tracking-widest block font-sans">
              Email Address
            </label>
            <div className="relative border-b border-[#E5E3DC] focus-within:border-gold pb-2 transition-colors">
              <span className="absolute left-0 bottom-2 text-charcoal/50">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <path d="M22 6l-10 7L2 6" />
                </svg>
              </span>
              <input
                type="email"
                required
                disabled={localLoading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@eliasthorne.com"
                className="w-full bg-transparent pl-7 pr-2 outline-none text-sm text-charcoal placeholder-charcoal/30 pt-1 font-sans"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-2 relative text-left">
            <label className="text-[10px] uppercase font-bold text-charcoal/60 tracking-widest block font-sans">
              Password
            </label>
            <div className="relative border-b border-[#E5E3DC] focus-within:border-gold pb-2 transition-colors">
              <span className="absolute left-0 bottom-2 text-charcoal/50">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                required
                disabled={localLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent pl-7 pr-8 outline-none text-sm text-charcoal placeholder-charcoal/30 pt-1 font-sans"
              />
              <button
                type="button"
                disabled={localLoading}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 bottom-2 text-charcoal/50 hover:text-gold transition-colors focus:outline-none cursor-pointer"
              >
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Remember Session (dummy check) */}
          <div className="flex items-center justify-between text-xs font-sans pt-1">
            <label className="flex items-center gap-2 text-charcoal/70 select-none cursor-pointer">
              <input
                type="checkbox"
                disabled={localLoading}
                className="rounded border-[#E5E3DC] text-forest focus:ring-forest-light h-4 w-4 cursor-pointer"
              />
              <span>Remember session</span>
            </label>
            <button
              type="button"
              disabled={localLoading}
              onClick={() => alert("Please consult your Firestore console settings to manually reset or create administrator credentials.")}
              className="text-[#C5A880] hover:text-[#A58860] font-semibold focus:outline-none cursor-pointer"
            >
              Credentials help?
            </button>
          </div>

          {/* Login Buttons */}
          <div className="space-y-3 pt-2">
            <button
              type="submit"
              disabled={localLoading}
              className="w-full py-4 bg-[#0A180E] hover:bg-[#C5A880] text-white hover:text-[#0A180E] font-sans font-bold text-xs uppercase tracking-[0.25em] rounded-xl transition-luxury shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              {localLoading ? (
                <>
                  <LoadingSpinner className="w-4 h-4 text-white" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>Login</span>
              )}
            </button>

            {/* Google Authentication Button */}
            <button
              type="button"
              disabled={localLoading}
              onClick={handleGoogleLogin}
              className="w-full py-3.5 bg-white border border-[#E5E3DC] hover:bg-[#FDFBF7] text-charcoal font-sans font-semibold text-xs rounded-xl transition-luxury shadow-sm cursor-pointer flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

        </form>

        {/* Security Badge */}
        <div className="flex justify-center pt-8">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#F0EFF0] rounded-full text-[9px] font-bold text-charcoal/50 uppercase tracking-wider select-none">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Authorized Access Only.
          </span>
        </div>

      </div>

      {/* Footer */}
      <div className="text-[10px] text-charcoal/40 font-sans tracking-wide pt-10">
        © 2024 Elias Thorne. Secured by Obsidian Admin.
      </div>

    </div>
  );
}

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../../components/common/LoadingSpinner";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");
  const [localLoading, setLocalLoading] = useState(false);

  const { login, loginWithGoogle, currentUser, error: authError } = useAuth();
  const navigate = useNavigate();

  // If already authenticated, redirect to home page
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLocalError("");
    setLocalLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      setLocalError(err.message || "Invalid email or password credential.");
    } finally {
      setLocalLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLocalError("");
    setLocalLoading(true);

    try {
      await loginWithGoogle();
      navigate("/");
    } catch (err) {
      console.error("Google login failed:", err);
      setLocalError(err.message || "Failed to authenticate with Google.");
    } finally {
      setLocalLoading(false);
    }
  };

  const displayError = localError || authError;

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center bg-[#FDFBF7] py-12 px-4 relative overflow-hidden font-sans">
      
      {/* Background circular decorations */}
      <div className="absolute right-0 top-0 opacity-[0.02] text-[#A58860] pointer-events-none translate-x-32 -translate-y-32">
        <svg className="w-[500px] h-[500px]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="100" cy="0" r="90" />
          <circle cx="100" cy="0" r="70" />
        </svg>
      </div>

      {/* Central Login Card */}
      <div className="w-full max-w-[420px] bg-white p-8 sm:p-10 rounded-[32px] shadow-[0_15px_45px_rgba(0,0,0,0.04)] border border-[#E5E3DC]/30 relative z-10">
        
        {/* Title */}
        <h2 className="font-serif font-bold text-3xl text-charcoal text-center leading-tight mb-2">
          Welcome Back
        </h2>

        {/* Subtitle */}
        <p className="text-xs text-charcoal-light font-sans font-light text-center leading-relaxed max-w-[260px] mx-auto mb-8">
          Sign in to your account to review books, save favorites, and manage your list.
        </p>

        {/* Error notification */}
        {displayError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 text-left font-sans flex items-start gap-2 leading-relaxed">
            <span className="font-bold text-sm select-none">!</span>
            <span>{displayError}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          
          {/* Email field */}
          <div className="space-y-1.5 text-left">
            <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-widest block font-sans">
              Email Address
            </label>
            <input
              type="email"
              required
              disabled={localLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-[#F5F4F0] border border-[#E5E3DC] rounded-xl px-4 py-3 text-xs text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-gold outline-none transition-colors"
            />
          </div>

          {/* Password field */}
          <div className="space-y-1.5 text-left relative">
            <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-widest block font-sans">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                disabled={localLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#F5F4F0] border border-[#E5E3DC] rounded-xl px-4 py-3 pr-10 text-xs text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-gold outline-none transition-colors"
              />
              <button
                type="button"
                disabled={localLoading}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-gold transition-colors focus:outline-none cursor-pointer"
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

          {/* Submit / OAuth triggers */}
          <div className="space-y-3 pt-2">
            <button
              type="submit"
              disabled={localLoading}
              className="w-full py-3.5 bg-[#1A3020] hover:bg-[#C5A880] text-cream hover:text-[#1A3020] font-sans font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition-luxury shadow-sm cursor-pointer flex items-center justify-center gap-2"
            >
              {localLoading ? (
                <>
                  <LoadingSpinner className="w-4 h-4 text-cream" />
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>

            {/* Google Sign In option */}
            <button
              type="button"
              disabled={localLoading}
              onClick={handleGoogleLogin}
              className="w-full py-3 bg-white border border-[#E5E3DC] hover:bg-[#FDFBF7] text-charcoal font-sans font-semibold text-xs rounded-xl transition-luxury shadow-sm cursor-pointer flex items-center justify-center gap-2"
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
              <span>Sign in with Google</span>
            </button>
          </div>

        </form>

        {/* Link to signup */}
        <div className="pt-6 border-t border-[#E5E3DC]/60 mt-6 text-center text-xs font-sans text-charcoal/60">
          <span>Don't have an account? </span>
          <Link to="/signup" className="text-[#C5A880] hover:text-[#A58860] font-semibold transition-colors">
            Register here
          </Link>
        </div>

      </div>

    </div>
  );
}

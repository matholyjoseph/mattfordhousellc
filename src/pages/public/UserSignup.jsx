import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../../components/common/LoadingSpinner";

export default function UserSignup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");
  const [localLoading, setLocalLoading] = useState(false);

  const { signup, loginWithGoogle, currentUser, error: authError } = useAuth();
  const navigate = useNavigate();

  // If already authenticated, redirect to home page
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLocalError("");

    // Validate passwords match
    if (password !== confirmPassword) {
      setLocalError("Passwords do not match. Please verify your entries.");
      return;
    }

    // Validate password strength
    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters long.");
      return;
    }

    setLocalLoading(true);

    try {
      await signup(email, password, fullName);
      navigate("/");
    } catch (err) {
      console.error("Signup failed:", err);
      setLocalError(err.message || "Failed to create account. Email might already be registered.");
    } finally {
      setLocalLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLocalError("");
    setLocalLoading(true);

    try {
      await loginWithGoogle();
      navigate("/");
    } catch (err) {
      console.error("Google sign up failed:", err);
      setLocalError(err.message || "Failed to register with Google.");
    } finally {
      setLocalLoading(false);
    }
  };

  const displayError = localError || authError;

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center bg-[#FDFBF7] py-12 px-4 relative overflow-hidden font-sans">
      
      {/* Background circular decorations */}
      <div className="absolute left-0 bottom-0 opacity-[0.02] text-[#A58860] pointer-events-none -translate-x-32 translate-y-32">
        <svg className="w-[500px] h-[500px]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="0" cy="100" r="90" />
          <circle cx="0" cy="100" r="70" />
        </svg>
      </div>

      {/* Central Signup Card */}
      <div className="w-full max-w-[420px] bg-white p-8 sm:p-10 rounded-[32px] shadow-[0_15px_45px_rgba(0,0,0,0.04)] border border-[#E5E3DC]/30 relative z-10">
        
        {/* Title */}
        <h2 className="font-serif font-bold text-3xl text-charcoal text-center leading-tight mb-2">
          Create Account
        </h2>

        {/* Subtitle */}
        <p className="text-xs text-charcoal-light font-sans font-light text-center leading-relaxed max-w-[260px] mx-auto mb-6">
          Register to join the reader list, write reviews, and receive publication updates.
        </p>

        {/* Error notification */}
        {displayError && (
          <div className="mb-5 p-4 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 text-left font-sans flex items-start gap-2 leading-relaxed">
            <span className="font-bold text-sm select-none">!</span>
            <span>{displayError}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          
          {/* Full Name field */}
          <div className="space-y-1 text-left">
            <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-widest block font-sans">
              Full Name
            </label>
            <input
              type="text"
              required
              disabled={localLoading}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Elias Thorne"
              className="w-full bg-[#F5F4F0] border border-[#E5E3DC] rounded-xl px-4 py-2.5 text-xs text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-gold outline-none transition-colors"
            />
          </div>

          {/* Email field */}
          <div className="space-y-1 text-left">
            <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-widest block font-sans">
              Email Address
            </label>
            <input
              type="email"
              required
              disabled={localLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="reader@example.com"
              className="w-full bg-[#F5F4F0] border border-[#E5E3DC] rounded-xl px-4 py-2.5 text-xs text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-gold outline-none transition-colors"
            />
          </div>

          {/* Password fields row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Password */}
            <div className="space-y-1 text-left relative">
              <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-widest block font-sans">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                required
                disabled={localLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="w-full bg-[#F5F4F0] border border-[#E5E3DC] rounded-xl px-4 py-2.5 text-xs text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-gold outline-none transition-colors"
              />
            </div>
            
            {/* Confirm Password */}
            <div className="space-y-1 text-left relative">
              <label className="text-[10px] uppercase font-bold text-charcoal/50 tracking-widest block font-sans">
                Confirm
              </label>
              <input
                type={showPassword ? "text" : "password"}
                required
                disabled={localLoading}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••"
                className="w-full bg-[#F5F4F0] border border-[#E5E3DC] rounded-xl px-4 py-2.5 text-xs text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-gold outline-none transition-colors"
              />
            </div>
          </div>

          {/* Password visibility check */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-xs text-charcoal/70 select-none cursor-pointer">
              <input
                type="checkbox"
                disabled={localLoading}
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="rounded border-[#E5E3DC] text-forest focus:ring-forest-light h-4 w-4 cursor-pointer"
              />
              <span>Show passwords</span>
            </label>
          </div>

          {/* Submit buttons */}
          <div className="space-y-2.5 pt-2">
            <button
              type="submit"
              disabled={localLoading}
              className="w-full py-3.5 bg-[#1A3020] hover:bg-[#C5A880] text-cream hover:text-[#1A3020] font-sans font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition-luxury shadow-sm cursor-pointer flex items-center justify-center gap-2"
            >
              {localLoading ? (
                <>
                  <LoadingSpinner className="w-4 h-4 text-cream" />
                  <span>Registering...</span>
                </>
              ) : (
                <span>Register Account</span>
              )}
            </button>

            {/* Google Signup Option */}
            <button
              type="button"
              disabled={localLoading}
              onClick={handleGoogleSignup}
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
              <span>Register with Google</span>
            </button>
          </div>

        </form>

        {/* Link to login */}
        <div className="pt-5 border-t border-[#E5E3DC]/60 mt-5 text-center text-xs font-sans text-charcoal/60">
          <span>Already have an account? </span>
          <Link to="/login" className="text-[#C5A880] hover:text-[#A58860] font-semibold transition-colors">
            Login here
          </Link>
        </div>

      </div>

    </div>
  );
}

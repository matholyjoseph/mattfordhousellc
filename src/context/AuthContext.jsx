import { createContext, useContext, useState, useEffect } from "react";
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  createUserWithEmailAndPassword,
  updateProfile,
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, googleProvider, db } from "../config/firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper: check if uid is registered in admins collection and return role
  const checkUserRole = async (uid) => {
    try {
      const adminRef = doc(db, "admins", uid);
      const adminSnap = await getDoc(adminRef);
      if (adminSnap.exists() && adminSnap.data().role === "admin") {
        return { role: "admin", data: adminSnap.data() };
      }
      return { role: "user", data: null };
    } catch (e) {
      console.warn("Firestore role check failed, defaulting to user:", e);
      return { role: "user", data: null };
    }
  };

  // 1. PUBLIC User Sign Up (Email/Password)
  const signup = async (email, password, displayName) => {
    setError(null);
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update display name in Firebase Auth profile
      await updateProfile(userCredential.user, { displayName });
      
      const user = userCredential.user;
      setCurrentUser({
        uid: user.uid,
        email: user.email,
        displayName: displayName,
        photoURL: null,
        role: "user",
        penNames: []
      });
    } catch (err) {
      console.error("Sign up failed:", err);
      setError(err.message || "Failed to sign up.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 2. PUBLIC User Login (Email/Password)
  const login = async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const { role, data } = await checkUserRole(user.uid);
      
      setCurrentUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || (data?.name) || "User",
        photoURL: user.photoURL || null,
        role: role,
        penNames: data?.penNames || []
      });
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.message || "Failed to log in.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 3. PUBLIC User Login (Google Popup)
  const loginWithGoogle = async () => {
    setError(null);
    setLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      const { role, data } = await checkUserRole(user.uid);
      
      setCurrentUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || (data?.name) || "User",
        photoURL: user.photoURL || null,
        role: role,
        penNames: data?.penNames || []
      });
    } catch (err) {
      console.error("Google sign in failed:", err);
      setError(err.message || "Google Authentication failed.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 4. ADMIN Gated Login (Email/Password)
  const loginAdmin = async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const { role, data } = await checkUserRole(user.uid);
      
      if (role !== "admin") {
        await signOut(auth);
        setCurrentUser(null);
        throw new Error("Access Denied: You are not authorized as an administrator.");
      }

      setCurrentUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || (data?.name) || "Admin",
        photoURL: user.photoURL || null,
        role: "admin",
        penNames: data?.penNames || []
      });
    } catch (err) {
      console.error("Admin Login failed:", err);
      setError(err.message || "Failed to log in as administrator.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 5. ADMIN Gated Login (Google Popup)
  const loginAdminWithGoogle = async () => {
    setError(null);
    setLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      const { role, data } = await checkUserRole(user.uid);

      if (role !== "admin") {
        await signOut(auth);
        setCurrentUser(null);
        throw new Error("Access Denied: You are not authorized as an administrator.");
      }

      setCurrentUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || (data?.name) || "Admin",
        photoURL: user.photoURL || null,
        role: "admin",
        penNames: data?.penNames || []
      });
    } catch (err) {
      console.error("Admin Google sign in failed:", err);
      setError(err.message || "Admin Google Authentication failed.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 6. Log out function (shared)
  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // Listen to auth changes on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const { role, data } = await checkUserRole(user.uid);
          setCurrentUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || (data?.name) || "User",
            photoURL: user.photoURL || null,
            role: role,
            penNames: data?.penNames || []
          });
        } else {
          setCurrentUser(null);
        }
      } catch (err) {
        console.error("Auth listener verification error:", err);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    error,
    signup,
    login,
    loginWithGoogle,
    loginAdmin,
    loginAdminWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

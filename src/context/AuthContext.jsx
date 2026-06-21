import { createContext, useContext, useState, useEffect } from "react";
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
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

  // Sign in using email and password
  const login = async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Verify admin status
      await verifyAndSetAdmin(userCredential.user);
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.message || "Failed to log in.");
      await signOut(auth);
      setCurrentUser(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sign in using Google popup
  const loginWithGoogle = async () => {
    setError(null);
    setLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      // Verify admin status
      await verifyAndSetAdmin(userCredential.user);
    } catch (err) {
      console.error("Google sign in failed:", err);
      setError(err.message || "Google Authentication failed.");
      await signOut(auth);
      setCurrentUser(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Log out function
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

  // Helper function to query admin document inside Firestore
  const verifyAndSetAdmin = async (user) => {
    if (!user) return;
    const adminRef = doc(db, "admins", user.uid);
    const adminSnap = await getDoc(adminRef);

    if (adminSnap.exists() && adminSnap.data().role === "admin") {
      const adminData = adminSnap.data();
      setCurrentUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || adminData.name || "Admin",
        photoURL: user.photoURL || null,
        role: adminData.role,
        penNames: adminData.penNames || []
      });
    } else {
      // User logged in but is NOT registered as an admin in Firestore
      await signOut(auth);
      setCurrentUser(null);
      throw new Error("Access Denied: You are not authorized as an administrator.");
    }
  };

  // Listen to auth changes on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const adminRef = doc(db, "admins", user.uid);
          const adminSnap = await getDoc(adminRef);

          if (adminSnap.exists() && adminSnap.data().role === "admin") {
            const adminData = adminSnap.data();
            setCurrentUser({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName || adminData.name || "Admin",
              photoURL: user.photoURL || null,
              role: adminData.role,
              penNames: adminData.penNames || []
            });
          } else {
            // Not an admin, clear user state
            setCurrentUser(null);
          }
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
    login,
    loginWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

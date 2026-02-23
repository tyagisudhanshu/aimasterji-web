// src/context/AuthContext.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Provides auth state (user) and auth actions (signUp, signIn, googleSignIn,
// logOut) to the entire app via React Context.
// ─────────────────────────────────────────────────────────────────────────────

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(undefined); // undefined = loading
  const [isLoading, setLoading] = useState(true);

  // Listen for Firebase auth state changes (login, logout, page refresh)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser ?? null); // null = definitely logged out
      setLoading(false);
    });
    return unsubscribe; // cleanup listener on unmount
  }, []);

  // ── Auth Actions ────────────────────────────────────────────────────────────

  /** Create a new account with email + password */
  async function signUp(email, password, displayName) {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(result.user, { displayName });
    }
    await sendEmailVerification(result.user);
    return result;
  }

  /** Sign in with email + password */
  function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  /** Sign in with Google popup */
  function googleSignIn() {
    return signInWithPopup(auth, googleProvider);
  }

  /** Sign out */
  function logOut() {
    return signOut(auth);
  }

  /** Send password reset email */
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signUp, signIn, googleSignIn, logOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

/** Hook — use inside any component to get auth state and actions */
export function useAuth() {
  return useContext(AuthContext);
}

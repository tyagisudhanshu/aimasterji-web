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
  GoogleAuthProvider,
  linkWithCredential,
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
    // actionCodeSettings makes the verification link redirect back to the app
    const actionCodeSettings = {
      url: `${import.meta.env.VITE_SITE_URL || 'https://aimasterji.professorsai.org'}/dashboard`,
    };
    await sendEmailVerification(result.user, actionCodeSettings);
    return result;
  }

  /** Sign in with email + password */
  function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  /** Sign in with Google popup.
   * If the email already has a password account, throws the error with
   * `pendingCredential` attached so LoginPage can do account linking.
   */
  async function googleSignIn() {
    try {
      return await signInWithPopup(auth, googleProvider);
    } catch (err) {
      if (err.code === 'auth/account-exists-with-different-credential') {
        err.pendingCredential = GoogleAuthProvider.credentialFromError(err);
      }
      throw err;
    }
  }

  /** Link a pending Google credential to the currently signed-in user */
  async function linkGoogleCredential(pendingCredential) {
    return linkWithCredential(auth.currentUser, pendingCredential);
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
    <AuthContext.Provider value={{ user, isLoading, signUp, signIn, googleSignIn, linkGoogleCredential, logOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

/** Hook — use inside any component to get auth state and actions */
export function useAuth() {
  return useContext(AuthContext);
}

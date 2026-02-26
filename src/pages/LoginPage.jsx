// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Loader2, Mail, Lock, Chrome, AlertCircle, Link2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const { signIn, googleSignIn, linkGoogleCredential } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // If the user was sent here from a protected page, go back there after login
  const from = location.state?.from?.pathname || '/dashboard';

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  // Stored when Google detects an existing email/password account
  const [pendingGoogleCred, setPendingGoogleCred] = useState(null);

  // ── Email / Password Login ──────────────────────────────────────────────────
  async function handleEmailLogin(e) {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    try {
      await signIn(email, password);

      // If Google sign-in was attempted before and left a pending credential,
      // link it now so the user can use both methods going forward.
      if (pendingGoogleCred) {
        try {
          await linkGoogleCredential(pendingGoogleCred);
          toast.success('Google account linked! You can now use both sign-in methods.');
        } catch {
          // Already linked or minor error — not critical
        }
        setPendingGoogleCred(null);
      } else {
        toast.success('Welcome back!');
      }

      navigate(from, { replace: true });
    } catch (err) {
      const { message, isGoogleHint } = friendlyError(err.code);
      if (isGoogleHint) {
        setErrorMsg(message);
      } else {
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  }

  // ── Google Login ────────────────────────────────────────────────────────────
  async function handleGoogleLogin() {
    setErrorMsg('');
    setLoading(true);
    try {
      await googleSignIn();
      toast.success('Welcome back!');
      navigate(from, { replace: true });
    } catch (err) {
      if (err.code === 'auth/account-exists-with-different-credential') {
        // An email/password account already exists for this email.
        // Store the pending Google credential and guide the user to sign in
        // with their password — we'll link both accounts automatically after.
        setPendingGoogleCred(err.pendingCredential);
        setEmail(err.customData?.email || '');
        setErrorMsg(
          'This email already has a password account. Enter your password below to sign in and automatically link your Google account.'
        );
      } else if (err.code !== 'auth/popup-closed-by-user') {
        toast.error(friendlyError(err.code).message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 pt-20">

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-80 bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-zinc-900/80 backdrop-blur border border-zinc-800 p-10 rounded-3xl shadow-2xl relative z-10">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-black border border-zinc-700 rounded-2xl flex items-center justify-center text-white font-black text-xs leading-none mx-auto mb-4">
            AI<br />MAS
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome back</h1>
          <p className="text-gray-400 text-sm mt-1">Sign in to your AiMasterji account</p>
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-100 transition-all mb-6 disabled:opacity-60"
        >
          <Chrome size={18} />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="text-zinc-500 text-xs">or sign in with email</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        {/* Inline error / link-accounts banner */}
        {errorMsg && (
          <div className={`flex items-start gap-3 rounded-xl px-4 py-3 mb-4 border ${
            pendingGoogleCred
              ? 'bg-blue-500/10 border-blue-500/20'
              : 'bg-red-500/10 border-red-500/20'
          }`}>
            {pendingGoogleCred
              ? <Link2 size={15} className="text-blue-400 mt-0.5 shrink-0" />
              : <AlertCircle size={15} className="text-red-400 mt-0.5 shrink-0" />
            }
            <p className={`text-xs leading-relaxed ${pendingGoogleCred ? 'text-blue-300' : 'text-red-300'}`}>
              {errorMsg}
            </p>
          </div>
        )}

        {/* Email / Password Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrorMsg(''); }}
              required
              className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrorMsg(''); }}
              required
              className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <Link to="/forgot-password" className="text-xs text-zinc-500 hover:text-purple-400 transition-colors">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading
              ? <Loader2 size={18} className="animate-spin" />
              : pendingGoogleCred ? 'Sign In & Link Google Account' : 'Sign In'
            }
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-zinc-500 text-sm mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-purple-400 hover:text-purple-300 font-semibold">
            Sign up free
          </Link>
        </p>

      </div>
    </div>
  );
}

// Returns { message, isGoogleHint } so login can decide how to display it
function friendlyError(code) {
  if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
    return {
      message: 'No email/password account found. If you signed up with Google, use the "Continue with Google" button above. Otherwise check your password or reset it.',
      isGoogleHint: true,
    };
  }
  const map = {
    'auth/too-many-requests':      'Too many failed attempts. Please wait a few minutes or reset your password.',
    'auth/user-disabled':          'This account has been disabled. Contact support.',
    'auth/network-request-failed': 'Network error. Check your internet connection.',
  };
  return { message: map[code] || 'Something went wrong. Please try again.', isGoogleHint: false };
}
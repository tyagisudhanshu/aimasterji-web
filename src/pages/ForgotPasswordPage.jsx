// src/pages/ForgotPasswordPage.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();

  const [email, setEmail]     = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        // Don't reveal whether the email exists — show success anyway (security best practice)
        setSent(true);
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (err.code === 'auth/network-request-failed') {
        setError('Network error. Check your connection.');
      } else {
        setError('Something went wrong. Please try again.');
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

        <Link to="/login" className="flex items-center gap-2 text-zinc-500 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft size={15} /> Back to Sign In
        </Link>

        {sent ? (
          /* ── Success state ─────────────────────────────────────────── */
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={32} className="text-green-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">Check your email</h1>
            <p className="text-zinc-400 text-sm leading-relaxed mb-2">
              If an account exists for <span className="text-white font-semibold">{email}</span>, we've sent a password reset link.
            </p>
            <p className="text-zinc-600 text-xs mb-8">
              Don't see it? Check your spam folder.
            </p>
            <Link
              to="/login"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-3 rounded-xl transition-colors text-sm"
            >
              Back to Sign In
            </Link>
          </div>
        ) : (
          /* ── Form state ────────────────────────────────────────────── */
          <>
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-black border border-zinc-700 rounded-2xl flex items-center justify-center text-white font-black text-xs leading-none mx-auto mb-4">
                AI<br />MAS
              </div>
              <h1 className="text-2xl font-bold text-white">Forgot password?</h1>
              <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                Enter your email and we'll send you a link to reset your password.
              </p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-4">
                <p className="text-red-300 text-xs">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  required
                  className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : 'Send Reset Link'}
              </button>
            </form>

            <p className="text-center text-zinc-600 text-xs mt-6">
              Remembered it?{' '}
              <Link to="/login" className="text-purple-400 hover:text-purple-300">
                Sign in
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

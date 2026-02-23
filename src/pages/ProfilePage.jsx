// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft, User, Mail, Phone, MapPin, Save,
  Loader2, Pencil, CheckCircle2, Camera,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db, auth } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import toast from 'react-hot-toast';

const DEFAULT_PROFILE = {
  displayName: '',
  phone:       '',
  city:        '',
  state:       '',
  pincode:     '',
  address:     '',
};

// ── Skeleton ─────────────────────────────────────────────────────────────────
function ProfileSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="flex items-center gap-5">
        <div className="w-20 h-20 rounded-3xl bg-zinc-800" />
        <div className="space-y-2">
          <div className="h-5 w-40 bg-zinc-800 rounded" />
          <div className="h-3 w-32 bg-zinc-800 rounded" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-14 bg-zinc-900 rounded-2xl border border-zinc-800" />
        ))}
      </div>
    </div>
  );
}

// ── Field component ───────────────────────────────────────────────────────────
function Field({ icon: Icon, label, value, onChange, type = 'text', placeholder, readOnly = false }) {
  return (
    <div>
      <label className="text-zinc-500 text-[11px] uppercase tracking-wider mb-1.5 block">{label}</label>
      <div className="relative">
        <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          className={`w-full bg-zinc-800 border rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-zinc-600
            focus:outline-none transition-colors
            ${readOnly
              ? 'border-zinc-700/50 opacity-60 cursor-not-allowed'
              : 'border-zinc-700 focus:border-purple-500'}`}
        />
        {readOnly && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-zinc-600 bg-zinc-900 border border-zinc-700 px-2 py-0.5 rounded-full">
            locked
          </span>
        )}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving]     = useState(false);
  const [saved, setSaved]       = useState(false);

  // Load from Firestore
  useEffect(() => {
    if (!user) return;
    const ref = doc(db, 'users', user.uid);
    getDoc(ref)
      .then(snapshot => {
        const data = snapshot.exists() ? snapshot.data() : {};
        setProfile({
          displayName: user.displayName || '',
          phone:       data.phone    || '',
          city:        data.city     || '',
          state:       data.state    || '',
          pincode:     data.pincode  || '',
          address:     data.address  || '',
        });
      })
      .catch(() => {})
      .finally(() => setFetching(false));
  }, [user]);

  function set(field) {
    return (e) => setProfile(p => ({ ...p, [field]: e.target.value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      // Update Firebase Auth display name
      if (profile.displayName !== user.displayName) {
        await updateProfile(auth.currentUser, { displayName: profile.displayName });
      }
      // Save extra fields to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        phone:   profile.phone,
        city:    profile.city,
        state:   profile.state,
        pincode: profile.pincode,
        address: profile.address,
      }, { merge: true });

      toast.success('Profile saved!');
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      toast.error('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  if (isLoading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Loader2 size={28} className="text-white animate-spin" />
    </div>
  );
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  const initial  = (profile.displayName || user.email || 'U')[0].toUpperCase();

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">

        {/* Back link */}
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm mb-6 transition-colors">
          <ArrowLeft size={15} /> Dashboard
        </Link>

        <h1 className="text-2xl font-black text-white mb-1">My Profile</h1>
        <p className="text-zinc-500 text-sm mb-8">Manage your personal details and delivery address.</p>

        {fetching ? <ProfileSkeleton /> : (
          <form onSubmit={handleSave} className="space-y-6">

            {/* Avatar block */}
            <div className="flex items-center gap-5 bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
              <div className="relative shrink-0">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="avatar"
                    className="w-20 h-20 rounded-3xl object-cover border-2 border-purple-500/40" />
                ) : (
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-3xl font-black">
                    {initial}
                  </div>
                )}
                {user.photoURL && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-zinc-800 border border-zinc-700 rounded-full flex items-center justify-center">
                    <Camera size={11} className="text-zinc-400" />
                  </div>
                )}
              </div>
              <div>
                <p className="text-white font-bold text-lg">{profile.displayName || 'Your Name'}</p>
                <p className="text-zinc-500 text-sm">{user.email}</p>
                {user.emailVerified ? (
                  <span className="inline-flex items-center gap-1 text-green-400 text-xs mt-1">
                    <CheckCircle2 size={12} /> Email verified
                  </span>
                ) : (
                  <span className="text-yellow-500 text-xs mt-1 block">⚠ Email not verified</span>
                )}
              </div>
            </div>

            {/* Personal info */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
              <h2 className="text-white font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                <User size={14} className="text-purple-400" /> Personal Info
              </h2>
              <Field
                icon={User} label="Display Name" value={profile.displayName}
                onChange={set('displayName')} placeholder="Your full name"
              />
              <Field
                icon={Mail} label="Email Address" value={user.email}
                onChange={() => {}} readOnly
              />
              <Field
                icon={Phone} label="Phone Number" value={profile.phone}
                onChange={set('phone')} type="tel" placeholder="+91 98765 43210"
              />
            </div>

            {/* Delivery address */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
              <h2 className="text-white font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                <MapPin size={14} className="text-blue-400" /> Delivery Address
              </h2>
              <Field
                icon={MapPin} label="Street Address" value={profile.address}
                onChange={set('address')} placeholder="House no., street, area"
              />
              <div className="grid grid-cols-2 gap-4">
                <Field
                  icon={MapPin} label="City" value={profile.city}
                  onChange={set('city')} placeholder="Mumbai"
                />
                <Field
                  icon={MapPin} label="State" value={profile.state}
                  onChange={set('state')} placeholder="Maharashtra"
                />
              </div>
              <Field
                icon={MapPin} label="Pincode" value={profile.pincode}
                onChange={set('pincode')} placeholder="400001" type="text"
              />
            </div>

            {/* Save button */}
            <button
              type="submit"
              disabled={saving}
              className={`w-full font-bold py-3.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2
                ${saved
                  ? 'bg-green-600 text-white'
                  : 'bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-60'}`}
            >
              {saving ? (
                <><Loader2 size={16} className="animate-spin" /> Saving...</>
              ) : saved ? (
                <><CheckCircle2 size={16} /> Saved!</>
              ) : (
                <><Save size={16} /> Save Profile</>
              )}
            </button>

          </form>
        )}
      </div>
    </div>
  );
}

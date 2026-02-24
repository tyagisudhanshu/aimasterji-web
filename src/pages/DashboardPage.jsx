import React, { useState } from 'react';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import {
  Cpu, Loader2, LogOut, Wifi, BatteryFull, Activity,
  ShoppingBag, BookOpen, ChevronRight, Zap,
  Star, Package, HeadphonesIcon, MailWarning, RefreshCw,
  ClipboardList, UserCircle,
} from 'lucide-react';
import ProductSection from '../components/ProductSection';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase';

// Greeting based on time of day
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

const ROBOTS = [
  { name: 'Mimi',   role: 'Storyteller',  color: 'bg-pink-500',   status: 'online',  battery: 87, signal: 'Strong' },
  { name: 'Simba',  role: 'Coder',        color: 'bg-orange-500', status: 'online',  battery: 62, signal: 'Strong' },
  { name: 'Prince', role: 'Pro',          color: 'bg-purple-500', status: 'standby', battery: 34, signal: 'Weak'   },
];

const QUICK_ACTIONS = [
  { icon: Cpu,           label: 'Control Panel', to: '/console',  accent: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
  { icon: ClipboardList, label: 'Order History', to: '/orders',   accent: 'text-blue-400   bg-blue-500/10   border-blue-500/20'   },
  { icon: UserCircle,    label: 'My Profile',    to: '/profile',  accent: 'text-pink-400   bg-pink-500/10   border-pink-500/20'   },
  { icon: HeadphonesIcon,label: 'Support',       to: '/support',  accent: 'text-green-400  bg-green-500/10  border-green-500/20'  },
];

// ── Skeleton shown while auth state loads ─────────────────────────────────────
function DashboardSkeleton() {
  return (
    <div className="bg-black min-h-screen pt-24 pb-10 px-4 md:px-8 max-w-6xl mx-auto animate-pulse">
      {/* Top bar skeleton */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-zinc-800" />
          <div>
            <div className="h-3 w-20 bg-zinc-800 rounded mb-2" />
            <div className="h-6 w-40 bg-zinc-800 rounded mb-1" />
            <div className="h-3 w-32 bg-zinc-800 rounded" />
          </div>
        </div>
        <div className="h-9 w-28 bg-zinc-800 rounded-xl" />
      </div>
      {/* Stats row skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 h-24" />
        ))}
      </div>
      {/* Main grid skeleton */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 h-56" />
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 h-56" />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user, isLoading, logOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [resending, setResending] = useState(false);

  if (isLoading) return <DashboardSkeleton />;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  const displayName = user.displayName || user.email.split('@')[0];
  const initial     = displayName[0].toUpperCase();
  // Show verification banner only for email/password accounts that are unverified
  const needsVerification = !user.emailVerified &&
    user.providerData.some(p => p.providerId === 'password');

  async function handleResendVerification() {
    setResending(true);
    try {
      const actionCodeSettings = {
        url: `${import.meta.env.VITE_SITE_URL || 'https://aimasterji.professorsai.org'}/dashboard`,
      };
      await sendEmailVerification(auth.currentUser, actionCodeSettings);
      toast.success('Verification email sent! Check your inbox (and spam folder).');
    } catch {
      toast.error('Could not send email. Please wait a moment and try again.');
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="bg-black min-h-screen">

      {/* ── DASHBOARD HERO PANEL ──────────────────────────────────────────── */}
      <section className="pt-24 pb-10 px-4 md:px-8 max-w-6xl mx-auto">

        {/* Email verification banner */}
        {needsVerification && (
          <div className="flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl px-5 py-4 mb-6">
            <MailWarning size={18} className="text-yellow-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-yellow-300 text-sm font-semibold">Verify your email address</p>
              <p className="text-yellow-400/70 text-xs mt-0.5">
                We sent a verification link to <span className="font-bold">{user.email}</span>. Click it to unlock all features.
              </p>
            </div>
            <button
              onClick={handleResendVerification}
              disabled={resending}
              className="shrink-0 flex items-center gap-1.5 text-xs text-yellow-400 hover:text-yellow-300 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/20 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
            >
              {resending ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />}
              Resend
            </button>
          </div>
        )}

        {/* Top bar: greeting + logout */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            {user.photoURL ? (
              <img src={user.photoURL} alt="avatar"
                className="w-14 h-14 rounded-2xl object-cover border-2 border-purple-500/40 shadow-lg" />
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-2xl font-black shadow-lg">
                {initial}
              </div>
            )}
            <div>
              <p className="text-zinc-400 text-sm">{getGreeting()},</p>
              <h1 className="text-2xl font-black text-white leading-tight">{displayName}</h1>
              <p className="text-zinc-500 text-xs mt-0.5">{user.email}</p>
            </div>
          </div>

          <button
            onClick={() => { logOut(); navigate('/'); }}
            className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 px-4 py-2 rounded-xl transition-colors"
          >
            <LogOut size={15} /> Sign Out
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { label: 'Robots Online',  value: '2 / 3',   icon: Wifi,        accent: 'text-green-400'  },
            { label: 'Avg. Battery',   value: '61%',     icon: BatteryFull, accent: 'text-yellow-400' },
            { label: 'Activities',     value: '14 today',icon: Activity,    accent: 'text-blue-400'   },
            { label: 'Achievements',   value: '7 earned',icon: Star,        accent: 'text-pink-400'   },
          ].map(({ label, value, icon: Icon, accent }) => (
            <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col gap-1">
              <Icon size={18} className={accent} />
              <p className="text-white font-bold text-lg leading-tight">{value}</p>
              <p className="text-zinc-500 text-xs">{label}</p>
            </div>
          ))}
        </div>

        {/* Main grid: robots + quick actions */}
        <div className="grid md:grid-cols-3 gap-4">

          {/* ── Robot Status Cards ──────────────────────────────────────── */}
          <div className="md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold text-sm uppercase tracking-widest">Your Robots</h2>
              <Link to="/console" className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1">
                Open Panel <ChevronRight size={12} />
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {ROBOTS.map((robot) => (
                <div key={robot.name}
                  className="flex items-center justify-between bg-zinc-800/60 rounded-xl px-4 py-3 border border-zinc-700/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl ${robot.color} flex items-center justify-center text-white font-black text-xs shadow`}>
                      {robot.name[0]}
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{robot.name}</p>
                      <p className="text-zinc-500 text-xs">{robot.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <div className="hidden sm:flex items-center gap-1 text-zinc-400">
                      <BatteryFull size={13} className={robot.battery > 50 ? 'text-green-400' : 'text-yellow-400'} />
                      {robot.battery}%
                    </div>
                    <div className="hidden sm:flex items-center gap-1 text-zinc-400">
                      <Wifi size={13} className={robot.signal === 'Strong' ? 'text-green-400' : 'text-orange-400'} />
                      {robot.signal}
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border
                      ${robot.status === 'online'
                        ? 'bg-green-500/10 text-green-400 border-green-500/20'
                        : 'bg-zinc-700/50 text-zinc-400 border-zinc-600/30'}`}>
                      {robot.status === 'online' ? '● Online' : '◌ Standby'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Quick Actions ────────────────────────────────────────────── */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <h2 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Quick Actions</h2>
            <div className="flex flex-col gap-2">
              {QUICK_ACTIONS.map(({ icon: Icon, label, to, accent }) => (
                <Link key={label} to={to}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all hover:scale-[1.02] ${accent}`}>
                  <Icon size={16} />
                  <span className="text-white text-sm font-medium">{label}</span>
                  <ChevronRight size={14} className="ml-auto text-zinc-600" />
                </Link>
              ))}
            </div>

            {/* Promo nudge */}
            <div className="mt-4 bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Zap size={14} className="text-yellow-400" />
                <span className="text-white text-xs font-bold">Sale is LIVE!</span>
              </div>
              <p className="text-zinc-400 text-xs mb-3">Get up to 30% off on selected robots.</p>
              <Link to="/sale"
                className="text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1">
                <Package size={12} /> Shop Sale
              </Link>
            </div>
          </div>

        </div>
      </section>
      {/* ── END DASHBOARD PANEL ──────────────────────────────────────────── */}


      <ProductSection />
      
    </div>
  );
}
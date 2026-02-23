// src/pages/AdminDashboard.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Admin-only dashboard — view all orders, update order status
// Accessible at /admin  (only to VITE_ADMIN_EMAIL accounts)
// ─────────────────────────────────────────────────────────────────────────────
import React, { useState, useEffect } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import {
  ShieldAlert, Package, Clock, CheckCircle2, XCircle,
  Truck, Loader2, ChevronDown, ChevronUp, IndianRupee,
  ShoppingBag, BarChart3, RefreshCw, ArrowLeft,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import {
  collection, query, orderBy, onSnapshot,
  doc, updateDoc,
} from 'firebase/firestore';

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

// ── Status config ─────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  pending:    { label: 'Pending',    icon: Clock,        color: 'text-gray-400 bg-gray-500/10 border-gray-500/20'    },
  processing: { label: 'Processing', icon: Clock,        color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' },
  shipped:    { label: 'Shipped',    icon: Truck,        color: 'text-blue-400 bg-blue-500/10 border-blue-500/20'    },
  delivered:  { label: 'Delivered',  icon: CheckCircle2, color: 'text-green-400 bg-green-500/10 border-green-500/20' },
  cancelled:  { label: 'Cancelled',  icon: XCircle,      color: 'text-red-400 bg-red-500/10 border-red-500/20'      },
};

const ALL_STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="text-zinc-500 text-xs uppercase tracking-wider font-semibold">{label}</p>
        <p className="text-white text-2xl font-black mt-0.5">{value}</p>
      </div>
    </div>
  );
}

// ── Admin order card ──────────────────────────────────────────────────────────
function AdminOrderCard({ order, onStatusChange }) {
  const [expanded, setExpanded]     = useState(false);
  const [updating, setUpdating]     = useState(false);
  const [localStatus, setLocalStatus] = useState(order.status || 'pending');

  const cfg = STATUS_CONFIG[localStatus] || STATUS_CONFIG.pending;
  const StatusIcon = cfg.icon;

  const date = order.createdAt?.toDate
    ? order.createdAt.toDate().toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      })
    : '—';

  async function handleStatusChange(newStatus) {
    setUpdating(true);
    try {
      // Update top-level orders doc
      await updateDoc(doc(db, 'orders', order.id), { status: newStatus });

      // Also update user's subcollection doc if userId is known
      if (order.userId) {
        await updateDoc(doc(db, 'users', order.userId, 'orders', order.id), { status: newStatus })
          .catch(() => {}); // non-blocking if missing
      }

      setLocalStatus(newStatus);
      onStatusChange?.(order.id, newStatus);
    } catch (err) {
      console.error('Status update failed:', err);
    } finally {
      setUpdating(false);
    }
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between px-5 py-4 gap-3">
        {/* Left: order ID + customer */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center shrink-0">
            <Package size={18} className="text-purple-400" />
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold text-sm">
              {order.orderId || `#${order.id?.slice(-8).toUpperCase()}`}
            </p>
            <p className="text-zinc-500 text-xs mt-0.5 truncate max-w-[180px]">
              {order.customerName || 'Unknown'} · {order.customerEmail || '—'}
            </p>
            <p className="text-zinc-600 text-xs">{date}</p>
          </div>
        </div>

        {/* Right: status select + total + expand */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Status badge (readonly) */}
          <span className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${cfg.color}`}>
            <StatusIcon size={12} /> {cfg.label}
          </span>

          {/* Status dropdown */}
          <div className="relative">
            <select
              value={localStatus}
              onChange={e => handleStatusChange(e.target.value)}
              disabled={updating}
              className="appearance-none bg-zinc-800 border border-zinc-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg pr-7 focus:outline-none focus:border-purple-500 cursor-pointer disabled:opacity-60"
            >
              {ALL_STATUSES.map(s => (
                <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
              ))}
            </select>
            {updating
              ? <Loader2 size={12} className="absolute right-2 top-1/2 -translate-y-1/2 animate-spin text-purple-400" />
              : <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            }
          </div>

          <p className="text-white font-black text-base">₹{Number(order.total).toLocaleString('en-IN')}</p>

          <button
            onClick={() => setExpanded(v => !v)}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Expanded items */}
      {expanded && (
        <div className="border-t border-zinc-800 px-5 py-4 space-y-3">
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">
            Items ({order.items?.length || 0})
          </p>
          {order.items?.map((item, i) => (
            <div key={i} className="flex items-center gap-3 bg-zinc-800/50 rounded-xl px-3 py-2.5">
              {item.image && (
                <img src={item.image} alt={item.name}
                  className="w-10 h-10 object-contain bg-zinc-900 rounded-lg p-1 shrink-0" />
              )}
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{item.name}</p>
                <p className="text-zinc-500 text-xs">Qty: {item.quantity}</p>
              </div>
              <p className="text-purple-400 text-sm font-bold">
                ₹{(Number(item.price?.toString().replace(/[^0-9.]/g, '')) * item.quantity).toLocaleString('en-IN')}
              </p>
            </div>
          ))}

          {/* Price breakdown */}
          <div className="mt-3 pt-3 border-t border-zinc-800 space-y-1 text-sm">
            <div className="flex justify-between text-zinc-500">
              <span>Subtotal</span>
              <span>₹{Number(order.subtotal).toLocaleString('en-IN')}</span>
            </div>
            {order.coupon && (
              <div className="flex justify-between text-green-400">
                <span>Coupon ({order.coupon})</span>
                <span>− ₹{Number(order.discount).toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between text-white font-black pt-1 border-t border-zinc-800">
              <span>Total</span>
              <span>₹{Number(order.total).toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function AdminSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl h-24" />
        ))}
      </div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl h-20" />
      ))}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  const [orders, setOrders]     = useState([]);
  const [fetching, setFetching] = useState(true);
  const [filter, setFilter]     = useState('all');
  const [refreshKey, setRefreshKey] = useState(0);

  // Redirect if not logged in
  if (!isLoading && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Block non-admins
  if (!isLoading && user && ADMIN_EMAIL && user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center">
          <ShieldAlert size={28} className="text-red-400" />
        </div>
        <h1 className="text-2xl font-black">Access Denied</h1>
        <p className="text-zinc-500 text-sm max-w-xs">You don't have permission to view the admin panel.</p>
        <Link to="/" className="bg-white text-black font-bold px-6 py-3 rounded-xl text-sm mt-2">
          Go Home
        </Link>
      </div>
    );
  }

  // Real-time listener for all orders
  useEffect(() => {
    if (!user) return;
    setFetching(true);
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, snapshot => {
      setOrders(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      setFetching(false);
    }, () => setFetching(false));
    return () => unsub();
  }, [user, refreshKey]);

  if (isLoading || fetching) return (
    <div className="min-h-screen bg-black text-white pt-28 pb-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto"><AdminSkeleton /></div>
    </div>
  );

  // Stats
  const totalRevenue   = orders.reduce((s, o) => s + Number(o.total || 0), 0);
  const pendingCount   = orders.filter(o => o.status === 'pending' || o.status === 'processing').length;
  const deliveredCount = orders.filter(o => o.status === 'delivered').length;

  // Filtered orders
  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  const FILTER_TABS = [
    { key: 'all',       label: `All (${orders.length})` },
    { key: 'pending',   label: `Pending (${orders.filter(o => o.status === 'pending').length})` },
    { key: 'processing',label: `Processing (${orders.filter(o => o.status === 'processing').length})` },
    { key: 'shipped',   label: `Shipped (${orders.filter(o => o.status === 'shipped').length})` },
    { key: 'delivered', label: `Delivered (${orders.filter(o => o.status === 'delivered').length})` },
    { key: 'cancelled', label: `Cancelled (${orders.filter(o => o.status === 'cancelled').length})` },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <Link to="/dashboard" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm mb-3 transition-colors">
              <ArrowLeft size={15} /> Dashboard
            </Link>
            <h1 className="text-3xl font-black text-white">Admin Panel</h1>
            <p className="text-zinc-500 text-sm mt-1">Manage all customer orders</p>
          </div>
          <button
            onClick={() => setRefreshKey(k => k + 1)}
            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
          >
            <RefreshCw size={15} /> Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={ShoppingBag}
            label="Total Orders"
            value={orders.length}
            color="bg-purple-500/10 text-purple-400"
          />
          <StatCard
            icon={IndianRupee}
            label="Total Revenue"
            value={`₹${totalRevenue.toLocaleString('en-IN')}`}
            color="bg-green-500/10 text-green-400"
          />
          <StatCard
            icon={Clock}
            label="Pending / Active"
            value={pendingCount}
            color="bg-yellow-500/10 text-yellow-400"
          />
          <StatCard
            icon={CheckCircle2}
            label="Delivered"
            value={deliveredCount}
            color="bg-blue-500/10 text-blue-400"
          />
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {FILTER_TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                filter === tab.key
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-zinc-400 border-zinc-700 hover:border-zinc-500 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders list */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-zinc-900 border border-zinc-800 rounded-3xl flex items-center justify-center mb-5">
              <BarChart3 size={32} className="text-zinc-600" />
            </div>
            <h2 className="text-white font-bold text-xl mb-2">No orders yet</h2>
            <p className="text-zinc-500 text-sm">Orders will appear here once customers check out.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(order => (
              <AdminOrderCard key={order.id} order={order} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

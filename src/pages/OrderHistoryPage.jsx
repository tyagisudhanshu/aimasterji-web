// src/pages/OrderHistoryPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft, ShoppingBag, Package, Clock, CheckCircle2,
  XCircle, Loader2, ChevronDown, ChevronUp, Truck,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

// ── Status badge config ──────────────────────────────────────────────────────
const STATUS_CONFIG = {
  paid:       { label: 'Paid',       icon: CheckCircle2, color: 'text-green-400 bg-green-500/10 border-green-500/20'  },
  processing: { label: 'Processing', icon: Clock,        color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'},
  shipped:    { label: 'Shipped',    icon: Truck,        color: 'text-blue-400 bg-blue-500/10 border-blue-500/20'     },
  delivered:  { label: 'Delivered',  icon: CheckCircle2, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20'},
  cancelled:  { label: 'Cancelled',  icon: XCircle,      color: 'text-red-400 bg-red-500/10 border-red-500/20'        },
};

// ── Skeleton ─────────────────────────────────────────────────────────────────
function OrderSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 h-28" />
      ))}
    </div>
  );
}

// ── Single order card ─────────────────────────────────────────────────────────
function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.paid;
  const StatusIcon = cfg.icon;

  const date = order.createdAt?.toDate
    ? order.createdAt.toDate().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : '—';

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
      {/* Header row */}
      <div className="flex items-center justify-between px-5 py-4 gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center">
            <Package size={18} className="text-purple-400" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">Order #{order.orderId || order.id?.slice(-8).toUpperCase()}</p>
            <p className="text-zinc-500 text-xs mt-0.5">{date} · {order.items?.length || 0} item{order.items?.length !== 1 ? 's' : ''}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${cfg.color}`}>
            <StatusIcon size={12} /> {cfg.label}
          </span>
          <p className="text-white font-bold">₹{Number(order.total).toLocaleString('en-IN')}</p>
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
                ₹{Number(item.price?.toString().replace(/[^0-9.]/g, '')).toLocaleString('en-IN')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function OrderHistoryPage() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  const [orders, setOrders]     = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!user) return;
    const ref = collection(db, 'users', user.uid, 'orders');
    const q   = query(ref, orderBy('createdAt', 'desc'));
    getDocs(q)
      .then(snapshot => {
        setOrders(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      })
      .catch(() => {})
      .finally(() => setFetching(false));
  }, [user]);

  if (isLoading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Loader2 size={28} className="text-white animate-spin" />
    </div>
  );
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">

        {/* Back link */}
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm mb-6 transition-colors">
          <ArrowLeft size={15} /> Dashboard
        </Link>

        <h1 className="text-2xl font-black text-white mb-2">Order History</h1>
        <p className="text-zinc-500 text-sm mb-8">All your past purchases in one place.</p>

        {fetching ? (
          <OrderSkeleton />
        ) : orders.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-zinc-900 border border-zinc-800 rounded-3xl flex items-center justify-center mb-5">
              <ShoppingBag size={32} className="text-zinc-600" />
            </div>
            <h2 className="text-white font-bold text-xl mb-2">No orders yet</h2>
            <p className="text-zinc-500 text-sm mb-6 max-w-xs">
              Once you purchase a robot, your orders will appear here.
            </p>
            <Link
              to="/"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
            >
              Browse Robots
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

// src/pages/PaymentResultPage.jsx
// ─────────────────────────────────────────────────────────────────────────────
// CCAvenue redirects back here after payment.
// Query params: status (success / failed / cancelled), orderId, txnId, bankRef
// ─────────────────────────────────────────────────────────────────────────────
import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, XCircle, AlertTriangle, ArrowRight, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

export default function PaymentResultPage() {
  const [params]  = useSearchParams();
  const { user }  = useAuth();

  const status  = params.get('status')  || 'failed';
  const orderId = params.get('orderId') || '';
  const txnId   = params.get('txnId')   || '';
  const bankRef = params.get('bankRef') || '';

  // Update Firestore order status + notify admin after successful payment
  useEffect(() => {
    if (status === 'success' && orderId && user) {
      const newStatus = 'paid';
      // Update Firestore
      updateDoc(doc(db, 'orders', orderId), { status: newStatus, txnId, bankRef }).catch(() => {});
      updateDoc(doc(db, 'users', user.uid, 'orders', orderId), { status: newStatus, txnId, bankRef }).catch(() => {});

      // Send WhatsApp notification to admin with order details
      getDoc(doc(db, 'orders', orderId)).then(snap => {
        if (!snap.exists()) return;
        const order = snap.data();
        const adminWa = import.meta.env.VITE_ADMIN_WHATSAPP || '919310297919';
        const lines = (order.items || []).map(
          i => `  • ${i.name} x${i.quantity} = ₹${(Number(i.price?.toString().replace(/[^0-9.]/g,'')) * i.quantity).toLocaleString('en-IN')}`
        ).join('\n');
        const msg = [
          `🎉 *PAYMENT RECEIVED — AI Masterji*`,
          `Order: ${orderId}`,
          `Txn ID: ${txnId || '—'}`,
          `Customer: ${order.customerName} (${order.customerEmail})`,
          ``,
          lines,
          ``,
          `Total Paid: ₹${Number(order.total).toLocaleString('en-IN')}`,
          order.coupon ? `Coupon: ${order.coupon} (saved ₹${Number(order.discount).toLocaleString('en-IN')})` : '',
        ].filter(Boolean).join('\n');
        window.open(`https://wa.me/${adminWa}?text=${encodeURIComponent(msg)}`, '_blank');
      }).catch(() => {});
    }
  }, [status, orderId, user, txnId, bankRef]);

  // ── Success ──
  if (status === 'success') {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center">
        <div className="w-24 h-24 bg-green-500/10 border border-green-500/30 rounded-3xl flex items-center justify-center mb-6">
          <CheckCircle2 size={44} className="text-green-400" />
        </div>
        <h1 className="text-3xl font-black text-white mb-3">Payment Successful! 🎉</h1>
        <p className="text-zinc-400 text-base max-w-sm mb-6">
          Your order has been confirmed. We'll dispatch your robot soon!
        </p>

        {(txnId || bankRef || orderId) && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 mb-8 text-sm space-y-2 text-left w-full max-w-sm">
            {orderId  && <div className="flex justify-between"><span className="text-zinc-500">Order ID</span><span className="text-white font-bold">{orderId}</span></div>}
            {txnId    && <div className="flex justify-between"><span className="text-zinc-500">Transaction ID</span><span className="text-white font-mono text-xs">{txnId}</span></div>}
            {bankRef  && <div className="flex justify-between"><span className="text-zinc-500">Bank Ref</span><span className="text-white font-mono text-xs">{bankRef}</span></div>}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/orders"
            className="flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-xl text-sm hover:bg-gray-200 transition-colors"
          >
            View My Orders <ArrowRight size={16} />
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 bg-zinc-800 border border-zinc-700 text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-zinc-700 transition-colors"
          >
            <Home size={16} /> Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // ── Cancelled ──
  if (status === 'cancelled') {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center">
        <div className="w-24 h-24 bg-yellow-500/10 border border-yellow-500/30 rounded-3xl flex items-center justify-center mb-6">
          <AlertTriangle size={44} className="text-yellow-400" />
        </div>
        <h1 className="text-3xl font-black text-white mb-3">Payment Cancelled</h1>
        <p className="text-zinc-400 text-base max-w-sm mb-8">
          You cancelled the payment. Your order is saved — you can retry anytime.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/cart"
            className="flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-xl text-sm hover:bg-gray-200 transition-colors"
          >
            Go Back to Cart <ArrowRight size={16} />
          </Link>
          <Link
            to="/orders"
            className="flex items-center gap-2 bg-zinc-800 border border-zinc-700 text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-zinc-700 transition-colors"
          >
            My Orders
          </Link>
        </div>
      </div>
    );
  }

  // ── Failed (default) ──
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center">
      <div className="w-24 h-24 bg-red-500/10 border border-red-500/30 rounded-3xl flex items-center justify-center mb-6">
        <XCircle size={44} className="text-red-400" />
      </div>
      <h1 className="text-3xl font-black text-white mb-3">Payment Failed</h1>
      <p className="text-zinc-400 text-base max-w-sm mb-8">
        Something went wrong with the payment. Please try again or contact support.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          to="/cart"
          className="flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-xl text-sm hover:bg-gray-200 transition-colors"
        >
          Try Again <ArrowRight size={16} />
        </Link>
        <Link
          to="/support"
          className="flex items-center gap-2 bg-zinc-800 border border-zinc-700 text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-zinc-700 transition-colors"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}

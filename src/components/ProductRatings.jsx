// src/components/ProductRatings.jsx
// Firestore-backed star ratings + reviews for each product.
// Anonymous users can read; only logged-in users can submit.

import React, { useState, useEffect } from 'react';
import { Star, Send, Loader2, User } from 'lucide-react';
import { db } from '../firebase';
import {
  collection, addDoc, getDocs, query, orderBy,
  serverTimestamp, where,
} from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

// ── Star row (interactive or display) ────────────────────────────────────────
function Stars({ value, onChange, size = 20 }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          onClick={() => onChange?.(n)}
          onMouseEnter={() => onChange && setHovered(n)}
          onMouseLeave={() => onChange && setHovered(0)}
          className={onChange ? 'cursor-pointer' : 'cursor-default pointer-events-none'}
        >
          <Star
            size={size}
            className={
              n <= (hovered || value)
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-zinc-600'
            }
          />
        </button>
      ))}
    </div>
  );
}

// ── Average stars display ─────────────────────────────────────────────────────
function AverageStars({ average, count }) {
  const full    = Math.floor(average);
  const partial = average % 1;
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map(n => (
          <Star
            key={n}
            size={16}
            className={
              n <= full
                ? 'text-yellow-400 fill-yellow-400'
                : n === full + 1 && partial >= 0.5
                ? 'text-yellow-400 fill-yellow-400/50'
                : 'text-zinc-600'
            }
          />
        ))}
      </div>
      <span className="text-white font-bold text-sm">{average.toFixed(1)}</span>
      <span className="text-zinc-500 text-xs">({count} {count === 1 ? 'review' : 'reviews'})</span>
    </div>
  );
}

export default function ProductRatings({ productId, productName }) {
  const { user } = useAuth();

  const [reviews, setReviews]       = useState([]);
  const [loading, setLoading]       = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);

  const [rating, setRating]   = useState(0);
  const [comment, setComment] = useState('');

  // ── Fetch reviews ────────────────────────────────────────────────────────
  useEffect(() => {
    const ref = collection(db, 'products', String(productId), 'reviews');
    const q   = query(ref, orderBy('createdAt', 'desc'));
    getDocs(q).then(snapshot => {
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setReviews(data);
      if (user) {
        setHasReviewed(data.some(r => r.userId === user.uid));
      }
    }).catch(() => {}).finally(() => setLoading(false));
  }, [productId, user]);

  // ── Submit review ─────────────────────────────────────────────────────────
  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) { toast.error('Please sign in to leave a review.'); return; }
    if (rating === 0) { toast.error('Please select a star rating.'); return; }
    if (hasReviewed) { toast.error('You have already reviewed this product.'); return; }

    setSubmitting(true);
    try {
      const ref = collection(db, 'products', String(productId), 'reviews');
      const newReview = {
        userId:      user.uid,
        userName:    user.displayName || user.email.split('@')[0],
        userPhoto:   user.photoURL || null,
        rating,
        comment:     comment.trim(),
        createdAt:   serverTimestamp(),
      };
      const docRef = await addDoc(ref, newReview);
      setReviews(prev => [{ id: docRef.id, ...newReview, createdAt: { toDate: () => new Date() } }, ...prev]);
      setHasReviewed(true);
      setRating(0);
      setComment('');
      toast.success('Review submitted! Thank you.');
    } catch {
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const average = reviews.length
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="mt-16 border-t border-zinc-800 pt-12">
      <div className="container mx-auto px-6 max-w-4xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h2 className="text-2xl font-black text-white">Customer Reviews</h2>
            {reviews.length > 0 && <div className="mt-1"><AverageStars average={average} count={reviews.length} /></div>}
          </div>
        </div>

        {/* Write a review */}
        {user && !hasReviewed && (
          <form onSubmit={handleSubmit}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-8">
            <h3 className="text-white font-bold mb-4">Write a Review for {productName}</h3>
            <div className="mb-4">
              <p className="text-zinc-500 text-xs uppercase tracking-wider mb-2">Your Rating</p>
              <Stars value={rating} onChange={setRating} size={28} />
            </div>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Share your experience with this robot toy…"
              rows={3}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition-colors resize-none mb-4"
            />
            <button
              type="submit"
              disabled={submitting || rating === 0}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
            >
              {submitting ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
              Submit Review
            </button>
          </form>
        )}

        {!user && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-8 text-center">
            <p className="text-zinc-400 text-sm">
              <a href="/login" className="text-purple-400 hover:underline font-semibold">Sign in</a> to leave a review.
            </p>
          </div>
        )}

        {hasReviewed && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 mb-8 text-center">
            <p className="text-green-400 text-sm font-medium">✓ You have already reviewed this product. Thank you!</p>
          </div>
        )}

        {/* Reviews list */}
        {loading ? (
          <div className="space-y-3 animate-pulse">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-24 bg-zinc-900 rounded-2xl border border-zinc-800" />
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-10 text-zinc-600">
            <Star size={32} className="mx-auto mb-3 opacity-30" />
            <p>No reviews yet. Be the first to review {productName}!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map(review => {
              const date = review.createdAt?.toDate?.()
                ?.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) || '';
              return (
                <div key={review.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                  <div className="flex items-start gap-3 mb-3">
                    {review.userPhoto ? (
                      <img src={review.userPhoto} alt={review.userName}
                        className="w-9 h-9 rounded-full object-cover shrink-0" />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-purple-600/30 border border-purple-500/30 flex items-center justify-center shrink-0">
                        <User size={15} className="text-purple-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <p className="text-white font-semibold text-sm">{review.userName}</p>
                        <p className="text-zinc-600 text-xs">{date}</p>
                      </div>
                      <Stars value={review.rating} size={14} />
                    </div>
                  </div>
                  {review.comment && (
                    <p className="text-zinc-300 text-sm leading-relaxed">{review.comment}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}

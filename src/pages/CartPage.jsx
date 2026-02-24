import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, Tag, X, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

// ── Valid coupon codes ───────────────────────────────────────────────────────
const COUPONS = {
  'WELCOME10': { type: 'percent', value: 10,  label: '10% off your first order'  },
  'SAVE20':    { type: 'percent', value: 20,  label: '20% off'                    },
  'FLAT500':   { type: 'flat',    value: 500, label: '₹500 flat off'               },
  'LAUNCH50':  { type: 'percent', value: 50,  label: '50% off — launch special'   },
};

function calcDiscount(coupon, subtotal) {
  if (!coupon) return 0;
  const c = COUPONS[coupon];
  if (!c) return 0;
  if (c.type === 'percent') return Math.round(subtotal * c.value / 100);
  return Math.min(c.value, subtotal);
}

export default function CartPage() {
  const { cartItems, addToCart, decreaseQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponError, setCouponError]     = useState('');

  const subtotal = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price.toString().replace(/[^0-9.]/g, ''));
    return total + price * item.quantity;
  }, 0);

  const discount   = calcDiscount(appliedCoupon, subtotal);
  const finalTotal = subtotal - discount;

  function applyCoupon() {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    if (COUPONS[code]) {
      setAppliedCoupon(code);
      setCouponError('');
      setCouponInput('');
      toast.success(`Coupon "${code}" applied — ${COUPONS[code].label}!`);
    } else {
      setCouponError('Invalid coupon code. Please try again.');
    }
  }

  function removeCoupon() {
    setAppliedCoupon('');
    setCouponError('');
    setCouponInput('');
  }

  function handleCheckout() {
    if (!user) {
      toast.error('Please sign in to place an order.');
      navigate('/login');
      return;
    }
    
    // Navigate to checkout with order summary data
    navigate('/checkout', {
      state: {
        subtotal,
        discount,
        coupon: appliedCoupon,
      },
    });
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center pt-20">
        <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-400 mb-8">It looks like you haven't chosen a companion yet.</p>
        <Link to="/" className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200">
          Browse Toys
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold mb-10">Your Cart</h1>

        <div className="grid md:grid-cols-5 gap-6">

          {/* ── Cart items ── */}
          <div className="md:col-span-3 bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden p-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between border-b border-zinc-800 py-6 last:border-0 gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="w-20 h-20 bg-zinc-800 rounded-lg overflow-hidden p-2">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{item.name}</h3>
                    <p className="text-purple-400">₹{item.price.toString().replace(/[^0-9.]/g, '')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center bg-black border border-zinc-700 rounded-lg">
                    <button onClick={() => decreaseQuantity(item.id)} className="p-2 hover:text-purple-500"><Minus size={16}/></button>
                    <span className="w-8 text-center font-bold">{item.quantity}</span>
                    <button onClick={() => addToCart(item)} className="p-2 hover:text-purple-500"><Plus size={16}/></button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-500 transition-colors">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ── Order summary sidebar ── */}
          <div className="md:col-span-2 flex flex-col gap-4">

            {/* Coupon code */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5">
              <h3 className="text-white font-bold flex items-center gap-2 mb-3">
                <Tag size={15} className="text-yellow-400" /> Coupon Code
              </h3>

              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-green-500/10 border border-green-500/20 rounded-xl px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-green-400 shrink-0" />
                    <div>
                      <p className="text-green-300 font-bold text-sm">{appliedCoupon}</p>
                      <p className="text-green-400/70 text-xs">{COUPONS[appliedCoupon]?.label}</p>
                    </div>
                  </div>
                  <button onClick={removeCoupon} className="text-zinc-500 hover:text-red-400 transition-colors">
                    <X size={15} />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={e => { setCouponInput(e.target.value.toUpperCase()); setCouponError(''); }}
                      onKeyDown={e => e.key === 'Enter' && applyCoupon()}
                      placeholder="Enter code"
                      className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-500 transition-colors uppercase tracking-wider"
                    />
                    <button
                      onClick={applyCoupon}
                      className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-4 py-2 rounded-xl text-sm transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-red-400 text-xs mt-1.5">{couponError}</p>
                  )}
                  <p className="text-zinc-600 text-xs mt-2">Try: WELCOME10 · SAVE20 · FLAT500</p>
                </>
              )}
            </div>

            {/* Price breakdown */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-400 font-medium">
                    <span>Discount ({appliedCoupon})</span>
                    <span>− ₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-400">
                  <span>Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="border-t border-zinc-800 pt-3 mt-3 flex justify-between text-white font-black text-lg">
                  <span>Total</span>
                  <span>₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="mt-5 w-full bg-white text-black font-bold px-8 py-4 rounded-full hover:bg-gray-200 flex items-center justify-center gap-2 transition-colors"
              >
                Proceed to Checkout <ArrowRight size={18} />
              </button>
              <p className="text-zinc-600 text-xs text-center mt-3">🔒 Secured by CCAvenue · 256-bit SSL</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
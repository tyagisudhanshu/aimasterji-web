import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Loader2, ArrowLeft, ShoppingBag, Tag, X, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { sendOrderEmail } from '../utils/notifications';
import { db } from '../firebase';
import { doc, collection, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

// â”€â”€ Valid coupon codes â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const COUPONS = {
  WELCOME10: { type: 'percent', value: 10,  label: '10% off your first order'  },
  SAVE20:    { type: 'percent', value: 20,  label: '20% off'                    },
  FLAT500:   { type: 'flat',    value: 500, label: 'â‚¹500 flat off'               },
  LAUNCH50:  { type: 'percent', value: 50,  label: '50% off â€” launch special'   },
};

function calcDiscount(coupon, subtotal) {
  if (!coupon) return 0;
  const c = COUPONS[coupon];
  if (!c) return 0;
  if (c.type === 'percent') return Math.round(subtotal * c.value / 100);
  return Math.min(c.value, subtotal);
}

function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);

  // Address form state
  const [address, setAddress] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
  });

  // Coupon state â€” managed entirely in checkout
  const [couponInput, setCouponInput]     = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponError, setCouponError]     = useState('');

  // Items â€” single buyNow item (from Product page) OR full cart
  const buyNowItem    = location.state?.buyNowItem || null;
  const checkoutItems = buyNowItem ? [buyNowItem] : cartItems;

  // Live price calculation
  const subtotal   = checkoutItems.reduce((sum, item) => {
    const price = parseFloat(item.price.toString().replace(/[^0-9.]/g, ''));
    return sum + price * item.quantity;
  }, 0);
  const discount   = calcDiscount(appliedCoupon, subtotal);
  const finalTotal = subtotal - discount;

  // Load user data & saved address
  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }
    setAddress(prev => ({ ...prev, fullName: user.displayName || '', email: user.email }));
    loadSavedAddress();
    setLoading(false);
  }, [user]); // eslint-disable-line

  async function loadSavedAddress() {
    if (!user) return;
    try {
      const snap = await getDoc(doc(db, 'users', user.uid));
      if (snap.exists() && snap.data().address) {
        setAddress(prev => ({ ...prev, ...snap.data().address }));
      }
    } catch (err) {
      console.error('Error loading address:', err);
    }
  }

  function handleAddressChange(e) {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  }

  // â”€â”€ Coupon handlers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  function applyCoupon() {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    if (COUPONS[code]) {
      setAppliedCoupon(code);
      setCouponError('');
      setCouponInput('');
      toast.success(`Coupon "${code}" applied â€” ${COUPONS[code].label}!`);
    } else {
      setCouponError('Invalid coupon code. Please try again.');
    }
  }

  function removeCoupon() {
    setAppliedCoupon('');
    setCouponError('');
    setCouponInput('');
  }

  // â”€â”€ Place order â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  async function handlePlaceOrder() {
    if (!address.fullName || !address.phone || !address.street || !address.city || !address.state || !address.zipCode) {
      toast.error('Please fill in all required address fields.');
      return;
    }
    if (!/^\d{10}$/.test(address.phone)) {
      toast.error('Phone number must be exactly 10 digits.');
      return;
    }
    if (checkoutItems.length === 0) {
      toast.error('No items to order.');
      return;
    }

    setPlacing(true);
    try {
      const orderRef = doc(collection(db, 'orders'));
      const orderId  = orderRef.id;

      const orderData = {
        orderId,
        userId:        user.uid,
        customerName:  address.fullName,
        customerEmail: address.email,
        phone:         address.phone,
        address: {
          street:  address.street,
          city:    address.city,
          state:   address.state,
          zipCode: address.zipCode,
          country: address.country,
        },
        items: checkoutItems.map(i => ({
          id:       i.id,
          name:     i.name,
          price:    i.price,
          quantity: i.quantity,
          image:    i.image || '',
        })),
        subtotal,
        coupon:   appliedCoupon || null,
        discount,
        total:    finalTotal,
        status:   'pending',
        createdAt: serverTimestamp(),
      };

      await setDoc(orderRef, orderData);
      await setDoc(doc(db, 'users', user.uid, 'orders', orderId), orderData);

      // Save address for future orders
      await setDoc(doc(db, 'users', user.uid), {
        address: {
          fullName: address.fullName,
          phone:    address.phone,
          street:   address.street,
          city:     address.city,
          state:    address.state,
          zipCode:  address.zipCode,
          country:  address.country,
        },
      }, { merge: true });

      // Send confirmation email
      await sendOrderEmail({
        user,
        cartItems:  checkoutItems,
        subtotal,
        coupon:     appliedCoupon,
        discount,
        finalTotal,
      }).catch(() => {});

      // CCAvenue payment
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
      let payData = null;
      try {
        const payRes = await fetch(`${backendUrl}/api/payment/initiate`, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId,
            amount:        finalTotal,
            customerName:  address.fullName,
            customerEmail: address.email,
          }),
        });
        if (payRes.ok) payData = await payRes.json();
        else console.warn('CCAvenue error:', await payRes.json().catch(() => ({})));
      } catch (e) {
        console.warn('Backend unreachable:', e.message);
      }

      // Clear cart only if this was a cart checkout (not Buy Now)
      if (!buyNowItem) clearCart();

      if (payData?.encRequest && payData?.access_code) {
        const form = document.createElement('form');
        form.method = 'post';
        form.action = payData.ccavenue_url;
        [['encRequest', payData.encRequest], ['access_code', payData.access_code]].forEach(([n, v]) => {
          const inp = document.createElement('input');
          inp.type = 'hidden'; inp.name = n; inp.value = v;
          form.appendChild(inp);
        });
        document.body.appendChild(form);
        form.submit();
        return;
      }

      toast.success('Order placed! We will contact you to complete payment.');
      navigate('/orders');
    } catch (err) {
      console.error('Checkout error:', err);
      toast.error(`Checkout failed: ${err.message || 'Unknown error'}`);
    } finally {
      setPlacing(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center pt-20">
        <Loader2 size={40} className="animate-spin text-purple-500" />
      </div>
    );
  }
  if (!user) return null;

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-20">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(buyNowItem ? -1 : '/cart')}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-4 transition-colors"
          >
            <ArrowLeft size={18} /> {buyNowItem ? 'Back to Product' : 'Back to Cart'}
          </button>
          <h1 className="text-4xl font-bold">Checkout</h1>
          <p className="text-zinc-400 mt-2">Complete your order by entering your details</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {/* â”€â”€ Address Form â”€â”€ */}
          <div className="md:col-span-2">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <MapPin size={24} className="text-purple-500" />
                Delivery Address
              </h2>
              <div className="space-y-5">

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Full Name *</label>
                  <input type="text" name="fullName" value={address.fullName} onChange={handleAddressChange}
                    placeholder="Enter your full name"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition-colors" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Email *</label>
                  <input type="email" name="email" value={address.email} onChange={handleAddressChange}
                    placeholder="your@email.com"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition-colors" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Phone Number (10 digits) *</label>
                  <input type="tel" name="phone" value={address.phone} onChange={handleAddressChange}
                    placeholder="9876543210" maxLength="10"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition-colors" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Street Address *</label>
                  <input type="text" name="street" value={address.street} onChange={handleAddressChange}
                    placeholder="House no., building name, area"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition-colors" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">City *</label>
                  <input type="text" name="city" value={address.city} onChange={handleAddressChange}
                    placeholder="Enter your city"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition-colors" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">State *</label>
                    <input type="text" name="state" value={address.state} onChange={handleAddressChange}
                      placeholder="Enter state"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Zip Code *</label>
                    <input type="text" name="zipCode" value={address.zipCode} onChange={handleAddressChange}
                      placeholder="123456"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Country</label>
                  <input type="text" name="country" value={address.country} disabled
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-500 cursor-not-allowed" />
                </div>

              </div>
            </div>
          </div>

          {/* â”€â”€ Right Panel â”€â”€ */}
          <div className="flex flex-col gap-4">

            {/* Order Items */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <ShoppingBag size={20} className="text-purple-500" />
                Order Items
              </h3>
              <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
                {checkoutItems.map((item) => {
                  const price = parseFloat(item.price.toString().replace(/[^0-9.]/g, ''));
                  return (
                    <div key={item.id} className="flex gap-3 pb-4 border-b border-zinc-800 last:border-0">
                      <div className="w-14 h-14 bg-zinc-800 rounded-lg overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{item.name}</p>
                        <p className="text-xs text-zinc-400">Qty: {item.quantity}</p>
                        <p className="text-purple-400 font-bold text-sm">₹{(price * item.quantity).toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* â”€â”€ Coupon Code â”€â”€ */}
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
                  {couponError && <p className="text-red-400 text-xs mt-1.5">{couponError}</p>}
                  <p className="text-zinc-600 text-xs mt-2">Try: WELCOME10 · SAVE20 · FLAT500</p>
                </>
              )}
            </div>

            {/* â”€â”€ Price Summary â”€â”€ */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h3 className="font-bold mb-4">Price Summary</h3>
              <div className="space-y-2 text-sm mb-5">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal ({checkoutItems.length} item{checkoutItems.length !== 1 ? 's' : ''})</span>
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
                onClick={handlePlaceOrder}
                disabled={placing}
                className="w-full bg-white text-black font-bold px-8 py-4 rounded-full hover:bg-gray-200 flex items-center justify-center gap-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {placing
                  ? <><Loader2 size={18} className="animate-spin" /> Processing...</>
                  : 'Proceed to Payment'}
              </button>

              <p className="text-zinc-600 text-xs text-center mt-3">🔒 Secured by CCAvenue · 256-bit SSL</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;

// src/utils/notifications.js
// ─────────────────────────────────────────────────────────────────────────────
// Order notification utilities:
//   1. sendOrderEmail   — EmailJS order confirmation to customer
//   2. notifyAdminWhatsApp — Opens WhatsApp with order summary for admin
// ─────────────────────────────────────────────────────────────────────────────

import emailjs from '@emailjs/browser';

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ORDER;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const ADMIN_WA    = import.meta.env.VITE_ADMIN_WHATSAPP || '918882564994';

/**
 * Send order confirmation email to customer via EmailJS.
 * EmailJS template variables used:
 *   {{to_name}}         — customer display name
 *   {{to_email}}        — customer email (EmailJS "To Email" field)
 *   {{order_items}}     — formatted list of items
 *   {{order_total}}     — subtotal before discount
 *   {{coupon_code}}     — coupon code applied (or "None")
 *   {{discount_amount}} — amount saved
 *   {{final_total}}     — total after discount
 */
export async function sendOrderEmail({ user, cartItems, subtotal, coupon, discount, finalTotal }) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn('EmailJS credentials not set. Skipping email.');
    return;
  }

  const itemsText = cartItems
    .map(i => `• ${i.name} × ${i.quantity}  —  ₹${Number(i.price.toString().replace(/[^0-9.]/g, '')) * i.quantity}`)
    .join('\n');

  const templateParams = {
    to_name:         user.displayName || user.email.split('@')[0],
    to_email:        user.email,
    order_items:     itemsText,
    order_total:     `₹${subtotal.toLocaleString('en-IN')}`,
    coupon_code:     coupon || 'None',
    discount_amount: discount > 0 ? `₹${discount.toLocaleString('en-IN')}` : '—',
    final_total:     `₹${finalTotal.toLocaleString('en-IN')}`,
  };

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
}

/**
 * Open WhatsApp for admin with a formatted order notification.
 * This fires in a new tab so the customer page is not disrupted.
 */
export function notifyAdminWhatsApp({ user, cartItems, finalTotal, coupon, discount }) {
  const name    = user?.displayName || user?.email || 'Guest';
  const email   = user?.email || '—';

  const lines = cartItems.map(
    i => `  • ${i.name} × ${i.quantity}  =  ₹${(Number(i.price.toString().replace(/[^0-9.]/g, '')) * i.quantity).toLocaleString('en-IN')}`
  ).join('\n');

  const couponLine = coupon ? `\nCoupon: ${coupon}  (saved ₹${discount.toLocaleString('en-IN')})` : '';

  const message =
`🛒 *New Order — AiMasterji*

👤 Customer: ${name}
📧 Email: ${email}

📦 Items:
${lines}
${couponLine}

💰 *Total: ₹${finalTotal.toLocaleString('en-IN')}*

Please contact the customer to complete payment via CCAvenue.`;

  window.open(
    `https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(message)}`,
    '_blank'
  );
}

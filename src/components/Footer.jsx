import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-zinc-900 text-sm">

      <div className="container mx-auto px-6 pt-12 pb-0">

        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">

          {/* LOGO COLUMN */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-flex items-center gap-1 mb-4">
              <span className="text-xl font-black tracking-tighter text-white">AI</span>
              <span className="text-xl font-black tracking-tighter text-red-500">masterji</span>
            </Link>
            <p className="text-zinc-600 text-xs leading-relaxed">India's First AI Robotics Brand</p>
          </div>

          {/* SHOP */}
          <div>
            <h4 className="text-white font-bold mb-5 text-xs uppercase tracking-widest">Shop</h4>
            <ul className="space-y-3 text-zinc-500">
              <li><Link to="/product/1" className="hover:text-white transition-colors">Mimi — Starter</Link></li>
              <li><Link to="/product/2" className="hover:text-white transition-colors">Simba — Code</Link></li>
              <li><Link to="/product/4" className="hover:text-white transition-colors">Prince — Pro</Link></li>
              <li><Link to="/cart" className="hover:text-white transition-colors">My Cart</Link></li>
              <li><Link to="/orders" className="hover:text-white transition-colors">My Orders</Link></li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="text-white font-bold mb-5 text-xs uppercase tracking-widest">Company</h4>
            <ul className="space-y-3 text-zinc-500">
              <li><Link to="/why-aimasterji" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/try-it-out" className="hover:text-white transition-colors">AI Lab</Link></li>
              <li><Link to="/sale" className="hover:text-white transition-colors">Offers &amp; Sale</Link></li>
              <li><Link to="/support" className="hover:text-white transition-colors">Support</Link></li>
              <li><a href="mailto:ai.masterji@aalgorix.com" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* POLICIES */}
          <div>
            <h4 className="text-white font-bold mb-5 text-xs uppercase tracking-widest">Policies</h4>
            <ul className="space-y-3 text-zinc-500">
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="hover:text-white transition-colors">Terms &amp; Conditions</Link></li>
              <li><Link to="/refund-policy" className="hover:text-white transition-colors">Refund &amp; Cancellation</Link></li>
              <li><Link to="/return-policy" className="hover:text-white transition-colors">Return Policy</Link></li>
              <li><Link to="/shipping-policy" className="hover:text-white transition-colors">Shipping Policy</Link></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-white font-bold mb-5 text-xs uppercase tracking-widest">Get in Touch</h4>
            <ul className="space-y-4 text-zinc-500">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-zinc-600 mt-0.5 shrink-0" />
                <span>Tower A 4th Floor, Business Vision Park, Knowledge Park 3, Greater Noida — 201310</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-zinc-600 shrink-0" />
                <a href="mailto:ai.masterji@aalgorix.com" className="hover:text-white transition-colors break-all">ai.masterji@aalgorix.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-zinc-600 shrink-0" />
                <a href="tel:+919310297919" className="hover:text-white transition-colors">+91 93102 97919</a>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-5">
          
          <p className="text-zinc-600 text-xs">
            © {new Date().getFullYear()} AI Masterji · Aalgorix Technologies Pvt. Ltd. · All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="text-zinc-600 hover:text-pink-400 transition-colors" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noreferrer" className="text-zinc-600 hover:text-red-500 transition-colors" aria-label="YouTube">
              <Youtube size={18} />
            </a>
            <a href="mailto:ai.masterji@aalgorix.com" className="text-zinc-600 hover:text-purple-400 transition-colors" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>

        </div>
      </div>

    </footer>
  );
}
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Heart, Mic } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-zinc-900 pt-16 pb-8 text-sm">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* COLUMN 1: BRAND */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center text-2xl font-black tracking-tighter mb-4">
               <span className="text-white">AI</span> 
               <span className="text-red-600">masterji</span>
            </div>
            <p className="text-zinc-500 mb-6 max-w-sm">
              Empowering the next generation of innovators with AI companions that teach, play, and grow with you.
            </p>
            
            {/* ELEVENLABS INTEGRATION BADGE */}
            <a href="https://elevenlabs.io" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 hover:border-zinc-700 transition-colors group">
              <div className="w-8 h-8 flex items-center justify-center bg-black rounded-full border border-zinc-800">
                <Mic size={14} className="text-white group-hover:text-purple-500 transition-colors" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Voice Technology by</span>
                <span className="text-white font-bold group-hover:text-purple-400 transition-colors">ElevenLabs</span>
              </div>
            </a>
          </div>

          {/* COLUMN 2: SHOP */}
          <div>
            <h4 className="text-white font-bold mb-4">Shop</h4>
            <ul className="space-y-3 text-zinc-500">
              <li><Link to="/product/1" className="hover:text-white transition-colors">Mimi (Starter)</Link></li>
              <li><Link to="/product/2" className="hover:text-white transition-colors">Simba (Code)</Link></li>
              <li><Link to="/product/4" className="hover:text-white transition-colors">Prince (Pro)</Link></li>
              <li><Link to="/cart" className="hover:text-white transition-colors">My Cart</Link></li>
            </ul>
          </div>

          {/* COLUMN 3: LEGAL & SUPPORT */}
          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-3 text-zinc-500">
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><a href="mailto:support@professorsai.org" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600">© 2026 AiMasterji. All rights reserved.</p>
          
          <div className="flex gap-4">
            <a href="#" className="text-zinc-600 hover:text-white transition-colors"><Facebook size={20} /></a>
            <a href="#" className="text-zinc-600 hover:text-white transition-colors"><Twitter size={20} /></a>
            <a href="#" className="text-zinc-600 hover:text-white transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-zinc-600 hover:text-white transition-colors"><Youtube size={20} /></a>
          </div>
        </div>

      </div>
    </footer>
  );
}
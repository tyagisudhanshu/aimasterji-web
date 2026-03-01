import React from 'react';
import { Mail, MessageCircle, Phone, MapPin } from 'lucide-react';

export default function SupportPage() {
  return (
    <div className="bg-black min-h-screen pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-4xl">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">We're Here to Help</h1>
          <p className="text-zinc-400 text-lg">Having trouble with your robot? Let's fix it.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
              <h3 className="text-xl font-bold text-white mb-6">Contact Channels</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-zinc-300">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400"><Mail size={20}/></div>
                  <div>
                    <p className="text-xs text-zinc-500 font-bold uppercase">Email Us</p>
                    <p>ai.masterji@aalgorix.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-zinc-300">
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-400"><Phone size={20}/></div>
                  <div>
                    <p className="text-xs text-zinc-500 font-bold uppercase">Call Us</p>
                    <p>+91 93102 97919</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-zinc-300">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400"><MapPin size={20}/></div>
                  <div>
                    <p className="text-xs text-zinc-500 font-bold uppercase">HQ Location</p>
                    <p>Tower A 4th Floor, Business Vision Park, Knowledge Park 3, Greater Noida — 201310</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-purple-500" />
              <input type="text" placeholder="Last Name" className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-purple-500" />
            </div>
            <input type="email" placeholder="Email Address" className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-purple-500" />
            <select className="w-full bg-zinc-900 border border-zinc-800 text-zinc-400 px-4 py-3 rounded-xl focus:outline-none focus:border-purple-500">
              <option>My robot won't turn on</option>
              <option>Shipping question</option>
              <option>Other</option>
            </select>
            <textarea placeholder="Describe your issue..." rows="4" className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-purple-500"></textarea>
            
            <button className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors">
              Send Message
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
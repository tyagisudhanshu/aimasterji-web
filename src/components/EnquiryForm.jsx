import React, { useState } from 'react';
import { Send, Mail, User, MessageSquare } from 'lucide-react';

export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: 'General Enquiry',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Later we can connect this to email or backend
    alert(`Thanks ${formData.name}! We will contact you at ${formData.email} shortly.`);
    setFormData({ name: '', email: '', interest: 'General Enquiry', message: '' });
  };

  return (
    <section className="bg-black py-20 border-t border-zinc-900 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-purple-900/10 blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          
          {/* Left Side: Text */}
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Have Questions? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
                Ask Masterji.
              </span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Whether you are a parent looking for the perfect companion or a school wanting to upgrade your lab, we are here to help.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center text-purple-500">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Email Us</p>
                  <p className="font-medium">hello@aimasterji.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center text-purple-500">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Support</p>
                  <p className="font-medium">24/7 AI Chat Support</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: The Form */}
          <div className="flex-1 w-full bg-zinc-900/30 backdrop-blur-sm border border-zinc-800 p-8 rounded-3xl shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">Your Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input 
                      type="text" 
                      required
                      placeholder="John Doe"
                      className="w-full bg-black border border-zinc-800 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input 
                      type="email" 
                      required
                      placeholder="john@example.com"
                      className="w-full bg-black border border-zinc-800 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">I am interested in</label>
                <select 
                  className="w-full bg-black border border-zinc-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all appearance-none"
                  value={formData.interest}
                  onChange={(e) => setFormData({...formData, interest: e.target.value})}
                >
                  <option>Buying a Toy for Home</option>
                  <option>School / Bulk Order</option>
                  <option>Technical Support</option>
                  <option>Partnership</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Message</label>
                <textarea 
                  rows="4"
                  required
                  placeholder="Tell us what you need..."
                  className="w-full bg-black border border-zinc-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <button type="submit" className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-transform hover:scale-[1.02] flex items-center justify-center gap-2">
                Send Enquiry <Send size={18} />
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
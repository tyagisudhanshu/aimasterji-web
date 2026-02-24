import React, { useState } from 'react';
import { Send, Mail, User, MessageSquare, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: 'General Enquiry',
    message: ''
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ENQUIRY;
      const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        toast.error('Email service not configured. Please contact support.');
        setSending(false);
        return;
      }

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          interest: formData.interest,
          message: formData.message,
          to_email: 'ai.masterji@aalgorix.com', // admin email
        },
        PUBLIC_KEY
      );

      toast.success(`Thanks ${formData.name}! We’ll get back to you soon.`);
      setFormData({ name: '', email: '', interest: 'General Enquiry', message: '' });
    } catch (err) {
      console.error('Enquiry email error:', err);
      toast.error('Failed to send enquiry. Please email us directly.');
    } finally {
      setSending(false);
    }
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
                  <p className="font-medium">ai.masterji@aalgorix.com</p>
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

              <button type="submit" disabled={sending} className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                {sending ? (
                  <><Loader2 size={18} className="animate-spin" /> Sending...</>
                ) : (
                  <>Send Enquiry <Send size={18} /></>
                )}
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
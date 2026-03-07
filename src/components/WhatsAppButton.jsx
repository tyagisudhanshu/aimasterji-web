import React from 'react';
import { MessageCircle } from 'lucide-react'; // Using Lucide icon

export default function WhatsAppButton() {
  const phoneNumber = "918882564994"; // Replace with your actual business number (with country code)
  const message = "Hello! I'm interested in the Masterji AI Toys. Can you help me?";
  
  const whatsappUrl = `https://wa.me/${918882564994}?text=${encodeURIComponent(message)}`;

  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      {/* Tooltip that shows on hover */}
      <span className="absolute right-16 bg-zinc-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-zinc-800">
        Chat with us
      </span>
      <MessageCircle size={28} fill="currentColor" />
    </a>
  );
}
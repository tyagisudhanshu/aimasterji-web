import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Zap, Check, Shield, Cpu, MessageCircle } from 'lucide-react';
import { products } from '../data/products'; 
import toast from 'react-hot-toast';
import Reviews from '../components/Reviews';
import ProductRatings from '../components/ProductRatings';
import { useCart } from '../context/CartContext';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleWhatsAppQuery = () => {
  const phoneNumber = "918882564994"; // Replace with your actual number
  const message = `Hi! I'm interested in buying ${product.name} (Price: ${product.price}). Can you provide more details about its features for a 3-year-old?`;
  
  // This opens WhatsApp in a new tab
  window.open(`https://wa.me/${918882564994}?text=${encodeURIComponent(message)}`, '_blank');
};

  // Scroll to top ONLY when this product page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]); 

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-2xl">Robot not found!</h1>
        <button onClick={() => navigate(-1)} className="text-purple-500 ml-4 underline">Go Back</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-6">
        
        {/* THE MAGIC BACK BUTTON */}
        {/* navigate(-1) means "Go back 1 step in history" - preserving scroll position */}
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-white mb-10 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Toys
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* LEFT: IMAGE */}
          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-transparent"></div>
            
            <img 
              src={product.image || `https://api.dicebear.com/7.x/bottts/svg?seed=${product.name}`} 
              alt={product.name}
              className="w-full max-w-md object-contain filter drop-shadow-[0_0_30px_rgba(168,85,247,0.4)] transform transition-transform duration-700 hover:scale-110 hover:rotate-3"
            />
          </div>

          {/* RIGHT: DETAILS */}
          <div>
            <div className="flex items-center gap-2 mb-4">
               <span className="px-3 py-1 bg-purple-500/10 text-purple-400 text-xs font-bold rounded-full border border-purple-500/20">
                 IN STOCK
               </span>
               <span className="px-3 py-1 bg-zinc-800 text-gray-400 text-xs font-bold rounded-full">
                 ID: #{product.id}
               </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl text-purple-500 font-bold mb-6">{product.price}</p>
            
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              {product.desc} 
              <br className="mb-4"/>
              A soft, huggable friend that glows gently. Plays calming lullabies to help your baby sleep better. Helps your toddler speak their first words! This toy repeats what they say in a funny, encouraging voice. Encourages crawling! Bunny hops away safely, motivating your little one to chase and move.
            </p>

            {/* FEATURES LIST */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
               <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Cpu size={18} className="text-blue-500"/> AI Processor Inside (Screen-free fun)
               </div>
               <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Shield size={18} className="text-green-500"/> Educational Content with saftey features
               </div>
               <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Check size={18} className="text-purple-500"/> Parent Voice Cloning
               </div>
               <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Check size={18} className="text-purple-500"/> Wifi Connected
               </div>
               <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Check size={18} className="text-purple-500"/> Waterproof
               </div>
               <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Check size={18} className="text-purple-500"/> Voice Powered chat
               </div>
               <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Check size={18} className="text-purple-500"/> Cry Monitor
               </div>
               <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Check size={18} className="text-purple-500"/> Two-Way Audio
               </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/checkout', {
                  state: {
                    buyNowItem: {
                      id:       product.id,
                      name:     product.name,
                      price:    product.price,
                      quantity: 1,
                      image:    product.image || '',
                    },
                  },
                })}
                className="flex-1 bg-white text-black font-bold py-4 rounded-full hover:bg-gray-200 transition-transform hover:scale-105 flex items-center justify-center gap-2">
                <Zap size={20} /> Buy Now
              </button>
              <button
                onClick={() => { addToCart(product); toast.success(`${product.name} added to cart!`); }}
                className="flex-1 bg-zinc-900 border border-zinc-700 text-white font-bold py-4 rounded-full hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2">
                <ShoppingCart size={20} /> Add to Cart
              </button>
              {/* NEW: WhatsApp Query Button */}
  <button 
    onClick={handleWhatsAppQuery}
    className="flex-1 sm:flex-none px-8 py-4 border border-zinc-700 rounded-xl hover:bg-zinc-900 transition-all flex items-center justify-center gap-2 text-[#25D366] font-bold"
  >
    {/* Using MessageCircle icon from lucide-react */}
    <MessageCircle size={20} fill="currentColor" className="opacity-20" /> 
    Inquiry
  </button>
            </div>

          </div>
        </div>
      </div>
      <Reviews />
      <ProductRatings productId={product.id} productName={product.name} />
    </div>
  );
}
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Zap, Plus, Minus } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext'; 

// --- 1. NEW HELPER COMPONENT FOR VIDEO ---
// This handles the play/pause logic for each individual product
const ProductMedia = ({ image, video, alt }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) videoRef.current.play();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div 
      className="aspect-square bg-zinc-800 relative overflow-hidden flex items-center justify-center cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Static Image (Fades out on hover) */}
      <img 
        src={image} 
        alt={alt}
        className={`transition-all duration-500 absolute inset-0 w-full h-full object-cover
          ${isHovered ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}
        `}
      />

      {/* Video (Visible on hover) */}
      {video && (
        <video
          ref={videoRef}
          src={video}
          muted 
          loop 
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}
        />
      )}

      {/* AI Badge */}
      <div className="absolute top-3 right-3 bg-black/80 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded-md border border-zinc-700 z-10">
        AI INSIDE
      </div>
    </div>
  );
};


// --- 2. YOUR MAIN SECTION (Unchanged logic, just swapped the image part) ---
export default function ProductSection() {
  const { cartItems, addToCart, decreaseQuantity } = useCart();

  return (
    <section id="latest-toys" className="bg-black py-20 border-t border-zinc-900">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Meet the <span className="text-purple-500">Masterji Family</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From coding tutors to musical companions, there is an AI Masterji for every learner.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            
            const cartItem = cartItems.find(item => item.id === product.id);
            const quantity = cartItem ? cartItem.quantity : 0;

            return (
              <div key={product.id} className="group relative bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-2">
                
                {/* --- SWAPPED OLD IMG FOR NEW COMPONENT --- */}
                <Link to={`/product/${product.id}`} className="block">
                    <ProductMedia 
                      image={product.image}
                      video={product.video} // Make sure your data has this!
                      alt={product.name}
                    />
                </Link>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                      <Link to={`/product/${product.id}`}>
                          <h3 className="text-xl font-bold text-white hover:text-purple-500 transition-colors cursor-pointer">{product.name}</h3>
                      </Link>
                      <span className="text-purple-400 font-bold">{product.price}</span>
                  </div>
                  
                  <p className="text-gray-500 text-sm mb-3 h-10 line-clamp-2">
                      {product.desc}
                  </p>

                  {/* FEATURES LIST */}
                  <div className="mb-6 grid grid-cols-2 gap-x-2 gap-y-2">
                    {product.features && product.features.slice(0, 6).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-zinc-400 ">
                        <div className={`w-1.5 h-1.5 rounded-full ${product.color}`}></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 h-10"> 
                      {/* ORDER BUTTON */}
                      <Link to={`/product/${product.id}`} className="flex-1">
                          <button className="w-full h-full bg-white text-black text-sm font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-1">
                              <Zap size={16} /> Order
                          </button>
                      </Link>
                      
                      {/* ADD / COUNTER BUTTON */}
                      {quantity > 0 ? (
                        <div className="flex-1 flex items-center justify-between bg-purple-600 text-white rounded-lg px-2">
                            <button onClick={() => decreaseQuantity(product.id)} className="p-1 hover:bg-purple-700 rounded">
                             <Minus size={14} />
                            </button>
                            
                            <span className="font-bold text-sm">{quantity}</span>
                            
                            <button onClick={() => addToCart(product)} className="p-1 hover:bg-purple-700 rounded">
                             <Plus size={14} />
                            </button>
                        </div>
                      ) : (
                        <button 
                            onClick={() => addToCart(product)}
                            className="flex-1 h-full bg-transparent border border-zinc-700 text-white text-sm font-bold rounded-lg hover:bg-zinc-800 transition-colors flex items-center justify-center gap-1"
                        >
                            <ShoppingCart size={16} /> Add
                        </button>
                      )}

                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
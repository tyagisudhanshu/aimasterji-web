import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Zap, Plus, Minus } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext'; 

export default function ProductSection() {
  // Get all the tools we need
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
            
            // Check if this specific product is already in the cart
            const cartItem = cartItems.find(item => item.id === product.id);
            const quantity = cartItem ? cartItem.quantity : 0;

            return (
              <div key={product.id} className="group relative bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-2">
                
                {/* IMAGE LINK */}
                <Link to={`/product/${product.id}`} className="block">
                    <div className="aspect-square bg-zinc-800 relative overflow-hidden flex items-center justify-center cursor-pointer">
                        <img 
                          src={product.image || `https://api.dicebear.com/7.x/bottts/svg?seed=${product.name}`} 
                          alt={product.name}
                          className={`transition-transform duration-500 group-hover:scale-110 
                            ${product.image ? 'w-full h-full object-cover' : 'w-4/5 h-4/5 object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]'}`
                          }
                        />
                        <div className="absolute top-3 right-3 bg-black/80 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded-md border border-zinc-700">
                          AI INSIDE
                        </div>
                    </div>
                </Link>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                      <Link to={`/product/${product.id}`}>
                          <h3 className="text-xl font-bold text-white hover:text-purple-500 transition-colors cursor-pointer">{product.name}</h3>
                      </Link>
                      <span className="text-purple-400 font-bold">{product.price}</span>
                  </div>
                  
                  <p className="text-gray-500 text-sm mb-6 h-10 line-clamp-2">
                      {product.desc}
                  </p>

                  <div className="flex gap-2 h-10"> {/* Fixed height to prevent jumping */}
                      
                      {/* ORDER BUTTON */}
                      <Link to={`/product/${product.id}`} className="flex-1">
                          <button className="w-full h-full bg-white text-black text-sm font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-1">
                              <Zap size={16} /> Order
                          </button>
                      </Link>
                      
                      {/* ADD / COUNTER BUTTON (THE MAGIC LOGIC) */}
                      {quantity > 0 ? (
                        // OPTION A: Show Counter if added
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
                        // OPTION B: Show "Add" if not added
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
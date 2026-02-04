import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cartItems, addToCart, decreaseQuantity, removeFromCart } = useCart();

  // 1. CALCULATE TOTAL (Logic remains same, it cleans the string to get numbers)
  const totalPrice = cartItems.reduce((total, item) => {
    // This removes any existing $ or ₹ symbols and commas to do the math
    const priceNumber = parseFloat(item.price.toString().replace(/[^0-9.]/g, ''));
    return total + priceNumber * item.quantity;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center pt-20">
        <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-400 mb-8">It looks like you haven't chosen a companion yet.</p>
        <Link to="/" className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200">
          Browse Toys
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold mb-10">Your Cart</h1>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden p-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between border-b border-zinc-800 py-6 last:border-0 gap-4">
              
              {/* Product Info */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-20 h-20 bg-zinc-800 rounded-lg overflow-hidden p-2">
                   <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  {/* CHANGE 1: Force Rupee Symbol on individual items */}
                  {/* We strip existing symbols just in case, then add ₹ */}
                  <p className="text-purple-400">
                    ₹{item.price.toString().replace(/[^0-9.]/g, '')}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-6">
                
                {/* Counter */}
                <div className="flex items-center bg-black border border-zinc-700 rounded-lg">
                  <button onClick={() => decreaseQuantity(item.id)} className="p-2 hover:text-purple-500"><Minus size={16}/></button>
                  <span className="w-8 text-center font-bold">{item.quantity}</span>
                  <button onClick={() => addToCart(item)} className="p-2 hover:text-purple-500"><Plus size={16}/></button>
                </div>

                {/* Delete */}
                <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-500 transition-colors">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}

          {/* TOTAL & CHECKOUT */}
          <div className="mt-8 flex flex-col items-end border-t border-zinc-800 pt-8">
            <div className="flex justify-between w-full sm:w-64 text-xl font-bold mb-6">
              <span>Total:</span>
              {/* CHANGE 2: Replaced '$' with '₹' and .toFixed(2) with .toLocaleString('en-IN') */}
              <span>₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>
            
            <button className="bg-white text-black font-bold px-8 py-4 rounded-full hover:bg-gray-200 flex items-center gap-2 w-full sm:w-auto justify-center">
              Proceed to Checkout <ArrowRight size={20} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
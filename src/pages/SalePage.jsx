import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

// 1. IMPORT YOUR LOCAL IMAGES HERE
// Make sure the names match your files exactly (.jpg, .png, etc.)
import mimiImg from '../assets/product-images/mimi.jpg';
import beboImg from '../assets/product-images/bebo.jpg';
import bunnyImg from '../assets/product-images/bunny.jpg';

const saleProducts = [
  {
    id: 1, 
    name: "Mimi (Starter)",
    originalPrice: "5,999",
    salePrice: "4,999",
    image: mimiImg, // <--- USE THE IMPORTED VARIABLE
    badge: "33% OFF"
  },
  {
    id: 2, 
    name: "Bebo",
    originalPrice: "5,999",
    salePrice: "4,999",
    image: beboImg, // <--- USE THE IMPORTED VARIABLE
    badge: "BEST SELLER"
  },
  {
    id: 3, 
    name: "Bunny",
    originalPrice: "9,999",
    salePrice: "7,999",
    image: bunnyImg, // <--- USE THE IMPORTED VARIABLE
    badge: "LIMITED DEAL"
  }
];

export default function SalePage() {
  return (
    <div className="bg-black min-h-screen pt-24 pb-12 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">Flash Sale</h1>
          <p className="text-zinc-400">Limited time offers on our best AI companions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {saleProducts.map((product) => (
            <div key={product.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden relative group">
              
              <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                {product.badge}
              </div>

              {/* IMAGE LINK */}
              <Link to={`/product/${product.id}`} className="block w-full h-64 overflow-hidden bg-zinc-800">
                 <img 
                   src={product.image} 
                   alt={product.name} 
                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                 />
              </Link>

              <div className="p-6">
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-xl font-bold text-white mb-2 hover:text-red-500 transition-colors">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl font-bold text-red-500">₹{product.salePrice}</span>
                  <span className="text-zinc-500 line-through text-sm">₹{product.originalPrice}</span>
                </div>
                
                <Link to={`/product/${product.id}`} className="w-full bg-white text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                  <ShoppingBag size={18} /> View Deal
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
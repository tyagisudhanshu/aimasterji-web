import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, ChevronDown, Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext'; // <--- 1. Import Hook

export default function Navbar({ user }) {
  const navigate = useNavigate();
  const { cartItems } = useCart(); // <--- 2. Get Cart Data
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
        setIsMobileMenuOpen(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const handleAuth = () => {
    navigate('/login');
  };

  return (
    <nav className={`fixed left-0 right-0 z-50 flex flex-col items-center transition-transform duration-300 ${isVisible ? 'translate-y-2' : '-translate-y-full'}`}>
      <div className="bg-[#0a0a0a] w-[95%] max-w-7xl rounded-full border border-zinc-800 shadow-2xl px-4 md:px-6 py-3 flex items-center justify-between relative z-50">
        
        {/* LOGO */}
        <Link to="/" className="flex flex-col leading-none select-none">
           <div className="flex items-center text-2xl md:text-3xl font-black tracking-tighter">
             <span className="text-white">AI</span> 
             <span className="text-red-600">masterji</span>
           </div>
           <span className="text-[10px] md:text-[11px] font-medium text-zinc-500 tracking-[0.2em] uppercase mt-0.5 ml-1">
             Toys that teach
           </span>
        </Link>

        {/* LINKS */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-300">
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-white transition-colors py-2">
              Latest Toys <ChevronDown size={14} className="group-hover:rotate-180 transition-transform"/>
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-[#0a0a0a] border border-zinc-800 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top overflow-hidden">
              <div className="py-2 flex flex-col">
                <Link to="/product/1" className="px-5 py-3 hover:bg-zinc-900 text-white block">Mimi (Starter)</Link>
                <Link to="/product/4" className="px-5 py-3 hover:bg-zinc-900 text-white block">Prince (Pro)</Link>
              </div>
            </div>
          </div>
          <button className="flex items-center gap-1 hover:text-white transition-colors">Accessories</button>
          <a href="#support" className="hover:text-white transition-colors">Support</a>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2 md:gap-3">
          
          {/* 3. CART ICON (New) */}
          <Link to="/cart" className="relative p-2 text-gray-300 hover:text-white transition-colors">
            <ShoppingCart size={20} />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-black">
                {cartItems.length}
              </span>
            )}
          </Link>

          <Link to="/why-aimasterji">
            <button className="hidden md:block bg-orange-500 hover:bg-orange-600 text-black font-bold px-5 py-2.5 rounded-full text-xs transition-transform hover:scale-105">
              Why AiMasterji?
            </button>
          </Link>

          <button onClick={handleAuth} className="hidden sm:flex items-center gap-2 border border-red-500/50 hover:border-red-500 hover:bg-red-500/10 text-red-500 px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs font-bold transition-colors">
             <LogIn size={14} />
             <span className="whitespace-nowrap">Sign In</span>
          </button>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-white p-2 rounded-full hover:bg-zinc-800">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
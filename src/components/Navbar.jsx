import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar({ user }) {
  const context = useCart();
  const cart = context.cart || context.cartItems || []; 
  
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // 1. SCROLL EFFECT
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

  // 2. SCROLL TO TOP FUNCTION (Fixes Home Button)
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  // 3. FAQ SCROLL LOGIC
  const handleFaqClick = (e) => {
    e.preventDefault(); 
    setIsMobileMenuOpen(false);
    
    if (location.pathname === '/') {
      const faqSection = document.getElementById('faq-section');
      if (faqSection) faqSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const faqSection = document.getElementById('faq-section');
        if (faqSection) faqSection.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  const handleAuth = () => {
    navigate('/login');
  };

  return (
    <nav className={`fixed left-0 right-0 z-50 flex flex-col items-center transition-transform duration-300 ${isVisible ? 'translate-y-2' : '-translate-y-full'}`}>
      
      {/* WIDE PILL DESIGN */}
      <div className="bg-[#0a0a0a] w-[99%] max-w-none rounded-full border border-zinc-800 shadow-2xl px-4 md:px-6 py-3 flex items-center justify-between relative z-50">
        
        {/* LOGO (Now Scrolls to Top) */}
        <Link to="/" onClick={scrollToTop} className="flex flex-col leading-none select-none">
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
           
           {/* HOME LINK (Now Scrolls to Top) */}
           <Link to="/" onClick={scrollToTop} className="hover:text-white transition-colors">Home</Link>
           
           {/* PRODUCT DROPDOWN */}
           <div className="relative group">
             <button className="flex items-center gap-1 hover:text-white transition-colors py-2">
               Products <ChevronDown size={14} className="group-hover:rotate-180 transition-transform"/>
             </button>
             
             {/* DROPDOWN MENU */}
             <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-[#0a0a0a] border border-zinc-800 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top overflow-hidden">
               <div className="py-2 flex flex-col">
                 <Link to="/product/1" className="px-5 py-3 hover:bg-zinc-900 text-white block text-left border-b border-zinc-800/50">
                    <span className="block text-sm font-bold text-pink-400">Mimi</span>
                    <span className="text-xs text-zinc-500">The Storyteller (Ages 4-8)</span>
                 </Link>
                 <Link to="/product/2" className="px-5 py-3 hover:bg-zinc-900 text-white block text-left border-b border-zinc-800/50">
                    <span className="block text-sm font-bold text-orange-400">Simba</span>
                    <span className="text-xs text-zinc-500">The Coder (Ages 7-12)</span>
                 </Link>
                 <Link to="/product/3" className="px-5 py-3 hover:bg-zinc-900 text-white block text-left border-b border-zinc-800/50">
                    <span className="block text-sm font-bold text-purple-400">Prince</span>
                    <span className="text-xs text-zinc-500">The Pro (Ages 12+)</span>
                 </Link>
                 {/* VIEW ALL LINK */}
                 <a href="/#latest-toys" className="px-5 py-3 hover:bg-zinc-900 text-white block text-left font-bold bg-zinc-900/50">
                    View All Toys →
                 </a>
               </div>
             </div>
           </div>
           
           <button onClick={handleFaqClick} className="hover:text-white transition-colors cursor-pointer bg-transparent border-none">
              FAQ
           </button>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2 md:gap-3">
          
          <Link to="/cart" className="relative p-2 text-gray-300 hover:text-white transition-colors">
            <ShoppingCart size={20} />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-black">
                {cart.length}
              </span>
            )}
          </Link>

          {user ? (
             <Link to="/dashboard" className="hidden sm:flex items-center gap-2 px-4 py-2 text-white font-bold">
                <User size={18} />
             </Link>
          ) : (
             <button onClick={handleAuth} className="hidden sm:flex items-center gap-2 border border-red-500/50 hover:border-red-500 hover:bg-red-500/10 text-red-500 px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs font-bold transition-colors">
                <User size={14} />
                <span className="whitespace-nowrap">Sign In</span>
             </button>
          )}

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-white p-2 rounded-full hover:bg-zinc-800">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

       {/* MOBILE MENU DROPDOWN */}
       {isMobileMenuOpen && (
        <div className="md:hidden bg-zinc-950 border-t border-zinc-800 absolute top-full mt-4 w-[99%] rounded-2xl p-6 flex flex-col gap-6 text-zinc-300 shadow-2xl">
          <Link to="/" onClick={scrollToTop} className="text-xl font-bold text-white">Home</Link>
          <Link to="/why-aimasterji" onClick={() => setIsMobileMenuOpen(false)} className="text-xl">About</Link>
          
          <div className="flex flex-col gap-2 border-l-2 border-zinc-800 pl-4">
            <span className="text-zinc-500 uppercase text-xs font-bold tracking-wider">Products</span>
            <Link to="/product/1" onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-pink-400">Mimi</Link>
            <Link to="/product/2" onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-orange-400">Simba</Link>
            <Link to="/product/3" onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-purple-400">Prince</Link>
            <a href="/#latest-toys" onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-white font-bold mt-2">View All →</a>
          </div>

          <button onClick={handleFaqClick} className="text-xl text-left text-zinc-300">FAQ</button>
        </div>
      )}
    </nav>
  );
}
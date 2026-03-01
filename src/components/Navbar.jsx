import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, ChevronDown, LogOut, LayoutDashboard, ClipboardList, UserCircle, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Navbar() {
  const context = useCart();
  const cart = context.cart || context.cartItems || [];
  const { user, logOut } = useAuth();
  const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
  const isAdmin = user && ADMIN_EMAIL && user.email === ADMIN_EMAIL;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  async function handleLogout() {
    await logOut();
    toast.success('Signed out successfully.');
    setDropdownOpen(false);
    navigate('/');
  }
  
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

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

  const handleDashboardClick = (e) => {
    if (!user) {
      e.preventDefault();
      navigate('/login');
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed left-0 right-0 z-50 flex flex-col items-center transition-transform duration-300 ${isVisible ? 'translate-y-2' : '-translate-y-full'}`}>
      
      <div className="bg-[#0a0a0a] w-[99%] max-w-none rounded-full border border-zinc-800 shadow-2xl px-4 md:px-6 py-3 flex items-center justify-between relative z-50">
        
        <Link to="/" onClick={scrollToTop} className="flex flex-col leading-none select-none">
            <div className="flex items-center text-2xl md:text-3xl font-black tracking-tighter">
              <span className="text-white">AI</span> 
              <span className="text-red-600">masterji</span>
            </div>
            <span className="text-[10px] md:text-[11px] font-medium text-zinc-500 tracking-[0.2em] uppercase mt-0.5 ml-1">
              Toys that teach
            </span>
        </Link>

        {/* LINKS SECTION */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-300">
           
           <Link to="/" onClick={scrollToTop} className="hover:text-white transition-colors">Home</Link>
           <Link to="/dashboard" onClick={handleDashboardClick} className="hover:text-white transition-colors">Dashboard</Link>
           
           {/* PRODUCT DROPDOWN */}
           <div className="relative group">
             <button className="flex items-center gap-1 hover:text-white transition-colors py-2">
               Products <ChevronDown size={14} className="group-hover:rotate-180 transition-transform"/>
             </button>
             <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-[#0a0a0a] border border-zinc-800 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top overflow-hidden">
               <div className="py-2 flex flex-col">
                 <Link to="/product/1" className="px-5 py-3 hover:bg-zinc-900 text-white block text-left border-b border-zinc-800/50">
                    <span className="block text-sm font-bold text-pink-400">Mimi</span>
                    <span className="text-xs text-zinc-500">The Storyteller</span>
                 </Link>
                 <Link to="/product/9" className="px-5 py-3 hover:bg-zinc-900 text-white block text-left border-b border-zinc-800/50">
                    <span className="block text-sm font-bold text-orange-400">Simba</span>
                    <span className="text-xs text-zinc-500">The Coder</span>
                 </Link>
                 <Link to="/product/4" className="px-5 py-3 hover:bg-zinc-900 text-white block text-left border-b border-zinc-800/50">
                    <span className="block text-sm font-bold text-purple-400">Prince</span>
                    <span className="text-xs text-zinc-500">The Pro</span>
                 </Link>
                 <a href="/#latest-toys" className="px-5 py-3 hover:bg-zinc-900 text-white block text-left font-bold bg-zinc-900/50">
                    View All Toys →
                 </a>
               </div>
             </div>
           </div>

           {/* ABOUT US LINK */}
           <Link to="/about" className="hover:text-white transition-colors">About Us</Link>

           {/* SALE BUTTON (Red & Bold) */}
           <Link to="/sale" className="text-red-500 font-bold hover:text-red-400 transition-colors flex items-center gap-1 animate-pulse">
             Sale
           </Link>

           {/* SUPPORT BUTTON */}
           <Link to="/support" className="hover:text-white transition-colors">
             Support
           </Link>
           
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
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-colors"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt="avatar" className="w-6 h-6 rounded-full object-cover" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-white text-[10px] font-bold">
                    {(user.displayName || user.email || 'U')[0].toUpperCase()}
                  </div>
                )}
                <span className="hidden sm:inline text-white text-xs font-semibold max-w-[80px] truncate">
                  {user.displayName || user.email.split('@')[0]}
                </span>
                <ChevronDown size={12} className={`text-zinc-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden z-50">
                  <Link
                    to="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-zinc-800 transition-colors"
                  >
                    <LayoutDashboard size={15} className="text-purple-400" /> Dashboard
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-zinc-800 transition-colors border-t border-zinc-800"
                  >
                    <ClipboardList size={15} className="text-blue-400" /> Order History
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-zinc-800 transition-colors border-t border-zinc-800"
                  >
                    <UserCircle size={15} className="text-pink-400" /> My Profile
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-zinc-800 transition-colors border-t border-zinc-800"
                    >
                      <ShieldCheck size={15} className="text-orange-400" /> Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-zinc-800 transition-colors border-t border-zinc-800"
                  >
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              )}
            </div>
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

       {/* MOBILE MENU */}
       {isMobileMenuOpen && (
        <div className="md:hidden bg-zinc-950 border-t border-zinc-800 absolute top-full mt-4 w-[99%] rounded-2xl p-6 flex flex-col gap-6 text-zinc-300 shadow-2xl">
          <Link to="/" onClick={scrollToTop} className="text-xl font-bold text-white">Home</Link>
          <Link to="/dashboard" onClick={handleDashboardClick} className="text-xl font-bold text-purple-400">Dashboard</Link>
          <Link to="/sale" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-red-500">Sale 🔥</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-xl text-white">About Us</Link>
          <Link to="/support" onClick={() => setIsMobileMenuOpen(false)} className="text-xl text-white">Support</Link>
          
          <div className="flex flex-col gap-2 border-l-2 border-zinc-800 pl-4">
            <span className="text-zinc-500 uppercase text-xs font-bold tracking-wider">Products</span>
            <Link to="/product/1" onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-pink-400">Mimi</Link>
            <Link to="/product/2" onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-orange-400">Simba</Link>
            <Link to="/product/3" onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-purple-400">Prince</Link>
          </div>

          <button onClick={handleFaqClick} className="text-xl text-left text-zinc-300">FAQ</button>

          {user ? (
            <>
              <Link to="/orders" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-blue-400 flex items-center gap-2">
                <ClipboardList size={20} /> Order History
              </Link>
              <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-pink-400 flex items-center gap-2">
                <UserCircle size={20} /> My Profile
              </Link>
              {isAdmin && (
                <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-orange-400 flex items-center gap-2">
                  <ShieldCheck size={20} /> Admin Panel
                </Link>
              )}
              <button
                onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                className="text-xl font-bold text-red-400 flex items-center gap-2 text-left"
              >
                <LogOut size={20} /> Sign Out
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-white flex items-center gap-2">
              <User size={20} /> Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
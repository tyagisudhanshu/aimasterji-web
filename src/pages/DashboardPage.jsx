import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, Cpu } from 'lucide-react';
import Hero from '../components/Hero';
import ProductSection from '../components/ProductSection';

export default function DashboardPage() {
  return (
    <div className="bg-black min-h-screen">
      
      {/* 1. THE USER WELCOME BAR (The only difference from Home) */}
      <div className="pt-24 pb-4 px-6 container mx-auto">
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome back, Professor!</h1>
            <p className="text-gray-400 text-sm">Your robots are online and waiting for instructions.</p>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            {/* The Button to the REAL Dashboard */}
            <Link to="/console" className="flex-1 md:flex-none bg-white text-black font-bold px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
               <Cpu size={18} /> Open Control Panel
            </Link>
            
            <button className="bg-zinc-800 text-white p-3 rounded-xl hover:bg-zinc-700 border border-zinc-700">
               <Settings size={18} />
            </button>
          </div>

        </div>
      </div>

      {/* 2. REUSE THE HOME COMPONENTS */}
      {/* We reuse the Hero and Products so they can still buy things! */}
      <Hero />
      <ProductSection />
      
    </div>
  );
}
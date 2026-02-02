import React from 'react';
import { Link } from 'react-router-dom';
import { Battery, Wifi, Video, Terminal, Activity, ArrowLeft } from 'lucide-react';

export default function ControlPanel() {
  return (
    <div className="min-h-screen bg-black text-white p-6 pt-20">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
        <div>
           <Link to="/dashboard" className="text-zinc-500 hover:text-white flex items-center gap-2 mb-2">
             <ArrowLeft size={16} /> Back to Store
           </Link>
           <h1 className="text-3xl font-bold">Mimi-X1 <span className="text-green-500 text-sm align-middle ml-2">● ONLINE</span></h1>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 text-green-400 bg-green-400/10 px-3 py-1 rounded-full text-xs font-bold border border-green-400/20">
             <Wifi size={14} /> Connected
           </div>
           <div className="flex items-center gap-2 text-white bg-zinc-800 px-3 py-1 rounded-full text-xs font-bold">
             <Battery size={14} /> 84%
           </div>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 1. CAMERA FEED (Main View) */}
        <div className="lg:col-span-2 bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden relative min-h-[400px]">
           <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded animate-pulse flex items-center gap-1">
             <Video size={12} /> LIVE
           </div>
           {/* Fake Camera Feed Image */}
           <img src="https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-50" alt="Robot View" />
           
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="text-zinc-500 font-mono text-sm">[ WAITING FOR INPUT ]</p>
           </div>
        </div>

        {/* 2. STATS & LOGS */}
        <div className="flex flex-col gap-6">
           
           {/* Terminal */}
           <div className="flex-1 bg-black border border-zinc-800 rounded-2xl p-4 font-mono text-xs text-green-400 overflow-hidden relative">
             <div className="flex items-center gap-2 text-zinc-500 border-b border-zinc-800 pb-2 mb-2">
               <Terminal size={14} /> System Log
             </div>
             <div className="space-y-1 opacity-80">
               {/* I replaced '>' with '&gt;' below to fix the error */}
               <p>&gt; System initialized...</p>
               <p>&gt; Connecting to server... OK</p>
               <p>&gt; Battery check... 84%</p>
               <p>&gt; Camera module... Ready</p>
               <p className="animate-pulse">&gt; _</p>
             </div>
           </div>

           {/* Controls */}
           <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2"><Activity size={18} /> Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                 <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg text-xs transition-colors">Start Coding</button>
                 <button className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 rounded-lg text-xs transition-colors">Play Music</button>
                 <button className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 rounded-lg text-xs transition-colors">Sleep Mode</button>
                 <button className="bg-red-900/50 hover:bg-red-900 text-red-200 font-bold py-3 rounded-lg text-xs transition-colors border border-red-900">Emergency Stop</button>
              </div>
           </div>

        </div>

      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { ArrowRight, Play, X } from 'lucide-react';

// 1. IMPORT BOTH VIDEOS
import heroBgVideo from '../assets/hero-video.mp4'; // Background Loop
import demoPopupVideo from '../assets/demo.mp4';    // Popup Demo

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const scrollToProducts = () => {
    const productSection = document.getElementById('latest-toys');
    if (productSection) {
      productSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center bg-black overflow-hidden pt-20">
      
      {/* ------------------------------------------------------ */}
      {/* 1. BACKGROUND VIDEO LAYER (Full Screen)                */}
      {/* ------------------------------------------------------ */}
      <div className="absolute inset-0 w-full h-full z-0">
         <video 
           autoPlay 
           loop 
           muted 
           playsInline 
           className="w-full h-full object-cover opacity-50" // Adjusted opacity for readability
           src={heroBgVideo} 
         />
         {/* Overlays to make text readable */}
         <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
        
        {/* ------------------------------------------------------ */}
        {/* 2. LEFT SIDE: TEXT (Kept exactly as you asked)        */}
        {/* ------------------------------------------------------ */}
        <div className="flex-1 text-center md:text-left max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 backdrop-blur border border-zinc-800 text-purple-400 text-xs font-bold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            AI ROBOTICS FOR EVERYONE
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Where AI brings <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
              toys to life
            </span>
          </h1>
          
          <p className="text-gray-300 text-lg mb-8 max-w-lg mx-auto md:mx-0">
            AImasterji - Child's CoParent. It sees, speaks, and teaches safely—powered by the intelligence of ProfessorsAI.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <button 
              onClick={scrollToProducts}
              className="flex items-center gap-2 bg-white text-black font-bold px-8 py-4 rounded-full hover:bg-gray-200 transition-all hover:scale-105"
            >
              Get the Toy <ArrowRight size={18} />
            </button>
            
            {/* WATCH DEMO BUTTON */}
            <button 
              onClick={() => setIsVideoOpen(true)}
              className="flex items-center gap-2 px-8 py-4 rounded-full border border-zinc-500 bg-black/30 backdrop-blur text-white hover:bg-zinc-900 transition-all group"
            >
              <Play size={18} fill="currentColor" className="group-hover:text-purple-500 transition-colors" /> Watch Demo
            </button>
          </div>
        </div>

        {/* RIGHT SIDE REMOVED (Because video is now in background) */}
        {/* Empty div to balance layout if needed, or just leave flex-1 on text to take space */}
        <div className="hidden md:block flex-1"></div> 

      </div>

      {/* ------------------------------------------- */}
      {/* 3. VIDEO POPUP MODAL (Triggers on Click)    */}
      {/* ------------------------------------------- */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          
          {/* Black Overlay */}
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={() => setIsVideoOpen(false)}
          ></div>

          {/* Video Player Box */}
          <div className="relative w-full max-w-5xl bg-black rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl animate-in fade-in zoom-in duration-300">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-red-600 text-white p-2 rounded-full backdrop-blur border border-zinc-700 transition-colors"
            >
              <X size={24} />
            </button>

            {/* The Demo Video Player (Plays demo.mp4) */}
            <video 
              className="w-full h-auto max-h-[80vh]"
              controls
              autoPlay
              src={demoPopupVideo}
            >
              Your browser does not support the video tag.
            </video>

          </div>
        </div>
      )}

    </div>
  );
}
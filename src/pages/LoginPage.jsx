import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSSOLogin = () => {
    setIsLoading(true);
    
    // REDIRECT LOGIC
    // This sends the user to the main ProfessorsAI login page.
    // After they login there, that site should redirect them back here.
    window.location.href = "https://professorsai.org/signup?redirect=aimasterji"; 
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 pt-20">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-full max-h-[500px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md bg-zinc-900/80 backdrop-blur border border-zinc-800 p-10 rounded-3xl shadow-2xl relative z-10 text-center">
        
        {/* LOGO AREA */}
        <div className="flex justify-center items-center gap-4 mb-8">
           {/* ProfessorsAI Logo */}
           <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-black font-black text-xs">
             PAI
           </div>
           
           <div className="text-zinc-600">
             <ArrowRight size={20} />
           </div>
           
           {/* AiMasterji Logo */}
           <div className="w-12 h-12 bg-black border border-zinc-700 rounded-xl flex items-center justify-center text-white font-black text-[10px] leading-none">
             AI<br/>MAS
           </div>
        </div>

        <h1 className="text-2xl font-bold text-white mb-4">
          Login with ProfessorsAI
        </h1>
        
        <p className="text-gray-400 mb-8 text-sm leading-relaxed">
          AiMasterji uses your existing <span className="text-white font-bold">ProfessorsAI.org</span> account. No new password required.
        </p>

        {/* THE SSO BUTTON */}
        <button 
          onClick={handleSSOLogin}
          disabled={isLoading}
          className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-all hover:scale-[1.02] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
        >
           {isLoading ? (
             <>
                <Loader2 size={20} className="animate-spin" /> Connecting...
             </>
           ) : (
             <>
                <ShieldCheck size={20} /> Continue with ProfessorsAI
             </>
           )}
        </button>

        <p className="mt-6 text-xs text-zinc-600">
          By continuing, you grant AiMasterji access to your learning profile.
        </p>

      </div>
    </div>
  );
}
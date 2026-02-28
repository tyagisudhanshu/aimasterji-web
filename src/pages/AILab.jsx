import React, { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Mic, Power, Loader2, Square } from 'lucide-react';
// 1. IMPORT THE SDK HOOK
import { useConversation } from '@elevenlabs/react';

export default function AILab() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 2. CONFIGURE THE AI HOOK
  const conversation = useConversation({
    onConnect: () => console.log('Connected to Masterji AI'),
    onDisconnect: () => console.log('Disconnected'),
    onError: (error) => console.error('AI Error:', error),
  });

  const { status, isSpeaking } = conversation;

  // 3. THE CONTROL FUNCTION (Connects/Disconnects)
  const handleToggleAI = useCallback(async () => {
    if (status === 'connected') {
      await conversation.endSession();
      return;
    }

    try {
      // Check if browser supports microphone API (requires HTTPS)
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Voice chat requires a secure connection (HTTPS). Please access this site via https://');
        return;
      }

      // Explicitly request mic first so we can catch permission errors separately
      let micStream;
      try {
        micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (micErr) {
        if (micErr.name === 'NotAllowedError' || micErr.name === 'PermissionDeniedError') {
          alert('Microphone permission was denied.\n\nTo fix this:\n1. Click the lock/info icon in your browser address bar\n2. Set Microphone to "Allow"\n3. Refresh the page and try again');
        } else if (micErr.name === 'NotFoundError') {
          alert('No microphone found on this device. Please connect a microphone and try again.');
        } else {
          alert(`Microphone error: ${micErr.message}`);
        }
        return;
      }

      // Stop the test stream — ElevenLabs SDK opens its own
      micStream.getTracks().forEach(t => t.stop());

      // Start ElevenLabs AI session
      await conversation.startSession({
        agentId: import.meta.env.VITE_ELEVENLABS_AGENT_ID,
      });

    } catch (error) {
      console.error('Failed to start AI session:', error);
      alert(`Could not connect to AI: ${error.message || 'Unknown error'}.\n\nPlease check your internet connection and try again.`);
    }
  }, [conversation, status]);

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-12 px-6">
      <div className="container mx-auto max-w-4xl">
        
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white mb-12 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Masterji Home
        </Link>

        {/* Content Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-bold mb-6 uppercase tracking-widest">
            <Sparkles size={16} className="animate-pulse" /> Neural Link Active
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase">
            Test the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600 text-white">Brain</span>
          </h1>
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto leading-relaxed italic">
            "Initialize the core to begin voice synchronization."
          </p>
        </div>

        {/* MAIN INTERFACE BOX */}
        <div className="relative max-w-xl mx-auto">
          {/* Dynamic Glow changes color when active */}
          <div className={`absolute -inset-1 rounded-[3rem] blur opacity-20 transition-all duration-1000 ${status === 'connected' ? 'bg-green-500' : 'bg-purple-600'}`}></div>
          
          <div className="relative bg-zinc-900 border border-zinc-800 rounded-[3rem] p-16 flex flex-col items-center justify-center shadow-2xl min-h-[400px]">
            
            {/* Status Decoration */}
            <div className="absolute top-10 flex items-center gap-2 text-[10px] text-zinc-600 font-black tracking-[0.3em] uppercase">
                <Power size={14} className={status === 'connected' ? "text-green-500" : "text-purple-500"} />
                {status === 'connected' ? 'SYSTEM LIVE' : 'SYSTEM READY'}
            </div>

            {/* --- THE CUSTOM BUTTON --- */}
            <button 
              onClick={handleToggleAI}
              disabled={status === 'connecting'}
              className={`group relative flex items-center justify-center w-32 h-32 rounded-full border-2 transition-all duration-300 shadow-2xl z-10 
                ${status === 'connected' 
                  ? 'bg-red-500/10 border-red-500 hover:bg-red-500/20 scale-110' 
                  : 'bg-zinc-800 border-zinc-700 hover:border-purple-500 hover:scale-110'
                }`}
            >
              {/* Inner Icon Logic */}
              {status === 'connecting' ? (
                <Loader2 size={40} className="text-purple-500 animate-spin" />
              ) : status === 'connected' ? (
                <Square size={32} className="text-red-500 fill-current" />
              ) : (
                <Mic size={40} className="text-zinc-400 group-hover:text-white transition-colors" />
              )}
            </button>

            {/* Status Text */}
            <div className="mt-12 flex flex-col items-center gap-2 h-10">
               {status === 'connected' ? (
                 <div className="flex flex-col items-center">
                   <span className="text-green-500 font-bold tracking-widest uppercase text-sm mb-2">
                     {isSpeaking ? "Masterji Speaking..." : "Listening..."}
                   </span>
                   {/* Audio Wave Animation */}
                   <div className="flex gap-1 h-4 items-end">
                      <div className="w-1 bg-green-500 animate-[bounce_1s_infinite] h-full"></div>
                      <div className="w-1 bg-green-500 animate-[bounce_1.2s_infinite] h-2/3"></div>
                      <div className="w-1 bg-green-500 animate-[bounce_0.8s_infinite] h-full"></div>
                      <div className="w-1 bg-green-500 animate-[bounce_1.1s_infinite] h-1/2"></div>
                   </div>
                 </div>
               ) : (
                 <span className="text-sm font-bold tracking-widest uppercase text-zinc-500 animate-pulse">
                   Tap to Speak
                 </span>
               )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
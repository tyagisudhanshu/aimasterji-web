import React from 'react';
import { Brain, Heart, Shield, Zap, Code, Globe } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-black min-h-screen text-white pt-20">
      
      {/* 1. HERO SECTION */}
      <div className="relative overflow-hidden py-24 px-6 text-center border-b border-zinc-800">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/20 blur-[120px] rounded-full -z-10"></div>
        
        <h1 className="text-5xl md:text-7xl font-black mb-6">
          We are building the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Teacher of the Future.</span>
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          AiMasterji isn't just a toy. It's a physical embodiment of the world's most advanced tutoring AI, designed to sit beside your child and guide them through the digital age.
        </p>
      </div>

      {/* 2. THE THREE PILLARS (Grid) */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 hover:border-purple-500/50 transition-colors">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400 mb-6">
              <Brain size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-3">ProfessorsAI Brain</h3>
            <p className="text-zinc-400">Powered by the same engine used in universities. It doesn't just chat; it follows a curriculum, checks for understanding, and adapts to the child's level.</p>
          </div>

          <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 hover:border-blue-500/50 transition-colors">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 mb-6">
              <Shield size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-3">Safety First</h3>
            <p className="text-zinc-400">No cameras sending data to the cloud. No ads. No toxic content. A walled garden where your child can explore AI safely.</p>
          </div>

          <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 hover:border-green-500/50 transition-colors">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center text-green-400 mb-6">
              <Heart size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-3">Emotional IQ</h3>
            <p className="text-zinc-400">Mimi detects frustration and excitement. It knows when to encourage a child and when to suggest a break. It's a friend, not just a machine.</p>
          </div>

        </div>
      </div>

      {/* 3. MEET THE FAMILY */}
      <div className="bg-zinc-900 py-20 border-y border-zinc-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">Meet the Class</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* MIMI */}
            <div className="text-center group">
              <div className="relative mb-6 inline-block">
                <div className="absolute inset-0 bg-pink-500/20 blur-xl rounded-full group-hover:bg-pink-500/40 transition-all"></div>
                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Mimi" alt="Mimi" className="w-40 h-40 relative z-10 drop-shadow-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-pink-400">Mimi</h3>
              <p className="text-sm font-bold text-zinc-500 mb-2">THE COMPANION</p>
              <p className="text-zinc-400 max-w-xs mx-auto">Perfect for younger kids. Focuses on storytelling, vocabulary, and emotional growth.</p>
            </div>

            {/* SIMBA */}
            <div className="text-center group">
              <div className="relative mb-6 inline-block">
                <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full group-hover:bg-orange-500/40 transition-all"></div>
                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Simba" alt="Simba" className="w-40 h-40 relative z-10 drop-shadow-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-orange-400">Simba</h3>
              <p className="text-sm font-bold text-zinc-500 mb-2">THE CODER</p>
              <p className="text-zinc-400 max-w-xs mx-auto">Built for logic. Teaches Python basics, math puzzles, and critical thinking.</p>
            </div>

            {/* PRINCE */}
            <div className="text-center group">
              <div className="relative mb-6 inline-block">
                <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full group-hover:bg-purple-500/40 transition-all"></div>
                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Prince" alt="Prince" className="w-40 h-40 relative z-10 drop-shadow-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-purple-400">Prince</h3>
              <p className="text-sm font-bold text-zinc-500 mb-2">THE PRO</p>
              <p className="text-zinc-400 max-w-xs mx-auto">The ultimate tutor. Full encyclopedia access, advanced coding, and debate practice.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. STATISTICS */}
      <div className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-black text-white mb-2">10k+</div>
            <div className="text-zinc-500 text-sm">Hours of Lessons</div>
          </div>
          <div>
            <div className="text-4xl font-black text-white mb-2">24/7</div>
            <div className="text-zinc-500 text-sm">Availability</div>
          </div>
          <div>
            <div className="text-4xl font-black text-white mb-2">0%</div>
            <div className="text-zinc-500 text-sm">Screen Glare</div>
          </div>
          <div>
            <div className="text-4xl font-black text-white mb-2">100%</div>
            <div className="text-zinc-500 text-sm">Secure</div>
          </div>
        </div>
      </div>

    </div>
  );
}
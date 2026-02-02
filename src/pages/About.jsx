import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-purple-500 mb-8">Why AiMasterji?</h1>
        
        <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 text-left space-y-6">
          <p className="text-xl text-gray-300">
            AiMasterji isn't just a toy. It's a <span className="text-white font-bold">living educational companion</span>.
          </p>
          <p className="text-gray-400">
            Unlike standard robots that just move around, AiMasterji is powered by real Artificial Intelligence. It sees, hears, and learns from you.
          </p>
          
          <ul className="space-y-4 mt-6">
            <li className="flex items-center gap-3">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span>Teaches Python & Logic naturally.</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              <span>Safe, private, and offline-capable.</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
              <span>Evolves with updates every month.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
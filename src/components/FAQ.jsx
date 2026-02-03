import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "Is AiMasterji safe for my child?",
    answer: "Absolutely. We adhere to strict COPPA guidelines. The microphone only turns on when the 'Wake Word' is spoken. No audio is stored permanently, and we do not use your child's data for advertising."
  },
  {
    question: "Do I need a subscription?",
    answer: "The robot comes with basic conversation features for free. To access the advanced 'ProfessorsAI' curriculum (Math, Coding, History), you need a monthly subscription (included free for the first 6 months)."
  },
  {
    question: "What age is this for?",
    answer: "Mimi is designed for ages 4-8 (Storytelling). Simba is for ages 7-12 (Logic & Math). Prince is for ages 12+ (Advanced Coding & Debate)."
  },
  {
    question: "Does it work without WiFi?",
    answer: "The robot needs WiFi for the AI to work. However, it has an 'Offline Mode' where it can play pre-downloaded stories and games without internet."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    // IMPORTANT: This ID allows the Navbar to scroll here
    <section id="faq-section" className="bg-black py-24 px-6 border-t border-zinc-900">
      <div className="container mx-auto max-w-3xl">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-zinc-400">Everything you need to know about the product.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-zinc-800 rounded-2xl bg-zinc-900/30 overflow-hidden"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-zinc-800/50 transition-colors"
              >
                <span className="font-bold text-lg text-white">{faq.question}</span>
                {openIndex === index ? <Minus className="text-purple-500" /> : <Plus className="text-zinc-500" />}
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-zinc-400 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
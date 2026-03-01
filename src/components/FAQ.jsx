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
  },
  {
    question: "What measures does AI Masterji take to protect children's data?",
    answer: "AI Masterji operates under strict COPPA compliance, including: custom no-data-sharing agreements with our vendors, collecting parent consent before processing data, and allowing parents to permanently delete their child's data via the AI Masterji app."
  },
  {
    question: "How does AI Masterji ensure the safety and privacy of user data?",
    answer: "AI Masterji uses multi-stage encryption, authentication, tokenization, and public/private key cryptography to protect all user data. We develop hardware, firmware, software, and cloud infrastructure in-house, which allows us to maintain a high level of security throughout."
  },
  {
    question: "Are AI Masterji toys safe for young children?",
    answer: "Children's safety is our top priority. All AI Masterji toys are carefully crafted to ensure they are free of hazards and adhere to strict safety guidelines. We maintain strict compliance with COPPA and other child privacy laws. Our commitment is to provide a safe, secure, and enjoyable experience for kids — guaranteeing peace of mind for parents."
  },
  {
    question: "What languages are currently supported?",
    answer: "Currently, our toys support Hindi and English. However, we are working on expanding language support. You can purchase now and update language support later. Subscribe to our newsletter to stay updated!"
  },
  {
    question: "How long is the battery life per charge?",
    answer: "The battery is designed to last 12–16 hours of continuous play time. For many families, this can be over a week with standard usage."
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
                  openIndex === index ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
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
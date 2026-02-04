import React from 'react';
import { Star, CheckCircle } from 'lucide-react';

const reviews = [
  { id: 1, name: "Priya Sharma", rating: 5, text: "My 4-year-old loves Mimi! Storytelling is a lifesaver.", city: "Mumbai" },
  { id: 2, name: "Rahul Verma", rating: 5, text: "Arnie is indestructible. Best for rough toddlers!", city: "Delhi" },
  { id: 3, name: "Sneha Gupta", rating: 4, text: "Fast delivery. The dancing mode is so much fun.", city: "Bangalore" },
  { id: 4, name: "Amit Patel", rating: 5, text: "Simba is actually helping him learn new words.", city: "Ahmedabad" },
];

export default function HomeReviews() {
  return (
    <div className="bg-black py-12 overflow-hidden border-y border-zinc-900">
      <div className="flex w-max gap-6 animate-marquee">
        {[...reviews, ...reviews].map((review, index) => (
          <div key={index} className="w-[300px] bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl flex-shrink-0">
            <div className="flex text-yellow-500 mb-2">
              {[...Array(review.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
            </div>
            <p className="text-zinc-300 text-sm italic mb-4">"{review.text}"</p>
            <h4 className="text-white font-bold text-xs">{review.name} — <span className="text-zinc-500 font-normal">{review.city}</span></h4>
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 25s linear infinite; }
      `}} />
    </div>
  );
}
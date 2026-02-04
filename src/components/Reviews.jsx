import React from 'react';
import { Star, CheckCircle, User } from 'lucide-react';

// Fake Data for now
const reviews = [
  {
    id: 1,
    name: "Priya Sharma",
    rating: 5,
    date: "2 days ago",
    text: "My 4-year-old loves Mimi! The storytelling feature is a lifesaver at bedtime. Highly recommended for working parents.",
    verified: true
  },
  {
    id: 2,
    name: "Rahul Verma",
    rating: 5,
    date: "1 week ago",
    text: "Built quality is amazing. My son dropped Arnie multiple times and it still works perfectly. Worth the price.",
    verified: true
  },
  {
    id: 3,
    name: "Sneha Gupta",
    rating: 4,
    date: "2 weeks ago",
    text: "Delivery was super fast in Mumbai. The toy is great, but I wish the volume could go a little lower for night mode.",
    verified: true
  },
  {
    id: 4,
    name: "Amit Patel",
    rating: 5,
    date: "1 month ago",
    text: "Simba is the best gift I gave my nephew. He is actually learning words from it. Very happy with the purchase.",
    verified: true
  }
];

export default function Reviews() {
  return (
    <div className="bg-black text-white py-12 border-t border-zinc-900">
      <div className="container mx-auto max-w-6xl px-6">
        
        <h2 className="text-3xl font-bold mb-8">Customer Reviews</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* LEFT: SUMMARY CARD */}
          <div className="bg-zinc-900 p-8 rounded-2xl h-fit sticky top-24 border border-zinc-800">
            <div className="text-center">
              <div className="text-6xl font-black text-white mb-2">4.8</div>
              <div className="flex justify-center gap-1 text-yellow-500 mb-2">
                <Star fill="currentColor" size={24} />
                <Star fill="currentColor" size={24} />
                <Star fill="currentColor" size={24} />
                <Star fill="currentColor" size={24} />
                <Star fill="currentColor" size={24} />
              </div>
              <p className="text-zinc-400 text-sm">Based on 124 Verified Reviews</p>
            </div>

            <div className="mt-8 space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <span className="w-8 text-zinc-400">5 ★</span>
                <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-yellow-500 rounded-full"></div>
                </div>
                <span className="w-8 text-right text-zinc-400">85%</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="w-8 text-zinc-400">4 ★</span>
                <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="w-[10%] h-full bg-yellow-500 rounded-full"></div>
                </div>
                <span className="w-8 text-right text-zinc-400">10%</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="w-8 text-zinc-400">3 ★</span>
                <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="w-[3%] h-full bg-yellow-500 rounded-full"></div>
                </div>
                <span className="w-8 text-right text-zinc-400">3%</span>
              </div>
            </div>
          </div>

          {/* RIGHT: REVIEWS LIST */}
          <div className="lg:col-span-2 space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/50">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400">
                      <User size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{review.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <span>{review.date}</span>
                        {review.verified && (
                          <span className="flex items-center gap-1 text-green-500">
                            <CheckCircle size={12} /> Verified Buyer
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-zinc-700"} />
                    ))}
                  </div>
                </div>
                <p className="text-zinc-300 leading-relaxed">{review.text}</p>
              </div>
            ))}
            
            <button className="w-full py-4 border border-zinc-700 text-zinc-400 font-bold rounded-xl hover:bg-zinc-800 transition-colors">
              Load More Reviews
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
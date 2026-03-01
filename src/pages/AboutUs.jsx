import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Target, Users, Lightbulb, Mail, MapPin, Globe, Brain, Shield, Heart } from 'lucide-react';
import rohitPhoto from '../assets/team/rohit-verma.jpeg';
import gangaPhoto from '../assets/team/ganga-tikkoo.jpg';
import sudhanshuPhoto from '../assets/team/sudhanshu-tyagi.jpg';

const teamMembers = [
  {
    name: 'Rohit Verma',
    role: 'Founder & CEO',
    bio: 'The visionary behind AI Masterji. Rohit combines a deep passion for education with cutting-edge AI to give every Indian child access to a world-class tutor — regardless of their background.',
    color: 'purple',
    seed: 'RohitVerma',
    photo: rohitPhoto,
  },
  {
    name: 'Ganga Tikkoo',
    role: 'Director-BD & Alliances',
    bio: 'Ganga drives the business engine of AI Masterji — from supply chain and partnerships to customer experience. Her operational expertise keeps the mission moving forward.',
    color: 'pink',
    seed: 'GangaTikkoo',
    photo: gangaPhoto,
  },
  {
    name: 'Sudhanshu Tyagi',
    role: 'Project Lead & Developer',
    bio: 'Sudhanshu started this project from scratch and built — the website, AI integrations, backend, hardware and deployment. He continues to manage and drive the technical product forward.',
    color: 'blue',
    seed: 'SudhanshuTyagi',
    photo: sudhanshuPhoto,
  },
];


const values = [
  {
    icon: <Lightbulb size={22} />,
    color: 'yellow',
    title: 'Curiosity First',
    desc: 'We build tools that spark questions, not just answers. Every interaction is designed to make a child lean in.',
  },
  {
    icon: <Target size={22} />,
    color: 'red',
    title: 'Purpose-Driven',
    desc: 'Our products exist to close the education gap - not to harvest data or push ads. Period.',
  },
  {
    icon: <Users size={22} />,
    color: 'green',
    title: 'Family-Safe',
    desc: 'We treat safety as a non-negotiable. Every feature is designed with parents and children in mind.',
  },
  {
    icon: <Rocket size={22} />,
    color: 'purple',
    title: 'India-First',
    desc: 'Built in India, for India. We are proud to be bringing AI-powered education to every Indian home.',
  },
];

const colorMap = {
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30', glow: 'bg-purple-500/20' },
  blue:   { bg: 'bg-blue-500/10',   text: 'text-blue-400',   border: 'border-blue-500/30',   glow: 'bg-blue-500/20' },
  pink:   { bg: 'bg-pink-500/10',   text: 'text-pink-400',   border: 'border-pink-500/30',   glow: 'bg-pink-500/20' },
  yellow: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30', glow: 'bg-yellow-500/20' },
  red:    { bg: 'bg-red-500/10',    text: 'text-red-400',    border: 'border-red-500/30',    glow: 'bg-red-500/20' },
  green:  { bg: 'bg-green-500/10',  text: 'text-green-400',  border: 'border-green-500/30',  glow: 'bg-green-500/20' },
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30', glow: 'bg-orange-500/20' },
};

export default function AboutUs() {
  return (
    <div className="bg-black min-h-screen text-white pt-20">

      {/* â”€â”€ HERO â”€â”€ */}
      <section className="relative overflow-hidden py-16 px-6 text-center border-b border-zinc-800">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-purple-700/15 blur-[130px] rounded-full -z-10" />
        <p className="uppercase text-xs font-bold tracking-[0.3em] text-purple-400 mb-5">About Us</p>
        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
          We're on a mission to make{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            AI education accessible
          </span>{' '}
          to every child
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          AiMasterji was born from a simple belief: every kid deserves a brilliant, patient, and endlessly curious tutor - not just the ones whose parents can afford one.
        </p>
      </section>

      {/* ── TEAM ── */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-4xl font-black text-center mb-4">The Team</h2>
        <p className="text-zinc-500 text-center mb-8 max-w-xl mx-auto">
          A small, obsessed group of builders who genuinely believe this product can change how India learns.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {teamMembers.map(({ name, role, bio, color, seed, photo }) => {
            const c = colorMap[color];
            return (
              <div key={name} className={`bg-zinc-900/50 border ${c.border} rounded-2xl p-8 text-center hover:scale-[1.02] transition-transform`}>
                <div className="relative inline-block mb-5">
                  <div className={`absolute inset-0 ${c.glow} blur-2xl rounded-full`} />
                  {photo ? (
                    <img src={photo} alt={name} className="w-56 h-56 relative z-10 rounded-full object-cover ring-4 ring-zinc-700" />
                  ) : (
                    <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`} alt={name} className="w-56 h-56 relative z-10" />
                  )}
                </div>
                <h3 className={`text-xl font-bold ${c.text}`}>{name}</h3>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-3">{role}</p>
                <p className="text-zinc-400 text-sm leading-relaxed">{bio}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* â”€â”€ THREE PILLARS â”€â”€ */}
      <section className="container mx-auto px-6 py-12">
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
            <p className="text-zinc-400">It detects frustration and excitement. It knows when to encourage a child and when to suggest a break. It's a friend, not just a machine.</p>
          </div>
        </div>
      </section>

      {/* â”€â”€ STORY + STATS â”€â”€ */}
      <section className="container mx-auto px-6 py-12 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black mb-6">Our Story</h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>
                It started with a frustration. Millions of Indian children grow up with textbooks but without real guidance. Private tutors are expensive, screen-time is addictive, and generic apps don't adapt.
              </p>
              <p>
                So we built something physical - a smart companion that sits on a desk, responds to a child's voice, and actually <em className="text-white not-italic font-semibold">teaches</em>. Not just a voice assistant. A tutor.
              </p>
              <p>
                AiMasterji combines the power of large language models, ElevenLabs voice synthesis, and a purpose-built curriculum engine to deliver an experience that feels alive, warm, and safe.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Founded',        value: '2015'    },
              { label: 'Made in',        value: 'India' },
              { label: 'Learning Hours', value: '10,000+' },
              { label: 'Safety Score',   value: '100%'    },
            ].map(({ label, value }) => (
              <div key={label} className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 text-center hover:border-zinc-600 transition-colors">
                <div className="text-3xl font-black text-white mb-1">{value}</div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ VALUES â”€â”€ */}
      <section className="bg-zinc-950 border-y border-zinc-800 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black text-center mb-4">What We Stand For</h2>
          <p className="text-zinc-500 text-center mb-8 max-w-xl mx-auto">
            These aren't just words on a wall. They're the filters through which every product decision is made.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon, color, title, desc }) => {
              const c = colorMap[color];
              return (
                <div key={title} className={`rounded-2xl border ${c.border} bg-zinc-900/40 p-7 hover:scale-[1.02] transition-transform`}>
                  <div className={`w-11 h-11 rounded-xl ${c.bg} ${c.text} flex items-center justify-center mb-5`}>
                    {icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* â”€â”€ MEET THE CLASS â”€â”€ */}


      {/* â”€â”€ TEAM â”€â”€ */}


      {/* â”€â”€ CONTACT CTA â”€â”€ */}
      <section className="border-t border-zinc-800 py-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-4">Get in Touch</h2>
          <p className="text-zinc-400 mb-10">
            Whether you're a parent, a school, a press outlet, or a potential partner - we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-zinc-400 mb-10">
            <a href="mailto:ai.masterji@aalgorix.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail size={16} className="text-purple-400" />
              ai.masterji@aalgorix.com
            </a>
            <span className="hidden sm:block text-zinc-700">|</span>
            <span className="flex items-center gap-2">
              <MapPin size={16} className="text-pink-400" />
              Greater Noida, India
            </span>
            <span className="hidden sm:block text-zinc-700">|</span>
            <a href="https://aimasterji.professorsai.org" className="flex items-center gap-2 hover:text-white transition-colors">
              <Globe size={16} className="text-blue-400" />
              aimasterji.professorsai.org
            </a>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:ai.masterji@aalgorix.com"
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-3 rounded-full transition-colors"
            >
              Email Us
            </a>
            <Link
              to="/support"
              className="border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-bold px-8 py-3 rounded-full transition-colors"
            >
              Support Centre
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

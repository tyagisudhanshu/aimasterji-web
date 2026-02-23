import React, { useState, useEffect } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import {
  Battery, Wifi, Video, Terminal, Activity,
  ArrowLeft, Loader2, User, BookOpen, Music, Moon,
  AlertOctagon, Plus, Trash2, Save, ChevronDown,
  BrainCircuit, Smile, Shield, Clock, Pencil,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

// ── Static robot fleet data ──────────────────────────────────────────────────
const ROBOTS = [
  { id: 'mimi',   name: 'Mimi',   role: 'Storyteller', color: 'bg-pink-500',   border: 'border-pink-500/40',   status: 'online',  battery: 87 },
  { id: 'simba',  name: 'Simba',  role: 'Coder',       color: 'bg-orange-500', border: 'border-orange-500/40', status: 'online',  battery: 62 },
  { id: 'prince', name: 'Prince', role: 'Pro',         color: 'bg-purple-500', border: 'border-purple-500/40', status: 'standby', battery: 34 },
];

const SYSTEM_LOG = [
  { time: '09:41', msg: 'System initialized',             type: 'ok'  },
  { time: '09:41', msg: 'Connecting to server... OK',     type: 'ok'  },
  { time: '09:42', msg: 'Battery check passed',           type: 'ok'  },
  { time: '09:43', msg: 'Camera module ready',            type: 'ok'  },
  { time: '09:44', msg: 'Loaded 3 child profiles',        type: 'ok'  },
  { time: '09:45', msg: 'WARNING: Prince battery low 34%',type: 'warn'},
  { time: '09:46', msg: 'Awaiting instructions...',       type: 'idle'},
];

const ACTIVITY_FEED = [
  { icon: BookOpen,    text: 'Told a jungle story for 12 min',    time: '1h ago',    color: 'text-pink-400'   },
  { icon: BrainCircuit,text: 'Completed coding puzzle #7',        time: '3h ago',    color: 'text-orange-400' },
  { icon: Music,       text: 'Played lullaby — sleep mode',       time: 'Yesterday', color: 'text-blue-400'   },
  { icon: Smile,       text: 'Detected happy mood — played game', time: 'Yesterday', color: 'text-green-400'  },
];

const DEFAULT_CHILD = { name: '', age: '', language: 'English', interests: '' };

const DEFAULT_SAFETY = {
  'Block violent content':   true,
  'Limit session to 30 min': true,
  'Require parent PIN':      false,
  'Safe browsing mode':      true,
};

const DEFAULT_INSTRUCTIONS = [
  'Always speak in a friendly, encouraging tone.',
  'Never discuss scary or violent topics.',
  'Encourage the child to ask questions.',
];

// ── Skeleton shown while data loads ─────────────────────────────────────────
function ControlPanelSkeleton() {
  return (
    <div className="min-h-screen bg-black text-white animate-pulse">
      <div className="h-16 bg-zinc-900 border-b border-zinc-800" />
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 space-y-8">
        <div className="flex gap-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 w-36 bg-zinc-900 rounded-2xl border border-zinc-800" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-96 bg-zinc-900 rounded-2xl border border-zinc-800" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ControlPanel() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  const [activeRobot, setActiveRobot]   = useState('mimi');
  const [childProfile, setChildProfile] = useState(DEFAULT_CHILD);
  const [savedChild, setSavedChild]     = useState(null);
  const [editingChild, setEditingChild] = useState(true);
  const [savingChild, setSavingChild]   = useState(false);

  const [safetyToggles, setSafetyToggles] = useState(DEFAULT_SAFETY);

  const [allInstructions, setAllInstructions] = useState({
    mimi:   [...DEFAULT_INSTRUCTIONS],
    simba:  [...DEFAULT_INSTRUCTIONS],
    prince: [...DEFAULT_INSTRUCTIONS],
  });
  const [newInstruction, setNewInstruction]       = useState('');
  const [savingInstructions, setSavingInstructions] = useState(false);

  // ── Load user data from Firestore on mount ────────────────────────────────
  useEffect(() => {
    if (!user) return;
    getDoc(doc(db, 'users', user.uid)).then(snapshot => {
      if (!snapshot.exists()) return;
      const data = snapshot.data();
      if (data.childProfile) {
        setChildProfile(data.childProfile);
        setSavedChild(data.childProfile);
        setEditingChild(false);
      }
      if (data.safetyToggles) setSafetyToggles(data.safetyToggles);
      setAllInstructions(prev => ({
        mimi:   data.instructions_mimi   ?? prev.mimi,
        simba:  data.instructions_simba  ?? prev.simba,
        prince: data.instructions_prince ?? prev.prince,
      }));
    }).catch(() => {});
  }, [user]);

  // ── Save child profile ────────────────────────────────────────────────────
  async function saveChildProfile() {
    setSavingChild(true);
    try {
      await setDoc(doc(db, 'users', user.uid), { childProfile: { ...childProfile } }, { merge: true });
      setSavedChild({ ...childProfile });
      setEditingChild(false);
      toast.success('Child profile saved!');
    } catch {
      toast.error('Failed to save. Please try again.');
    } finally {
      setSavingChild(false);
    }
  }

  // ── Instructions helpers ──────────────────────────────────────────────────
  const instructions = allInstructions[activeRobot];

  async function addInstruction() {
    const trimmed = newInstruction.trim();
    if (!trimmed) return;
    const updated = { ...allInstructions, [activeRobot]: [...instructions, trimmed] };
    setAllInstructions(updated);
    setNewInstruction('');
    setSavingInstructions(true);
    try {
      await setDoc(doc(db, 'users', user.uid), { [`instructions_${activeRobot}`]: updated[activeRobot] }, { merge: true });
    } catch { /* ignore */ } finally { setSavingInstructions(false); }
  }

  async function removeInstruction(idx) {
    const updated = { ...allInstructions, [activeRobot]: instructions.filter((_, i) => i !== idx) };
    setAllInstructions(updated);
    try {
      await setDoc(doc(db, 'users', user.uid), { [`instructions_${activeRobot}`]: updated[activeRobot] }, { merge: true });
    } catch { /* ignore */ }
  }

  // ── Safety toggle ─────────────────────────────────────────────────────────
  async function toggleSafety(label) {
    const updated = { ...safetyToggles, [label]: !safetyToggles[label] };
    setSafetyToggles(updated);
    try {
      await setDoc(doc(db, 'users', user.uid), { safetyToggles: updated }, { merge: true });
    } catch { /* ignore */ }
  }

  const robot = ROBOTS.find(r => r.id === activeRobot);

  if (isLoading) return <ControlPanelSkeleton />;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return (
    <div className="min-h-screen bg-black text-white pb-16">

      {/* ── TOP HEADER ──────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-black/90 backdrop-blur border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-zinc-500 hover:text-white flex items-center gap-2 text-sm">
            <ArrowLeft size={16} /> Dashboard
          </Link>
          <span className="text-zinc-700">|</span>
          <span className="text-white font-bold">Control Panel</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold px-3 py-1 rounded-full border flex items-center gap-1.5
            ${robot.status === 'online'
              ? 'text-green-400 bg-green-500/10 border-green-500/20'
              : 'text-zinc-400 bg-zinc-800 border-zinc-700'}`}>
            {robot.status === 'online' ? '● ONLINE' : '◌ STANDBY'}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 space-y-8">

        {/* ── ROBOT SELECTOR TABS ─────────────────────────────────────── */}
        <div className="flex gap-3 flex-wrap">
          {ROBOTS.map(r => (
            <button
              key={r.id}
              onClick={() => { setActiveRobot(r.id); setNewInstruction(''); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all
                ${activeRobot === r.id
                  ? `${r.border} bg-zinc-800 shadow-lg scale-[1.02]`
                  : 'border-zinc-800 bg-zinc-900 hover:bg-zinc-800'}`}
            >
              <div className={`w-8 h-8 rounded-xl ${r.color} flex items-center justify-center text-white font-black text-xs`}>
                {r.name[0]}
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-sm leading-none">{r.name}</p>
                <p className="text-zinc-500 text-[11px] mt-0.5">{r.role}</p>
              </div>
              <div className={`text-[11px] font-bold ml-2 flex items-center gap-1
                ${r.battery > 50 ? 'text-green-400' : r.battery > 25 ? 'text-yellow-400' : 'text-red-400'}`}>
                <Battery size={12} /> {r.battery}%
              </div>
            </button>
          ))}
        </div>

        {/* ── MAIN 3-COLUMN GRID ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── COLUMN 1: Camera + System Log ─────────────────────────── */}
          <div className="lg:col-span-1 flex flex-col gap-6">

            {/* Camera Feed */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
              <div className="relative h-48">
                <div className="absolute top-3 left-3 z-10 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded animate-pulse flex items-center gap-1">
                  <Video size={11} /> LIVE
                </div>
                <div className="absolute top-3 right-3 z-10 bg-black/60 text-white text-[10px] px-2 py-1 rounded font-mono">
                  {robot.name}-CAM
                </div>
                <img
                  src="https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=800&auto=format&fit=crop"
                  className="w-full h-full object-cover opacity-40"
                  alt="Robot View"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-zinc-600 font-mono text-xs">[ WAITING FOR INPUT ]</p>
                </div>
              </div>
              {/* Quick action buttons */}
              <div className="p-4 grid grid-cols-2 gap-2">
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5">
                  <BrainCircuit size={13} /> Start Lesson
                </button>
                <button className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5">
                  <Music size={13} /> Play Music
                </button>
                <button className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5">
                  <Moon size={13} /> Sleep Mode
                </button>
                <button className="bg-red-900/50 hover:bg-red-900 text-red-300 font-bold py-2.5 rounded-xl text-xs transition-colors border border-red-900 flex items-center justify-center gap-1.5">
                  <AlertOctagon size={13} /> Stop
                </button>
              </div>
            </div>

            {/* System Log Terminal */}
            <div className="bg-black border border-zinc-800 rounded-2xl p-4 font-mono text-xs flex-1">
              <div className="flex items-center gap-2 text-zinc-500 border-b border-zinc-800 pb-2 mb-3">
                <Terminal size={13} /> System Log — {robot.name}
              </div>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {SYSTEM_LOG.map((log, i) => (
                  <p key={i} className={
                    log.type === 'warn' ? 'text-yellow-400' :
                    log.type === 'idle' ? 'text-zinc-500 animate-pulse' :
                    'text-green-400'
                  }>
                    <span className="text-zinc-600 mr-2">[{log.time}]</span>{log.msg}
                  </p>
                ))}
              </div>
            </div>

          </div>

          {/* ── COLUMN 2: Child Profile + Safety ─────────────────────── */}
          <div className="lg:col-span-1 flex flex-col gap-6">

            {/* Child Profile Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold flex items-center gap-2">
                  <User size={16} className="text-blue-400" /> Child Profile
                </h3>
                {!editingChild && (
                  <button onClick={() => setEditingChild(true)}
                    className="text-xs text-zinc-400 hover:text-white flex items-center gap-1">
                    <Pencil size={11} /> Edit
                  </button>
                )}
              </div>

              {editingChild ? (
                <div className="space-y-3">
                  <div>
                    <label className="text-zinc-500 text-[11px] uppercase tracking-wider mb-1 block">Child's Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Aarav"
                      value={childProfile.name}
                      onChange={e => setChildProfile(p => ({ ...p, name: e.target.value }))}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-zinc-500 text-[11px] uppercase tracking-wider mb-1 block">Age</label>
                    <input
                      type="number"
                      min={1} max={16}
                      placeholder="e.g. 7"
                      value={childProfile.age}
                      onChange={e => setChildProfile(p => ({ ...p, age: e.target.value }))}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-zinc-500 text-[11px] uppercase tracking-wider mb-1 block">Preferred Language</label>
                    <div className="relative">
                      <select
                        value={childProfile.language}
                        onChange={e => setChildProfile(p => ({ ...p, language: e.target.value }))}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none"
                      >
                        {['English', 'Hindi', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Punjabi'].map(l => (
                          <option key={l} value={l}>{l}</option>
                        ))}
                      </select>
                      <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="text-zinc-500 text-[11px] uppercase tracking-wider mb-1 block">Interests</label>
                    <input
                      type="text"
                      placeholder="e.g. Dinosaurs, Space, Drawing"
                      value={childProfile.interests}
                      onChange={e => setChildProfile(p => ({ ...p, interests: e.target.value }))}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                  <button
                    onClick={saveChildProfile}
                    disabled={!childProfile.name || !childProfile.age || savingChild}
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white font-bold py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    {savingChild
                      ? <><Loader2 size={14} className="animate-spin" /> Saving...</>
                      : <><Save size={14} /> Save Profile</>}
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {[
                    { icon: User,     label: 'Name',     value: savedChild?.name },
                    { icon: Clock,    label: 'Age',      value: `${savedChild?.age} years old` },
                    { icon: BookOpen, label: 'Language', value: savedChild?.language },
                    { icon: Smile,    label: 'Interests',value: savedChild?.interests || '—' },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3 bg-zinc-800/60 rounded-xl px-3 py-2.5">
                      <Icon size={14} className="text-purple-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-zinc-500 text-[10px] uppercase tracking-wider">{label}</p>
                        <p className="text-white text-sm font-medium">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Safety Settings */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
              <h3 className="text-white font-bold flex items-center gap-2 mb-4">
                <Shield size={16} className="text-green-400" /> Safety Settings
              </h3>
              {Object.entries(safetyToggles).map(([label, on]) => (
                <div key={label} className="flex items-center justify-between py-2.5 border-b border-zinc-800 last:border-0">
                  <span className="text-zinc-300 text-sm">{label}</span>
                  <button
                    onClick={() => toggleSafety(label)}
                    className={`w-10 h-5 rounded-full transition-colors relative ${on ? 'bg-green-500' : 'bg-zinc-700'}`}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${on ? 'left-5' : 'left-0.5'}`} />
                  </button>
                </div>
              ))}
            </div>

          </div>

          {/* ── COLUMN 3: Robot Instructions + Activity ───────────────── */}
          <div className="lg:col-span-1 flex flex-col gap-6">

            {/* Robot Instructions */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-white font-bold flex items-center gap-2">
                  <BrainCircuit size={16} className="text-yellow-400" /> Robot Instructions
                </h3>
                {savingInstructions && <Loader2 size={12} className="text-zinc-500 animate-spin" />}
              </div>
              <p className="text-zinc-500 text-xs mb-4">{robot.name} will follow these rules at all times.</p>

              <div className="space-y-2 mb-4 max-h-56 overflow-y-auto pr-1">
                {instructions.map((inst, i) => (
                  <div key={i} className="flex items-start gap-2 bg-zinc-800/60 rounded-xl px-3 py-2.5 group">
                    <span className="text-yellow-500 mt-0.5 text-xs font-bold shrink-0">{i + 1}.</span>
                    <p className="text-zinc-300 text-xs leading-relaxed flex-1">{inst}</p>
                    <button
                      onClick={() => removeInstruction(i)}
                      className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-400 shrink-0 transition-opacity"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
                {instructions.length === 0 && (
                  <p className="text-zinc-600 text-xs text-center py-4">No instructions yet. Add one below.</p>
                )}
              </div>

              {/* Add instruction input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a new instruction..."
                  value={newInstruction}
                  onChange={e => setNewInstruction(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addInstruction()}
                  className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-500 transition-colors"
                />
                <button
                  onClick={addInstruction}
                  className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-3 py-2 rounded-xl text-xs transition-colors flex items-center gap-1"
                >
                  <Plus size={13} />
                </button>
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex-1">
              <h3 className="text-white font-bold flex items-center gap-2 mb-4">
                <Activity size={16} className="text-blue-400" /> Recent Activity
              </h3>
              <div className="space-y-3">
                {ACTIVITY_FEED.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 bg-zinc-800/40 rounded-xl px-3 py-3">
                    <a.icon size={15} className={`${a.color} shrink-0 mt-0.5`} />
                    <div className="flex-1">
                      <p className="text-zinc-300 text-xs leading-relaxed">{a.text}</p>
                      <p className="text-zinc-600 text-[10px] mt-0.5">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
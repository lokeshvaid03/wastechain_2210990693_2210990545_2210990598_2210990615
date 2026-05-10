import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Recycle, QrCode, TrendingUp, Award, Shield, Leaf, ArrowRight, Users, Zap, Globe, ChevronDown, CheckCircle, Star, Package, Truck, Building2, Droplets, Wind, TreePine } from 'lucide-react';

const testimonials = [
  { name: 'Priya Sharma', role: 'Citizen', text: 'WasteChain made recycling fun! I earned 500 points in just 2 weeks and got the Recycling Hero badge.', rating: 5, emoji: '👩' },
  { name: 'Rahul Verma', role: 'Collector', text: 'The real-time pickup notifications are amazing. I can manage my route efficiently and track my earnings.', rating: 5, emoji: '👨' },
  { name: 'Anita Singh', role: 'Recycling Center', text: 'The blockchain traceability gives us complete transparency. Our clients trust us more than ever.', rating: 5, emoji: '👩‍💼' },
];

// Diagram 2: Circular Flow
function CircularFlow() {
  const nodes = [
    { label: 'Citizen', emoji: '🏠', color: 'from-blue-500 to-cyan-500', angle: 270 },
    { label: 'Collector', emoji: '🚛', color: 'from-orange-500 to-amber-500', angle: 30 },
    { label: 'Recycler', emoji: '🏭', color: 'from-green-500 to-emerald-500', angle: 150 },
  ];
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 text-center">🔄 Closed-Loop Ecosystem</h3>
      <p className="text-xs text-center text-gray-500 dark:text-gray-400 mb-6">Everyone connected in one seamless loop</p>
      <div className="relative w-64 h-64 mx-auto">
        {/* Center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-xl animate-spin" style={{ animationDuration: '12s' }}>
            <Recycle className="w-8 h-8 text-white" />
          </div>
        </div>
        {/* Orbit ring */}
        <div className="absolute inset-4 rounded-full border-2 border-dashed border-green-300 dark:border-green-700 animate-spin" style={{ animationDuration: '20s' }} />
        {/* Nodes */}
        {nodes.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180;
          const x = 50 + 40 * Math.cos(rad);
          const y = 50 + 40 * Math.sin(rad);
          return (
            <div key={i} className="absolute transform -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
              <div className={`w-14 h-14 bg-gradient-to-br ${node.color} rounded-2xl flex flex-col items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300`}>
                <span className="text-xl">{node.emoji}</span>
              </div>
              <p className="text-xs font-bold text-center mt-1 text-gray-700 dark:text-gray-300">{node.label}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        Real-time updates via Socket.io
      </div>
    </div>
  );
}

// Diagram 3: Phone Mockup
function PhoneMockup() {
  const steps = ['Submitted', 'Pickup Scheduled', 'Collected', 'Delivered', 'Recycled ✅'];
  const colors = ['bg-blue-500', 'bg-yellow-500', 'bg-orange-500', 'bg-purple-500', 'bg-green-500'];
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 text-center">📱 Waste Submission Card</h3>
      <p className="text-xs text-center text-gray-500 dark:text-gray-400 mb-6">Track every step of your waste journey</p>
      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-inner">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-gray-500">Waste ID</p>
            <p className="font-mono text-sm font-bold text-gray-900 dark:text-white">WC-1234-ABCD</p>
          </div>
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-full text-xs font-bold">Recycled ✅</span>
        </div>
        <div className="flex gap-3 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center text-3xl shadow">🧴</div>
          <div>
            <p className="font-bold text-gray-900 dark:text-white">Plastic Bottles</p>
            <p className="text-sm text-gray-500">2.5 kg • +25 pts</p>
            <p className="text-xs text-gray-400 mt-1">Pickup: Sector 12, Punjab</p>
          </div>
        </div>
        <div className="space-y-2">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${colors[i]} flex-shrink-0`} />
              <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className={`h-full ${colors[i]} rounded-full transition-all duration-1000`} style={{ width: '100%' }} />
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 w-24 text-right">{s}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        Blockchain verified • SHA-256
      </div>
    </div>
  );
}

// Diagram 4: Impact Counter
function ImpactCounter() {
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const targets = [1247, 3891, 892, 156];
  useEffect(() => {
    const interval = setInterval(() => {
      setCounts(prev => prev.map((c, i) => c < targets[i] ? Math.min(c + Math.ceil(targets[i] / 60), targets[i]) : c));
    }, 50);
    return () => clearInterval(interval);
  }, []);
  const items = [
    { icon: '♻️', label: 'Items Recycled', color: 'from-green-500 to-emerald-500' },
    { icon: '🌱', label: 'kg CO₂ Saved', color: 'from-teal-500 to-cyan-500' },
    { icon: '💧', label: 'Litres Water Saved', color: 'from-blue-500 to-cyan-500' },
    { icon: '🌳', label: 'Trees Equivalent', color: 'from-lime-500 to-green-500' },
  ];
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 text-center">🌍 Real-Time Impact</h3>
      <p className="text-xs text-center text-gray-500 dark:text-gray-400 mb-6">Our community's environmental contribution</p>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item, i) => (
          <div key={i} className={`bg-gradient-to-br ${item.color} rounded-2xl p-5 text-white text-center shadow-lg hover:scale-105 transition-transform duration-300`}>
            <span className="text-3xl">{item.icon}</span>
            <p className="text-2xl font-extrabold mt-2">{counts[i].toLocaleString()}</p>
            <p className="text-xs opacity-80 mt-1">{item.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        Live community stats
      </div>
    </div>
  );
}

// Diagram 5: Map-style Pickup Visual
function MapVisual() {
  const pickups = [
    { x: 20, y: 30, label: 'Sector 12', status: 'Submitted', color: 'bg-blue-500', pulse: true },
    { x: 55, y: 20, label: 'Sector 7', status: 'Collected', color: 'bg-orange-500', pulse: false },
    { x: 75, y: 50, label: 'Sector 3', status: 'Recycled', color: 'bg-green-500', pulse: false },
    { x: 35, y: 65, label: 'Sector 18', status: 'Pickup Scheduled', color: 'bg-yellow-500', pulse: true },
    { x: 65, y: 75, label: 'Sector 9', status: 'Submitted', color: 'bg-blue-500', pulse: true },
  ];
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 text-center">🗺️ Live Pickup Map</h3>
      <p className="text-xs text-center text-gray-500 dark:text-gray-400 mb-4">Active waste pickups in your area</p>
      <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl h-52 overflow-hidden border border-green-200 dark:border-gray-600">
        {/* Grid lines */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="absolute w-full border-t border-green-200/50 dark:border-gray-600/50" style={{ top: `${i * 25}%` }} />
        ))}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="absolute h-full border-l border-green-200/50 dark:border-gray-600/50" style={{ left: `${i * 25}%` }} />
        ))}
        {/* Pickup pins */}
        {pickups.map((p, i) => (
          <div key={i} className="absolute transform -translate-x-1/2 -translate-y-1/2" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
            {p.pulse && <div className={`absolute inset-0 ${p.color} rounded-full animate-ping opacity-40 w-6 h-6 -translate-x-1/4 -translate-y-1/4`} />}
            <div className={`w-4 h-4 ${p.color} rounded-full shadow-lg border-2 border-white relative z-10`} />
            <div className="absolute left-5 top-0 bg-white dark:bg-gray-800 rounded-lg px-2 py-1 shadow text-xs font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap z-20">
              {p.label}
            </div>
          </div>
        ))}
        {/* Collector truck */}
        <div className="absolute animate-bounce" style={{ left: '45%', top: '45%', animationDuration: '2s' }}>
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg text-lg">🚛</div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs">
        {[['bg-blue-500', 'Submitted'], ['bg-yellow-500', 'Scheduled'], ['bg-orange-500', 'Collected'], ['bg-green-500', 'Recycled']].map(([c, l]) => (
          <span key={l} className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <span className={`w-2 h-2 ${c} rounded-full`} />{l}
          </span>
        ))}
      </div>
    </div>
  );
}

// Carousel wrapper
function DiagramCarousel() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const diagrams = [
    { label: 'Circular Flow', component: <CircularFlow /> },
    { label: 'Submission Card', component: <PhoneMockup /> },
    { label: 'Impact Counter', component: <ImpactCounter /> },
    { label: 'Live Map', component: <MapVisual /> },
  ];

  useEffect(() => {
    setProgress(0);
    const progressInterval = setInterval(() => setProgress(p => Math.min(p + 100 / 50, 100)), 100);
    const switchInterval = setTimeout(() => {
      setActive(a => (a + 1) % diagrams.length);
    }, 5000);
    return () => { clearInterval(progressInterval); clearTimeout(switchInterval); };
  }, [active]);

  return (
    <div className="relative">
      {/* Diagram */}
      <div key={active} style={{ animation: 'fadeIn 0.5s ease' }}>
        {diagrams[active].component}
      </div>
      {/* Dots + Progress */}
      <div className="mt-4 flex items-center justify-center gap-3">
        {diagrams.map((d, i) => (
          <button key={i} onClick={() => setActive(i)} className="flex flex-col items-center gap-1 group">
            <div className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-8 bg-green-500' : 'w-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'}`}>
              {i === active && (
                <div className="h-full bg-green-400 rounded-full transition-all duration-100" style={{ width: `${progress}%` }} />
              )}
            </div>
          </button>
        ))}
      </div>
      <p className="text-center text-xs text-gray-400 mt-2">{diagrams[active].label} • auto-rotating</p>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 overflow-hidden">

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-300 dark:bg-green-900 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-30 animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-300 dark:bg-emerald-900 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-200 dark:bg-teal-900 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-8">
                <Zap className="w-4 h-4 animate-pulse" /> Blockchain-Powered Recycling Platform
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-gray-900 dark:text-white leading-tight">
                Turn Waste into{' '}
                <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                  Value
                </span>
              </h1>
              <p className="text-xl mb-10 text-gray-600 dark:text-gray-300 leading-relaxed">
                Join the recycling revolution. Track your waste, earn rewards, and build a sustainable future with our transparent, AI-powered platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/register" className="inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-green-500/30 hover:scale-105 transition-all duration-300">
                  Get Started Free <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link to="/info" className="inline-flex items-center justify-center border-2 border-gray-300 dark:border-gray-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105 transition-all duration-300">
                  Learn More
                </Link>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                {['Free to join', 'No credit card', 'Instant rewards'].map((t, i) => (
                  <span key={i} className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-500" /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — Rotating Diagram Carousel */}
            <DiagramCarousel />
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '10K+', label: 'Items Recycled', icon: Recycle },
              { value: '500+', label: 'Active Citizens', icon: Users },
              { value: '50+', label: 'Collectors', icon: Truck },
              { value: '99%', label: 'Transparency', icon: Shield },
            ].map((stat, i) => (
              <div key={i} className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-green-500 group-hover:scale-125 transition-transform duration-300" />
                <p className="text-3xl font-extrabold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">{stat.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center animate-bounce">
            <ChevronDown className="w-8 h-8 mx-auto text-gray-400" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-green-600 uppercase tracking-widest">Our Features</span>
            <h2 className="mt-2 text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white">Everything for Smart Recycling</h2>
            <p className="mt-4 text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Powered by AI, secured by blockchain, rewarded by points.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: QrCode, title: 'QR Code Tracking', desc: 'Every submission gets a unique QR code for complete lifecycle tracking.', color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50 dark:bg-blue-900/20', badge: 'Instant', stat: '100%', statLabel: 'Traceable' },
              { icon: Shield, title: 'Blockchain Traceability', desc: 'Immutable SHA-256 hash chaining ensures transparency at every step.', color: 'from-purple-500 to-violet-500', bg: 'bg-purple-50 dark:bg-purple-900/20', badge: 'Secure', stat: '256-bit', statLabel: 'Encrypted' },
              { icon: Award, title: 'Gamified Rewards', desc: 'Earn points, unlock badges, and level up for your recycling efforts.', color: 'from-yellow-500 to-orange-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20', badge: 'Fun', stat: '4 Levels', statLabel: 'To Unlock' },
              { icon: TrendingUp, title: 'AI-Powered Detection', desc: 'Smart waste classification using Gemini AI to identify materials instantly.', color: 'from-green-500 to-emerald-500', bg: 'bg-green-50 dark:bg-green-900/20', badge: 'Smart', stat: 'Gemini', statLabel: 'AI Engine' },
              { icon: Recycle, title: 'Closed-Loop Ecosystem', desc: 'Connects citizens, collectors, and recyclers in one seamless platform.', color: 'from-teal-500 to-cyan-500', bg: 'bg-teal-50 dark:bg-teal-900/20', badge: 'Live', stat: '3 Roles', statLabel: 'Connected' },
              { icon: Leaf, title: 'Sustainability Impact', desc: 'Visualize your environmental impact with detailed analytics dashboards.', color: 'from-lime-500 to-green-500', bg: 'bg-lime-50 dark:bg-lime-900/20', badge: 'Green', stat: 'Real-time', statLabel: 'Analytics' },
            ].map((f, i) => (
              <div key={i} className={`group relative p-8 ${f.bg} rounded-3xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden cursor-default`}
                style={{ animationDelay: `${i * 100}ms` }}>
                {/* Animated background glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`} />
                {/* Top row: icon + badge */}
                <div className="flex items-start justify-between mb-5">
                  <div className={`relative inline-flex p-3 rounded-2xl bg-gradient-to-br ${f.color} shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <f.icon className="w-7 h-7 text-white" />
                    <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white rounded-full border-2 border-green-400 animate-ping" />
                    <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-green-400 rounded-full" />
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${f.color} text-white shadow-md tracking-wide`}>{f.badge}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}>{f.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm mb-5">{f.desc}</p>
                {/* Stat pill */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200/60 dark:border-gray-700/60">
                  <div className={`flex-1 h-1 rounded-full bg-gradient-to-r ${f.color} opacity-40 group-hover:opacity-100 transition-opacity duration-500`} />
                  <span className={`text-xs font-extrabold bg-gradient-to-r ${f.color} bg-clip-text text-transparent`}>{f.stat}</span>
                  <span className="text-xs text-gray-400">{f.statLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-green-600 uppercase tracking-widest">Process</span>
            <h2 className="mt-2 text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white">Simple Steps to a Cleaner Planet</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center relative">
            <div className="hidden md:block absolute top-10 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300 dark:from-green-700 dark:via-emerald-700 dark:to-teal-700" />
            {[
              { step: '01', title: 'Submit & Scan', desc: 'Log your waste with a photo and get a unique QR code instantly.', icon: QrCode },
              { step: '02', title: 'Schedule Pickup', desc: 'A local collector is notified and picks up your waste.', icon: Users },
              { step: '03', title: 'Track Journey', desc: 'Follow your waste from pickup to the recycling facility.', icon: Globe },
              { step: '04', title: 'Earn Rewards', desc: 'Get points and badges once your waste is fully recycled.', icon: Award },
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative z-10">
                  <item.icon className="w-9 h-9" />
                </div>
                <span className="text-xs font-bold text-green-500 tracking-widest">{item.step}</span>
                <h3 className="text-xl font-bold mt-1 mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-green-600 uppercase tracking-widest">Testimonials</span>
            <h2 className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-white">What Our Users Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="group bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {t.emoji}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">{t.name}</p>
                    <p className="text-sm text-green-600">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-green-600 uppercase tracking-widest">Roles</span>
            <h2 className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-white">Who Uses WasteChain?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { emoji: '🏠', role: 'Citizen', color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50 dark:bg-blue-900/20', perks: ['Submit waste with photo', 'Earn points & badges', 'Track waste lifecycle', 'AI waste detection'] },
              { emoji: '🚛', role: 'Collector', color: 'from-orange-500 to-amber-500', bg: 'bg-orange-50 dark:bg-orange-900/20', perks: ['View nearby pickups', 'Real-time notifications', 'Track earnings', 'Manage collections'] },
              { emoji: '🏭', role: 'Recycling Center', color: 'from-green-500 to-emerald-500', bg: 'bg-green-50 dark:bg-green-900/20', perks: ['Incoming waste dashboard', 'Category analytics', 'Mark items recycled', 'Blockchain verified'] },
            ].map((r, i) => (
              <div key={i} className={`group p-8 ${r.bg} rounded-3xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300`}>
                <div className={`w-16 h-16 bg-gradient-to-br ${r.color} rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  {r.emoji}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{r.role}</h3>
                <ul className="space-y-2">
                  {r.perks.map((p, j) => (
                    <li key={j} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" /> {p}
                    </li>
                  ))}
                </ul>
                <Link to="/register" className={`mt-6 inline-flex items-center gap-2 text-sm font-bold bg-gradient-to-r ${r.color} bg-clip-text text-transparent hover:opacity-80 transition-opacity`}>
                  Join as {r.role} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 rounded-3xl p-12 md:p-20 text-white text-center overflow-hidden shadow-2xl">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full animate-pulse" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
            <div className="relative">
              <Recycle className="w-16 h-16 mx-auto mb-6 animate-spin" style={{ animationDuration: '8s' }} />
              <h2 className="text-4xl lg:text-5xl font-extrabold mb-4">Join the Movement Today!</h2>
              <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">Every piece of waste you track contributes to a cleaner, more sustainable world.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register" className="inline-flex items-center justify-center bg-white text-green-600 px-12 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  Create Free Account <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link to="/features" className="inline-flex items-center justify-center border-2 border-white/50 text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-white/10 hover:scale-105 transition-all duration-300">
                  Explore Features
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Recycle className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Waste<span className="text-green-500">Chain</span></span>
              </div>
              <p className="text-sm leading-relaxed">A new era of recycling, powered by technology and community.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm">
                {[['About Us', '/about'], ['Features', '/features'], ['How It Works', '/info'], ['Contact', '/contact']].map(([label, to]) => (
                  <li key={to}><Link to={to} className="hover:text-green-400 transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Account</h3>
              <ul className="space-y-2 text-sm">
                {[['Sign Up', '/register'], ['Login', '/login']].map(([label, to]) => (
                  <li key={to}><Link to={to} className="hover:text-green-400 transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                {[['Privacy Policy', '/privacy'], ['Terms of Service', '/terms']].map(([label, to]) => (
                  <li key={to}><Link to={to} className="hover:text-green-400 transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} WasteChain. All rights reserved. Built with 💚 for a greener planet.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

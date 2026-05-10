import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Recycle, QrCode, TrendingUp, Award, Shield, Leaf, ArrowRight, Zap, CheckCircle, Sparkles, Lock, BarChart3, Bell, Users, Globe } from 'lucide-react';

const features = [
  {
    icon: QrCode, title: 'QR Code Tracking', number: '01',
    desc: 'Every waste submission gets a unique QR code for complete lifecycle tracking from your doorstep to the recycling facility.',
    color: 'from-blue-500 to-cyan-500', border: 'border-blue-200 dark:border-blue-800',
    glow: 'shadow-blue-500/20', text: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-900/10',
    points: ['Unique ID per submission', 'Scan to track anywhere', 'Full lifecycle visibility'],
    stat: '100%', statLabel: 'Traceable', emoji: '📱',
  },
  {
    icon: Shield, title: 'Blockchain Traceability', number: '02',
    desc: 'Our platform uses SHA-256 hash chaining, ensuring all records are immutable, transparent, and accountable.',
    color: 'from-purple-500 to-violet-500', border: 'border-purple-200 dark:border-purple-800',
    glow: 'shadow-purple-500/20', text: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-900/10',
    points: ['SHA-256 hash chaining', 'Tamper-proof records', 'Full audit trail'],
    stat: '256-bit', statLabel: 'Encrypted', emoji: '🔐',
  },
  {
    icon: Award, title: 'Gamified Rewards', number: '03',
    desc: 'Earn points, badges, and level up for your recycling efforts. Turn sustainable habits into tangible rewards.',
    color: 'from-yellow-500 to-orange-500', border: 'border-yellow-200 dark:border-yellow-800',
    glow: 'shadow-yellow-500/20', text: 'text-yellow-600 dark:text-yellow-400',
    bg: 'bg-yellow-50 dark:bg-yellow-900/10',
    points: ['Points per kg recycled', '4 achievement levels', 'Collectible badges'],
    stat: '4 Levels', statLabel: 'To Unlock', emoji: '🏆',
  },
  {
    icon: TrendingUp, title: 'AI-Powered Detection', number: '04',
    desc: 'Smart waste classification using Google Gemini AI to instantly identify recyclable materials from a photo.',
    color: 'from-green-500 to-emerald-500', border: 'border-green-200 dark:border-green-800',
    glow: 'shadow-green-500/20', text: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-50 dark:bg-green-900/10',
    points: ['Gemini AI integration', 'Auto category detection', 'Disposal instructions'],
    stat: 'Gemini', statLabel: 'AI Engine', emoji: '🤖',
  },
  {
    icon: Recycle, title: 'Closed-Loop Ecosystem', number: '05',
    desc: 'Connects all stakeholders — citizens, collectors, and recyclers — creating a seamless and efficient loop.',
    color: 'from-teal-500 to-cyan-500', border: 'border-teal-200 dark:border-teal-800',
    glow: 'shadow-teal-500/20', text: 'text-teal-600 dark:text-teal-400',
    bg: 'bg-teal-50 dark:bg-teal-900/10',
    points: ['3 role system', 'Real-time status updates', 'Socket.io notifications'],
    stat: '3 Roles', statLabel: 'Connected', emoji: '🔄',
  },
  {
    icon: Leaf, title: 'Sustainability Analytics', number: '06',
    desc: 'Detailed dashboards provide analytics on recycling habits, letting you visualize your positive environmental impact.',
    color: 'from-lime-500 to-green-500', border: 'border-lime-200 dark:border-lime-800',
    glow: 'shadow-lime-500/20', text: 'text-lime-600 dark:text-lime-400',
    bg: 'bg-lime-50 dark:bg-lime-900/10',
    points: ['Personal stats dashboard', 'Category breakdown charts', 'Admin analytics panel'],
    stat: 'Real-time', statLabel: 'Analytics', emoji: '🌍',
  },
];

const stats = [
  { icon: Users, value: '500+', label: 'Active Citizens', color: 'from-blue-500 to-cyan-500' },
  { icon: Recycle, value: '10K+', label: 'Items Recycled', color: 'from-green-500 to-emerald-500' },
  { icon: Globe, value: '99%', label: 'Transparency', color: 'from-purple-500 to-violet-500' },
  { icon: Bell, value: '<1s', label: 'Realtime Alerts', color: 'from-orange-500 to-amber-500' },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FeatureCard({ f, i }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={`group relative ${f.bg} border ${f.border} rounded-3xl p-8 hover:shadow-2xl ${f.glow} hover:-translate-y-3 transition-all duration-500 overflow-hidden cursor-default`}
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)', transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s, box-shadow 0.3s, translate 0.3s` }}
    >
      {/* Hover glow bg */}
      <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 rounded-3xl pointer-events-none`} />

      {/* Number watermark */}
      <span className="absolute top-4 right-6 text-7xl font-black text-gray-100 dark:text-gray-800 select-none pointer-events-none leading-none">{f.number}</span>

      {/* Top row */}
      <div className="flex items-start justify-between mb-6 relative">
        <div className={`relative inline-flex p-4 rounded-2xl bg-gradient-to-br ${f.color} shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
          <f.icon className="w-7 h-7 text-white" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-ping" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
        </div>
        <span className="text-2xl">{f.emoji}</span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-extrabold mb-2 text-gray-900 dark:text-white">{f.title}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-5">{f.desc}</p>

      {/* Points */}
      <ul className="space-y-2 mb-6">
        {f.points.map((p, j) => (
          <li key={j} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <CheckCircle className={`w-4 h-4 flex-shrink-0 ${f.text}`} />
            {p}
          </li>
        ))}
      </ul>

      {/* Stat bar */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-200/60 dark:border-gray-700/60">
        <div className={`flex-1 h-1 rounded-full bg-gradient-to-r ${f.color} opacity-30 group-hover:opacity-100 transition-all duration-700`} />
        <span className={`text-xs font-extrabold bg-gradient-to-r ${f.color} bg-clip-text text-transparent`}>{f.stat}</span>
        <span className="text-xs text-gray-400">{f.statLabel}</span>
      </div>
    </div>
  );
}

function StatBar() {
  const [ref, visible] = useInView(0.2);
  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
      {stats.map((s, i) => (
        <div key={i} className={`text-center transition-all duration-700`}
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transitionDelay: `${i * 0.1}s` }}>
          <div className={`w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg`}>
            <s.icon className="w-7 h-7 text-white" />
          </div>
          <p className={`text-3xl font-extrabold bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>{s.value}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

export default function FeaturesPage() {
  return (
    <div className="bg-white dark:bg-gray-900 overflow-hidden">

      {/* Hero */}
      <section className="relative py-28 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
        {/* Animated blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-green-300 dark:bg-green-900/40 rounded-full filter blur-3xl opacity-30 animate-pulse" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-teal-300 dark:bg-teal-900/40 rounded-full filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-emerald-200 dark:bg-emerald-900/30 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '3s' }} />
        </div>

        {/* Floating icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {['♻️', '🌱', '🔐', '🤖', '🏆', '🌍'].map((e, i) => (
            <span key={i} className="absolute text-2xl opacity-10 animate-bounce select-none"
              style={{ left: `${10 + i * 15}%`, top: `${20 + (i % 3) * 25}%`, animationDelay: `${i * 0.4}s`, animationDuration: `${2.5 + i * 0.3}s` }}>
              {e}
            </span>
          ))}
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-5 py-2.5 rounded-full text-sm font-semibold mb-8 shadow-lg">
            <Sparkles className="w-4 h-4 animate-pulse" /> 6 Powerful Features
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            Built for the{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent">Future</span>
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-full" />
            </span>
            {' '}of Recycling
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10">
            Powered by AI, secured by blockchain, and designed to make sustainable living effortless and rewarding.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['AI-Powered', 'Blockchain Secured', 'Real-time', 'Gamified', 'Open Platform'].map((tag, i) => (
              <span key={i} className="px-4 py-1.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 shadow-sm hover:border-green-400 hover:text-green-600 transition-colors duration-200">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatBar />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-bold text-green-600 uppercase tracking-widest">What We Offer</span>
            <h2 className="mt-2 text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white">Everything You Need</h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">Every feature is crafted to make recycling smarter, transparent, and rewarding.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => <FeatureCard key={i} f={f} i={i} />)}
          </div>
        </div>
      </section>

      {/* How it compares */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm font-bold text-green-600 uppercase tracking-widest">Why WasteChain</span>
            <h2 className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-white">A Platform Like No Other</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Lock, title: 'Tamper-Proof Logs', desc: 'Every status change is hashed and chained — no one can alter the history.', color: 'from-purple-500 to-violet-500' },
              { icon: Zap, title: 'Instant Notifications', desc: 'Socket.IO powers live updates the moment your waste status changes.', color: 'from-yellow-500 to-orange-500' },
              { icon: BarChart3, title: 'Deep Analytics', desc: 'Admins get full CSV exports, charts, and user-level recycling breakdowns.', color: 'from-teal-500 to-cyan-500' },
            ].map((item, i) => (
              <div key={i} className="group relative bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-400 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`} />
                <div className={`w-14 h-14 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="relative bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 rounded-3xl p-14 text-white overflow-hidden shadow-2xl">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/10 rounded-full animate-pulse" />
              <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
            <div className="relative">
              <Recycle className="w-14 h-14 mx-auto mb-5 animate-spin" style={{ animationDuration: '8s' }} />
              <h2 className="text-4xl font-extrabold mb-3">Ready to Recycle Smarter?</h2>
              <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">Join thousands of citizens making a real difference — one submission at a time.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register" className="inline-flex items-center justify-center bg-white text-green-600 px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  Get Started Free <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link to="/info" className="inline-flex items-center justify-center border-2 border-white/50 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 hover:scale-105 transition-all duration-300">
                  How It Works
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

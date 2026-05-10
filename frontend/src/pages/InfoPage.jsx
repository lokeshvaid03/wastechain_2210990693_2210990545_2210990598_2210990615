import { Leaf, Recycle, Check, X, ThumbsUp, ThumbsDown, Zap, Droplets, Wind } from 'lucide-react';
import { Link } from 'react-router-dom';

const benefits = [
  { icon: Leaf, title: 'Conserves Natural Resources', text: 'Recycling reduces the need for extracting raw materials, saving energy and preserving natural habitats.', color: 'from-green-500 to-emerald-500', bg: 'bg-green-50 dark:bg-green-900/20' },
  { icon: Droplets, title: 'Reduces Pollution', text: 'Manufacturing with recycled materials produces significantly less air and water pollution than using virgin materials.', color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { icon: Zap, title: 'Saves Energy', text: 'It takes significantly less energy to reprocess recycled materials than to produce new materials from scratch.', color: 'from-yellow-500 to-orange-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
  { icon: Wind, title: 'Reduces Carbon Footprint', text: 'Recycling helps reduce greenhouse gas emissions, contributing to the fight against climate change.', color: 'from-teal-500 to-cyan-500', bg: 'bg-teal-50 dark:bg-teal-900/20' },
];

const dos = [
  'Clean and dry containers before recycling.',
  'Flatten cardboard boxes to save space.',
  'Check local guidelines for accepted materials.',
  'Recycle all accepted paper, plastic, glass, and metal.',
  'Keep electronics and batteries out of the regular bin.',
];

const donts = [
  'Do not recycle plastic bags in curbside bins.',
  'Avoid putting food waste in recycling containers.',
  'Do not recycle items with mixed materials (like coffee cups).',
  'Keep hazardous waste like paint or chemicals out of recycling.',
  "Don't guess — if unsure, it's better to trash it.",
];

const categories = [
  { name: 'Plastic', points: 10, color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300', examples: 'Bottles, containers, bags' },
  { name: 'Paper', points: 8, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300', examples: 'Newspapers, cardboard, books' },
  { name: 'Metal', points: 20, color: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300', examples: 'Cans, foil, scrap metal' },
  { name: 'Glass', points: 12, color: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300', examples: 'Bottles, jars, containers' },
  { name: 'E-waste', points: 25, color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300', examples: 'Phones, laptops, cables' },
  { name: 'Organic', points: 5, color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300', examples: 'Food scraps, garden waste' },
];

export default function InfoPage() {
  return (
    <div className="bg-white dark:bg-gray-900 overflow-hidden">

      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 bg-green-200 dark:bg-green-900/30 rounded-full filter blur-3xl opacity-40" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-200 dark:bg-emerald-900/30 rounded-full filter blur-3xl opacity-40" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mx-auto mb-6 shadow-xl">
            <Recycle className="w-10 h-10 text-white animate-spin" style={{ animationDuration: '8s' }} />
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
            Your Guide to{' '}
            <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
              Effective Recycling
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Learn how your actions contribute to a cleaner, more sustainable planet.
          </p>
        </div>
      </section>

      {/* Why Recycling Matters */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-green-600 uppercase tracking-widest">Impact</span>
            <h2 className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-white">Why Recycling Matters</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, i) => (
              <div key={i} className={`group p-8 ${b.bg} rounded-3xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center`}>
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${b.color} mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <b.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">{b.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Points per Category */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-green-600 uppercase tracking-widest">Rewards</span>
            <h2 className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-white">Points per Category</h2>
            <p className="mt-4 text-gray-500 dark:text-gray-400">Earn points for every kg of waste you recycle</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((c, i) => (
              <div key={i} className="group bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${c.color}`}>{c.name}</span>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{c.examples}</p>
                </div>
                <span className="text-2xl font-extrabold text-green-600">+{c.points}</span>
                <span className="text-xs text-gray-400">pts/kg</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Do's and Don'ts */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-green-600 uppercase tracking-widest">Guidelines</span>
            <h2 className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-white">Recycling Do's & Don'ts</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg">
                  <ThumbsUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Do's</h3>
              </div>
              <ul className="space-y-4">
                {dos.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 group">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-red-500 to-rose-500 rounded-xl shadow-lg">
                  <ThumbsDown className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Don'ts</h3>
              </div>
              <ul className="space-y-4">
                {donts.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 group">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform">
                      <X className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-emerald-600">
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-extrabold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl opacity-90 mb-8">Start tracking your waste and earning rewards today.</p>
          <Link to="/register" className="inline-flex items-center justify-center bg-white text-green-600 px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:scale-105 transition-all duration-300">
            Join WasteChain Free
          </Link>
        </div>
      </section>
    </div>
  );
}

import { Building, Users, Target, Heart, Leaf, Globe, Award } from 'lucide-react';

const team = [
  { name: 'Pushpinder Singh', role: 'Full Stack Developer', id: '2210990693', emoji: '👨‍💻' },
  { name: 'Narinder Singh', role: 'Backend Developer', id: '2210990598', emoji: '⚙️' },
  { name: 'Lokesh Vaid', role: 'Frontend Developer', id: '2210990545', emoji: '🎨' },
  { name: 'Nipun Kumar', role: 'UI/UX Designer', id: '2210990615', emoji: '✨' },
];

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-gray-900 overflow-hidden">

      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-200 dark:bg-green-900/30 rounded-full filter blur-3xl opacity-40" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200 dark:bg-emerald-900/30 rounded-full filter blur-3xl opacity-40" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">About WasteChain</span>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            Pioneering the Future of{' '}
            <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
              Sustainable Recycling
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            WasteChain is on a mission to revolutionize the recycling industry through transparency, technology, and community engagement.
          </p>
        </div>
      </section>

      {/* Vision Mission Values */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: 'Our Vision', color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'To create a circular economy where waste is a resource, not a burden. A world where every recyclable material is tracked, processed, and given a new life.' },
              { icon: Target, title: 'Our Mission', color: 'from-green-500 to-emerald-500', bg: 'bg-green-50 dark:bg-green-900/20', text: 'To build a transparent and rewarding ecosystem connecting citizens, collectors, and recyclers — making recycling efficient, accountable, and beneficial for everyone.' },
              { icon: Heart, title: 'Our Values', color: 'from-rose-500 to-pink-500', bg: 'bg-rose-50 dark:bg-rose-900/20', text: 'Transparency, sustainability, and community. We believe technology can solve the global waste crisis when paired with the right incentives and human connection.' },
            ].map((item, i) => (
              <div key={i} className={`group p-8 ${item.bg} rounded-3xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300`}>
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${item.color} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-green-500 to-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { value: '10K+', label: 'Items Recycled', icon: Leaf },
              { value: '500+', label: 'Active Users', icon: Users },
              { value: '100%', label: 'Transparent', icon: Globe },
              { value: '50+', label: 'Collectors', icon: Award },
            ].map((s, i) => (
              <div key={i} className="group">
                <s.icon className="w-8 h-8 mx-auto mb-3 opacity-80 group-hover:scale-125 transition-transform duration-300" />
                <p className="text-4xl font-extrabold">{s.value}</p>
                <p className="text-green-100 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-green-600 uppercase tracking-widest">The Team</span>
            <h2 className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-white">Meet the Builders</h2>
            <p className="mt-4 text-gray-500 dark:text-gray-400">CSE Department, Chitkara University</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div key={i} className="group bg-white dark:bg-gray-900 rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-5 shadow-lg group-hover:rotate-6 transition-transform duration-300">
                  {member.emoji}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{member.name}</h3>
                <p className="text-green-600 font-medium text-sm mt-1">{member.role}</p>
                <p className="text-gray-400 text-xs mt-2 font-mono">{member.id}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

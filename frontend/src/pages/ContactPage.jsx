import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="bg-white dark:bg-gray-900 overflow-hidden">

      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 bg-green-200 dark:bg-green-900/30 rounded-full filter blur-3xl opacity-40" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-200 dark:bg-teal-900/30 rounded-full filter blur-3xl opacity-40" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <span className="inline-block bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">Contact Us</span>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
            Let's{' '}
            <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
              Talk
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Have questions or want to partner with us? We'd love to hear from you.</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Info Cards */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Get in Touch</h2>
              {[
                { icon: Mail, title: 'Email Us', lines: ['contact@wastechain.com', 'support@wastechain.com'], color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
                { icon: Phone, title: 'Call Us', lines: ['+91 6284195632'], color: 'from-green-500 to-emerald-500', bg: 'bg-green-50 dark:bg-green-900/20' },
                { icon: MapPin, title: 'Visit Us', lines: ['Chitkara University', 'Punjab, India'], color: 'from-purple-500 to-violet-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
              ].map((item, i) => (
                <div key={i} className={`group flex items-start gap-5 p-6 ${item.bg} rounded-2xl hover:shadow-lg hover:-translate-x-1 transition-all duration-300`}>
                  <div className={`flex-shrink-0 p-3 rounded-xl bg-gradient-to-br ${item.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">{item.title}</h3>
                    {item.lines.map((line, j) => (
                      <p key={j} className="text-gray-600 dark:text-gray-400 mt-1">{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-10 shadow-xl">
              {sent ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-500 dark:text-gray-400">We'll get back to you soon.</p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Send a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                      <input type="text" required className="input" placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                      <input type="email" required className="input" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                      <textarea required rows="5" className="input resize-none" placeholder="How can we help?" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                    </div>
                    <button type="submit" className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-green-500/30 hover:scale-105 transition-all duration-300">
                      <Send className="w-5 h-5" /> Send Message
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

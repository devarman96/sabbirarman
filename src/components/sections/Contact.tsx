import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, AlertCircle, Mail, MapPin, Github, Linkedin, ExternalLink } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

const ContactItem = ({ icon: Icon, label, value, link }: { icon: any, label: string, value: string, link?: string }) => (
  <motion.a
    href={link}
    target={link ? "_blank" : undefined}
    rel={link ? "noopener noreferrer" : undefined}
    whileHover={link ? { x: 5 } : {}}
    className={`flex items-center gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 transition-all ${link ? 'hover:border-indigo-500/50 hover:bg-slate-800/80 cursor-pointer group' : ''}`}
  >
    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
      <Icon size={20} />
    </div>
    <div className="flex-1">
      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">{label}</div>
      <div className="text-white font-medium flex items-center gap-2">
        {value}
        {link && <ExternalLink size={12} className="opacity-0 group-hover:opacity-50 transition-opacity" />}
      </div>
    </div>
  </motion.a>
);

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-32 bg-slate-950 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader 
          title="Establish" 
          highlight="Connectivity" 
          subtitle="Communication"
          align="left"
        />

        <div className="flex flex-col lg:flex-row gap-20">
          {/* Left Column: Info */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold uppercase tracking-widest mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Available for new projects
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight"
            >
              Let's build something <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">extraordinary</span> together.
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-400 mb-12 max-w-lg leading-relaxed"
            >
              Whether you need a full-scale enterprise application or a technical consultation, I'm here to help turn your vision into reality.
            </motion.p>

            <div className="grid sm:grid-cols-2 gap-4">
              <ContactItem icon={Mail} label="Email" value="sabbirarmanbd99@gmail.com" link="mailto:sabbirarmanbd99@gmail.com" />
              <ContactItem icon={MapPin} label="Location" value="BKSP, Savar, Dhaka" />
              <ContactItem icon={Github} label="Github" value="github.com/sabbirarmaan96" link="https://github.com/sabbirarmaan96" />
              <ContactItem icon={Linkedin} label="LinkedIn" value="linkedin.com/in/sabbirarmaan96" link="https://www.linkedin.com/in/sabbirarmaan96" />
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-slate-900/40 backdrop-blur-3xl p-8 md:p-12 rounded-[3rem] border border-slate-800/50 shadow-2xl relative"
            >
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Transmission Sent!</h3>
                    <p className="text-slate-400 mb-8 max-w-xs mx-auto">Your message has been successfully encrypted and sent. I'll get back to you shortly.</p>
                    <button 
                      onClick={() => setStatus('idle')}
                      className="px-8 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-colors border border-slate-700"
                    >
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">Identify Yourself</label>
                      <input
                        required
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-8 py-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">Return Address</label>
                      <input
                        required
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-8 py-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">Your Brief</label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-8 py-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                      />
                    </div>
                    
                    <button
                      disabled={status === 'loading'}
                      className="w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 shadow-xl shadow-indigo-500/20"
                    >
                      {status === 'loading' ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Establish Connectivity <Send size={18} />
                        </>
                      )}
                    </button>

                    {status === 'error' && (
                      <motion.p 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-widest justify-center"
                      >
                        <AlertCircle size={14} /> Critical Error. Retry Requested.
                      </motion.p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

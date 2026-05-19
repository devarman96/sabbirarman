import { motion } from 'motion/react';
import SectionHeader from '../ui/SectionHeader';

const testimonials = [
  {
    name: "Alex Thompson",
    role: "Product Manager @ TechFlow",
    content: "Sabbir is an exceptional engineer. He didn't just build our app; he refined our entire technical vision. The attention to detail in performance was next level.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
  {
    name: "Sarah Chen",
    role: "CEO @ Visionary Systems",
    content: "One of the few developers who truly understands the intersection of high-performance backend logic and polished frontend design.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    name: "Michael Roberts",
    role: "Senior Architect",
    content: "His C++ expertise helped us solve a critical bottleneck that three other engineers couldn't fix. A true problem solver.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-slate-950 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Client" highlight="Endorsements" subtitle="Recognition" />
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[2.5rem] bg-slate-900/50 border border-slate-800 hover:border-indigo-500/30 transition-all flex flex-col justify-between"
            >
              <p className="text-slate-300 text-lg italic leading-relaxed mb-8">"{testimonial.content}"</p>
              <div className="flex items-center gap-4 pt-6 mt-6 border-t border-slate-800">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full border border-slate-700 bg-slate-800" />
                <div>
                  <div className="text-white font-bold">{testimonial.name}</div>
                  <div className="text-indigo-500 text-xs font-medium uppercase tracking-wider">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

import { useState, FormEvent, ChangeEvent } from 'react';
import { Mail, Phone, MapPin, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import SectionReveal from './animations/SectionReveal';
import TiltCard from './animations/TiltCard';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSubmitted(false);

    try {
      const response = await fetch('https://formspree.io/f/mpqqalpl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError('Failed to send message. Please try again or contact directly via email at adityashm09@gmail.com.');
      }
    } catch (err: unknown) {
      console.error('Error submitting form:', err);
      setError('Network error occurred. Please check your internet connection and try again or email directly at adityashm09@gmail.com.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-24 relative z-10 bg-transparent text-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionReveal direction="up">
          <div className="text-center mb-12">
            <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-cyan-400 block mb-2">
              LET'S CONNECT
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 tracking-tight">
              Contact Me
            </h2>
          </div>
        </SectionReveal>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Details Column */}
          <SectionReveal delay={0.1} direction="left">
            <div className="h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                  Get in Touch
                </h3>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8">
                  Have a project in mind, a opportunity to discuss, or just want to connect? Feel free to reach out directly through the form or using the details below.
                </p>

                <div className="space-y-4">
                  <div className="glass-card-cosmic rounded-xl p-4 border border-white/10 hover:border-cyan-400/40 transition-all flex items-center gap-4">
                    <div className="p-3 bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 rounded-xl shadow-[0_0_12px_rgba(0,240,255,0.2)]">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                        Email
                      </h4>
                      <a
                        href="mailto:adityashm09@gmail.com"
                        className="text-white font-medium hover:text-cyan-300 transition-colors text-sm md:text-base focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none rounded"
                      >
                        adityashm09@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="glass-card-cosmic rounded-xl p-4 border border-white/10 hover:border-cyan-400/40 transition-all flex items-center gap-4">
                    <div className="p-3 bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 rounded-xl shadow-[0_0_12px_rgba(0,240,255,0.2)]">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                        Phone
                      </h4>
                      <a
                        href="tel:+918130110355"
                        className="text-white font-medium hover:text-cyan-300 transition-colors text-sm md:text-base focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none rounded"
                      >
                        +91 8130110355
                      </a>
                    </div>
                  </div>

                  <div className="glass-card-cosmic rounded-xl p-4 border border-white/10 hover:border-cyan-400/40 transition-all flex items-center gap-4">
                    <div className="p-3 bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 rounded-xl shadow-[0_0_12px_rgba(0,240,255,0.2)]">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                        Location
                      </h4>
                      <p className="text-white font-medium text-sm md:text-base">
                        New Delhi, India
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Formspree Submission Form */}
          <SectionReveal delay={0.2} direction="right">
            <TiltCard glowColor="cyan" className="p-6 md:p-8 border border-white/10 hover:border-cyan-400/40 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitted && (
                  <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 rounded-xl flex items-center gap-3 text-sm shadow-[0_0_15px_rgba(16,185,129,0.25)]">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>✓ Message sent successfully! I'll get back to you soon.</span>
                  </div>
                )}
                {error && (
                  <div className="p-4 bg-rose-950/80 border border-rose-500/50 text-rose-200 rounded-xl flex items-start gap-3 text-sm shadow-[0_0_15px_rgba(244,63,94,0.25)]">
                    <AlertCircle className="text-rose-400 shrink-0 mt-0.5" size={18} />
                    <span>{error}</span>
                  </div>
                )}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Full Name"
                    className="w-full px-4 py-3 bg-slate-950/70 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 bg-slate-950/70 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3 bg-slate-950/70 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  aria-label="Send message"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:from-cyan-400 hover:via-blue-500 hover:to-violet-500 text-white font-bold rounded-xl shadow-[0_0_25px_rgba(0,240,255,0.35)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                  <span>{loading ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            </TiltCard>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;

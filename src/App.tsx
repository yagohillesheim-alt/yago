import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Briefcase, Settings, Layers, BarChart3, Users, Zap,
  CheckCircle2, Menu, X, ArrowRight, Download,
  Mail, Link2, Camera, Phone, MapPin, Clock, Shield
} from 'lucide-react';
import { useLang } from './i18n';
import { cn } from './lib/utils';

// --- Icons Mapping ---
const IconMap: Record<string, any> = {
  Briefcase, Settings, Layers, BarChart3, Users, Zap
};

const SECTION_IDS = ['inicio', 'resultados', 'servicos', 'experiencia', 'sobre', 'contato'];

// --- Helpers ---

const useActiveSection = (ids: string[]) => {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      }),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return active;
};

const SectionTitle = ({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) => (
  <div className="mb-12 max-w-2xl">
    <div className="font-tech text-blue-400 text-xs tracking-widest uppercase mb-3">{eyebrow}</div>
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
    {text && <p className="text-slate-300 leading-relaxed">{text}</p>}
  </div>
);

// Shows /foto.jpg when it exists; falls back to initials until a photo is added to /public.
const Avatar = ({ className }: { className?: string }) => {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <div className={cn('flex items-center justify-center bg-slate-900 text-blue-500 font-tech text-7xl font-bold', className)}>
      YH
    </div>
  ) : (
    <img
      src="/foto.jpg"
      alt="Yago Hillesheim"
      onError={() => setFailed(true)}
      className={cn('object-cover', className)}
    />
  );
};

// --- Components ---

const Navbar = () => {
  const { t, data, lang, setLang } = useLang();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.results, href: '#resultados', id: 'resultados' },
    { name: t.nav.services, href: '#servicos', id: 'servicos' },
    { name: t.nav.experience, href: '#experiencia', id: 'experiencia' },
    { name: t.nav.about, href: '#sobre', id: 'sobre' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled || isMobileMenuOpen ? "bg-slate-950/90 backdrop-blur-md border-b border-slate-800 py-3" : "bg-transparent"
    )}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-tech font-bold">
            Y
          </div>
          <span className="text-white font-semibold tracking-tight hidden sm:block">Yago Hillesheim</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors",
                active === link.id ? "text-white" : "text-slate-400 hover:text-white"
              )}
            >
              {link.name}
            </a>
          ))}
          <button
            type="button"
            onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
            aria-label={t.nav.switchTo}
            className="font-tech text-xs text-slate-400 hover:text-white transition-colors"
          >
            <span className={lang === 'pt' ? 'text-white' : ''}>PT</span>
            <span className="text-slate-600"> | </span>
            <span className={lang === 'en' ? 'text-white' : ''}>EN</span>
          </button>
          <a
            href="#contato"
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            {t.nav.contact}
          </a>
        </div>

        <button
          className="md:hidden text-white"
          aria-label={isMobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
          >
            <div className="flex flex-col pt-6 pb-4 gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-200 text-lg font-medium"
                >
                  {link.name}
                </a>
              ))}
              <button
            type="button"
            onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
            aria-label={t.nav.switchTo}
            className="font-tech text-sm text-slate-400 text-left"
          >
            <span className={lang === 'pt' ? 'text-white' : ''}>PT</span>
            <span className="text-slate-600"> | </span>
            <span className={lang === 'en' ? 'text-white' : ''}>EN</span>
          </button>
          <a
                href="#contato"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-blue-600 text-white text-center py-3 rounded-lg font-semibold"
              >
                {t.nav.contact}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { t, data, lang, setLang } = useLang();
  return (
    <section id="inicio" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-950 bg-grid">
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-300 font-tech text-xs mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              {t.hero.badge}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              {t.hero.h1a}{' '}
              <span className="text-blue-400">{t.hero.h1b}</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-xl leading-relaxed">
              {data.valuePropositions[0]}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <a
                href="#contato"
                className="bg-blue-600 hover:bg-blue-500 text-white px-7 py-3.5 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                {t.hero.cta} <ArrowRight size={18} />
              </a>
              <a
                href={t.cvUrl}
                download
                className="text-slate-200 hover:text-white font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Download size={18} /> {t.hero.cv}
              </a>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-slate-800">
              {data.metrics.slice(0, 3).map((metric, idx) => (
                <div key={idx}>
                  <div className="font-tech text-2xl md:text-3xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-xs text-slate-400 leading-snug">{metric.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-2 max-w-xs mx-auto w-full lg:max-w-none"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
              <Avatar className="w-full aspect-[4/5]" />
              <div className="p-5 border-t border-slate-800">
                <div className="text-white font-semibold">Yago Luiz Hillesheim</div>
                <div className="text-slate-400 text-sm mb-4">{t.hero.role}</div>
                <div className="flex flex-wrap gap-2">
                  {['SaaS', 'ERP', 'Scrum', 'SQL', 'Power BI'].map((t) => (
                    <span key={t} className="font-tech text-xs px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const metricSources = ['Vision System', 'Vision System', 'Packid', 'Packid', 'Dotse', 'Angelira'];

const ResultsSection = () => {
  const { t, data, lang, setLang } = useLang();
  const [main, rest] = [data.metrics.slice(0, 3), data.metrics.slice(3)];

  return (
    <section id="resultados" className="py-20 bg-slate-950 border-t border-slate-800/60">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle
          eyebrow={t.results.eyebrow}
          title={t.results.title}
          text={t.results.text}
        />

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {main.map((metric, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
              <div className="font-tech text-4xl font-bold text-blue-400 mb-3">{metric.value}</div>
              <h3 className="text-white font-semibold mb-2">{metric.label}</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">{metric.context}</p>
              <div className="font-tech text-xs text-slate-400">{metricSources[idx]}</div>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {rest.map((metric, idx) => (
            <div key={idx} className="flex items-center gap-4 border border-slate-800 rounded-xl p-5">
              <div className="font-tech text-2xl font-bold text-blue-400 shrink-0">{metric.value}</div>
              <div>
                <div className="text-white text-sm font-semibold">{metric.label}</div>
                <div className="font-tech text-xs text-slate-400">{metricSources[idx + 3]}</div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-slate-400 text-xs">
          {t.results.footnote}
        </p>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const { t, data, lang, setLang } = useLang();
  return (
    <section id="servicos" className="py-20 bg-slate-900/40 border-t border-slate-800/60">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          text={t.services.text}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.solutions.map((sol) => {
            const IconComp = IconMap[sol.icon] || Settings;
            return (
              <div key={sol.id} className="bg-slate-950 border border-slate-800 rounded-xl p-6 hover:border-blue-500/40 transition-colors flex flex-col">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-5">
                  <IconComp size={20} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{sol.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-5 flex-grow">{sol.description}</p>
                <div className="flex flex-wrap gap-2">
                  {sol.items.slice(0, 3).map((item) => (
                    <span key={item} className="text-xs px-2 py-1 rounded bg-slate-900 text-slate-300 border border-slate-800">{item}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14">
          <div className="font-tech text-blue-400 text-xs tracking-widest uppercase mb-4">{t.services.method}</div>
          <ol className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {t.services.steps.map((step, idx) => (
              <li key={step} className="flex items-center gap-3 text-sm text-slate-200">
                <span className="font-tech text-blue-400 text-xs">0{idx + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12">
          <a
            href="#contato"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
          >
            {t.services.talk} <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

const ExperienceSection = () => {
  const { t, data, lang, setLang } = useLang();
  return (
    <section id="experiencia" className="py-20 bg-slate-950 border-t border-slate-800/60">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-28">
              <SectionTitle
                eyebrow={t.experience.eyebrow}
                title={t.experience.title}
                text={t.experience.text}
              />
              <a
                href={t.cvUrl}
                download
                className="inline-flex items-center gap-2 border border-slate-700 hover:border-blue-500 text-white px-5 py-3 rounded-lg font-medium transition-colors"
              >
                <Download size={18} /> {t.experience.cv}
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {data.timeline.map((job) => (
              <div key={job.company} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    {job.company} <span className="text-slate-400 font-normal">· {job.role}</span>
                  </h3>
                  <span className="font-tech text-xs text-slate-400 shrink-0">{job.period}</span>
                </div>
                <ul className="space-y-3">
                  {job.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                      <CheckCircle2 size={16} className="text-blue-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  const { t, data, lang, setLang } = useLang();
  const toolGroups = [
    { label: t.about.groups.management, items: data.tools.methodologies },
    { label: t.about.groups.data, items: data.tools.data },
    { label: t.about.groups.systems, items: data.tools.systems },
  ];

  return (
    <section id="sobre" className="py-20 bg-slate-900/40 border-t border-slate-800/60">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <SectionTitle eyebrow={t.about.eyebrow} title={data.personal.name} />
            <p className="text-slate-300 leading-relaxed mb-6 -mt-6">
              {data.personal.summary}
            </p>
            <div className="border-l-2 border-blue-500 pl-5 mb-10">
              <p className="text-slate-200">
                {t.about.quote}
              </p>
            </div>

            <div className="space-y-5">
              {toolGroups.map((group) => (
                <div key={group.label} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                  <div className="font-tech text-xs text-slate-400 uppercase tracking-widest sm:w-24 shrink-0 sm:pt-1.5">{group.label}</div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((t) => (
                      <span key={t} className="text-sm px-3 py-1 rounded-md bg-slate-950 border border-slate-800 text-slate-200">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-10">
              <a
                href={data.personal.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white bg-slate-800 hover:bg-slate-700 px-5 py-2.5 rounded-lg font-medium transition-colors border border-slate-700"
              >
                <Link2 size={18} /> LinkedIn
              </a>
              <a
                href={data.personal.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white bg-slate-800 hover:bg-slate-700 px-5 py-2.5 rounded-lg font-medium transition-colors border border-slate-700"
              >
                <Camera size={18} /> Instagram
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Shield size={18} className="text-blue-400" /> {t.about.education}
              </h3>
              <ul className="space-y-3">
                {data.personal.education.map((edu, idx) => (
                  <li key={idx} className="text-sm text-slate-300">{edu}</li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">{t.about.certs}</h3>
              <ul className="space-y-2">
                {data.personal.certifications.slice(0, 6).map((c, i) => (
                  <li key={i} className="text-sm text-slate-300 flex items-center gap-2">
                    <span className="w-1 h-1 bg-blue-400 rounded-full" /> {c}
                  </li>
                ))}
              </ul>
              <a href={t.cvUrl} download className="inline-block mt-4 text-sm text-blue-400 hover:text-blue-300 font-medium">
                {t.about.fullList}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const { t, data, lang, setLang } = useLang();
  return (
    <section id="contato" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <div className="font-tech text-blue-400 text-xs tracking-widest uppercase mb-3">{t.contact.eyebrow}</div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{t.contact.title}</h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              {t.contact.text}
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-blue-500 border border-slate-800 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase">{t.contact.email}</div>
                  <div className="text-white font-medium">{data.personal.contact.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.open(`https://wa.me/${data.personal.contact.phone}`, '_blank')}>
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-blue-500 border border-slate-800 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase">{t.contact.whatsapp}</div>
                  <div className="text-white font-medium">{data.personal.contact.phoneDisplay}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-blue-500 border border-slate-800 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase">{t.contact.location}</div>
                  <div className="text-white font-medium">{data.personal.contact.location}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-8 md:p-10 rounded-2xl border border-slate-800 shadow-2xl">
             <form className="space-y-6" onSubmit={(e) => {
               e.preventDefault();
               const d = new FormData(e.currentTarget);
               const w = t.contact.wa;
               const text = [
                 w.intro,
                 '',
                 `${w.name}: ${d.get('nome')}`,
                 `${w.company}: ${d.get('empresa')}`,
                 `${w.whatsapp}: ${d.get('whatsapp')}`,
                 `${w.service}: ${d.get('servico')}`,
                 `${w.message}: ${d.get('mensagem')}`,
               ].join('\n');
               window.open(`https://wa.me/${data.personal.contact.phone}?text=${encodeURIComponent(text)}`, '_blank');
             }}>
               <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">{t.contact.name}</label>
                    <input type="text" name="nome" required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all" placeholder={t.contact.namePh} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">{t.contact.company}</label>
                    <input type="text" name="empresa" required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all" placeholder={t.contact.companyPh} />
                  </div>
               </div>
               <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">WhatsApp</label>
                    <input type="text" name="whatsapp" required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all" placeholder="(00) 00000-0000" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">{t.contact.service}</label>
                    <select name="servico" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all appearance-none">
                      {t.contact.services.map((o, i) => <option key={i}>{o}</option>)}
                    </select>
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">{t.contact.message}</label>
                  <textarea name="mensagem" rows={4} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all resize-none" placeholder={t.contact.messagePh} />
               </div>
               <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-900/40 flex items-center justify-center gap-2">
                  {t.contact.submit} <ArrowRight size={20} />
               </button>
               <p className="text-[10px] text-slate-400 text-center">
                 {t.contact.note}
               </p>
             </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { t, data, lang, setLang } = useLang();
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                Y
              </div>
              <span className="text-white font-bold tracking-tight">YAGO HILLESHEIM</span>
            </div>
            <p className="text-slate-400 max-w-sm mb-8">
              {t.footer.tagline}
            </p>
            <div className="flex gap-4">
               <a href={data.personal.contact.linkedin} target="_blank" className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all border border-slate-800" title="LinkedIn">
                 <Link2 size={20} />
               </a>
               <a href={data.personal.contact.instagram} target="_blank" className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all border border-slate-800" title="Instagram">
                 <Camera size={20} />
               </a>
               <a href={`mailto:${data.personal.contact.email}`} className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all border border-slate-800" title="Email">
                 <Mail size={20} />
               </a>
            </div>
          </div>

          <div>
             <h4 className="text-white font-semibold mb-6">{t.footer.navigation}</h4>
             <ul className="space-y-4">
                <li><a href="#sobre" className="text-slate-400 hover:text-blue-500 text-sm transition-colors">{t.footer.about}</a></li>
                <li><a href="#servicos" className="text-slate-400 hover:text-blue-500 text-sm transition-colors">{t.nav.services}</a></li>
                <li><a href="#experiencia" className="text-slate-400 hover:text-blue-500 text-sm transition-colors">{t.nav.experience}</a></li>
                <li><a href="#resultados" className="text-slate-400 hover:text-blue-500 text-sm transition-colors">{t.nav.results}</a></li>
             </ul>
          </div>

          <div>
             <h4 className="text-white font-semibold mb-6">{t.footer.direct}</h4>
             <ul className="space-y-4">
                <li className="flex items-center gap-2 text-slate-400 text-sm">
                  <Phone size={14} className="text-blue-500" /> {data.personal.contact.phoneDisplay}
                </li>
                <li className="flex items-center gap-2 text-slate-400 text-sm">
                  <Mail size={14} className="text-blue-500" /> {data.personal.contact.email}
                </li>
                <li className="flex items-center gap-2 text-slate-400 text-sm">
                  <Clock size={14} className="text-blue-500" /> {data.personal.contact.hours}
                </li>
             </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between gap-4 text-xs text-slate-400 uppercase tracking-widest font-bold">
           <div>© {new Date().getFullYear()} YAGO LUIZ HILLESHEIM. {t.footer.rights}</div>
        </div>
      </div>
    </footer>
  );
};

const FloatingCTA = () => {
  const { t } = useLang();
  const [pastHero, setPastHero] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const contact = document.getElementById('contato');
    const observer = new IntersectionObserver(([entry]) => setContactVisible(entry.isIntersecting));
    if (contact) observer.observe(contact);
    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  if (!pastHero || contactVisible) return null;

  return (
    <div className="md:hidden fixed bottom-6 left-6 right-6 z-40">
      <a
        href="#contato"
        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-2xl flex items-center justify-center gap-2 border border-blue-400"
      >
        {t.floatingCta} <ArrowRight size={20} />
      </a>
    </div>
  );
};

export default function App() {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-300 selection:bg-blue-600 selection:text-white font-sans scroll-smooth">
      <Navbar />
      <Hero />
      <ResultsSection />
      <ServicesSection />
      <ExperienceSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      <FloatingCTA />
    </div>
  );
}

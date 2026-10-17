import React, { useState, useEffect, useRef } from 'react';
import {
  motion, AnimatePresence, MotionConfig, animate,
  useInView, useReducedMotion, useScroll, useSpring,
} from 'motion/react';
import {
  Briefcase, Settings, Layers, BarChart3, Users, Zap,
  CheckCircle2, Menu, X, ArrowRight, Download,
  Mail, Link2, Camera, Phone, MapPin, Clock, Shield
} from 'lucide-react';
import { useLang, Lang } from './i18n';
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

// Fades and lifts its children into view the first time they scroll on screen.
const Reveal = ({ children, delay = 0, className }: { key?: React.Key; children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

// Counts a value like "-92%" up from zero when it scrolls into view.
const CountUp = ({ value, className }: { value: string; className?: string }) => {
  const match = value.match(/^([^\d]*)(\d+(?:[.,]\d+)?)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const target = match ? parseFloat(match[2].replace(',', '.')) : 0;
  const [display, setDisplay] = useState(reduce ? target : 0);

  useEffect(() => {
    if (!match || !inView || reduce) return;
    const controls = animate(0, target, { duration: 1.4, ease: 'easeOut', onUpdate: setDisplay });
    return () => controls.stop();
  }, [inView, target, reduce]);

  if (!match) return <span className={className}>{value}</span>;
  return <span ref={ref} className={className}>{match[1]}{Math.round(display)}{match[3]}</span>;
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-0.5 bg-blue-600 origin-left z-[60]" />;
};

const SectionTitle = ({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) => (
  <Reveal className="mb-12 max-w-2xl">
    <div className="font-tech text-blue-600 text-xs tracking-widest uppercase mb-3">{eyebrow}</div>
    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{title}</h2>
    {text && <p className="text-slate-600 leading-relaxed">{text}</p>}
  </Reveal>
);

// Shows /foto.jpg when it exists; falls back to initials until a photo is added to /public.
const Avatar = ({ className }: { className?: string }) => {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <div className={cn('flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 text-blue-600 font-tech text-7xl font-bold', className)}>
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

const LangToggle = () => {
  const { lang, setLang, t } = useLang();
  const options: Lang[] = ['pt', 'en'];
  return (
    <div role="group" aria-label={t.nav.switchTo} className="relative inline-flex rounded-full bg-slate-100 p-0.5 font-tech text-xs">
      {options.map((code) => (
        <button
          key={code}
          type="button"
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
          className={cn('relative z-10 px-3 py-1 rounded-full transition-colors', lang === code ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900')}
        >
          {lang === code && (
            <motion.span
              layoutId="lang-pill"
              className="absolute inset-0 rounded-full bg-white shadow-sm -z-10"
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            />
          )}
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

// --- Components ---

const Navbar = () => {
  const { t } = useLang();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
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
      isScrolled || isMobileMenuOpen ? "bg-white/85 backdrop-blur-md border-b border-slate-200 shadow-sm py-3" : "bg-transparent"
    )}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-tech font-bold shadow-sm">
            Y
          </div>
          <span className="text-slate-900 font-semibold tracking-tight hidden sm:block">Yago Hillesheim</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "relative py-1 text-sm font-medium transition-colors",
                active === link.id ? "text-slate-900" : "text-slate-500 hover:text-slate-900"
              )}
            >
              {link.name}
              {active === link.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-0 right-0 -bottom-0.5 h-0.5 rounded-full bg-blue-600"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
            </a>
          ))}
          <LangToggle />
          <a
            href="#contato"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            {t.nav.contact}
          </a>
        </div>

        <button
          className="md:hidden text-slate-900"
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
            <div className="flex flex-col items-start pt-6 pb-4 gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-800 text-lg font-medium"
                >
                  {link.name}
                </a>
              ))}
              <LangToggle />
              <a
                href="#contato"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold"
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

const heroContainer = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
const heroItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const Hero = () => {
  const { t, data } = useLang();
  return (
    <section id="inicio" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-blue-50/80 via-white to-white bg-grid">
      <motion.div
        aria-hidden
        className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-blue-200/40 blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, 24, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute top-1/2 -left-32 w-[340px] h-[340px] rounded-full bg-indigo-200/30 blur-3xl"
        animate={{ x: [0, 28, 0], y: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <motion.div className="lg:col-span-3" variants={heroContainer} initial="hidden" animate="show">
            <motion.div
              variants={heroItem}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-blue-200 text-blue-700 font-tech text-xs mb-6 shadow-sm"
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-blue-400 opacity-75 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-blue-600" />
              </span>
              {t.hero.badge}
            </motion.div>
            <motion.h1 variants={heroItem} className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
              {t.hero.h1a}{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">{t.hero.h1b}</span>
            </motion.h1>
            <motion.p variants={heroItem} className="text-lg text-slate-600 mb-8 max-w-xl leading-relaxed">
              {data.valuePropositions[0]}
            </motion.p>
            <motion.div variants={heroItem} className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <a
                href="#contato"
                className="group bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/25 hover:-translate-y-0.5"
              >
                {t.hero.cta} <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={t.cvUrl}
                download
                className="group text-slate-700 hover:text-blue-700 font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Download size={18} className="transition-transform group-hover:translate-y-0.5" /> {t.hero.cv}
              </a>
            </motion.div>

            <motion.div variants={heroItem} className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-slate-200">
              {data.metrics.slice(0, 3).map((metric, idx) => (
                <div key={idx}>
                  <CountUp value={metric.value} className="block font-tech text-2xl md:text-3xl font-bold text-slate-900 mb-1" />
                  <div className="text-xs text-slate-500 leading-snug">{metric.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:col-span-2 max-w-xs mx-auto w-full lg:max-w-none"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-2xl shadow-blue-900/10"
            >
              <Avatar className="w-full aspect-[4/5]" />
              <div className="p-5 border-t border-slate-100">
                <div className="text-slate-900 font-semibold">Yago Luiz Hillesheim</div>
                <div className="text-slate-500 text-sm mb-4">{t.hero.role}</div>
                <div className="flex flex-wrap gap-2">
                  {['SaaS', 'ERP', 'Scrum', 'SQL', 'Power BI'].map((chip) => (
                    <span key={chip} className="font-tech text-xs px-2 py-1 rounded-md bg-slate-50 text-slate-600 border border-slate-200">{chip}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const metricSources = ['Vision System', 'Vision System', 'Packid', 'Packid', 'Dotse', 'Angelira'];

const ResultsSection = () => {
  const { t, data } = useLang();
  const [main, rest] = [data.metrics.slice(0, 3), data.metrics.slice(3)];

  return (
    <section id="resultados" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle
          eyebrow={t.results.eyebrow}
          title={t.results.title}
          text={t.results.text}
        />

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {main.map((metric, idx) => {
            const pct = Math.min(100, Math.abs(parseFloat(metric.value.replace(/[^\d.]/g, ''))));
            return (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="h-full bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 transition-all duration-300">
                  <CountUp value={metric.value} className="block font-tech text-4xl font-bold text-blue-600 mb-3" />
                  <div className="h-1.5 rounded-full bg-slate-100 mb-4 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.2 + idx * 0.1, ease: 'easeOut' }}
                    />
                  </div>
                  <h3 className="text-slate-900 font-semibold mb-2">{metric.label}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{metric.context}</p>
                  <div className="font-tech text-xs text-slate-500">{metricSources[idx]}</div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {rest.map((metric, idx) => (
            <Reveal key={idx} delay={idx * 0.08}>
              <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:bg-white hover:shadow-md transition-all">
                <CountUp value={metric.value} className="font-tech text-2xl font-bold text-blue-600 shrink-0" />
                <div>
                  <div className="text-slate-900 text-sm font-semibold">{metric.label}</div>
                  <div className="font-tech text-xs text-slate-500">{metricSources[idx + 3]}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-slate-500 text-xs">
          {t.results.footnote}
        </p>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const { t, data } = useLang();
  return (
    <section id="servicos" className="py-20 bg-slate-50 border-y border-slate-200/70">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          text={t.services.text}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.solutions.map((sol, idx) => {
            const IconComp = IconMap[sol.icon] || Settings;
            return (
              <Reveal key={sol.id} delay={(idx % 3) * 0.1}>
                <div className="group h-full bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 transition-all duration-300 flex flex-col">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-5 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-3">
                    <IconComp size={22} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{sol.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-5 flex-grow">{sol.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {sol.items.slice(0, 3).map((item) => (
                      <span key={item} className="text-xs px-2 py-1 rounded-md bg-slate-50 text-slate-600 border border-slate-200">{item}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-16">
          <Reveal>
            <div className="font-tech text-blue-600 text-xs tracking-widest uppercase mb-6">{t.services.method}</div>
          </Reveal>
          <div className="relative">
            <div className="hidden md:block absolute top-5 left-[10%] right-[10%] h-px bg-slate-200" />
            <motion.div
              className="hidden md:block absolute top-5 left-[10%] right-[10%] h-px bg-blue-600 origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
            />
            <ol className="relative grid grid-cols-2 md:grid-cols-5 gap-6">
              {t.services.steps.map((step, idx) => (
                <motion.li
                  key={idx}
                  className="flex md:flex-col items-center gap-3 text-sm text-slate-700 font-medium md:text-center"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                >
                  <span className="w-10 h-10 shrink-0 rounded-full bg-white border-2 border-blue-600 text-blue-600 font-tech text-xs font-bold flex items-center justify-center shadow-sm">
                    0{idx + 1}
                  </span>
                  {step}
                </motion.li>
              ))}
            </ol>
          </div>
        </div>

        <Reveal className="mt-12">
          <a
            href="#contato"
            className="group inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 font-semibold transition-colors"
          >
            {t.services.talk} <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  );
};

const ExperienceSection = () => {
  const { t, data } = useLang();
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 75%', 'end 60%'] });

  return (
    <section id="experiencia" className="py-20 bg-white">
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
                className="group inline-flex items-center gap-2 bg-white border border-slate-300 hover:border-blue-600 hover:text-blue-700 text-slate-800 px-5 py-3 rounded-lg font-medium transition-all shadow-sm hover:shadow-md"
              >
                <Download size={18} className="transition-transform group-hover:translate-y-0.5" /> {t.experience.cv}
              </a>
            </div>
          </div>

          <div ref={timelineRef} className="relative lg:col-span-2 pl-8 space-y-6">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-200" />
            <motion.div
              style={{ scaleY: scrollYProgress }}
              className="absolute left-[7px] top-2 bottom-2 w-px bg-blue-600 origin-top"
            />
            {data.timeline.map((job) => (
              <Reveal key={job.company}>
                <div className="relative">
                  <span className="absolute -left-[32px] top-7 w-3.5 h-3.5 rounded-full bg-white border-2 border-blue-600 shadow-sm" />
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-4">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {job.company} <span className="text-slate-500 font-normal">· {job.role}</span>
                      </h3>
                      <span className="font-tech text-xs text-slate-500 shrink-0">{job.period}</span>
                    </div>
                    <ul className="space-y-3">
                      {job.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed">
                          <CheckCircle2 size={16} className="text-blue-600 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  const { t, data } = useLang();
  const toolGroups = [
    { label: t.about.groups.management, items: data.tools.methodologies },
    { label: t.about.groups.data, items: data.tools.data },
    { label: t.about.groups.systems, items: data.tools.systems },
  ];

  return (
    <section id="sobre" className="py-20 bg-slate-50 border-y border-slate-200/70">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <SectionTitle eyebrow={t.about.eyebrow} title={data.personal.name} />
            <Reveal>
              <p className="text-slate-600 leading-relaxed mb-6 -mt-6">
                {data.personal.summary}
              </p>
              <div className="border-l-2 border-blue-600 pl-5 mb-10">
                <p className="text-slate-800 font-medium">
                  {t.about.quote}
                </p>
              </div>
            </Reveal>

            <div className="space-y-5">
              {toolGroups.map((group, gi) => (
                <Reveal key={group.label} delay={gi * 0.1}>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                    <div className="font-tech text-xs text-slate-500 uppercase tracking-widest sm:w-24 shrink-0 sm:pt-1.5">{group.label}</div>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((tool) => (
                        <span key={tool} className="text-sm px-3 py-1 rounded-md bg-white border border-slate-200 text-slate-700 shadow-sm hover:border-blue-300 hover:text-blue-700 transition-colors">{tool}</span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="flex gap-4 mt-10">
              <a
                href={data.personal.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-slate-800 bg-white hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 px-5 py-2.5 rounded-lg font-medium transition-all border border-slate-300 shadow-sm"
              >
                <Link2 size={18} /> LinkedIn
              </a>
              <a
                href={data.personal.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-slate-800 bg-white hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 px-5 py-2.5 rounded-lg font-medium transition-all border border-slate-300 shadow-sm"
              >
                <Camera size={18} /> Instagram
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Reveal>
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-slate-900 font-semibold mb-4 flex items-center gap-2">
                  <Shield size={18} className="text-blue-600" /> {t.about.education}
                </h3>
                <ul className="space-y-3">
                  {data.personal.education.map((edu, idx) => (
                    <li key={idx} className="text-sm text-slate-600">{edu}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-slate-900 font-semibold mb-4">{t.about.certs}</h3>
                <ul className="space-y-2">
                  {data.personal.certifications.slice(0, 6).map((c, i) => (
                    <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" /> {c}
                    </li>
                  ))}
                </ul>
                <a href={t.cvUrl} download className="inline-block mt-4 text-sm text-blue-700 hover:text-blue-800 font-medium">
                  {t.about.fullList}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

const inputClass = "w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all";
const labelClass = "text-xs font-semibold text-slate-600 uppercase tracking-wide";

const ContactSection = () => {
  const { t, data } = useLang();
  const contactRows = [
    { icon: Mail, label: t.contact.email, value: data.personal.contact.email, href: `mailto:${data.personal.contact.email}` },
    { icon: Phone, label: t.contact.whatsapp, value: data.personal.contact.phoneDisplay, href: `https://wa.me/${data.personal.contact.phone}` },
    { icon: MapPin, label: t.contact.location, value: data.personal.contact.location, href: undefined },
  ];

  return (
    <section id="contato" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <Reveal>
              <div className="font-tech text-blue-600 text-xs tracking-widest uppercase mb-3">{t.contact.eyebrow}</div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{t.contact.title}</h2>
              <p className="text-slate-600 text-lg mb-10 leading-relaxed">
                {t.contact.text}
              </p>
            </Reveal>

            <div className="space-y-6">
              {contactRows.map((row, idx) => {
                const body = (
                  <>
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 border border-blue-100 transition-all group-hover:bg-blue-600 group-hover:text-white group-hover:scale-105">
                      <row.icon size={22} />
                    </div>
                    <div>
                      <div className={labelClass}>{row.label}</div>
                      <div className="text-slate-900 font-medium">{row.value}</div>
                    </div>
                  </>
                );
                return (
                  <Reveal key={row.label} delay={idx * 0.08}>
                    {row.href ? (
                      <a href={row.href} target={row.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="group flex items-center gap-4">
                        {body}
                      </a>
                    ) : (
                      <div className="group flex items-center gap-4">{body}</div>
                    )}
                  </Reveal>
                );
              })}
            </div>
          </div>

          <Reveal delay={0.1}>
            <div className="bg-slate-50 p-8 md:p-10 rounded-2xl border border-slate-200 shadow-xl shadow-slate-900/5">
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
                    <label className={labelClass}>{t.contact.name}</label>
                    <input type="text" name="nome" required className={inputClass} placeholder={t.contact.namePh} />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>{t.contact.company}</label>
                    <input type="text" name="empresa" required className={inputClass} placeholder={t.contact.companyPh} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={labelClass}>WhatsApp</label>
                    <input type="text" name="whatsapp" required className={inputClass} placeholder="(00) 00000-0000" />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>{t.contact.service}</label>
                    <select name="servico" className={cn(inputClass, 'appearance-none')}>
                      {t.contact.services.map((o, i) => <option key={i}>{o}</option>)}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>{t.contact.message}</label>
                  <textarea name="mensagem" rows={4} className={cn(inputClass, 'resize-none')} placeholder={t.contact.messagePh} />
                </div>
                <button type="submit" className="group w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2">
                  {t.contact.submit} <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                </button>
                <p className="text-[11px] text-slate-500 text-center">
                  {t.contact.note}
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { t, data } = useLang();
  const socialClass = "w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-blue-600 hover:-translate-y-0.5 transition-all border border-slate-700";
  const linkClass = "text-slate-400 hover:text-white text-sm transition-colors";
  return (
    <footer className="bg-slate-900 pt-16 pb-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-14">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-tech font-bold">
                Y
              </div>
              <span className="text-white font-semibold tracking-tight">Yago Hillesheim</span>
            </div>
            <p className="text-slate-400 max-w-sm mb-8">
              {t.footer.tagline}
            </p>
            <div className="flex gap-3">
              <a href={data.personal.contact.linkedin} target="_blank" rel="noopener noreferrer" className={socialClass} title="LinkedIn" aria-label="LinkedIn">
                <Link2 size={18} />
              </a>
              <a href={data.personal.contact.instagram} target="_blank" rel="noopener noreferrer" className={socialClass} title="Instagram" aria-label="Instagram">
                <Camera size={18} />
              </a>
              <a href={`mailto:${data.personal.contact.email}`} className={socialClass} title="Email" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">{t.footer.navigation}</h4>
            <ul className="space-y-4">
              <li><a href="#sobre" className={linkClass}>{t.footer.about}</a></li>
              <li><a href="#servicos" className={linkClass}>{t.nav.services}</a></li>
              <li><a href="#experiencia" className={linkClass}>{t.nav.experience}</a></li>
              <li><a href="#resultados" className={linkClass}>{t.nav.results}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">{t.footer.direct}</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <Phone size={14} className="text-blue-400" /> {data.personal.contact.phoneDisplay}
              </li>
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <Mail size={14} className="text-blue-400" /> {data.personal.contact.email}
              </li>
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <Clock size={14} className="text-blue-400" /> {data.personal.contact.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 uppercase tracking-widest">
          © {new Date().getFullYear()} YAGO LUIZ HILLESHEIM. {t.footer.rights}
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

  return (
    <AnimatePresence>
      {pastHero && !contactVisible && (
        <motion.div
          className="md:hidden fixed bottom-6 left-6 right-6 z-40"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.25 }}
        >
          <a
            href="#contato"
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold shadow-2xl shadow-blue-900/30 flex items-center justify-center gap-2"
          >
            {t.floatingCta} <ArrowRight size={20} />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-white min-h-screen text-slate-600 selection:bg-blue-600 selection:text-white font-sans scroll-smooth">
        <ScrollProgress />
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
    </MotionConfig>
  );
}

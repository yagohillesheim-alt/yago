import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, Settings, Layers, BarChart3, Users, Zap, 
  ChevronRight, CheckCircle2, Menu, X, ArrowRight,
  Mail, Link2, Camera, Phone, MapPin, Clock, MessageSquare,
  AlertCircle, ChevronDown, LayoutDashboard, Globe, Shield
} from 'lucide-react';
import { siteData } from './data/siteData';
import { cn } from './lib/utils';
import { Solution, Metric } from './types';

// --- Icons Mapping ---
const IconMap: Record<string, any> = {
  Briefcase, Settings, Layers, BarChart3, Users, Zap
};

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Soluções', href: '#solucoes' },
    { name: 'Experiência', href: '#experiencia' },
    { name: 'Resultados', href: '#resultados' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            Y
          </div>
          <span className="text-white font-bold tracking-tight hidden sm:block">YAGO HILLESHEIM</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-slate-300 hover:text-blue-400 transition-colors text-sm font-medium"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contato"
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-900/20"
          >
            Conversa Estratégica
          </a>
        </div>

        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 border-b border-slate-800 overflow-hidden mt-4 rounded-2xl"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-300 text-lg font-medium"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contato"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-blue-600 text-white text-center py-3 rounded-xl font-bold"
              >
                Solicitar Conversa Estratégica
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="inicio" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-slate-950">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] -ml-64 -mb-64" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-xs font-bold mb-6 tracking-wider uppercase">
              <Zap size={14} /> Gestão Orientada a Resultados
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              Gestão de projetos, processos e tecnologia para empresas que precisam <span className="text-blue-500">entregar melhor.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-xl leading-relaxed">
              {siteData.valuePropositions[0]}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#contato" 
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-900/20"
              >
                Solicitar Conversa Estratégica <ArrowRight size={18} />
              </a>
              <a 
                href="#solucoes" 
                className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center"
              >
                Conhecer Soluções
              </a>
            </div>

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-6 pt-12 border-t border-slate-800/50">
              {siteData.metrics.slice(0, 3).map((metric, idx) => (
                <div key={idx}>
                  <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{metric.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl p-4">
               {/* Decorative elements representing a dashboard */}
               <div className="bg-slate-950 rounded-2xl p-6 h-[450px] relative overflow-hidden">
                  <div className="flex gap-3 mb-8">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="space-y-4">
                    <div className="h-4 bg-slate-800 rounded w-1/3" />
                    <div className="h-32 bg-slate-800/50 rounded-xl flex items-end p-4 gap-2">
                       <div className="w-full bg-blue-600 rounded-t h-1/2" />
                       <div className="w-full bg-blue-600 rounded-t h-3/4" />
                       <div className="w-full bg-blue-600 rounded-t h-2/3" />
                       <div className="w-full bg-blue-600 rounded-t h-full" />
                       <div className="w-full bg-blue-600 rounded-t h-4/5" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-24 bg-slate-800/50 rounded-xl p-4 space-y-2">
                        <div className="h-2 bg-slate-700 rounded w-1/2" />
                        <div className="h-4 bg-slate-600 rounded w-3/4" />
                      </div>
                      <div className="h-24 bg-slate-800/50 rounded-xl p-4 space-y-2">
                        <div className="h-2 bg-slate-700 rounded w-1/2" />
                        <div className="h-4 bg-slate-600 rounded w-3/4" />
                      </div>
                    </div>
                  </div>

                  {/* Floating badge */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="absolute bottom-10 right-10 bg-blue-600 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-blue-400"
                  >
                    <div className="bg-blue-400/30 p-2 rounded-lg">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <div className="text-sm font-bold">Projeto Concluído</div>
                      <div className="text-[10px] opacity-80">Eficiência +25%</div>
                    </div>
                  </motion.div>
               </div>
            </div>
            {/* Background blob */}
            <div className="absolute -top-10 -right-10 w-full h-full bg-blue-600/20 rounded-3xl blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ChallengeSection = () => {
  const challenges = [
    { title: "Projetos atrasados", icon: Clock },
    { title: "Cronogramas pouco confiáveis", icon: LayoutDashboard },
    { title: "Backlog sem prioridade", icon: Layers },
    { title: "Processos dependentes de pessoas", icon: Users },
    { title: "Relatórios demorados", icon: BarChart3 },
    { title: "Falta de indicadores claros", icon: AlertCircle },
    { title: "Falha de comunicação técnica/cliente", icon: MessageSquare },
    { title: "Suporte com alto tempo de resposta", icon: Zap },
  ];

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Seu projeto ou operação enfrenta algum destes desafios?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Identificar o gargalo é o primeiro passo para a transformação operacional.</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {challenges.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-slate-950 border border-slate-800 p-6 rounded-2xl group hover:border-blue-500/50 transition-all cursor-pointer"
              onClick={() => {
                document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-blue-500 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <item.icon size={24} />
              </div>
              <h3 className="text-white font-bold mb-2 group-hover:text-blue-400 transition-all">{item.title}</h3>
              <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold group-hover:text-slate-300 transition-all">
                Ver solução <ChevronRight size={16} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SolutionSection = () => {
  return (
    <section id="solucoes" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-blue-500 font-bold text-sm tracking-widest uppercase mb-2">Especialidades</div>
            <h2 className="text-3xl md:text-5xl font-bold text-white">Soluções Estratégicas</h2>
          </div>
          <p className="text-slate-400 max-w-md">Serviços desenhados para conectar negócio, tecnologia e clientes com foco em eficiência.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteData.solutions.map((sol) => {
            const IconComp = IconMap[sol.icon] || Settings;
            return (
              <div key={sol.id} className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 hover:bg-slate-900 transition-all flex flex-col h-full">
                <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 mb-8 border border-blue-500/20">
                  <IconComp size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{sol.title}</h3>
                <p className="text-slate-400 mb-8 flex-grow leading-relaxed">
                  {sol.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {sol.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                      <CheckCircle2 size={18} className="text-blue-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a 
                  href="#contato" 
                  className="inline-flex items-center gap-2 text-blue-500 font-bold hover:text-blue-400 transition-all group"
                >
                  Falar sobre este serviço <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const InteractiveDiagnostic = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    {
      id: 'desafio',
      title: 'Qual é o seu principal desafio hoje?',
      options: ['Implantação', 'Gestão de Projetos', 'Processos', 'Dados e Indicadores', 'Customer Success', 'Suporte', 'Automação', 'Gestão de Mudanças']
    },
    {
      id: 'estagio',
      title: 'Em que estágio está sua operação?',
      options: ['Ainda planejando', 'Já começou com dificuldades', 'Projeto atrasado', 'Funcionando, mas precisa melhorar', 'Escalando', 'Não sei exatamente']
    },
    {
      id: 'resultado',
      title: 'Qual resultado você mais deseja?',
      options: ['Mais previsibilidade', 'Mais velocidade', 'Menos retrabalho', 'Melhor experiência do cliente', 'Clareza nos indicadores', 'Equipes alinhadas']
    }
  ];

  const handleSelect = (option: string) => {
    setAnswers({ ...answers, [questions[step - 1].id]: option });
    if (step < questions.length) {
      setStep(step + 1);
    } else {
      setStep(4);
    }
  };

  return (
    <section className="py-20 bg-blue-600">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-slate-950 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <LayoutDashboard size={120} className="text-white" />
          </div>

          <AnimatePresence mode="wait">
            {step <= 3 ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="flex items-center gap-2 mb-8">
                  {[1, 2, 3].map((s) => (
                    <div 
                      key={s} 
                      className={cn(
                        "h-1 rounded-full flex-grow transition-all",
                        s <= step ? "bg-blue-500" : "bg-slate-800"
                      )} 
                    />
                  ))}
                </div>
                <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-2">Triagem Interativa</h3>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">{questions[step - 1].title}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {questions[step - 1].options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSelect(opt)}
                      className="p-4 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:border-blue-500 hover:bg-slate-800 transition-all text-left font-medium"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Diagnóstico Pré-Analisado</h2>
                <p className="text-slate-400 mb-8 text-lg">
                  Suas respostas ajudam a iniciar o diagnóstico. Uma conversa estratégica permitirá compreender o contexto, o escopo e as prioridades da sua operação.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="#contato"
                    className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/40"
                  >
                    Solicitar Diagnóstico Comercial
                  </a>
                  <button 
                    onClick={() => setStep(1)}
                    className="text-slate-400 hover:text-white transition-all font-semibold"
                  >
                    Refazer Triagem
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const ResultsSection = () => {
  return (
    <section id="resultados" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-blue-500 font-bold text-sm tracking-widest uppercase mb-2">Casos de Sucesso</div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Resultados Históricos Comprovados</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Métricas obtidas em experiências anteriores focadas em eficiência operacional.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {siteData.metrics.map((metric, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-900 border border-slate-800 p-8 rounded-3xl relative overflow-hidden"
            >
              <div className="text-4xl font-black text-blue-500 mb-2">{metric.value}</div>
              <h3 className="text-white font-bold mb-4">{metric.label}</h3>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">{metric.description}</p>
              <div className="pt-4 border-t border-slate-800 flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-tighter">
                <Zap size={14} /> Benefício: {metric.benefit}
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-12 text-center text-slate-600 text-xs italic">
          * Resultados históricos variam conforme o contexto, a maturidade da operação, o escopo e o nível de participação das equipes.
        </p>
      </div>
    </section>
  );
};

const MethodSection = () => {
  const steps = [
    { title: "Diagnóstico Inicial", desc: "Conversa para entender contexto, dores e objetivos." },
    { title: "Mapeamento", desc: "Análise de processos, riscos e gargalos técnicos." },
    { title: "Plano de Ação", desc: "Definição de prioridades e ritos de acompanhamento." },
    { title: "Execução", desc: "Condução do projeto com foco em entregas mensuráveis." },
    { title: "Melhoria Contínua", desc: "Ajustes baseados em dados e feedback do cliente." },
  ];

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Método de Trabalho</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Uma abordagem estruturada para garantir a previsibilidade e o sucesso da entrega.</p>
        </div>

        <div className="relative">
          {/* Progress line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -translate-y-1/2 hidden lg:block" />
          
          <div className="grid lg:grid-cols-5 gap-8 relative">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 relative z-10 lg:text-center">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-4 lg:mx-auto">
                  {idx + 1}
                </div>
                <h3 className="text-white font-bold mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ExperienceSection = () => {
  return (
    <section id="experiencia" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <div className="text-blue-500 font-bold text-sm tracking-widest uppercase mb-2">Trajetória</div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Experiência Aplicada</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Atuação em ambientes dinâmicos de SaaS e ERP, conduzindo projetos de tecnologia e operações com foco em resultados.
              </p>
              <div className="space-y-4">
                {["100% Retenção em clientes críticos", "+12 Onboardings personalizados", "Redução de SLAs operacionais"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-300 font-medium">
                    <CheckCircle2 size={20} className="text-blue-500" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            {siteData.experience.map((item, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-blue-500/30 transition-all">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-blue-600 rounded-full" />
                  {item.area}
                </h3>
                <ul className="space-y-4">
                  {item.tasks.map((task, i) => (
                    <li key={i} className="flex items-start gap-4 text-slate-400 leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-700 mt-2.5 shrink-0" />
                      <span>{task}</span>
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

const ToolSection = () => {
  return (
    <section className="py-20 bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Competências Técnicas</h2>
          <p className="text-slate-400">Ferramentas e metodologias utilizadas conforme a necessidade de cada projeto.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-6">
            <h4 className="text-blue-500 font-bold text-sm uppercase">Gestão e Método</h4>
            <div className="flex flex-wrap gap-2">
              {siteData.tools.methodologies.map(t => (
                <span key={t} className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-sm">{t}</span>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="text-blue-500 font-bold text-sm uppercase">Dados e Analytics</h4>
            <div className="flex flex-wrap gap-2">
              {siteData.tools.data.map(t => (
                <span key={t} className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-sm">{t}</span>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="text-blue-500 font-bold text-sm uppercase">Design e Produto</h4>
            <div className="flex flex-wrap gap-2">
              {siteData.tools.design.map(t => (
                <span key={t} className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-sm">{t}</span>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="text-blue-500 font-bold text-sm uppercase">Sistemas</h4>
            <div className="flex flex-wrap gap-2">
              {siteData.tools.systems.map(t => (
                <span key={t} className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-sm">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="sobre" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square bg-slate-800 rounded-3xl overflow-hidden border border-slate-700 relative z-10 flex items-center justify-center text-slate-500">
               {/* Placeholder for real photo or abstract tech art */}
               <Users size={120} strokeWidth={1} />
            </div>
            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-blue-600 rounded-3xl -z-10" />
            
            <div className="absolute -top-6 -left-6 p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-20 max-w-[200px]">
              <div className="text-blue-500 font-bold text-xs uppercase mb-2">Educação</div>
              {siteData.personal.education.map((edu, idx) => (
                <div key={idx} className="text-white text-xs font-semibold mb-2 last:mb-0 leading-tight">
                  {edu}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-blue-500 font-bold text-sm tracking-widest uppercase mb-2">Sobre o Profissional</div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{siteData.personal.name}</h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              {siteData.personal.summary}
            </p>
            <div className="bg-blue-600/10 border-l-4 border-blue-600 p-6 mb-10 rounded-r-2xl">
              <p className="text-slate-300 font-medium">
                Atuo como o elo estratégico entre a tecnologia e o negócio, garantindo que projetos complexos se transformem em entregas eficientes, previsíveis e lucrativas para sua organização.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-8 mb-10">
              <div>
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Shield size={18} className="text-blue-500" /> Certificações
                </h4>
                <ul className="space-y-2">
                  {siteData.personal.certifications.slice(0, 6).map((c, i) => (
                    <li key={i} className="text-sm text-slate-400 flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full" /> {c}
                    </li>
                  ))}
                  <li className="text-xs text-blue-400 font-bold italic mt-2">+ outras especializações</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Globe size={18} className="text-blue-500" /> Diferenciais
                </h4>
                <div className="space-y-4">
                  {["Visão Consultiva", "Foco em Dados", "Gestão Híbrida", "Empatia Técnica"].map((d, i) => (
                    <div key={i} className="text-sm text-slate-400 bg-slate-900 px-4 py-2 rounded-lg border border-slate-800">
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <a 
                href={siteData.personal.contact.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-xl font-bold transition-all border border-slate-700"
              >
                <Link2 size={20} /> LinkedIn
              </a>
              <a 
                href={siteData.personal.contact.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-xl font-bold transition-all border border-slate-700"
              >
                <Camera size={20} /> Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contato" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <div className="text-blue-500 font-bold text-sm tracking-widest uppercase mb-2">Contato</div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Solicite uma Conversa Estratégica</h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              Pronto para organizar sua operação e acelerar seus projetos? Vamos avaliar juntos o melhor próximo passo.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-blue-500 border border-slate-800 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase">Email</div>
                  <div className="text-white font-medium">{siteData.personal.contact.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.open(`https://wa.me/${siteData.personal.contact.phone}`, '_blank')}>
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-blue-500 border border-slate-800 group-hover:bg-green-600 group-hover:text-white transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase">WhatsApp</div>
                  <div className="text-white font-medium">{siteData.personal.contact.phoneDisplay}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-blue-500 border border-slate-800 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase">Localização</div>
                  <div className="text-white font-medium">{siteData.personal.contact.location}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-8 md:p-10 rounded-3xl border border-slate-800 shadow-2xl">
             <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
               <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Nome Completo</label>
                    <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all" placeholder="Seu nome" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Empresa</label>
                    <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all" placeholder="Nome da empresa" />
                  </div>
               </div>
               <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">WhatsApp</label>
                    <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all" placeholder="(00) 00000-0000" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Serviço de Interesse</label>
                    <select className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all appearance-none">
                      <option>Gestão de Projetos</option>
                      <option>Implantação de Sistemas</option>
                      <option>Processos e Melhoria</option>
                      <option>KPI e Análise de Dados</option>
                      <option>Customer Success</option>
                      <option>Outros</option>
                    </select>
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Mensagem / Desafio</label>
                  <textarea rows={4} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all resize-none" placeholder="Conte brevemente seu desafio..." />
               </div>
               <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-900/40 flex items-center justify-center gap-2">
                  Solicitar Conversa Estratégica <ArrowRight size={20} />
               </button>
               <p className="text-[10px] text-slate-600 text-center">
                 Ao enviar este formulário, você concorda com o processamento dos seus dados para fins de contato profissional.
               </p>
             </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Dúvidas Frequentes</h2>
          <p className="text-slate-400">Respostas rápidas sobre o método e atuação profissional.</p>
        </div>

        <div className="space-y-4">
          {siteData.faq.map((item, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between group"
              >
                <span className={cn(
                  "font-bold transition-all",
                  openIdx === idx ? "text-blue-500" : "text-white"
                )}>{item.question}</span>
                <ChevronDown className={cn(
                  "text-slate-500 transition-all",
                  openIdx === idx ? "rotate-180 text-blue-500" : ""
                )} />
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-slate-400 border-t border-slate-900 leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
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
            <p className="text-slate-500 max-w-sm mb-8">
              Conectando negócio, tecnologia e clientes para entregar resultados com previsibilidade e eficiência.
            </p>
            <div className="flex gap-4">
               <a href={siteData.personal.contact.linkedin} target="_blank" className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all border border-slate-800" title="LinkedIn">
                 <Link2 size={20} />
               </a>
               <a href={siteData.personal.contact.instagram} target="_blank" className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-pink-600 transition-all border border-slate-800" title="Instagram">
                 <Camera size={20} />
               </a>
               <a href={`mailto:${siteData.personal.contact.email}`} className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all border border-slate-800" title="Email">
                 <Mail size={20} />
               </a>
            </div>
          </div>

          <div>
             <h4 className="text-white font-bold mb-6">Navegação</h4>
             <ul className="space-y-4">
                <li><a href="#sobre" className="text-slate-500 hover:text-blue-500 text-sm transition-colors">Sobre Mim</a></li>
                <li><a href="#solucoes" className="text-slate-500 hover:text-blue-500 text-sm transition-colors">Soluções</a></li>
                <li><a href="#experiencia" className="text-slate-500 hover:text-blue-500 text-sm transition-colors">Experiência</a></li>
                <li><a href="#resultados" className="text-slate-500 hover:text-blue-500 text-sm transition-colors">Resultados</a></li>
             </ul>
          </div>

          <div>
             <h4 className="text-white font-bold mb-6">Contato Direto</h4>
             <ul className="space-y-4">
                <li className="flex items-center gap-2 text-slate-500 text-sm">
                  <Phone size={14} className="text-blue-500" /> {siteData.personal.contact.phoneDisplay}
                </li>
                <li className="flex items-center gap-2 text-slate-500 text-sm">
                  <Mail size={14} className="text-blue-500" /> {siteData.personal.contact.email}
                </li>
                <li className="flex items-center gap-2 text-slate-500 text-sm">
                  <Clock size={14} className="text-blue-500" /> {siteData.personal.contact.hours}
                </li>
             </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between gap-4 text-xs text-slate-600 uppercase tracking-widest font-bold">
           <div>© 2024 YAGO LUIZ HILLESHEIM. TODOS OS DIREITOS RESERVADOS.</div>
           <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">POLÍTICA DE PRIVACIDADE</a>
              <a href="#" className="hover:text-white transition-colors">TERMOS DE USO</a>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-300 selection:bg-blue-600 selection:text-white font-sans scroll-smooth">
      <Navbar />
      <Hero />
      <ChallengeSection />
      <AboutSection />
      <SolutionSection />
      <InteractiveDiagnostic />
      <ExperienceSection />
      <ResultsSection />
      <MethodSection />
      <ToolSection />
      <FAQ />
      <ContactSection />
      <Footer />

      
      {/* Floating CTA (Mobile) */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-40">
        <a 
          href="#contato"
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-2xl flex items-center justify-center gap-2 border border-blue-400"
        >
          Solicitar Conversa Estratégica <ArrowRight size={20} />
        </a>
      </div>
    </div>
  );
}

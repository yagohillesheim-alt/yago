import React, { createContext, useContext, useEffect, useState } from 'react';
import { siteData } from './data/siteData';
import { siteDataEn } from './data/siteDataEn';

export type Lang = 'pt' | 'en';

const pt = {
  htmlLang: 'pt-BR',
  title: 'Yago Hillesheim | Gerente de Projetos e Implantação de Sistemas (SaaS/ERP)',
  description: 'Project Manager em Chapecó/SC especialista em implantação de ERP e SaaS, processos e dados (SQL, Power BI). Reduzi em 92% o tempo de cronogramas e em 40% o processamento de relatórios. Fale comigo.',
  cvUrl: '/Yago-Hillesheim-Curriculo.pdf',
  nav: { results: 'Resultados', services: 'Serviços', experience: 'Experiência', about: 'Sobre', contact: 'Entrar em contato', openMenu: 'Abrir menu', closeMenu: 'Fechar menu', switchTo: 'Mudar para inglês' },
  hero: {
    badge: 'Implantação de ERP e SaaS · Chapecó/SC',
    h1a: 'Gestão de projetos, processos e tecnologia para empresas que precisam',
    h1b: 'entregar melhor.',
    cta: 'Solicitar conversa',
    cv: 'Baixar currículo (PDF)',
    role: 'Project Manager',
  },
  results: {
    eyebrow: 'Resultados',
    title: 'Números que vêm da operação',
    text: 'Métricas obtidas nas empresas em que atuei, com a origem de cada uma.',
    footnote: '* Resultados variam conforme o contexto, a maturidade da operação e o escopo de cada projeto.',
  },
  services: {
    eyebrow: 'Serviços',
    title: 'Como posso ajudar',
    text: 'Seis frentes para conectar negócio, tecnologia e clientes com previsibilidade.',
    method: 'Como trabalho',
    steps: ['Diagnóstico', 'Mapeamento', 'Plano de ação', 'Execução', 'Melhoria contínua'],
    talk: 'Falar sobre o seu projeto',
  },
  experience: {
    eyebrow: 'Trajetória',
    title: 'Experiência',
    text: 'Da logística e do suporte à gestão de implantações de ERP e SaaS.',
    cv: 'Currículo completo (PDF)',
  },
  about: {
    eyebrow: 'Sobre',
    quote: 'Atuo como o elo entre a tecnologia e o negócio, para que projetos complexos virem entregas previsíveis.',
    groups: { management: 'Gestão', data: 'Dados', systems: 'Sistemas' },
    education: 'Formação',
    certs: 'Certificações',
    fullList: 'Ver lista completa no currículo',
  },
  contact: {
    eyebrow: 'Contato',
    title: 'Solicite uma Conversa Estratégica',
    text: 'Pronto para organizar sua operação e acelerar seus projetos? Vamos avaliar juntos o melhor próximo passo.',
    email: 'Email',
    whatsapp: 'WhatsApp',
    location: 'Localização',
    name: 'Nome Completo',
    namePh: 'Seu nome',
    company: 'Empresa',
    companyPh: 'Nome da empresa',
    service: 'Serviço de Interesse',
    services: ['Gestão de Projetos', 'Implantação de Sistemas', 'Processos e Melhoria', 'KPI e Análise de Dados', 'Customer Success', 'Outros'],
    message: 'Mensagem / Desafio',
    messagePh: 'Conte brevemente seu desafio...',
    submit: 'Solicitar Conversa Estratégica',
    note: 'Ao enviar, o WhatsApp abrirá com sua mensagem pronta. Seus dados são usados apenas para contato profissional.',
    wa: {
      intro: 'Olá, Yago! Vim pelo seu site e gostaria de uma conversa estratégica.',
      name: 'Nome', company: 'Empresa', whatsapp: 'WhatsApp', service: 'Serviço de interesse', message: 'Desafio',
    },
  },
  footer: {
    tagline: 'Conectando negócio, tecnologia e clientes para entregar resultados com previsibilidade e eficiência.',
    navigation: 'Navegação',
    about: 'Sobre Mim',
    direct: 'Contato Direto',
    rights: 'TODOS OS DIREITOS RESERVADOS.',
  },
  floatingCta: 'Solicitar Conversa Estratégica',
};

const en: typeof pt = {
  htmlLang: 'en',
  title: 'Yago Hillesheim | Project Manager, SaaS and ERP Implementation',
  description: 'Project Manager based in Chapecó, Brazil, specialized in ERP and SaaS implementation, processes and data (SQL, Power BI). 92% faster training schedules and 40% faster report processing. Get in touch.',
  cvUrl: '/Yago-Hillesheim-Resume.pdf',
  nav: { results: 'Results', services: 'Services', experience: 'Experience', about: 'About', contact: 'Get in touch', openMenu: 'Open menu', closeMenu: 'Close menu', switchTo: 'Switch to Portuguese' },
  hero: {
    badge: 'ERP and SaaS implementation · Chapecó, Brazil',
    h1a: 'Project, process and technology management for companies that need to',
    h1b: 'deliver better.',
    cta: 'Start a conversation',
    cv: 'Download resume (PDF)',
    role: 'Project Manager',
  },
  results: {
    eyebrow: 'Results',
    title: 'Numbers from real operations',
    text: 'Metrics from the companies I worked for, with the source of each one.',
    footnote: '* Results vary with context, operational maturity and the scope of each project.',
  },
  services: {
    eyebrow: 'Services',
    title: 'How I can help',
    text: 'Six areas that connect business, technology and customers with predictability.',
    method: 'How I work',
    steps: ['Discovery', 'Mapping', 'Action plan', 'Execution', 'Continuous improvement'],
    talk: 'Talk about your project',
  },
  experience: {
    eyebrow: 'Career',
    title: 'Experience',
    text: 'From logistics and support to managing ERP and SaaS implementations.',
    cv: 'Full resume (PDF)',
  },
  about: {
    eyebrow: 'About',
    quote: 'I am the link between technology and the business, so complex projects turn into predictable deliveries.',
    groups: { management: 'Management', data: 'Data', systems: 'Systems' },
    education: 'Education',
    certs: 'Certifications',
    fullList: 'See the full list in the resume',
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Request a Strategic Conversation',
    text: 'Ready to organize your operation and speed up your projects? Let us find the best next step together.',
    email: 'Email',
    whatsapp: 'WhatsApp',
    location: 'Location',
    name: 'Full name',
    namePh: 'Your name',
    company: 'Company',
    companyPh: 'Company name',
    service: 'Service of interest',
    services: ['Project Management', 'Systems Implementation', 'Processes and Improvement', 'KPIs and Data Analysis', 'Customer Success', 'Other'],
    message: 'Message / Challenge',
    messagePh: 'Briefly describe your challenge...',
    submit: 'Request a Strategic Conversation',
    note: 'On submit, WhatsApp opens with your message ready to send. Your data is used only for professional contact.',
    wa: {
      intro: 'Hi Yago! I found your website and would like to have a strategic conversation.',
      name: 'Name', company: 'Company', whatsapp: 'WhatsApp', service: 'Service of interest', message: 'Challenge',
    },
  },
  footer: {
    tagline: 'Connecting business, technology and customers to deliver results with predictability and efficiency.',
    navigation: 'Navigation',
    about: 'About me',
    direct: 'Direct contact',
    rights: 'ALL RIGHTS RESERVED.',
  },
  floatingCta: 'Request a Strategic Conversation',
};

const dictionaries = { pt, en };

const initialLang = (): Lang => {
  try {
    const param = new URLSearchParams(window.location.search).get('lang');
    if (param === 'en' || param === 'pt') return param;
    const saved = window.localStorage.getItem('lang');
    if (saved === 'en' || saved === 'pt') return saved;
  } catch {
    // storage can be blocked; fall through to the default
  }
  return 'pt';
};

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: typeof pt;
  data: typeof siteData;
}

const LangContext = createContext<LangContextValue | null>(null);

export const LangProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem('lang', next);
    } catch {
      // ignore storage errors
    }
  };

  useEffect(() => {
    const dict = dictionaries[lang];
    document.documentElement.lang = dict.htmlLang;
    document.title = dict.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', dict.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', dict.title);
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', lang === 'pt' ? 'pt_BR' : 'en_US');
  }, [lang]);

  const value: LangContextValue = {
    lang,
    setLang,
    t: dictionaries[lang],
    data: lang === 'pt' ? siteData : siteDataEn,
  };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
};

export const useLang = () => {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside LangProvider');
  return ctx;
};

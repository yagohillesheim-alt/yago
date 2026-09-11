import { Solution, Metric, ExperienceItem, FAQItem, CaseStudy } from './types';

export const siteData = {
  personal: {
    name: "Yago Luiz Hillesheim",
    title: "Project Manager",
    subtitle: "Especialista em Gestão de Projetos e Implantação de Sistemas",
    summary: "Profissional com sólida experiência em ambientes de SaaS e ERP, focado em transformar complexidade operacional em execução organizada e eficiente. Atuo na gestão de implantações, organização de backlog e liderança de times multidisciplinares sob metodologias ágeis (Scrum/Kanban). Minha trajetória integra Customer Success e Gestão de Operações, permitindo unir a excelência técnica às necessidades reais do cliente e do negócio, utilizando dados (SQL, Power BI, SAP) como alicerce para decisões estratégicas e melhoria contínua.",
    education: [
      "Tecnologia em Processos Gerenciais — concluído em 2024",
      "Tecnologia em Administração — em andamento (Conclusão 2026)"
    ],
    certifications: [
      "SQL Server e consultas avançadas",
      "Lean Six Sigma White Belt",
      "Gestão de mudanças",
      "Customer Success",
      "Governança de TI",
      "PostgreSQL e SQL",
      "Product Management",
      "Figma",
      "Design Sprint",
      "Liderança",
      "Comunicação e atendimento"
    ],
    contact: {
      phone: "5549999809524",
      phoneDisplay: "+55 (49) 99998-09524",
      phoneAlt: "(49) 99169-8280",
      email: "yagohillesheim@gmail.com",
      linkedin: "https://www.linkedin.com/in/yagohillesheim/",
      instagram: "https://www.instagram.com/yago_hillesheim/",
      location: "Chapecó - SC (Atendimento Online/Híbrido)",
      hours: "Segunda a Sexta, 08h às 18h"
    }
  },
  valuePropositions: [
    "Ajudo empresas de tecnologia e operações B2B a organizar projetos, processos e dados para acelerar entregas, melhorar a experiência do cliente e aumentar a eficiência operacional.",
    "Transformando complexidade operacional em execução organizada e previsível.",
    "Conectando negócio, tecnologia e clientes para entregar resultados mensuráveis.",
    "Gestão de projetos e operações para empresas que precisam evoluir com método.",
    "Projetos mais previsíveis. Processos mais eficientes. Clientes mais satisfeitos."
  ],
  metrics: [
    {
      label: "Tempo de Cronogramas",
      value: "-92%",
      context: "Estruturação de cronogramas de treinamento",
      description: "Redução drástica no tempo de preparação manual através de padronização e processos.",
      benefit: "Agilidade na escala de treinamentos."
    },
    {
      label: "Processamento de Relatórios",
      value: "-40%",
      context: "Geração de indicadores e relatórios",
      description: "Otimização de consultas e fluxos de dados para suporte à decisão.",
      benefit: "Decisões baseadas em dados em tempo real."
    },
    {
      label: "Satisfação (CSAT)",
      value: "+20%",
      context: "Pesquisa de satisfação do cliente",
      description: "Melhoria na jornada do cliente e qualidade das entregas.",
      benefit: "Fidelização e redução de churn."
    },
    {
      label: "Tempo de Resposta",
      value: "-33%",
      context: "Atendimento e Suporte",
      description: "Redução do tempo médio de resposta em operações críticas.",
      benefit: "Melhor percepção de valor pelo cliente."
    },
    {
      label: "SLA de Resolução",
      value: "-25%",
      context: "Gestão de tickets e problemas",
      description: "Melhoria na eficiência de resolução de problemas técnicos.",
      benefit: "Operação mais fluida e menos gargalos."
    },
    {
      label: "Atrasos Operacionais",
      value: "-18%",
      context: "Gestão de projetos e entregas",
      description: "Aumento da previsibilidade e cumprimento de prazos.",
      benefit: "Confiança dos stakeholders e clientes."
    }
  ] as Metric[],
  solutions: [
    {
      id: "gestao-projetos",
      title: "Gestão de Projetos",
      description: "Planejamento e execução de projetos de tecnologia com método e previsibilidade.",
      icon: "Briefcase",
      items: ["Planejamento", "Cronogramas", "Backlog e Priorização", "Ritos de Acompanhamento", "Gestão de Riscos", "Gestão de Stakeholders"]
    },
    {
      id: "implantacao-sistemas",
      title: "Implantação de Sistemas",
      description: "Condução estratégica de implantações SaaS e ERP focada na adoção do usuário.",
      icon: "Settings",
      items: ["Levantamento de Requisitos", "Organização de Etapas", "Gestão de Treinamento", "Documentação", "Acompanhamento de Adoção", "Gestão de Mudanças"]
    },
    {
      id: "processos-melhoria",
      title: "Processos e Melhoria Contínua",
      description: "Mapeamento e redesenho de fluxos para eliminar gargalos e aumentar a produtividade.",
      icon: "Layers",
      items: ["Mapeamento de Processos", "Padronização", "Identificação de Gargalos", "Redesenho de Fluxos", "Indicadores de Desempenho", "Melhoria Contínua"]
    },
    {
      id: "dados-bi",
      title: "KPI, BI e Análise de Dados",
      description: "Transformação de dados brutos em inteligência para apoio à tomada de decisão.",
      icon: "BarChart3",
      items: ["Definição de KPIs", "Consultas SQL", "Relatórios Dinâmicos", "Dashboards em Power BI", "Excel Avançado", "Organização de Dados"]
    },
    {
      id: "cs-suporte",
      title: "Customer Success e Suporte",
      description: "Estruturação de operações focadas no sucesso e retenção do cliente.",
      icon: "Users",
      items: ["Onboarding Estratégico", "Adoção e Retenção", "Gestão de Tickets e SLAs", "Customer Journey", "Comunicação Executiva", "Resolução de Problemas"]
    },
    {
      id: "automacao-eficiencia",
      title: "Automação e Eficiência",
      description: "Redução de tarefas manuais e integração de ferramentas para acelerar a operação.",
      icon: "Zap",
      items: ["Redução de Tarefas Manuais", "Integração de Ferramentas", "Automação de Rotinas", "Alertas Inteligentes", "Padronização de Saídas", "Redução de Retrabalho"]
    }
  ] as Solution[],
  experience: [
    {
      area: "Gestão e Implantação",
      tasks: [
        "Gestão de implantações de ERP e sistemas em ambientes B2B",
        "Gestão de backlog e cronogramas para times multidisciplinares",
        "Liderança de ritos ágeis (Scrum/Kanban)",
        "Implementação de processos de onboarding personalizado para clientes B2B"
      ]
    },
    {
      area: "Operações e Suporte",
      tasks: [
        "Coordenação de equipes multidisciplinares em suporte técnico avançado",
        "Gestão de operações de suporte e melhoria de fluxos de atendimento",
        "Atuação em suporte técnico de nível avançado e resolução de problemas complexos",
        "Gestão de carteiras de clientes com foco em retenção e sucesso"
      ]
    },
    {
      area: "Tecnologia e Dados",
      tasks: [
        "Otimização de processos logísticos e monitoramento de redes",
        "Desenvolvimento de consultas SQL e dashboards para monitoramento operacional",
        "Análise de dados para identificação de gargalos em processos internos",
        "Estruturação de treinamentos e documentação técnica"
      ]
    }
  ] as ExperienceItem[],
  tools: {
    methodologies: ["Scrum", "Kanban", "Jira", "Trello", "Design Sprint"],
    data: ["SQL Server", "PostgreSQL", "Power BI", "Excel Avançado"],
    design: ["Figma", "Design Sprint", "Product Management"],
    systems: ["SaaS", "ERP", "SAP", "Crystal Reports"]
  },
  faq: [
    {
      question: "Como funciona o diagnóstico estratégico?",
      answer: "O diagnóstico é uma conversa inicial onde compreendemos o contexto atual, os principais gargalos e os objetivos do seu projeto. Com base nisso, avaliamos o escopo e as prioridades."
    },
    {
      question: "Que tipo de projeto você gerencia?",
      answer: "Atuo principalmente em projetos de tecnologia, implantação de sistemas SaaS/ERP, estruturação de processos operacionais e projetos de análise de dados."
    },
    {
      question: "Como funciona a implantação de um sistema?",
      answer: "A implantação segue um método que vai desde o levantamento de requisitos e planejamento de etapas até o treinamento, documentação e acompanhamento da adoção pelo cliente."
    },
    {
      question: "Você trabalha com empresas SaaS?",
      answer: "Sim, possuo ampla experiência em ambientes SaaS, atuando tanto na implantação quanto na estruturação de processos de Customer Success e Suporte."
    }
  ] as FAQItem[]
};

import { siteData } from './siteData';

// English version of the translatable content. Contact details are shared with the PT data.
export const siteDataEn: typeof siteData = {
  ...siteData,
  personal: {
    ...siteData.personal,
    subtitle: "Project Management and Systems Implementation Specialist",
    summary: "Professional with solid experience in SaaS and ERP environments, focused on turning operational complexity into organized, efficient execution. I manage implementations, organize backlogs and lead multidisciplinary teams using agile methods (Scrum/Kanban). My background combines Customer Success and Operations Management, bridging technical excellence with real customer and business needs, and using data (SQL, Power BI, SAP) as the basis for strategic decisions and continuous improvement.",
    education: [
      "Associate degree in Management Processes (Tecnologia em Processos Gerenciais) — completed 2024",
      "Associate degree in Business Administration (Tecnologia em Administração) — in progress, expected 2026"
    ],
    certifications: [
      "SQL Server and advanced queries",
      "Lean Six Sigma White Belt",
      "Change management",
      "Customer Success",
      "IT governance",
      "PostgreSQL and SQL",
      "Product Management",
      "Figma",
      "Design Sprint",
      "Leadership",
      "Communication and customer service"
    ],
    contact: {
      ...siteData.personal.contact,
      location: "Chapecó, SC, Brazil (Remote/Hybrid)",
      hours: "Monday to Friday, 8am to 6pm (Brasília time)"
    }
  },
  valuePropositions: [
    "I help technology and B2B operations companies organize projects, processes and data to speed up delivery, improve customer experience and increase operational efficiency.",
    "Turning operational complexity into organized, predictable execution.",
    "Connecting business, technology and customers to deliver measurable results.",
    "Project and operations management for companies that need to grow with method.",
    "More predictable projects. More efficient processes. Happier customers."
  ],
  metrics: [
    {
      label: "Schedule creation time",
      value: "-92%",
      context: "Structuring of training schedules",
      description: "Drastic reduction in manual preparation through standardization and process redesign.",
      benefit: "Faster scaling of training programs."
    },
    {
      label: "Report processing time",
      value: "-40%",
      context: "Indicator and report generation",
      description: "Optimized queries and data flows to support decision-making.",
      benefit: "Data-driven decisions in near real time."
    },
    {
      label: "Customer satisfaction (CSAT)",
      value: "+20%",
      context: "Customer satisfaction survey",
      description: "Better customer journey and delivery quality.",
      benefit: "Loyalty and lower churn."
    },
    {
      label: "Response time",
      value: "-33%",
      context: "Service and support",
      description: "Lower average response time in critical operations.",
      benefit: "Better perceived value for the customer."
    },
    {
      label: "Resolution SLA",
      value: "-25%",
      context: "Ticket and issue management",
      description: "More efficient resolution of technical issues.",
      benefit: "Smoother operation with fewer bottlenecks."
    },
    {
      label: "Operational delays",
      value: "-18%",
      context: "Project and delivery management",
      description: "More predictability and on-time delivery.",
      benefit: "Trust from stakeholders and customers."
    }
  ],
  solutions: [
    {
      id: "gestao-projetos",
      title: "Project Management",
      description: "Planning and execution of technology projects with method and predictability.",
      icon: "Briefcase",
      items: ["Planning", "Schedules", "Backlog and prioritization", "Follow-up rituals", "Risk management", "Stakeholder management"]
    },
    {
      id: "implantacao-sistemas",
      title: "Systems Implementation",
      description: "Strategic SaaS and ERP implementations focused on user adoption.",
      icon: "Settings",
      items: ["Requirements gathering", "Phase planning", "Training management", "Documentation", "Adoption tracking", "Change management"]
    },
    {
      id: "processos-melhoria",
      title: "Processes and Continuous Improvement",
      description: "Mapping and redesigning workflows to remove bottlenecks and raise productivity.",
      icon: "Layers",
      items: ["Process mapping", "Standardization", "Bottleneck identification", "Workflow redesign", "Performance indicators", "Continuous improvement"]
    },
    {
      id: "dados-bi",
      title: "KPIs, BI and Data Analysis",
      description: "Turning raw data into intelligence that supports decision-making.",
      icon: "BarChart3",
      items: ["KPI definition", "SQL queries", "Dynamic reports", "Power BI dashboards", "Advanced Excel", "Data organization"]
    },
    {
      id: "cs-suporte",
      title: "Customer Success and Support",
      description: "Building operations focused on customer success and retention.",
      icon: "Users",
      items: ["Strategic onboarding", "Adoption and retention", "Ticket and SLA management", "Customer journey", "Executive communication", "Problem solving"]
    },
    {
      id: "automacao-eficiencia",
      title: "Automation and Efficiency",
      description: "Less manual work and integrated tools to speed up operations.",
      icon: "Zap",
      items: ["Less manual work", "Tool integration", "Routine automation", "Smart alerts", "Standardized outputs", "Less rework"]
    }
  ],
  timeline: [
    {
      company: "Vision System",
      role: "Project Manager",
      period: "Nov 2023 – present",
      highlights: [
        "Implementation of ERP and waste-management software for strategic clients, focused on performance and scalability",
        "Backlog, schedules and agile rituals (Scrum/Kanban) with multidisciplinary teams",
        "40% less report processing time using SQL and 92% less time to structure training schedules",
        "Change Management: training and technical documentation to make clients self-sufficient"
      ]
    },
    {
      company: "Dotse",
      role: "Customer Success and Support",
      period: "Oct 2022 – Nov 2023",
      highlights: [
        "Personalized onboarding for 12+ B2B clients, with 100% retention in the first cycle",
        "Level 3 escalations with direct SQL database maintenance and a 25% better resolution SLA",
        "Bridge between customers and engineering in technical backlog prioritization"
      ]
    },
    {
      company: "Packid",
      role: "Support Coordinator",
      period: "Jan 2022 – Aug 2022",
      highlights: [
        "20% higher customer satisfaction (CSAT) and 33% faster response time after redesigning service flows",
        "Migrated the service platform (Octadesk to Tallos) and rolled out the official WhatsApp API",
        "Built a system validation process aligned with Anvisa (Brazilian health regulator) requirements"
      ]
    },
    {
      company: "Brasilfone and Angelira",
      role: "Accounts, Help Desk and Logistics",
      period: "2017 – 2022",
      highlights: [
        "Managed a client portfolio focused on retention and recovery",
        "Analyzed logistics processes and routes with IT, cutting operational delays by 18%"
      ]
    }
  ],
  tools: {
    ...siteData.tools,
    data: ["SQL Server", "PostgreSQL", "Power BI", "Advanced Excel"]
  }
};

export interface Solution {
  id: string;
  title: string;
  description: string;
  items: string[];
  icon: string;
}

export interface Metric {
  label: string;
  value: string;
  context: string;
  description: string;
  benefit: string;
}

export interface ExperienceItem {
  area: string;
  tasks: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CaseStudy {
  id: string;
  context: string;
  problem: string;
  approach: string;
  tools: string[];
  execution: string;
  result: string;
  learning: string;
}

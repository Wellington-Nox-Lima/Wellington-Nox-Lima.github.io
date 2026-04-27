import { withBasePath } from "@/lib/base-path";

export type TechnologyGroup = {
  title: string;
  items: string[];
};

export type Project = {
  name: string;
  summary: string;
  problem: string;
  stack: string[];
  isConfidential?: boolean;
  role: string;
  impact: string;
  media: MediaAsset[];
  overlayPanelClassName?: string;
  overlayTagClassName?: string;
  overlayTitleClassName?: string;
  overlayTextClassName?: string;
  overlayChipClassName?: string;
  link?: string;
  privacyNote?: string;
};

export type MediaAsset =
  | {
      type: "image";
      src: string;
      label: string;
      poster?: string;
    }
  | {
      type: "embed";
      src: string;
      label: string;
      poster?: string;
    };

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  context: string;
  responsibilities: string[];
  technologies: string[];
  deliveryType: string;
};

const personalInfo = {
  name: "Wellington José de Lima",
  title: "Analista de Sistemas | Desenvolvedor .NET | Dados e Automação RPA",
  location: "Paulínia, São Paulo - SP",
  email: "wel.nox.dev@gmail.com",
  github: "https://github.com/Wellington-Nox-Lima",
  linkedin: "https://www.linkedin.com/in/wellingtonjlima/",
};

const experienceDefaults = {
  company: "Aplicativo.Net / Sistema de Gestão Clínica",
  period: "2024 - Atual",
};

const createProjectMedia = (slug: string, embedUrl?: string): MediaAsset[] => {
  const media: MediaAsset[] = [
    {
      type: "image",
      src: withBasePath(`/images/projects/${slug}/image-00.webp`),
      label: "Imagem 00",
    },
    {
      type: "image",
      src: withBasePath(`/images/projects/${slug}/image-01.webp`),
      label: "Imagem 01",
    },
    {
      type: "image",
      src: withBasePath(`/images/projects/${slug}/image-02.webp`),
      label: "Imagem 02",
    },
    {
      type: "image",
      src: withBasePath(`/images/projects/${slug}/image-03.webp`),
      label: "Imagem 03",
    },
  ];

  if (embedUrl) {
    media.push({
      type: "embed",
      src: embedUrl,
      poster: withBasePath(`/images/projects/${slug}/image-00.webp`),
      label: "Vídeo demonstrativo",
    });
  }

  return media;
};

const technologies: TechnologyGroup[] = [
  {
    title: "Backend",
    items: ["C#", ".NET Framework", "ASP.NET MVC", "Web API", "Entity Framework"],
  },
  {
    title: "Frontend",
    items: ["JavaScript", "jQuery", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    title: "Banco de Dados",
    items: ["SQL Server", "T-SQL", "Views", "Stored Procedures", "Redis"],
  },
  {
    title: "Ferramentas",
    items: ["Azure DevOps", "Git", "Excel", "ClosedXML", "Visual Studio"],
  },
  {
    title: "Automação / Integrações",
    items: ["Power Automate", "Importação CSV", "Importação Excel", "APIs internas"],
  },
];

const projects: Project[] = [
  {
    name: "Sistema de Gestão Clínica",
    summary:
      "Aplicação web voltada ao suporte de rotinas administrativas, operacionais e cadastrais, com foco em organização de processos, regras de negócio e manutenção de dados.",
    problem:
      "Centralizar operações antes dispersas em fluxos manuais e telas desconectadas, reduzindo inconsistências e melhorando o controle do processo.",
    stack: [],
    isConfidential: true,
    role:
      "Atuação em manutenção evolutiva, implementação de regras de negócio, ajustes de interface e suporte a consultas SQL e estruturas de dados.",
    impact:
      "Maior rastreabilidade operacional, redução de erros cadastrais e sustentação mais segura para processos críticos do negócio.",
    media: createProjectMedia(
      "sistema-gestao-clinica",
      "https://www.youtube.com/embed/YUrfe4BX6OI",
    ),
    overlayPanelClassName: "border-white/12 bg-slate-950/88",
    overlayTagClassName: "border-white/15 bg-black/40 text-accentSoft",
    overlayTitleClassName: "text-white",
    overlayTextClassName: "text-slate-200",
    overlayChipClassName: "border-white/15 bg-black/35 text-slate-100",
    privacyNote:
      "Código-fonte privado por confidencialidade, com foco aqui na apresentação da solução, arquitetura e resultados.",
  },
  {
    name: "Importador e Validador de Planilhas",
    summary:
      "Solução ETL para importação, validação e tratamento de dados em massa a partir de arquivos de backup.",
    problem:
      "Fluxos de importação com alto volume de erro manual e inconsistências no formato dos dados comprometiam a velocidade da operação.",
    stack: ["Python", "SQL Server", "Pandas", "Pillow (PIL)", "Tkinter", "OpenPyXL"],
    role:
      "Desenvolvimento de rotina ETL para leitura, validação, padronização, tratamento de exceções e integração com o banco para persistência segura dos dados.",
    impact:
      "Redução de erros manuais e ganho de velocidade em fluxos de importação, com melhor qualidade na entrada de dados.",
    media: createProjectMedia("importador-validador-planilhas"),
    overlayPanelClassName: "border-cyan-100/15 bg-slate-950/90",
    overlayTagClassName: "border-cyan-200/20 bg-slate-950/75 text-cyan-100",
    overlayTitleClassName: "text-white",
    overlayTextClassName: "text-slate-100",
    overlayChipClassName: "border-cyan-100/20 bg-slate-950/55 text-slate-50",
  },
  {
    name: "Dashboard Operacional e Financeiro",
    summary:
      "Painel para visualização e consolidação de indicadores operacionais e financeiros a partir de consultas SQL e regras de agrupamento.",
    problem:
      "As informações estavam fragmentadas em fontes distintas, dificultando o acompanhamento de métricas e a tomada de decisão.",
    stack: ["SQL Server", "C#", "JavaScript", "HTML", "CSS"],
    role:
      "Construção de consultas, regras de consolidação, camada de exibição e refinamento da leitura analítica do painel.",
    impact:
      "Melhor visibilidade sobre indicadores-chave e apoio mais rápido a análises operacionais e gerenciais.",
    media: createProjectMedia("dashboard-operacional-financeiro"),
    overlayPanelClassName: "border-white/12 bg-slate-950/88",
    overlayTagClassName: "border-white/15 bg-black/40 text-accentSoft",
    overlayTitleClassName: "text-white",
    overlayTextClassName: "text-slate-200",
    overlayChipClassName: "border-white/15 bg-black/35 text-slate-100",
    privacyNote:
      "Código-fonte privado por confidencialidade, com foco aqui na apresentação da solução, arquitetura e resultados.",
  },
  {
    name: "Fluxo Interno de Solicitações",
    summary:
      "Estrutura para acompanhamento de demandas internas, priorização, status e rastreabilidade de atividades operacionais.",
    problem:
      "Solicitações internas eram geridas de forma dispersa, dificultando priorização, acompanhamento e transparência do fluxo.",
    stack: ["ASP.NET MVC", "SQL Server", "JavaScript"],
    role:
      "Implementação de melhorias, evolução das telas, manutenção das regras do fluxo e acompanhamento do ciclo de entrega.",
    impact:
      "Organização mais clara das demandas internas e melhor acompanhamento das etapas executadas.",
    media: createProjectMedia("fluxo-interno-solicitacoes"),
    overlayPanelClassName: "border-white/12 bg-slate-950/88",
    overlayTagClassName: "border-white/15 bg-black/40 text-accentSoft",
    overlayTitleClassName: "text-white",
    overlayTextClassName: "text-slate-200",
    overlayChipClassName: "border-white/15 bg-black/35 text-slate-100",
  },
];

const experience: ExperienceItem[] = [
  {
    role: "Analista de Sistemas / Desenvolvedor",
    company: experienceDefaults.company,
    period: experienceDefaults.period,
    context:
      "Atuação em sistemas corporativos com foco em manutenção, evolução de funcionalidades, consistência de dados e suporte a processos operacionais.",
    responsibilities: [
      "Desenvolvimento e manutenção de módulos web em ambiente corporativo",
      "Criação e ajuste de consultas SQL, procedures e rotinas de importação",
      "Implementação de regras de negócio e validações para fluxos internos",
      "Apoio técnico a operações ligadas a dados, cadastros e automações",
    ],
    technologies: [
      "C#",
      "ASP.NET MVC",
      "SQL Server",
      "JavaScript",
      "jQuery",
      "Redis",
      "Azure DevOps",
    ],
    deliveryType:
      "Entrega de melhorias evolutivas, correções, automações internas e sustentação técnica de aplicações de negócio.",
  },
];

export const portfolioData = {
  person: {
    name: personalInfo.name,
    title: personalInfo.title,
    shortPitch:
      "Soluções corporativas com foco em sistemas web, dados, automação e estabilidade operacional.",
    summary:
      "Analista de Sistemas e Desenvolvedor com experiência em aplicações web, banco de dados, automação de processos e tratamento de dados. Atuo principalmente com C#, ASP.NET MVC, SQL Server e JavaScript, desenvolvendo soluções corporativas, rotinas de importação, regras de negócio e melhorias operacionais.",
    location: personalInfo.location,
    email: personalInfo.email,
    github: personalInfo.github,
    linkedin: personalInfo.linkedin,
  },
  about: {
    overview:
      "Minha atuação é voltada à sustentação e evolução de sistemas corporativos, com atenção especial para consistência de dados, regras de negócio e eficiência operacional. Trabalho bem em ambientes onde confiabilidade, manutenção contínua e entendimento do processo fazem diferença real no resultado entregue.",
    technicalProfile:
      "Tenho experiência prática em desenvolvimento e manutenção de aplicações web em stack Microsoft, consultas SQL complexas, importação e saneamento de dados, automação de fluxos internos e integração entre rotinas de negócio e operações do dia a dia.",
    coreAreas: [
      "Desenvolvimento e manutenção de aplicações web corporativas",
      "Consultas SQL, modelagem relacional e análise de dados",
      "Importação, validação, padronização e migração de dados",
      "Automação de processos internos e redução de tarefas manuais",
    ],
    problemsSolved: [
      "Fluxos operacionais dependentes de retrabalho manual",
      "Dados inconsistentes entre planilhas, sistemas e bases relacionais",
      "Regras de negócio complexas distribuídas em aplicações legadas",
      "Necessidade de visibilidade operacional por meio de dashboards e consultas consolidadas",
    ],
    differentiators: [
      "Visão técnica orientada a contexto de negócio",
      "Capacidade de atuar tanto em backend quanto em banco de dados e automação",
      "Experiência com manutenção evolutiva em ambientes corporativos reais",
      "Foco em soluções estáveis, legíveis e adequadas ao cenário operacional",
    ],
  },
  technologies,
  projects,
  experience,
  github: {
    title: "GitHub como extensão da prática técnica",
    copy:
      "Esta seção foi pensada para reforçar a prova técnica do trabalho desenvolvido: repositórios organizados, projetos públicos, estudos direcionados e implementações que demonstram a evolução da base técnica ao longo do tempo.",
    highlights: [
      "Estrutura de repositórios com foco em clareza e contexto técnico",
      "Projetos públicos para demonstrar código, organização e decisões de implementação",
      "Estudos práticos sobre backend, banco de dados, frontend e automação",
      "Histórico que evidencia consistência, evolução profissional e repertório técnico",
    ],
  },
  contact: {
    closing:
      "Se você busca um profissional com experiência prática em sistemas, dados, manutenção evolutiva e automação de processos, estou aberto a conversar sobre oportunidades, projetos e colaborações técnicas.",
  },
};

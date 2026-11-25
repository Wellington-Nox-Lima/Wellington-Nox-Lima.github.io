/*
 * Todo o conteúdo do site fica aqui. Os componentes só cuidam da apresentação.
 *
 * O site apresenta RESULTADOS do trabalho todo (não só da migração): o que mudou para quem usa, com o número
 * quando ele existe. Cada número tem fonte (código, spec ou levantamento). Número que não foi medido não entra.
 * Sem detalhe técnico: o específico entra como uma linha nas listas por área.
 * Sem números de PR, nomes de produto interno, de clientes ou de concorrentes: o site é público.
 */

export const person = {
  name: "Wellington José de Lima",
  shortName: "Wellington Lima",
  role: "Desenvolvedor .NET full stack",
  location: "Paulínia, SP",
  email: "wel.nox.dev@gmail.com",
  github: "https://github.com/Wellington-Nox-Lima",
  githubHandle: "Wellington-Nox-Lima",
  linkedin: "https://www.linkedin.com/in/wellingtonjlima/",
  linkedinHandle: "wellingtonjlima",
  whatsapp: {
    number: "5519983267236",
    display: "(19) 98326-7236",
    message:
      "Olá, Wellington. Vi seu portfólio e gostaria de conversar sobre uma oportunidade ou projeto.",
  },
};

export const whatsappHref = `https://wa.me/${person.whatsapp.number}?text=${encodeURIComponent(
  person.whatsapp.message,
)}`;

export const hero = {
  role: "Desenvolvedor .NET full stack · SaaS de gestão para clínicas",
  headline: { before: "Software que devolve", highlight: "tempo e segurança", after: "às clínicas." },
  sub:
    "Trabalho num sistema usado por clínicas médicas e odontológicas, da agenda ao financeiro, do prontuário à migração de dados. Cada entrega minha é contada pelo que mudou para quem usa.",
};

/** Antes e depois de um resultado. O antes pode ser um número ou uma situação. */
export type Figure = {
  before?: string;
  after: string;
  delta?: string;
};

export type ResultItem = Figure & {
  area: string;
  title: string;
  text: string;
};

export const resultsIntro =
  "Seis entregas de áreas diferentes do produto, contadas pelo efeito para quem usa: a clínica, o paciente, o comercial e a equipe.";

/*
 * Fontes:
 * - Tempos (45 dias → 12 h, 1 dia → 1 h, 1 h → 5 min, sem prazo → 12 h): operação de migração, informados por mim.
 *   "1 dia" foi contado como 8 h de trabalho: −87% é o piso (em tempo corrido, seria −96%).
 * - 477 clínicas / 553 migrações: chamados com "migra" no título que passaram pelo meu nome em qualquer fila,
 *   de out/2024 a nov/2026 (consulta só de leitura em 12/11/2026). Fora: correções, chamados de código e
 *   tabela de preço sem "migra" no título.
 * - Demais itens: código e specs das entregas.
 */
export const results: ResultItem[] = [
  {
    area: "Migração de dados",
    before: "45 dias",
    after: "12 h",
    delta: "−99%",
    title: "A clínica nova começa a trabalhar em horas, não em um mês e meio.",
    text: "Tempo para preparar os dados de uma clínica que chega de outro sistema. Foram 477 clínicas desde 2024.",
  },
  {
    area: "Vendas",
    before: "1 dia",
    after: "1 h",
    delta: "−87%",
    title: "O comercial sabe o que migra antes de fechar o contrato.",
    text: "Tempo para analisar o backup de uma clínica em negociação e mostrar o que vem do sistema antigo e o que não vem.",
  },
  {
    area: "Privacidade",
    before: "link público",
    after: "só com login",
    title: "A foto do paciente só abre para quem tem acesso.",
    text: "Antes, bastava ter o endereço da imagem para ver a foto. Hoje é assim em todas as telas.",
  },
  {
    area: "Acesso",
    before: "tela travada",
    after: "abre normal",
    title: "Clínicas com computador antigo voltaram a entrar no sistema.",
    text: "Em navegadores antigos a tela ficava carregando sem fim. Agora abre, e quem está desatualizado recebe um aviso sem ser barrado.",
  },
  {
    area: "Financeiro",
    before: "cobrado 2×",
    after: "cobrado 1×",
    title: "Quem já pagou o boleto não é cobrado de novo.",
    text: "Fim da cobrança em duplicidade de boletos já pagos, e o valor devido passou a somar juros, multa e desconto.",
  },
  {
    area: "Agenda",
    before: "só no mouse",
    after: "no toque",
    title: "Marcar consulta pelo celular e pelo tablet.",
    text: "Agendar pelo toque passou a funcionar nos 8 calendários do sistema.",
  },
];

export const deliveryAreas: { id: string; title: string; note?: string; items: string[] }[] = [
  {
    id: "migracao",
    title: "Migração de dados",
    items: [
      "Preparar os dados de uma clínica: de 45 dias para 10, e depois para 12 horas.",
      "Analisar o backup de uma venda: de 1 dia para 1 hora.",
      "E-mail de validação para o cliente: de 1 hora para 5 minutos.",
      "Ajuste depois da migração: de sem prazo para 12 horas, feito pela tela e com desfazer.",
      "A clínica traz 12 tipos de dado em vez de 6, com imagens e documentos dos pacientes.",
      "Fila de migração acompanhada dentro do sistema, no lugar de um painel externo.",
      "Backup de outro sistema migrado sem 4 ferramentas externas (em revisão final).",
    ],
  },
  {
    id: "agenda",
    title: "Agenda",
    items: [
      "Marcar consultas pelo toque, no celular e no tablet, nos 8 calendários.",
      "Agenda por consultório respeitando o intervalo configurado.",
      "Texto do agendamento legível em qualquer cor de fundo.",
      "Compromissos recorrentes com o limite de 90 dias à vista.",
      "Agendamento online não vira mais compromisso, e a restrição de agenda voltou a valer.",
    ],
  },
  {
    id: "seguranca",
    title: "Segurança e acesso",
    items: [
      "Fotos de pacientes e profissionais só com login, em todas as telas.",
      "Cada pessoa vê a própria foto em todas as clínicas em que tem cadastro.",
      "Clínicas com computador antigo voltaram a entrar, com um aviso que não bloqueia.",
      "Anexos com acento no nome voltaram a baixar.",
    ],
  },
  {
    id: "prontuario",
    title: "Prontuário e cadastro",
    items: [
      "Vários procedimentos concluídos de uma vez, sem perder a ordem do tratamento.",
      "O prontuário mostra o dado novo logo depois de salvar.",
      "A mesma pessoa pode ser paciente em mais de uma clínica sem conflito de CPF.",
      "Quadro de próteses do laboratório utilizável no toque.",
      "Contrato e anamnese impressos com as assinaturas alinhadas.",
    ],
  },
  {
    id: "financeiro",
    title: "Financeiro e fiscal",
    items: [
      "Título que vence hoje não aparece mais como vencido.",
      "Nota fiscal de serviço no padrão da reforma tributária, com o paciente no documento.",
      "Guias de convênio com número longo ou com letras passaram a ser aceitas.",
      "Recibo com a data em que o pagamento compensou.",
      "Relatório mostra de onde veio cada paciente captado.",
    ],
  },
  {
    id: "atendimento",
    title: "Autoatendimento e mensagens",
    items: [
      "O totem voltou a enviar SMS.",
      "Paciente que responde “não vou poder ir” tem a consulta desmarcada.",
      "PIX do boleto direto no totem, também para contas a vencer.",
      "Receita digital sem recadastrar o profissional em cada clínica.",
      "Créditos de SMS da virada do mês visíveis no histórico.",
    ],
  },
  {
    id: "legado",
    title: "Sistema antigo",
    note: "2025",
    items: [
      "Fim da cobrança em duplicidade de boletos já pagos.",
      "Valor devido com juros, multa e desconto.",
      "PIX copia e cola no financeiro do paciente.",
      "Quem usava os layouts antigos foi levado para o padrão automaticamente.",
      "Pedido de ajuda direto no WhatsApp do suporte.",
    ],
  },
];

export const principles = [
  {
    icon: "search",
    title: "Olho os dados antes de mexer",
    text: "Confirmo o problema no dado real e mostro o número de antes e de depois.",
  },
  {
    icon: "layers",
    title: "Corrijo a causa",
    text: "Quando acho um problema, corrijo a origem e todos os lugares parecidos, não só o caso que chegou.",
  },
  {
    icon: "repeat",
    title: "Transformo o repetitivo em ferramenta",
    text: "Se uma tarefa se repete, ela vira ferramenta. Foi assim que 45 dias viraram 12 horas.",
  },
  {
    icon: "shield",
    title: "Protejo os dados das clínicas",
    text: "Nenhuma correção vai direto para o sistema: toda mudança é revisada e pode ser desfeita.",
  },
  {
    icon: "file",
    title: "Escrevo antes de construir",
    text: "Projeto grande começa com as decisões no papel, aprovadas antes do código.",
  },
  {
    icon: "bot",
    title: "Uso IA com revisão humana",
    text: "A IA acelera o dia a dia, e nada vai para o ar sem passar por revisão.",
  },
] as const;

export const experience = {
  company: "Aplicativo.Net",
  role: "Desenvolvedor .NET full stack",
  period: "2024 – atual",
  summary:
    "Sistema de gestão usado por clínicas médicas e odontológicas: agenda, prontuário, financeiro, autoatendimento e migração de dados. Comecei na migração de dados em 2024, desenvolvi no sistema antigo em 2025 e hoje trabalho no sistema novo e nas ferramentas de migração.",
};

export const timeline = [
  {
    period: "out – nov/2026",
    title: "Produto e migração completa",
    text: "Clínicas com computador antigo voltam a entrar, o totem volta a enviar SMS e a migração passa a trazer 12 tipos de dado.",
  },
  {
    period: "ago – out/2026",
    title: "Ferramentas de migração com IA",
    text: "Preparar uma migração cai para 12 horas, a análise de venda para 1 hora, e o ajuste pós-carga passa a ser feito pela tela.",
  },
  {
    period: "jul – ago/2026",
    title: "Sistema novo",
    text: "Fotos de pacientes só com login e agenda que funciona no toque.",
  },
  {
    period: "fev – jun/2026",
    title: "App de migração",
    text: "Preparar uma migração cai de 45 para 10 dias.",
  },
  {
    period: "jul – dez/2025",
    title: "Sistema antigo",
    text: "Fim da cobrança em duplicidade de boletos e PIX copia e cola no financeiro do paciente.",
  },
  {
    period: "2024 – jan/2026",
    title: "Migração de dados manual",
    text: "Cada clínica pedia um trabalho do zero: 45 dias para preparar os dados. Desse gargalo nasceram as ferramentas.",
  },
];

export const navItems = [
  { label: "Resultados", href: "#resultados" },
  { label: "Entregas", href: "#entregas" },
  { label: "Como trabalho", href: "#metodo" },
  { label: "Trajetória", href: "#trajetoria" },
];

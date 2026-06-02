export const CATEGORIES = [
  {
    n: 1,
    name: "Eliminar waterfalls",
    impact: "Crítico",
    prefix: "async-",
    color: "#b3463a",
  },
  {
    n: 2,
    name: "Bundle size",
    impact: "Crítico",
    prefix: "bundle-",
    color: "#b3463a",
  },
  {
    n: 3,
    name: "Performance server-side",
    impact: "Alto",
    prefix: "server-",
    color: "#c98a2e",
  },
  {
    n: 4,
    name: "Data fetching no cliente",
    impact: "Médio-alto",
    prefix: "client-",
    color: "#c98a2e",
  },
  {
    n: 5,
    name: "Re-render",
    impact: "Médio",
    prefix: "rerender-",
    color: "#d98a6a",
  },
  {
    n: 6,
    name: "Performance de renderização",
    impact: "Médio",
    prefix: "rendering-",
    color: "#d98a6a",
  },
  {
    n: 7,
    name: "Performance JavaScript",
    impact: "Baixo-médio",
    prefix: "js-",
    color: "#5a8a30",
  },
  {
    n: 8,
    name: "Padrões avançados",
    impact: "Baixo",
    prefix: "advanced-",
    color: "#3fa37a",
  },
];

export const USE_MODES = [
  {
    mode: "Modo 1",
    title: "Automático",
    tag: "o ideal",
    body: "Você pede um componente que busca dados de usuário e pedidos. O Claude aplica async-parallel sozinho. Você só vê o código bom.",
    prompt: '"crie um componente que busca user e orders"',
  },
  {
    mode: "Modo 2",
    title: "Invocação explícita",
    tag: "para auditoria",
    body: "Você pede uma revisão usando o nome da skill. Útil para varrer código legado e listar os problemas encontrados.",
    prompt: '"revise esse arquivo usando vercel-react-best-practices"',
  },
  {
    mode: "Modo 3",
    title: "Combinação",
    tag: "skill stack",
    body: "Funciona junto com next-best-practices, next-cache-components e deploy-to-vercel. Uma cuida de performance, outra de cache.",
    prompt: '"use as skills next + react-best-practices"',
  },
];

export const INSTALL_STEPS = [
  { n: 1, h: "Abra o projeto", d: "Next.js ou Vite, tanto faz" },
  { n: 2, h: "Rode o comando", d: "Instala em .claude/skills/" },
  { n: 3, h: "Verifique", d: "ls .claude/skills/" },
  { n: 4, h: "Pronto", d: "Já está ativa no Claude Code" },
];

export const META_RULES = [
  {
    rule: "rerender-no-inline-components",
    where:
      "SlideDeck, DemoPanels, CodeExamples e todos os slides são componentes próprios no escopo do módulo, não funções declaradas dentro de outro componente.",
  },
  {
    rule: "rerender-functional-setstate",
    where:
      "SlideDeck usa setIndex(current => ...) em go(), então o callback não precisa capturar o índice atual.",
  },
  {
    rule: "rerender-dependencies",
    where:
      "O useEffect do listener depende apenas de valores estáveis/primitivos: go e total.",
  },
  {
    rule: "client-event-listeners",
    where:
      "Existe um único listener global de keydown em SlideDeck, com cleanup no retorno do effect.",
  },
  {
    rule: "rendering-conditional-render",
    where:
      "O estado visual de cada slide é calculado por ternário: active, prev ou string vazia.",
  },
  {
    rule: "bundle-analyzable-paths",
    where:
      "O ícone do Claude Code é importado estaticamente em ClaudeCodeIcon.jsx, permitindo o Vite rastrear o asset no build.",
  },
];

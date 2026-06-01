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
      "Todos os componentes de slide são definidos no topo do módulo, nunca dentro de outro componente.",
  },
  {
    rule: "rerender-memo-with-default-value",
    where:
      "CATEGORIES, USE_MODES, INSTALL_STEPS e demais arrays/objetos ficam no módulo, com referência estável.",
  },
  {
    rule: "rendering-hoist-jsx",
    where: "O SVG do asterisco é um componente estático fora do App.",
  },
  {
    rule: "rerender-functional-setstate",
    where:
      "go() usa setIndex(i => ...), mantendo o handler estável sem depender do índice atual.",
  },
  {
    rule: "rerender-use-ref-transient-values / advanced-event-handler-refs",
    where:
      "indexRef guarda o índice corrente; o listener de teclado lê o ref e é registrado só uma vez.",
  },
  {
    rule: "rerender-dependencies",
    where:
      "O useEffect do keydown usa dependências estáveis, evitando binds desnecessários.",
  },
  {
    rule: "client-event-listeners / client-passive-event-listeners",
    where: "Um único listener global de keydown, com cleanup no unmount.",
  },
  {
    rule: "rendering-conditional-render",
    where:
      "Slides usam classes condicionais por ternário em vez de && para evitar render de 0/false.",
  },
];

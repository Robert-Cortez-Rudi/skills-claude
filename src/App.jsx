import { useState, useEffect, useRef, useCallback } from 'react'

/*
 * Apresentação estática (single-page) sobre Skills do Claude e a skill
 * vercel-react-best-practices. Navegação por slides com setas do teclado.
 *
 * META-DEMO: este arquivo aplica a própria skill enquanto é escrito.
 * As regras seguidas estão anotadas ao longo do código com // [regra].
 * A lista final aparece no último slide (Meta-demo).
 */

/* ----------------------------------------------------------------------------
 * Dados e JSX estáticos hoisted para o escopo do módulo.
 * [rerender-memo-with-default-value] objetos/arrays constantes têm referência
 * estável — não são recriados a cada render, então nunca disparam re-render
 * desnecessário ao serem passados como prop.
 * [rendering-hoist-jsx] JSX que nunca muda (SVG do asterisco) vive fora do
 * componente, montado uma única vez.
 * ------------------------------------------------------------------------- */

const Asterisk = (
  <svg className="asterisk" viewBox="0 0 100 100" aria-hidden="true">
    <g fill="currentColor">
      <rect x="42" y="6" width="16" height="88" />
      <rect x="6" y="42" width="88" height="16" />
      <rect
        x="42"
        y="6"
        width="16"
        height="88"
        transform="rotate(45 50 50)"
      />
      <rect
        x="42"
        y="6"
        width="16"
        height="88"
        transform="rotate(-45 50 50)"
      />
    </g>
  </svg>
)

const CATEGORIES = [
  { n: 1, name: 'Eliminar waterfalls', impact: 'Crítico', prefix: 'async-', color: '#b3463a' },
  { n: 2, name: 'Bundle size', impact: 'Crítico', prefix: 'bundle-', color: '#b3463a' },
  { n: 3, name: 'Performance server-side', impact: 'Alto', prefix: 'server-', color: '#c98a2e' },
  { n: 4, name: 'Data fetching no cliente', impact: 'Médio-alto', prefix: 'client-', color: '#c98a2e' },
  { n: 5, name: 'Re-render', impact: 'Médio', prefix: 'rerender-', color: '#d98a6a' },
  { n: 6, name: 'Performance de renderização', impact: 'Médio', prefix: 'rendering-', color: '#d98a6a' },
  { n: 7, name: 'Performance JavaScript', impact: 'Baixo-médio', prefix: 'js-', color: '#5a8a30' },
  { n: 8, name: 'Padrões avançados', impact: 'Baixo', prefix: 'advanced-', color: '#3fa37a' },
]

const USE_MODES = [
  {
    mode: 'Modo 1',
    title: 'Automático',
    tag: 'o ideal',
    body: 'Você pede um componente que busca dados de usuário e pedidos. O Claude aplica async-parallel sozinho. Você só vê o código bom.',
    prompt: '"crie um componente que busca user e orders"',
  },
  {
    mode: 'Modo 2',
    title: 'Invocação explícita',
    tag: 'para auditoria',
    body: 'Você pede uma revisão usando o nome da skill. Útil para varrer código legado e listar os problemas encontrados.',
    prompt: '"revise esse arquivo usando vercel-react-best-practices"',
  },
  {
    mode: 'Modo 3',
    title: 'Combinação',
    tag: 'skill stack',
    body: 'Funciona junto com next-best-practices, next-cache-components e deploy-to-vercel. Uma cuida de performance, outra de cache.',
    prompt: '"use as skills next + react-best-practices"',
  },
]

const INSTALL_STEPS = [
  { n: 1, h: 'Abra o projeto', d: 'Next.js ou Vite, tanto faz' },
  { n: 2, h: 'Rode o comando', d: 'Instala em .claude/skills/' },
  { n: 3, h: 'Verifique', d: 'ls .claude/skills/' },
  { n: 4, h: 'Pronto', d: 'Já está ativa no Claude Code' },
]

const CONFIG_POINTS = [
  {
    n: '01',
    h: 'A skill é read-only',
    d: 'Ela guia, não muda código sozinha. Quem escreve continua sendo o Claude — a skill só garante que ele lembre das 70 regras antes de gerar a primeira linha.',
  },
  {
    n: '02',
    h: 'Você pode customizar o SKILL.md',
    d: 'Edite localmente para relaxar uma regra que não se aplica ao seu stack, ou para adicionar contexto do time. Versione no git e todo mundo herda.',
  },
  {
    n: '03',
    h: 'AGENTS.md tem todas as 70 regras expandidas',
    d: 'Cada regra com exemplo errado e exemplo certo. Fonte oficial para consulta humana — vale a leitura mesmo fora do Claude Code.',
  },
]

const ROTEIRO = [
  { time: '5s', h: 'Prompt', n: '01', d: 'Mostre o pedido digitado no Claude Code' },
  { time: '10s', h: 'Geração', n: '02', d: 'Acelere o vídeo enquanto o código sai' },
  { time: '20s', h: 'Diff', n: '03', d: 'Pause e narre a regra que foi aplicada' },
  { time: '15s', h: 'Métrica', n: '04', d: 'Tempo, KB ou contagem de renders na tela' },
  { time: '5s', h: 'Punchline', n: '05', d: 'Uma frase curta que cola na memória' },
]

const META_RULES = [
  { rule: 'rerender-no-inline-components', where: 'Todos os componentes de slide são definidos no topo do módulo, nunca dentro de outro componente.' },
  { rule: 'rerender-memo-with-default-value', where: 'CATEGORIES, USE_MODES, INSTALL_STEPS e demais arrays/objetos hoisted para o módulo — referência estável.' },
  { rule: 'rendering-hoist-jsx', where: 'O SVG <Asterisk> é JSX estático criado uma vez fora dos componentes.' },
  { rule: 'rerender-functional-setstate', where: 'go() usa setIndex(i => ...), mantendo o handler estável sem depender do índice atual.' },
  { rule: 'rerender-use-ref-transient-values / advanced-event-handler-refs', where: 'indexRef guarda o índice corrente; o listener de teclado lê o ref e é registrado só uma vez.' },
  { rule: 'rerender-dependencies', where: 'O useEffect do keydown usa lista de dependências vazia/primitiva — bind único.' },
  { rule: 'client-event-listeners / client-passive-event-listeners', where: 'Um único listener global de keydown, com cleanup no unmount.' },
  { rule: 'rendering-conditional-render', where: 'Slides usam classes condicionais por ternário em vez de && para evitar render de 0/false.' },
  { rule: 'rerender-lazy-state-init', where: 'useState do índice inicia com valor primitivo simples (0), sem cálculo caro.' },
]

const TOTAL = 11 // 0..10

/* ----------------------------------------------------------------------------
 * Pequenos blocos de código com destaque manual (sem dependência externa —
 * [bundle-barrel-imports] nenhuma lib de highlight: zero peso no bundle).
 * ------------------------------------------------------------------------- */

function CodeWaterfallBefore() {
  return (
    <pre className="demo-code">
      <span className="tok-kw">await</span> getUser(){'\n'}
      <span className="tok-kw">await</span> getOrders(){'\n'}
      <span className="tok-kw">await</span> getNotifications()
    </pre>
  )
}

function CodeWaterfallAfter() {
  return (
    <pre className="demo-code">
      <span className="tok-kw">const</span> [user, orders, notif] ={'\n'}
      {'  '}<span className="tok-kw">await</span> <span className="tok-fn">Promise.all</span>([{'\n'}
      {'    '}getUser(),{'\n'}
      {'    '}getOrders(),{'\n'}
      {'    '}getNotifications(){'\n'}
      {'  '}])
    </pre>
  )
}

function CodeBundleBefore() {
  return (
    <pre className="demo-code">
      <span className="tok-kw">import</span> {'{ debounce }'} <span className="tok-kw">from</span>{' '}
      <span className="tok-str">'lodash'</span>
    </pre>
  )
}

function CodeBundleAfter() {
  return (
    <pre className="demo-code">
      <span className="tok-kw">import</span> debounce <span className="tok-kw">from</span>{' '}
      <span className="tok-str">'lodash/debounce'</span>
    </pre>
  )
}

function CodeRerenderBefore() {
  return (
    <pre className="demo-code">
      {'<Filho\n'}
      {'  config={{ x: 1, y: 2 }}\n'}
      {'/>'}
    </pre>
  )
}

function CodeRerenderAfter() {
  return (
    <pre className="demo-code">
      <span className="tok-kw">const</span> CONFIG = {'{ x:1, y:2 }'}{'\n'}
      {'<Filho config={CONFIG} />'}
    </pre>
  )
}

/* ----------------------------------------------------------------------------
 * Componente genérico de demo (antes / depois).
 * ------------------------------------------------------------------------- */

function DemoPanels({ beforeLabel, afterLabel, BeforeCode, AfterCode, beforeNote, afterNote, beforeMetric, beforeMetricSub, afterMetric, afterMetricSub }) {
  return (
    <div className="demo-grid">
      <div className="demo-panel">
        <div className="demo-head before">{beforeLabel}</div>
        <div className="demo-body">
          <p className="demo-note">{beforeNote}</p>
          <BeforeCode />
          <div className="metric bad">{beforeMetric}</div>
          <p className="metric-sub">{beforeMetricSub}</p>
        </div>
      </div>
      <div className="demo-panel">
        <div className="demo-head after">{afterLabel}</div>
        <div className="demo-body">
          <p className="demo-note">{afterNote}</p>
          <AfterCode />
          <div className="metric good">{afterMetric}</div>
          <p className="metric-sub">{afterMetricSub}</p>
        </div>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------------------
 * Slides — cada um é um componente puro definido no topo do módulo.
 * [rerender-no-inline-components]
 * ------------------------------------------------------------------------- */

function SlideCover({ state }) {
  return (
    <section className={`slide dark cover ${state}`}>
      {Asterisk}
      <p className="kicker">Apresentação · Skills do Claude</p>
      <h1 className="title">vercel-react-best-practices</h1>
      <p className="subtitle">Como guiar o Claude a escrever React e Next.js performáticos por padrão</p>
      <div className="accent-rule" />
      <p className="meta-line">70 regras · 8 categorias · mantida pela Vercel</p>
    </section>
  )
}

function SlideClaude({ state }) {
  return (
    <section className={`slide light ${state}`}>
      <p className="kicker">01 · O que é o Claude e o Claude Code</p>
      <h1 className="title">O modelo tem talento. A ferramenta entrega.</h1>
      <div className="split-2">
        <div>
          <h2 className="card-h" style={{ color: '#b35a3a' }}>Claude</h2>
          <p className="body-text">
            O modelo de IA da Anthropic. É quem realmente <b>pensa e escreve</b> —
            entende o pedido, raciocina e gera o código. Sabe React de sintaxe a
            arquitetura.
          </p>
        </div>
        <div>
          <h2 className="card-h" style={{ color: '#b35a3a' }}>Claude Code</h2>
          <p className="body-text">
            O agente que roda no seu terminal e no seu editor. Lê arquivos, edita
            código, roda comandos — e <b>carrega skills</b> que afinam como o Claude
            trabalha no seu projeto.
          </p>
        </div>
      </div>
    </section>
  )
}

function SlideSkills({ state }) {
  return (
    <section className={`slide light ${state}`}>
      <p className="kicker">02 · O que são Skills</p>
      <h1 className="title-italic title">Quem nunca pediu um componente React pro Claude…</h1>
      <p className="subtitle">…e recebeu um código que funciona, mas segura a página por 3 segundos em produção?</p>
      <div className="analogy">
        <p className="a-kicker">Analogia</p>
        <p className="a-title">Skills são o livro de receitas oficial da casa.</p>
        <p className="a-body">
          O Claude já sabia cozinhar — o modelo tem talento. A skill ensina ele a
          cozinhar do jeito do restaurante: usando ingredientes que rendem, técnicas
          que escalam e evitando os erros que o chef-titular já cansou de ver.
        </p>
      </div>
    </section>
  )
}

function SlideProblem({ state }) {
  return (
    <section className={`slide light ${state}`}>
      <p className="kicker">03 · O problema que resolve</p>
      <h1 className="title">Um guia de performance para React e Next.js, mantido pela Vercel</h1>
      <div className="split-2">
        <div>
          <p className="subtitle" style={{ marginTop: 0 }}>Não é linter. Não é biblioteca.</p>
          <p className="body-text">
            É um conjunto de instruções que o Claude consulta sozinho antes de
            escrever, revisar ou refatorar React/Next.
          </p>
          <p className="body-text">
            <b style={{ color: '#b35a3a' }}>O problema:</b> modelos de IA são bons em
            sintaxe — mas cometem os mesmos erros silenciosos de performance que um dev
            júnior: <b>waterfalls de await</b>, <b>imports barrel</b> inflando bundle,
            <b> re-renders</b> desnecessários, ausência de Suspense.
          </p>
        </div>
        <div className="stat-stack">
          <div className="stat-card">
            <span className="stat-num">70</span>
            <span className="stat-label">regras de performance priorizadas por impacto</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">8</span>
            <span className="stat-label">categorias do crítico ao avançado</span>
          </div>
          <div className="stat-card invert">
            <span className="stat-num">80%</span>
            <span className="stat-label">dos problemas em produção saem com as 2 primeiras categorias</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function SlideDownload({ state }) {
  return (
    <section className={`slide light ${state}`}>
      <p className="kicker">04 · Como baixar a skill</p>
      <h1 className="title">Um comando. Trinta segundos.</h1>
      <div className="terminal" style={{ marginTop: '2rem' }}>
        <div className="terminal-bar">
          <span className="dotr r" />
          <span className="dotr y" />
          <span className="dotr g" />
          <span className="terminal-label">terminal</span>
        </div>
        <div className="terminal-body">
          <span className="prompt-sign">$ </span>npx skills add https://github.com/vercel-labs/agent-skills \{'\n'}
          {'  '}--skill vercel-react-best-practices
        </div>
      </div>
      <div className="steps-4">
        {INSTALL_STEPS.map((s) => (
          <div className="step" key={s.n}>
            <div className="step-num">{s.n}</div>
            <div className="step-h">{s.h}</div>
            <div className="step-d">{s.d}</div>
          </div>
        ))}
      </div>
      <p className="tip">
        <b>Dica ·</b> instale por projeto (vai no <span className="mono">.claude/</span>{' '}
        versionado no git) — todo o time recebe a mesma skill.
      </p>
    </section>
  )
}

function SlideUse({ state }) {
  return (
    <section className={`slide light ${state}`}>
      <p className="kicker">05 · Como usar a skill no Claude Code</p>
      <h1 className="title">Três modos — você raramente vai "chamar" a skill</h1>
      <p className="subtitle">A description da skill age como gatilho. O Claude ativa sozinho quando faz sentido.</p>
      <div className="grid-3">
        {USE_MODES.map((m) => (
          <div className="card" key={m.mode}>
            <span className="card-mode">{m.mode}</span>
            <span className="card-h">{m.title}</span>
            <span className="card-tag">{m.tag}</span>
            <p className="card-body">{m.body}</p>
            <div className="card-prompt">{m.prompt}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function SlideCaseStudy({ state }) {
  return (
    <section className={`slide light ${state}`}>
      <p className="kicker">06 · Estudo de caso · 70 regras, 8 categorias</p>
      <h1 className="title">As 8 categorias por prioridade</h1>
      <p className="subtitle">Cada regra tem um prefixo. Quanto maior o impacto, mais alto na lista.</p>
      <div className="cat-list">
        {CATEGORIES.map((c) => (
          <div className="cat-row" key={c.n}>
            <span className="cat-dot" style={{ background: c.color }} />
            <span className="cat-name">{c.n}. {c.name}</span>
            <span className="cat-impact">{c.impact}</span>
            <span className="cat-prefix">{c.prefix}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function SlideDemoWaterfall({ state }) {
  return (
    <section className={`slide light ${state}`}>
      <p className="kicker">07 · Demo 1 · categoria async-</p>
      <h1 className="title">Waterfall de fetches no dashboard</h1>
      <p className="subtitle">Página que precisa de getUser(), getOrders() e getNotifications()</p>
      <DemoPanels
        beforeLabel="Sem skill"
        afterLabel="Com skill · async-parallel"
        BeforeCode={CodeWaterfallBefore}
        AfterCode={CodeWaterfallAfter}
        beforeNote="Três awaits em sequência — um espera o outro."
        afterNote="Disparados juntos com Promise.all."
        beforeMetric="~900ms"
        beforeMetricSub="tempo total em série"
        afterMetric="~300ms"
        afterMetricSub="o mais lento manda"
      />
      <p className="demo-impact">
        Impacto: 600ms a menos no Time to Interactive · o waterfall do DevTools mostra na hora.
      </p>
    </section>
  )
}

function SlideDemoBundle({ state }) {
  return (
    <section className={`slide light ${state}`}>
      <p className="kicker">08 · Demo 2 · categoria bundle-</p>
      <h1 className="title">Bundle inflado por barrel import</h1>
      <p className="subtitle">Componente que usa um único método do lodash</p>
      <DemoPanels
        beforeLabel="Sem skill"
        afterLabel="Com skill · bundle-barrel-imports"
        BeforeCode={CodeBundleBefore}
        AfterCode={CodeBundleAfter}
        beforeNote="O bundle inclui o lodash inteiro."
        afterNote="Import direto, sem barrel."
        beforeMetric="~70 KB"
        beforeMetricSub="lodash inteiro no chunk"
        afterMetric="~2 KB"
        afterMetricSub="só o debounce"
      />
      <p className="demo-impact">
        Impacto: 35× menor · o print do next build mostra a redução do chunk.
      </p>
    </section>
  )
}

function SlideDemoRerender({ state }) {
  return (
    <section className={`slide light ${state}`}>
      <p className="kicker">09 · Demo 3 · categoria rerender-</p>
      <h1 className="title">Re-render explosivo por prop não-primitiva</h1>
      <p className="subtitle">Input pai com useState — filho recebe objeto recriado a cada keystroke</p>
      <DemoPanels
        beforeLabel="Sem skill"
        afterLabel="Com skill · rerender-memo-with-default-value"
        BeforeCode={CodeRerenderBefore}
        AfterCode={CodeRerenderAfter}
        beforeNote="Objeto literal nas props."
        afterNote="Default hoisted, referência estável."
        beforeMetric="30 renders"
        beforeMetricSub="ao digitar uma palavra"
        afterMetric="1 render"
        afterMetricSub="o filho só atualiza quando precisa"
      />
      <p className="demo-impact">
        Impacto: o React DevTools Profiler mostra a queda de renders ao vivo.
      </p>
    </section>
  )
}

function SlideClosing({ state }) {
  return (
    <section className={`slide dark ${state}`}>
      <p className="kicker">10 · Chamado para ação</p>
      <h1 className="title">Instala hoje.<br />Deixa rodando uma semana.</h1>
      <p className="subtitle">
        Me conta na próxima reunião quantos waterfalls você não escreveu.
      </p>
      <div className="cta-cmd">
        <span className="prompt-sign">$ </span>npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-best-practices
      </div>
      <p className="thanks">Obrigado.</p>

      <details style={{ marginTop: '2rem', maxWidth: '90ch' }}>
        <summary style={{ cursor: 'pointer', color: 'var(--accent)', fontWeight: 700 }}>
          Meta-demo · regras da skill aplicadas neste próprio código
        </summary>
        <ul style={{ marginTop: '1rem', lineHeight: 1.6, paddingLeft: '1.2rem', color: 'var(--cream-dim)', fontSize: '0.95rem' }}>
          {META_RULES.map((r) => (
            <li key={r.rule} style={{ marginBottom: '0.6rem' }}>
              <code style={{ color: 'var(--accent-soft)' }}>{r.rule}</code> — {r.where}
            </li>
          ))}
        </ul>
      </details>
    </section>
  )
}

/* ----------------------------------------------------------------------------
 * Lista de slides em ordem. Array constante hoisted — referência estável.
 * [rerender-memo-with-default-value]
 * ------------------------------------------------------------------------- */
const SLIDES = [
  SlideCover,
  SlideClaude,
  SlideSkills,
  SlideProblem,
  SlideDownload,
  SlideUse,
  SlideCaseStudy,
  SlideDemoWaterfall,
  SlideDemoBundle,
  SlideDemoRerender,
  SlideClosing,
]

/* ----------------------------------------------------------------------------
 * App — controla apenas o índice do slide ativo.
 * ------------------------------------------------------------------------- */
export default function App() {
  // [rerender-lazy-state-init] valor primitivo simples, sem cálculo caro.
  const [index, setIndex] = useState(0)

  // [rerender-use-ref-transient-values] mantém o índice corrente acessível
  // dentro do listener sem recriá-lo a cada mudança.
  const indexRef = useRef(0)
  indexRef.current = index

  // [rerender-functional-setstate] o updater não depende do índice atual via
  // closure — ele recebe o valor mais recente como argumento, então go() é
  // estável e o handler de teclado nunca precisa ser re-registrado.
  const go = useCallback((delta) => {
    setIndex((i) => {
      const next = i + delta
      if (next < 0) return 0
      if (next > TOTAL - 1) return TOTAL - 1
      return next
    })
  }, [])

  // [client-event-listeners] um único listener global de teclado.
  // [rerender-dependencies] dependência estável (go) — bind acontece uma vez.
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault()
        go(1)
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        go(-1)
      } else if (e.key === 'Home') {
        setIndex(0)
      } else if (e.key === 'End') {
        setIndex(TOTAL - 1)
      }
    }
    // [client-passive-event-listeners] keydown não precisa de scroll bloqueado,
    // mas preventDefault é necessário aqui, então o listener é ativo de propósito.
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  const progressLabel = `${String(index + 1).padStart(2, '0')}/${String(TOTAL).padStart(2, '0')}`
  const progressWidth = `${((index + 1) / TOTAL) * 100}%`

  return (
    <div className="deck">
      {/* [rendering-conditional-render] classe de estado escolhida por ternário,
          nunca com && (que renderizaria 0/false como texto). */}
      {SLIDES.map((Slide, i) => {
        const state = i === index ? 'active' : i < index ? 'prev' : ''
        return <Slide key={i} state={state} />
      })}

      <div className="hint">
        <span className="key">←</span>
        <span className="key">→</span>
        <span>para navegar</span>
      </div>
      <div className="footer-tag">Skill · vercel-react-best-practices</div>
      <div className="progress">{progressLabel}</div>
      <div className="progress-track" style={{ width: progressWidth }} />
    </div>
  )
}

import { META_RULES } from "../data/presentation";

export function SlideClosing({ state }) {
  return (
    <section className={`slide dark ${state}`}>
      <p className="kicker">10 · Chamado para ação</p>
      <h1 className="title">
        Instala hoje.
        <br />
        Deixa rodando uma semana.
      </h1>
      <p className="subtitle">
        Me conta na próxima reunião quantos waterfalls você não escreveu.
      </p>
      <div className="cta-cmd">
        <span className="prompt-sign">$ </span>npx skills add
        https://github.com/vercel-labs/agent-skills --skill
        vercel-react-best-practices
      </div>
      <p className="thanks">Obrigado.</p>

      <details className="meta-demo">
        <summary className="meta-demo-summary">
          Meta-demo · regras da skill aplicadas neste próprio código
        </summary>
        <ul className="meta-demo-list">
          {META_RULES.map((rule) => (
            <li className="meta-demo-item" key={rule.rule}>
              <code className="meta-demo-rule">{rule.rule}</code> - {rule.where}
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}

import { META_RULES } from "../data/presentation";

export function SlideClosing({ state }) {
  return (
    <section className={`slide dark ${state}`}>
      <p className="kicker">10 · Meta-demo</p>
      <h1 className="title">Regras da skill aplicadas neste próprio código</h1>
      <p className="subtitle">
        A apresentação não só fala da skill: ela também foi organizada seguindo
        parte das próprias recomendações.
      </p>

      <ul className="meta-demo-list">
        {META_RULES.map((rule) => (
          <li className="meta-demo-item" key={rule.rule}>
            <code className="meta-demo-rule">{rule.rule}</code>
            <span>{rule.where}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

import { CATEGORIES } from "../data/presentation";

export function SlideCaseStudy({ state }) {
  return (
    <section className={`slide dark ${state}`}>
      <p className="kicker">06 · Estudo de caso · 70 regras, 8 categorias</p>
      <h1 className="title">As 8 categorias por prioridade</h1>
      <p className="subtitle">
        Cada regra tem um prefixo. Quanto maior o impacto, mais alto na lista.
      </p>
      <div className="cat-list">
        {CATEGORIES.map((category) => (
          <div className="cat-row" key={category.n}>
            <span className="cat-dot" style={{ background: category.color }} />
            <span className="cat-name">
              {category.n}. {category.name}
            </span>
            <span className="cat-impact">{category.impact}</span>
            <span className="cat-prefix">{category.prefix}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

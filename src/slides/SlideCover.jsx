import { ClaudeCodeIcon } from "../components/deck/ClaudeCodeIcon";

export function SlideCover({ state }) {
  return (
    <section className={`slide dark cover ${state}`}>
      <ClaudeCodeIcon />
      <p className="kicker">Apresentação · Skills do Claude</p>
      <h1 className="title">vercel-react-best-practices</h1>
      <p className="subtitle">
        Como guiar o Claude a escrever React e Next.js performáticos por padrão
      </p>
      <div className="accent-rule" />
      <p className="meta-line">70 regras · 8 categorias · mantida pela Vercel</p>
    </section>
  );
}

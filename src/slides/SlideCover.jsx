import { ClaudeCodeIcon } from "../components/deck/ClaudeCodeIcon";

const AUTHORS = ["Hyan Ferreira", "Robert Cortez"];

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
      <div className="author-card" aria-label="Apresentadores">
        <span className="author-card-label">Apresentadores</span>
        <p className="author-line">
          <span>{AUTHORS[0]}</span>
          <span className="author-separator">&&</span>
          <span>{AUTHORS[1]}</span>
        </p>
      </div>
    </section>
  );
}

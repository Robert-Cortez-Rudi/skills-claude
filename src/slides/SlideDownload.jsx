import { INSTALL_STEPS } from "../data/presentation";

export function SlideDownload({ state }) {
  return (
    <section className={`slide dark ${state}`}>
      <p className="kicker">04 · Como baixar a skill</p>
      <h1 className="title">Um comando. Trinta segundos.</h1>
      <div className="terminal terminal-spaced">
        <div className="terminal-bar">
          <span className="dotr r" />
          <span className="dotr y" />
          <span className="dotr g" />
          <span className="terminal-label">terminal</span>
        </div>
        <div className="terminal-body">
          <span className="prompt-sign">$ </span>npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-best-practices
        </div>
      </div>
      <div className="steps-4">
        {INSTALL_STEPS.map((step) => (
          <div className="step" key={step.n}>
            <div className="step-num">{step.n}</div>
            <div className="step-h">{step.h}</div>
            <div className="step-d">{step.d}</div>
          </div>
        ))}
      </div>
      <p className="tip">
        <b>Dica ·</b> instale por projeto (vai no <span className="mono">.claude/</span>{" "}
        versionado no git) - todo o time recebe a mesma skill.
      </p>
    </section>
  );
}

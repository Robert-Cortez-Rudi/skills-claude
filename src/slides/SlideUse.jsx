import { USE_MODES } from "../data/presentation";

export function SlideUse({ state }) {
  return (
    <section className={`slide dark ${state}`}>
      <p className="kicker">05 · Como usar a skill no Claude Code</p>
      <h1 className="title">Três modos - você raramente vai "chamar" a skill</h1>
      <p className="subtitle">
        A description da skill age como gatilho. O Claude ativa sozinho quando
        faz sentido.
      </p>
      <div className="grid-3">
        {USE_MODES.map((mode) => (
          <div className="card" key={mode.mode}>
            <span className="card-mode">{mode.mode}</span>
            <span className="card-h">{mode.title}</span>
            <span className="card-tag">{mode.tag}</span>
            <p className="card-body">{mode.body}</p>
            <div className="card-prompt">{mode.prompt}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

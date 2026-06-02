export function SlideThanks({ state }) {
  return (
    <section className={`slide dark thanks-slide ${state}`}>
      <h1 className="title">Obrigado.</h1>
      <p className="subtitle">
        Que o próximo componente já nasça sem waterfall, sem bundle inflado e
        sem re-render desnecessário.
      </p>

      <div className="thanks-panel">
        <span className="thanks-label">Apresentadores</span>
        <p className="thanks-names">
          Hyan Ferreira <span>&&</span> Robert Cortez
        </p>
      </div>
    </section>
  );
}

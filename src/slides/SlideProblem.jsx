export function SlideProblem({ state }) {
  return (
    <section className={`slide dark ${state}`}>
      <p className="kicker">03 · O problema que resolve</p>
      <h1 className="title">
        Um guia de performance para React e Next.js, mantido pela Vercel
      </h1>
      <div className="split-2">
        <div>
          <p className="subtitle subtitle-top">Não é linter. Não é biblioteca.</p>
          <p className="body-text">
            É um conjunto de instruções que o Claude consulta sozinho antes de
            escrever, revisar ou refatorar React/Next.
          </p>
          <p className="body-text">
            <b className="accent-text">O problema:</b> modelos de IA são bons em
            sintaxe - mas cometem os mesmos erros silenciosos de performance que
            um dev júnior: <b>waterfalls de await</b>, <b>imports barrel</b>{" "}
            inflando bundle, <b> re-renders</b> desnecessários, ausência de
            Suspense.
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
            <span className="stat-label">
              dos problemas em produção saem com as 2 primeiras categorias
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

import {
  CodeRerenderAfter,
  CodeRerenderBefore,
} from "../components/demo/CodeExamples";
import { DemoPanels } from "../components/demo/DemoPanels";

export function SlideDemoRerender({ state }) {
  return (
    <section className={`slide dark ${state}`}>
      <p className="kicker">09 · Demo 3 · categoria rerender-</p>
      <h1 className="title">Re-render explosivo por prop não-primitiva</h1>
      <p className="subtitle">
        Input pai com useState - filho recebe objeto recriado a cada keystroke
      </p>
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
  );
}

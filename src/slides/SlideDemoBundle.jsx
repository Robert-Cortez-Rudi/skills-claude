import { CodeBundleAfter, CodeBundleBefore } from "../components/demo/CodeExamples";
import { DemoPanels } from "../components/demo/DemoPanels";

export function SlideDemoBundle({ state }) {
  return (
    <section className={`slide dark ${state}`}>
      <p className="kicker">08 · Demo 2 · categoria bundle-</p>
      <h1 className="title">Bundle inflado por barrel import</h1>
      <p className="subtitle">Componente que usa um único método do lodash</p>
      <DemoPanels
        beforeLabel="Sem skill"
        afterLabel="Com skill · bundle-barrel-imports"
        BeforeCode={CodeBundleBefore}
        AfterCode={CodeBundleAfter}
        beforeNote="O bundle inclui o lodash inteiro."
        afterNote="Import direto, sem barrel."
        beforeMetric="~70 KB"
        beforeMetricSub="lodash inteiro no chunk"
        afterMetric="~2 KB"
        afterMetricSub="só o debounce"
      />
      <p className="demo-impact">
        Impacto: 35x menor · o print do next build mostra a redução do chunk.
      </p>
    </section>
  );
}

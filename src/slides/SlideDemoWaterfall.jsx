import {
  CodeWaterfallAfter,
  CodeWaterfallBefore,
} from "../components/demo/CodeExamples";
import { DemoPanels } from "../components/demo/DemoPanels";

export function SlideDemoWaterfall({ state }) {
  return (
    <section className={`slide dark ${state}`}>
      <p className="kicker">07 · Demo 1 · categoria async-</p>
      <h1 className="title">Waterfall de fetches no dashboard</h1>
      <p className="subtitle">
        Página que precisa de getUser(), getOrders() e getNotifications()
      </p>
      <DemoPanels
        beforeLabel="Sem skill"
        afterLabel="Com skill · async-parallel"
        BeforeCode={CodeWaterfallBefore}
        AfterCode={CodeWaterfallAfter}
        beforeNote="Três awaits em sequência - um espera o outro."
        afterNote="Disparados juntos com Promise.all."
        beforeMetric="~900ms"
        beforeMetricSub="tempo total em série"
        afterMetric="~300ms"
        afterMetricSub="o mais lento manda"
      />
      <p className="demo-impact">
        Impacto: 600ms a menos no Time to Interactive · o waterfall do DevTools
        mostra na hora.
      </p>
    </section>
  );
}

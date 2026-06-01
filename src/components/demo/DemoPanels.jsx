export function DemoPanels({
  beforeLabel,
  afterLabel,
  BeforeCode,
  AfterCode,
  beforeNote,
  afterNote,
  beforeMetric,
  beforeMetricSub,
  afterMetric,
  afterMetricSub,
}) {
  return (
    <div className="demo-grid">
      <div className="demo-panel">
        <div className="demo-head before">{beforeLabel}</div>
        <div className="demo-body">
          <p className="demo-note">{beforeNote}</p>
          <BeforeCode />
          <div className="metric bad">{beforeMetric}</div>
          <p className="metric-sub">{beforeMetricSub}</p>
        </div>
      </div>
      <div className="demo-panel">
        <div className="demo-head after">{afterLabel}</div>
        <div className="demo-body">
          <p className="demo-note">{afterNote}</p>
          <AfterCode />
          <div className="metric good">{afterMetric}</div>
          <p className="metric-sub">{afterMetricSub}</p>
        </div>
      </div>
    </div>
  );
}

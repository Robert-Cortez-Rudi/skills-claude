export function CodeWaterfallBefore() {
  return (
    <pre className="demo-code">
      <span className="tok-kw">await</span> <span className="tok-fn">getUser</span>(){"\n"}
      <span className="tok-kw">await</span> <span className="tok-fn">getOrders</span>(){"\n"}
      <span className="tok-kw">await</span> <span className="tok-fn">getNotifications</span>()
    </pre>
  );
}

export function CodeWaterfallAfter() {
  return (
    <pre className="demo-code">
      <span className="tok-kw">const</span> [<span className="tok-var">user</span>,{" "}
      <span className="tok-var">orders</span>, <span className="tok-var">notif</span>] ={"\n"}
      {"  "}
      <span className="tok-kw">await</span> <span className="tok-fn">Promise.all</span>([{"\n"}
      {"    "}
      <span className="tok-fn">getUser</span>(),{"\n"}
      {"    "}
      <span className="tok-fn">getOrders</span>(),{"\n"}
      {"    "}
      <span className="tok-fn">getNotifications</span>(){"\n"}
      {"  "}])
    </pre>
  );
}

export function CodeBundleBefore() {
  return (
    <pre className="demo-code">
      <span className="tok-kw">import</span> {"{ "}
      <span className="tok-var">debounce</span>
      {" }"}{" "}
      <span className="tok-kw">from</span> <span className="tok-str">'lodash'</span>
    </pre>
  );
}

export function CodeBundleAfter() {
  return (
    <pre className="demo-code">
      <span className="tok-kw">import</span> <span className="tok-var">debounce</span>{" "}
      <span className="tok-kw">from</span>{" "}
      <span className="tok-str">'lodash/debounce'</span>
    </pre>
  );
}

export function CodeRerenderBefore() {
  return (
    <pre className="demo-code">
      {"<"}
      <span className="tok-tag">Filho</span>
      {"\n"}
      {"  "}
      <span className="tok-attr">config</span>
      {"={{ "}
      <span className="tok-prop">x</span>
      {": "}
      <span className="tok-num">1</span>
      {", "}
      <span className="tok-prop">y</span>
      {": "}
      <span className="tok-num">2</span>
      {" }}\n"}
      {"/>"}
    </pre>
  );
}

export function CodeRerenderAfter() {
  return (
    <pre className="demo-code">
      <span className="tok-kw">const</span> <span className="tok-var">CONFIG</span> = {"{ "}
      <span className="tok-prop">x</span>
      {": "}
      <span className="tok-num">1</span>
      {", "}
      <span className="tok-prop">y</span>
      {": "}
      <span className="tok-num">2</span>
      {" }"}
      {"\n"}
      {"<"}
      <span className="tok-tag">Filho</span> <span className="tok-attr">config</span>=
      {"{"}
      <span className="tok-var">CONFIG</span>
      {"} />"}
    </pre>
  );
}

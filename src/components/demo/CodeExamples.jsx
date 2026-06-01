export function CodeWaterfallBefore() {
  return (
    <pre className="demo-code">
      <span className="tok-kw">await</span> getUser(){"\n"}
      <span className="tok-kw">await</span> getOrders(){"\n"}
      <span className="tok-kw">await</span> getNotifications()
    </pre>
  );
}

export function CodeWaterfallAfter() {
  return (
    <pre className="demo-code">
      <span className="tok-kw">const</span> [user, orders, notif] ={"\n"}
      {"  "}
      <span className="tok-kw">await</span> <span className="tok-fn">Promise.all</span>([{"\n"}
      {"    "}getUser(),{"\n"}
      {"    "}getOrders(),{"\n"}
      {"    "}getNotifications(){"\n"}
      {"  "}])
    </pre>
  );
}

export function CodeBundleBefore() {
  return (
    <pre className="demo-code">
      <span className="tok-kw">import</span> {"{ debounce }"}{" "}
      <span className="tok-kw">from</span> <span className="tok-str">'lodash'</span>
    </pre>
  );
}

export function CodeBundleAfter() {
  return (
    <pre className="demo-code">
      <span className="tok-kw">import</span> debounce <span className="tok-kw">from</span>{" "}
      <span className="tok-str">'lodash/debounce'</span>
    </pre>
  );
}

export function CodeRerenderBefore() {
  return (
    <pre className="demo-code">
      {"<Filho\n"}
      {"  config={{ x: 1, y: 2 }}\n"}
      {"/>"}
    </pre>
  );
}

export function CodeRerenderAfter() {
  return (
    <pre className="demo-code">
      <span className="tok-kw">const</span> CONFIG = {"{ x:1, y:2 }"}
      {"\n"}
      {"<Filho config={CONFIG} />"}
    </pre>
  );
}

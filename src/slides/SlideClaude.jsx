export function SlideClaude({ state }) {
  return (
    <section className={`slide dark ${state}`}>
      <p className="kicker">01 · O que é o Claude e o Claude Code</p>
      <h1 className="title">O modelo tem talento. A ferramenta entrega.</h1>
      <div className="split-2">
        <div>
          <h2 className="card-h accent-heading">Claude</h2>
          <p className="body-text">
            O modelo de IA da Anthropic. É quem realmente <b>pensa e escreve</b>{" "}
            - entende o pedido, raciocina e gera o código. Sabe React de sintaxe
            a arquitetura.
          </p>
        </div>
        <div>
          <h2 className="card-h accent-heading">Claude Code</h2>
          <p className="body-text">
            O agente que roda no seu terminal e no seu editor. Lê arquivos,
            edita código, roda comandos - e <b>carrega skills</b> que afinam
            como o Claude trabalha no seu projeto.
          </p>
        </div>
      </div>
    </section>
  );
}

export function SlideSkills({ state }) {
  return (
    <section className={`slide dark ${state}`}>
      <p className="kicker">02 · O que são Skills</p>
      <h1 className="title">Quem nunca pediu um componente React pro Claude...</h1>
      <p className="subtitle">
        ...e recebeu um código que funciona, mas segura a página por 3 segundos em
        produção?
      </p>
      <div className="analogy">
        <p className="a-kicker">Analogia</p>
        <p className="a-title">Skills são o livro de receitas oficial da casa.</p>
        <p className="a-body">
          O Claude já sabia cozinhar - o modelo tem talento. A skill ensina ele
          a cozinhar do jeito do restaurante: usando ingredientes que rendem,
          técnicas que escalam e evitando os erros que o chef-titular já cansou
          de ver.
        </p>
      </div>
    </section>
  );
}

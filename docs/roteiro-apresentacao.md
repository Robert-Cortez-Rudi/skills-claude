# Roteiro da apresentação

Tema: `vercel-react-best-practices`

Objetivo da apresentação: explicar o que são Skills no Claude Code e mostrar, com exemplos simples, como a skill `vercel-react-best-practices` ajuda o Claude a escrever React/Next.js com mais cuidado de performance.

Tempo sugerido: 10 a 15 minutos.

## Como estudar antes

1. Entenda a diferença entre Claude e Claude Code.
2. Decore a ideia principal de Skills: são instruções especializadas que o Claude consulta para trabalhar melhor em um contexto.
3. Treine bem as três demos: waterfall, bundle e re-render. Elas são a parte que mais convence.
4. Não venda números como pesquisa científica se você não tiver fonte. Quando falar do `80%`, trate como uma forma de priorização: as primeiras categorias atacam os problemas mais comuns e mais caros.

## Slide 1 - Capa

Objetivo: abrir a apresentação e deixar claro o assunto.

O que o slide fala:
Este deck é sobre a skill `vercel-react-best-practices`, uma forma de guiar o Claude para gerar React e Next.js com boas práticas de performance.

Fala sugerida:

> Hoje a gente vai falar sobre uma skill chamada `vercel-react-best-practices`. A ideia não é mostrar uma biblioteca nova nem uma regra de lint. É mostrar como podemos dar ao Claude um guia de trabalho para ele escrever React e Next.js melhor por padrão, principalmente em performance.

Ponto para lembrar:
O público precisa entender desde o começo que a skill não substitui conhecimento técnico. Ela ajuda o Claude a lembrar de padrões importantes antes de gerar código.

## Slide 2 - O que é Claude e Claude Code

Objetivo: separar modelo de ferramenta.

O que entender:
Claude é o modelo de IA. Ele interpreta pedidos, raciocina e escreve respostas/código.

Claude Code é o agente no terminal/editor. Ele consegue ler arquivos, editar código, rodar comandos e aplicar contexto do projeto. É dentro desse ambiente que as Skills fazem mais sentido.

Fala sugerida:

> Uma distinção importante: Claude é o modelo, quem raciocina e gera o código. Claude Code é a ferramenta de trabalho no terminal e no editor. Ele conecta o modelo ao projeto real: arquivos, comandos, estrutura, testes. As Skills entram aí como uma camada de instrução especializada.

Se perguntarem:
Claude Code não é “outro modelo”. É uma forma agentica de usar o Claude dentro do projeto.

## Slide 3 - O que são Skills

Objetivo: explicar Skills sem jargão.

O que entender:
Skills são pacotes de instruções. Elas ensinam o Claude a agir melhor em uma tarefa específica.

Analogia do slide:
O Claude já sabe “cozinhar”. A skill é o livro de receitas da casa: orienta padrões, prioridades e erros a evitar.

Fala sugerida:

> O Claude já sabe React, mas saber React genericamente não garante que ele sempre vai priorizar performance. A skill funciona como um guia especializado. Ela diz: quando estiver escrevendo React, lembre desses padrões, evite esses erros e priorize esses tipos de problema.

Conceito importante:
Uma skill não executa mágica sozinha. Ela influencia como o Claude escreve, revisa e refatora.

## Slide 4 - O problema que resolve

Objetivo: mostrar por que a skill existe.

O que entender:
Modelos geram código funcional, mas podem repetir erros silenciosos:

- awaits em sequência quando poderiam rodar em paralelo;
- imports que aumentam bundle;
- props não primitivas recriadas a cada render;
- falta de atenção a Suspense, cache e data fetching.

Fala sugerida:

> O problema não é o Claude errar sintaxe. Normalmente o código funciona. O problema é o código funcionar com custo escondido: demora mais para carregar, renderiza mais do que precisa ou manda mais JavaScript para o browser. Essa skill tenta atacar esse tipo de problema antes que ele apareça em produção.

Sobre o `80%`:
Fale como priorização, não como estatística absoluta.

> A leitura aqui é: se a gente resolver primeiro async e bundle, geralmente já ataca uma parte grande dos problemas mais caros.

## Slide 5 - Como baixar a skill

Objetivo: mostrar que a instalação é simples.

O que entender:
O comando instala a skill no projeto para o Claude Code poder carregar as instruções.

Comando:

```bash
npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-best-practices
```

Fala sugerida:

> Para instalar, é só rodar esse comando na raiz do projeto. A ideia boa aqui é instalar por projeto, porque a skill vira parte do contexto daquele repositório. Assim o time inteiro pode trabalhar com as mesmas orientações.

Ponto para lembrar:
Se a skill for versionada no projeto, o comportamento esperado fica mais consistente entre pessoas do time.

## Slide 6 - Como usar a skill no Claude Code

Objetivo: explicar os três modos de uso.

Modo 1 - Automático:
Você pede algo que naturalmente envolve React/performance. O Claude pode ativar a skill porque a descrição combina com a tarefa.

Fala:

> O melhor caso é quando você nem precisa chamar a skill. Você pede um componente e o Claude já considera as regras certas.

Modo 2 - Invocação explícita:
Você pede diretamente: “revise usando `vercel-react-best-practices`”.

Fala:

> Esse modo é bom para auditoria: pegar código existente e pedir para o Claude procurar problemas segundo a skill.

Modo 3 - Combinação:
Usar junto com outras skills, por exemplo Next, cache ou deploy.

Fala:

> Em projeto real, uma skill raramente vive sozinha. Você pode combinar uma skill de React com outra de Next, cache ou deploy.

## Slide 7 - As 8 categorias

Objetivo: mostrar que as regras são priorizadas.

O que entender:
A skill organiza regras por impacto. As primeiras categorias são as mais críticas.

Resumo das categorias:

- `async-`: evitar waterfalls e bloqueios desnecessários.
- `bundle-`: reduzir JavaScript enviado ao cliente.
- `server-`: melhorar trabalho feito no servidor.
- `client-`: melhorar busca de dados no cliente.
- `rerender-`: evitar renders desnecessários.
- `rendering-`: melhorar renderização.
- `js-`: reduzir custo de JavaScript.
- `advanced-`: padrões avançados.

Fala sugerida:

> A lista não é aleatória. Ela começa no que tende a doer mais: tempo de espera e tamanho de bundle. Depois vai refinando para render, JavaScript e padrões mais avançados.

## Slide 8 - Demo 1: Waterfall de fetches

Objetivo: explicar `async-parallel`.

O que entender:
Waterfall acontece quando chamadas independentes rodam em sequência.

Antes:

```js
await getUser()
await getOrders()
await getNotifications()
```

Depois:

```js
await Promise.all([
  getUser(),
  getOrders(),
  getNotifications()
])
```

Fala sugerida:

> Aqui as três chamadas não dependem uma da outra. Se eu faço um await depois do outro, crio uma fila artificial. Se cada chamada demora 300ms, posso acabar esperando 900ms. Com `Promise.all`, eu disparo tudo junto e espero a mais lenta.

Explicação simples:
Se as tarefas são independentes, paralelizar reduz o tempo total percebido.

Cuidado:
Só use `Promise.all` quando uma chamada não depende do resultado da anterior.

## Slide 9 - Demo 2: Bundle inflado

Objetivo: explicar barrel import e tamanho de bundle.

O que entender:
Bundle é o JavaScript que chega ao browser. Quanto maior, mais tempo para baixar, parsear e executar.

Problema do exemplo:

```js
import { debounce } from 'lodash'
```

Dependendo do pacote/build, esse import pode puxar mais código do que o necessário.

Melhor:

```js
import debounce from 'lodash/debounce'
```

Fala sugerida:

> Aqui o código funciona dos dois jeitos. A diferença é o custo. Se eu preciso só de `debounce`, não quero arriscar mandar o lodash inteiro para o usuário. A skill lembra o Claude de preferir imports mais específicos quando isso reduz bundle.

Conceito importante:
Nem todo import com chaves é ruim. O ponto é evitar caminhos que prejudiquem tree-shaking ou puxem módulos demais.

## Slide 10 - Demo 3: Re-render por prop não-primitiva

Objetivo: explicar referência estável.

O que entender:
Em JavaScript, objetos e arrays criados inline ganham uma nova referência a cada render.

Problema:

```jsx
<Filho config={{ x: 1, y: 2 }} />
```

Mesmo que o conteúdo seja igual, o objeto é novo a cada render. Para componentes memoizados ou árvores maiores, isso pode causar re-renders desnecessários.

Melhor:

```jsx
const CONFIG = { x: 1, y: 2 }
<Filho config={CONFIG} />
```

Fala sugerida:

> Esse é um erro silencioso clássico em React. Visualmente nada quebra. Mas a cada render do pai, esse objeto é recriado. Para o filho, parece uma prop nova. Hoistar o valor, ou memoizar quando faz sentido, evita esse trabalho extra.

Cuidado:
Nem todo objeto inline precisa virar constante. A regra é importante quando o objeto é estável e passa para componentes que podem renderizar muito.

## Slide 11 - Meta-demo

Objetivo: mostrar que a própria apresentação usa algumas recomendações.

O que entender:
Esse slide não diz que o projeto aplica todas as 70 regras. Ele mostra regras específicas que aparecem no código atual.

Regras que aparecem:

- `rerender-no-inline-components`: slides e componentes estão definidos fora de outros componentes.
- `rerender-functional-setstate`: `SlideDeck` usa `setIndex(current => ...)`.
- `rerender-dependencies`: o effect do teclado depende de `go` e `total`.
- `client-event-listeners`: há um listener global de teclado com cleanup.
- `rendering-conditional-render`: estado visual dos slides usa ternário.
- `bundle-analyzable-paths`: o SVG do Claude Code é importado estaticamente.

Fala sugerida:

> Esse slide é uma meta-demo. A apresentação não só fala da skill. Parte do código do próprio deck foi organizada seguindo essas recomendações. Não é para dizer que aplicamos todas as 70 regras, e sim para mostrar exemplos reais no repo.

Se perguntarem onde está:
Os pontos principais estão em `src/components/deck/SlideDeck.jsx`, `src/slides/index.js`, `src/data/presentation.js` e `src/components/deck/ClaudeCodeIcon.jsx`.

## Slide 12 - Obrigado

Objetivo: fechar com uma mensagem simples.

Fala sugerida:

> Obrigado. A ideia que eu queria deixar é: IA ajuda muito, mas contexto e boas instruções mudam a qualidade do resultado. Skills são uma forma prática de transformar boas práticas do time em comportamento padrão do Claude.

Fechamento opcional:

> Se vocês forem testar depois, eu recomendo começar por uma revisão de um componente real usando a skill. É onde os ganhos aparecem mais rápido.

## Perguntas que podem aparecer

### A skill serve só para React ou também para Next.js?

Resposta:
Ela é centrada em React, mas conversa diretamente com Next.js porque vários problemas de React aparecem em apps Next: data fetching, server/client components, bundle, renderização e cache. A apresentação usa React e Next.js como contexto prático.

### Skill é a mesma coisa que linter?

Resposta:
Não. Linter valida regras no código. Skill orienta o Claude antes e durante a geração/revisão. Ela é uma instrução para o agente, não uma ferramenta estática de análise.

### A skill garante que o código será performático?

Resposta:
Não garante. Ela aumenta a chance de o Claude considerar boas práticas. Ainda precisa de revisão, teste, profiling e conhecimento técnico.

### Quando usar `Promise.all`?

Resposta:
Quando as chamadas são independentes. Se uma depende do resultado da outra, a sequência é necessária.

### Todo objeto inline em React é ruim?

Resposta:
Não. Vira problema quando causa re-render desnecessário, principalmente em componentes memoizados, listas grandes ou árvores caras. A regra é evitar recriar valores estáveis sem necessidade.

### Imports diretos sempre são melhores?

Resposta:
Depende do pacote e do bundler. O princípio é manter o caminho analisável e evitar importar mais código do que o necessário.

## Roteiro curto para ensaio

1. Abrir dizendo que o objetivo é melhorar a qualidade do código que o Claude gera.
2. Explicar Claude vs Claude Code.
3. Explicar Skills como instruções especializadas.
4. Mostrar que o problema é performance silenciosa, não sintaxe.
5. Mostrar instalação.
6. Explicar modos de uso.
7. Mostrar categorias por prioridade.
8. Fazer as três demos com calma.
9. Mostrar a meta-demo como prova no próprio repo.
10. Fechar dizendo que Skills transformam boas práticas em contexto reutilizável.

## Frase principal para memorizar

> A skill não escreve código no lugar do Claude; ela melhora o contexto que o Claude usa para escrever.

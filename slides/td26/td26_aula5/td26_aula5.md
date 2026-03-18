---
marp: true
backgroundImage: 'default_bg.png'
math: mathjax
---
<style>
section {
  background-image: url(default_bg.png);
}
h1, h2, h3, strong {
  color: #003E7E;
}
h3, h4, h5 {
  text-align: center;
}
h4, h5 {
  font-weight: normal;
}
h1 {
  font-size: 200%;
}
h2, h3 {
  font-size: 150%;
}
h4 {
  font-size: 100%;
}
h5 {
  font-size: 75%;
}
header, a {
  color: #058ED0;
}
header {
  font-size: 85%;
}
footer {
  color: black;
  font-size: 60%;
}
blockquote {
  background: #f9f9f9;
  font-style: italic;
  font-family: Verdana;
  font-size: 80%;
  line-height: 170%;
  border-left: 10px solid #ccc;
  margin: 1.5em 20px;
  padding: 1.2em 30px;
  quotes: "\201C""\201D""\2018""\2019";
}
blockquote p {
  display: inline;
}
section::after {
  content: attr(data-marpit-pagination) ' / ' attr(data-marpit-pagination-total);
  color: #003E7E;
  font-size: 60%;
}
table {
  margin-left: auto;
  margin-right: auto;
}
th {
  background-color: #003E7E;
  color: white
}
.columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}
.columns3 {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}
span.under {
  text-decoration: underline;
}
</style>

![bg](section_bg.png)

# Aula 5 – Decisão Racional sob Condições de Ignorância II
**Teoria da Decisão – 2026.1**
Lucas Thevenard

---
<!-- 
paginate: true 
header: Decisão Racional sob Condições de Ignorância II
footer: lucas.gomes@fgv.br | 24/03/2026
-->

## Roteiro da aula
- Critérios de racionalidade e decisões coletivas
- Decisão sob ignorância na Teoria da Justiça de Rawls

---

![bg](section_bg.png)

# 1. Critérios de racionalidade e decisões coletivas


---

## O dilema de Kathryn

KATHRYN LAMBI é uma brilhante estudante de pós-graduação em física. Ela também é felizmente casada com Paul Lambi e deseja ter filhos. Kathryn enfrenta uma decisão difícil, pois suas ideias sobre a maternidade são bastante tradicionais; ela acredita que deve cuidar de seus filhos pessoalmente durante os primeiros anos de vida. No entanto, ela não pode fazer isso e, ao mesmo tempo, realizar experimentos longos e delicados. A cada dia, resolver seu dilema se torna mais urgente. Vamos supor, inicialmente, que Kathryn está segura de que não poderia esperar para ser mãe mais tarde. Dessa forma, suas opções seriam entre ter filhos agora e arriscar não conseguir fazer sua carreira, ou abdicar dos filhos para favorecer as possibilidades de sua carreira deslanchar.

---

### O dilema de Kathryn na forma normal

<br>

__              | Carreira dá certo | Carreira não dá certo
----------------|:-----------------:|:---------------------:
Ter filhos      | m & p             | m & -p
Não ter filhos  | -m & p            | -m & -p

<br>

---

## Ordenação de preferências

Se sabemos que tanto ser mãe (m) quanto ter uma profissão (p) são elementos que possuem valor positivo para Kathryn, que conclusões podemos tomar a respeito das preferências de Kathryn em relação aos quatro cenários?

* m & p $\succ$ m & -p
* m & p $\succ$ -m & p
* m & p $\succ$ -m & -p
* -m & -p $\prec$ m & -p
* -m & -p $\prec$ -m & p

---

### O dilema de Kathryn na forma normal

<br>

__              | Carreira dá certo | Carreira não dá certo
----------------|:-----------------:|:---------------------:
Ter filhos      | m & p             | m & -p
Não ter filhos  | -m & p            | -m & -p

<br>

Diante das conclusões que tiramos anteriormente, conseguimos resolver esse problema usando o método Maximin?

---

## Um dilema intertemporal de Kathryn

Vamos agora mudar um pouco o problema, supondo que Kathryn poderia adiar tanto a carreira como a maternidade. Nesse caso, ela deveria ter seus filhos agora e adiar sua carreira? Ou deveria aproveitar agora seu brilhante começo para se estabelecer como física e criar sua família mais tarde? Como Kathryn enxerga sua decisão, os estados relevantes dizem respeito à sua capacidade, daqui a sete anos, de estabelecer uma carreira ou ser uma boa mãe.

---

## Um dilema intertemporal de Kathryn
Assim, podemos representar o problema com 2 caminhos (privilegiar a carreira ou a maternidade), mas cada um deles ainda terá 4 cenários possíveis.
- Em sete anos, se K. L. ela será capaz de ser uma boa mãe e ter uma boa carreira.
- Em sete anos, K. L. não será capaz de ser uma boa mãe, mas será capaz de ter uma boa carreira.
- Em sete anos, K. L. será capaz de ser uma boa mãe, mas não será capaz de ter uma boa carreira.
- Em sete anos, K. L. não será capaz nem de ser uma boa mãe nem de ter uma boa carreira.

---

### Um dilema intertemporal de Kathryn

<br>

__                        | m & p | m & -p | -m & p | -m & -p 
--------------------------|:-----:|:------:|:------:|:-------:
Privilegiar a maternidade | A     | B      | C      | D
Privilegiar a carreira    | E     | F      | G      | H

<br>

E agora? Como podemos ordenar as preferências de Kathryn? Esse problema tem uma solução clara utilizando algum dos métodos estudados até aqui? Que problemas podem existir com a tentativa de utilizar a Teoria da Decisão para resolver um problema desse tipo?

---

## Critérios de racionalidade e ordenação de preferências

- **Completude**: para quaisquer opções $A$ e $B$, ao menos uma das seguintes opções deve valer: $A \succsim B$, ou $A \precsim B$.
- **Reflexividade**: indivíduos são indiferentes a opções idênticas, ou seja, qualquer opção $A$ é tão boa quanto ela mesma, portanto: $A \sim A$. 
- **Transitividade**: as opções devem poder ser ordenadas de forma não circular, obedecendo à regra da transitividade: $A \succsim B \succsim C \implies A \succsim C$.

---

## Decisões coletivas (votação)
- Problema da agregação de preferências
* **Paradoxo de Condorcet**
  - <span class="under">Indivíduo 1</span>: &nbsp;&nbsp;&nbsp; $A \succ B \succ C$
  - <span class="under">Indivíduo 2</span>: &nbsp;&nbsp;&nbsp; $B \succ C \succ A$
  - <span class="under">Indivíduo 3</span>: &nbsp;&nbsp;&nbsp; $C \succ A \succ B$
* <span class="under">Resultado da votação</span>: $A \succ B \succ C \succ A$ (viola a transitividade)
  * **Teorema de Arrow:** processos de votação ordinais não conseguem garantir a preservação de um grupo de propriedades desejáveis.

---

## Condições desejáveis em sistemas de votação (Arrow)

* **Sistema não-ditatorial**: preferências de múltiplos indivíduos devem ser consideradas.
* **Domínio irrestrito (universalidade)**: o sistema deve produzir um único conjunto completo de ordenação de todas as preferências dos indivíduos.
  - Todas as preferências devem ser consideradas,
  - Conjuntos de preferências idênticas devem produzir a mesma ordenação.
* **Independência de alternativas irrelevantes**: a ordenação de pares de alternativas deve depender apenas da ordenação das duas alternativas envolvidas.

---

## Condições desejáveis em sistemas de votação (Arrow)

* **Monotonicidade (associação positiva)**: cada indivíduo não deve ser capaz de prejudicar uma alternativa por avaliá-la melhor.
* **Não-imposição (soberania cidadã)**: todas as formas de ordenação devem ser potencialmente possíveis.
* **Eficiência de pareto (unanimidade)**: se todos preferem uma opção a outra, o resultado social deve refletir essa preferência.

---

## Condições desejáveis em sistemas de votação (Arrow)
- Sistema não-ditatorial
- Domínio irrestrito (universalidade)
- Independência de alternativas irrelevantes
- Monotonicidade (associação positiva)
- Não-imposição (soberania cidadã)
- Eficiência de pareto (unanimidade)

#### **Mas o que isso significa?**

---

![bg](section_bg.png)

# 2. Decisão sob ignorância na Teoria da Justiça de Rawls

---

### Leitura do trecho de Teoria da Justiça

---

## Teoria da Justiça de Rawls
* Posição original e véu da ignorância: Decisão sob condição de ignorância.
* Por que adotar o método Maximin?
  * **Ignorância radical**: Impossibilidade de atribuir probabilidades, de estabelecer valorações cardinais ou mesmo de considerar todos os Estados do Mundo.
  * Indivíduos devem justificar suas opções e preferem garantir um mínimo necessário.
  * Seria irracional assumir riscos intoleráveis.
* **Princípio da diferença**: avaliação das instituições com base em seus efeitos sobre os indivíduos menos favorecidos pela distribuição social.

---

## Harsanyi

* **Refutação do método Maximin**: Decisões morais não deveriam ser tomadas com base nos piores cenários possíveis, mas sim com base na utilidade esperada das alternativas disponíveis.
  - **Exemplo**: decisão entre um emprego ruim em Nova Iorque ou um emprego melhor em Chicago.
* **Implicações imorais do Princípio da Diferença** em certos casos. 
  - **Exemplo**: Doação de órgãos deve privilegiar os mais enfermos?
* Probabilidades subjetivas (bayesianas) X Probabilidades empíricas (frequentismo).

##### HARSANYI, John. Can the Maximin Principle Serve as a Basis for Morality? A Critique of John Rawls's Theory. The American Political Science Review, Vol. 69, No. 2 (Jun., 1975), pp. 594-606.

---

## Outras críticas?
* Decorrências da ignorância radical não são completamente exploradas por Ralws.
* É possível evitar riscos intoleráveis?
  * Dilema das vítimas invisíveis (Jean Tirole).
* É possível avaliar as consequências? Nossas preferências seriam estáticas?
  * Forma de neo-kantianismo? A Teoria da Justiça pode se apartar de um contexto histórico-cultural?
  * Perspectiva do **estruturalismo histórico** (**Foucault**): relações de poder situadas historicamente moldam nossa forma de conceber a realidade, influenciando nossas ideias e preferências.

---

<div class="columns">
<div>

## L.A. Paul
- Professora de filosofia e ciência cognitiva em Yale.
- Escreveu o livro "Transformative Experience" (2014) e o paper "What you can't expect when you're expecting" (2015).

</div>
<div style = "margin: auto;">

![](lapaul_foto.jpeg)

</div>
</div>


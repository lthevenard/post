---
marp: true
backgroundImage: 'default_bg.png'
math: mathjax
html: true
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
  font-size: 140%;
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
section::after {
  content: attr(data-marpit-pagination) ' / ' attr(data-marpit-pagination-total);
  color: #003E7E;
  font-size: 60%;
}
table {
  margin-left: auto;
  margin-right: auto;
  font-size: 90%;
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
span.under {
  text-decoration: underline;
}
td.game, tr.game {
  background-color: white;
  text-align: center;
}
tr.game.action.player1, td.game.action.player1 {
  background-color: #f8f8f8;
  color: #058ED0;
  font-weight: bold;
}
tr.game.action.player2, td.game.action.player2 {
  background-color: #f8f8f8;
  color: #003E7E;
  font-weight: bold;
}
span.payoff.player1 {
  color: #058ED0;
  font-weight: bold;
}
span.payoff.player2 {
  color: #003E7E;
  font-weight: bold;
}
span.fade {
  color: lightgray!important;
}
table.game-table-compact {
  font-size: 78%;
}
table.game-table-compact td {
  padding: 1px 4px;
}
</style>

![bg](section_bg.png)

# Correção da Lista 5
**Teoria da Decisão - 2026.1**
Lucas Thevenard

---
<!-- 
paginate: true 
header: Correção Lista 5 - Teoria da Decisão
footer: lucas.gomes@fgv.br
-->

## Exercício 1 - jogo-base

<table style="line-height: 120%;">

  <tr class="game action player2"> 
    <td></td>
    <td>C</td>
    <td>NC</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 70px;"><br>C<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">3</span>, 
      <span class="payoff player2">3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">1</span>, 
      <span class="payoff player2">4</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 70px;">NC</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">4</span>, 
      <span class="payoff player2">1</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">2</span>, 
      <span class="payoff player2">2</span>
    &nbsp;)</td>
  </tr>
</table>

---

## Exercício 1.A e 1.B - equilíbrio e eficiência

<table style="line-height: 120%;">

  <tr class="game action player2"> 
    <td></td>
    <td>C</td>
    <td><span class="under">NC</span></td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 70px;"><br>C<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">3</span>, 
      <span class="payoff player2">3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">1</span>, 
      <span class="payoff player2 under">4</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 70px;"><span class="under">NC</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">4</span>, 
      <span class="payoff player2">1</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">2</span>, 
      <span class="payoff player2 under">2</span>
    &nbsp;)</td>
  </tr>
</table>

<br>

- **NC** é estratégia estritamente dominante para ambos.
- Equilíbrio de Nash: **{ (NC, NC) }**, com payoff **(2, 2)**.
- O resultado **(C, C)** gera **(3, 3)** e Pareto-domina o equilíbrio.

---

## Exercício 1.C - repetição finita

- Na última rodada, não há futuro a preservar: cada jogador escolhe **NC**.
- Antecipando isso, a penúltima rodada também é resolvida como o jogo de uma rodada.
- Pela mesma lógica, a primeira rodada também termina em **NC**.
- Resultado esperado: **(NC, NC)** nas três rodadas.

---

## Exercício 1.D - repetição infinita

- Cooperar para sempre gera: $3 + 3\delta + 3\delta^2 + ... = \frac{3}{1-\delta}$.
- Desviar hoje contra a estratégia impiedosa gera: $4 + 2\delta + 2\delta^2 + ... = 4 + \frac{2\delta}{1-\delta}$.
- A cooperação é sustentável se:

$$
\frac{3}{1-\delta} \geq 4 + \frac{2\delta}{1-\delta}
$$

#### Portanto: **$\delta \geq 1/2$**

---

## Exercício 2 - Jogo A

<table class="game-table-compact" style="line-height: 108%;">

  <tr class="game action player2"> 
    <td></td>
    <td>C</td>
    <td>D</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 68px;"><br>A<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-9</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-3</span>, 
      <span class="payoff player2">4</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 68px;"><br>B<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2">3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-6</span>, 
      <span class="payoff player2">1</span>
    &nbsp;)</td>
  </tr>
</table>

---

## Exercício 2 - Jogo A

<table class="game-table-compact" style="line-height: 108%;">

  <tr class="game action player2"> 
    <td></td>
    <td><span class="under">C</span></td>
    <td><span class="under">D</span></td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 68px;"><br><span class="under">A</span><br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-9</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">-3</span>, 
      <span class="payoff player2 under">4</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 68px;"><br><span class="under">B</span><br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">0</span>, 
      <span class="payoff player2 under">3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-6</span>, 
      <span class="payoff player2">1</span>
    &nbsp;)</td>
  </tr>
</table>

<br>

- Equilíbrio(s) de Nash: **{ (A, D) e (B, C) }**
- Classificação: **Jogo da Batalha dos Sexos**
- Critério: há dois equilíbrios melhores que os desencontros, mas cada jogador prefere um equilíbrio diferente.

---

## Exercício 2 - Jogo B

<table class="game-table-compact" style="line-height: 108%;">

  <tr class="game action player2"> 
    <td></td>
    <td>C</td>
    <td>D</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 68px;"><br>A<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2">36</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">12</span>, 
      <span class="payoff player2">24</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 68px;"><br>B<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">4</span>, 
      <span class="payoff player2">12</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">20</span>, 
      <span class="payoff player2">6</span>
    &nbsp;)</td>
  </tr>
</table>

---

## Exercício 2 - Jogo B

<table class="game-table-compact" style="line-height: 108%;">

  <tr class="game action player2"> 
    <td></td>
    <td><span class="under">C</span></td>
    <td>D</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 68px;"><br>A<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2">36</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">12</span>, 
      <span class="payoff player2">24</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 68px;"><br><span class="under">B</span><br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">4</span>, 
      <span class="payoff player2 under">12</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">20</span>, 
      <span class="payoff player2">6</span>
    &nbsp;)</td>
  </tr>
</table>

<br>

- Equilíbrio(s) de Nash: **{ (B, C) }**
- Classificação: **Dilema dos Prisioneiros**
- Critério: cada jogador tem estratégia estritamente dominante, e o equilíbrio único é Pareto-dominado por outro resultado.

---

## Exercício 2 - Jogo C

<table class="game-table-compact" style="line-height: 108%;">

  <tr class="game action player2"> 
    <td></td>
    <td>C</td>
    <td>D</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 68px;"><br>A<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">14</span>, 
      <span class="payoff player2">-3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">10</span>, 
      <span class="payoff player2">-4</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 68px;"><br>B<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">13</span>, 
      <span class="payoff player2">-1</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">11</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
  </tr>
</table>

---

## Exercício 2 - Jogo C

<table class="game-table-compact" style="line-height: 108%;">

  <tr class="game action player2"> 
    <td></td>
    <td><span class="under">C</span></td>
    <td><span class="under">D</span></td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 68px;"><br><span class="under">A</span><br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">14</span>, 
      <span class="payoff player2 under">-3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">10</span>, 
      <span class="payoff player2">-4</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 68px;"><br><span class="under">B</span><br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">13</span>, 
      <span class="payoff player2">-1</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">11</span>, 
      <span class="payoff player2 under">0</span>
    &nbsp;)</td>
  </tr>
</table>

<br>

- Equilíbrio(s) de Nash: **{ (A, C) e (B, D) }**
- Classificação: **Jogo da Galinha**
- Critério: há dois equilíbrios assimétricos; a agressividade simultânea gera o pior resultado para ambos.

---

## Exercício 2 - Jogo D

<table class="game-table-compact" style="line-height: 108%;">

  <tr class="game action player2"> 
    <td></td>
    <td>C</td>
    <td>D</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 68px;"><br>A<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">9</span>, 
      <span class="payoff player2">1</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">4</span>, 
      <span class="payoff player2">-5</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 68px;"><br>B<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">4</span>, 
      <span class="payoff player2">-5</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">9</span>, 
      <span class="payoff player2">1</span>
    &nbsp;)</td>
  </tr>
</table>

---

## Exercício 2 - Jogo D

<table class="game-table-compact" style="line-height: 108%;">

  <tr class="game action player2"> 
    <td></td>
    <td><span class="under">C</span></td>
    <td><span class="under">D</span></td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 68px;"><br><span class="under">A</span><br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">9</span>, 
      <span class="payoff player2 under">1</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">4</span>, 
      <span class="payoff player2">-5</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 68px;"><br><span class="under">B</span><br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">4</span>, 
      <span class="payoff player2">-5</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">9</span>, 
      <span class="payoff player2 under">1</span>
    &nbsp;)</td>
  </tr>
</table>

<br>

- Equilíbrio(s) de Nash: **{ (A, C) e (B, D) }**
- Classificação: **Jogo de Coordenação Pura**
- Critério: há dois equilíbrios; ambos são melhores que os desencontros e geram os mesmos payoffs nos equilíbrios.

---

## Exercício 2 - Jogo E

<table class="game-table-compact" style="line-height: 108%;">

  <tr class="game action player2"> 
    <td></td>
    <td>C</td>
    <td>D</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 68px;"><br>A<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2">21</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-10</span>, 
      <span class="payoff player2">-3</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 68px;"><br>B<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-5</span>, 
      <span class="payoff player2">3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">5</span>, 
      <span class="payoff player2">15</span>
    &nbsp;)</td>
  </tr>
</table>

---

## Exercício 2 - Jogo E

<table class="game-table-compact" style="line-height: 108%;">

  <tr class="game action player2"> 
    <td></td>
    <td><span class="under">C</span></td>
    <td><span class="under">D</span></td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 68px;"><br><span class="under">A</span><br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">0</span>, 
      <span class="payoff player2 under">21</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-10</span>, 
      <span class="payoff player2">-3</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 68px;"><br><span class="under">B</span><br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-5</span>, 
      <span class="payoff player2">3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">5</span>, 
      <span class="payoff player2 under">15</span>
    &nbsp;)</td>
  </tr>
</table>

<br>

- Equilíbrio(s) de Nash: **{ (A, C) e (B, D) }**
- Classificação: **Jogo da Batalha dos Sexos**
- Critério: há dois equilíbrios melhores que os desencontros, mas cada jogador prefere um equilíbrio diferente.

---

## Exercício 2 - Jogo F

<table class="game-table-compact" style="line-height: 108%;">

  <tr class="game action player2"> 
    <td></td>
    <td>C</td>
    <td>D</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 68px;"><br>A<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">8</span>, 
      <span class="payoff player2">10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2">12</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 68px;"><br>B<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">12</span>, 
      <span class="payoff player2">6</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-4</span>, 
      <span class="payoff player2">4</span>
    &nbsp;)</td>
  </tr>
</table>

---

## Exercício 2 - Jogo F

<table class="game-table-compact" style="line-height: 108%;">

  <tr class="game action player2"> 
    <td></td>
    <td><span class="under">C</span></td>
    <td><span class="under">D</span></td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 68px;"><br><span class="under">A</span><br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">8</span>, 
      <span class="payoff player2">10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">0</span>, 
      <span class="payoff player2 under">12</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 68px;"><br><span class="under">B</span><br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">12</span>, 
      <span class="payoff player2 under">6</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-4</span>, 
      <span class="payoff player2">4</span>
    &nbsp;)</td>
  </tr>
</table>

<br>

- Equilíbrio(s) de Nash: **{ (A, D) e (B, C) }**
- Classificação: **Jogo da Galinha**
- Critério: há dois equilíbrios assimétricos; a agressividade simultânea gera o pior resultado para ambos.

---

## Exercício 2 - Jogo G

<table class="game-table-compact" style="line-height: 108%;">

  <tr class="game action player2"> 
    <td></td>
    <td>C</td>
    <td>D</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 68px;"><br>A<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">23</span>, 
      <span class="payoff player2">-5</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">23</span>, 
      <span class="payoff player2">1</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 68px;"><br>B<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">27</span>, 
      <span class="payoff player2">3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">11</span>, 
      <span class="payoff player2">1</span>
    &nbsp;)</td>
  </tr>
</table>

---

## Exercício 2 - Jogo G

<table class="game-table-compact" style="line-height: 108%;">

  <tr class="game action player2"> 
    <td></td>
    <td><span class="under">C</span></td>
    <td><span class="under">D</span></td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 68px;"><br><span class="under">A</span><br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">23</span>, 
      <span class="payoff player2">-5</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">23</span>, 
      <span class="payoff player2 under">1</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 68px;"><br><span class="under">B</span><br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">27</span>, 
      <span class="payoff player2 under">3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">11</span>, 
      <span class="payoff player2">1</span>
    &nbsp;)</td>
  </tr>
</table>

<br>

- Equilíbrio(s) de Nash: **{ (A, D) e (B, C) }**
- Classificação: **Jogo da Caça ao Veado**
- Critério: há dois equilíbrios; um é Pareto-superior, enquanto o outro é o resultado seguro.

---

## Exercício 2 - Jogo H

<table class="game-table-compact" style="line-height: 108%;">

  <tr class="game action player2"> 
    <td></td>
    <td>C</td>
    <td>D</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 68px;"><br>A<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">17</span>, 
      <span class="payoff player2">-6</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">9</span>, 
      <span class="payoff player2">21</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 68px;"><br>B<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">13</span>, 
      <span class="payoff player2">36</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">19</span>, 
      <span class="payoff player2">3</span>
    &nbsp;)</td>
  </tr>
</table>

---

## Exercício 2 - Jogo H

<table class="game-table-compact" style="line-height: 108%;">

  <tr class="game action player2"> 
    <td></td>
    <td>C</td>
    <td>D</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 68px;"><br>A<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">17</span>, 
      <span class="payoff player2">-6</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">9</span>, 
      <span class="payoff player2">21</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 68px;"><br>B<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">13</span>, 
      <span class="payoff player2">36</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">19</span>, 
      <span class="payoff player2">3</span>
    &nbsp;)</td>
  </tr>
</table>

<br>

- Equilíbrio(s) de Nash: **{ nenhum }**
- Classificação: **Nenhum dos jogos clássicos**
- Critério: o jogo não satisfaz as condições necessárias de nenhuma das classificações clássicas estudadas.


---

## Exercício 3.A - matriz do jogo

<table style="line-height: 120%;">

  <tr class="game action player2"> 
    <td></td>
    <td>Consórcio</td>
    <td>Individual</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 130px;">Consórcio</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">8</span>, 
      <span class="payoff player2">8</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2">4</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 130px;">Individual</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">4</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">4</span>, 
      <span class="payoff player2">4</span>
    &nbsp;)</td>
  </tr>
</table>

---



<table style="line-height: 120%;">

  <tr class="game action player2"> 
    <td></td>
    <td><span class="under">Consórcio</span></td>
    <td><span class="under">Individual</span></td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 130px;"><span class="under">Consórcio</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">8</span>, 
      <span class="payoff player2 under">8</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2">4</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 130px;"><span class="under">Individual</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1">4</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">4</span>, 
      <span class="payoff player2 under">4</span>
    &nbsp;)</td>
  </tr>
</table>

<br>

- Equilíbrios de Nash: **{ (Consórcio, Consórcio), (Individual, Individual) }**.
- **(Consórcio, Consórcio)** Pareto-domina **(Individual, Individual)**.
- **Individual** é a estratégia segura: garante payoff 4 independentemente da escolha do outro jogador.
- **Consórcio** pode gerar payoff 8, mas também pode gerar payoff 0 se o outro município permanecer individual.
- Classificação: **Jogo da Caça ao Veado**.

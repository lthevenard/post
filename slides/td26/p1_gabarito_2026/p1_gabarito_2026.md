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
  font-size: 82%;
}
th {
  background-color: #003E7E;
  color: white;
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
.small {
  font-size: 88%;
}
.tight {
  line-height: 1.25;
}
.center {
  text-align: center;
}
.callout {
  color: #003E7E;
  font-weight: bold;
}
span.under {
  text-decoration: underline;
}
span.fade {
  color: lightgray!important;
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
td.eliminated {
  color: lightgray!important;
  text-decoration: line-through!important;
}
td.eliminated > span {
  color: lightgray!important;
  text-decoration: line-through!important;
}
.game-board {
  display: grid;
  grid-template-columns: 150px auto;
  align-items: center;
  gap: 0.5rem;
}
.game-player1 {
  text-align: right;
  margin-top: 70px;
}
.game-player2 {
  text-align: center;
  margin-bottom: 0.5rem;
}
table.q2-game {
  line-height: 125%;
  font-size: 84%;
}
table.q2-game td {
  padding: 7px 11px;
}
.game-note {
  margin-top: 0.8rem;
  font-size: 86%;
}
.vf {
  display: inline-block;
  min-width: 1.65rem;
  padding: 0.12rem 0.35rem;
  border-radius: 4px;
  text-align: center;
  color: white;
  font-weight: bold;
}
.vf.false {
  background: #C94242;
}
.vf.true {
  background: #058ED0;
}
.original-item {
  border-left: 8px solid #003E7E;
  background: #f8f8f8;
  padding: 0.55rem 0.9rem;
  font-size: 78%;
  line-height: 1.28;
}
.err {
  color: #C94242;
  font-weight: bold;
}
.arrow-conditions {
  font-size: 84%;
  line-height: 1.25;
}
.note-small {
  margin-top: 0.55rem;
  font-size: 82%;
  line-height: 1.25;
}
</style>

![bg](section_bg.png)

# Correção da P1
**Teoria da Decisão - 2026.1**
Lucas Thevenard

---
<!--
paginate: true
header: Gabarito P1 - Teoria da Decisão
footer: lucas.gomes@fgv.br
-->

![bg](section_bg.png)

# Questão 1
_Decisão sob risco e decisão sob ignorância_

---

## Questão 1 - Dados do problema

| Alternativa/Payoff | Controle baixo | Controle médio | Controle alto |
|:--|:--:|:--:|:--:|
| Instrução mínima | 140 | 90 | 40 |
| Instrução intermediária | 70 | 100 | 90 |
| Instrução reforçada | 10 | 100 | 160 |

<br>

- Probabilidades usadas nos itens A e B:
  - Controle baixo: **30%**.
  - Controle médio: **40%**.
  - Controle alto: **30%**.

---

## 1.A - Árvore de decisão

![bg](nofooter_bg.png)
<!--
_paginate: false
_header: ''
_footer: ''
-->

<div style="margin: auto; text-align: center;">

![w:650](q1_arvore.png)

</div>

---

## 1.A - Cálculo dos nós de estados do mundo

$$
\begin{aligned}
x_M &= 0.3 \cdot 140 + 0.4 \cdot 90 + 0.3 \cdot 40 \\
&= 42 + 36 + 12 = 90
\end{aligned}
$$

$$
\begin{aligned}
x_I &= 0.3 \cdot 70 + 0.4 \cdot 100 + 0.3 \cdot 90 \\
&= 21 + 40 + 27 = 88
\end{aligned}
$$

$$
\begin{aligned}
x_R &= 0.3 \cdot 10 + 0.4 \cdot 100 + 0.3 \cdot 160 \\
&= 3 + 40 + 48 = 91
\end{aligned}
$$

---

## 1.A - Decisão neutra ao risco

$$
\begin{aligned}
r &= \max(x_M, x_I, x_R) \\
&= \max(90, 88, 91) \\
&= 91
\end{aligned}
$$

<br>

- Um decisor **neutro ao risco** maximiza o valor esperado.
- Escolha ótima: **instrução reforçada**.
- Valor esperado no nó raiz: **91 milhões de reais**.

---

## 1.B - Avesso e propenso ao risco

<div class="columns">
<div style="text-align: center;">

**Extremamente avesso ao risco**

| Alternativa | Pior caso |
|:--|:--:|
| Mínima | 40 |
| Intermediária | 70 |
| Reforçada | 10 |

<br>

**Escolha:** instrução **intermediária**.

</div>
<div style="text-align: center;">

**Extremamente propenso ao risco**

| Alternativa | Melhor caso |
|:--|:--:|
| Mínima | 140 |
| Intermediária | 100 |
| Reforçada | 160 |

<br>

**Escolha:** instrução **reforçada**.

</div>
</div>

---

## 1.C - Decisão sob Ignorância (Forma normal)

<br>

| Alternativa | Controle baixo | Controle médio | Controle alto |
|:--|:--:|:--:|:--:|
| Instrução mínima | 140 | 90 | 40 |
| Instrução intermediária | 70 | 100 | 90 |
| Instrução reforçada | 10 | 100 | 160 |

<br>

- Agora não usamos as probabilidades de 30%, 40% e 30%.
- A decisão deve ser tomada apenas com a matriz de payoffs.

---

## 1.C - Maximin

**Piores resultados por alternativa:**

| Alternativa | Pior resultado |
|:--|:--:|
| Instrução mínima | 40 |
| Instrução intermediária | 70 |
| Instrução reforçada | 10 |

<br>

$$
\max(40, 70, 10) = 70
$$

- Escolha pelo método **Maximin**: **instrução intermediária**.

---

## 1.C - Minimax

**Tabela de arrependimento:**

| Alternativa | Baixo | Médio | Alto | Arrependimento máximo |
|:--|:--:|:--:|:--:|:--:|
| Instrução mínima | 0 | 10 | 120 | 120 |
| Instrução intermediária | 70 | 0 | 70 | 70 |
| Instrução reforçada | 130 | 0 | 0 | 130 |

<br>

$$
\min(120, 70, 130) = 70
$$

- Escolha pelo método **Minimax**: **instrução intermediária**.

---

## 1.C - Postulado da Razão Insuficiente

$$
\begin{aligned}
M_M &= \frac{140 + 90 + 40}{3} = 90 \\
M_I &= \frac{70 + 100 + 90}{3} = \frac{260}{3} \approx 86{,}67 \\
M_R &= \frac{10 + 100 + 160}{3} = 90
\end{aligned}
$$

<br>

- Assumindo estados equiprováveis, há **empate**.
- Escolha pelo **Postulado da Razão Insuficiente**:
  **instrução mínima** ou **instrução reforçada**.

---

## 1.D - Regra Otimismo-Pessimismo

Pela Regra de Hurwicz:

$$
V_i(\alpha) = (1-\alpha)\min(i) + \alpha\max(i)
$$

<div class="columns">
<div>

$$
\begin{aligned}
V_M(\alpha) &= 40 + 100\alpha \\
V_I(\alpha) &= 70 + 30\alpha \\
V_R(\alpha) &= 10 + 150\alpha
\end{aligned}
$$

</div>
<div>

Para a instrução mínima ser escolhida:

$$
\begin{aligned}
40 + 100\alpha &\geq 70 + 30\alpha \\
\alpha &\geq \frac{3}{7}
\end{aligned}
$$

$$
\begin{aligned}
40 + 100\alpha &\geq 10 + 150\alpha \\
\alpha &\leq \frac{3}{5}
\end{aligned}
$$

</div>
</div>

---

## 1.D - Intervalo de otimismo

$$
\boxed{\frac{3}{7} \leq \alpha \leq \frac{3}{5}}
$$

<br>

- Em valores decimais: **0,4286 ≤ α ≤ 0,6**.
- No limite inferior, há empate entre **mínima** e **intermediária**.
- No limite superior, há empate entre **mínima** e **reforçada**.

---

![bg](section_bg.png)

# Questão 2
_Jogo Simultâneo_

---

## 2.A - Matriz do jogo (Tribunal = Jogador 1)

<div class="game-board">
<div class="game-player1"><b style="color: #058ED0;">Tribunal de Contas</b></div>
<div>
<div class="game-player2"><b style="color: #003E7E;">Município</b></div>

<table class="q2-game">
  <tr class="game action player2">
    <td></td>
    <td>Instrução<br>mínima</td>
    <td>Instrução<br>intermediária</td>
    <td>Instrução<br>reforçada</td>
  </tr>
  <tr>
    <td class="game action player1">Monitoramento<br>leve</td>
    <td class="game">(&nbsp;<span class="payoff player1">20</span>, <span class="payoff player2">140</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1">60</span>, <span class="payoff player2">70</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1">130</span>, <span class="payoff player2">10</span>&nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Monitoramento<br>moderado</td>
    <td class="game">(&nbsp;<span class="payoff player1">80</span>, <span class="payoff player2">90</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1">120</span>, <span class="payoff player2">100</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1">90</span>, <span class="payoff player2">100</span>&nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Monitoramento<br>intensivo</td>
    <td class="game">(&nbsp;<span class="payoff player1">140</span>, <span class="payoff player2">40</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1">90</span>, <span class="payoff player2">90</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1">30</span>, <span class="payoff player2">160</span>&nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

## 2.A - Matriz do jogo (Município = Jogador 1)

<div class="game-board">
<div class="game-player1"><b style="color: #058ED0;">Município</b></div>
<div>
<div class="game-player2"><b style="color: #003E7E;">Tribunal de Contas</b></div>

<table class="q2-game">
  <tr class="game action player2">
    <td></td>
    <td>Leve</td>
    <td>Moderado</td>
    <td>Intensivo</td>
  </tr>
  <tr>
    <td class="game action player1">Instrução<br>mínima</td>
    <td class="game">(&nbsp;<span class="payoff player1">140</span>, <span class="payoff player2">20</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1">90</span>, <span class="payoff player2">80</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1">40</span>, <span class="payoff player2">140</span>&nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Instrução<br>intermediária</td>
    <td class="game">(&nbsp;<span class="payoff player1">70</span>, <span class="payoff player2">60</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1">100</span>, <span class="payoff player2">120</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1">90</span>, <span class="payoff player2">90</span>&nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Instrução<br>reforçada</td>
    <td class="game">(&nbsp;<span class="payoff player1">10</span>, <span class="payoff player2">130</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1">100</span>, <span class="payoff player2">90</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1">160</span>, <span class="payoff player2">30</span>&nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

## 2.A - Melhores respostas do Município

<div class="game-board">
<div class="game-player1"><b style="color: #058ED0;">Município</b></div>
<div>
<div class="game-player2"><b style="color: #003E7E;">Tribunal de Contas</b></div>

<table class="q2-game">
  <tr class="game action player2">
    <td></td>
    <td><span class="under">Leve</span></td>
    <td>Moderado</td>
    <td>Intensivo</td>
  </tr>
  <tr>
    <td class="game action player1">Instrução<br>mínima</td>
    <td class="game">(&nbsp;<span class="payoff player1 under">140</span>, <span class="payoff player2 fade">20</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">90</span>, <span class="payoff player2 fade">80</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">40</span>, <span class="payoff player2 fade">140</span>&nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Instrução<br>intermediária</td>
    <td class="game">(&nbsp;<span class="payoff player1">70</span>, <span class="payoff player2 fade">60</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">100</span>, <span class="payoff player2 fade">120</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">90</span>, <span class="payoff player2 fade">90</span>&nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Instrução<br>reforçada</td>
    <td class="game">(&nbsp;<span class="payoff player1">10</span>, <span class="payoff player2 fade">130</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">100</span>, <span class="payoff player2 fade">90</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">160</span>, <span class="payoff player2 fade">30</span>&nbsp;)</td>
  </tr>
</table>
</div>
</div>

<div class="game-note">
Se o monitoramento é <b>leve</b>, o Município prefere <b>instrução mínima</b>.
</div>

---

## 2.A - Melhores respostas do Município

<div class="game-board">
<div class="game-player1"><b style="color: #058ED0;">Município</b></div>
<div>
<div class="game-player2"><b style="color: #003E7E;">Tribunal de Contas</b></div>

<table class="q2-game">
  <tr class="game action player2">
    <td></td>
    <td>Leve</td>
    <td><span class="under">Moderado</span></td>
    <td>Intensivo</td>
  </tr>
  <tr>
    <td class="game action player1">Instrução<br>mínima</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">140</span>, <span class="payoff player2 fade">20</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1">90</span>, <span class="payoff player2 fade">80</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">40</span>, <span class="payoff player2 fade">140</span>&nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Instrução<br>intermediária</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">70</span>, <span class="payoff player2 fade">60</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 under">100</span>, <span class="payoff player2 fade">120</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">90</span>, <span class="payoff player2 fade">90</span>&nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Instrução<br>reforçada</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">10</span>, <span class="payoff player2 fade">130</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 under">100</span>, <span class="payoff player2 fade">90</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">160</span>, <span class="payoff player2 fade">30</span>&nbsp;)</td>
  </tr>
</table>
</div>
</div>

<div class="game-note">
Se o monitoramento é <b>moderado</b>, o Município é indiferente entre <b>intermediária</b> e <b>reforçada</b>.
</div>

---

## 2.A - Melhores respostas do Município

<div class="game-board">
<div class="game-player1"><b style="color: #058ED0;">Município</b></div>
<div>
<div class="game-player2"><b style="color: #003E7E;">Tribunal de Contas</b></div>

<table class="q2-game">
  <tr class="game action player2">
    <td></td>
    <td>Leve</td>
    <td>Moderado</td>
    <td><span class="under">Intensivo</span></td>
  </tr>
  <tr>
    <td class="game action player1">Instrução<br>mínima</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">140</span>, <span class="payoff player2 fade">20</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">90</span>, <span class="payoff player2 fade">80</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1">40</span>, <span class="payoff player2 fade">140</span>&nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Instrução<br>intermediária</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">70</span>, <span class="payoff player2 fade">60</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">100</span>, <span class="payoff player2 fade">120</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1">90</span>, <span class="payoff player2 fade">90</span>&nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Instrução<br>reforçada</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">10</span>, <span class="payoff player2 fade">130</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">100</span>, <span class="payoff player2 fade">90</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 under">160</span>, <span class="payoff player2 fade">30</span>&nbsp;)</td>
  </tr>
</table>
</div>
</div>

<div class="game-note">
Se o monitoramento é <b>intensivo</b>, o Município prefere <b>instrução reforçada</b>.
</div>

---

## 2.A - Melhores respostas do Município

<div class="game-board">
<div class="game-player1"><b style="color: #058ED0;">Município</b></div>
<div>
<div class="game-player2"><b style="color: #003E7E;">Tribunal de Contas</b></div>

<table class="q2-game">
  <tr class="game action player2">
    <td></td>
    <td>Leve</td>
    <td>Moderado</td>
    <td>Intensivo</td>
  </tr>
  <tr>
    <td class="game action player1">Instrução<br>mínima</td>
    <td class="game">(&nbsp;<span class="payoff player1 under">140</span>, <span class="payoff player2 fade">20</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1">90</span>, <span class="payoff player2 fade">80</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1">40</span>, <span class="payoff player2 fade">140</span>&nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Instrução<br>intermediária</td>
    <td class="game">(&nbsp;<span class="payoff player1">70</span>, <span class="payoff player2 fade">60</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 under">100</span>, <span class="payoff player2 fade">120</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1">90</span>, <span class="payoff player2 fade">90</span>&nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Instrução<br>reforçada</td>
    <td class="game">(&nbsp;<span class="payoff player1">10</span>, <span class="payoff player2 fade">130</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 under">100</span>, <span class="payoff player2 fade">90</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 under">160</span>, <span class="payoff player2 fade">30</span>&nbsp;)</td>
  </tr>
</table>
</div>
</div>

<div class="game-note">
<b>Melhores respostas:</b> Leve: mínima; Moderado: intermediária ou reforçada; Intensivo: reforçada.
</div>

---

## 2.A - Melhores respostas do Tribunal

<div class="game-board">
<div class="game-player1"><b style="color: #058ED0;">Município</b></div>
<div>
<div class="game-player2"><b style="color: #003E7E;">Tribunal de Contas</b></div>

<table class="q2-game">
  <tr class="game action player2">
    <td></td>
    <td>Leve</td>
    <td>Moderado</td>
    <td>Intensivo</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="under">Instrução<br>mínima</span></td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">140</span>, <span class="payoff player2">20</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">90</span>, <span class="payoff player2">80</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">40</span>, <span class="payoff player2 under">140</span>&nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Instrução<br>intermediária</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">70</span>, <span class="payoff player2 fade">60</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">100</span>, <span class="payoff player2 fade">120</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">90</span>, <span class="payoff player2 fade">90</span>&nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Instrução<br>reforçada</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">10</span>, <span class="payoff player2 fade">130</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">100</span>, <span class="payoff player2 fade">90</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">160</span>, <span class="payoff player2 fade">30</span>&nbsp;)</td>
  </tr>
</table>
</div>
</div>

<div class="game-note">
Se o Município escolhe <b>instrução mínima</b>, o Tribunal prefere <b>monitoramento intensivo</b>.
</div>

---

## 2.A - Melhores respostas do Tribunal

<div class="game-board">
<div class="game-player1"><b style="color: #058ED0;">Município</b></div>
<div>
<div class="game-player2"><b style="color: #003E7E;">Tribunal de Contas</b></div>

<table class="q2-game">
  <tr class="game action player2">
    <td></td>
    <td>Leve</td>
    <td>Moderado</td>
    <td>Intensivo</td>
  </tr>
  <tr>
    <td class="game action player1">Instrução<br>mínima</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">140</span>, <span class="payoff player2 fade">20</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">90</span>, <span class="payoff player2 fade">80</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">40</span>, <span class="payoff player2 fade">140</span>&nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="under">Instrução<br>intermediária</span></td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">70</span>, <span class="payoff player2">60</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">100</span>, <span class="payoff player2 under">120</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">90</span>, <span class="payoff player2">90</span>&nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Instrução<br>reforçada</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">10</span>, <span class="payoff player2 fade">130</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">100</span>, <span class="payoff player2 fade">90</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">160</span>, <span class="payoff player2 fade">30</span>&nbsp;)</td>
  </tr>
</table>
</div>
</div>

<div class="game-note">
Se o Município escolhe <b>instrução intermediária</b>, o Tribunal prefere <b>monitoramento moderado</b>.
</div>

---

## 2.A - Melhores respostas do Tribunal

<div class="game-board">
<div class="game-player1"><b style="color: #058ED0;">Município</b></div>
<div>
<div class="game-player2"><b style="color: #003E7E;">Tribunal de Contas</b></div>

<table class="q2-game">
  <tr class="game action player2">
    <td></td>
    <td>Leve</td>
    <td>Moderado</td>
    <td>Intensivo</td>
  </tr>
  <tr>
    <td class="game action player1">Instrução<br>mínima</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">140</span>, <span class="payoff player2 fade">20</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">90</span>, <span class="payoff player2 fade">80</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">40</span>, <span class="payoff player2 fade">140</span>&nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Instrução<br>intermediária</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">70</span>, <span class="payoff player2 fade">60</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">100</span>, <span class="payoff player2 fade">120</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">90</span>, <span class="payoff player2 fade">90</span>&nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="under">Instrução<br>reforçada</span></td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">10</span>, <span class="payoff player2 under">130</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">100</span>, <span class="payoff player2">90</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 fade">160</span>, <span class="payoff player2">30</span>&nbsp;)</td>
  </tr>
</table>
</div>
</div>

<div class="game-note">
Se o Município escolhe <b>instrução reforçada</b>, o Tribunal prefere <b>monitoramento leve</b>.
</div>

---

## 2.A - Equilíbrio de Nash

<div class="game-board">
<div class="game-player1"><b style="color: #058ED0;">Município</b></div>
<div>
<div class="game-player2"><b style="color: #003E7E;">Tribunal de Contas</b></div>

<table class="q2-game">
  <tr class="game action player2">
    <td></td>
    <td>Leve</td>
    <td>Moderado</td>
    <td>Intensivo</td>
  </tr>
  <tr>
    <td class="game action player1">Instrução<br>mínima</td>
    <td class="game">(&nbsp;<span class="payoff player1 under">140</span>, <span class="payoff player2">20</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1">90</span>, <span class="payoff player2">80</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1">40</span>, <span class="payoff player2 under">140</span>&nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="under">Instrução<br>intermediária</span></td>
    <td class="game">(&nbsp;<span class="payoff player1">70</span>, <span class="payoff player2">60</span>&nbsp;)</td>
    <td class="game" style="box-shadow: inset 0 0 0 3px #003E7E;">(&nbsp;<span class="payoff player1 under">100</span>, <span class="payoff player2 under">120</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1">90</span>, <span class="payoff player2">90</span>&nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Instrução<br>reforçada</td>
    <td class="game">(&nbsp;<span class="payoff player1">10</span>, <span class="payoff player2 under">130</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 under">100</span>, <span class="payoff player2">90</span>&nbsp;)</td>
    <td class="game">(&nbsp;<span class="payoff player1 under">160</span>, <span class="payoff player2">30</span>&nbsp;)</td>
  </tr>
</table>
</div>
</div>

<div class="game-note">
Única célula em que os dois jogadores estão dando melhor resposta: <b>(instrução intermediária, monitoramento moderado)</b>.
</div>

---

## 2.A - Resultado

- Equilíbrio de Nash em estratégias puras:

<div style="border: 2px solid #003E7E; padding: 0.5rem 1rem; width: fit-content; margin: 1rem auto; font-size: 110%;">
<b>(instrução intermediária, monitoramento moderado)</b>
</div>

<br>

- Dado monitoramento moderado, o Município não melhora trocando de estratégia:
  **intermediária = reforçada = 100 > mínima = 90**.
- Dada instrução intermediária, o Tribunal não melhora trocando de estratégia:
  **moderado = 120 > intensivo = 90 > leve = 60**.

---

## 2.B - Dominância: Município

| Estratégia do Município | Melhor resposta |
|:--|:--:|
| Instrução mínima | Mon. leve |
| Instrução intermediária | Mon. Moderado |
| Instrução reforçada | Mon. Moderado e Intensivo |

<br>

- Não há estratégia dominante para o Município, e também não há estratégia estritamente dominada por outra estratégia pura.
- **Há uma estratégia fracamente dominada: a Instrução Intermediária**, pois sempre há outra estratégia pelo menos tão boa ou melhor que ela.
  - Ninguém acertou, aceitei quem disse que não havia estratégias dominadas.

---

## 2.B - Dominância: Tribunal

| Estratégia do Tribunal | Melhor Resposta |
|:--|:--:|
| Monitoramento leve | Inst. Reforçada |
| Monitoramento moderado | Inst. Intermediária |
| Monitoramento intensivo | Inst. Mínima |

<br>

- Não há estratégia dominante para o Tribunal.
- Também não há estratégia dominada, nem por dominância estrita ou forte, nem por dominância fraca.

---

![bg](section_bg.png)

# Questão 3
_Análise conceitual: verdadeiro ou falso_

---

## 3.A - Argumentos consequencialistas

<span class="vf false">F</span> **Falsa.**

<div class="original-item">
<b>A)</b> Argumentos consequencialistas se distinguem dos raciocínios jurídicos usuais porque os primeiros se apoiam em consequências factuais, e não em fontes autoritativas do passado; contudo, para que esse tipo de argumento seja coerentemente empregado, <span class="err">é necessário adotar a ética utilitarista ou uma teoria normativamente orientada à avaliação de consequências, como a Análise Econômica do Direito.</span>
</div>

<br>

<div class="small tight">

- A primeira parte está correta: argumentos consequencialistas olham para efeitos práticos da decisão. O erro está em exigir adesão ao utilitarismo ou à AED.
- Como vimos, a avaliação de consequências pode funcionar apenas como <b>ônus argumentativo jurídico</b>, sem necessariamente implicar vinculação a uma teoria moral ou a uma vertente metodológica específica.

</div>

---

## 3.B - Reforma da LINDB

<span class="vf false">F</span> **Falsa.**

<div class="original-item">
<b>B)</b> Para Alexandre Aragão, a reforma da LINDB deve ser concebida como uma ruptura com a visão do Direito como ciência pura e com a concepção declaratória da interpretação, o que tem o condão de ampliar a discricionariedade judicial, <span class="err">sem produzir ônus argumentativos adicionais para os magistrados.</span>
</div>

<br>

<div class="small tight">

- A primeira parte está alinhada à ideia de ruptura com uma visão puramente declaratória.
- Não há erro em afirmar que isso amplia a discricionariedade judicial (esse é um elemento explícito na fala do prof. Aragão).
- <b>O erro está em negar o aumento do ônus argumentativo para os magistrados</b>. Em sua palestra Aragão destacou a preocupação dos juízes com esse ônus, com a necessidade de analisar alternativas de decisão e seus efeitos práticos.

</div>

---

## 3.C - Teorema de Arrow

<span class="vf false">F</span> **Falsa.**

<div class="original-item">
<b>C)</b> O teorema de Arrow aprofunda o problema da integração de preferências em decisões coletivas que já havia sido revelado pelo paradoxo de Condorcet: segundo o teorema, em processos de votação <span class="err">cardinais</span>, não se consegue garantir simultaneamente um conjunto de propriedades desejáveis, como <span class="err">não-ditadura</span>, <span class="err">unversalidade ou domínio restrito</span>, <span class="err">dependência de alternativas irrelevantes</span>, monotonicidade, não-imposição e eficiência de Pareto.
</div>

<br>

<div class="small tight">

- Há mais de um erro na questão. Primeiro, o Teorema de Arrow trata de sistemas ordinais de votação.
- Além disso, a afirmativa também troca os nomes técnicos de condições desejáveis: o correto seria: "<b>sistema não-ditatorial</b>"; "domínio <b>irrestrito</b>"; e "<b>independência</b> de alternativas irrelevantes".

</div>


---

## 3.D - L. A. Paul

<span class="vf true">V</span> **Verdadeira.**

<div class="original-item">
<b>D)</b> A crítica de L. A. Paul aos métodos de decisão racional previsto pela Teoria da Escolha Racional põe em dúvida estabilidade das preferências do agente: segundo ela, quando escolhas envolvem experiências transformadoras o decisor nunca será capaz de justificar suas escolhas racionalmente, ex ante, com base em suas preferências.
</div>

<br>

<div class="small tight">

- Antes da experiência, o agente não acessa plenamente o ponto de vista que terá depois.
- A escolha não pode ser justificada apenas por preferências previamente dadas.
- Isso desafia a estabilidade das preferências na Teoria da Escolha Racional.

</div>

---

## Questão 3 - Síntese

| Item | Gabarito | Justificativa curta |
|:--:|:--:|:--|
| A | <span class="vf false">F</span> | Consequencialismo não exige utilitarismo ou AED. |
| B | <span class="vf false">F</span> | A LINDB aumenta os ônus de motivação. |
| C | <span class="vf false">F</span> | Arrow é ordinal e as condições foram mal nomeadas. |
| D | <span class="vf true">V</span> | Experiências transformadoras desafiam preferências estáveis *ex ante*. |

<br>

**Resposta:** F, F, F, V.

---

![bg](section_bg.png)

# Questão 4
_Estado de direito e argumentos consequencialistas_

---

## Questão 4 - Ponto de partida

> “É (...) com apoio na Constituição e nas leis - e não na busca pragmática de resultados - que se deverá promover a solução do justo equilíbrio (...)”
>
> “O respeito pela autoridade da Constituição e das leis [não] configuraria fator (...) de frustração da eficácia da investigação social.”

<br>

- A questão pede para o aluno mostrar por que essa oposição entre **Estado de direito** e **consideração de consequências** não deve ser tratada como necessária.

---

## 4.A - Compatibilidade com o Estado de Direito

<div class="small tight">

1. **O próprio direito positivo pode exigir a consideração de consequências.**
   LINDB, arts. 5º e 20: fins sociais, bem comum e consequências práticas.
2. **Métodos tradicionais de exegese também mobilizam consequências.**
   Ex.: estrutura teleológica dos princípios e proporcionalidade em sentido estrito.
3. **Decisões judiciais produzem efeitos no mundo, difíceis de ignorar.**
   Em certos casos, abstrair esses efeitos empobrece a própria fundamentação.
4. **Na prática institucional, juízes já consideram consequências.**
   As pesquisas discutidas em aula mostram convivência entre parâmetros legais e consequências sociais.
5. **Nem todo consequencialismo é contra legem ou se opõem diretamente a argumentos institucionais.**
   Há posturas <i>secundum legem</i> e <i>praeter legem</i>, bem como consequencialismo fraco e residual.

</div>

---

## 4.A - Resposta esperada

<div class="small tight">

- A fala do ministro exagera ao opor, de forma rígida, Constituição e leis, de um lado, e busca pragmática de resultados, de outro.
- Com base nas aulas 1 e 2, a resposta correta é mostrar que considerar consequências pode ser uma exigência do próprio Direito, pode estar embutido em métodos interpretativos tradicionais e pode ocorrer de modo compatível com limites institucionais. Ou seja, **era esperado que o aluno mobilizasse os argumentos que discutimos em aula**.
- Assim, **não há tensão necessária** entre Estado de direito e argumentos consequencialistas; há, no máximo, tensão contingente em certas modalidades mais agressivas de consequencialismo.
- Em especial, a tensão cresce em cenários <i>contra legem</i> e de consequencialismo forte.

</div>

---

## 4.B - Estrutura do argumento consequencialista

| Elemento | Conteúdo | Dimensão |
|:--|:--|:--|
| **Ponto de vista** | A decisão/ação X é desejável | - |
| **Premissa empírica** | X produz a consequência Y | positiva |
| **Premissa normativa** | Y é desejável | normativa |

<br>

- Em linguagem da aula 2:
  **alternativas de ação** + **consequências vinculadas às alternativas** + **relação de preferência entre as consequências**.

---

## 4.B - Desafios da dimensão positiva

<div class="small tight">

- **Especificação do problema decisório**:
  é preciso identificar quais alternativas realmente estão disponíveis e quais consequências devem entrar na análise.
- **Desconhecimento do futuro / erros de prognose**:
  o julgador precisa estimar cenários e probabilidades sob incerteza.
- **Cadeias causais frágeis**:
  previsões podem escorregar para raciocínios especulativos, como a falácia do efeito-dominó.

</div>

<br>

- Ou seja, nessa dimensão, os desafios estão relacionados a demonstrar, com algum rigor empírico, que a decisão X realmente tende a produzir Y.

---

## 4.B - Desafios da dimensão normativa

<div class="small tight">

- **Seleção dos critérios de valoração**:
  quais consequências importam para o julgamento?
- **Operacionalização dos critérios escolhidos**:
  o que conta, concretamente, como eficiência, segurança, igualdade, bem comum etc.?
- **Conflitos entre critérios**:
  consequências desejáveis segundo um critério podem ser indesejáveis segundo outro.

</div>

<br>

- Nesta dimensão, os desafios consistem em justificar por que uma consequência (e, por conseguinte, a decisão que a produz) deve ser considerada melhor do que outra.

---

![bg](section_bg.png)

# Questão 5
_Exemplo de jogo_

---

## Questão 5 - Exemplo simples

| J1 \\ J2 | E | F | G | ~~H~~ |
|:--|:--:|:--:|:--:|:--:|
| A | **(5,5)** | (0,0) | (0,0) | (**1**,-1) |
| B | (0,0) | **(2,2)** | (0,0) | (-1,-1) |
| C | (0,0) | (0,0) | **(2,2)** | (-1,-1) |
| ~~D~~ | (-1,**1**) | (-1,-1) | (-1,-1) | (-1,-1) |

<br>

- Equilíbrios de Nash: (A, E); (B, F); (C, G)
- Equilíbrio Pareto Superior: (A, E)
- Estratégias dominadas: "D" para o jogador 1, "H" para o jogador 2.


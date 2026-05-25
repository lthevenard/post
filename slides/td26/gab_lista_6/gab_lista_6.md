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
.sequence-box {
  width: 76%;
  margin: 0.7rem auto;
  padding: 1rem 1.2rem;
  border: 2px solid #003E7E;
  background: white;
  line-height: 1.55;
  font-size: 92%;
}
.sequence-title {
  color: #003E7E;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.sequence-branch {
  margin-left: 2rem;
}
.sequence-subbranch {
  margin-left: 4rem;
}
.math-small {
  font-size: 88%;
}
</style>

![bg](section_bg.png)

# Correção da Lista 6
**Teoria da Decisão - 2026.1**
Lucas Thevenard

---
<!--
paginate: true
header: Correção Lista 6 - Teoria da Decisão
footer: lucas.gomes@fgv.br
-->

# Exercício 1

---

## Exercício 1 - matriz do jogo

<table style="line-height: 120%;">

  <tr class="game action player2"> 
    <td></td>
    <td>Insistir</td>
    <td>Ceder</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 120px;"><br>Insistir<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-6</span>, 
      <span class="payoff player2">-8</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">8</span>, 
      <span class="payoff player2">2</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 120px;"><br>Ceder<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">1</span>, 
      <span class="payoff player2">10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">4</span>, 
      <span class="payoff player2">5</span>
    &nbsp;)</td>
  </tr>
</table>

<br>

- O jogo foi montado a partir do enunciado.
- Payoffs no formato **(Norte, Sul)**.
- Não há paralelismo de payoffs: as duas distribuições mistas precisam ser calculadas separadamente.

---

## Exercício 1 - melhores respostas

<table style="line-height: 120%;">

  <tr class="game action player2"> 
    <td></td>
    <td><span class="under">Insistir</span></td>
    <td><span class="under">Ceder</span></td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 120px;"><br><span class="under">Insistir</span><br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-6</span>, 
      <span class="payoff player2">-8</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">8</span>, 
      <span class="payoff player2 under">2</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 120px;"><br><span class="under">Ceder</span><br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">1</span>, 
      <span class="payoff player2 under">10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">4</span>, 
      <span class="payoff player2">5</span>
    &nbsp;)</td>
  </tr>
</table>


---

## Exercício 1 - equilíbrio puro e classificação



<br>

- Equilíbrios de Nash em estratégias puras: **{ (Insistir, Ceder) e (Ceder, Insistir) }**.
- Classificação: **Jogo da Galinha**.
- A agressividade unilateral é o melhor resultado para quem insiste.
- A agressividade bilateral é o pior resultado para ambos.
- Os equilíbrios são assimétricos: um insiste e o outro cede.

---

## Exercício 1 - equilíbrio misto: encontrando $q$

<div class="math-small">

Defina $q$ como a probabilidade de **Sul** escolher **Insistir**.

$$
U_N(Insistir) = (-6)q + 8(1-q) = 8 - 14q
$$

$$
U_N(Ceder) = 1q + 4(1-q) = 4 - 3q
$$

$$
8 - 14q = 4 - 3q \Rightarrow q = \frac{4}{11} = 36{,}36\%
$$

</div>

<br>

Sul deve insistir com probabilidade **36,36%** e ceder com probabilidade **63,64%**.

---

## Exercício 1 - equilíbrio misto: encontrando $p$

<div class="math-small">

Defina $p$ como a probabilidade de **Norte** escolher **Insistir**.

$$
U_S(Insistir) = (-8)p + 10(1-p) = 10 - 18p
$$

$$
U_S(Ceder) = 2p + 5(1-p) = 5 - 3p
$$

$$
10 - 18p = 5 - 3p \Rightarrow p = \frac{1}{3} = 33{,}33\%
$$

</div>

<br>

Norte deve insistir com probabilidade **33,33%** e ceder com probabilidade **66,67%**.

---

## Exercício 1 - solução mista


<br>

Equilíbrio em estratégias mistas:

$$
\sigma_N = (Insistir: \frac{1}{3},\; Ceder: \frac{2}{3})
$$

$$
\sigma_S = (Insistir: \frac{4}{11},\; Ceder: \frac{7}{11})
$$

<br>

As probabilidades são diferentes porque os payoffs de Norte e Sul não são paralelos.

---

# Exercício 2

---

## Exercício 2 - árvore do jogo


<div class="sequence-box">
  <div class="sequence-title">Sem garantia</div>
  <div><strong>Banco</strong></div>
  <div class="sequence-branch">Não financiar → <strong>(1, 1)</strong></div>
  <div class="sequence-branch">Financiar → <strong>Empresa</strong></div>
  <div class="sequence-subbranch">Cumprir → <strong>(4, 3)</strong></div>
  <div class="sequence-subbranch">Desviar → <strong>(0, 5)</strong></div>
</div>


<br>

- Banco decide primeiro. Empresa só decide se houver financiamento.
- A análise deve ser feita de trás para frente.


---

![bg](nofooter_bg.png)

<div class="center">

![w:700](./ex/ex.001.png)

</div>

---

![bg](nofooter_bg.png)

<div class="center">

![w:700](./ex/ex.002.png)

</div>

---

![bg](nofooter_bg.png)

<div class="center">

![w:700](./ex/ex.003.png)

</div>

---

![bg](nofooter_bg.png)

<div class="center">

![w:700](./ex/ex.004.png)

</div>

---

![bg](nofooter_bg.png)

<div class="center">

![w:700](./ex/ex.005.png)

</div>

---

## Exercício 2 - indução retroativa


- No nó da Empresa, se o Banco financiou: **Desviar** gera payoff 5 e **Cumprir** gera payoff 3.
- Logo, a Empresa escolhe **Desviar**.
- Antecipando isso, o Banco compara **Financiar** e obter 0 com **Não financiar** e obter 1.
- Resultado por indução retroativa: **Não financiar**, com payoff **(1, 1)**.

---


## Exercício 2 - garantia contratual


<div class="sequence-box">
  <div class="sequence-title">Com garantia</div>
  <div><strong>Banco</strong></div>
  <div class="sequence-branch">Não financiar → <strong>(1, 1)</strong></div>
  <div class="sequence-branch">Financiar → <strong>Empresa</strong></div>
  <div class="sequence-subbranch">Cumprir → <strong>(4, 3)</strong></div>
  <div class="sequence-subbranch">Desviar → <strong>(0, 2)</strong></div>
</div>


---

![bg](nofooter_bg.png)

<div class="center">

![w:700](./ex/ex.006.png)

</div>

---

![bg](nofooter_bg.png)

<div class="center">

![w:700](./ex/ex.007.png)

</div>

---

![bg](nofooter_bg.png)

<div class="center">

![w:700](./ex/ex.008.png)

</div>

---

![bg](nofooter_bg.png)

<div class="center">

![w:700](./ex/ex.009.png)

</div>

---

![bg](nofooter_bg.png)

<div class="center">

![w:700](./ex/ex.010.png)

</div>

---

## Com a garantia

<br>

- Com garantia, se o Banco financia, a Empresa compara **Cumprir** e obter 3 com **Desviar** e obter 2.
- A Empresa passa a escolher **Cumprir**.
- Antecipando isso, o Banco compara **Financiar** e obter 4 com **Não financiar** e obter 1.
- Resultado com garantia: **Financiar, Cumprir**, com payoff **(4, 3)**.

---

## Exercício 2 - interpretação

- A garantia muda os incentivos da Empresa no nó posterior.
- Isso torna crível a promessa de cumprir o plano de investimento.
- O Banco, antecipando essa mudança, passa a financiar.
- O mecanismo funciona como uma **estratégia de comprometimento**.

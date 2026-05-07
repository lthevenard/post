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
.columns3 {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
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
td.eliminated {
  color: lightgray!important;
  text-decoration: line-through!important;
}
td.eliminated > span {
  color: lightgray!important;
  text-decoration: line-through!important;
}
td.player1 {
  height: 80px;
  width: 80px;
}
</style>

![bg](section_bg.png)

# Aula 7 - Cooperação, jogos repetitivos e coordenação
**Teoria da Decisão – 2026.1**
Lucas Thevenard

---
<!-- 
paginate: true 
header: Aula 7 - Cooperação, jogos repetitivos e coordenação
footer: lucas.gomes@fgv.br | 05/05/2026
-->

## Recapitulando
- **Aulas 1 e 2**: Introdução teórica (Consequencialismo no Direito e Teoria da Decisão)
- **Aula 3**: Modelo de decisão racional sob risco – MDRR
- **Aulas 4 e 5**: Modelo de decisão racional sob ignorância – MDRI
- **Aula 6**: Introdução à Teoria dos Jogos (solução de jogos simultâneos)  

---

## Próximas aulas
- **Aula 7**: Cooperação, jogos repetitivos e coordenação
- **Aulas 8 e 9**: Jogos sequenciais
- **Aulas 10**: Teoria Comportamental
- **Aula 11**: Experimento do Tom Scott, Revisão

---

## Roteiro da aula
- O problema da cooperação
- O problema da coordenação

---

![bg](section_bg.png)

# 1. O problema da cooperação

---

### Vamos jogar

<br>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>C</td>
    <td>NC</td>
  </tr>
  <tr>
    <td class="game action player1">C</td>
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
    <td class="game action player1">NC</td>
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

## Dilema dos prisioneiros

- Dois empresários (Mike Batista e Nestor Doleró) são suspeitos de terem cometido o crime de corrupção ativa (art. 333 do CP: pena de até 12 anos de reclusão).
  - A polícia detêm evidências de que eles cometeram o crime de falsidade ideológica em documento particular (art. 299 do CP: até 3 anos de reculsão) além de inúmeros outros crimes menores.
  - A polícia separa os dois e oferece acordo de delação premiada para obter confissões pelo crime de corrupção. 

---

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0;">
<div style="line-height: 200%; margin: 190px 0 auto auto">
<b style="color: #058ED0;">Mike Batista</b>
</div>
<div>
<div style="margin: 0 10px 30px 250px;"><b style="color: #003E7E; text-align: center;">Nestor Doleró</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Confessar</td>
    <td>Não Confessar</td>
  </tr>
  <tr>
    <td class="game action player1">Confessar</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-9</span>, 
      <span class="payoff player2">-9</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-4</span>, 
      <span class="payoff player2">-15</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Não confessar</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-15</span>, 
      <span class="payoff player2">-4</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-5</span>, 
      <span class="payoff player2">-5</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0;">
<div style="line-height: 200%; margin: 190px 0 auto auto">
<b style="color: #058ED0;">Mike Batista</b>
</div>
<div>
<div style="margin: 0 10px 30px 250px;"><b style="color: #003E7E; text-align: center;">Nestor Doleró</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Confessar</td>
    <td>Não Confessar</td>
  </tr>
  <tr>
    <td class="game action player1">Confessar</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">-9</span>, 
      <span class="payoff player2 fade">-9</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">-4</span>, 
      <span class="payoff player2 fade">-15</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Não confessar</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-15</span>, 
      <span class="payoff player2 fade">-4</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">-5</span>, 
      <span class="payoff player2 fade">-5</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0;">
<div style="line-height: 200%; margin: 190px 0 auto auto">
<b style="color: #058ED0;">Mike Batista</b>
</div>
<div>
<div style="margin: 0 10px 30px 250px;"><b style="color: #003E7E; text-align: center;">Nestor Doleró</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Confessar</td>
    <td>Não Confessar</td>
  </tr>
  <tr>
    <td class="game action player1">Confessar</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">-9</span>, 
      <span class="payoff player2 fade">-9</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">-4</span>, 
      <span class="payoff player2 fade">-15</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Não confessar</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">-15</span>, 
      <span class="payoff player2 fade">-4</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-5</span>, 
      <span class="payoff player2 fade">-5</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0;">
<div style="line-height: 200%; margin: 190px 0 auto auto">
<b style="color: #058ED0;">Mike Batista</b>
</div>
<div>
<div style="margin: 0 10px 30px 250px;"><b style="color: #003E7E; text-align: center;">Nestor Doleró</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Confessar</td>
    <td>Não Confessar</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="under">Confessar</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">-9</span>, 
      <span class="payoff player2">-9</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">-4</span>, 
      <span class="payoff player2">-15</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Não confessar</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-15</span>, 
      <span class="payoff player2">-4</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-5</span>, 
      <span class="payoff player2">-5</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0;">
<div style="line-height: 200%; margin: 190px 0 auto auto">
<b style="color: #058ED0;">Mike Batista</b>
</div>
<div>
<div style="margin: 0 10px 30px 250px;"><b style="color: #003E7E; text-align: center;">Nestor Doleró</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Confessar</td>
    <td>Não Confessar</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="under">Confessar</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">-9</span>, 
      <span class="payoff player2 under">-9</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">-4</span>, 
      <span class="payoff player2">-15</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Não confessar</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">-15</span>, 
      <span class="payoff player2 fade">-4</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">-5</span>, 
      <span class="payoff player2 fade">-5</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0;">
<div style="line-height: 200%; margin: 190px 0 auto auto">
<b style="color: #058ED0;">Mike Batista</b>
</div>
<div>
<div style="margin: 0 10px 30px 250px;"><b style="color: #003E7E; text-align: center;">Nestor Doleró</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Confessar</td>
    <td>Não Confessar</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="under">Confessar</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">-9</span>, 
      <span class="payoff player2 under fade">-9</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">-4</span>, 
      <span class="payoff player2 fade">-15</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Não confessar</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">-15</span>, 
      <span class="payoff player2 under">-4</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">-5</span>, 
      <span class="payoff player2">-5</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0;">
<div style="line-height: 200%; margin: 190px 0 auto auto">
<b style="color: #058ED0;">Mike Batista</b>
</div>
<div>
<div style="margin: 0 10px 30px 250px;"><b style="color: #003E7E; text-align: center;">Nestor Doleró</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td><span class="under">Confessar</span></td>
    <td>Não Confessar</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="under">Confessar</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">-9</span>, 
      <span class="payoff player2 under">-9</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">-4</span>, 
      <span class="payoff player2">-15</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Não confessar</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-15</span>, 
      <span class="payoff player2 under">-4</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-5</span>, 
      <span class="payoff player2">-5</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0;">
<div style="line-height: 200%; margin: 190px 0 auto auto">
<b style="color: #058ED0;">Mike Batista</b>
</div>
<div>
<div style="margin: 0 10px 30px 250px;"><b style="color: #003E7E; text-align: center;">Nestor Doleró</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td><span class="under">Confessar*</span></td>
    <td>Não Confessar</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="under">Confessar*</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">-9</span>, 
      <span class="payoff player2 under">-9</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">-4</span>, 
      <span class="payoff player2">-15</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Não confessar</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-15</span>, 
      <span class="payoff player2 under">-4</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-5</span>, 
      <span class="payoff player2">-5</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>
<br>

<div style="text-align: center;">

Solução: **( Confessar , Confessar )**

</div>

---

### Estrutura do Dilema dos Prisioneiros Simples
<br>

<div class="columns">

<div>
<table>
  <tr class="game action player2"> 
    <td></td>
    <td><span class="under">Não Cooperar</span></td>
    <td>Cooperar</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="under">Não Cooperar</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">DB</span>, 
      <span class="payoff player2 under">DB</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">TB</span>, 
      <span class="payoff player2">WC</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Cooperar</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">WC</span>, 
      <span class="payoff player2 under">TB</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">PO</span>, 
      <span class="payoff player2">PO</span>
    &nbsp;)</td>
  </tr>
</table>


</div>
<div>

**TB > PO > DB > WC**

TB - *tempting betrayal*
PO - *pareto optimal*
DB - *defensive betrayal*
WC - *worst-case cenario*

</div>

---

## Jogos e cooperação
* No dilema dos prisioneiros, os jogadores deixam de atingir a solução Pareto-eficiente.
* Situação do jogo gera incentivos contrários à cooperação.
* Implicações significativas para o pensamento social e econômico.

---

> Sob que condições a cooperação pode emergir em um mundo de egoistas sem que exista uma autoridade central? Essa pergunta já intrigou a muitos, por um longo tempo. Sabemos que as pessoas não são anjos, que elas tendem a cuidar de si mesmas e dos seus em primeiro lugar. No entanto, também sabemos que a cooperação acontece e que a civilização se baseia nela. Mas, em situações em que cada indivíduo tem incentivos para agir de forma egoísta, como a cooperação pode surgir?
> A resposta que cada um de nós dá a essa pergunta tem um efeito fundamental sobre como pensamos e agimos em nossas relações sociais, políticas e econômicas com os demais. E as respostas que os outros dão têm também um efeito direto sobre o quanto eles estão dispostos a cooperar conosco. <br>
> Robert Axelrod, **The Evolution of Cooperation**

---

## Impossibilidade de cooperação

* **Jogos de soma zero**: competição estrita, os ganhos de um jogador representam perdas do outro jogador.
  - A soma de todos os payoffs do jogo é igual a zero.
* **Jogos de soma positiva/negativa**: possibilidade de cooperação, ainda que moderada, pois os payoffs não somam zero.
  - Possibilidade de que ambos os jogadores ganhem (ou deixem de perder).

---

<div class="columns">
<div style="margin: auto;">

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>P</td>
    <td>I</td>
  </tr>
  <tr>
    <td class="game action player1">P</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">1</span>, 
      <span class="payoff player2">-1</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-1</span>, 
      <span class="payoff player2">1</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">I</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-1</span>, 
      <span class="payoff player2">1</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">1</span>, 
      <span class="payoff player2">-1</span>
    &nbsp;)</td>
  </tr>
</table>

</div>
<div >

![w:400](marbles.png)
![w:400](marbles2.png)


</div>
</div>

---

### Repetição de jogos e incentivos à cooperação

<br>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>C</td>
    <td>NC</td>
  </tr>
  <tr>
    <td class="game action player1">C</td>
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
    <td class="game action player1">NC</td>
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

### Repetição de jogos e incentivos à cooperação

<div class="columns3">
<div style="margin: auto;">

#### **Jogo 1**

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>C</td>
    <td>NC</td>
  </tr>
  <tr>
    <td class="game action player1">C</td>
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
    <td class="game action player1">NC</td>
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

</div>

<div style="margin: auto;">

#### **Jogo 2**

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>C</td>
    <td>NC</td>
  </tr>
  <tr>
    <td class="game action player1">C</td>
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
    <td class="game action player1">NC</td>
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

</div>

<div style="margin: auto;">

#### **Jogo 3**

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>C</td>
    <td>NC</td>
  </tr>
  <tr>
    <td class="game action player1">C</td>
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
    <td class="game action player1">NC</td>
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

</div>

</div>

---

### Repetição de jogos e incentivos à cooperação

<div class="columns3">
<div style="margin: auto;">

#### **Jogo 1**

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>C</td>
    <td>NC</td>
  </tr>
  <tr>
    <td class="game action player1">C</td>
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
    <td class="game action player1">NC</td>
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

</div>

<div style="margin: auto;">

#### **Jogo 2**

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>C</td>
    <td>NC</td>
  </tr>
  <tr>
    <td class="game action player1">C</td>
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
    <td class="game action player1">NC</td>
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

</div>

<div style="margin: auto;">

#### **Jogo 3**

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>C</td>
    <td>NC</td>
  </tr>
  <tr>
    <td class="game action player1">C</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">3</span>, 
      <span class="payoff player2 fade">3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">1</span>, 
      <span class="payoff player2 fade">4</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">NC</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">4</span>, 
      <span class="payoff player2 fade">1</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">2*</span>, 
      <span class="payoff player2">2*</span>
    &nbsp;)</td>
  </tr>
</table>

</div>

</div>

---

### Repetição de jogos e incentivos à cooperação

<div class="columns3">
<div style="margin: auto;">

#### **Jogo 1**

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>C</td>
    <td>NC</td>
  </tr>
  <tr>
    <td class="game action player1">C</td>
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
    <td class="game action player1">NC</td>
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

</div>

<div style="margin: auto;">

#### **Jogo 2**

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>C</td>
    <td>NC</td>
  </tr>
  <tr>
    <td class="game action player1">C</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">3</span>, 
      <span class="payoff player2 fade">3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">1</span>, 
      <span class="payoff player2 fade">4</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">NC</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">4</span>, 
      <span class="payoff player2 fade">1</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">2*</span>, 
      <span class="payoff player2">2*</span>
    &nbsp;)</td>
  </tr>
</table>

</div>

<div style="margin: auto;">

#### **Jogo 3**

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>C</td>
    <td>NC</td>
  </tr>
  <tr>
    <td class="game action player1">C</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">3</span>, 
      <span class="payoff player2 fade">3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">1</span>, 
      <span class="payoff player2 fade">4</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">NC</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">4</span>, 
      <span class="payoff player2 fade">1</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">2*</span>, 
      <span class="payoff player2">2*</span>
    &nbsp;)</td>
  </tr>
</table>

</div>

</div>

---

### Repetição de jogos e incentivos à cooperação

<div class="columns3">
<div style="margin: auto;">

#### **Jogo 1**

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>C</td>
    <td>NC</td>
  </tr>
  <tr>
    <td class="game action player1">C</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">3</span>, 
      <span class="payoff player2 fade">3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">1</span>, 
      <span class="payoff player2 fade">4</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">NC</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">4</span>, 
      <span class="payoff player2 fade">1</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">2*</span>, 
      <span class="payoff player2">2*</span>
    &nbsp;)</td>
  </tr>
</table>

</div>

<div style="margin: auto;">

#### **Jogo 2**

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>C</td>
    <td>NC</td>
  </tr>
  <tr>
    <td class="game action player1">C</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">3</span>, 
      <span class="payoff player2 fade">3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">1</span>, 
      <span class="payoff player2 fade">4</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">NC</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">4</span>, 
      <span class="payoff player2 fade">1</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">2*</span>, 
      <span class="payoff player2">2*</span>
    &nbsp;)</td>
  </tr>
</table>

</div>

<div style="margin: auto;">

#### **Jogo 3**

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>C</td>
    <td>NC</td>
  </tr>
  <tr>
    <td class="game action player1">C</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">3</span>, 
      <span class="payoff player2 fade">3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">1</span>, 
      <span class="payoff player2 fade">4</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">NC</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">4</span>, 
      <span class="payoff player2 fade">1</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">2*</span>, 
      <span class="payoff player2">2*</span>
    &nbsp;)</td>
  </tr>
</table>

</div>

</div>

---

## A triste história dos incentivos à cooperação em jogos repetitivos 😧

* Se o número de repetições é finito, em tese sempre se aplicaria a mesma lógica. 
  - Os jogadores têm incentivos para desertar ao final do jogo, e acaba sendo mais vantajoso desertar o quanto antes, antecipando que o outro irá desertar também.
* Se o jogo é jogado por uma quantidade infinita de vezes, pode valer à pena cooperar. Mesmo nesse caso, a cooperação ainda dependeria:
  - da taxa de desconto dos jogadores e 
  - do tempo entre as repetições.

---

<div class="columns">

<div style="text-align: center; margin: auto;">

**Mas seres humanos de fato se comportam como a teoria da escolha racional prevê?**

</div>
<div style="margin: auto;">



</div>
</div>

---

<div class="columns">

<div style="text-align: center; margin: auto;">

**Mas seres humanos de fato se comportam como a teoria da escolha racional prevê?**

</div>
<div style="margin: auto;">

![w:400](nope.png)

</div>
</div>

---

## Estratégias de incentivo à cooperação
* **Estratégia 'olho por olho’** (*tit for tat* strategy)
  - Comece cooperando
  - Em seguida, faça o que o outro jogador fez na jogada anterior
  - Não tente ser muito esperto
* **Estratégia impiedosa** (*grim* strategy)
  - Comece cooperando e continue enquanto o outro jogador também cooperar
  - Se o outro jogador furar a cooperação, nunca mais coopere

---

## Axelrod: cooperação em condições improváveis

* Guerra de trincheiras (1ª GM) – emergência do sistema “viva e deixe viver”.
  - Anistia espontânea: soldados deixavam de lutar para vencer e passavam a cooperar com o exército inimigo.
* Geoffrey Dugdale (capitão inglês): “Fiquei surpreso ao observar soldados alemães andando ao alcance de um tiro de rifle, em suas próprias linhas. Nossos homens pareciam não notar… Os dois lados evidentemente não sabiam que uma guerra estava acontecendo. Ambos os lados pareciam acreditar na política de ‘viva e deixe viver’".
* Tony Ashworth estudou o fenômeno e concluiu que TODAS as 57 linhas de trincheiras reproduziram o sistema do “viva e deixe viver”.

---

## Axelrod: cooperação em condições improváveis

- Emprego da estratégia tit for tat foi tão efetivo que os aliados tiveram que adotar políticas para tentar forçar o retorno ao conflito.
  - Espólios de guerra alemães (não funcionou)
  - Corpos de soldados abatidos
  - Retorno gradual aos conflitos, desilusão dos soldados com a guerra.

---

## Cooperação em jogos repetitivos

- Por que seres humanos não se comportam como a teoria prevê?
  * Irracionalidade?
  * Um jogo social mais amplo?
  * Preferência pela cooperação (evolução da espécie)?

---

![bg](section_bg.png)

# 2. O problema da coordenação

---

> (...) há uma forte tentação de descrever uma situação como um Dilema dos Prisioneiros porque isso torna o problema suscetível a uma solução jurídica incontroversa. Este trabalho, no entanto, descreve os benefícios que podemos obter quando resistimos a essa tentação, quando abrimos nossos olhos para mais da teoria dos jogos do que apenas aquele único truque, não importa um quão engenhoso ele seja. Problemas de coordenação são comuns e importantes para o Direito, e há muito mais a ser aprendido usando exemplos simples para analisá-los. 
> **Richard H. McAdams**. Beyond the Prisioner’s Dilemma: Coordination, Game Theory, and the Law

---

## Aplicabilidade de insights da Teoria dos Jogos ao Direito
- **Richard H. McAdams** – banalização do Dilema dos Prisioneiros no Direito
  * Solução simples: apenas 1 equilíbrio.
  * Previsão clara do comportamento dos jogadores,
  * Ótimo de Pareto bem definido e diferente da solução de equilíbrio: a solução jurídica também é clara

---

> Ao contrário do Dilema dos Prisioneiros, jogos de coordenação descrevem situações envolvendo desigualdades, revelam como a cultura e a história afetam poderosamento o comportamento e demonstram o poder expressivo do Direito. Esses jogos oferecem insights únicos para a compreensão de barganhas, Direito Constitucional, estabilidade democrática, Direito Internacional, definição de standards, regulação do trânsito, normas de propriedade, papéis de gênero e movimentos sociais. Cientistas políticos, economistas, filósofos e apenas alguns teóricos do Direito começaram a explorar essas questões.
> **Richard H. McAdams**. Beyond the Prisioner’s Dilemma: Coordination, Game Theory, and the Law

---

## Da cooperação à coordenação

* Quando falamos de cooperação na aula passada, assumimos a existência de apenas uma alternativa de ação conjunta que maximizaria o resultado final para os jogadores.
* Coordenação é um conceito mais amplo que envolve um problema adicional de seleção quando há mais de uma alternativa para se atingir o resultado pretendido conjuntamente.
  - **Exemplo**: prisioneiros precisam coordenar seus álibis.

---

<div style="margin: auto;">

![w:700](map.png)

</div>

---

![bg](section_bg.png)

# 2. Jogos clássicos de coordenação

---

## Jogos Clássicos de Coordenação

- Jogo de pura coordenação (Pure Coordination Game – PC)
- Jogo da batalha dos sexos (Battle of the Sexes – BOS)
- Jogo da caça ao veado (Stag Hunt Game – SH)
- Jogo da galinha (Chicken Game or Hawk-Dove Game – HD)

---

### Jogo de pura coordenação
<br>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>C</td>
    <td>D</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 100px;">A</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">10</span>, 
      <span class="payoff player2">10</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">B</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">10</span>, 
      <span class="payoff player2">10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
  </tr>
</table>


---

### Jogo de pura coordenação
<br>

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Microsoft</b>
</div>
<div>
<div style="margin: 0 10px 30px 400px;"><b style="color: #003E7E; text-align: center;">Acer</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Tech A</td>
    <td>Tech B</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Tech A</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">10</span>, 
      <span class="payoff player2">10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Tech B</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">10</span>, 
      <span class="payoff player2">10</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### Jogo de pura coordenação
<br>

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Microsoft</b>
</div>
<div>
<div style="margin: 0 10px 30px 400px;"><b style="color: #003E7E; text-align: center;">Acer</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Tech A</td>
    <td>Tech B</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Tech A</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">10</span>, 
      <span class="payoff player2 fade">10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">0</span>, 
      <span class="payoff player2 fade">0</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Tech B</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2 fade">0</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">10</span>, 
      <span class="payoff player2 fade">10</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>


---

### Jogo de pura coordenação
<br>

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Microsoft</b>
</div>
<div>
<div style="margin: 0 10px 30px 400px;"><b style="color: #003E7E; text-align: center;">Acer</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Tech A</td>
    <td>Tech B</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Tech A</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">10</span>, 
      <span class="payoff player2 fade">10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2 fade">0</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Tech B</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">0</span>, 
      <span class="payoff player2 fade">0</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">10</span>, 
      <span class="payoff player2 fade">10</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### Jogo de pura coordenação
<br>

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Microsoft</b>
</div>
<div>
<div style="margin: 0 10px 30px 400px;"><b style="color: #003E7E; text-align: center;">Acer</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Tech A</td>
    <td>Tech B</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Tech A</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">10</span>, 
      <span class="payoff player2">10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Tech B</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">10</span>, 
      <span class="payoff player2">10</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### Jogo de pura coordenação
<br>

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Microsoft</b>
</div>
<div>
<div style="margin: 0 10px 30px 400px;"><b style="color: #003E7E; text-align: center;">Acer</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Tech A</td>
    <td>Tech B</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Tech A</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">10</span>, 
      <span class="payoff player2 under">10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">0</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Tech B</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">0</span>, 
      <span class="payoff player2 fade">0</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under  fade">10</span>, 
      <span class="payoff player2 fade">10</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### Jogo de pura coordenação
<br>

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Microsoft</b>
</div>
<div>
<div style="margin: 0 10px 30px 400px;"><b style="color: #003E7E; text-align: center;">Acer</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Tech A</td>
    <td>Tech B</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Tech A</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">10</span>, 
      <span class="payoff player2 under fade">10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">0</span>, 
      <span class="payoff player2 fade">0</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Tech B</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">0</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under  fade">10</span>, 
      <span class="payoff player2 under">10</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### Jogo de pura coordenação
<br>

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Microsoft</b>
</div>
<div>
<div style="margin: 0 10px 30px 400px;"><b style="color: #003E7E; text-align: center;">Acer</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Tech A</td>
    <td>Tech B</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Tech A</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">10</span>, 
      <span class="payoff player2 under">10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Tech B</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">10</span>, 
      <span class="payoff player2 under">10</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

#### Equilíbrios: **{ (Tech A, Tech A), (Tech B, Tech B) }**

---

## Jogo de pura coordenação
<br>

* Os jogadores não se importam com a solução, desde que ela seja a mesma.
* Modelagem que explica a utilidade das convenções sociais.
* O problema é a identificação da solução coordenada. Ambos podem querer coordenar, mas se o jogo é simultâneo, podem equivocar-se a respeito da conduta do outro jogador.
* O Direito interfere nesses casos para definir a regra a ser seguida (sobretudo quando a não coordenação possui riscos expressivos):
  - Exemplo: legislação de trânsito vs. padrões e normas técnicas em geral (bitola ferroviária, USB, etc).


---

### Jogo da Batalha dos Sexos
<br>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>C</td>
    <td>D</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 100px;">A</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">1</span>, 
      <span class="payoff player2">1</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">3</span>, 
      <span class="payoff player2">2</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">B</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">2</span>, 
      <span class="payoff player2">3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
  </tr>
</table>


---

### Jogo da Batalha dos Sexos
<br>

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Robin</b>
</div>
<div>
<div style="margin: 0 10px 30px 400px;"><b style="color: #003E7E; text-align: center;">Ted</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Hockey</td>
    <td>Casa Show</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Hockey</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">40</span>, 
      <span class="payoff player2">10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Casa Show</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-10</span>, 
      <span class="payoff player2">-10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">10</span>, 
      <span class="payoff player2">40</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### Jogo da Batalha dos Sexos
<br>

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Robin</b>
</div>
<div>
<div style="margin: 0 10px 30px 400px;"><b style="color: #003E7E; text-align: center;">Ted</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Hockey</td>
    <td>Casa Show</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Hockey</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">40</span>, 
      <span class="payoff player2 fade">10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">0</span>, 
      <span class="payoff player2 fade">0</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Casa Show</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-10</span>, 
      <span class="payoff player2 fade">-10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">10</span>, 
      <span class="payoff player2 fade">40</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>


---

### Jogo da Batalha dos Sexos
<br>

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Robin</b>
</div>
<div>
<div style="margin: 0 10px 30px 400px;"><b style="color: #003E7E; text-align: center;">Ted</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Hockey</td>
    <td>Casa Show</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Hockey</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">40</span>, 
      <span class="payoff player2 fade">10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2 fade">0</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Casa Show</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">-10</span>, 
      <span class="payoff player2 fade">-10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">10</span>, 
      <span class="payoff player2 fade">40</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### Jogo da Batalha dos Sexos
<br>

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Robin</b>
</div>
<div>
<div style="margin: 0 10px 30px 400px;"><b style="color: #003E7E; text-align: center;">Ted</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Hockey</td>
    <td>Casa Show</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Hockey</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">40</span>, 
      <span class="payoff player2">10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Casa Show</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-10</span>, 
      <span class="payoff player2">-10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">10</span>, 
      <span class="payoff player2">40</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### Jogo da Batalha dos Sexos
<br>

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Robin</b>
</div>
<div>
<div style="margin: 0 10px 30px 400px;"><b style="color: #003E7E; text-align: center;">Ted</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Hockey</td>
    <td>Casa Show</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Hockey</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">40</span>, 
      <span class="payoff player2 under">10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">0</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Casa Show</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">-10</span>, 
      <span class="payoff player2 fade">-10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">10</span>, 
      <span class="payoff player2 fade">40</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### Jogo da Batalha dos Sexos
<br>

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Robin</b>
</div>
<div>
<div style="margin: 0 10px 30px 400px;"><b style="color: #003E7E; text-align: center;">Ted</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Hockey</td>
    <td>Casa Show</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Hockey</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">40</span>, 
      <span class="payoff player2 under fade">10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">0</span>, 
      <span class="payoff player2 fade">0</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Casa Show</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">-10</span>, 
      <span class="payoff player2">-10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">10</span>, 
      <span class="payoff player2 under">40</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### Jogo da Batalha dos Sexos
<br>

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Robin</b>
</div>
<div>
<div style="margin: 0 10px 30px 400px;"><b style="color: #003E7E; text-align: center;">Ted</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Hockey</td>
    <td>Casa Show</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Hockey</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">40</span>, 
      <span class="payoff player2 under">10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Casa Show</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-10</span>, 
      <span class="payoff player2">-10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">10</span>, 
      <span class="payoff player2 under">40</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### Jogo da Batalha dos Sexos
<br>

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Robin</b>
</div>
<div>
<div style="margin: 0 10px 30px 400px;"><b style="color: #003E7E; text-align: center;">Ted</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Hockey</td>
    <td>Casa Show</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Hockey</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">40</span>, 
      <span class="payoff player2 under">10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Casa Show</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-10</span>, 
      <span class="payoff player2">-10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">10</span>, 
      <span class="payoff player2 under">40</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

#### Equilíbrios: **{ (Hockey, Hockey), (Casa Show, Casa Show) }**

---

## Jogo da Batalha dos Sexos
* Cooperação gera resultados mais vantajosos para ambos.
* No entanto, surge um problema distributivo, pois os equilíbrios são desiguais entre os jogadores.
  - Possibilidade de disputas.
* O Direito torna-se mais relevante para sinalizar a coordenação apropriada. 
  - Essa escolha envolve o favorecimento de um jogador em relação ao outro.

---

### Jogo da Caça ao Veado
<br>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>C</td>
    <td>D</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 100px;">A</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">2</span>, 
      <span class="payoff player2">2</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2">1</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">B</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">1</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">1</span>, 
      <span class="payoff player2">1</span>
    &nbsp;)</td>
  </tr>
</table>

---

### Jogo da Caça ao Veado
<br>

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Katniss</b>
</div>
<div>
<div style="margin: 0 10px 30px 360px;"><b style="color: #003E7E; text-align: center;">Peeta</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Veado</td>
    <td>Lebre</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Veado</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">5</span>, 
      <span class="payoff player2">5</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2">2</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Lebre</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">2</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">2</span>, 
      <span class="payoff player2">2</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---


### Jogo da Caça ao Veado
<br>

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Katniss</b>
</div>
<div>
<div style="margin: 0 10px 30px 360px;"><b style="color: #003E7E; text-align: center;">Peeta</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Veado</td>
    <td>Lebre</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Veado</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">5</span>, 
      <span class="payoff player2 fade">5</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">0</span>, 
      <span class="payoff player2 fade">2</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Lebre</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">2</span>, 
      <span class="payoff player2 fade">0</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">2</span>, 
      <span class="payoff player2 fade">2</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---


### Jogo da Caça ao Veado
<br>

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Katniss</b>
</div>
<div>
<div style="margin: 0 10px 30px 360px;"><b style="color: #003E7E; text-align: center;">Peeta</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Veado</td>
    <td>Lebre</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Veado</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">5</span>, 
      <span class="payoff player2 fade">5</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2 fade">2</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Lebre</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">2</span>, 
      <span class="payoff player2 fade">0</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">2</span>, 
      <span class="payoff player2 fade">2</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### Jogo da Caça ao Veado
<br>

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Katniss</b>
</div>
<div>
<div style="margin: 0 10px 30px 360px;"><b style="color: #003E7E; text-align: center;">Peeta</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Veado</td>
    <td>Lebre</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Veado</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">5</span>, 
      <span class="payoff player2">5</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2">2</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Lebre</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">2</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">2</span>, 
      <span class="payoff player2">2</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### Jogo da Caça ao Veado
<br>

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Katniss</b>
</div>
<div>
<div style="margin: 0 10px 30px 360px;"><b style="color: #003E7E; text-align: center;">Peeta</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Veado</td>
    <td>Lebre</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Veado</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">5</span>, 
      <span class="payoff player2 under">5</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">0</span>, 
      <span class="payoff player2">2</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Lebre</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">2</span>, 
      <span class="payoff player2 fade">0</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">2</span>, 
      <span class="payoff player2 fade">2</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### Jogo da Caça ao Veado
<br>

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Katniss</b>
</div>
<div>
<div style="margin: 0 10px 30px 360px;"><b style="color: #003E7E; text-align: center;">Peeta</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Veado</td>
    <td>Lebre</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Veado</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">5</span>, 
      <span class="payoff player2 under fade">5</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">0</span>, 
      <span class="payoff player2 fade">2</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Lebre</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">2</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">2</span>, 
      <span class="payoff player2 under">2</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### Jogo da Caça ao Veado
<br>

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Katniss</b>
</div>
<div>
<div style="margin: 0 10px 30px 360px;"><b style="color: #003E7E; text-align: center;">Peeta</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Veado</td>
    <td>Lebre</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Veado</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">5</span>, 
      <span class="payoff player2 under">5</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2">2</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Lebre</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">2</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">2</span>, 
      <span class="payoff player2">2</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---


### Jogo da Caça ao Veado
<br>

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Katniss</b>
</div>
<div>
<div style="margin: 0 10px 30px 360px;"><b style="color: #003E7E; text-align: center;">Peeta</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Veado</td>
    <td>Lebre</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Veado</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">5</span>, 
      <span class="payoff player2 under">5</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2">2</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Lebre</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">2</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">2</span>, 
      <span class="payoff player2">2</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

#### Equilíbrios: **{ (Veado, Veado), (Lebre, Lebre) }**

---

## Jogo da Caça ao Veado

> "(...) Eis como os homens puderam, insensivelmente, adquirir uma idéia grosseira dos compromissos mútuos e da vantagem de os cumprir, mas somente na medida em que podia exigi-lo o interesse presente e sensível; porque a previdência nada era para eles; e, longe de se ocuparem com um porvir afastado, nem mesmo pensavam no dia seguinte. Se se tratava de pegar um veado, cada qual sentia bem que, para isso, devia ficar no seu posto; mas, se uma lebre passava ao alcance de algum, é preciso não duvidar de que a perseguia sem escrúpulos e, uma vez alcançada a sua presa, não lhe importava que faltasse a dos companheiros." **Jean-Jacques Rousseau**. Discurso sobre a Origem e os Fundamentos da Desigualdade entre os Homens.

---

## Jogo da Caça ao Veado
* Há uma equilíbrio mais vantajoso, mas ele pode não ser atingido, pois cada jogador pode obter um payoff mínimo com certeza sem coordenar sua ação com o outro.
* Problema do risco e da necessidade de confiança na ação dos demais para obter o melhor resultado.
  * Risco sistêmico nos setores securitário e bancário.

---

### Jogo da Galinha
<br>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>C</td>
    <td>D</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 100px;">A</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">3</span>, 
      <span class="payoff player2">1</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">B</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">1</span>, 
      <span class="payoff player2">3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">2</span>, 
      <span class="payoff player2">2</span>
    &nbsp;)</td>
  </tr>
</table>

---

### Jogo da Galinha
<br>

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Dom</b>
</div>
<div>
<div style="margin: 0 10px 30px 360px;"><b style="color: #003E7E; text-align: center;">Deckard</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Reto</td>
    <td>Desvia</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Reto</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-10</span>, 
      <span class="payoff player2">-10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">10</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Desvia</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2">10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">5</span>, 
      <span class="payoff player2">5</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### Jogo da Galinha
<br>

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Dom</b>
</div>
<div>
<div style="margin: 0 10px 30px 360px;"><b style="color: #003E7E; text-align: center;">Deckard</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Reto</td>
    <td>Desvia</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Reto</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-10</span>, 
      <span class="payoff player2 fade">-10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">10</span>, 
      <span class="payoff player2 fade">0</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Desvia</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">0</span>, 
      <span class="payoff player2 fade">10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">5</span>, 
      <span class="payoff player2 fade">5</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### Jogo da Galinha
<br>

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Dom</b>
</div>
<div>
<div style="margin: 0 10px 30px 360px;"><b style="color: #003E7E; text-align: center;">Deckard</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Reto</td>
    <td>Desvia</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Reto</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">-10</span>, 
      <span class="payoff player2 fade">-10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">10</span>, 
      <span class="payoff player2 fade">0</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Desvia</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">0</span>, 
      <span class="payoff player2 fade">10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">5</span>, 
      <span class="payoff player2 fade">5</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### Jogo da Galinha
<br>

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Dom</b>
</div>
<div>
<div style="margin: 0 10px 30px 360px;"><b style="color: #003E7E; text-align: center;">Deckard</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Reto</td>
    <td>Desvia</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Reto</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-10</span>, 
      <span class="payoff player2">-10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">10</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Desvia</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">0</span>, 
      <span class="payoff player2">10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">5</span>, 
      <span class="payoff player2">5</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### Jogo da Galinha
<br>

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Dom</b>
</div>
<div>
<div style="margin: 0 10px 30px 360px;"><b style="color: #003E7E; text-align: center;">Deckard</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Reto</td>
    <td>Desvia</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Reto</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">-10</span>, 
      <span class="payoff player2">-10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">10</span>, 
      <span class="payoff player2 under">0</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Desvia</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">0</span>, 
      <span class="payoff player2 fade">10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">5</span>, 
      <span class="payoff player2 fade">5</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### Jogo da Galinha
<br>

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Dom</b>
</div>
<div>
<div style="margin: 0 10px 30px 360px;"><b style="color: #003E7E; text-align: center;">Deckard</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Reto</td>
    <td>Desvia</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Reto</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">-10</span>, 
      <span class="payoff player2 fade">-10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">10</span>, 
      <span class="payoff player2 under fade">0</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Desvia</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">0</span>, 
      <span class="payoff player2 under">10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">5</span>, 
      <span class="payoff player2">5</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### Jogo da Galinha
<br>

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Dom</b>
</div>
<div>
<div style="margin: 0 10px 30px 360px;"><b style="color: #003E7E; text-align: center;">Deckard</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Reto</td>
    <td>Desvia</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Reto</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-10</span>, 
      <span class="payoff player2">-10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">10</span>, 
      <span class="payoff player2 under">0</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Desvia</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">0</span>, 
      <span class="payoff player2 under">10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">5</span>, 
      <span class="payoff player2">5</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### Jogo da Galinha
<br>

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Dom</b>
</div>
<div>
<div style="margin: 0 10px 30px 360px;"><b style="color: #003E7E; text-align: center;">Deckard</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Reto</td>
    <td>Desvia</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Reto</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-10</span>, 
      <span class="payoff player2">-10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">10</span>, 
      <span class="payoff player2 under">0</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Desvia</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">0</span>, 
      <span class="payoff player2 under">10</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">5</span>, 
      <span class="payoff player2">5</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

#### Equilíbrios: **{ (Reto, Desvia), (Desvia, Reto) }**

---

## Jogo da Galinha
* A solução mais segura para ambos não é um equilíbrio, pois nela há incentivos para que um jogador deixe de desviar, obtendo o maior payoff para si.
* Espera-se ver equilíbrios em que um segue reto e outro desvia. Mas quem vai arriscar e quem vai ceder?
  - Na hipótese de falha de coordenação, em que ambos seguem reto, o pior resultado para ambos é atingido.
* Modelagem muito útil para problemas de barganha agressiva.
  - Exemplos na política internacional, em questões de segurança etc.

---

## Resumindo: 4 jogos de coordenação pura
- Coordenação pura
- Batalha dos sexos
- Caça do veado
- Jogo da Galinha

---

## Coordenação 
* Coordenação pode ser um problema trivial: jogo de coordenação pura
  - Nesses casos o Direito em regra não precisa intervir, salvo em casos excepcionais.
  - Normas Técnicas e Padrões Industriais: regulação ‘soft’.

---

## Coordenação
- Em outros casos, a Coordenação também pode não ser trivial:
  - SH – necessidade de conter o risco para que a coordenação possa ocorrer.
  - HD – dilema de otimização, falha de coordenação pode levar ao pior resultado.
  - BOS – coordenação desejada por ambos, mas desigual (possibilidade de disputas).

---

## Coordenação

* Modela questões distributivas que são relevantes porque o Direito se preocupa com desigualdades sociais;
  - BOS e HD – desigualdade de resultados entre os jogadores.
* A coordenação envolve a seleção do equilíbrio preferido a partir de algum ponto de referência (teoria do ponto focal)
  - Abre espaço para questões como cultura, história, preferências éticas etc.
* O poder expressivo do Direito pode contribuir para o equacionamento de problemas de coordenação.

---

## Mais alguns exemplos – Batalha dos Sexos
- **Divórcios**: Em casos de divórcio, os casais muitas vezes enfrentam desacordos sobre como dividir os ativos, como a casa da família, poupanças e investimentos. Essas disputas podem ser modeladas como um jogo da Batalha dos Sexos, onde ambos os cônjuges preferem receber uma parcela maior dos ativos, mas têm opiniões diferentes sobre quais ativos são mais valiosos. 
* **Conceito mais geral**: quaisquer disputas envolvendo divisões de recursos em que as partes não avaliam todos os ativos da mesma maneira. 

---

## Mais alguns exemplos – Batalha dos Sexos
- **Barganhas Coletivas**: Em disputas envolvendo barganhas coletivas, o jogo da Batalha dos Sexos pode ser usado para modelar as preferências das partes interessadas que têm interesses conflitantes. Por exemplo, uma comunidade pode estar dividida sobre a construção de um novo shopping center, com alguns residentes preferindo que ele seja construído perto de suas casas, enquanto outros preferem que ele seja localizado mais longe. 
* Outros exemplos: a reparação de danos ambientais que envolvem uma coletividade de pessoas afetadas, ou a recuperação judicial de uma empresa com diversos credores.

---

## Mais alguns exemplos – Jogo da Caça ao Veado
- **Coordenação em Acordos Legais**: No direito contratual, as partes precisam cooperar para alcançar acordos mutuamente benéficos. O jogo da Caça ao Veado pode ser usado para modelar os desafios que surgem quando as partes tentam coordenar suas ações diante da incerteza. Por exemplo, duas empresas podem querer colaborar em uma joint venture, mas cada uma pode estar insegura se a outra cumprirá seus compromissos. O jogo da Caça ao Veado destaca a importância da confiança e comunicação para alcançar o resultado desejado.

---

## Mais alguns exemplos – Jogo da Caça ao Veado
- **Corrida aos bancos**: ocorre quando um grande número de clientes de um banco tenta retirar seus depósitos simultaneamente, por medo de que o banco possa falir. Isso pode acontecer quando há rumores ou preocupações sobre a solidez financeira do banco. Se todos os depositantes mantivessem a confiança no banco e não retirassem seus depósitos, o banco provavelmente permaneceria solvente e todos estariam em uma situação mais estável financeiramente (o resultado "veado" no jogo da Caça ao Veado). No entanto, se alguns depositantes começam a retirar seus depósitos e outros seguem o exemplo, o banco pode enfrentar problemas de liquidez e, em última instância, falir, resultando em perdas para os depositantes que não conseguiram retirar seus fundos a tempo (o resultado "lebre").

---

## Mais alguns exemplos – Jogo da Galinha
- **Solução Pacífica de Conflitos**: O jogo do Galinha pode ser usado para modelar a dinâmica entre partes opostas em uma disputa legal. Ambas as partes podem se envolver em um jogo de "galinha", ameaçando ir a julgamento, a menos que a outra parte recue e ofereça um acordo mais favorável. Esse jogo de alto risco pode resultar em um resultado mutuamente destrutivo (um julgamento custoso e demorado) se nenhuma das partes estiver disposta a ceder. 


---

## Mais alguns exemplos – Jogo da Galinha
- **Direito Internacional**: O jogo da Galinha também pode ser aplicado a conflitos internacionais, onde os países podem ter interesses conflitantes e incentivos para lutar ou negociar. Por exemplo, em uma guerra comercial, um país pode escolher aumentar o conflito e impor mais tarifas, enquanto o outro país pode optar por negociar e buscar uma solução diplomática. 

---

## Obs: Cooperação + Coordenação
<br>

<table style="line-height: 120%;">

  <tr class="game action player2"> 
    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
    <td>D</td>
    <td>E</td>
    <td>F</td>
  </tr>
  <tr>
    <td class="game action player1"><br>A<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">3</span>, 
      <span class="payoff player2">2</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">1</span>, 
      <span class="payoff player2">1</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2">4</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><br>B<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">1</span>, 
      <span class="payoff player2">1</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">2</span>, 
      <span class="payoff player2">3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2">4</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><br>C<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">4</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">4</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">1</span>, 
      <span class="payoff player2">1</span>
    &nbsp;)</td>
  </tr>

</table>

---

![bg](section_bg.png)

# 3. Introdução ao conceito de estratégias mistas

---

<div class="columns">

<div>

<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Par</b>
</div>
<div>
<div style="margin: 0 10px 30px 200px;"><b style="color: #003E7E; text-align: center;">Ímpar</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>0</td>
    <td>1</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 80px;">0</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">5</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2 under">5</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">1</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2 under">5</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">5</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

</div>
<div>

### Estratégias mistas
* Como jogar par ou ímpar?
* Por que não devemos sempre jogar 0 ou sempre jogar 1.
* Seria desejável jogar 1 em 75% dos casos? Por que?

</div>
</div>

---

## Estratégias mistas
- **Par ou ímpar**: nenhum jogador deve utilizar uma estratégia com mais frequência que a outra (mais de 50% das vezes).
  * A situação em que cada jogador utiliza cada estratégia em 50% dos casos é considerada um equilíbrio de Nash.
  * Cada jogador, nesse caso, está dando sua melhor resposta ao outro.
    - Qualquer mudança nas distribuições seria instável pois os jogadores teriam incentivos para mudar suas estratégias.
  * Chamamos esse tipo de equilíbrio de **"estratégias mistas"** pois cada jogador não usa apenas uma estratégia. Mais de uma estratégia é usada, cada uma em uma certa proporção de casos (distribuição de probabilidades).

---

## Estratégias mistas
* Nem sempre a distribuição de probabilidades será 50% para cada jogador.
  - Como calcular o equilíbrio em estratégias mistas em casos menos triviais que o jogo de par ou ímpar? (...)
* Jogos podem possuir simultaneamente equilíbrios em estratégias puras e equilíbrios em estratégias mistas.
  - Exemplo: o jogo da galinha também possui um equilíbrio em estratégias mistas.

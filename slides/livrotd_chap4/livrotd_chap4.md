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

# Capítulo 4 – Introdução à Teoria dos Jogos
**2025.2**
Lucas Thevenard

---
<!-- 
paginate: true 
header: Capítulo 4: Introdução à Teoria dos Jogos
footer: lucas.gomes@fgv.br | 17/10/2025
-->

## Tópicos
- O problema da fiscalização como um jogo: Solução por dominância
- O jogo dos porquinhos e o caráter contra-intuitivo das interações estratégicas
- Segunda formulação do jogo da fiscalização: Solução por equilíbrio de Nash
- Dilema dos prisioneiros: o problema da cooperação
- O problema da coordenação
  - Jogo de Coordenação Pura; Jogo da Batalha dos Amigos; Jogo da Caça ao Veado; Jogo dos Gaviões e dos Pombos
- Terceira formulação do jogo da fiscalização: Equilíbrio em estratégias mistas

---


![bg](nofooter_bg.png)

![](arvore_1.002.jpeg)


---

<table>
  <tr class="game action player2"> 
    <td></td>
    <td><span class="__underp21__">Fiscaliza Menos (5%)</span></td>
    <td><span class="__underp22__">Fiscaliza Mais (10%)</span></td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 100px;"><span class="__underp11__">Cumprir</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade1__ __under1__">-3</span>, 
      <span class="payoff player2 __fade2__ __under2__">-0,2</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade3__ __under3__">-3</span>, 
      <span class="payoff player2 __fade4__ __under4__">-0,7</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="__underp12__">Descumprir</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade5__ __under5__">-1,5</span>, 
      <span class="payoff player2 __fade6__ __under6__">1,3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade7__ __under7__">-3</span>, 
      <span class="payoff player2 __fade8__ __under8__">2,3</span>
    &nbsp;)</td>
  </tr>
</table>

---

<table>
  <tr class="game action player2"> 
    <td></td>
    <td><span class="__underp21__">Fiscaliza Menos (5%)</span></td>
    <td><span class="__underp22__ fade">Fiscaliza Mais (10%)</span></td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 100px;"><span class="__underp11__">Cumprir</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade1__ __under1__">-3</span>, 
      <span class="payoff player2 fade __under2__">-0,2</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade __under3__">-3</span>, 
      <span class="payoff player2 fade __under4__">-0,7</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="__underp12__">Descumprir</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade5__ under">-1,5</span>, 
      <span class="payoff player2 fade __under6__">1,3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade __under7__">-3</span>, 
      <span class="payoff player2 fade __under8__">2,3</span>
    &nbsp;)</td>
  </tr>
</table>

---

<table>
  <tr class="game action player2"> 
    <td></td>
    <td><span class="__underp21__ fade">Fiscaliza Menos (5%)</span></td>
    <td><span class="__underp22__">Fiscaliza Mais (10%)</span></td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 100px;"><span class="__underp11__">Cumprir</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade __under1__">-3</span>, 
      <span class="payoff player2 fade __under2__">-0,2</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade3__ under">-3</span>, 
      <span class="payoff player2 fade __under4__">-0,7</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="__underp12__">Descumprir</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade under">-1,5</span>, 
      <span class="payoff player2 fade __under6__">1,3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade7__ under">-3</span>, 
      <span class="payoff player2 fade __under8__">2,3</span>
    &nbsp;)</td>
  </tr>
</table>

---

<table>
  <tr class="game action player2"> 
    <td></td>
    <td><span class="__underp21__">Fiscaliza Menos (5%)</span></td>
    <td><span class="__underp22__">Fiscaliza Mais (10%)</span></td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 100px;"><span class="__underp11__">Cumprir</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade1__ __under1__">-3</span>, 
      <span class="payoff player2 __fade2__ __under2__">-0,2</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade3__ under">-3</span>, 
      <span class="payoff player2 __fade4__ __under4__">-0,7</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="__underp12__ under">Descumprir</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade5__ under">-1,5</span>, 
      <span class="payoff player2 __fade6__ __under6__">1,3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade7__ under">-3</span>, 
      <span class="payoff player2 __fade8__ __under8__">2,3</span>
    &nbsp;)</td>
  </tr>
</table>

---

<table>
  <tr class="game action player2"> 
    <td></td>
    <td><span class="__underp21__">Fiscaliza Menos (5%)</span></td>
    <td><span class="__underp22__">Fiscaliza Mais (10%)</span></td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 100px;"><span class="__underp11__">Cumprir</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade1__ __under1__">-3</span>, 
      <span class="payoff player2 __fade2__ __under2__">-0,2</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade3__ under">-3</span>, 
      <span class="payoff player2 __fade4__ __under4__">-0,7</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="__underp12__ under">Descumprir</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade5__ under">-1,5</span>, 
      <span class="payoff player2 __fade6__ __under6__">1,3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade7__ under">-3</span>, 
      <span class="payoff player2 __fade8__ __under8__">2,3</span>
    &nbsp;)</td>
  </tr>
</table>

---

<table>
  <tr class="game action player2"> 
    <td></td>
    <td><span class="__underp21__">Fiscaliza Menos (5%)</span></td>
    <td><span class="__underp22__">Fiscaliza Mais (10%)</span></td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 100px;"><span class="__underp11__ fade">Cumprir</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade __under1__">-3</span>, 
      <span class="payoff player2 fade __under2__">-0,2</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade under">-3</span>, 
      <span class="payoff player2 fade __under4__">-0,7</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="__underp12__ under">Descumprir</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade5__ under">-1,5</span>, 
      <span class="payoff player2 __fade6__ __under6__">1,3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade7__ under">-3</span>, 
      <span class="payoff player2 __fade8__ under">2,3</span>
    &nbsp;)</td>
  </tr>
</table>

---

<table>
  <tr class="game action player2"> 
    <td></td>
    <td><span class="__underp21__">Fiscaliza Menos (5%)</span></td>
    <td><span class="__underp22__ under">Fiscaliza Mais (10%)</span></td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 100px;"><span class="__underp11__">Cumprir</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade1__ __under1__">-3</span>, 
      <span class="payoff player2 __fade2__ __under2__">-0,2</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade3__ under">-3</span>, 
      <span class="payoff player2 __fade4__ __under4__">-0,7</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="__underp12__ under">Descumprir</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade5__ under">-1,5</span>, 
      <span class="payoff player2 __fade6__ __under6__">1,3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade7__ under">-3</span>, 
      <span class="payoff player2 __fade8__ under">2,3</span>
    &nbsp;)</td>
  </tr>
</table>

<br>

#### **Solução: (Descumprir, Fiscaliza Mais)**

---

<div class="columns">

<div>

![w:400](porquinhos.png)

</div>

<div>

## Jogo dos Porquinhos

- Little Pig, Big Pig
- Experimento de Baldwin & Meese (1979)

</div>

</div>

---

<table>
  <tr class="game action player2"> 
    <td></td>
    <td><span class="__underp21__">Homer Aciona</span></td>
    <td><span class="__underp22__">Homer Espera</span></td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 100px;"><span class="__underp11__">Bart Aciona</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade1__ __under1__">1/3</span>, 
      <span class="payoff player2 __fade2__ __under2__">2/3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade3__ __under3__"></span>, 
      <span class="payoff player2 __fade4__ __under4__"></span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="__underp12__">Bart Espera</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade5__ __under5__"></span>, 
      <span class="payoff player2 __fade6__ __under6__"></span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade7__ __under7__"></span>, 
      <span class="payoff player2 __fade8__ __under8__"></span>
    &nbsp;)</td>
  </tr>
</table>

---

<table>
  <tr class="game action player2"> 
    <td></td>
    <td><span class="__underp21__">Homer Aciona</span></td>
    <td><span class="__underp22__">Homer Espera</span></td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 100px;"><span class="__underp11__">Bart Aciona</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade1__ __under1__">1/3</span>, 
      <span class="payoff player2 __fade2__ __under2__">2/3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade3__ __under3__">0</span>, 
      <span class="payoff player2 __fade4__ __under4__">1</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="__underp12__">Bart Espera</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade5__ __under5__"></span>, 
      <span class="payoff player2 __fade6__ __under6__"></span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade7__ __under7__"></span>, 
      <span class="payoff player2 __fade8__ __under8__"></span>
    &nbsp;)</td>
  </tr>
</table>

---

<table>
  <tr class="game action player2"> 
    <td></td>
    <td><span class="__underp21__">Homer Aciona</span></td>
    <td><span class="__underp22__">Homer Espera</span></td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 100px;"><span class="__underp11__">Bart Aciona</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade1__ __under1__">1/3</span>, 
      <span class="payoff player2 __fade2__ __under2__">2/3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade3__ __under3__">0</span>, 
      <span class="payoff player2 __fade4__ __under4__">1</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="__underp12__">Bart Espera</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade5__ __under5__">2/3</span>, 
      <span class="payoff player2 __fade6__ __under6__">1/3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade7__ __under7__"></span>, 
      <span class="payoff player2 __fade8__ __under8__"></span>
    &nbsp;)</td>
  </tr>
</table>

---

<table>
  <tr class="game action player2"> 
    <td></td>
    <td><span class="__underp21__">Homer Aciona</span></td>
    <td><span class="__underp22__">Homer Espera</span></td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 100px;"><span class="__underp11__">Bart Aciona</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade1__ __under1__">1/3</span>, 
      <span class="payoff player2 __fade2__ __under2__">2/3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade3__ __under3__">0</span>, 
      <span class="payoff player2 __fade4__ __under4__">1</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="__underp12__">Bart Espera</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade5__ __under5__">2/3</span>, 
      <span class="payoff player2 __fade6__ __under6__">1/3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade7__ __under7__">0</span>, 
      <span class="payoff player2 __fade8__ __under8__">0</span>
    &nbsp;)</td>
  </tr>
</table>

---

<table>
  <tr class="game action player2"> 
    <td></td>
    <td><span class="under">Homer Aciona</span></td>
    <td><span class="__underp22__">Homer Espera</span></td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 100px;"><span class="__underp11__">Bart Aciona</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade1__ __under1__">1/3</span>, 
      <span class="payoff player2 __fade2__ __under2__">2/3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade3__ under">0</span>, 
      <span class="payoff player2 __fade4__ under">1</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="under">Bart Espera</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade5__ under">2/3</span>, 
      <span class="payoff player2 __fade6__ under">1/3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade7__ under">0</span>, 
      <span class="payoff player2 __fade8__ __under8__">0</span>
    &nbsp;)</td>
  </tr>
</table>

<br>

#### **Solução: (Espera, Aciona)**

---

## Jogo dos Porquinhos

- Caráter contra-intuitivo das interações estratégicas
  - Nem sempre o mais forte está em vantagem
  - Não ter opção pode ser uma vantagem estratégica relevante
  - Importante lição para o Direito e para a Regulação (assimetrias de poder nem sempre funcionam como se supõe)


---

![bg](nofooter_bg.png)

![](arvore_2.003.jpeg)

---

## Segunda versão do jogo da fiscalização
- Empresa:
  - Cumprimento integral
  - Cumprimento parcial
  - Descumprimento
- Regulador
  - Fiscalização branda (5%): (custa 200 mil)
  - Fiscalização moderada (10%): (custa 700 mil)
  - Fiscalização alta (20%): (custa 2,4 milhões)

---

![bg](nofooter_bg.png)

<table style="line-height: 120%;">
  <tr class="game action player2"> 
    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
    <td>Fisc. Branda</td>
    <td>Fisc. Moderada</td>
    <td>Fisc. Alta</span></td>
  </tr>
  <tr>
    <td class="game action player1"><br>Cumprir Integralmente<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade__ __under__">-3</span>, 
      <span class="payoff player2 __fade__ __under__">-0,2</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade__ __under__">-3</span>, 
      <span class="payoff player2 __fade__ __under__">-0,7</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade__ __under__">-3</span>, 
      <span class="payoff player2 __fade__ __under__">-2,4</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><br>Cumprir Parcialmente<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade__ __under__">-1,75</span>, 
      <span class="payoff player2 __fade__ __under__">0,5</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade__ __under__">-2,5</span>, 
      <span class="payoff player2 __fade__ __under__">0,8</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade__ __under__">-4</span>, 
      <span class="payoff player2 __fade__ __under__">0,6</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><br><span class="__under__">Descumprir</span><br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade__ __under__">-1,35</span>, 
      <span class="payoff player2 __fade__ __under__">1,15</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade__ __under__">-2,7</span>, 
      <span class="payoff player2 __fade__ __under__">2</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade__ __under__">-5,4</span>, 
      <span class="payoff player2 __fade__ __under__">3</span>
    &nbsp;)</td>
  </tr>
</table>

---

![bg](nofooter_bg.png)

<table style="line-height: 120%;">
  <tr class="game action player2"> 
    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
    <td>Fisc. Branda</td>
    <td>Fisc. Moderada</td>
    <td>Fisc. Alta</span></td>
  </tr>
  <tr>
    <td class="game action player1"><br>Cumprir Integralmente<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade__ __under__">-3</span>, 
      <span class="payoff player2 __fade__ under">-0,2</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade__ __under__">-3</span>, 
      <span class="payoff player2 __fade__ __under__">-0,7</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade__ under">-3</span>, 
      <span class="payoff player2 __fade__ __under__">-2,4</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><br>Cumprir Parcialmente<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade__ __under__">-1,75</span>, 
      <span class="payoff player2 __fade__ __under__">0,5</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade__ under">-2,5</span>, 
      <span class="payoff player2 __fade__ under">0,8</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade__ __under__">-4</span>, 
      <span class="payoff player2 __fade__ __under__">0,6</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><br><span class="__under__">Descumprir</span><br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade__ under">-1,35</span>, 
      <span class="payoff player2 __fade__ __under__">1,15</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade__ __under__">-2,7</span>, 
      <span class="payoff player2 __fade__ __under__">2</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade__ __under__">-5,4</span>, 
      <span class="payoff player2 __fade__ under">3</span>
    &nbsp;)</td>
  </tr>
</table>

---

## Dilema dos prisioneiros e o problema da cooperação

- Apresentação do dilema dos prisioneiros
  - Implicações econômicas e regulatórias
- Axelrod: condições para a cooperação
  - Dilema dos prisioneiros repetitivo
  - Tit for tat
    - Exemplo da cooperação na 1ª GM
  - Experimento de Axelrod

---

## Problema da cooperação

- Jogos clássicos:
  - Jogo de Coordenação Pura
  - Jogo da Batalha dos Amigos
  - Jogo da Caça ao Veado
  - Jogo dos Gaviões e dos Pombos
- Para cada jogo: apresentação, solução, implicações jurídicas e regulatórias

---

## Terceira formulação do Jogo da Fiscalização

- Análise de cada trecho
  - Empresa cumpre ou descumpre
  - Regulador fiscaliza ou não fiscaliza
- Valores:
  - Custo da Multa: 150
  - Custo de cumprimento por trecho: 15
  - Custo de fiscalização por trecho: 20

---

<table>
  <tr class="game action player2"> 
    <td></td>
    <td><span class="__underp21__">Fiscaliza</span></td>
    <td><span class="__underp22__">Não Fiscaliza</span></td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 100px;"><span class="__underp11__">Cumprir</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade1__ __under1__">-15</span>, 
      <span class="payoff player2 __fade2__ __under2__">-20</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade3__ __under3__">-15</span>, 
      <span class="payoff player2 __fade4__ __under4__">0</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="__underp12__">Descumprir</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade5__ __under5__">-150</span>, 
      <span class="payoff player2 __fade6__ __under6__">130</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade7__ __under7__">0</span>, 
      <span class="payoff player2 __fade8__ __under8__">0</span>
    &nbsp;)</td>
  </tr>
</table>

---

<table>
  <tr class="game action player2"> 
    <td></td>
    <td><span class="__underp21__">Fiscaliza</span></td>
    <td><span class="__underp22__">Não Fiscaliza</span></td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 100px;"><span class="__underp11__">Cumprir</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade1__ under">-15</span>, 
      <span class="payoff player2 __fade2__ __under2__">-20</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade3__ __under3__">-15</span>, 
      <span class="payoff player2 __fade4__ under">0</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="__underp12__">Descumprir</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade5__ __under5__">-150</span>, 
      <span class="payoff player2 __fade6__ under">130</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade7__ under">0</span>, 
      <span class="payoff player2 __fade8__ __under8__">0</span>
    &nbsp;)</td>
  </tr>
</table>

---

## Análise da estratégia da empresa
- Escolhe a probabilidade de cumprir ($p$) de forma que, para o regulador, o valor esperado de fiscalizar ($E_{F}$) seja igual ao valor esperado de não fiscalizar ($E_{NF}$).
* $(1 - p) = \textrm{probabilidade de descumprir}$
<br>

* $E_{F} = -20p + 130(1 - p) = 130 - 150p$
* $E_{NF} = 0$
* $E_{F} = E_{NF} \implies 130 - 150p = 0 \implies p = \frac{130}{150} \approx 86\%$

---

## Análise da estratégia do regulador
- Escolhe a probabilidade de fiscalizar ($q$) de forma que, para a empresa, o valor esperado de cumprir ($E_C$) seja igual ao valor esperado de descumprir ($E_{D}$).
* $(1 - q_{dp}) = \textrm{probabilidade de defender a corrida}$
<br>

* $E_{C} = -15$
* $E_{D} = -150q$
* $E_{C} = E_{D} \implies - 15 = -150q + 1 \implies q = \frac{15}{150} = 10\%$

---

<table>
  <tr class="game action player2"> 
    <td></td>
    <td><span class="__underp21__">Fiscaliza</span></td>
    <td><span class="__underp22__">Não Fiscaliza</span></td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 100px;"><span class="__underp11__">Cumprir</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade1__ under">-15</span>, 
      <span class="payoff player2 __fade2__ __under2__">-20</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade3__ __under3__">-15</span>, 
      <span class="payoff player2 __fade4__ under">0</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="__underp12__">Descumprir</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade5__ __under5__">-150</span>, 
      <span class="payoff player2 __fade6__ under">130</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 __fade7__ under">0</span>, 
      <span class="payoff player2 __fade8__ __under8__">0</span>
    &nbsp;)</td>
  </tr>
</table>

<br>

#### Solução (equilíbrio em estratégias mistas):

#### **Empresa cumpre em cerca de 86% dos trechos**
#### **Regulador fiscaliza 10% dos trechos**

---


<div class="columns">

<div>

## Capítulo 5

- Caso guia: Risco Moral

</div>

<div>

![](credito.001.png)

</div>
</div>
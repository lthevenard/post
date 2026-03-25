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

# Aula 6 – Introdução à Teoria dos Jogos 
**Teoria da Decisão – 2026.1**
Lucas Thevenard

---
<!-- 
paginate: true 
header: Aula 6 – Introdução à Teoria dos Jogos
footer: lucas.gomes@fgv.br | 31/03/2026
-->


![bg](section_bg.png)

# 1. Críticas aos modelos de decisão sob condição de ignorância

---

## Quais são os principais problemas do método Maximin?

---


## Maximin
- Método extremamente conservador.
- Impede a consideração das melhores oportunidades de ganho.
- Não considera todas as alternativas.

<br>
<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 10rem;">
<div>

__ | EDM1 | EDM2 
---|:----:|:----:
A  | 1.5  | 1.75      
B  | 1    | 900      

</div>
<div>

__ | EDM1 | EDM2 | EDM3 | ... | EDM99 | EDM100
---|:----:|:----:|:----:|:---:|:-----:|:------:
A  | 10   | 10   | 10   | ... | 10    | 10
B  | 9    | 20   | 20   | ... | 20    | 20

</div>
</div>

---

## Quais são os principais problemas do método Minimax?

---

## Minimax
- Ao contrário do maximin, neste método pode haver influência excessiva de alternativas melhores
<br>


<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 10rem;">
<div>

__ | EDM1 | EDM2 
---|:----:|:----:
A  | 300  | 300      
B  | -100 | 900      

</div>
<div>

__ | EDM1 | EDM2 | EDM3 | ... | EDM99 | EDM100
---|:----:|:----:|:----:|:---:|:-----:|:------:
A  | 10   | 10   | 10   | ... | 10    | 10
B  | 20   | 5    | 5    | ... | 5     | 5

</div>
</div>

---

## Minimax
- Permutações dos mesmos resultados de uma alternativa de decisão entre os Estados do mundo podem levar a soluções diferentes.
<br>

<div class="columns">
<div>

__ | EDM1 | EDM2 | EDM3
---|:----:|:----:|:----:
A  |  0   | 1    | 3
B  |  0   | 1    | 3
C  |  3   | 0    | 1


</div>
<div>

EDM1 | EDM2 | EDM3
:---:|:----:|:----:
3    | 0    | 0
3    | 0    | 0
0    | 1    | 2


</div>
</div>


---

- A inclusão de uma alternativa que não é escolhida pode mudar a solução do problema.

<div class="columns">
<div>

__ | EDM1 | EDM2 | EDM3
---|:----:|:----:|:----:
A  | 0    | 10   | 4 
B  | 5    | 2    | 10

<br>

__ | EDM1 | EDM2 | EDM3
---|:----:|:----:|:----:
A  | 0    | 10   | 4 
B  | 5    | 2    | 10
C  | 10   | 5    | 1

</div>
<div>

EDM1 | EDM2 | EDM3
:---:|:----:|:----:
5    | 0    | 6
0    | 8    | 0

<br>

EDM1 | EDM2 | EDM3
:---:|:----:|:----:
10   | 0    | 6
5    | 8    | 0
0    | 5    | 9

</div>
</div>

---

## Minimax
- Ao contrário do maximin, neste método pode haver influência excessiva de alternativas melhores
- Permutações dos mesmos resultados de uma alternativa de decisão entre os Estados do mundo podem levar a soluções diferentes.
- A inclusão de uma alternativa que não é escolhida pode mudar a solução do problema.

---

## Quais são os principais problemas da Regra do Otimismo?

---


## Regra do Otimismo
- Necessidade de escolher o nível de otimismo (arbitrário).
- Considera apenas parte das opções.
- Pode se reverter em max-max ou maxmin:
  - Quando adotamos níveis de otimismo 1 ou 0;
  - Quando as melhores alternativas ou as piores são idênticas

<br>
<div class="columns">
<div>

__ | EDM1 | EDM2 | EDM3 | EDM4
---|:----:|:----:|:----:|:----:
A  | 0    | 1    | 1    | 11
B  | 0    | 10   | 10   | 10


</div>
<div>

__ | EDM1 | EDM2 | EDM3 | EDM4
---|:----:|:----:|:----:|:----:
A  | 10   | 9    | 9    | 1
B  | 10   | 2    | 2    | 2
</div>
</div>

---

## Quais são os principais problemas do Postulado da Razão Insuficiente?

---

## Postulado da Razão Insuficiente
- Presunção de que as alternativas são equiprováveis.
- Presume neutralidade entre os cenários equiprováveis: pode ser um tratamento inadequado de riscos muito altos.
<br>

__ | EDM1 | EDM2 | EDM3
---|:----:|:----:|:----:
A  | -200 | 150  | 150
B  | 0    | 45   | 45


---

## Conclusão geral sobre métodos de decisão racional sob condições de ignorância
* Todos os métodos enfrentam limitações.
  - Para utilizá-los é necessário entender qual método melhor se aplica ao problema analisado.
  - Sistema de votação dos métodos não funciona (pode incorrer no mesmo problema indicado por Arrow).

---

### Paradoxo de condorcet na composição de métodos

#### Vamos considerar, no exemplo a seguir, como os três métodos ordenariam as alternativas, tomadas duas a duas (considerando um nível de otimismo de 0,5).
<br>

<div class="columns">
<div>

__ | EDM1 | EDM2 | EDM3
---|:----:|:----:|:----:
A  | 1    | 14   | 13
B  | -1   | 17   | 11
C  | 0    | 20   | 6

</div>
<div>

Método   | A vs. B | B vs. C | A vs. C
---------|:-------:|:-------:|:----:
Maximin  | A       | C       | A
Minimax  | B       | B       | A
Otimismo | B       | C       | C

</div>
</div>
<br>
<div style = "margin: auto;">

Chegamos a a um resultado que viola a transitividade, pois: $C \succ B \succ A \succ C$
</div>

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

---

## Conclusão geral sobre métodos de decisão racional sob condições de ignorância
- Todos os métodos enfrentam limitações.
  - Para utilizá-los é necessário entender qual método melhor se aplica ao problema analisado.
  - Sistema de votação dos métodos não funciona (pode incorrer no mesmo problema indicado por Arrow).
* Limites de racionalidade em casos de ignorância profunda.
  - Método maximin é o único que admite uma escala ordinal de preferências.
  - Problema das experiências transformativas não tem solução na literatura.


---

![bg](section_bg.png)

# 2. Introdução ao conceito de Jogos

---

## O que é um jogo?
* Interação estratégica entre os jogadores.
* Conceito de estratégia: antecipar ações/decisões alheias.
* Qual é a aplicabilidade desse conceito a fenômenos sociais e jurídicos?

---

## Formalização de um jogo
- Elementos estruturais mínimos
  - Jogadores
  - Estratégias (cursos de ação ou ‘jogadas')
  - Payoffs (para cada jogador e cada combinação de jogadas)

---

### Vamos Jogar: o jogo dos porquinhos

---

### Vamos Jogar: o jogo dos porquinhos

<div style="display: grid; grid-template-columns: 320px 210px 600px;">
<div>
<br>

![w:310](porquinhos.png)
</div>
<div style="margin: auto 30px auto auto;">
<br><br>
<h2 style="color: #058ED0">Bart</h2>
</div>
<div style = "margin-right: auto;">
<h3 style="color: #003E7E">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Homer</h3>

<table>

  <tr class="game action player2"> 
    <td></td>
    <td>Aciona</td>
    <td>Espera</td>
  </tr>
  <tr>
    <td class="game action player1"><br>Aciona<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">1/3</span>, 
      <span class="payoff player2">2/3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2">1</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><br>Espera<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">2/3</span>, 
      <span class="payoff player2">1/3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
  </tr>

</table>
</div>
</div>

---

### Solução: jogo dos porquinhos

<div style="display: grid; grid-template-columns: 320px 210px 600px;">
<div>
<br>

![w:310](porquinhos.png)
</div>
<div style="margin: auto 30px auto auto;">
<br><br>
<h2 style="color: #058ED0">Bart</h2>
</div>
<div style = "margin-right: auto;">
<h3 style="color: #003E7E">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Homer</h3>

<table>

  <tr class="game action player2"> 
    <td></td>
    <td>Aciona</td>
    <td>Espera</td>
  </tr>
  <tr>
    <td class="game action player1"><br>Aciona<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">1/3</span>, 
      <span class="payoff player2 fade">2/3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">0</span>, 
      <span class="payoff player2 fade">1</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><br>Espera<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">2/3</span>, 
      <span class="payoff player2 fade">1/3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">0</span>, 
      <span class="payoff player2 fade">0</span>
    &nbsp;)</td>
  </tr>

</table>
</div>
</div>

---

### Solução: jogo dos porquinhos

<div style="display: grid; grid-template-columns: 320px 210px 600px;">
<div>
<br>

![w:310](porquinhos.png)
</div>
<div style="margin: auto 30px auto auto;">
<br><br>
<h2 style="color: #058ED0">Bart</h2>
</div>
<div style = "margin-right: auto;">
<h3 style="color: #003E7E">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Homer</h3>

<table>

  <tr class="game action player2"> 
    <td></td>
    <td>Aciona</td>
    <td>Espera</td>
  </tr>
  <tr>
    <td class="game action player1"><br>Aciona<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">1/3</span>, 
      <span class="payoff player2 fade">2/3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2 fade">1</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><br>Espera<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">2/3</span>, 
      <span class="payoff player2 fade">1/3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">0</span>, 
      <span class="payoff player2 fade">0</span>
    &nbsp;)</td>
  </tr>

</table>
</div>
</div>

---

### Solução: jogo dos porquinhos

<div style="display: grid; grid-template-columns: 320px 210px 600px;">
<div>
<br>

![w:310](porquinhos.png)
</div>
<div style="margin: auto 30px auto auto;">
<br><br>
<h2 style="color: #058ED0">Bart</h2>
</div>
<div style = "margin-right: auto;">
<h3 style="color: #003E7E">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Homer</h3>

<table>

  <tr class="game action player2"> 
    <td></td>
    <td>Aciona</td>
    <td>Espera</td>
  </tr>
  <tr>
    <td class="game action player1"><br>Aciona<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">1/3</span>, 
      <span class="payoff player2">2/3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2">1</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><br><span class="under">Espera</span><br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">2/3</span>, 
      <span class="payoff player2">1/3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">0</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
  </tr>

</table>
</div>
</div>

---

### Solução: jogo dos porquinhos

<div style="display: grid; grid-template-columns: 320px 210px 600px;">
<div>
<br>

![w:310](porquinhos.png)
</div>
<div style="margin: auto 30px auto auto;">
<br><br>
<h2 style="color: #058ED0">Bart</h2>
</div>
<div style = "margin-right: auto;">
<h3 style="color: #003E7E">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Homer</h3>

<table>

  <tr class="game action player2"> 
    <td></td>
    <td><span class= "under">Aciona</span></td>
    <td>Espera</td>
  </tr>
  <tr>
    <td class="game action player1"><br>Aciona<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">1/3</span>, 
      <span class="payoff player2 fade">2/3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">0</span>, 
      <span class="payoff player2 fade">1</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><br><span class="under">Espera</span><br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">2/3</span>, 
      <span class="payoff player2 under">1/3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">0</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
  </tr>

</table>
</div>
</div>

---

### Solução: jogo dos porquinhos

<div style="display: grid; grid-template-columns: 320px 210px 600px;">
<div>
<br>

![w:310](porquinhos.png)
</div>
<div style="margin: auto 30px auto auto;">
<br><br>
<h2 style="color: #058ED0">Bart</h2>
</div>
<div style = "margin-right: auto;">
<h3 style="color: #003E7E">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Homer</h3>

<table>

  <tr class="game action player2"> 
    <td></td>
    <td><span class= "under">Aciona</span></td>
    <td>Espera</td>
  </tr>
  <tr>
    <td class="game action player1"><br>Aciona<br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">1/3</span>, 
      <span class="payoff player2">2/3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2">1</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><br><span class="under">Espera</span><br>&nbsp;</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">2/3</span>, 
      <span class="payoff player2 under">1/3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">0</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
  </tr>

</table>

<p style="margin: auto;"><b>Solução do Jogo</b>: (Espera, Aciona)</p>

</div>
</div>

---

## Solução do jogo dos porquinhos
- **Solução**: (Espera, Aciona)
  - <span class="under">Importante</span>: sempre indicamos a solução como um par de estratégias, na ordem dos jogadores (jogador 1 nas linhas, jogador 2 nas colunas).
* Interações estratégicas podem ter resultados contra-intuitivos:
  * Bart "vence" o jogo, apesar de ser o mais fraco,
  * Insights interessantes para interações sociais,
  * Falta de alternativas pode levar a vantagens estratégicas.

---

![bg](section_bg.png)

# 3. Primeiro método de solução: dominância

---

## Dominância
* **Estratégias dominadas**: aquelas que nunca são preferíveis às demais, independente das ações do outro jogador.
* **Estratégia dominante**: sempre oferece o melhor resultado, ou seja, única estratégia que não é dominada.
* **Níveis de dominância**:
  * <span class="under">Dominância forte ou estrita</span>: $A_i \succ B_i$, para todas as possíveis $i$ combinações de jogadas envolvendo $A$ e $B$.
  * <span class="under">Dominância fraca</span>: $A_i \succsim B_i$, para todas as possíveis $i$ combinações de jogadas envolvendo $A$ e $B$. 

---

### Exemplo 1: equilíbrio de estratégias dominantes
<br>
<table>

  <tr class="game action player2"> 
    <td></td>
    <td>C</td>
    <td>D</td>
  </tr>
  <tr>
    <td class="game action player1">A</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">4</span>, 
      <span class="payoff player2">2</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">6</span>, 
      <span class="payoff player2">3</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">B</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">2</span>, 
      <span class="payoff player2">4</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">5</span>, 
      <span class="payoff player2">5</span>
    &nbsp;)</td>
  </tr>

</table>

---

### Exemplo 1: equilíbrio de estratégias dominantes
<br>
<table>

  <tr class="game action player2"> 
    <td></td>
    <td>C</td>
    <td>D</td>
  </tr>
  <tr>
    <td class="game action player1">A</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">4</span>, 
      <span class="payoff player2 fade">2</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">6</span>, 
      <span class="payoff player2 fade">3</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">B</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">2</span>, 
      <span class="payoff player2 fade">4</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">5</span>, 
      <span class="payoff player2 fade">5</span>
    &nbsp;)</td>
  </tr>

</table>

---

### Exemplo 1: equilíbrio de estratégias dominantes
<br>
<table>

  <tr class="game action player2"> 
    <td></td>
    <td>C</td>
    <td>D</td>
  </tr>
  <tr>
    <td class="game action player1">A</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">4</span>, 
      <span class="payoff player2 fade">2</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">6</span>, 
      <span class="payoff player2 fade">3</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">B</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">2</span>, 
      <span class="payoff player2 fade">4</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">5</span>, 
      <span class="payoff player2 fade">5</span>
    &nbsp;)</td>
  </tr>

</table>

---

### Exemplo 1: equilíbrio de estratégias dominantes
<br>
<table>

  <tr class="game action player2"> 
    <td></td>
    <td>C</td>
    <td>D</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="under">A</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">4</span>, 
      <span class="payoff player2">2</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">6</span>, 
      <span class="payoff player2">3</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">B</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">2</span>, 
      <span class="payoff player2">4</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">5</span>, 
      <span class="payoff player2">5</span>
    &nbsp;)</td>
  </tr>
</table>

---

### Exemplo 1: equilíbrio de estratégias dominantes
<br>
<table>

  <tr class="game action player2"> 
    <td></td>
    <td>C</td>
    <td>D</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="under">A</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">4</span>, 
      <span class="payoff player2">2</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">6</span>, 
      <span class="payoff player2 under">3</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">B</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">2</span>, 
      <span class="payoff player2 fade">4</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">5</span>, 
      <span class="payoff player2 fade">5</span>
    &nbsp;)</td>
  </tr>
</table>

---

### Exemplo 1: equilíbrio de estratégias dominantes
<br>
<table>

  <tr class="game action player2"> 
    <td></td>
    <td>C</td>
    <td>D</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="under">A</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">4</span>, 
      <span class="payoff player2 fade">2</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">6</span>, 
      <span class="payoff player2 under fade">3</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">B</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">2</span>, 
      <span class="payoff player2 ">4</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">5</span>, 
      <span class="payoff player2 under">5</span>
    &nbsp;)</td>
  </tr>
</table>

---

### Exemplo 1: equilíbrio de estratégias dominantes
<br>
<table>

  <tr class="game action player2"> 
    <td></td>
    <td>C</td>
    <td><span class="under">D</span></td>
  </tr>
  <tr>
    <td class="game action player1"><span class="under">A</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">4</span>, 
      <span class="payoff player2">2</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">6</span>, 
      <span class="payoff player2 under">3</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">B</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">2</span>, 
      <span class="payoff player2 ">4</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">5</span>, 
      <span class="payoff player2 under">5</span>
    &nbsp;)</td>
  </tr>
</table>

#### Solução: **(A, D)**

---

## Método do equilíbrio de estratégias dominantes
- <span class="under">Solução</span>: **(A, D)**
- <span class="under">Método de solução</span>: Identificamos a estratégia dominante de um jogador, quando ela existe, e presumimos que ele certamente optará por ela.
  - Em alguns casos, todos os jogadores têm estratégias dominantes (equilíbrio de estratégias dominantes).
  - Em outros casos, solucionando o jogo para parte dos jogadores, conseguimos prever a melhor resposta dos demais.


---

### Exemplo 2: eliminação iterada de estratégias dominadas
<br>

<table style="line-height: 120%;">

  <tr class="game action player2"> 
    <td></td>
    <td>D</td>
    <td>E</td>
    <td>F</td>
  </tr>
  <tr>
    <td class="game action player1">A</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">13</span>, 
      <span class="payoff player2">3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">1</span>, 
      <span class="payoff player2">4</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">7</span>, 
      <span class="payoff player2">3</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">B</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">4</span>, 
      <span class="payoff player2">1</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">3</span>, 
      <span class="payoff player2">3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">6</span>, 
      <span class="payoff player2">2</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">C</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-1</span>, 
      <span class="payoff player2">9</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">2</span>, 
      <span class="payoff player2">8</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">8</span>, 
      <span class="payoff player2">-1</span>
    &nbsp;)</td>
  </tr>
</table>

---

### Exemplo 2: eliminação iterada de estratégias dominadas
<br>

<table style="line-height: 120%;">

  <tr class="game action player2"> 
    <td></td>
    <td>D</td>
    <td>E</td>
    <td>F</td>
  </tr>
  <tr>
    <td class="game action player1">A</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">13</span>, 
      <span class="payoff player2">3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">1</span>, 
      <span class="payoff player2 under">4</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">7</span>, 
      <span class="payoff player2">3</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">B</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">4</span>, 
      <span class="payoff player2 fade">1</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">3</span>, 
      <span class="payoff player2 fade">3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">6</span>, 
      <span class="payoff player2 fade">2</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">C</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">-1</span>, 
      <span class="payoff player2 fade">9</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">2</span>, 
      <span class="payoff player2 fade">8</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">8</span>, 
      <span class="payoff player2 fade">-1</span>
    &nbsp;)</td>
  </tr>
</table>

---

### Exemplo 2: eliminação iterada de estratégias dominadas
<br>

<table style="line-height: 120%;">

  <tr class="game action player2"> 
    <td></td>
    <td>D</td>
    <td>E</td>
    <td>F</td>
  </tr>
  <tr>
    <td class="game action player1">A</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">13</span>, 
      <span class="payoff player2 fade">3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">1</span>, 
      <span class="payoff player2 under fade">4</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">7</span>, 
      <span class="payoff player2 fade">3</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">B</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">4</span>, 
      <span class="payoff player2">1</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">3</span>, 
      <span class="payoff player2 under">3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">6</span>, 
      <span class="payoff player2">2</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">C</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">-1</span>, 
      <span class="payoff player2 fade">9</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">2</span>, 
      <span class="payoff player2 fade">8</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">8</span>, 
      <span class="payoff player2 fade">-1</span>
    &nbsp;)</td>
  </tr>
</table>

---

### Exemplo 2: eliminação iterada de estratégias dominadas
<br>

<table style="line-height: 120%;">

  <tr class="game action player2"> 
    <td></td>
    <td>D</td>
    <td>E</td>
    <td>F</td>
  </tr>
  <tr>
    <td class="game action player1">A</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">13</span>, 
      <span class="payoff player2 fade">3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">1</span>, 
      <span class="payoff player2 under fade">4</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">7</span>, 
      <span class="payoff player2 fade">3</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">B</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">4</span>, 
      <span class="payoff player2 fade">1</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">3</span>, 
      <span class="payoff player2 under fade">3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">6</span>, 
      <span class="payoff player2 fade">2</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">C</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">-1</span>, 
      <span class="payoff player2 under">9</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">2</span>, 
      <span class="payoff player2">8</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">8</span>, 
      <span class="payoff player2">-1</span>
    &nbsp;)</td>
  </tr>
</table>

---

### Exemplo 2: eliminação iterada de estratégias dominadas
<br>

<table style="line-height: 120%;">

  <tr class="game action player2"> 
    <td></td>
    <td>D</td>
    <td>E</td>
    <td>F</td>
  </tr>
  <tr>
    <td class="game action player1">A</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">13</span>, 
      <span class="payoff player2">3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">1</span>, 
      <span class="payoff player2 under">4</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">7</span>, 
      <span class="payoff player2">3</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">B</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">4</span>, 
      <span class="payoff player2">1</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">3</span>, 
      <span class="payoff player2 under">3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">6</span>, 
      <span class="payoff player2">2</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">C</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-1</span>, 
      <span class="payoff player2 under">9</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">2</span>, 
      <span class="payoff player2">8</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">8</span>, 
      <span class="payoff player2">-1</span>
    &nbsp;)</td>
  </tr>
</table>

---

### Exemplo 2: eliminação iterada de estratégias dominadas
<br>

<table style="line-height: 120%;">

  <tr class="game action player2"> 
    <td></td>
    <td>D</td>
    <td>E</td>
    <td class="eliminated">F</td>
  </tr>
  <tr>
    <td class="game action player1">A</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">13</span>, 
      <span class="payoff player2">3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">1</span>, 
      <span class="payoff player2 under">4</span>
    &nbsp;)</td>
    <td class="game eliminated">(&nbsp;
      <span class="payoff player1">7</span>, 
      <span class="payoff player2">3</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">B</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">4</span>, 
      <span class="payoff player2">1</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">3</span>, 
      <span class="payoff player2 under">3</span>
    &nbsp;)</td>
    <td class="game eliminated">(&nbsp;
      <span class="payoff player1">6</span>, 
      <span class="payoff player2">2</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">C</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-1</span>, 
      <span class="payoff player2 under">9</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">2</span>, 
      <span class="payoff player2">8</span>
    &nbsp;)</td>
    <td class="game eliminated">(&nbsp;
      <span class="payoff player1">8</span>, 
      <span class="payoff player2">-1</span>
    &nbsp;)</td>
  </tr>
</table>

---

### Exemplo 2: eliminação iterada de estratégias dominadas
<br>

<table style="line-height: 120%;">

  <tr class="game action player2"> 
    <td></td>
    <td>D</td>
    <td>E</td>
    <td class="eliminated">F</td>
  </tr>
  <tr>
    <td class="game action player1">A</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">13</span>, 
      <span class="payoff player2 fade">3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">1</span>, 
      <span class="payoff player2 under fade">4</span>
    &nbsp;)</td>
    <td class="game eliminated">(&nbsp;
      <span class="payoff player1">7</span>, 
      <span class="payoff player2">3</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">B</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">4</span>, 
      <span class="payoff player2 fade">1</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">3</span>, 
      <span class="payoff player2 under fade">3</span>
    &nbsp;)</td>
    <td class="game eliminated">(&nbsp;
      <span class="payoff player1">6</span>, 
      <span class="payoff player2">2</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">C</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-1</span>, 
      <span class="payoff player2 under fade">9</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">2</span>, 
      <span class="payoff player2 fade">8</span>
    &nbsp;)</td>
    <td class="game eliminated">(&nbsp;
      <span class="payoff player1">8</span>, 
      <span class="payoff player2">-1</span>
    &nbsp;)</td>
  </tr>
</table>

---

### Exemplo 2: eliminação iterada de estratégias dominadas
<br>

<table style="line-height: 120%;">

  <tr class="game action player2"> 
    <td></td>
    <td>D</td>
    <td>E</td>
    <td class="eliminated">F</td>
  </tr>
  <tr>
    <td class="game action player1">A</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">13</span>, 
      <span class="payoff player2 fade">3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 ">1</span>, 
      <span class="payoff player2 under fade">4</span>
    &nbsp;)</td>
    <td class="game eliminated">(&nbsp;
      <span class="payoff player1">7</span>, 
      <span class="payoff player2">3</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">B</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">4</span>, 
      <span class="payoff player2 fade">1</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">3</span>, 
      <span class="payoff player2 under fade">3</span>
    &nbsp;)</td>
    <td class="game eliminated">(&nbsp;
      <span class="payoff player1">6</span>, 
      <span class="payoff player2">2</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">C</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">-1</span>, 
      <span class="payoff player2 under fade">9</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">2</span>, 
      <span class="payoff player2 fade">8</span>
    &nbsp;)</td>
    <td class="game eliminated">(&nbsp;
      <span class="payoff player1">8</span>, 
      <span class="payoff player2">-1</span>
    &nbsp;)</td>
  </tr>
</table>

---

### Exemplo 2: eliminação iterada de estratégias dominadas
<br>

<table style="line-height: 120%;">

  <tr class="game action player2"> 
    <td></td>
    <td>D</td>
    <td>E</td>
    <td class="eliminated">F</td>
  </tr>
  <tr>
    <td class="game action player1">A</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">13</span>, 
      <span class="payoff player2">3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 ">1</span>, 
      <span class="payoff player2 under">4</span>
    &nbsp;)</td>
    <td class="game eliminated">(&nbsp;
      <span class="payoff player1">7</span>, 
      <span class="payoff player2">3</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">B</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">4</span>, 
      <span class="payoff player2">1</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">3</span>, 
      <span class="payoff player2 under">3</span>
    &nbsp;)</td>
    <td class="game eliminated">(&nbsp;
      <span class="payoff player1">6</span>, 
      <span class="payoff player2">2</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">C</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">-1</span>, 
      <span class="payoff player2 under">9</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">2</span>, 
      <span class="payoff player2">8</span>
    &nbsp;)</td>
    <td class="game eliminated">(&nbsp;
      <span class="payoff player1">8</span>, 
      <span class="payoff player2">-1</span>
    &nbsp;)</td>
  </tr>
</table>

---

### Exemplo 2: eliminação iterada de estratégias dominadas
<br>

<table style="line-height: 120%;">

  <tr class="game action player2"> 
    <td></td>
    <td>D</td>
    <td>E</td>
    <td class="eliminated">F</td>
  </tr>
  <tr>
    <td class="game action player1">A</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">13</span>, 
      <span class="payoff player2">3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 ">1</span>, 
      <span class="payoff player2 under">4</span>
    &nbsp;)</td>
    <td class="game eliminated">(&nbsp;
      <span class="payoff player1">7</span>, 
      <span class="payoff player2">3</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">B</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">4</span>, 
      <span class="payoff player2">1</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">3</span>, 
      <span class="payoff player2 under">3</span>
    &nbsp;)</td>
    <td class="game eliminated">(&nbsp;
      <span class="payoff player1">6</span>, 
      <span class="payoff player2">2</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1 eliminated">C</td>
    <td class="game eliminated">(&nbsp;
      <span class="payoff player1">-1</span>, 
      <span class="payoff player2 under">9</span>
    &nbsp;)</td>
    <td class="game eliminated">(&nbsp;
      <span class="payoff player1">2</span>, 
      <span class="payoff player2">8</span>
    &nbsp;)</td>
    <td class="game eliminated">(&nbsp;
      <span class="payoff player1">8</span>, 
      <span class="payoff player2">-1</span>
    &nbsp;)</td>
  </tr>
</table>

---

### Exemplo 2: eliminação iterada de estratégias dominadas
<br>

<table style="line-height: 120%;">

  <tr class="game action player2"> 
    <td></td>
    <td>D</td>
    <td>E</td>
    <td class="eliminated">F</td>
  </tr>
  <tr>
    <td class="game action player1">A</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">13</span>, 
      <span class="payoff player2">3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">1</span>, 
      <span class="payoff player2 under">4</span>
    &nbsp;)</td>
    <td class="game eliminated">(&nbsp;
      <span class="payoff player1">7</span>, 
      <span class="payoff player2">3</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">B</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">4</span>, 
      <span class="payoff player2">1</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">3</span>, 
      <span class="payoff player2 under">3</span>
    &nbsp;)</td>
    <td class="game eliminated">(&nbsp;
      <span class="payoff player1">6</span>, 
      <span class="payoff player2">2</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1 eliminated">C</td>
    <td class="game eliminated">(&nbsp;
      <span class="payoff player1">-1</span>, 
      <span class="payoff player2 under">9</span>
    &nbsp;)</td>
    <td class="game eliminated">(&nbsp;
      <span class="payoff player1">2</span>, 
      <span class="payoff player2">8</span>
    &nbsp;)</td>
    <td class="game eliminated">(&nbsp;
      <span class="payoff player1">8</span>, 
      <span class="payoff player2">-1</span>
    &nbsp;)</td>
  </tr>
</table>

---

### Exemplo 2: eliminação iterada de estratégias dominadas
<br>

<table style="line-height: 120%;">

  <tr class="game action player2"> 
    <td></td>
    <td class="eliminated">D</td>
    <td>E</td>
    <td class="eliminated">F</td>
  </tr>
  <tr>
    <td class="game action player1">A</td>
    <td class="game eliminated">(&nbsp;
      <span class="payoff player1 under">13</span>, 
      <span class="payoff player2">3</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">1</span>, 
      <span class="payoff player2 under">4</span>
    &nbsp;)</td>
    <td class="game eliminated">(&nbsp;
      <span class="payoff player1">7</span>, 
      <span class="payoff player2">3</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">B</td>
    <td class="game eliminated">(&nbsp;
      <span class="payoff player1">4</span>, 
      <span class="payoff player2">1</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">3</span>, 
      <span class="payoff player2 under">3</span>
    &nbsp;)</td>
    <td class="game eliminated">(&nbsp;
      <span class="payoff player1">6</span>, 
      <span class="payoff player2">2</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1 eliminated">C</td>
    <td class="game eliminated">(&nbsp;
      <span class="payoff player1">-1</span>, 
      <span class="payoff player2 under">9</span>
    &nbsp;)</td>
    <td class="game eliminated">(&nbsp;
      <span class="payoff player1">2</span>, 
      <span class="payoff player2">8</span>
    &nbsp;)</td>
    <td class="game eliminated">(&nbsp;
      <span class="payoff player1">8</span>, 
      <span class="payoff player2">-1</span>
    &nbsp;)</td>
  </tr>
</table>

---

### Exemplo 2: eliminação iterada de estratégias dominadas
<br>

<table style="line-height: 120%;">

  <tr class="game action player2"> 
    <td></td>
    <td class="eliminated">D</td>
    <td>E</td>
    <td class="eliminated">F</td>
  </tr>
  <tr>
    <td class="game action player1 eliminated">A</td>
    <td class="game eliminated">(&nbsp;
      <span class="payoff player1 under">13</span>, 
      <span class="payoff player2">3</span>
    &nbsp;)</td>
    <td class="game eliminated">(&nbsp;
      <span class="payoff player1">1</span>, 
      <span class="payoff player2 under">4</span>
    &nbsp;)</td>
    <td class="game eliminated">(&nbsp;
      <span class="payoff player1">7</span>, 
      <span class="payoff player2">3</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">B</td>
    <td class="game eliminated">(&nbsp;
      <span class="payoff player1">4</span>, 
      <span class="payoff player2">1</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">3</span>, 
      <span class="payoff player2 under">3</span>
    &nbsp;)</td>
    <td class="game eliminated">(&nbsp;
      <span class="payoff player1">6</span>, 
      <span class="payoff player2">2</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1 eliminated">C</td>
    <td class="game eliminated">(&nbsp;
      <span class="payoff player1">-1</span>, 
      <span class="payoff player2 under">9</span>
    &nbsp;)</td>
    <td class="game eliminated">(&nbsp;
      <span class="payoff player1">2</span>, 
      <span class="payoff player2">8</span>
    &nbsp;)</td>
    <td class="game eliminated">(&nbsp;
      <span class="payoff player1">8</span>, 
      <span class="payoff player2">-1</span>
    &nbsp;)</td>
  </tr>
</table>

#### Solução: **(B, E)**

---

## Método da eliminação iterada de estratégias dominadas
- <span class="under">Solução</span>: **(B, E)**
- <span class="under">Forma de solução</span>: Eliminamos gradualmente as estratégias de cada jogador que nunca seriam escolhidas.
- A cada passo descartamos as estratégias dominadas:
  - Se o jogador 1 tem uma estratégia dominada, eliminamos a respectiva linha.
  - Se o jogador 2 tem uma estratégia dominada, eliminamos a respectiva coluna.
  - Repetimos o processo até sobrar apenas um par de estratégias.

---

![bg](section_bg.png)

# 4. Segundo método de solução: equilíbrio de Nash

---

### A solução por dominância nem sempre é suficiente
<br>
<table>
  <tr class="game action player2"> 
    <td></td>
    <td>C</td>
    <td>D</td>
  </tr>
  <tr>
    <td class="game action player1">A</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">1</span>, 
      <span class="payoff player2">1</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">B</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">1</span>, 
      <span class="payoff player2">1</span>
    &nbsp;)</td>
  </tr>
</table>

---

## Equilíbrio de Nash
* Dados dois jogadores A e B dizemos que a combinação de estratégias (a, b) desses jogadores, respectivamente, é um “equilíbrio de Nash” se 'a' é a melhor resposta do Jogador A à estratégia ‘b' do Jogador B, ao mesmo tempo em que ‘b' é a melhor resposta do Jogador B à estratégia ‘a' do Jogador A.
  * Cada jogador dá sua melhor resposta à jogada do outro.
  * Pode haver mais de um equilíbrio de Nash em um mesmo jogo.
  * Qualquer jogo finito tem ao menos um equilíbrio de Nash (que pode ser em estratégias mistas).

---

### 1.A) Jogo da Licitação

<br>
<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Empresa A</b>
</div>
<div>
<div style="margin: 0 10px 30px 300px;"><b style="color: #003E7E; text-align: center;">Empresa B</b></div>
<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Oferta Alta</td>
    <td>Oferta Baixa</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Oferta Alta</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">12</span>, 
      <span class="payoff player2">12</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2">18</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Oferta Baixa</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">18</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">8</span>, 
      <span class="payoff player2">8</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### 1.A) Jogo da Licitação

<br>
<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Empresa A</b>
</div>
<div>
<div style="margin: 0 10px 30px 300px;"><b style="color: #003E7E; text-align: center;">Empresa B</b></div>
<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Oferta Alta</td>
    <td>Oferta Baixa</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Oferta Alta</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">12</span>, 
      <span class="payoff player2 fade">12</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">0</span>, 
      <span class="payoff player2 fade">18</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Oferta Baixa</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">18</span>, 
      <span class="payoff player2 fade">0</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">8</span>, 
      <span class="payoff player2 fade">8</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### 1.A) Jogo da Licitação

<br>
<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Empresa A</b>
</div>
<div>
<div style="margin: 0 10px 30px 300px;"><b style="color: #003E7E; text-align: center;">Empresa B</b></div>
<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Oferta Alta</td>
    <td>Oferta Baixa</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Oferta Alta</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">12</span>, 
      <span class="payoff player2 fade">12</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2 fade">18</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Oferta Baixa</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">18</span>, 
      <span class="payoff player2 fade">0</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">8</span>, 
      <span class="payoff player2 fade">8</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### 1.A) Jogo da Licitação

<br>
<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Empresa A</b>
</div>
<div>
<div style="margin: 0 10px 30px 300px;"><b style="color: #003E7E; text-align: center;">Empresa B</b></div>
<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Oferta Alta</td>
    <td>Oferta Baixa</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Oferta Alta</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">12</span>, 
      <span class="payoff player2">12</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2">18</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="under">Oferta Baixa</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">18</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">8</span>, 
      <span class="payoff player2">8</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### 1.A) Jogo da Licitação

<br>
<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Empresa A</b>
</div>
<div>
<div style="margin: 0 10px 30px 300px;"><b style="color: #003E7E; text-align: center;">Empresa B</b></div>
<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Oferta Alta</td>
    <td>Oferta Baixa</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Oferta Alta</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">12</span>, 
      <span class="payoff player2">12</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">0</span>, 
      <span class="payoff player2 under">18</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="under">Oferta Baixa</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">18</span>, 
      <span class="payoff player2 fade">0</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">8</span>, 
      <span class="payoff player2 fade">8</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### 1.A) Jogo da Licitação

<br>
<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Empresa A</b>
</div>
<div>
<div style="margin: 0 10px 30px 300px;"><b style="color: #003E7E; text-align: center;">Empresa B</b></div>
<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Oferta Alta</td>
    <td>Oferta Baixa</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Oferta Alta</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">12</span>, 
      <span class="payoff player2 fade">12</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">0</span>, 
      <span class="payoff player2 under fade">18</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="under">Oferta Baixa</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">18</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">8</span>, 
      <span class="payoff player2 under">8</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### 1.A) Jogo da Licitação

<br>
<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Empresa A</b>
</div>
<div>
<div style="margin: 0 10px 30px 300px;"><b style="color: #003E7E; text-align: center;">Empresa B</b></div>
<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Oferta Alta</td>
    <td><span class="under">Oferta Baixa</span></td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Oferta Alta</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">12</span>, 
      <span class="payoff player2">12</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2 under">18</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="under">Oferta Baixa</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">18</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">8</span>, 
      <span class="payoff player2 under">8</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### 1.A) Jogo da Licitação

<br>
<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Empresa A</b>
</div>
<div>
<div style="margin: 0 10px 30px 300px;"><b style="color: #003E7E; text-align: center;">Empresa B</b></div>
<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Oferta Alta</td>
    <td><span class="under">Oferta Baixa</span></td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 180px;">Oferta Alta</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">12</span>, 
      <span class="payoff player2">12</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">0</span>, 
      <span class="payoff player2 under">18</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="under">Oferta Baixa</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">18</span>, 
      <span class="payoff player2">0</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">8</span>, 
      <span class="payoff player2 under">8</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

#### Solução do Jogo: **(Oferta Baixa, Oferta Baixa)**

---

### 1.B) Jogo das Aparências

<br>
<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Pedro</b>
</div>
<div>
<div style="margin: 0 10px 30px 420px;"><b style="color: #003E7E; text-align: center;">João</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Investe Menos</td>
    <td>Investe Mais</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 200px;">Investe Menos</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">84</span>, 
      <span class="payoff player2">84</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">40</span>, 
      <span class="payoff player2">100</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Investe Mais</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">100</span>, 
      <span class="payoff player2">40</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">60</span>, 
      <span class="payoff player2">60</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### 1.B) Jogo das Aparências

<br>
<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Pedro</b>
</div>
<div>
<div style="margin: 0 10px 30px 420px;"><b style="color: #003E7E; text-align: center;">João</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Investe Menos</td>
    <td>Investe Mais</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 200px;">Investe Menos</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">84</span>, 
      <span class="payoff player2 fade">84</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">40</span>, 
      <span class="payoff player2 fade">100</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Investe Mais</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">100</span>, 
      <span class="payoff player2 fade">40</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">60</span>, 
      <span class="payoff player2 fade">60</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### 1.B) Jogo das Aparências

<br>
<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Pedro</b>
</div>
<div>
<div style="margin: 0 10px 30px 420px;"><b style="color: #003E7E; text-align: center;">João</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Investe Menos</td>
    <td>Investe Mais</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 200px;">Investe Menos</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">84</span>, 
      <span class="payoff player2 fade">84</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">40</span>, 
      <span class="payoff player2 fade">100</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1">Investe Mais</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">100</span>, 
      <span class="payoff player2 fade">40</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">60</span>, 
      <span class="payoff player2 fade">60</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### 1.B) Jogo das Aparências

<br>
<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Pedro</b>
</div>
<div>
<div style="margin: 0 10px 30px 420px;"><b style="color: #003E7E; text-align: center;">João</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Investe Menos</td>
    <td>Investe Mais</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 200px;">Investe Menos</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">84</span>, 
      <span class="payoff player2">84</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">40</span>, 
      <span class="payoff player2">100</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="under">Investe Mais</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">100</span>, 
      <span class="payoff player2">40</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">60</span>, 
      <span class="payoff player2">60</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### 1.B) Jogo das Aparências

<br>
<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Pedro</b>
</div>
<div>
<div style="margin: 0 10px 30px 420px;"><b style="color: #003E7E; text-align: center;">João</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Investe Menos</td>
    <td>Investe Mais</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 200px;">Investe Menos</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">84</span>, 
      <span class="payoff player2">84</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">40</span>, 
      <span class="payoff player2">100</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="under">Investe Mais</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">100</span>, 
      <span class="payoff player2">40</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">60</span>, 
      <span class="payoff player2">60</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### 1.B) Jogo das Aparências

<br>
<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Pedro</b>
</div>
<div>
<div style="margin: 0 10px 30px 420px;"><b style="color: #003E7E; text-align: center;">João</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Investe Menos</td>
    <td>Investe Mais</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 200px;">Investe Menos</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">84</span>, 
      <span class="payoff player2">84</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">40</span>, 
      <span class="payoff player2 under">100</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="under">Investe Mais</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">100</span>, 
      <span class="payoff player2 fade">40</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">60</span>, 
      <span class="payoff player2 fade">60</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### 1.B) Jogo das Aparências

<br>
<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Pedro</b>
</div>
<div>
<div style="margin: 0 10px 30px 420px;"><b style="color: #003E7E; text-align: center;">João</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Investe Menos</td>
    <td>Investe Mais</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 200px;">Investe Menos</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">84</span>, 
      <span class="payoff player2">84</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">40</span>, 
      <span class="payoff player2 under">100</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="under">Investe Mais</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">100</span>, 
      <span class="payoff player2 fade">40</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">60</span>, 
      <span class="payoff player2 fade">60</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### 1.B) Jogo das Aparências

<br>
<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Pedro</b>
</div>
<div>
<div style="margin: 0 10px 30px 420px;"><b style="color: #003E7E; text-align: center;">João</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Investe Menos</td>
    <td>Investe Mais</td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 200px;">Investe Menos</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">84</span>, 
      <span class="payoff player2 fade">84</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 fade">40</span>, 
      <span class="payoff player2 under fade">100</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="under">Investe Mais</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">100</span>, 
      <span class="payoff player2">40</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under fade">60</span>, 
      <span class="payoff player2 under">60</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### 1.B) Jogo das Aparências

<br>
<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Pedro</b>
</div>
<div>
<div style="margin: 0 10px 30px 420px;"><b style="color: #003E7E; text-align: center;">João</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Investe Menos</td>
    <td><span class="under">Investe Mais</span></td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 200px;">Investe Menos</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">84</span>, 
      <span class="payoff player2">84</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">40</span>, 
      <span class="payoff player2 under">100</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="under">Investe Mais</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">100</span>, 
      <span class="payoff player2">40</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">60</span>, 
      <span class="payoff player2 under">60</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

---

### 1.B) Jogo das Aparências

<br>
<div class="columns" style="grid-template-columns: auto auto auto auto; gap: 0.5rem;">
<div style="line-height: 200%; margin: 190px 0 auto auto;">
<b style="color: #058ED0;">Pedro</b>
</div>
<div>
<div style="margin: 0 10px 30px 420px;"><b style="color: #003E7E; text-align: center;">João</b></div>

<table>
  <tr class="game action player2"> 
    <td></td>
    <td>Investe Menos</td>
    <td><span class="under">Investe Mais</span></td>
  </tr>
  <tr>
    <td class="game action player1" style="width: 200px;">Investe Menos</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">84</span>, 
      <span class="payoff player2">84</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1">40</span>, 
      <span class="payoff player2 under">100</span>
    &nbsp;)</td>
  </tr>
  <tr>
    <td class="game action player1"><span class="under">Investe Mais</span></td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">100</span>, 
      <span class="payoff player2">40</span>
    &nbsp;)</td>
    <td class="game">(&nbsp;
      <span class="payoff player1 under">60</span>, 
      <span class="payoff player2 under">60</span>
    &nbsp;)</td>
  </tr>
</table>
</div>
</div>

#### Solução do Jogo: **(Investe Mais, Investe Mais)**

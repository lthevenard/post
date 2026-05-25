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

# Aula 9 – Jogos Sequenciais II
**Teoria da Decisão – 2026.1**
Lucas Thevenard

---
<!-- 
paginate: true 
header: Aula 9 – Jogos Sequenciais II
footer: lucas.gomes@fgv.br | 19/05/2026
-->


## Jogo da proposição e veto
* Opções do Congresso:
  * Enviar proposta apenas com a provisão A.
  * Enviar proposta apenas com a provisão B.
  * Enviar proposta com ambas as provisões, A + B.
  * Não enviar proposta nenhuma.
* Opções do Presidente:
  * Aprova totalmente a proposta enviada
  * Veta totalmente rejeita totalmente a proposta enviada.

---

![bg](nofooter_bg.png)

<div style="margin: auto;">

![w:680](veto.001.png)

---

![bg](nofooter_bg.png)

<div style="margin: auto;">

![w:680](veto.002.png)

---

![bg](nofooter_bg.png)

<div style="margin: auto;">

![w:680](veto.003.png)

---

![bg](nofooter_bg.png)

<div style="margin: auto;">

![w:680](veto.004.png)

---

![bg](nofooter_bg.png)

<div style="margin: auto;">

![w:680](veto.005.png)

---

![bg](nofooter_bg.png)

<div style="margin: auto;">

![w:680](veto.006.png)

---

![bg](nofooter_bg.png)

<div style="margin: auto;">

![w:680](veto.007.png)

---

![bg](nofooter_bg.png)

<div style="margin: auto;">

![w:680](veto.008.png)

---

![bg](nofooter_bg.png)

<div style="margin: auto;">

![w:680](veto.009.png)

---

## Jogo da proposição e veto
- Solução: **(A + B, Aprova)**
- Antecipando que a proposição A seria vetada pelo Presidente, o Congresso envia a proposta que contém tanto a proposição A como a proposição B.

---

## Conceitos
* Em jogos sequenciais, chamamos de "estratégia" a sequência de jogadas que descreve todo o percurso até um nodulo final do jogo (também chamado de nó terminal).
* A ideia de equilíbrio de Nash ainda pode ser aplicada: cada jogador está dando sua melhor resposta, dadas as respostas dos demais.
  * A melhor jogada do Presidente se o Congresso propõe A + B é aprovar, e a melhor jogada do Congresso se o Presidente aprova A + B é propor A + B.

---

## Veto parcial
* O que acontece se o presidente puder vetar parcialmente apenas a proposição de que não gosta?
  * Agora, quando o congresso propõe A + B o presidente pode também vetar apenas A ou apenas B.

---

![bg](nofooter_bg.png)

<div style="margin: auto;">

![w:680](veto.010.png)

---

![bg](nofooter_bg.png)

<div style="margin: auto;">

![w:680](veto.011.png)

---

![bg](nofooter_bg.png)

<div style="margin: auto;">

![w:680](veto.012.png)

---

![bg](nofooter_bg.png)

<div style="margin: auto;">

![w:680](veto.013.png)

---

![bg](nofooter_bg.png)

<div style="margin: auto;">

![w:680](veto.014.png)

---

![bg](nofooter_bg.png)

<div style="margin: auto;">

![w:680](veto.015.png)

---

![bg](nofooter_bg.png)

<div style="margin: auto;">

![w:680](veto.016.png)

---

![bg](nofooter_bg.png)

<div style="margin: auto;">

![w:680](veto.017.png)

---

![bg](nofooter_bg.png)

<div style="margin: auto;">

![w:680](veto.018.png)

---

## Jogo da proposição com veto parcial
- Solução: **{ (A, Veto), (Sem proposta) }**
- Antecipando que a proposição A + B resultaria em um veto parcial do Presidente, agora o Congresso prefere enviar proposta que contém apenas a proposição A (e que será vetada) ou não enviar proposta nenhuma.

---

<div style="margin: auto;">

![w:680](credito.001.png)


---

<div style="margin: auto;">

![w:680](credito.002.png)

---

<div style="margin: auto;">

![w:680](credito.003.png)

---

<div style="margin: auto;">

![w:680](credito.004.png)

---

<div style="margin: auto;">

![w:680](credito.005.png)

---

<div style="margin: auto;">

![w:680](credito.006.png)

---

<div style="margin: auto;">

![w:680](credito.007.png)

---

<div style="margin: auto;">

![w:680](credito.008.png)

---



<div style="display: flex; gap: 2rem;">

<div>

![w:680](credito.008.png)
</div>
<div style="line-height: 230%">
<br>

## Solução do Jogo 
- (Investe Baixo, Cumpre)
- É o ótimo de pareto?
  * Não! (2, 2) X (4, 3) 

</div>
</div>

---



<div style="display: flex; gap: 2rem;">

<div>
<br>

### Que problema é esse?

![w:1300](credito.008.png)
</div>
<div>
<br><br>

- O J1 quer incumbir o J2 de uma responsabilidade, mas teme que os incentivos de J2 o levem a desviar da solução mutuamente benéfica.


* J2 gostaria de convencer J1 a confiar em sua conduta, mas seus próprios incentivos estão em conflito com os interesses de J1.

* Esse problema espelha um conhecido conceito da AED. Que conceito é esse?

* **RISCO MORAL**

</div>
</div>

---

## Jogo do empréstimo e o problema do Risco Moral
* Relações de investimento e empréstimo (papel fundamental para a Economia).
* Relações do tipo Principal x Agente.
* Muitas aplicações jurídicas: 
  - Seguros e previdência, 
  - Direito Societário,
  - Licitações,
  - Representação política e funções estatais,
  - Etc.

---

## Jogo do empréstimo e o problema do Risco Moral
- Soluções possíveis?
  * Solução normativa (regulação).
  * Monitoramento e controle.
  * Redimensionamento dos payoffs (incentive design).
  * Garantias (commitment strategies).

---

## Garantias e comprometimento (commitment strategies)

<br>
<div style="display: flex; gap: 2rem;">
<div>

![w:700 drop-shadow](burn.webp)

</div>
<div>

* Episódios de “queima de navios” (William na invasão da Normandia,  Hernán Cortéz na invasão do novo mundo).
* Tentativa de exclusão voluntária de cursos de ação possíveis.
  - Novamente, ter menos opções de ação pode ser uma vantagem estratégica, como vimos com o jogo dos porquinhos.

</div>
</div>

---

## Garantias e comprometimento (commitment strategies)

<br>
<div style="display: flex; gap: 2rem;">
<div>

![w:400 drop-shadow](strangelove.jpg)

</div>
<div>

- Dr Strangelove (Dr. Fantástico): a máquina do fim do mundo (doomsday machine) soviética tinha uma falha.
* É preciso que a outra parte saiba. Sem o conhecimento da outra parte, não há nenhum sentido.
* Obs: em jogos com informação limitada, comprometimento pode ser utilizado como mecanismo de sinalização.

</div>
</div>

---

![bg](section_bg.png)

# 2. Jogo da Divisão do Bolo

---

<div style="margin: auto;">

![w:680](cake-cutting.007.png)

</div>

---

## Jogo da divisão do bolo (cake-cutting)
- Como dois jogadores podem dividir um bolo de forma que cada um fique com uma parte que considera pelo menos tão boa quanto a do outro?
* Conhecida regra do divisor e seletor.


---

<div style="margin: auto;">

![w:680](cake-cutting.001.png)

</div>

---


<div style="margin: auto;">

![w:680](cake-cutting.002.png)

</div>

---

<div style="margin: auto;">

![w:680](cake-cutting.003.png)

</div>

---

<div style="margin: auto;">

![w:680](cake-cutting.004.png)

</div>

---

<div style="margin: auto;">

![w:680](cake-cutting.005.png)

</div>

---

<div style="margin: auto;">

![w:680](cake-cutting.006.png)

</div>

----

## Jogo da divisão do bolo (cake-cutting)
- Resultado "equitativo" é atingido quando temos uma divisão entre 2 jogadores.
  - Resultado persistente mesmo quando os dois desejam tamanhos diferentes, ou o bolo tem 2 sabores e os jogadores preferem um sabor ao outro.
  * O que fazer se temos que dividir um bolo de forma proporcional entre 3 pessoas?

---

## O problema da divisão justa
- **Procedimento do último redutor** (last-diminisher)
  * Desafio de Hugo Steinhaus a Stefan Banach e Bronislaw Knaster.
  * Em 1947 eles propõem o procedimento do "último redutor", que é publicado por Steinhaus na Econometrica, no ano seguinte.
  * Primeiro jogo de divisão criado que satisfaz a condição de proporcionalidade para n jogadores.

---

## O problema da divisão justa
> Estando os parceiros dispostos como A, B, C,.. N, A corta do bolo uma parte do tamanho que quiser. B agora tem o direito, mas não a obrigação, de diminuir o pedaço cortado. Independentemente do que escolher, C terá também o direito (sem obrigação) de diminuir o pedaço (diminuído ou não), e assim por diante até N. A regra obriga o "último redutor" a ficar com o pedaço que ele tocou por último. Este parceiro sai do processo, e os restantes n−1 parceiros começam o jogo novamente com o restante do bolo. Quando o número de jogadores chega a 2, eles usam o procedimento tradicional.
> - STEINHAUS, Hugo. **The Problem of Fair Division**. Econometrica 16 (1), 1948, p. 102. (Tradução Própria)

---

## O problema da divisão justa
- Significados de "divisão justa" (Éric Pacuit):
  - **Proporcionalidade**: Cada jogador recebe pelo menos 1/n dos recursos, de acordo com suas respectivas estimativas de utilidade.
  - **Sem inveja**: Nenhum jogador está disposto a trocar sua alocação pela alocação de outro jogador.
  - **Equidade**: Cada jogador valoriza sua alocação tanto quanto as demais alocações, de acordo com sua própria função de utilidade.
  - **Eficiência**: Não há nenhuma outra alocação que melhor maximiza a utilidade coletiva.

---

## Para quem se interessar...
- Procedimentos de divisão proporcional
  - Banach-Knaster Last-diminisher
  - Dubin-Spanier Moving Knife
  - Steinhaus-Kuhn Lone Divider
- Procedimentos de divisão sem inveja
  - Selfridge-Conway Discrete Procedure
  - Stromquist Moving-Knives


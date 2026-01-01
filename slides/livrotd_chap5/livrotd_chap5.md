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

# Capítulo 5 – Jogos sequenciais, Incerteza, racionalidade e interações estratégicas
**2025.2**
Lucas Thevenard

---
<!-- 
paginate: true 
header: Capítulo 5 – Jogos sequenciais, Incerteza, racionalidade e interações estratégicas
footer: lucas.gomes@fgv.br | 11/11/2025
-->

## Tópicos

**5.1.** Responsabilidade do poluidor indireto

**5.2.** Risco moral em contratos de seguro

**5.2.1.** Aplicações regulatórias e jurídicas do problema do risco moral e suas soluções

**5.3.** Mais poder é sempre melhor? Alternativas que reduzem a utilidade do agente em jogos sequenciais

**5.3.1.** O jogo da votação

**5.3.** A divisão do bolo: o problema da repartição justa de recursos como jogo sequencial

---

## Tópicos

**5.4.** Jogos sob condição de incerteza 

**5.4.1.** Resolvendo jogos sob a hipótese de aversão à incerteza

**5.5.** Jogos sob condição de racionalidade limitada

**5.5.1.** Advinhe 2/3 da média

**5.5.1.1.** Aplicações reais: o concurso de beleza keynesiano e os mercados de ações

**5.5.2.** Jogo da Centopeia: por que a indução retroativa não descreve bem o comportamento humano?

**5.5.3.** Jogo de Ultimato

---

## 5.1. Responsabilidade do poluidor indireto

**Jogadores:**
- Instituição Financeira (IF)
- Empresa (E)

**Ordem dos movimentos:**
1. IF decide emprestar (ou não).
2. E decide adotar **precaução (P)** ou **não (N)**.
3. O projeto ocorre e danos são internalizados segundo o regime jurídico.

---


| Parâmetro | Valor | Descrição |
|------------|--------|-----------|
| K | 100 | Valor do empréstimo |
| R | 130 | Valor de retorno à IF |
| V | 180 | Retorno bruto do projeto |
| c | 20 | Custo de precaução |
| D | 80 | Dano sem precaução |
| d | 10 | Dano com precaução |

<br>

-  A precaução é **eficiente**: reduz o dano de 80 para 10 a um custo de 20

---

## Regime 1 – Sem responsabilidade do poluidor indireto

- **Passo 1**: a IF decide emprestar ou não.

- **Passo 2**: Se a IF empresta, E decide:
  - **P:** custo 20, evita dano de 80 → eficiente.
  - **N:** evita custo, mas paga dano.

### Payoffs

| Ação | E (empresa) | IF (financeira) |
|-------|---------------|----------------|
| P | 180 − 130 − 20 − 10 = **20** | 130 − 100 = **30** |
| N | 180 − 130 − 80 = **−30** | 130 − 100 = **30** |

---

![bg](nofooter_bg.png)

![](jog_seqs.001.jpeg)

---

## Regime 2 – Com responsabilidade do poluidor indireto

Agora o passo 2 afeta a a **IF**, que **responde pelo dano** causado pela empresa.

### Payoffs

| Ação | E (empresa) | IF (financeira) |
|-------|---------------|----------------|
| P | 180 − 130 − 20 = **30** | 130 − 100 − 10 = **20** |
| N | 180 − 130 = **50** | 130 − 100 − 80 = **−50** |

---

![bg](nofooter_bg.png)

![](jog_seqs.002.jpeg)

---

## Resultados do jogo

- A **transferência de responsabilidade** pode distorcer incentivos:  
  - Se E não internaliza o dano, não tem mais os mesmos incentivos para investir em precaução.  
  - A IF, antecipando esse resultado, elimina o crédito.
* **Intuição Regulatória**:
  - A responsabilização **bem intencionada** (proteger o meio ambiente), pode incorrer em problemas de **risco moral** e gerar **racionamento de crédito**.  
  - O problema surge **ex ante**, pela **mudança de incentivos**.
    - Mesmo projetos ambientalmente eficientes **não saem do papel**.

---

## 5.2. Risco moral em contratos de seguro

**Jogadores:**
- Seguradora (S)
- Segurado (G)

**Ordem dos movimentos:**
1. A seguradora decide: **cobertura parcial** ou **cobertura integral**.  
2. O segurado escolhe entre **alto esforço (H)** ou **baixo esforço (L)** para evitar sinistro.  
3. O evento ocorre e perdas são liquidadas.

---

### Parâmetros do jogo

| Parâmetro | Valor | Descrição |
|------------|--------|-----------|
| W | 200 | Riqueza inicial do segurado |
| L | 100 | Perda em caso de sinistro |
| c | 10 | Custo do esforço de precaução |
| p(H) | 0.16 | Probabilidade de sinistro com esforço |
| p(L) | 0.40 | Probabilidade de sinistro sem esforço |

---

### Alternativas de contrato

| Contrato | Descrição | Prêmio |
|-----------|------------|--------|
| **Cobertura integral** | A seguradora cobre 100% do dano | 35 |
| **Cobertura parcial** | A seguradora cobre 50%; o segurado arca com 50% | 30 |

---

## Cobertura integral

- A seguradora cobre **100% do dano**.

### Payoffs

| G | Custo (G) | Prob. sinistro | Riqueza esperada (G) | Payoff de S |
|---|-----------|----------------|----------------------|-------------|
| H | 10 + 35 = 45 | 16% | 200 − 45 = **155** | 35 - 16 = **19** |
| L | 0 + 35 = 35 | 40% | 200 − 35 = **165** | 35 - 40 = **-5** |


---

## Cobertura parcial

- A seguradora cobre **50% do dano** (segurado paga franquia de 50).

### Payoffs

| G | Custo (G) | Prob. sinistro | Riqueza esperada (G) | Payoff de S     |
|---|-----------|----------------|----------------------|-----------------|
| H | 10 + 30 + 0.16×50 = 48 | 16% |  200 − 48 = **152** | 30 - 8 = **22** |
| L | 0 + 30 + 0.4×50 = 50 |  40% | 200 − 50 = **150** | 30 - 20 = **10** |


---

![bg](nofooter_bg.png)

![](jog_seqs.003.jpeg)

---

## Intuição regulatória

- A **cobertura integral** não pode acontecer porque não gera incentivos para o segurado fazer esforço de reduzir as chances de sinistro
- O **segurado** preferia a cobertura integral. Para ele seria mais vantajoso agir com esforço sob a cobertura integral. 
  - Mas, independente da sua disposição inicial, haveria um incentivo para ele descumprir essa obrigação (se o seu esforço não é observável ou exigível).  
- A seguradora, **antecipando** essa reação, deve evitar oferecer cobertura integral.

---

## Risco moral em relações do tipo Principal x Agente.
- Muitas aplicações jurídicas: 
  - Seguros e previdência, 
  - Direito Societário,
  - Licitações,
  - Representação política e funções estatais,
  - Etc.

---

## Soluções possíveis?
  - Comando e controle.
  - Monitoramento e controle.
  - Redimensionamento dos payoffs (incentive design).
  - Garantias (commitment strategies).

---

## 5.3. Mais poder é sempre melhor? 
## 5.3.1. O jogo da votação

- Interação entre o Congresso e um Presidente com preferências divergentes.
- Congresso prefere a provisão A, mas não gosta da provisão B.
- Presidente gosta da provisão B, mas não gosta da provisão A.

---

### Ranking de preferências dos jogadores
<br>

Resultado | Congresso | Presidente
:----:|:---------:|:----------:
Apenas A | 4 | 1
Apenas B | 1 | 4
A + B | 3 | 3
Nenhuma | 2 | 2

---

## Jogo da votação
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

## Jogo da votação
- Solução: **(A + B, Aprova)**
- Antecipando que a proposição A seria vetada pelo Presidente, o Congresso envia a proposta que contém tanto a proposição A como a proposição B.

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

## 5.3. A divisão do bolo: o problema da repartição justa de recursos como jogo sequencial


- **Jogo da divisão do bolo (cake-cutting)**
  - Como dois jogadores podem dividir um bolo de forma que cada um fique com uma parte que considera pelo menos tão boa quanto a do outro?
  - Conhecida regra do divisor e seletor.


---

<div style="margin: auto;">

![w:680](cake-cutting.001.png)

</div>

---

## Jogo da divisão do bolo (cake-cutting)
- Resultado "equitativo" é atingido quando temos uma divisão entre 2 jogadores.
  - Resultado persistente mesmo quando os dois desejam tamanhos diferentes, ou o bolo tem 2 sabores e os jogadores preferem um sabor ao outro.
  - O que fazer se temos que dividir um bolo de forma proporcional entre 3 pessoas?

---

## O problema da divisão justa
- **Procedimento do último redutor** (last-diminisher)
  - Desafio de Hugo Steinhaus a Stefan Banach e Bronislaw Knaster.
  - Em 1947 eles propõem o procedimento do "último redutor", que é publicado por Steinhaus na Econometrica, no ano seguinte.
  - Primeiro jogo de divisão criado que satisfaz a condição de proporcionalidade para n jogadores.

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

## Outros algoritmos de divisão
- Procedimentos de divisão proporcional
  - Banach-Knaster Last-diminisher
  - Dubin-Spanier Moving Knife
  - Steinhaus-Kuhn Lone Divider
- Procedimentos de divisão sem inveja
  - Selfridge-Conway Discrete Procedure
  - Stromquist Moving-Knives

---

## Tópicos finais

**5.4.** Jogos sob condição de incerteza 

**5.4.1.** Resolvendo jogos sob a hipótese de aversão à incerteza

**5.5.** Jogos sob condição de racionalidade limitada

**5.5.1.** Advinhe 2/3 da média

**5.5.1.1.** Aplicações reais: o concurso de beleza keynesiano e os mercados de ações

**5.5.2.** Jogo da Centopeia: por que a indução retroativa não descreve bem o comportamento humano?

**5.5.3.** Jogo de Ultimato
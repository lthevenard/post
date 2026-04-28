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
.metric {
  text-align: center;
  padding-top: 0.4rem;
}
.metric .value {
  color: #003E7E;
  font-size: 190%;
  font-weight: bold;
  line-height: 1;
}
.metric .label {
  color: #1F2933;
  font-size: 78%;
  line-height: 1.25;
}
.note {
  color: #1F2933;
  font-size: 78%;
  line-height: 1.35;
}
.chart {
  display: block;
  margin: 0 auto;
  max-height: 460px;
}
.chart.tall {
  max-height: 500px;
}
.quiet {
  color: #5B6773;
}
</style>

![bg](section_bg.png)

# Resultados da P1
**Teoria da Decisão – 2026.1**
Lucas Thevenard

---
<!--
paginate: true
header: Resultados da P1
footer: lucas.gomes@fgv.br | 28/04/2026
-->

## Visão geral

<div class="columns3">
<div class="metric"><div class="value">69</div><div class="label">presentes</div></div>
<div class="metric"><div class="value">7,50</div><div class="label">mediana</div></div>
<div class="metric"><div class="value">80%</div><div class="label">com nota >= 6,0</div></div>
</div>

<br>

<div class="columns3">
<div class="metric"><div class="value">10</div><div class="label">ausentes</div></div>
<div class="metric"><div class="value">7,47</div><div class="label">média</div></div>
<div class="metric"><div class="value">10,25</div><div class="label">maior nota</div></div>
</div>

<br>

**Resultado Geral:** a turma foi bem em geral. Muitos acertaram a Q1, as questões mais problemáticas foram Q2 e Q5. No entanto, o resultado mais decepcionante foi na Q4, que era simples. Há alguma dispersão de notas, mas a massa principal ficou acima de 6,0.

---


## Concentração da turma

![h:455](charts/faixas_nota.png)

---

## Curva de densidade acumulada

![h:455](charts/curva_acumulada.png)

---

## Aproveitamento por questão

![h:455](charts/aproveitamento_questoes.png)

---

## Pontos obtidos e pontos deixados

![h:430](charts/composicao_media.png)

---

## Aproveitamento por item

![h:455](charts/aproveitamento_itens.png)

---

## Faixas para consulta

<br>

<table>
<thead><tr><th>Faixa</th><th>Alunos</th><th>Percentual dos presentes</th></tr></thead>
<tbody>
<tr><td>0-2</td><td>0</td><td>0%</td></tr><tr><td>2-4</td><td>6</td><td>9%</td></tr><tr><td>4-6</td><td>8</td><td>12%</td></tr><tr><td>6-8</td><td>25</td><td>36%</td></tr><tr><td>8-10</td><td>21</td><td>30%</td></tr><tr><td>10+</td><td>9</td><td>13%</td></tr>
</tbody>
</table>


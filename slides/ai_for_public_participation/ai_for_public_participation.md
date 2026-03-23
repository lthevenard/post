---
marp: true
title: Inteligência Artificial para Análise de Contribuições em Processos de Participação Social
backgroundImage: url('default_light_en.png');
math: mathjax
---
<style>
/* Section pagination */
section::after {
  content: attr(data-marpit-pagination) ' / ' attr(data-marpit-pagination-total);
  color: #003E7E;
  font-size: 60%;
  font-weight: 500;
}

/* Header & footer */
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

/* Headings */
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
.newsec {
  padding-left: 400px;
}

/* Quotes */
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
  color: #222;
}

/* Columns */
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
.columns_flex {
  display: flex;
  margin: auto;
  gap: 1rem;
}


/* Game table */
table {
  margin-left: auto;
  margin-right: auto;
}
th {
  background-color: #003E7E;
  color: white
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
.title {
  color: white;
}
.title h1 {
  color: white;
}
.title h2 {
  color: white;
  font-size: 100%;
  font-weight: 700;
}
</style>

![bg](cover_light_en.png)

<div class="title">

# Inteligência Artificial para Análise de Contribuições em Processos de Participação Social

<br>

*Natasha Salinas* | *Lucas Thevenard* | Março 2026

</div>

---

<!--
paginate: true
header: IA para Análise de Contribuições em Participação Social
footer: lucas.gomes@fgv.br | 26/03/2026
-->


## Um uso acadêmico de ferramentas de IA

- Na minha tese, meu interesse científico era entender a relação entre **grupos de interesses**, **conteúdo das contribuições** e **impacto** em processos de participação social.
* Para responder às minhas perguntas de pesquisa, foi preciso criar formas de medir o conteúdo das contribuições em larga escala.
* Dados disponíveis:
  - Metadados estruturados coletados do site da Anatel;
  - Texto das contribuições;
  - Respostas da agência.

---

## Dois usos para os textos das contribuições

* Representação estatística (GPT Embeddings) dos textos para uso em **modelos preditivos e descritivos**.
* Extração de variáveis qualitativas dos textos: **produção de dados estruturados** a partir de documentos textuais

---

## Modelo preditivo do impacto das contribuições

- **Objetivo**: criar um **modelo para prever o impacto das contribuições** (se ela foi ou não aceita) a partir do texto.
- **Metodologia**: padrão típico de **treinamento supervisionado** de um classificador usando de algoritmos de Machine Learning.

---

<!--
_header: ""
_footer: ""
-->
![bg](nofoot_light_en.png)


<div style="margin:auto; text-align:center;">

![w:900](pt6.png)

</div>


---

## Extração de variáveis qualitativas dos textos
- **IA como "[assistente de pesquisa](https://regulatorystudies.columbian.gwu.edu/ai-research-assistant-regulatory-studies-methodological-note)"**:
  - Identificação de participantes;
  - Classificação da "direção regulatória";
  - Fundamentação: usos de argumentos econômicos, jurídicos e técnicos.
* **Metodologia**: automação simples e *prompt engineering* (mas seria possível também treinar modelos usando *fine tuning*, PEFT, etc. para obter maior fidelidade).


---

<div style="margin:auto; text-align:center;">

![w:950](p_lorenz.png)


</div>

---

<div style="margin:auto; text-align:center;">

![w:950](p_overall_dodge.png)


</div>

---

<div style="margin:auto; text-align:center;">

![w:950](p_mix.png)

</div>

---

<div style="margin:auto; text-align:center;">

![w:950](p_balance_heat_nonzero_nt.png)


</div>

---


<div style="margin:auto; text-align:center;">

![w:950](p_args_overview.png)


</div>

---

<div style="margin:auto; text-align:center;">

![w:950](p_n_args.png)


</div>

---

<div style="margin:auto; text-align:center;">

![w:950](p_args_by_dir.png)


</div>

---

## Potencial de ferramentas de IA para a análise da participação social

- Permitem transformar textos longos e heterogêneos em **informação estruturada, comparável e auditável**.
- Viabilizam **leituras transversais** das contribuições.

---

## Aplicações para auxiliar reguladores no processamento das contribuições

- Identificação mais rápida dos **participantes** e dos **pedidos** formulados.
* Sistematização da **fundamentação dos pedidos**, a qual pode se organizar a partir de leituras transversais e multitemáticas: fundamentos econômicos, fundamentos jurídicos, fundamentos técnicos, etc.
- Extração e sistematização de **dados empíricos** e evidências trazidos pelos participantes.
- **Triagem** preliminar de contribuições, agrupamento de **casos semelhantes** e apoio à elaboração de **relatórios analíticos**.

---

## Também há usos promissores na formulação das contribuições

- IA pode interagir com participantes, explicar a consulta, tirar dúvidas e sugerir melhorias de redação.
- Esse campo tem potencial para tornar a participação mais acessível, dinâmica e produtiva, sobretudo para grupos que hoje enfrentam maiores barreiras técnicas.
- Não é o foco principal desta fala, mas é uma fronteira importante para ampliar a qualidade do diálogo regulatório.

---

## Condições para uso responsável

- Definir previamente as categorias e os critérios de extração.
- Trabalhar com processos auditáveis, amostras de validação humana e documentação das métricas.
- Usar IA como **ferramenta de apoio**, não como substituta do juízo regulatório.

---

### Obrigado!

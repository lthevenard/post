---
marp: true
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
.title h1, p {
  color: white
}
.title h2 {
  color: white;
  font-size: 100%;
  font-weight: 700;
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
</style>

![bg](cover_light_en.png)

<div class="title">

# Ideas, interests and the effectiveness of public participation

## 2025.2
Lucas Thevenard

</div>

---

<!-- 
_header: ""
_footer: ""
-->
![bg](section_light_en.png)


<div class= "newsec">

# Chapter 1: Introduction

</div>

---

<!-- 
paginate: true 
header: Dissertation: Ideas, interests and the effectiveness of public participation
footer: lucas.gomes@fgv.br | September 30, 2025
-->

## Chapter 1: Introduction

* Does commenter identity matter in notice and comment procedures?
  - Balla (2022): bureaucrats say it doesn't
  - Legal framework: participation as information exchange (a dialogue)
* Interest group theory: theoretical focus on who participates
  - Participation as representation
  - Facing the research challenges of measuring ideas: two ways to use IA
* Implications for regulatory policy
  - Concrete policy implications
  - Access is not enough (Regulations.gov, examples from Anvisa and Aneel) 

---

## Chapter 1: Introduction

**Outline:**
- Chapter 2: Theoretical Framework
- Chapter 3: ANATEL's public consultations: methodology and descriptive statistics
- Chapter 4: Who says it, or what is said?
- Chapter 5: Uncovering interest group dynamics
- Chapter 6: Issue networks and the circulation of ideas
- Chapter 7: Conclusion

---
<!-- 
_header: ""
_footer: ""
-->
![bg](section_light_en.png)


<div class= "newsec">

# Chapter 2: Theoretical Framework

</div>

---

## Chapter 2: Theoretical Framework

- 🚧🚧 UNDER CONSTRUCTION 🚧🚧
- "Knowledge" vs. "Interests"
- More importantly: applied research

---

<!-- 
_header: ""
_footer: ""
-->
![bg](section_light_en.png)


<div class= "newsec">

# Chapter 3: Methodology and descriptive statistics

</div>

---

## Chapter 3: Methodology and descriptive statistics

- **Methodology**
  - Data collection
  - Text preprocessing and representation (TF-IDF, BERT, GPT-3 embeddings)
  - LLM-assisted dataset enrichment
    - Interest group classification
    - Regulatory direction classification
    - Types of arguments
* **Descriptive statistics**: ...


---

<!-- 
_header: ""
_footer: ""
-->
![bg](section_light_en.png)


<div class= "newsec">

## Composition of participants

</div>

---

<div style="margin:auto; text-align:center;">

![w:950](p_group.png)


</div>

---

<div style="margin:auto; text-align:center;">

![w:950](p_lorenz.png)


</div>


---

<!-- 
_header: ""
_footer: ""
-->
![bg](section_light_en.png)


<div class= "newsec">

## Regulatory direction of comments

</div>

---

<div style="margin:auto; text-align:center;">

![w:950](p_overall_dodge.png)


</div>

---

<div style="margin:auto; text-align:center;">

![w:950](dir_addressed.png)


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

<!-- 
_header: ""
_footer: ""
-->
![bg](section_light_en.png)


<div class= "newsec">

## Argument types in comments

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

![w:950](arg_typ_concurrence.png)


</div>

---

<div style="margin:auto; text-align:center;">

![w:950](p_args_by_dir.png)


</div>

---

<div style="margin:auto; text-align:center;">

![w:950](p_args_by_group.png)


</div>

---

<!-- 
_header: ""
_footer: ""
-->
![bg](section_light_en.png)


<div class= "newsec">

## Agency's responses to comments

</div>

---

<div style="margin:auto; text-align:center;">

![w:950](p_impact_overview.png)


</div>

---

<div style="margin:auto; text-align:center;">

![w:950](p_impact_by_group_3.png)


</div>

---

<div style="margin:auto; text-align:center;">

![w:950](p_impact_by_dir_3.png)


</div>

---

<div style="margin:auto; text-align:center;">

![w:950](p_args_by_impact_3.png)


</div>

---

<div style="margin:auto; text-align:center;">

![w:950](p_impact_formal_changes_3.png)


</div>

---

<!-- 
_header: ""
_footer: ""
-->
![bg](section_light_en.png)


<div class= "newsec">

## Chapter 4: Who says it, or what is said?

</div>

---

## Chapter 4: Who says it, or what is said?

- **Research design and hypotheses**: what matters most, ideas or group affiliation?
  - **Predictive logic**: measuring the informational regularity of responsiveness
  - **Explanatory logic**: assessing the relative weight of ideas and interests

---

## Chapter 4: Who says it, or what is said?

<div style="margin:auto; text-align:center;">

![w:900](H1.png)

</div>

---

## Chapter 4: Who says it, or what is said?

<div style="margin:auto; text-align:center;">

![w:900](H2.png)

</div>

---

## Chapter 4: Who says it, or what is said?

<div style="margin:auto; text-align:center;">

![w:900](H3.png)

</div>

---

## Chapter 4: Who says it, or what is said?

<div style="margin:auto; text-align:center;">

![w:900](H4.png)

</div>

---

## How predictable is the agency identification of 'out-of-scope' cases?

* **Scope classification**  
  - Best results (final validation stage, N=150): **SVM** and **KNN**
    - SVM: Accuracy ≈ **89.3%**, F1 ≈ **0.89333**
    - KNN: Accuracy ≈ **88.7%**, F1 ≈ **0.88654**  
  - Comments judged “out of scope” can be predicted with high reliability

---

## How predictable are agency's acceptance/rejection responses?

* **Impact classification**  
  - Best results (final validation stage, N=815): **SVM** and **KNN**
    - SVM: Accuracy ≈ **83.4%**, F1 ≈ **0.83435**
    - KNN: Accuracy ≈ **81.9%**, F1 ≈ **0.81867** 
  - Agency acceptance/rejection is also highly predictable from comment text

---

## Explanatory models (logistic regressions)

    - M0 - only identity
    - M1 - identity + embeddings
    - M2 - only embeddings
    - M3 - only content variables
    - M4 - embeddings + content variables
    - M5 - identity + embeddings + content variables
    - M6 - identity + predicted probabilities
    - M7 - only predicted probabilities
    - M8 - predicted probabilities + content variables
    - M9 - identity + predicted probabilities + content variables

---

<!-- 
_header: ""
_footer: ""
-->
![bg](section_light_en.png)


<div class= "newsec">

# In conclusion

</div>

---

## Next steps
- Finish explanatory models for chapter 4 (almost done)
- Next empirical chapters (5 and 6): all the data is there, now is just a matter of doing the analysis and writing the results.
- Chapter 2 and Conclusion: for most of next year, refining the theoretical chapter, revision and improving discussions of the results.

---

### Thank you

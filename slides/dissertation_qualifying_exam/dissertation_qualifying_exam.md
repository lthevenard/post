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
paginate: true 
header: Dissertation: Ideas, interests and the effectiveness of public participation
footer: lucas.gomes@fgv.br | December 15, 2025
-->

## Context and background

* Regulation in numbers research on public participation
  - Large scale research project on notice and comment procedures of the independent agencies
  - Study group discussing similar applied research
  - Questions regarding "capture" or a "bias towards businesses"
* Same subject already explored in my Master's thesis
  - Opportunity to improve the results, strenghten the methodology and further explore the problem


---

## Framing the problem

* Does commenter identity matter in notice and comment procedures?
  * Balla (2022): bureaucrats say it doesn't
  * Legal framework: participation as information exchange (a dialogue)
* Implications for regulatory policy
  - Concrete policy implications
  - Access is not enough (Regulations.gov, examples from Anvisa and Aneel) 

---

## Outline:

- Chapter 1: Introduction
- Chapter 2: Theoretical Framework
- Chapter 3: ANATEL's public consultations: methodology and descriptive statistics
- Chapter 4: Who says it, or what is said?
- Chapter 5: Uncovering interest group dynamics
- Chapter 6: Issue networks and the circulation of ideas
- Chapter 7: Discussing policy implications and further research

---

## Theoretical Framework (Chapter 2)

* Traditional interest group theory (Iron Triangle)
  - "Participation as representation": theoretical focus on **who** participates and **who** gets heard
    * Ideas and arguments defined by pre-existing interests and preferences
    * **Dialogue and learning play a small role**, for both participants and regulators

---

## Theoretical Framework (Chapter 2)

- Extreme view:'Kabuki Theater' view of notice and comment (Donald Elliot)
  - Notice and comment as just a staged act for the sake of gathering materials for litigation in the future.
  * But if this was true, we would have to see two effects:
    - Identity would be very important, as some participants would be more likely to litigate effectively against the agency.
    - Comments opposing regulation would likely receive more attention from the agency.
  * Applicability to Brazil's legal system might be questioned, but still an interesting argument to explore. 


---

## Theoretical Framework (Chapter 2)

- Issue Network Theory
  * Shared knowledge and values play a central role in the formation of interests
  * Issue Network theory **rejects any ontological primacy between interests and ideas**: they are co-constitutive, as networks form around ideas that shape participants’ interests


---

## Theoretical Framework (Chapter 2)

- Facing the research challenges of measuring ideas
  - Current approaches to understanding the role of ideas in applied research have important limitations and are resource-intensive.
  * **Methodological contribution**: two new ways to "measure" the content of comments in public participation.
    - Statistical representation of text.
    - LLM-assisted coding.

---

## Theoretical Framework (Chapter 2)

- Selection of Anatel (a highly technical regulatory context) to stress the traditional theories and see in which conditions Issue Networks provide a better explanation.

> "No one argues that there are only issue networks or only subgovernments active in policymaking. Rather, the argument is over what is most typical and most descriptive of the policy process. Which should serve as our framework for analyzing how laws and regulations are made?" (Jeffrey Berry, 1989, p. 243-44)

---

## Next steps

- **Chapter 5**: similarity/consistency within interest groups:
  - Formal similarity (language) x substantive similarity (request and arguments)
  - Agreement within consultations and agreement cross-consultations (most salient problemas and interests)
- **Chapter 6**: observing/reconstructing network patterns
  - Patterns of participation? Is there enough heterogeneity?
  - Should this be a part of the previous chapter.
- **Chapter 7**:
  - Implications: for theory, for applied research, for policy



---

### Thank you

---

<!-- 
_header: ""
_footer: ""
-->
![bg](section_light_en.png)


<div class= "newsec">

# Results: Methodology and descriptive statistics

</div>


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

![w:950](pt3.png)


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

![w:950](pt4.png)


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

# Results: Chapter 4

</div>

---

<!-- 
_header: ""
_footer: ""
-->
![bg](section_light_en.png)


<div class= "newsec">

## Predictive modelling

</div>

---

<div style="margin:auto; text-align:center;">

![w:950](pt5.png)

</div>

---

<!-- 
_footer: ""
-->

![bg](nofoot_light_en.png)

<div style="margin:auto; text-align:center;">

![w:870](pt6.png)

</div>

---

<!-- 
_header: ""
_footer: ""
-->
![bg](section_light_en.png)


<div class= "newsec">

## Explanatory modelling

</div>

---

<div style="margin:auto; text-align:center;">

![w:950](pt7.png)

</div>

---

<!-- 
_footer: ""
-->

![bg](nofoot_light_en.png)

<div style="margin:auto; text-align:center;">

![w:1000](pt8.png)

</div>

---

<!-- 
_footer: ""
-->

![bg](nofoot_light_en.png)

<div style="margin:auto; text-align:center;">

![w:1000](pt12.png)

</div>
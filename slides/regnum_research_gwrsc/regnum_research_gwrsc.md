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

/* Headings */
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

/* Game table */
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

![bg](cover_light_en.png)

<div class="title">

# Academic research summary for GW's Regulatory Studies Center
## From *Regulation in Numbers* projects and personal research – 2025.2
Lucas Thevenard

</div>

---
<!-- 
paginate: true 
header: Introduction & research summary
footer: lucas.gomes@fgv.br | September 30, 2025
-->

## Introduction

- **Lucas Thevenard**
  - PhD Candidate in Regulation Law, FGV Rio Law
  - Visiting Scholar, GW Regulatory Studies Center 🎉
  - I'm currently a professor at FGV Rio's Law School (Decision Theory), and a permanent researcher of FGV's *Regulation in Numbers* project
* Research interests:  
  - My main focus is on **regulatory governance**, including topics such as *public participation*, *regulatory impact assessments*, *regulatory agendas*,  *regulatory complexity*

---

## Regulation in Numbers

- Academic initiative based at FGV Rio Law
- Focus: empirical study of regulation in Brazil  
- Main Activities:
  - Outreach: Newsletter, media appearances
  - Regulatory committees
  - Academic research: **regulatory governance**, **control over regulation** 

---

## Topics for today
- A short introduction to the Regulatory State in Brazil
- Discussion of some research efforts in two main areas:
  - Public Participation (including my dissertation)
  - Regulatory impact assessment

---

<!-- 
_header: ""
_footer: ""
-->
![bg](section_light_en.png)


<div class= "newsec">

# 1. A short introduction to the Regulatory State in Brazil

</div>

---

## Historical context
- 1964-1988: Military dictatorship
* 1988-1993: Political and economic turmoil (stagnation and high inflation)
  - 1993-1994: FHC at the Ministry of Finance, Plan "Real" is able to fight off inflation.
* 1994-2004: Reforms and macroeconomic stability
  - Privatization of a large number of state companies
  - Creation of the **independent regulatory agencies** at the federal level.

---

## Traditional view in Administrative Law (French influence)
* All bodies within the Executive answered directly to the President.
* **Principle of legality**: the Executive Branch could not "innovate" in the legal order.
  - In practice this had been pure fantasy for decades, but because of the strong Executive during the dictatorship period, legal thinkers in Brazil were very reticent about recognizing that the Executive could create new Law.

---

## Brazilian Independent Regulatory Agencies
* Why?
  - Perceived need for **high-quality, technical** state supervision over infrastructural sectors that was **insulated from political control**.
* **Independent agency model** in Brazil:
  - Colegiate body of directors with fixed mandates and who cannot be unilaterally fired by the president.
  - Formal power to create rules, to enforce them and to adjudicate controversies.
  - Introduction of procedural controls (public participation, RIA, etc.)

---

## Brazil vs. US
- More similar to Regulatory Commissions in the US system
- But they had to deal with more **procedural controls** than other bodies within the Executive
  - In the past, mandatory procedural controls have been aimed first at the Independent Regulatory Agencies (such as Public Participation and RIA, as we will see)
  - However, recently these reforms have (legally) reached the Executive as a whole, althought there have been many challenges in the actual implementation

---

<!-- 
_header: ""
_footer: ""
-->
![bg](section_light_en.png)


<div class= "newsec">

# 2. Public Participation

</div>

---

## Legal framework
- **Independent Regulatory Agencies**
  - **1990s-2020**. The Laws that created the regulatory agencies required public consultations (mandatory for most agencies), but these laws provided no participation model.
  - **2020-today**: The General Law of the Agencies (2019) stablished many rules on how public participation should be conducted.
* **Other Executive Bodies (Direct Administration)**
  - until 2022: there was no obligation to open rules for notice and comment or conduct public hearings, although public participation was used for some rules.
  - 2022-today: Decree no. 11.243 (2022) and Decree no. 12.002 (2024) require notice and comment.

---

## Regulatory Impact Assessment (RIA)  

- Mandatory since Decree 10.411/2020  
- Aims: transparency, accountability, evidence-based regulation  
- Key challenges:  
  - Limited technical capacity  
  - Data collection constraints  
  - Stakeholder engagement  

---

# Regulatory Impact Assessment (RIA)  
### Research Findings

- Mapping RIAs in the insurance sector (CNSP/Susep, 2021–2023)  
- Evaluation of RIAs published in the Federal Gazette  
- Findings: variable quality, uneven compliance  
- Ongoing challenge: institutionalizing robust practices  

---

# Public Participation  
### Brazilian Context

- Mechanisms: public consultations and calls for input  
- Persistent challenges:  
  - Low diversity of participants  
  - Asymmetry of resources among interest groups  

---

# Public Participation  
### Research Findings

- Large-scale datasets from Anatel, Anvisa, and Susep  
- Analysis of:  
  - Who participates  
  - What they demand  
  - How agencies respond  
- Evidence: uneven responsiveness, concentrated participation  

---

# Public Participation  
### My Dissertation

- Hypothesis: *ideas matter more than identity*  
- Contribution content explains agency responsiveness better than group category  
- Methodology:  
  - NLP (TF-IDF, BERT, GPT embeddings)  
  - Idea networks and textual alignment  
- Contribution: reconceptualizing regulatory responsiveness  

---

# Regulatory Complexity  
### Brazilian Context

- Policy debate on simplification and plain language  
- Problems:  
  - Excessive volume of norms  
  - High linguistic opacity  
  - Institutional fragmentation  

---

# Regulatory Complexity  
### Research Findings

- New metrics of regulatory complexity:  
  - Linguistic  
  - Institutional  
  - Relational  
  - Interpretive  
- Automatic classification of normative acts (abstract vs. concrete)  
- Implications: transparency, predictability, accessibility  

---

# Conclusions and Next Steps

- Three pillars of better regulation:  
  1. RIAs (planning and learning)  
  2. Participation (inclusion and accountability)  
  3. Complexity (transparency and predictability)  
- Future agenda:  
  - Comparative studies Brazil–US  
  - New metrics of regulatory quality  
  - Policy-relevant recommendations  
- Opportunities for collaboration with GW Regulatory Studies Center  

---


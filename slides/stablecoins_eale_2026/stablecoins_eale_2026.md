---
marp: true
theme: presentation-clear
size: 16:9
paginate: true
html: true
title: Stablecoins and regulatory competence
description: A comparative law-and-economics analysis of the boundary between the Central Bank of Brazil and the CVM. EALE 2026.
author: Antônio José Maristrello Porto; Lucas Thevenard Gomes; Marina Palma Copolla
lang: en
style: |
  section { font-size: 28px; }
  section.title { padding-right: 76px; }
  section.title::before { display: none; }
  section.title h1 { max-width: 1080px; }
  section.title p { font-size: 24px; }
  table { display: table; width: 100%; font-size: 24px; }
  th, td { vertical-align: top; padding: 13px 16px; }
  section.dense table { font-size: 22px; }
  section.dense { font-size: 25px; }
  .steps li { grid-template-columns: 220px 1fr; }
---

<!-- _class: title -->
<!-- _paginate: false -->

# Stablecoins and<br>regulatory competence

The boundary between the Central Bank of Brazil<br>and the Brazilian Securities Commission (CVM)

A comparative law-and-economics analysis

Antônio José Maristrello Porto · Lucas Thevenard Gomes<br>Marina Palma Copolla

EALE 2026

<!--
[Speaker notes]
Timing: 0:20 (cumulative 0:20).
This paper examines a problem of regulatory architecture: how to assign authority over an arrangement that can function both as a means of payment and as an investment. The presentation uses Brazil as the central case and the United States and European Union as comparators.
[Sources]
en_stablecoins_2026.pdf, title page and abstract. The presentation uses a shortened title; author names follow the supplied paper.
-->

---

<!-- _class: dense -->

## What are stablecoins?

Stablecoins are **digital assets designed to maintain a stable value relative to a reference asset**, usually an official currency.

- **Target:** a dollar-referenced token, for example, aims to maintain a value of US$1.
- **Mechanism:** reserves, collateral or algorithmic adjustments support that target, depending on the design.
- **Uses:** payments, remittances and liquidity storage; some arrangements also offer an investment return.

The target value does not eliminate the risk of losing parity, known as a **depeg**.

<!--
[Speaker notes]
Timing: 0:50 (cumulative 1:10).
Begin with the object being regulated. A stablecoin seeks stability against a reference; stability is an intended property rather than a guarantee. The US$1 target is an illustrative example of a currency peg, not an observation about the redemption terms of a specific product. Separate the reference asset from the mechanism that supports the target. A currency-referenced token may be backed by a portfolio containing government securities and deposits. Also distinguish maintaining a nominal peg from preserving purchasing power, which becomes important in Dynasty.
[Sources]
en_stablecoins_2026.pdf, sections 3.1-3.3. US$1 is an illustrative target used to explain the definition.
-->

---

<!-- _class: table dense -->

## Types and stabilization mechanisms

| Type discussed in the paper | How stability is supported |
|---|---|
| **Fiat-backed** | Reserves of cash and liquid financial assets support redemption. Examples: USDT and USDC. |
| **Commodity-backed** | Physical assets, such as gold or silver, provide the value reference and backing. |
| **Crypto-backed** | Other crypto-assets serve as collateral, usually with overcollateralization to absorb price volatility. |
| **Treasury-backed** | A fiat-backed subtype: government securities generate income for the issuer. |
| **Algorithmic** | Programmed supply adjustments seek to sustain the target without conventional collateral. |

These are economic designs; they do not determine securities status by themselves.

<!--
[Speaker notes]
Timing: 1:00 (cumulative 2:10).
The paper discusses five categories, with Treasury-backed stablecoins explicitly treated as a subtype of fiat-backed stablecoins. The rows therefore are not mutually exclusive boxes. Overcollateralization means holding collateral worth more than the outstanding tokens to provide a margin against price changes. Reserve income accruing to the issuer must not be confused with a right of token holders to that income. The paper uses TerraUSD's 2022 collapse to illustrate the fragility of algorithmic designs. These technical categories are also different from MiCA's legal categories, which will appear later.
[Sources]
en_stablecoins_2026.pdf, section 3.1, drawing on Caresana (2025). USDT and USDC are examples identified in the supplied paper; no current market-share claim is made.
-->

---

## Research question and argument

How should regulatory authority be allocated when a stablecoin combines **payment and investment functions**?

Brazil's binary division between virtual assets and securities provides institutional clarity, but leaves difficult classification and coordination questions.

We examine this boundary through **economic functions, comparative legal analysis and the Dynasty Global decision**, contrasting Brazil with the United States and the European Union.

<!--
[Speaker notes]
Timing: 1:00 (cumulative 3:10).
The object and its main designs are now established. Introduce the distinction that organizes the paper: identifying the legal regime is necessary, but it does not necessarily resolve every regulatory concern. The study combines doctrinal and comparative analysis with economic reasoning; it does not estimate causal effects or calculate an optimal institutional architecture. Our argument will lead to two complementary proposals: clearer functional criteria within securities law and cooperation between regulators in multifunctional cases.
[Sources]
en_stablecoins_2026.pdf, abstract and sections 1, 5.4, 6 and 7.
-->

---

## Banking and capital-market financing

**Banking market: financial intermediation**

Banks raise funds in their own name and lend them to borrowers. The bank owes depositors and assumes credit risk on its loans.

**Capital market: direct financing**

Investors fund issuers through securities and bear the risks of the investment. Financial intermediaries arrange transactions without taking the borrower's place.

These relationships expose savers to different risks and support different regulatory mandates.

<!--
[Speaker notes]
Timing: 1:00 (cumulative 4:10).
This is the institutional starting point of section 2. In a stylized banking transaction, the saver has a claim against the bank, which in turn has a claim against the borrower. In capital-market financing, the investor holds the claim against the issuer or an interest in the enterprise; the intermediary facilitates the transaction. Capital markets include equity and debt instruments, so not all returns are residual profits. The distinction is about the financing relationship and allocation of risk. It is not a claim that banks never participate in securities markets, or that information and agency problems are exclusive to one sector.
[Sources]
en_stablecoins_2026.pdf, sections 2.1-2.2, drawing on Pitta and Pereira Filho (2022) and the CVM's Direito do mercado de valores mobiliários (2022).
-->

---

## Why banking regulation is prudential

- **Repayment obligations:** banks must meet withdrawals while loans may be repaid later or suffer losses.
- **Liquidity risk:** simultaneous withdrawals can force rapid asset sales, worsening losses and weakening confidence.
- **Systemic effects:** distress may spread to other institutions and disrupt payments, imposing costs beyond the bank and its customers.

Prudential supervision addresses **solvency, liquidity and continuity of payments**, because individual institutions do not internalize all the costs of their distress.

<!--
[Speaker notes]
Timing: 1:20 (cumulative 5:30).
Explain the causal chain rather than reading the labels. A bank can face a timing problem even when some of its assets will pay later: it must meet withdrawals now. If many customers withdraw, hurried asset sales can deepen losses and reinforce doubts. Failure may also affect other institutions and payment users who were not parties to the original transaction. This motivates a regulatory concern with the institution's capacity to meet obligations and with spillovers. This slide provides a stylized explanation of the intermediation, prudential and run-risk mechanisms discussed in the paper; it does not describe a particular bank or claim that every stablecoin has the balance sheet of a lending bank.
[Sources]
Explanatory synthesis of en_stablecoins_2026.pdf, sections 2.1, 3.1 and 3.3: intermediation and assumed credit risk; liquidation under redemption pressure and liquidity spirals; prudential and systemic externalities.
-->

---

## Prudential and monetary risks in stablecoins

- **Convertibility:** a fiat-backed issuer receives funds, issues tokens and invests reserves. Parity depends on its ability to meet redemptions.
- **Run dynamics:** loss of confidence can trigger redemptions and reserve sales, reinforcing liquidity pressure.
- **Monetary externalities:** private issuance can affect aggregate liquidity and the transmission of monetary policy, beyond the issuer's own interests.

These mechanisms support **liquid reserve requirements and oversight of issuance, reserve management and payments**.

<!--
[Speaker notes]
Timing: 1:10 (cumulative 6:40).
Apply the previous reasoning to a reserve-backed stablecoin. The important link is the promise of liquidity and stable value, rather than assuming that the issuer conducts traditional lending. The paper compares some reserve portfolios to money market funds. Even liquid reserves need to be examined in relation to redemption pressure and the operation of the arrangement. The monetary argument adds a separate externality: private issuance can affect aggregate liquidity. Park and Kwon's model gives a conditional theoretical account of that mechanism, summarized in the appendix. Information about reserves is also relevant here; the distinction between regulatory rationales does not mean that prudential regulation ignores disclosure.
[Sources]
en_stablecoins_2026.pdf, sections 3.1 and 3.3, including its discussions of Caresana (2025) and Park and Kwon (2023).
-->

---

## Why securities markets require regulation

- **Information asymmetry:** issuers know more about assets and prospects than investors. Poor information impairs pricing and can discourage investment.
- **Agency problems:** investors entrust funds to managers whose decisions they cannot readily monitor. Managers may pursue their own interests at investors' expense.
- **Regulatory response:** mandatory disclosure supports informed pricing; governance and management rules constrain conflicts of interest.

The central relationship is between **investors supplying capital and those using or managing it**.

<!--
[Speaker notes]
Timing: 1:20 (cumulative 8:00).
Separate the two mechanisms. Information asymmetry concerns what investors can know: without credible information, they cannot readily distinguish sound enterprises from weak ones, and their pricing or willingness to invest suffers. The agency problem concerns what managers choose to do after receiving funds: superior disclosure does not itself align incentives or prevent private benefits. The paper therefore connects securities regulation to both disclosure and rules governing collective investment and management. The objective is to improve the conditions of investment and constrain misconduct, while investors continue to bear investment risk. These interventions also impose compliance and proprietary-information costs, discussed by Mahoney in the paper.
[Sources]
en_stablecoins_2026.pdf, sections 4.1-4.3, drawing on Mahoney (2021), and section 2.2.
-->

---

<!-- _class: table dense -->

## How a stablecoin can combine these functions

**Hypothetical example:** a transferable token targets US$1, while its issuer invests reserves and promises holders a share of investment income.

| Dimension | Economic concern |
|---|---|
| **Payment** | Redeemability depends on adequate, liquid reserves. |
| **Investment** | Returns depend on portfolio choices, information and the issuer's incentives. |
| **Interaction** | Portfolio losses may reduce returns and weaken confidence in redemption. |

Income retained by the issuer alone does not establish a holder's investment right. Securities status still depends on the legal test.

<!--
[Speaker notes]
Timing: 1:25 (cumulative 9:25).
This is an expressly hypothetical example combining mechanisms analyzed in the paper, not a description of a named product or a claim about what any jurisdiction permits. A token used for transfers can simultaneously give its holder a return linked to an issuer-managed portfolio. The payment side makes redemption and reserve liquidity important; the investment side raises questions about information, managerial incentives and the rights granted to holders. Portfolio losses can affect both sides. Two qualifications matter: reserve management or income retained by the issuer does not by itself establish a holder's investment right; and an investment feature must still satisfy the applicable statutory criteria. Dynasty will provide the harder actual case, involving buybacks and potential appreciation rather than an explicit distribution of income to every holder.
[Sources]
Illustrative synthesis based on en_stablecoins_2026.pdf, sections 3.2, 4.2-4.3, 5.4 and 6.1. The US$1 target and express sharing of investment income are hypothetical features, not case findings.
-->

---

## United States: overlapping regulatory mandates

- **Initial fragmentation:** banking authorities emphasized convertibility and stability; securities authorities saw possible investment-contract and fund characteristics.
- **GENIUS Act, July 2025:** established a federal framework for payment stablecoins.
- **Remaining boundaries:** hybrid and yield-bearing arrangements still raise questions about the relation between payment oversight and securities law.

The paper uses this trajectory to show how overlapping mandates can generate **coordination costs and uncertainty about the applicable regime**.

<!--
[Speaker notes]
Timing: 1:00 (cumulative 10:25).
The historical starting point is the 2021 debate: the President's Working Group recommended treating stablecoin issuers as insured banking institutions, while the SEC Chair emphasized possible securities and investment-company features. This gives an institutional expression to the economic distinction developed in the preceding slides. A federal payment-stablecoin framework arrived through the GENIUS Act in July 2025. The paper acknowledges that development and discusses remaining operational and boundary problems, drawing on Krause. Present this as the comparative trajectory analyzed by the supplied paper, not an independent update on U.S. law after its research period.
[Sources]
en_stablecoins_2026.pdf, section 5.1; PWG Report on Stablecoins (2021), SEC remarks (2021), GENIUS Act, Public Law 119-27 (2025), and Krause (2026), as discussed in the paper.
-->

---

## European Union: categories defined in advance

- **Starting problem:** gaps in existing financial law and divergent national responses, alongside payment and monetary risks.
- **MiCA's response:** common categories for e-money tokens and asset-referenced tokens guide prudential, informational and supervisory treatment.
- **Institutional design:** national and European authorities share tasks within a common legislative framework.
- **Remaining boundary:** financial instruments fall under other legislation; hybrid products still require functional classification.

A more detailed taxonomy reduces uncertainty but still needs **coordination and adaptation**.

<!--
[Speaker notes]
Timing: 1:00 (cumulative 11:25).
The European trajectory emphasizes harmonization and ex ante categories. An e-money token references a single official currency; an asset-referenced token references another value or right, or a combination, and is not an EMT. The appendix gives the distinction more precisely. These are legal categories, unlike the economic designs introduced at the start. MiCA combines national supervision with roles for European bodies, rather than assigning all functions to one regulator. The paper's lesson is that legislators can do part of the classificatory work in advance, but cannot eliminate judgments at the boundary with financial instruments or the need to adapt as arrangements change.
[Sources]
en_stablecoins_2026.pdf, section 5.2; Regulation (EU) 2023/1114 (MiCA) and the EBA, ECB and ESMA materials discussed there.
-->

---

## Brazil: a statutory division of competence

- **Law 14,478/2022 and Decree 11,563/2023:** place virtual-asset service providers primarily under the Central Bank of Brazil (BCB).
- **Securities exclusion:** instruments covered by Law 6,385/1976 remain under the CVM and outside the new virtual-assets framework.
- **Economic logic:** the BCB's mandate addresses payments, liquidity and foreign exchange; the CVM's mandate addresses capital raising and investor protection.

Hybrid products must still be classified under legal categories, including an **open investment-contract clause**.

<!--
[Speaker notes]
Timing: 1:00 (cumulative 12:25).
The Brazilian model organizes the regulation of service providers and preserves the securities perimeter. Article 1, sole paragraph, and Article 3(IV) of Law 14,478/2022 are central to that exclusion. The economic logic connects the BCB to the typical monetary and payment functions and the CVM to securities issuance and investor protection. That alignment is useful but does not turn economic function into an automatic jurisdictional rule. For novel arrangements, Article 2(IX) of Law 6,385/1976 makes the collective investment contract the critical boundary. Regulatory cooperation must respect the authorities' applicable legal powers.
[Sources]
en_stablecoins_2026.pdf, sections 5.3-5.4; Law 14,478/2022, Article 1, sole paragraph, and Article 3(IV); Decree 11,563/2023; Law 6,385/1976, Article 2(IX), as discussed in the paper.
-->

---

## The collective investment contract test

Six cumulative elements under CVM Guidance Opinion 40/2022:

1. Investment of money or an asset with economic value.
2. Formalization in a security or contract.
3. Collective character.
4. Expectation of economic benefit.
5. Predominant efforts of an entrepreneur or third party.
6. Public offering.

**Article 2(IX) also requires a right of participation, partnership or remuneration.**

<!--
[Speaker notes]
Timing: 1:20 (cumulative 13:45).
The collective investment contract, or CIC, is the open statutory category most relevant to novel arrangements in this paper. Explain how economic benefit and dependence on another party's efforts connect the legal test with information asymmetry and agency problems. The final sentence makes explicit the statutory content that must be considered when interpreting the six elements; it is not a separately invented seventh prong. Brazilian law is inspired by Howey, but the paper stresses that an expectation of profit alone does not satisfy Article 2(IX). The analysis must identify the legally relevant right of participation, partnership or remuneration.
[Sources]
en_stablecoins_2026.pdf, sections 2.2 and 5.4; Law 6,385/1976, Article 2(IX); CVM Guidance Opinion 40/2022, items 4.1 and 4.1.1; João Accioly's opinion in Dynasty Global, as discussed in the paper.
-->

---

<!-- _class: sequence -->

## Dynasty Global: the arrangement

The **D¥N token** was presented as a payment token linked to real estate.

<ol class="steps">
<li><strong>Real estate</strong><span>Dynasty manages properties that generate cash flow.</span></li>
<li><strong>Buyback</strong><span>Cash flow funds purchases of D¥N on the secondary market.</span></li>
<li><strong>Burn</strong><span>Purchased tokens are cancelled to increase scarcity and support value.</span></li>
</ol>

Does this mechanism create an investment right under Brazilian law?

<!--
[Speaker notes]
Timing: 1:05 (cumulative 14:50).
Describe the mechanism before discussing the vote. Dynasty's real-estate assets generate cash flow used for secondary-market buybacks; the purchased tokens are then cancelled. The stated objective was to preserve purchasing power by supporting the token's value. The case creates a difficult question because there is active management of underlying assets and a potential effect on token value, without a straightforward contractual distribution of those cash flows to every holder. Dynasty invoked its treatment by the Swiss regulator; that was part of the company's submission and does not determine the Brazilian classification.
[Sources]
en_stablecoins_2026.pdf, section 5.5; CVM Proceeding 19957.014289/2022-97, decided 30 April 2024, as described in the paper.
-->

---

<!-- _class: table -->

## Dynasty Global: a 3-2 decision

| Majority: no security | Minority: collective investment contract |
|---|---|
| Stabilization of purchasing power resembles a monetary function. | Buyback and burn create an expectation of appreciation. |
| Investment expectations do not themselves establish the statutory right. | Appreciation depends on assets managed by the issuer. |
| **Copola, Lobo and Accioly** | **Nascimento and Maeda**, with the technical staff |

The same mechanism supported different readings of Article 2(IX).

<!--
[Speaker notes]
Timing: 1:20 (cumulative 16:10).
The Board decided by three votes to two against classification as a security in this case. The table summarizes the two lines of reasoning discussed in the paper rather than asserting that each member used identical reasoning. Marina Copola opened the dissent from the technical view, emphasizing purchasing-power stabilization and the insufficiency of the investor's subjective motivation. Otto Lobo and João Accioly formed the majority; Accioly stressed fidelity to the Brazilian statutory text. Chair João Pedro Nascimento and Daniel Maeda supported the technical staff's CIC classification. The result does not establish that all stablecoins, or all buyback arrangements, are outside securities law.
[Sources]
en_stablecoins_2026.pdf, section 5.5; CVM Board decision of 30 April 2024, Proceeding 19957.014289/2022-97, as analyzed in the paper.
-->

---

## Classification and regulatory coverage

**Classification uncertainty**

Shared facts can produce different judgments about whether an arrangement grants an investment right.

**Regulatory coverage**

A securities classification does not resolve every payment, liquidity, monetary or foreign-exchange concern.

Hybrid cases require both a legal classification and an assessment of the risks each authority can address.

<!--
[Speaker notes]
Timing: 0:40 (cumulative 16:50).
Dynasty illustrates two analytical problems. First, the open clause leaves room for disagreement about classification. Second, either classification can leave important economic concerns to be considered. Rejecting securities status does not establish that an arrangement is risk-free; accepting it would not automatically address prudential or monetary concerns. The latter argument is a regulatory implication developed by the paper, including a counterfactual about a different result in Dynasty. It is not a finding that both agencies actually asserted competence in that proceeding.
[Sources]
en_stablecoins_2026.pdf, sections 5.4, 5.5 and 6.2.
-->

---

<!-- _class: table -->

## More predictable classification

| Feature to examine | Relevant question |
|---|---|
| **Asset management** | Does token value depend on the issuer's portfolio decisions? |
| **Buybacks and marketing** | Does the issuer induce an expectation of appreciation? |
| **Business organization** | Does success depend on continuing centralized efforts? |
| **Effective use** | Is the token mainly used for payments or held for investment? |

These indicators inform Article 2(IX); they do not replace its statutory requirements.

<!--
[Speaker notes]
Timing: 1:10 (cumulative 18:00).
The paper proposes an analytical vocabulary for functional assessment rather than an automatic score or checklist. Its six discussed considerations are grouped into four rows: active management of backing assets; stabilization mechanisms that may induce appreciation; promises of wealth preservation or capital growth; centralized organization; actual payment use; and secondary-market gain expectations. Marketing and secondary-market expectations should be examined together with the rights granted to holders. Holding an asset as a store of value, reserve management or a buyback alone is insufficient to determine securities status. The right required by Article 2(IX) remains essential.
[Sources]
en_stablecoins_2026.pdf, section 6.1.
-->

---

## Coordination within the legal framework

Article 3(IV) of Law 6,385/1976 allows the National Monetary Council to define CVM activities requiring coordination with the BCB.

The paper proposes:

- **Joint guidance** on recurring classification issues.
- **Consultation protocols and referral procedures** for borderline cases.
- **Clear triggers** for involving the other authority when additional risks arise.

<!--
[Speaker notes]
Timing: 1:05 (cumulative 19:05).
The legal provision creates room for cooperation but is not a blanket authorization for either agency to disregard the statutory division. The proposed instruments are incremental: joint guidance, consultation protocols, formal referral flows and prior clarification of the factors that trigger the involvement of the other regulator. The objective is to reduce both competing claims of authority and supervisory gaps or delays. Appropriate design should respect existing powers and avoid unnecessary duplication of obligations.
[Sources]
en_stablecoins_2026.pdf, sections 2.2, 5.4 and 6.2; Law 6,385/1976, Article 3(IV), as discussed in the paper.
-->

---

<!-- _class: closing -->

## Conclusions

- Brazil's statutory allocation offers institutional clarity, but hybrid arrangements remain difficult to classify.
- Functional analysis must connect economic risks with the rights required by securities law.
- **Clearer classification criteria and BCB-CVM coordination** are complementary responses to this boundary problem.

Both should improve predictability while limiting unnecessary compliance costs.

<!--
[Speaker notes]
Timing: 0:55 (cumulative 20:00).
Return to the research question. The Brazilian framework assigns primary authority more clearly than the fragmented trajectory analyzed in the United States, while offering less detailed categories than MiCA. Dynasty shows why those institutional choices do not remove interpretive disagreement. Our proposal is to refine functional criteria while preserving the statutory test, and to develop cooperation that can address different dimensions of the same arrangement. The paper does not quantify welfare effects or establish an optimal institutional model. More detailed categories and cooperation should be assessed against compliance costs, supervisory gaps and the need to adapt. End the main presentation here and invite discussion. The following three slides are reference material for questions.
[Sources]
en_stablecoins_2026.pdf, section 7, with sections 5.5 and 6.
-->

---

<!-- _header: APPENDIX A -->
<!-- _paginate: false -->
<!-- _class: table -->

## MiCA's stablecoin categories

| Category | Reference for stable value |
|---|---|
| **E-money token (EMT)** | One official currency |
| **Asset-referenced token (ART)** | Another value or right, or a combination of them, including currencies; excluding EMTs |

Crypto-assets qualifying as financial instruments remain outside MiCA's scope.

Ex ante categories guide classification; supervisory coordination and functional judgments remain necessary.

<!--
[Speaker notes]
Backup slide; outside the 20-minute presentation.
Use this if asked how MiCA differs from the Brazilian design. EMT and ART are legal categories; they should not be equated with all colloquial uses of the word stablecoin. An ART need not refer to a basket: the definition includes another value or right, or a combination. The paper also emphasizes that categories do not eliminate boundary judgments with financial instruments governed by other legislation. The division of supervisory responsibilities includes national authorities and relevant European bodies with different roles.
[Sources]
en_stablecoins_2026.pdf, sections 1 and 5.2; Regulation (EU) 2023/1114, Articles 2(4)(a) and 3(1)(6)-(7), as discussed in the paper.
-->

---

<!-- _header: APPENDIX B -->
<!-- _paginate: false -->

## The monetary externality in Park and Kwon

- The model assumes competitive issuance and imperfect monitoring of collateral.
- Individual issuers do not internalize the effect of issuance on aggregate monetary liquidity.
- Under the model's assumptions, private issuance offsets open-market operations in a corridor system; remuneration of reserves in a floor system preserves policy effectiveness.

This is a conditional theoretical result, not an empirical estimate for Brazil.

<!--
[Speaker notes]
Backup slide; outside the 20-minute presentation.
The main deck only needs the rationale for monetary oversight. If asked for the underlying economics, explain the mechanism summarized by the paper: issuers respond to profitable opportunities and do not internalize aggregate liquidity effects. The conclusion concerning corridor and floor systems is specific to Park and Kwon's model. The stablecoin paper draws on this result as part of its theoretical foundation and does not estimate or independently test it for Brazil.
[Sources]
en_stablecoins_2026.pdf, section 3.3 and notes 31-32; Park, J.; Kwon, O. Stablecoins: Legal restrictions theory and monetary policy. Economics Letters 226 (2023), 111107, as summarized in the paper.
-->

---

<!-- _header: APPENDIX C -->
<!-- _paginate: false -->
<!-- _class: dense -->

## Selected references

**Economic foundations**

Mahoney (2021). *The Economics of Securities Regulation: A Survey.*<br>
Park and Kwon (2023). *Stablecoins: Legal restrictions theory and monetary policy.*

**Brazilian legal framework and case**

Laws 6,385/1976 and 14,478/2022; Decree 11,563/2023.<br>
CVM Guidance Opinion 40/2022.<br>
Dynasty Global: CVM Proceeding 19957.014289/2022-97, 30 April 2024.

**Comparative frameworks**

MiCA: Regulation (EU) 2023/1114.<br>
GENIUS Act: U.S. Public Law 119-27, 18 July 2025.

<!--
[Speaker notes]
Backup slide; outside the 20-minute presentation.
These are selected authorities discussed in the paper. The full bibliography appears in the supplied PDF, and each slide's source notes point to the relevant sections. Main source: Porto, A. J. M.; Gomes, L. T.; Copolla, M. P. Stablecoins and the Delimitation of Regulatory Competence Zones Between the Central Bank of Brazil and the Brazilian Securities Comission: A Comparative Law-and-Economics Analysis. Supplied file en_stablecoins_2026.pdf. The long title above reproduces the supplied paper for identification.
[Sources]
en_stablecoins_2026.pdf, references and the legal authorities cited in sections 2-6.
-->

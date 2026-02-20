# Iterative Reasoning, Arbitrary Results: Chain-of-Thought Prompt Engineering for APA Compliance

Autor(es): Elliot E.C. Ping  
Data: February 11, 2026  
Fonte: https://www.yalejreg.com/nc/iterative-reasoning-arbitrary-results-chain-of-thought-prompt-engineering-for-apa-compliance-by-elliot-e-c-ping/

---

This post is the seventh contribution to Notice & Comment’s symposium on AI and the APA. For other posts in the series, click here.

Administrative law is a field built on reasoned decisionmaking. The Administrative Procedure Act (“APA”) ensures that agencies provide a reasoned explanation for their actions, and that reviewing courts can evaluate that reasoning. Yet agencies are increasingly using large language models (“LLMs”) and other generative AI tools. LLMs are widely criticized as “black boxes.” They generate outputs without revealing how they arrived at those outputs. The question is whether LLMs can be made to produce reasoning that satisfies administrative law’s demands.

LLM output, without more, is not reasoned decisionmaking. Courts require that agencies show a rational connection between facts found and the choice made. Agencies must provide explanations that respond to important aspects of the problem and address significant comments. They must also provide the basis for their decisions at the time, not after the fact. When agencies rely on LLMs, their explanations may be post hoc rationalizations or may not reflect the real basis for the decision.

One proposed solution is chain-of-thought (“CoT”) prompting. CoT prompting instructs the model to reason step by step. It can be done in various ways. “Zero-shot” CoT prompting uses a simple instruction, like “think step by step.” “Few-shot” CoT prompting provides the model with examples of step-by-step reasoning. More advanced prompting techniques, like “least to most” prompting, break the problem into subproblems. CoT prompting can improve model performance on some reasoning tasks. It can also produce explanations that seem more transparent.

But CoT prompting does not solve the black box problem. LLMs can generate a chain of reasoning that is not causally connected to the output. The model may produce an explanation that sounds plausible but is not the real reason. It can also produce different chains of thought for the same prompt, making the reasoning unstable. And CoT prompting can amplify confirmation bias and sycophancy. If the prompt embeds a conclusion, the model will reason toward that conclusion. Even neutral prompts may produce reasoning that is overly deferential to the user’s framing.

CoT prompting also does not address hallucinations. The model may reason step by step and still invent facts or citations. In legal contexts, hallucinations are dangerous. And CoT prompting raises new problems: it produces more text, which increases the burden on human reviewers and can create a false sense of security. The more reasoning the model provides, the easier it may be for humans to assume the answer is well supported.

In addition, CoT prompting may conflict with legal constraints. Agencies must build an administrative record. They must disclose the basis for their decisions. If an agency uses CoT prompting, must it include the model’s full chain of thought in the record? If it does, the record may include irrelevant or misleading reasoning. If it does not, the agency may not be able to show its reasoning. And if the chain of thought is generated after the fact, it may violate Chenery.

Ultimately, CoT prompting is a useful tool for improving LLM outputs, but it is not a cure for the black box problem. Agencies should not assume that CoT prompting makes LLMs suitable for high-stakes administrative decisionmaking. Courts should be skeptical of AI-generated explanations, especially when the agency cannot validate or reproduce the model’s reasoning.

Elliot E.C. Ping is the Associate Director of Litigation at the Institute for Policy Integrity at New York University School of Law.

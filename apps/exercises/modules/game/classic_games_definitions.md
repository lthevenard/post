# Definições (necessárias e suficientes) — Jogos clássicos 2x2

Base: `apps/exercises/td24-1.slides.8.pdf` (Aula 8).

Este arquivo fixa critérios **operacionais** (checáveis a partir da matriz de payoffs) para classificar um jogo simultâneo 2x2 como um dos “jogos clássicos” usados no exercício `classic_games`.

## Setup e notação

- Dois jogadores: **1** e **2**.
- Cada jogador tem **duas estratégias**: `S1 = {s1a, s1b}` e `S2 = {s2a, s2b}`.
- Payoffs: `u1(s1, s2)` e `u2(s1, s2)` para cada perfil `(s1, s2)`.

### Conceitos usados

**Equilíbrio de Nash em estratégias puras (EN puro).** Um perfil `(s1*, s2*)` é EN puro sse:
- `u1(s1*, s2*) ≥ u1(s1, s2*)` para todo `s1 ∈ S1`, e
- `u2(s1*, s2*) ≥ u2(s1*, s2)` para todo `s2 ∈ S2`.

**Estratégia estritamente dominante.** Uma estratégia `s1d ∈ S1` é estritamente dominante para o Jogador 1 sse:
`u1(s1d, s2) > u1(s1, s2)` para todo `s1 ≠ s1d` e para todo `s2 ∈ S2`. (Análogo para o Jogador 2.)

**Pareto-dominância.** Um perfil `x` *Pareto-domina* um perfil `y` sse:
`u1(x) > u1(y)` **e** `u2(x) > u2(y)`.

**Segurança (maximin).** Para cada jogador `i` e estratégia `si`:
`sec_i(si) = min_{s_-i} u_i(si, s_-i)`.
Uma estratégia `si^sec` é *maximin* sse maximiza `sec_i(·)` dentro de `Si`.

> Observação (para evitar ambiguidades no app): ao gerar instâncias, prefira payoffs sem empates nos comparativos relevantes (exceto quando a própria definição exige indiferença, como em “Coordenação Pura”).

## Critérios de classificação

Em todos os itens abaixo, “equilíbrio(s)” significa(m) **EN em estratégias puras**.

### 1) Dilema dos Prisioneiros

Um jogo 2x2 é um **Dilema dos Prisioneiros** sse:

1. O Jogador 1 tem uma estratégia **estritamente dominante**.
2. O Jogador 2 tem uma estratégia **estritamente dominante**.
3. Seja `(d1, d2)` o perfil formado pelas estratégias dominantes (logo, o **único** EN puro). Existe um outro perfil `(s1, s2)` que **Pareto-domina** `(d1, d2)`, isto é:
   - `u1(s1, s2) > u1(d1, d2)` e
   - `u2(s1, s2) > u2(d1, d2)`.

### 2) Jogo da Caça ao Veado (Stag Hunt)

Um jogo 2x2 é **Caça ao Veado** sse:

1. Existem **exatamente dois** EN puros (`e1` e `e2`).
2. Um deles é **estritamente melhor para ambos** (Pareto-superior): existe uma rotulagem `e_hi` e `e_lo` em `{e1, e2}` tal que:
   - `u1(e_hi) > u1(e_lo)` e
   - `u2(e_hi) > u2(e_lo)`.
3. O equilíbrio Pareto-inferior `e_lo` é o resultado de ambos jogarem estratégias de **segurança (maximin)**:
   - seja `s1^sec` uma estratégia maximin do Jogador 1 e `s2^sec` uma estratégia maximin do Jogador 2,
   - então `e_lo = (s1^sec, s2^sec)`.

Intuição operacional: há um equilíbrio “melhor” (para ambos) e um equilíbrio “seguro”; o seguro pode ser selecionado porque cada jogador garante um payoff mínimo ao jogar sua estratégia maximin.

### 3) Jogo da Galinha (Gaviões e Pombos / Hawk–Dove)

Um jogo 2x2 é **Jogo da Galinha** (também conhecido como **Gaviões e Pombos / Hawk–Dove**) sse existem rótulos para as estratégias de cada jogador como **Gavião** (`H`, agressivo) e **Pombo** (`D`, acomodador) de forma que:

- Os EN puros são exatamente os perfis “um agressivo, outro acomodador”: `{(H1, D2), (D1, H2)}`.
- Além disso, para **cada** jogador `i`, os payoffs obedecem a ordenação estrita:
  - **melhor**: “eu sou agressivo e o outro acomoda”  
    `u_i(H_i, D_-i)`
  - depois: “ambos acomodam”  
    `u_i(D_i, D_-i)`
  - depois: “eu acomodo e o outro é agressivo”  
    `u_i(D_i, H_-i)`
  - **pior**: “ambos são agressivos”  
    `u_i(H_i, H_-i)`

Em símbolos, para `i = 1, 2`:

`u_i(H_i, D_-i) > u_i(D_i, D_-i) > u_i(D_i, H_-i) > u_i(H_i, H_-i)`.

Essa ordenação captura a ideia central dos slides: se ambos tentam obter o maior payoff possível via estratégia agressiva (`H`), o resultado (`H,H`) é o pior para ambos.

### 4) Batalha dos Sexos

Um jogo 2x2 é **Batalha dos Sexos** sse:

1. Existem **exatamente dois** EN puros (`e1` e `e2`).
2. Para **ambos os jogadores**, **qualquer** equilíbrio é estritamente melhor do que **qualquer** perfil que não seja equilíbrio:
   - para `i ∈ {1,2}` e para `e ∈ {e1, e2}` e `x ∉ {e1, e2}`: `u_i(e) > u_i(x)`.
3. Há **conflito distributivo** entre os equilibria: cada jogador prefere um equilíbrio diferente. Formalmente, existe uma ordem (`e_pref_1`, `e_pref_2`) com `{e_pref_1, e_pref_2} = {e1, e2}` tal que:
   - `u1(e_pref_1) > u1(e_pref_2)` e
   - `u2(e_pref_2) > u2(e_pref_1)`.

### 5) Coordenação Pura

Um jogo 2x2 é **Coordenação Pura** sse:

1. Existem **exatamente dois** EN puros (`e1` e `e2`).
2. Para **ambos os jogadores**, **qualquer** equilíbrio é estritamente melhor do que **qualquer** perfil que não seja equilíbrio:
   - para `i ∈ {1,2}` e para `e ∈ {e1, e2}` e `x ∉ {e1, e2}`: `u_i(e) > u_i(x)`.
3. Os equilíbrios são **idênticos** do ponto de vista de payoff (jogadores indiferentes entre eles):
   - `u1(e1) = u1(e2)` **e** `u2(e1) = u2(e2)`.

### 6) Nenhum dos jogos clássicos

O jogo é **“nenhum dos jogos clássicos estudados”** sse **não** satisfaz as condições necessárias e suficientes de **nenhuma** das cinco classes acima.


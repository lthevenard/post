# App Lotteries — README

O app **Lotteries** é um simulador interativo hospedado dentro do site em:

- `#/pt/apps/lotteries`
- `#/en/apps/lotteries`

**Status:** versão 1.0 (funcional e com layout adaptado para mobile).

## Propósito

O app ajuda estudantes a compreender decisões sob risco explorando loterias com resultados discretos. O foco pedagógico é:

- valor esperado como média de longo prazo,
- dispersão/risco em torno dessa média,
- convergência das frequências observadas às probabilidades teóricas,
- e por que loterias com o mesmo valor esperado podem ser muito diferentes.

## Fluxo de Uso (o que o app faz)

1. Defina a **Loteria 1** e a **Loteria 2** com payoffs e probabilidades.
2. Escolha o número máximo de simulações (`Nmax`).
3. Selecione o modo de seed (automático ou manual) e clique em **Simular**.
4. Explore os resultados nas abas:
   - **Início**: introdução, como usar, regras de input.
   - **Loteria 1 / Loteria 2**: distribuição teórica, valor esperado, desvio‑padrão e tabela de simulação.
   - **Dispersão**: gráficos de dispersão e comparações com tooltips.
   - **Convergência**: slider + animação comparando frequências observadas vs probabilidades teóricas.
   - **Sobre**: contexto pedagógico e interpretação.

## Arquitetura (alto nível)

O app segue um pipeline **state‑driven e modular**:

1. Inicialização do estado.
2. Wiring dos inputs (valores, probabilidades, N, seed).
3. Pipeline de simulação.
4. Renderização de gráficos e tabelas.
5. Controles interativos (abas, slider, animação, tooltips).

Princípios:

- JavaScript puro (sem frameworks).
- Um único estado explícito como fonte de verdade.
- Lógica de negócio não lê diretamente do DOM.
- Simulações determinísticas com PRNG seeded.

## Modelo de Estado (campos principais)

O estado é definido em `apps/lotteries/controller/state.js` e inclui:

- `inputs`: valores brutos (payoffs, probabilidades, `nMax`, seed).
- `seedUsed`: seed efetivamente usado.
- `lottery`: descrições teóricas (`d1`, `d2`), tabelas de simulação e `N`.
- `simUI`: estado do slider/animação.

Toda renderização depende desse estado.

## Motor de Simulação

Implementado em `apps/lotteries/model/`:

- **Parsing**: listas separadas por `;` com decimais em `.` (`apps/shared/parsing/listParser.js`).
- **Validação** (`model/lottery.js`):
  - valores e probabilidades não podem ser vazios,
  - mesmo tamanho,
  - máximo de 20 resultados,
  - probabilidades entre 0 e 1,
  - probabilidades somam 1.
- **Teoria**: valor esperado, variância, desvio‑padrão e distribuição agrupada.
- **Simulação** (`model/simulation.js`):
  - RNG determinístico (Mulberry32) com seed de 5 dígitos,
  - tabela de simulação para `t = 1..N`, contendo
    - contagens de resultados,
    - retornos totais,
    - retornos médios,
    - lucro vs valor esperado.

## Renderização e UI

A renderização fica em `views/` e é orquestrada por `controller/render.js`:

- **Gráficos SVG** (sem libs externas): `views/charts.js`.
- **Abas de Loteria**: barras de distribuição + gráfico de valor esperado/dispersão, com tooltips.
- **Dispersão**: scatter plots e comparativos com tooltips.
- **Convergência**: slider + animação, frequências observadas vs teóricas, seed exibido.
- **Fórmulas**: KaTeX carregado via CDN em `views/page.js`.

## Estrutura de Arquivos (atual)

```
apps/lotteries/
├─ index.js                 # Entrada do app (mountApp)
├─ styles.css               # Estilos do app
├─ assets/                  # Logos e imagens
├─ controller/
│  ├─ state.js              # Estado central
│  ├─ actions.js            # Pipeline de simulação
│  └─ render.js             # Pipeline de renderização
├─ wiring/
│  ├─ inputs.js             # Sincronização de inputs
│  ├─ seed.js               # Seed
│  ├─ slider.js             # Slider/animação
│  └─ tabs.js               # Navegação de abas
├─ model/
│  ├─ lottery.js            # Parsing + teoria (EV, variância, SD)
│  └─ simulation.js         # RNG determinístico + simulações
└─ views/
   ├─ page.js               # Estrutura da UI + KaTeX
   ├─ charts.js             # Gráficos SVG
   └─ tabs/
      ├─ lottery.js         # Abas de loteria
      ├─ dispersion.js      # Aba de dispersão
      └─ convergence.js     # Aba de convergência
```

## Integração com o Site

- Catálogo: `apps/apps.json` (`slug: "lotteries"`).
- Router: `apps/router.js` faz lazy‑load de `apps/lotteries/index.js`.
- O entry point exporta `mountApp(mount, { lang })`.

## Responsividade

O app é responsivo. Em telas pequenas, a sidebar de inputs é movida para dentro da aba Início para melhorar a leitura e o fluxo. O layout desktop permanece o mesmo.

## Princípios de Design a Preservar

- Arquitetura state‑driven.
- Simulações determinísticas e reprodutíveis.
- Separação clara de responsabilidades (inputs, modelo, render, wiring).
- Clareza pedagógica acima de complexidade visual.
- Sem dependências de frameworks.

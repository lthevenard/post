# Architecture — Decision Theory Apps (JS) on GitHub Pages

## 1. Objetivo

Migrar (recriar) aplicações feitas originalmente em Shiny para uma implementação **100% front-end em JavaScript**, hospedada no **GitHub Pages**, mantendo a experiência do usuário o mais contínua possível com o site pessoal existente (mesmo layout, header/nav, tipografia e “cards”).

O primeiro app a migrar é o app de **loterias/valor esperado**, que hoje:
- recebe listas de payoffs e probabilidades em inputs de texto;
- calcula descrição/EV e desvio teórico;
- simula compra de 1..N bilhetes para 2 loterias;
- exibe gráficos e tabelas em múltiplas abas (“About”, “Lottery 1”, “Lottery 2”, “Simulation Comparisons”, “Instructions”)【app.R】;
- enfatiza convergência da média amostral ao EV e limitações do EV (dispersão).

## 2. Requisitos funcionais (MVP do app de loterias)

### 2.1 Entradas
- Payoffs: string com números separados por `;` (pode ter negativos).
- Probabilidades: string com números decimais [0,1] separados por `;`.
- Restrições:
  - listas com mesmo comprimento;
  - soma das probabilidades = 1;
  - comprimento máximo = 20;
  - padrão “decimal com ponto” (convenção americana)【resources.R: Instructions】.
- “Simulate” dispara recomputação (equivalente ao `actionButton("go","Simulate")` no Shiny)【app.R】.

### 2.2 Saídas / Views
Replicar (com adaptações mínimas) os principais outputs do Shiny:

**Aba Lottery 1 e Lottery 2 (para cada loteria)**
- Descrição textual formatada (lista de outcomes A, B, C… com payoff e %).
- Gráfico de distribuição teórica (bar).
- Resumo com EV e desvio padrão teórico.
- Gráfico “Expected value and deviation” (ponto + barra/intervalo).

**Aba Simulation Comparisons**
- Slider “Number of tickets (N)” para visualizar distribuição relativa e comparações em um N específico.
- Gráfico de frequência relativa dos outcomes (bar) comparando as 2 loterias.
- Tabelas com simulações completas (Tickets, outcomes A/B/…, Returns, Mean Returns, Profit)【README.md】.
- Dois gráficos de “Mean Returns vs Tickets” com linha horizontal no EV.

**Aba About / Instructions**
- Conteúdo estático (markdown/HTML), com textos já existentes (About, disclaimer e instructions).

### 2.3 Performance (princípio)
O Shiny já sinaliza lentidão em N=1000【README.md】. Em JS, o MVP deve:
- ser responsivo para N até 1000;
- evitar recomputar tudo a cada mudança de slider (somente no clique “Simulate”);
- usar estratégia incremental e/ou pré-computação eficiente (ver seção 6).

## 3. Requisitos de UX: “experiência contínua” com o site

Há duas estratégias possíveis:

### Estratégia A (preferida): Apps como rotas do SPA do site
- Adicionar uma rota `#/pt/apps` e subrotas `#/pt/apps/lotteries` etc.
- Renderizar o app **dentro do mesmo container** do site (`#app`) para manter:
  - header/nav,
  - botão de idioma,
  - estilos (cards, list, etc.).
- Os apps viram “páginas internas”, sem aparência de “sair do site”.

**Vantagens**
- UX contínua (objetivo principal).
- Reaproveita CSS e padrões de layout do site.

**Desvantagens**
- Precisa modularizar JS (para não “inflar” `script.js`).
- Carregamento sob demanda (lazy-load) recomendado.

### Estratégia B: Apps como páginas autônomas, com “chrome” compartilhado
- Cada app em `/apps/<slug>/index.html`.
- Importa `styles.css` do site e um pequeno `chrome.js` para desenhar header/footer similares.
- Links explícitos “Back to site”.

**Vantagens**
- Isolamento máximo (cada app independente).
- Menos mudanças no roteador do site.

**Desvantagens**
- UX mais fragmentada (a preocupação levantada).

**Decisão**: implementar **Estratégia A** no MVP.

## 4. Estrutura de repositório

A ideia é separar:
- “site shell” (roteamento e layout global),
- “apps” (cada app com módulos próprios),
- “shared” (utilidades e componentes comuns).

Proposta de árvore:

/
├─ index.html
├─ styles.css
├─ script.js                      # SPA atual (site)
├─ apps/
│  ├─ apps.json                   # catálogo (slug, título, descrição, tags, lang, status)
│  ├─ shared/
│  │  ├─ ui/
│  │  │  ├─ layout.js             # helpers p/ cards, grids, forms (sem framework)
│  │  │  ├─ tabs.js               # componente de abas (About/Lottery1/...)
│  │  │  └─ table.js              # tabela simples + formatação condicional (Profit +/-)
│  │  ├─ math/
│  │  │  ├─ rng.js                # RNG helpers (opcional; default Math.random no MVP)
│  │  │  └─ stats.js              # mean, sd, cumulative sums
│  │  └─ parsing/
│  │     └─ listParser.js         # parse "1; 2; -3" etc.
│  └─ lotteries/
│     ├─ index.js                 # entry do app (render + lifecycle)
│     ├─ model/
│     │  ├─ lottery.js            # describeLottery, validation, EV, theoretical dist
│     │  └─ simulation.js         # sim engine + geração de tabelas 1..N
│     ├─ views/
│     │  ├─ page.js               # layout geral do app (sidebar + tabs)
│     │  ├─ charts.js             # wrappers de chart lib escolhida
│     │  └─ copy.js               # textos About/Instructions/Disclaimer (pt/en)
│     └─ styles.css               # (opcional) CSS só do app; preferir reutilizar styles.css
├─ docs/
│  ├─ architecture.md             # este documento
│  ├─ roadmap.md                  # milestones (MVP, v1, v2)
│  └─ data-contracts.md           # contratos de inputs/outputs e formatos
└─ vendor/
   ├─ plotly.min.js               # se decidirmos manter Plotly-like charts sem bundler
   └─ (outros vendors)

Notas:
- `apps/apps.json` permite listar apps no site (futuro menu “Apps”).
- `apps/shared/` vira base para o segundo app (exercícios aleatórios) sem duplicação.

## 5. Integração com o roteamento do site

### 5.1 Nova rota e páginas
Adicionar no roteador:
- `apps` → página índice de apps (`renderAppsIndex`)
- `apps/<slug>` → página do app (`renderAppShell`)

Como o site já usa hash routing `#/pt/...`, manteremos o mesmo padrão:
- `#/pt/apps`
- `#/pt/apps/lotteries`

### 5.2 Carregamento sob demanda (lazy-load)
Para evitar aumentar muito o JS inicial, cada app deve ser carregado quando o usuário navegar para ele:
- `import()` dinâmico do entry `apps/<slug>/index.js` (ou alternativa sem bundler: carregar `<script type="module">`).

### 5.3 “App shell” e consistência visual
Cada app renderiza dentro do container do site usando:
- `<section class="card">` e `<div class="list-item">` etc., reaproveitando o CSS atual (cards, list, stacked actions)【styles.css】.

## 6. Arquitetura interna do app de loterias

### 6.1 Separação em camadas
**(a) Parsing & Validation**
- `parseNumberList("20; 40; 0") -> number[]`
- `validate(values, probs) -> { ok, errors[] }`
Regras espelhadas do Shiny (mesmo comprimento, soma=1, max=20, NaN etc.)【resources.R】.

**(b) Model (descrição)**
- `describeLottery(values, probs) -> { outcomes, cumProbs, EV, theoreticalDist, sd }`
Inclui:
- outcomes nomeados “A, B, C…” (até 20)【resources.R: get_result_names】;
- probabilidades cumulativas para sorteio por `U(0,1)`【resources.R: cumulate_percentages, select_result】;
- EV: `sum(values * probs)`【resources.R: calc_expected_value】;
- desvio padrão teórico (definição consistente com o que já era mostrado no app).

**(c) Simulation**
No Shiny, a tabela simula “Tickets = 1..N” e, para cada Tickets, sorteia outcomes e computa:
- contagens por outcome,
- Returns,
- Mean Returns,
- Profit (em função do EV)【README.md】.

Em JS, manteremos a mesma semântica, com melhorias de performance:
- gerar incrementalmente as simulações de 1..N reaproveitando estado;
- ou gerar apenas alguns pontos e interpolar (opcional; não no MVP).

**(d) Views**
- Sidebar: inputs de 2 loterias + N max + botão Simulate.
- Tabs: About / Lottery1 / Lottery2 / Comparisons / Instructions.
- Charts: bar teórico, EV+desvio, comparação de frequências, mean returns scatter.
- Tables: duas tabelas grandes (podem ser paginadas/colapsáveis no MVP para performance).

### 6.2 Estado do app (client-side)
Um único `state` em memória:
- `state.inputs` (strings + parsed arrays),
- `state.description` (lottery1 e lottery2),
- `state.simulation` (tabelas e séries para gráficos),
- `state.ui` (tab ativa, tickets slider atual).

Eventos:
- `Simulate` → parse+validate → compute describe → compute sim.
- `tickets slider` → atualiza somente gráficos dependentes do N selecionado (não recomputa sim).

## 7. i18n (pt/en) para os apps

O site já possui `i18n` central. Para apps:
- cada app terá `copy.js` com textos específicos (labels, instruções, disclaimers),
- e o app receberá `lang` do roteador do site.
No índice `apps/apps.json`, cada item pode ser:
- “bilingue” (mesmo app em ambas línguas),
- ou “single language” (exibido em ambas versões do site, com badge/flag, seguindo o padrão híbrido já usado em slides/pubs).

## 8. Bibliotecas e dependências (decisão do MVP)

Sem gerar código agora, a decisão arquitetural é:
- **Preferir zero dependências** para parsing/model/sim.
- Para charts:
  - opção 1: Plotly (mais próximo do Shiny atual, que usa `plotlyOutput`)【app.R】;
  - opção 2: Chart.js (mais leve; exige adaptar interações).

**Decisão provisória**: Plotly (por compatibilidade conceitual), podendo migrar depois.

Para tabelas:
- começar com tabela HTML simples (com paginação “caseira”).
- evitar DataTables pesado no MVP (só se necessário).

## 9. Roadmap (alto nível)

MVP-0 (infra)
- Criar rota /apps e página índice (placeholder).
- Criar loader de apps e estrutura de pastas.

MVP-1 (lotteries básico)
- Parsing + validation + describeLottery.
- UI com inputs e abas; About/Instructions.
- Gráficos teóricos e EV+desvio.

MVP-2 (simulação completa)
- Sim engine 1..N e tabela.
- Comparisons (slider tickets_n + gráficos).

MVP-3 (polimento)
- Ajustes de performance.
- Acessibilidade e responsividade.
- “Back to site” e breadcrumbs.

## 10. Critérios de aceite do MVP (lotteries)
- Roda no GitHub Pages sem backend.
- Mantém header/nav do site e aparência consistente (cards etc.)【styles.css】.
- Regras de input equivalentes às instruções originais (listas, soma=1, max=20)【resources.R】.
- Outputs principais equivalentes aos do Shiny (descrição, EV, simulações, comparações)【README.md】【app.R】.


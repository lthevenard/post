# LOTTERIES APP — CURRENT PROJECT CONTEXT (JavaScript)

This document describes the **current structure and architecture** of the Lotteries app,
a JavaScript reimplementation of a Shiny application, integrated into a personal static website.
It is intended to be reused in future ChatGPT sessions to preserve project continuity.

---

## 1. GENERAL OVERVIEW

The Lotteries app is a **vanilla JavaScript** application embedded in a static website
(GitHub Pages), accessible via internal routing:

- `#/pt/apps/lotteries`
- `#/en/apps/lotteries`

The app simulates lotteries defined by discrete payoffs and probabilities, showing:

- Theoretical results (expected value, standard deviation, distributions)
- Simulation results using seeded RNG
- Convergence of observed frequencies to theoretical probabilities as sample size grows

The app is **fully modularized**, with clear separation between:
- state management
- simulation logic
- rendering
- UI wiring (event listeners)

---

## 2. HIGH-LEVEL ARCHITECTURE

The app follows a **pipeline-based architecture**:

1. **State initialization**
2. **Input wiring → state synchronization**
3. **Simulation pipeline**
4. **Rendering pipeline**
5. **Interactive controls (slider / animation)**

The `state` object is the **single source of truth**.
No business logic depends on reading values directly from the DOM.

---

## 3. CURRENT FILE STRUCTURE

```text
apps/
└─ lotteries/
   ├─ index.js
   │   - App entry point (mountApp).
   │   - Orchestrates state creation, wiring, and pipelines.
   │   - Contains no HTML templates and no simulation logic.
   │
   ├─ controller/
   │   ├─ state.js
   │   │   - Defines the app state structure.
   │   │   - Holds inputs, simulation results, and UI-related simulation state.
   │   │
   │   ├─ actions.js
   │   │   - Simulation pipeline.
   │   │   - Validates inputs, resolves seed, runs simulations.
   │   │   - Writes all results into state.
   │   │
   │   └─ render.js
   │       - Rendering pipeline.
   │       - Renders lottery tabs, convergence tab, charts.
   │       - Wires slider/animation after simulation.
   │
   ├─ wiring/
   │   ├─ tabs.js
   │   │   - Handles tab navigation (setActiveTab).
   │   │
   │   ├─ inputs.js
   │   │   - Keeps state.inputs synchronized with text inputs and Nmax.
   │   │
   │   ├─ seed.js
   │   │   - Keeps state.inputs.seedMode and seedManual synchronized with seed UI.
   │   │   - Controls visibility of manual seed input.
   │   │
   │   └─ slider.js
   │       - Controls the convergence slider and animation (play/stop/step/speed).
   │       - Updates observed frequencies and animated bar charts.
   │
   ├─ views/
   │   ├─ page.js
   │   │   - Renders the static UI shell:
   │   │     header, sidebar, tabs, containers.
   │   │   - Exposes DOM handles via `ui.els`.
   │   │   - No simulation or seed logic.
   │   │
   │   ├─ tabs/
   │   │   └─ convergence.js
   │   │       - Renders the Convergence tab shell
   │   │       - (slider, controls, placeholders for charts/tables).
   │   │
   │   └─ charts.js
   │       - SVG-based charts for theoretical distributions and EV ± σ.
   │
   ├─ model/
   │   ├─ lottery.js
   │   │   - Parsing and validation of lotteries.
   │   │   - Computes theoretical metrics (EV, SD, cumulative probabilities).
   │   │
   │   └─ simulation.js
   │       - Seeded RNG (deterministic).
   │       - Builds cumulative simulation tables (1..N).
   │
   └─ styles.css
       - App-scoped CSS.
       - Currently monolithic (to be split later if desired).
```

## 4. STATE STRUCTURE (SOURCE OF TRUTH)

The application uses an explicit **state object** as the single source of truth.
All simulation logic and rendering depend exclusively on this object, never on direct DOM reads.

The state is defined in `apps/lotteries/controller/state.js` and has the following structure:

```js
state = {
  lang,

  inputs: {
    values1,       // string: raw payoffs list for Lottery 1
    probs1,        // string: raw probabilities list for Lottery 1
    values2,       // string: raw payoffs list for Lottery 2
    probs2,        // string: raw probabilities list for Lottery 2
    nMax,          // integer: maximum number of simulations (N)
    seedMode,      // "auto" | "manual"
    seedManual     // string: manual seed input
  },

  seedUsed,        // integer: seed effectively used in last simulation

  lottery: {
    d1,            // theoretical description of Lottery 1
    d2,            // theoretical description of Lottery 2
    simTable1,     // cumulative simulation table for Lottery 1
    simTable2,     // cumulative simulation table for Lottery 2
    N              // integer: maximum N used in simulation
  },

  simUI: {
    selectedN,     // integer: current N selected in the convergence slider
    step,          // integer: animation step size
    delay,         // integer: animation delay (ms)
    isPlaying      // boolean: animation running state
  }
};
```

All updates to this object occur through controlled pipelines
(`actions.js`, `inputs.js`, `seed.js`).

## 5. SIMULATION PIPELINE

The simulation pipeline is implemented in:

- `apps/lotteries/controller/actions.js`

### Responsibilities

- Read inputs from `state.inputs`
- Parse and validate both lotteries
- Resolve the seed (automatic or manual)
- Compute theoretical lottery descriptions
- Run deterministic simulations (1..N)
- Store all results back into `state`
- Return `{ ok, errors }`

### Key function signature

```js
runSimulation(state, rawInputs)
```

Notes:
- This function does not touch the DOM
- It resets UI-related simulation state (`state.simUI`) when successful

## 6. RENDERING PIPELINE

The rendering pipeline is implemented in:

- `apps/lotteries/controller/render.js`

### Responsibilities

- Render Lottery 1 and Lottery 2 tabs (theoretical analysis)
- Render the Convergence tab shell
- Wire the convergence slider and animation controls
- Never re-run simulations

### Key function signature

``` js
renderAfterSimulation(ui, state)
```

Rendering is triggered **only after a successful simulation** and always reads
exclusively from the application state.

---

## 7. CONVERGENCE TAB (CURRENT MEANING)

The Convergence tab visualizes the **empirical convergence** of simulated outcomes.

Specifically, it shows:

- Observed outcome frequencies
- Compared to theoretical probabilities
- As the number of simulated tickets (N) increases

### Visual elements

- Animated bar charts (observed frequencies with theoretical reference lines)
- Tables of observed relative frequencies
- Slider-controlled animation with deterministic RNG
  (same seed → same trajectory)

This tab is meant to illustrate **convergence behavior**, not generic comparisons
between lotteries.

---

## 8. LOTTERY TABS — CURRENT STATE (UPDATED)

The Lottery 1 and Lottery 2 tabs now include a **complete pedagogical analysis pipeline**,
combining theoretical results, simulations, and guided explanations.

### Structure of each Lottery tab

Each lottery tab is rendered by `renderLotteryTab` and contains, in order:

1. **Lottery description card**
   - List of outcomes and probabilities.

2. **Theoretical distribution chart**
   - SVG-based bar chart of the theoretical probability mass function.

3. **Collapsible section: “What is the expected value and standard deviation?”**
   - Default state: collapsed.
   - Purpose: allow students to compute results by hand before revealing the solution.
   - Contents:
     - Solution box with theoretical expected value and standard deviation.
     - SVG chart showing expected value and ±1σ.
     - Two nested collapsible explanation boxes (same style as Convergence tab):
       - How to compute the expected value (formula + interpretation).
       - How to compute the standard deviation (formula + interpretation).
     - Mathematical expressions rendered using **KaTeX**.

4. **Collapsible section: “Simulation results”**
   - Default state: collapsed.
   - Paginated table (10 rows per page) showing cumulative simulation results for N = 1..Nmax.
   - Columns:
     - Tickets (N)
     - One column per outcome (A, B, C, …)
     - Returns (total payoff)
     - Mean Returns (Returns / N)
     - Profit (relative to buying tickets at expected value)
   - Enhanced pagination:
     - Start / End buttons
     - Previous / Next buttons
     - Clickable page numbers with ellipses for large N (e.g., 1 … 27 28 29 30 31 32 33 … 100)
   - Monetary columns are color-coded:
     - Green for positive values
     - Red for negative values

5. **Seed information card (same as Convergence tab)**
   - Displays the seed actually used in the simulation.
   - Reinforces reproducibility and determinism.

Additional UI refinements:
- Increased vertical spacing between collapsible sections.
- Explicit horizontal separator between the last collapsible section and the seed card.

---

## 8. WHAT IS ALREADY DONE

- Full modularization of the app
- Explicit, centralized state (`controller/state.js`)
- Deterministic simulation engine (`model/simulation.js`)
- Seed handling (auto/manual) wired to `state.inputs`
- Convergence visualization with animation (slider + play/stop + step/speed)
- Clean separation between:
  - state
  - model
  - rendering
  - wiring
- Removal of legacy DOM-driven logic from `views/page.js`

---

## 9. WHAT IS STILL PENDING / OPTIONAL

- Split `styles.css` into multiple files (to be done at the end):
  - base styles
  - slider styles
  - convergence-specific styles
- Add additional convergence-related plots (e.g., mean return vs. N)
- Export simulation results (CSV)
- Minor UI/UX refinements and accessibility improvements
- Optional: extract About / Instructions tab content into dedicated renderers

---

## 10. DESIGN PRINCIPLES TO PRESERVE

- Vanilla JavaScript only (no frameworks)
- Deterministic and reproducible simulations
- State-driven architecture (state as source of truth)
- No business logic reading directly from the DOM
- Clear separation between:
  - parsing / validation
  - simulation logic
  - rendering
  - UI wiring

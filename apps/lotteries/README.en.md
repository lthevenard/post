# Lotteries App — README

The **Lotteries** app is an interactive simulator embedded in the site at:

- `#/en/apps/lotteries`
- `#/pt/apps/lotteries`

**Status:** version 1.0 (fully functional and mobile‑ready).

## Purpose

This app helps students understand decisions under risk by exploring lotteries with discrete outcomes. It focuses on:

- expected value as a long‑run average,
- dispersion/risk around that average,
- convergence of observed frequencies to theoretical probabilities,
- and why lotteries with the same expected value can still be very different.

## User Flow (What the App Does)

1. Define **Lottery 1** and **Lottery 2** with payoffs and probabilities.
2. Choose the maximum number of simulations (`Nmax`).
3. Select a seed mode (auto or manual) and run **Simulate**.
4. Explore the results across the tabs:
   - **Home**: intro, how‑to, input rules.
   - **Lottery 1 / Lottery 2**: theoretical distribution, expected value, standard deviation, and simulation table.
   - **Dispersion**: scatter plots and comparative dispersion visuals with tooltips.
   - **Convergence**: slider + animation comparing observed frequencies vs theoretical probabilities.
   - **About**: pedagogical context and interpretation.

## Architecture (High‑Level)

The app follows a **state‑driven, modular pipeline**:

1. Initialize state.
2. Wire inputs (values, probabilities, N, seed).
3. Run simulation pipeline.
4. Render charts and tables.
5. Wire interactive controls (tabs, slider, animation, tooltips).

Key principles:

- Vanilla JavaScript only (no frameworks).
- A single explicit state object as the source of truth.
- Business logic does **not** read from the DOM.
- Deterministic simulations using a seeded PRNG.

## State Model (Core Fields)

The state lives in `apps/lotteries/controller/state.js` and includes:

- `inputs`: raw user inputs (values, probabilities, `nMax`, seed mode, manual seed).
- `seedUsed`: the resolved seed for the last simulation.
- `lottery`: theoretical descriptions (`d1`, `d2`), simulation tables, and `N`.
- `simUI`: slider and animation state.

All rendering depends on this state.

## Simulation Engine

Implemented in `apps/lotteries/model/`:

- **Parsing**: semicolon‑separated lists with `.` decimals (`apps/shared/parsing/listParser.js`).
- **Validation** (`model/lottery.js`):
  - values and probabilities must be non‑empty,
  - same length,
  - max 20 outcomes,
  - probabilities between 0 and 1,
  - probabilities must sum to 1.
- **Theory**: expected value, variance, standard deviation, and grouped distributions.
- **Simulation** (`model/simulation.js`):
  - deterministic RNG (Mulberry32) seeded with a 5‑digit integer,
  - simulation table for `t = 1..N`, including
    - outcome counts,
    - total returns,
    - mean returns,
    - profit vs expected value.

## Rendering & UI

Rendering is split across `views/` and wired in `controller/render.js`:

- **SVG charts** (no external chart libs): `views/charts.js`.
- **Lottery tabs**: theoretical distribution bars + expected value/dispersion plot, with tooltips.
- **Dispersion tab**: scatter plots and comparative charts with hover tooltips.
- **Convergence tab**: slider + animation, observed vs theoretical frequencies, seed display.
- **Math formulas**: KaTeX (loaded via CDN in `views/page.js`).

## File Structure (Current)

```
apps/lotteries/
├─ index.js                 # App entry (mountApp)
├─ styles.css               # App-scoped styles
├─ assets/                  # App logos and images
├─ controller/
│  ├─ state.js              # Central app state
│  ├─ actions.js            # Simulation pipeline
│  └─ render.js             # Rendering pipeline
├─ wiring/
│  ├─ inputs.js             # Input/state sync
│  ├─ seed.js               # Seed handling
│  ├─ slider.js             # Convergence slider + animation
│  └─ tabs.js               # Tab navigation
├─ model/
│  ├─ lottery.js            # Parsing + theory (EV, variance, SD)
│  └─ simulation.js         # Deterministic RNG + simulation tables
└─ views/
   ├─ page.js               # UI shell + layout + KaTeX loader
   ├─ charts.js             # SVG charts
   └─ tabs/
      ├─ lottery.js         # Lottery tab renderers
      ├─ dispersion.js      # Dispersion tab renderer
      └─ convergence.js     # Convergence tab renderer
```

## Integration with the Main Site

- Catalog entry: `apps/apps.json` (`slug: "lotteries"`).
- Router: `apps/router.js` lazy‑loads `apps/lotteries/index.js`.
- Entry point must export `mountApp(mount, { lang })`.

## Responsiveness

The app is responsive. On small screens, the sidebar input panel is moved into the Home tab to keep the flow readable. Desktop layout remains unchanged.

## Design Principles to Preserve

- State‑driven architecture.
- Deterministic and reproducible simulations.
- Clear separation of concerns (inputs, model, render, wiring).
- Pedagogical clarity over visual complexity.
- No framework dependencies.

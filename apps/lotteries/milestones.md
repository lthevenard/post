# Lotteries App — Development Milestones

This document describes the incremental milestones for rebuilding the original
Shiny lottery simulator as a JavaScript app integrated into the personal website.

The guiding principle is to treat the Shiny app as a *functional specification*
and implement features in small, testable steps.

---

## Milestone A — Inputs, Parsing, Validation, and Live UI (MVP Base)

**Goal:**  
Have a working page where users can input lotteries, click “Simulate”, and receive
clear validation feedback. No charts or simulations yet.

**Implemented features:**
- Sidebar UI with:
  - Lottery 1 and Lottery 2 inputs (payoffs and probabilities)
  - Slider for maximum number of simulations (N)
  - “Simulate” button
- Parsing of semicolon-separated numeric lists
- Validation rules:
  - Same number of payoffs and probabilities
  - Probabilities sum to 1
  - Probabilities in [0, 1]
  - Maximum of 20 outcomes
  - Dot (`.`) as decimal separator
- Error box mimicking the original Shiny behavior
- Tab navigation (About, Lottery 1, Lottery 2, Comparisons, Instructions)

**Key files:**
- `shared/parsing/listParser.js`
- `lotteries/model/lottery.js`
- `lotteries/views/page.js`
- `lotteries/index.js`

**Acceptance check:**
- Invalid inputs produce clear error messages
- Valid inputs are parsed and displayed correctly
- No simulation is run yet

---

## Milestone B — Lottery Description and Theoretical Results

**Goal:**  
Fully populate the “Lottery 1” and “Lottery 2” tabs with theoretical information.

**Features to add:**
- Lottery description:
  - Outcome labels (A, B, C, …)
  - Textual description of payoffs and probabilities
- Theoretical metrics:
  - Expected Value (EV)
  - Theoretical standard deviation
- Charts:
  - Bar chart of theoretical probability distribution
  - EV with standard deviation visualization

**Key files:**
- `lotteries/model/lottery.js` (describeLottery, EV, SD, cumulative probabilities)
- `lotteries/views/charts.js`

**Acceptance check:**
- Lottery tabs match the informational content of the original Shiny app
- Results update only when “Simulate” is clicked

---

## Milestone C — Simulation Engine (1..N)

**Goal:**  
Reproduce the core simulation logic of the Shiny app.

**Features to add:**
- Incremental simulation from 1 to N tickets
- For each N:
  - Outcome counts
  - Total returns
  - Mean returns
  - Profit relative to expected value
- Efficient cumulative simulation (no re-simulation for each N)

**Key files:**
- `lotteries/model/simulation.js`

**Acceptance check:**
- Simulation results are deterministic given RNG
- Tables and results scale smoothly up to N = 1000

---

## Milestone D — Simulation Tables and Comparisons

**Goal:**  
Complete the “Simulation Comparisons” tab.

**Features to add:**
- Tables for Lottery 1 and Lottery 2:
  - Tickets
  - Outcome counts
  - Returns
  - Mean returns
  - Profit (with conditional formatting)
- Charts:
  - Mean returns vs. number of tickets (with EV reference line)
  - Relative frequency distribution for a selected number of tickets

**Key files:**
- `shared/ui/table.js`
- `lotteries/views/charts.js`

**Acceptance check:**
- Slider for number of tickets only changes visualization
- Simulation is not re-run when slider moves

---

## Milestone E — Polish and Integration

**Goal:**  
Finalize the app for production use on the site.

**Possible enhancements:**
- Performance optimizations
- Better responsive layout
- Consistent styling with site-wide CSS
- Accessibility improvements
- Optional export of results (CSV)

---

## Design Principles

- No frameworks (vanilla JS + small helpers)
- Clear separation:
  - parsing / validation
  - model logic
  - view rendering
  - app controller
- Shiny app behavior is the reference, not the implementation

---

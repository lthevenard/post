// ============================================================================
// Convergence Tab Rendering
// ============================================================================

/**
 * Renders the Convergence tab.
 * @param {HTMLElement} container
 * @param {object} ctx
 * @param {"pt"|"en"} ctx.lang
 * @param {number} ctx.N
 * @param {number} ctx.seedUsed
 * @returns {void}
 */
export function renderConvergenceTab(container, { lang, N, seedUsed }){
  const isEn = lang === "en";

  container.innerHTML = `
    <h2 class="lottery-panel-title">
      ${isEn ? "Convergence of observed frequencies to theoretical probabilities" : "Convergência das frequências observadas às probabilidades teóricas"}
    </h2>

    <div class="lottery-card lottery-explainer" id="convergence-explainer">
      <div style="display:flex; justify-content:space-between; align-items:center; gap:12px;">
        <strong>
          ${isEn ? "How to vizualize this animation" : "Como vizualizar esta animação"}
        </strong>

        <span
          id="toggle-convergence-explainer"
          class="lotteries-toggle-link"
          role="button"
          tabindex="0"
        >
          ${isEn ? "Hide explanation" : "Ocultar explicação"}
        </span>
      </div>

      <p style="margin: 8px 0 0 0;">
        ${
          isEn
            ? "In this tab, you can visualize how the observed frequencies of each outcome evolve as the number of simulations increases. The animation shows, for different values of N, the proportion of times each outcome occurs, allowing a direct comparison between empirical frequencies and the lottery’s theoretical probabilities."
            : "Nesta aba, você pode visualizar como as frequências observadas de cada resultado evoluem à medida que o número de simulações aumenta. A animação mostra, para diferentes valores de N, a proporção de vezes em que cada resultado ocorreu, permitindo comparar diretamente essas frequências empíricas com as probabilidades teóricas da loteria."
        }
      </p>

      <p style="margin: 8px 0 0 0;">
        ${
          isEn
            ? "Notice how, for low values of N, frequencies fluctuate more intensely, but gradually stabilize around the theoretical probabilities as N increases."
            : "Observe como, para valores baixos de N, as frequências oscilam mais intensamente, mas se estabilizam em torno das probabilidades teóricas à medida que N aumenta."
        }
      </p>
      
      <p style="margin: 8px 0 0 0;">
        ${
          isEn
            ? "Use the controls to adjust the animation step (that is, how much the value of N increases at each frame) and the animation speed, then click “Animate” to start."
            : "Use os controles para escolher o intervalo da animação (isto é, de quanto em quanto o valor de N aumenta a cada passo) e a velocidade da animação, e clique em “Animar” para iniciar."
        }
      </p>
    </div>



    <div class="lottery-card">
      <div class="lottery-card-title">
        ${isEn ? "Number of tickets (N)" : "Número de bilhetes (N)"}
      </div>

      <div class="lottery-slider-wrap">
        <div class="lottery-slider-col">
          <input
            id="tickets_n"
            class="lottery-slider"
            type="range"
            min="1"
            max="${N}"
            step="1"
            value="1"
          />
          <div class="lottery-slider-scale">
            <span>1</span>
            <span>${N}</span>
          </div>
        </div>

        <div id="tickets_n_value" class="lottery-slider-value">1</div>
      </div>

      <div style="margin-top:10px; display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
        <button id="tickets_play" class="lotteries-link-btn" type="button">
          ${isEn ? "Play" : "Animar"}
        </button>

        <button id="tickets_stop" class="lotteries-link-btn" type="button">
          ${isEn ? "Stop" : "Parar"}
        </button>

        <label style="display:inline-flex; align-items:center; gap:8px; font-size:12px; opacity:.85;">
          <span>${isEn ? "Step" : "Intervalo"}</span>
          <select id="tickets_step" style="padding:6px 8px; border-radius:10px;">
            <option value="1">1</option>
            <option value="5">5</option>
            <option value="10" selected>10</option>
            <option value="50">50</option>
          </select>
        </label>

        <label style="display:inline-flex; align-items:center; gap:8px; font-size:12px; opacity:.85;">
          <span>${isEn ? "Speed" : "Velocidade"}</span>
          <select id="tickets_speed" style="padding:6px 8px; border-radius:10px;">
            <option value="150">0.15s</option>
            <option value="350">0.35s</option>
            <option value="500">0.5s</option>
            <option value="750" selected>0.75s</option>
            <option value="1000">1s</option>
            <option value="2000">2s</option>
          </select>
        </label>
      </div>

      <hr style='height:1px; border:none; background:rgba(151, 157, 172, 0.12); margin:16px 0; margin-top: 30px; margin-bottom: 20px;'/>
      <div id="simulation_outcomes"></div>
    </div>

    <div class="lottery-card">
      <div class="lottery-card-title">
        ${isEn ? "Seed used" : "Seed utilizado"}
      </div>
      <div style="font-size:18px;"><b>${seedUsed}</b></div>
      <div style="font-size:12px; opacity:.8; margin-top:6px;">
        ${
          isEn
            ? "Re-run the simulation with the same seed to reproduce all results."
            : "Execute novamente a simulação com o mesmo seed para reproduzir todos os resultados."
        }
      </div>
    </div>
  `;
  // Toggle: hide/show explainer text (pure UI; safe to bind after innerHTML).
  const explainer = container.querySelector("#convergence-explainer");
  const toggleEl = container.querySelector("#toggle-convergence-explainer");

  if (explainer && toggleEl) {
    const key = "lotteries.convergenceExplainerCollapsed";
    const saved = localStorage.getItem(key);
    if (saved === "1") {
      explainer.classList.add("is-collapsed");
      toggleEl.textContent = isEn ? "Show explanation" : "Mostrar explicação";
    }
    toggleEl.addEventListener("click", () => {
      explainer.classList.toggle("is-collapsed");

      const isCollapsed = explainer.classList.contains("is-collapsed");
      localStorage.setItem(key, isCollapsed ? "1" : "0");
      toggleEl.textContent = isCollapsed
        ? (isEn ? "Show explanation" : "Mostrar explicação")
        : (isEn ? "Hide explanation" : "Ocultar explicação");
    });
  }
}

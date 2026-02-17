// ============================================================================
// Shared UI Helpers
// ============================================================================

/**
 * @param {HTMLElement} container
 * @param {{headers: string[], rows: (string|number)[][]}} table
 * @param {{highlightIndex?: number, cellClasses?: string[][]}} options
 */
export function renderTable(container, table, options = {}) {
  const { highlightIndex, cellClasses, tableClass } = options;

  const headerHtml = table.headers
    .map((header, index) => {
      const highlight = index === highlightIndex ? "highlight" : "";
      return `<th class="${highlight}">${header}</th>`;
    })
    .join("");

  const rowsHtml = table.rows
    .map((row, rowIndex) => {
      const cells = row
        .map((value, index) => {
          const highlight = index === highlightIndex ? "highlight" : "";
          const extraClass = cellClasses?.[rowIndex]?.[index] ?? "";
          const classes = [highlight, extraClass].filter(Boolean).join(" ");
          return `<td class="${classes}">${value}</td>`;
        })
        .join("");
      return `<tr>${cells}</tr>`;
    })
    .join("");

  const tableClasses = ["exercises-table", tableClass].filter(Boolean).join(" ");

  container.innerHTML = `
    <div class="exercises-table-wrap">
      <table class="${tableClasses}">
        <thead><tr>${headerHtml}</tr></thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    </div>
  `;
}

/**
 * @param {HTMLElement[]} subtabButtons
 * @param {HTMLElement[]} subtabPanels
 * @returns {void}
 */
export function wireSubtabs(subtabButtons, subtabPanels) {
  subtabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setActiveSubtab(subtabButtons, subtabPanels, btn.dataset.subtab);
    });
  });
}

/**
 * @param {HTMLElement[]} subtabButtons
 * @param {HTMLElement[]} subtabPanels
 * @param {string} tab
 * @returns {void}
 */
export function setActiveSubtab(subtabButtons, subtabPanels, tab) {
  subtabButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.subtab === tab);
  });
  subtabPanels.forEach((panel) => {
    panel.classList.toggle("hidden", panel.dataset.subpanel !== tab);
  });
  if (subtabButtons.some((btn) => btn.dataset.subtab === "generate")) {
    const panelRoot = subtabPanels[0]?.closest(".exercises-tab-panel");
    const sidebar = panelRoot?.querySelector(".exercises-sidebar");
    if (sidebar) {
      const isMobile = window.matchMedia("(max-width: 980px)").matches;
      sidebar.classList.toggle("hidden", isMobile && tab !== "generate");
    }
  }
}

/**
 * @param {HTMLInputElement | null} autoEl
 * @param {HTMLInputElement | null} manualEl
 * @param {HTMLElement | null} manualWrap
 * @returns {void}
 */
export function wireSeedControls(autoEl, manualEl, manualWrap) {
  if (!autoEl || !manualEl || !manualWrap) return;

  const setMode = (mode) => {
    manualWrap.classList.toggle("hidden", mode !== "manual");
  };

  autoEl.addEventListener("change", () => setMode("auto"));
  manualEl.addEventListener("change", () => setMode("manual"));
  setMode(autoEl.checked ? "auto" : "manual");
}

/**
 * @param {HTMLElement | null} container
 * @param {number} seed
 * @param {object} labels
 * @returns {void}
 */
export function renderSeedUsed(container, seed, labels) {
  if (!container) return;
  container.innerHTML = `
    <div class="exercises-seed-used-card">
      <div class="exercises-seed-title">${labels.seedUsedTitle}</div>
      <div class="exercises-seed-value"><b>${seed ?? ""}</b></div>
      <div class="exercises-seed-help">${labels.seedUsedHelp}</div>
    </div>
  `;
}

export function enhanceSelect(selectEl) {
  if (!selectEl || selectEl.dataset.enhanced === "true") return;
  selectEl.dataset.enhanced = "true";
  selectEl.classList.add("exercises-select-native");

  const wrapper = document.createElement("div");
  wrapper.className = "exercises-select-wrap";

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "exercises-select-trigger";
  trigger.setAttribute("aria-haspopup", "listbox");
  trigger.setAttribute("aria-expanded", "false");

  const valueSpan = document.createElement("span");
  valueSpan.className = "exercises-select-value";

  const chevron = document.createElement("span");
  chevron.className = "exercises-select-chevron";

  trigger.append(valueSpan, chevron);

  const menu = document.createElement("div");
  menu.className = "exercises-select-menu";
  menu.setAttribute("role", "listbox");
  const menuId = `${selectEl.id || "select"}_list`;
  menu.id = menuId;
  trigger.setAttribute("aria-controls", menuId);

  const updateSelected = () => {
    const selectedOption = selectEl.options[selectEl.selectedIndex];
    valueSpan.textContent = selectedOption ? selectedOption.textContent : "";
    menu.querySelectorAll(".exercises-select-option").forEach((optionEl) => {
      const selected = optionEl.dataset.value === selectEl.value;
      optionEl.classList.toggle("selected", selected);
      optionEl.setAttribute("aria-selected", selected ? "true" : "false");
    });
  };

  const buildOptions = () => {
    menu.innerHTML = "";
    Array.from(selectEl.options).forEach((option) => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "exercises-select-option";
      item.setAttribute("role", "option");
      item.dataset.value = option.value;
      item.textContent = option.textContent;
      if (option.disabled) {
        item.disabled = true;
        item.classList.add("disabled");
      }
      item.addEventListener("click", () => {
        if (option.disabled) return;
        selectEl.value = option.value;
        selectEl.dispatchEvent(new Event("change", { bubbles: true }));
        updateSelected();
        wrapper.classList.remove("open");
        trigger.setAttribute("aria-expanded", "false");
      });
      menu.appendChild(item);
    });
    updateSelected();
  };

  const closeMenu = () => {
    wrapper.classList.remove("open");
    trigger.setAttribute("aria-expanded", "false");
  };

  const openMenu = () => {
    wrapper.classList.add("open");
    trigger.setAttribute("aria-expanded", "true");
    const selected = menu.querySelector(".exercises-select-option.selected");
    selected?.focus();
  };

  trigger.addEventListener("click", () => {
    if (wrapper.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  trigger.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!wrapper.classList.contains("open")) {
        openMenu();
      }
    }
  });

  menu.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      trigger.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!wrapper.contains(event.target)) {
      closeMenu();
    }
  });

  const parent = selectEl.parentNode;
  if (parent) {
    parent.insertBefore(wrapper, selectEl);
    wrapper.appendChild(selectEl);
    wrapper.appendChild(trigger);
    wrapper.appendChild(menu);
  }

  buildOptions();
  selectEl.addEventListener("change", updateSelected);
}

export function updateRangeIndicator(rangeEl, valueEl) {
  if (!rangeEl) return;
  const min = Number(rangeEl.min ?? 0);
  const max = Number(rangeEl.max ?? 100);
  const value = Number(rangeEl.value ?? min);
  if (!Number.isFinite(min) || !Number.isFinite(max) || max === min) return;
  const pct = ((value - min) / (max - min)) * 100;
  rangeEl.style.setProperty("--fill", `${pct}%`);
  if (valueEl) {
    valueEl.textContent = String(value);
    const width = rangeEl.offsetWidth;
    const computed = getComputedStyle(rangeEl);
    const thumbSizeRaw = Number.parseFloat(computed.getPropertyValue("--thumb-size"));
    const thumbSize = Number.isFinite(thumbSizeRaw) && thumbSizeRaw > 0 ? thumbSizeRaw : 18;
    const offsetRaw = Number.parseFloat(computed.getPropertyValue("--thumb-offset"));
    const offset = Number.isFinite(offsetRaw) ? offsetRaw : 0;
    if (width > 0) {
      const thumbRadius = thumbSize / 2;
      const rawPx = (pct / 100) * (width - thumbSize) + thumbRadius + offset;
      const px = Math.min(width - thumbRadius, Math.max(thumbRadius, rawPx));
      valueEl.style.setProperty("--value-left-px", `${px}px`);
    } else {
      valueEl.style.setProperty("--value-left-px", `${pct}%`);
    }
  }
}

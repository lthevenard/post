import { writeFileSync } from "node:fs";

import {
  layoutDecisionTree,
  renderDecisionTreeSvg,
  solveDecisionTree,
} from "../../post/apps/exercises/modules/shared/decision_tree.js";

const terminal = () => ({ type: "terminal" });

const state = (name, probability, payoff) => ({
  payoff,
  probability,
  lines: [
    { text: name, className: "primary" },
    { text: `${Math.round(probability * 100)}% | ${payoff}`, className: "secondary" },
  ],
  node: terminal(),
});

const alternative = (label, title, payoffs) => ({
  label,
  lines: [{ text: title, className: "primary" }],
  node: {
    type: "chance",
    children: [
      state("Controle baixo", 0.3, payoffs[0]),
      state("Controle médio", 0.4, payoffs[1]),
      state("Controle alto", 0.3, payoffs[2]),
    ],
  },
});

const tree = {
  type: "decision",
  children: [
    alternative("M", "Instrução mínima", [140, 90, 40]),
    alternative("I", "Instrução intermediária", [70, 100, 90]),
    alternative("R", "Instrução reforçada", [10, 100, 160]),
  ],
};

const treeOptions = {
  levelGap: 305,
  leafGap: 60,
  paddingX: 44,
  paddingY: 20,
  labelFontSize: 11,
  labelLineHeight: 1.08,
  labelOffsetY: 6,
  decisionSize: 22,
  chanceRadius: 12,
  nodeValueOffset: 9,
  ariaLabel: "Árvore de decisão da questão 1",
};

const solution = solveDecisionTree(tree, { currency: "", valueDigits: 0 });

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function collectChanceNodeLabels(root) {
  const labels = new Map();
  const children = Array.isArray(root.children) ? root.children : [];
  children.forEach((edge) => {
    if (edge.node?.id && edge.label) {
      labels.set(edge.node.id, edge.label);
    }
  });
  return labels;
}

function buildNodeValueLabels() {
  const layout = layoutDecisionTree(solution.tree, treeOptions);
  const positions = new Map(layout.nodes.map((entry) => [entry.node.id, entry]));
  const chanceLabels = collectChanceNodeLabels(solution.tree);
  const labels = [];

  const rootPosition = positions.get(solution.tree.id);
  if (rootPosition) {
    labels.push(
      `<text class="decision-tree-node-value" text-anchor="middle" x="${rootPosition.x}" y="${rootPosition.y + 28}">r</text>`
    );
  }

  chanceLabels.forEach((label, nodeId) => {
    const position = positions.get(nodeId);
    const value = solution.values.get(nodeId);
    if (!position || !Number.isFinite(value)) return;
    const roundedValue = Math.round(value);
    const labelY = position.y + 27;
    labels.push(
      `<text class="decision-tree-node-value" text-anchor="end" x="${position.x - 13}" y="${labelY}"><tspan>x</tspan><tspan class="decision-tree-node-value-sub" baseline-shift="sub">${escapeHtml(label)}</tspan><tspan> =</tspan></text>` +
        `<text class="decision-tree-node-value" text-anchor="middle" x="${position.x}" y="${labelY}">${roundedValue}</text>`
    );
  });

  return labels.join("");
}

const style = `<style>
.decision-tree{font-family:Arial,Helvetica,sans-serif;}
.decision-tree-edge{fill:none;stroke:#003E7E;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;}
.decision-tree-edge.excluded{opacity:.45;}
.decision-tree-edge-cut{stroke:#003E7E;stroke-width:2.2;stroke-linecap:round;}
.decision-tree-node{fill:white;stroke:#003E7E;stroke-width:2.4;}
.decision-tree-node.terminal{fill:#003E7E;stroke:#003E7E;}
.decision-tree-label{font-size:11px;font-weight:700;letter-spacing:0;}
.decision-tree-label-primary{fill:#003E7E;}
.decision-tree-label-secondary{fill:#058ED0;font-weight:600;}
.decision-tree-node-value{fill:#003E7E;font-weight:700;font-size:12px;letter-spacing:0;}
.decision-tree-node-value-sub{font-size:.7em;baseline-shift:sub;}
</style>`;

let svg = renderDecisionTreeSvg(solution.tree, {
  ...treeOptions,
  edgeStates: solution.edgeStates,
});

svg = svg.replace(/<svg([^>]*)>/, `<svg$1>${style}`);
svg = svg.replace("</svg>", `${buildNodeValueLabels()}</svg>`);

writeFileSync("p1/q1_arvore.svg", svg, "utf8");

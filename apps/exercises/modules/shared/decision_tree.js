// ============================================================================
// Decision Tree SVG Helpers (Shared)
// ============================================================================

const NODE_TYPES = {
  DECISION: "decision",
  CHANCE: "chance",
  TERMINAL: "terminal",
};

const DEFAULT_OPTIONS = {
  levelGap: 220,
  leafGap: 90,
  paddingX: 36,
  paddingY: 40,
  diagonalLength: 28,
  labelOffsetX: 10,
  labelOffsetY: 14,
  labelFontSize: 14,
  labelLineHeight: 1.3,
  labelCharWidth: 0.58,
  labelPadding: 8,
  decisionSize: 26,
  chanceRadius: 15,
  terminalRadius: 4,
  lineWidth: 2.4,
  cutLength: 10,
  cutGap: 4,
  nodeValueOffset: 14,
  endPadding: 24,
  ariaLabel: "Arvore de decisao",
  labelJoiner: " | ",
};

/**
 * @typedef {{
 *  text: string,
 *  className?: string
 * }} DecisionTreeLine
 *
 * @typedef {{
 *  label?: string,
 *  payoff?: string|number,
 *  value?: string|number,
 *  probability?: string|number,
 *  prob?: string|number,
 *  lines?: (string|DecisionTreeLine)[],
 *  labelClassName?: string,
 *  node: DecisionTreeNode
 * }} DecisionTreeEdge
 *
 * @typedef {{
 *  id?: string,
 *  type?: "decision"|"chance"|"terminal",
 *  children?: DecisionTreeEdge[]
 * }} DecisionTreeNode
 */

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeLatex(value) {
  return String(value).replace(/[\\{}^_#$%&~]/g, "\\$&");
}

function indexToLetters(index) {
  let value = Number.isFinite(index) ? index : 0;
  let result = "";
  do {
    const remainder = value % 26;
    result = String.fromCharCode(65 + remainder) + result;
    value = Math.floor(value / 26) - 1;
  } while (value >= 0);
  return result;
}

function cloneTree(node) {
  if (!node) return node;
  const children = Array.isArray(node.children) ? node.children : [];
  return {
    ...node,
    children: children.map((edge) => ({
      ...edge,
      node: cloneTree(edge.node ?? {}),
    })),
  };
}

function resolveLocalizedText(value, lang) {
  if (!value) return "";
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }
  if (typeof value === "object") {
    if (lang && value[lang]) return String(value[lang]);
    if (value.pt) return String(value.pt);
    if (value.en) return String(value.en);
  }
  return "";
}

function toNumber(value) {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return Number.NaN;
  const cleaned = value
    .replace(/\s/g, "")
    .replace(/[^0-9.,-]/g, "")
    .replace(",", ".");
  const parsed = Number.parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

/**
 * @param {string|number} value
 * @param {{ digits?: number }} options
 * @returns {string}
 */
export function formatProbability(value, options = {}) {
  if (typeof value === "string") return value;
  const digits = Number.isFinite(options.digits) ? options.digits : 0;
  const num = toNumber(value);
  if (!Number.isFinite(num)) return "";
  const pct = num <= 1 ? num * 100 : num;
  return `${pct.toFixed(digits)}%`;
}

function formatProbabilityDecimal(value, options = {}) {
  const digits = Number.isFinite(options.digits) ? options.digits : 2;
  const num = toNumber(value);
  if (!Number.isFinite(num)) return "0";
  const pct = num <= 1 ? num : num / 100;
  return Number(pct.toFixed(digits)).toString();
}

/**
 * @param {number[]} pathIndices
 * @returns {string}
 */
export function buildAbstractBranchLabel(pathIndices) {
  if (!Array.isArray(pathIndices) || pathIndices.length === 0) return "";
  const [rootIndex, ...rest] = pathIndices;
  const letter = indexToLetters(Math.max(0, rootIndex - 1));
  if (!rest.length) return letter;
  return `${letter}.${rest.join(".")}`;
}

/**
 * @param {DecisionTreeNode} rawTree
 * @param {{ localized?: boolean }} options
 * @returns {DecisionTreeNode}
 */
export function applyAbstractBranchLabels(rawTree, options = {}) {
  const tree = cloneTree(rawTree ?? {});
  const localized = options.localized !== false;

  const makeLabel = (path) => {
    const label = buildAbstractBranchLabel(path);
    return localized ? { pt: label, en: label } : label;
  };

  const walk = (node, path) => {
    if (!node || !Array.isArray(node.children)) return;
    node.children.forEach((edge, index) => {
      const nextPath = [...path, index + 1];
      edge.label = makeLabel(nextPath);
      walk(edge.node, nextPath);
    });
  };

  walk(tree, []);
  return tree;
}

export const DECISION_TREE_SIZE_CONFIG = {
  small: {
    maxDepth: 2,
    branchByDepth: [
      { min: 2, max: 3 },
      { min: 2, max: 3 },
    ],
    earlyStopByDepth: {},
    rootTerminalChance: 0.35,
    maxLeaves: 6,
  },
  medium: {
    maxDepth: 3,
    branchByDepth: [
      { min: 2, max: 3 },
      { min: 2, max: 3 },
      { min: 2, max: 2 },
    ],
    earlyStopByDepth: {
      1: 0.35,
    },
    rootTerminalChance: 0.3,
    maxLeaves: 10,
  },
  large: {
    maxDepth: 4,
    branchByDepth: [
      { min: 2, max: 3 },
      { min: 2, max: 3 },
      { min: 2, max: 3 },
      { min: 2, max: 2 },
    ],
    earlyStopByDepth: {
      1: 0.25,
      2: 0.35,
    },
    rootTerminalChance: 0.25,
    maxLeaves: 16,
  },
};

function randomIntInclusive(min, max, rng) {
  const rand = typeof rng === "function" ? rng : Math.random;
  return Math.floor(rand() * (max - min + 1)) + min;
}

function gcd(a, b) {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

function normalizeProbabilityStep(value) {
  const raw = Number.isFinite(value) ? value : 5;
  return [1, 5, 10].includes(raw) ? raw : 5;
}

function generateProbabilityPercents(count, step, rng) {
  const unit = Math.max(1, Math.round(step));
  const totalUnits = Math.floor(100 / unit);
  if (count <= 0) return [];
  if (count === 1) return [100];
  if (count > totalUnits) {
    const base = Math.floor(totalUnits / count);
    let remainder = totalUnits - base * count;
    return Array.from({ length: count }, () => {
      const extra = remainder > 0 ? 1 : 0;
      remainder -= extra;
      return (base + extra) * unit;
    });
  }
  const cuts = new Set();
  while (cuts.size < count - 1) {
    cuts.add(randomIntInclusive(1, totalUnits - 1, rng));
  }
  const sorted = [...cuts].sort((a, b) => a - b);
  const units = [];
  let prev = 0;
  sorted.forEach((cut) => {
    units.push(cut - prev);
    prev = cut;
  });
  units.push(totalUnits - prev);
  return units.map((value) => value * unit);
}

function pickRandomSubset(items, count, rng) {
  const rand = typeof rng === "function" ? rng : Math.random;
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.slice(0, count);
}

/**
 * @param {{
 *  rng?: () => number,
 *  size?: "small"|"medium"|"large",
 *  payoffMin?: number,
 *  payoffMax?: number,
 *  payoffStep?: number,
 *  probabilityStep?: number
 * }} options
 * @returns {DecisionTreeNode}
 */
export function generateBoundedDecisionTree(options = {}) {
  const sizeKey =
    options.size && DECISION_TREE_SIZE_CONFIG[options.size] ? options.size : "small";
  const config = DECISION_TREE_SIZE_CONFIG[sizeKey];
  const maxDepth = sizeKey === "small" ? Math.max(config.maxDepth, 3) : config.maxDepth;
  const rng = typeof options.rng === "function" ? options.rng : Math.random;
  const payoffMin = Number.isFinite(options.payoffMin) ? options.payoffMin : -20000;
  const payoffMax = Number.isFinite(options.payoffMax) ? options.payoffMax : 20000;
  const basePayoffStep = Number.isFinite(options.payoffStep) ? options.payoffStep : 100;
  const payoffSteps = Math.max(1, Math.floor((payoffMax - payoffMin) / basePayoffStep));
  const probabilityStep = normalizeProbabilityStep(options.probabilityStep);

  const randomPayoff = () =>
    payoffMin + randomIntInclusive(0, payoffSteps, rng) * basePayoffStep;

  const getBranchRange = (depth) => {
    const idx = Math.min(depth, config.branchByDepth.length - 1);
    return config.branchByDepth[idx];
  };

  const minDecisionForSize = (totalInternal) => {
    if (sizeKey === "medium") return Math.ceil(totalInternal / 4);
    if (sizeKey === "large") return Math.ceil(totalInternal / 3);
    return 0;
  };

  const maxDecisionForSize = (totalInternal) =>
    Math.floor((totalInternal - 1) / 2);

  const buildTreeStructure = () => {
    const requiredNodes = new Set();

    const buildStructure = (depth, mustReach, isRoot) => {
      if (depth >= maxDepth) {
        return { type: NODE_TYPES.TERMINAL };
      }

      const range = getBranchRange(depth);
      let childrenCount = randomIntInclusive(range.min, range.max, rng);
      if (childrenCount < 1) childrenCount = 1;

      const continueIndex = mustReach
        ? randomIntInclusive(0, childrenCount - 1, rng)
        : -1;

      let rootTerminalIndex = -1;
      if (isRoot && childrenCount > 1 && rng() < config.rootTerminalChance) {
        const available = Array.from({ length: childrenCount }, (_, i) => i).filter(
          (i) => i !== continueIndex
        );
        if (available.length > 0) {
          rootTerminalIndex = available[randomIntInclusive(0, available.length - 1, rng)];
        }
      }

      const children = [];
      for (let i = 0; i < childrenCount; i += 1) {
        const mustContinue = mustReach && i === continueIndex;
        let childNode;

        if (depth === maxDepth - 1) {
          childNode = { type: NODE_TYPES.TERMINAL };
        } else if (isRoot && i === rootTerminalIndex) {
          childNode = { type: NODE_TYPES.TERMINAL };
        } else if (!mustContinue) {
          const earlyStopChance = config.earlyStopByDepth?.[depth] ?? 0;
          if (earlyStopChance > 0 && rng() < earlyStopChance) {
            childNode = { type: NODE_TYPES.TERMINAL };
          } else {
            childNode = buildStructure(depth + 1, mustContinue, false);
          }
        } else {
          childNode = buildStructure(depth + 1, mustContinue, false);
        }

        if (mustContinue) {
          requiredNodes.add(childNode);
        }
        children.push({ node: childNode });
      }

      return { children };
    };

    const root = buildStructure(0, true, true);
    root.type = NODE_TYPES.DECISION;
    requiredNodes.add(root);

    const countLeaves = (node) => {
      if (!node || !Array.isArray(node.children) || node.children.length === 0) {
        return 1;
      }
      return node.children.reduce((sum, edge) => sum + countLeaves(edge.node), 0);
    };

    const pruneToMaxLeaves = () => {
      let leaves = countLeaves(root);
      if (leaves <= config.maxLeaves) return;

      const getCandidates = () => {
        const candidates = [];
        const rootTerminalCount = (root.children ?? []).filter(
          (edge) => !edge.node.children || edge.node.children.length === 0
        ).length;

        const walk = (node, parent, depth) => {
          if (!node || !Array.isArray(node.children)) return;
          node.children.forEach((edge) => {
            const child = edge.node;
            const isTerminal = !child.children || child.children.length === 0;
            const isRequired = requiredNodes.has(child);
            if (!isTerminal && !isRequired) {
              const subtreeLeaves = countLeaves(child);
              const isRootChild = node === root;
              const wouldBreakRoot =
                isRootChild && rootTerminalCount >= 1 && !isTerminal;
              if (!wouldBreakRoot) {
                candidates.push({
                  edge,
                  depth,
                  subtreeLeaves,
                  isRootChild,
                });
              }
            }
            walk(child, node, depth + 1);
          });
        };

        walk(root, null, 0);
        return candidates;
      };

      const getTrimCandidates = () => {
        const candidates = [];

        const walk = (node, depth) => {
          if (!node || !Array.isArray(node.children)) return;
          const range = getBranchRange(depth);
          const minBranches = range?.min ?? 1;
          if (node.children.length > minBranches) {
            node.children.forEach((edge, index) => {
              const child = edge.node;
              if (requiredNodes.has(child)) return;
              candidates.push({
                node,
                index,
                depth,
                subtreeLeaves: countLeaves(child),
              });
            });
          }
          node.children.forEach((edge) => walk(edge.node, depth + 1));
        };

        walk(root, 0);
        return candidates;
      };

      while (leaves > config.maxLeaves) {
        const candidates = getCandidates();
        if (candidates.length) {
          candidates.sort((a, b) => {
            if (b.depth !== a.depth) return b.depth - a.depth;
            return b.subtreeLeaves - a.subtreeLeaves;
          });
          const target = candidates[0];
          const savedLeaves = target.subtreeLeaves - 1;
          target.edge.node = { type: NODE_TYPES.TERMINAL };
          leaves -= savedLeaves;
          continue;
        }

        const trimCandidates = getTrimCandidates();
        if (!trimCandidates.length) break;
        trimCandidates.sort((a, b) => {
          if (b.subtreeLeaves !== a.subtreeLeaves) return b.subtreeLeaves - a.subtreeLeaves;
          return b.depth - a.depth;
        });
        const target = trimCandidates[0];
        target.node.children.splice(target.index, 1);
        leaves -= target.subtreeLeaves;
      }
    };

    pruneToMaxLeaves();

    const internalNodes = [];
    const collectInternal = (node, isRoot) => {
      if (!node || !Array.isArray(node.children) || node.children.length === 0) return;
      if (!isRoot) internalNodes.push(node);
      node.children.forEach((edge) => collectInternal(edge.node, false));
    };
    collectInternal(root, true);

    const totalInternal = internalNodes.length;
    const minDecision = minDecisionForSize(totalInternal);
    const maxDecision = maxDecisionForSize(totalInternal);

    return { root, internalNodes, minDecision, maxDecision };
  };

  let root = null;
  let internalNodes = [];
  let decisionNodes = new Set();
  const maxAttempts = 30;
  let lastCandidate = null;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const candidate = buildTreeStructure();
    lastCandidate = candidate;
    if (candidate.maxDecision < candidate.minDecision || candidate.maxDecision < 0) continue;
    const decisionCount = randomIntInclusive(
      candidate.minDecision,
      candidate.maxDecision,
      rng
    );
    decisionNodes = new Set(
      pickRandomSubset(candidate.internalNodes, decisionCount, rng)
    );
    candidate.internalNodes.forEach((node) => {
      node.type = decisionNodes.has(node) ? NODE_TYPES.DECISION : NODE_TYPES.CHANCE;
    });
    root = candidate.root;
    internalNodes = candidate.internalNodes;
    break;
  }

  if (!root && lastCandidate) {
    const decisionCount = Math.max(
      0,
      Math.min(lastCandidate.maxDecision, lastCandidate.minDecision)
    );
    decisionNodes = new Set(
      pickRandomSubset(lastCandidate.internalNodes, decisionCount, rng)
    );
    lastCandidate.internalNodes.forEach((node) => {
      node.type = decisionNodes.has(node) ? NODE_TYPES.DECISION : NODE_TYPES.CHANCE;
    });
    root = lastCandidate.root;
    internalNodes = lastCandidate.internalNodes;
  }

  const evaluateNodeValue = (() => {
    const cache = new Map();
    return function evaluate(node) {
      if (!node) return 0;
      if (cache.has(node)) return cache.get(node);
      if (!Array.isArray(node.children) || node.children.length === 0) {
        cache.set(node, 0);
        return 0;
      }

      if (node.type === NODE_TYPES.CHANCE) {
        const total = node.children.reduce((sum, edge) => {
          const prob = typeof edge.probability === "number" ? edge.probability : 0;
          const payoff = Number.isFinite(edge.payoff) ? edge.payoff : 0;
          const childValue = evaluate(edge.node);
          return sum + prob * (payoff + childValue);
        }, 0);
        cache.set(node, total);
        return total;
      }

      const best = node.children.reduce((max, edge) => {
        const payoff = Number.isFinite(edge.payoff) ? edge.payoff : 0;
        const childValue = evaluate(edge.node);
        return Math.max(max, payoff + childValue);
      }, Number.NEGATIVE_INFINITY);

      const value = Number.isFinite(best) ? best : 0;
      cache.set(node, value);
      return value;
    };
  })();

  const pickAlignedChancePayoff = (childValue, percent) => {
    const pct = Math.max(1, Math.round(percent));
    const requiredStep = Math.round(10000 / gcd(pct, 100));
    const step = requiredStep;
    const normalizedChild = Math.round(childValue / basePayoffStep) * basePayoffStep;
    const offset = ((-normalizedChild % step) + step) % step;
    const minK = Math.ceil((payoffMin - offset) / step);
    const maxK = Math.floor((payoffMax - offset) / step);

    if (minK > maxK) {
      const fallback = offset;
      return Math.max(payoffMin, Math.min(payoffMax, fallback));
    }

    return offset + randomIntInclusive(minK, maxK, rng) * step;
  };

  const assignValues = (node) => {
    if (!node || !Array.isArray(node.children) || node.children.length === 0) {
      node.type = NODE_TYPES.TERMINAL;
      return;
    }

    const isChance = node.type === NODE_TYPES.CHANCE;
    let percents = [];

    if (isChance) {
      percents = generateProbabilityPercents(node.children.length, probabilityStep, rng);
      node.children.forEach((edge, index) => {
        const percent = percents[index] ?? 0;
        edge.probability = percent / 100;
        edge.__probabilityPercent = percent;
      });
    } else {
      node.children.forEach((edge) => {
        if (edge.probability !== undefined) {
          delete edge.probability;
        }
      });
    }

    node.children.forEach((edge) => {
      assignValues(edge.node);
    });

    node.children.forEach((edge, index) => {
      if (isChance) {
        const percent = percents[index] ?? 0;
        const childValue = evaluateNodeValue(edge.node);
        edge.payoff = pickAlignedChancePayoff(childValue, percent);
      } else {
        edge.payoff = randomPayoff();
      }
    });
  };

  const alignRootEdgeValues = () => {
    if (!Array.isArray(root.children) || root.children.length <= 1) return;
    const childValues = root.children.map((edge) => evaluateNodeValue(edge.node));
    const branchCount = root.children.length;
    const allowTie = branchCount >= 2 && rng() < 0.2;

    let tiePair = null;
    if (allowTie) {
      const indices = Array.from({ length: branchCount }, (_, i) => i);
      tiePair = pickRandomSubset(indices, 2, rng);
    }

    const groups = [];
    if (tiePair) {
      groups.push({ indices: tiePair.slice() });
    }
    for (let i = 0; i < branchCount; i += 1) {
      if (tiePair && tiePair.includes(i)) continue;
      groups.push({ indices: [i] });
    }

    // Shuffle groups to randomize ordering
    for (let i = groups.length - 1; i > 0; i -= 1) {
      const j = Math.floor(rng() * (i + 1));
      [groups[i], groups[j]] = [groups[j], groups[i]];
    }

    const baseCandidates = Array.from({ length: 10 }, (_, i) => (i + 1) * 100);
    const baseValue =
      baseCandidates[randomIntInclusive(0, baseCandidates.length - 1, rng)];

    const pickDiff = () => randomIntInclusive(1, 15, rng) * 10;

    let currentValue = baseValue;
    groups.forEach((group, index) => {
      group.target = currentValue;
      if (index < groups.length - 1) {
        currentValue += pickDiff();
      }
    });

    groups.forEach((group) => {
      group.indices.forEach((idx) => {
        const target = group.target ?? baseValue;
        const payoff = Math.round((target - childValues[idx]) / 10) * 10;
        root.children[idx].payoff = payoff;
      });
    });
  };

  assignValues(root);
  alignRootEdgeValues();

  return applyAbstractBranchLabels(root);
}

export function generateRandomDecisionTree(options = {}) {
  return generateBoundedDecisionTree(options);
}

/**
 * @param {{
 *  rng?: () => number,
 *  minStates?: number,
 *  maxStates?: number,
 *  numStates?: number,
 *  payoffMin?: number,
 *  payoffMax?: number,
 *  payoffStep?: number,
 *  probabilityStep?: number
 * }} options
 * @returns {DecisionTreeNode}
 */
export function generateLottery(options = {}) {
  const rng = typeof options.rng === "function" ? options.rng : Math.random;
  const minStates = Number.isFinite(options.minStates) ? options.minStates : 2;
  const maxStates = Number.isFinite(options.maxStates) ? options.maxStates : 8;
  let count = Number.isFinite(options.numStates)
    ? Math.round(options.numStates)
    : randomIntInclusive(minStates, maxStates, rng);
  count = Math.max(2, Math.min(8, count));

  const payoffMin = Number.isFinite(options.payoffMin) ? options.payoffMin : -20000;
  const payoffMax = Number.isFinite(options.payoffMax) ? options.payoffMax : 20000;
  const payoffStep = Number.isFinite(options.payoffStep) ? options.payoffStep : 100;
  const probabilityStep = normalizeProbabilityStep(options.probabilityStep);

  const percents = generateProbabilityPercents(count, probabilityStep, rng);
  const usedPayoffs = new Set();

  const pickAlignedPayoff = (percent, childValue = 0) => {
    const pct = Math.max(1, Math.round(percent));
    const step = Math.round(10000 / gcd(pct, 100));
    const normalizedChild = Math.round(childValue / payoffStep) * payoffStep;
    const offset = ((-normalizedChild % step) + step) % step;
    const minK = Math.ceil((payoffMin - offset) / step);
    const maxK = Math.floor((payoffMax - offset) / step);
    if (minK > maxK) {
      const fallback = offset;
      return Math.max(payoffMin, Math.min(payoffMax, fallback));
    }
    return offset + randomIntInclusive(minK, maxK, rng) * step;
  };

  const children = percents.map((percent) => {
    let payoff = pickAlignedPayoff(percent, 0);
    let tries = 0;
    while (usedPayoffs.has(payoff) && tries < 10) {
      payoff = pickAlignedPayoff(percent, 0);
      tries += 1;
    }
    usedPayoffs.add(payoff);
    return {
      probability: percent / 100,
      payoff,
      node: { type: NODE_TYPES.TERMINAL },
    };
  });

  return {
    type: NODE_TYPES.CHANCE,
    children,
  };
}

/**
 * @param {DecisionTreeNode} rawTree
 * @param {{ lang?: string, locale?: string, currency?: string }} options
 * @returns {{
 *  tree: DecisionTreeNode,
 *  expectedValue: number,
 *  equations: string[],
 *  valueLabel: string
 * }}
 */
export function solveLottery(rawTree, options = {}) {
  const counter = { value: 0 };
  const tree = cloneTreeWithIds(rawTree ?? {}, counter);
  const root = tree;
  const edges = Array.isArray(root.children) ? root.children : [];

  const formatValueLatex = (value) =>
    formatCurrencyLatex(value, {
      locale: options.locale,
      currency: options.currency,
      digits: options.valueDigits,
    });

  const valuePrefix = options.lang === "en" ? "EV" : "Ve";

  const terms = edges.map((edge) => {
    const payoff = Number.isFinite(edge.payoff) ? edge.payoff : 0;
    const prob = toNumber(edge.probability ?? edge.prob);
    const probability = Number.isFinite(prob) ? (prob > 1 ? prob / 100 : prob) : 0;
    const termValue = Math.round(probability * payoff);
    return {
      probability,
      payoff,
      termValue,
      probText: formatProbabilityDecimal(probability),
    };
  });

  const expectedValue = terms.reduce((sum, term) => sum + term.termValue, 0);
  const equationTerms = terms.map(
    (term) => `${term.probText} \\cdot \\left(${formatValueLatex(term.payoff)}\\right)`
  );
  const equationValues = terms.map((term) => formatValueLatex(term.termValue));
  const equations = [
    `V_e = ${equationTerms.join(" + ")}`,
    `V_e = ${joinSignedLatex(equationValues)}`,
    `V_e = ${formatValueLatex(expectedValue)}`,
  ];

  const valueLabel = `${valuePrefix} = ${formatCurrency(expectedValue, {
    locale: options.locale,
    currency: options.currency,
    digits: options.valueDigits,
  })}`;

  return { tree, expectedValue, equations, valueLabel };
}

/**
 * @param {DecisionTreeNode} tree
 * @param {{ valueLabel?: string } & object} options
 * @returns {string}
 */
export function renderLotterySolutionSvg(tree, options = {}) {
  const solution = options.solution ?? solveLottery(tree, options);
  const valueText = options.valueLabel ?? solution.valueLabel;
  const baseSettings = { ...DEFAULT_OPTIONS, ...options };
  const valueFontSize = Number.isFinite(baseSettings.nodeValueFontSize)
    ? baseSettings.nodeValueFontSize
    : baseSettings.labelFontSize * 0.9;
  const estimatedWidth = valueText.length * valueFontSize * baseSettings.labelCharWidth;
  const desiredPaddingX = Math.max(baseSettings.paddingX, estimatedWidth + 12);
  const paddedOptions = { ...options, paddingX: desiredPaddingX };
  const { nodes, settings } = layoutDecisionTree(tree, paddedOptions);
  const rootEntry = nodes[0];
  if (!rootEntry) {
    return renderDecisionTreeSvg(tree, paddedOptions);
  }
  const radius = getNodeRadius(rootEntry.node, settings);
  const labelY = rootEntry.y + radius + settings.nodeValueOffset;
  const extraText = `<text class="decision-tree-node-value" text-anchor="end" x="${rootEntry.x}" y="${labelY}">${escapeHtml(
    valueText
  )}</text>`;
  const svg = renderDecisionTreeSvg(tree, paddedOptions);
  return svg.replace("</svg>", `${extraText}</svg>`);
}

/**
 * @param {HTMLElement | null} container
 * @param {DecisionTreeNode} tree
 * @param {object} options
 * @returns {void}
 */
export function renderLotterySolution(container, tree, options = {}) {
  if (!container) return;
  container.innerHTML = `
    <div class="decision-tree-wrap">
      ${renderLotterySolutionSvg(tree, options)}
    </div>
  `;
}

function getEdgeKey(parentId, childId) {
  return `${parentId}::${childId}`;
}

function getEdgeGeometry(edge, parentPos, childPos, settings) {
  const parentRadius = getNodeRadius(edge.parent, settings);
  const childRadius = getNodeRadius(edge.child, settings);
  const startX = parentPos.x + parentRadius;
  const startY = parentPos.y;
  const endX = childPos.x - childRadius;
  const endY = childPos.y;
  const isStraight = Math.abs(endY - startY) < 0.5;
  const siblingCount = edge.parent?.children?.length ?? 0;
  const elbowStart = Math.min(endX - settings.labelOffsetX, startX + settings.diagonalLength);
  const horizontalStart =
    isStraight && siblingCount <= 1 ? startX : Math.min(elbowStart, endX);
  const horizontalEnd = endX;
  const jointX = Math.min(endX - settings.labelOffsetX, startX + settings.diagonalLength);
  return {
    startX,
    startY,
    endX,
    endY,
    isStraight,
    jointX,
    horizontalStart,
    horizontalEnd,
  };
}

/**
 * @param {string|number} value
 * @param {{ currency?: string, locale?: string, digits?: number }} options
 * @returns {string}
 */
export function formatCurrency(value, options = {}) {
  if (typeof value === "string") return value;
  const num = toNumber(value);
  if (!Number.isFinite(num)) return "";
  const locale = options.locale ?? "pt-BR";
  const digits = Number.isFinite(options.digits) ? options.digits : 0;
  const currency = options.currency ?? "R$";
  const absValue = Math.abs(num);
  const formatted = absValue.toLocaleString(locale, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
  if (num < 0) {
    return `- ${currency} ${formatted}`;
  }
  return `${currency} ${formatted}`;
}

export function formatCurrencyLatex(value, options = {}) {
  const formatted = formatCurrency(value, options);
  if (!formatted) return "";
  if (formatted.startsWith("- ")) {
    return `- \\text{${escapeLatex(formatted.slice(2))}}`;
  }
  return `\\text{${escapeLatex(formatted)}}`;
}

function joinSignedLatex(values = []) {
  const parts = values.filter(Boolean).map((value) => String(value).trim());
  if (!parts.length) return "";
  return parts
    .map((term, index) => {
      const isNegative = term.startsWith("-");
      const normalized = isNegative ? term.replace(/^-+\s*/, "") : term;
      if (index === 0) {
        return isNegative ? `- ${normalized}` : normalized;
      }
      return isNegative ? `- ${normalized}` : `+ ${normalized}`;
    })
    .join(" ");
}

/**
 * @param {DecisionTreeEdge} edge
 * @param {object} options
 * @returns {DecisionTreeLine[]}
 */
export function buildEdgeLines(edge, options = {}) {
  if (Array.isArray(edge?.lines) && edge.lines.length) {
    return edge.lines.map((line) => {
      if (typeof line === "string") {
        return { text: line };
      }
      return line;
    });
  }

  const label = resolveLocalizedText(edge?.label, options.lang);
  const payoffValue = edge?.payoff ?? edge?.value;
  const probValue = edge?.probability ?? edge?.prob;
  const payoffText =
    typeof payoffValue === "number" ? formatCurrency(payoffValue, options) : payoffValue;
  const probText =
    typeof probValue === "number" ? formatProbability(probValue, options) : probValue;
  const secondaryParts = [];

  if (payoffText) secondaryParts.push(String(payoffText));
  if (probText) secondaryParts.push(String(probText));

  const lines = [];
  if (label) {
    lines.push({ text: label, className: "primary" });
  }
  if (secondaryParts.length) {
    lines.push({
      text: secondaryParts.join(options.labelJoiner ?? DEFAULT_OPTIONS.labelJoiner),
      className: "secondary",
    });
  }
  if (!lines.length && secondaryParts.length) {
    lines.push({
      text: secondaryParts.join(options.labelJoiner ?? DEFAULT_OPTIONS.labelJoiner),
      className: "secondary",
    });
  }
  return lines;
}

function resolveNodeType(node) {
  if (!node) return NODE_TYPES.TERMINAL;
  if (node.type) return node.type;
  if (Array.isArray(node.children) && node.children.length > 0) {
    return NODE_TYPES.DECISION;
  }
  return NODE_TYPES.TERMINAL;
}

function cloneTreeWithIds(node, counter) {
  const id = node?.id ?? `node-${counter.value++}`;
  const children = Array.isArray(node?.children) ? node.children : [];
  const next = {
    ...node,
    id,
    type: resolveNodeType(node),
    children: children.map((edge) => ({
      ...edge,
      node: cloneTreeWithIds(edge.node ?? {}, counter),
    })),
  };
  return next;
}

function computeLabelClearance(lines, settings) {
  if (!lines || !lines.length) {
    return { top: 0, bottom: 0 };
  }

  const lineHeight = settings.labelFontSize * settings.labelLineHeight;
  const primaryCount = lines.filter((line) => line.className !== "secondary").length;
  const secondaryCount = lines.filter((line) => line.className === "secondary").length;
  const blockHeight = (count) =>
    count > 0 ? (count - 1) * lineHeight + settings.labelFontSize : 0;

  return {
    top: primaryCount ? settings.labelOffsetY + blockHeight(primaryCount) : 0,
    bottom: secondaryCount ? settings.labelOffsetY + blockHeight(secondaryCount) : 0,
  };
}

function ensureEdgeLayout(edge, settings) {
  if (!edge.__lines) {
    edge.__lines = buildEdgeLines(edge, settings);
  }
  if (!edge.__clearance) {
    edge.__clearance = computeLabelClearance(edge.__lines, settings);
  }
  return edge.__clearance;
}

function computeSpan(node, settings) {
  if (!node.children || node.children.length === 0) {
    node.__span = 0;
    node.__extentTop = 0;
    node.__extentBottom = 0;
    node.__childOffsets = [];
    node.__gaps = [];
    return 0;
  }

  const children = node.children;
  children.forEach((edge) => computeSpan(edge.node, settings));

  const count = children.length;
  const padding = Number.isFinite(settings.labelPadding) ? settings.labelPadding : 0;
  const extents = children.map((edge) => {
    const clearance = ensureEdgeLayout(edge, settings);
    const child = edge.node;
    const childTop = Math.max(child.__extentTop ?? 0, clearance.top ?? 0);
    const childBottom = Math.max(child.__extentBottom ?? 0, clearance.bottom ?? 0);
    edge.__extentTop = childTop;
    edge.__extentBottom = childBottom;
    return { top: childTop, bottom: childBottom };
  });

  const gaps = new Array(Math.max(0, count - 1));
  for (let i = 0; i < count - 1; i += 1) {
    const gapNeeded = extents[i].bottom + extents[i + 1].top + padding;
    gaps[i] = Math.max(settings.leafGap, gapNeeded);
  }

  const offsets = new Array(count);
  if (count === 1) {
    offsets[0] = 0;
  } else if (count % 2 === 1) {
    const mid = Math.floor(count / 2);
    offsets[mid] = 0;
    for (let i = mid - 1; i >= 0; i -= 1) {
      offsets[i] = offsets[i + 1] - gaps[i];
    }
    for (let i = mid + 1; i < count; i += 1) {
      offsets[i] = offsets[i - 1] + gaps[i - 1];
    }
  } else {
    offsets[0] = 0;
    for (let i = 1; i < count; i += 1) {
      offsets[i] = offsets[i - 1] + gaps[i - 1];
    }
    const topBoundary = -extents[0].top;
    const bottomBoundary = offsets[count - 1] + extents[count - 1].bottom;
    const center = (topBoundary + bottomBoundary) / 2;
    for (let i = 0; i < count; i += 1) {
      offsets[i] -= center;
    }
  }

  let extentTop = 0;
  let extentBottom = 0;
  for (let i = 0; i < count; i += 1) {
    extentTop = Math.max(extentTop, extents[i].top - offsets[i]);
    extentBottom = Math.max(extentBottom, extents[i].bottom + offsets[i]);
  }

  node.__extentTop = extentTop;
  node.__extentBottom = extentBottom;
  node.__span = extentTop + extentBottom;
  node.__childOffsets = offsets;
  node.__gaps = gaps;
  return node.__span;
}

function getNodeRadius(node, options) {
  const type = resolveNodeType(node);
  if (type === NODE_TYPES.DECISION) return options.decisionSize / 2;
  if (type === NODE_TYPES.CHANCE) return options.chanceRadius;
  return options.terminalRadius;
}

function estimateLabelWidth(lines, options) {
  if (!lines || !lines.length) return 0;
  const maxChars = lines.reduce((max, line) => {
    const text = typeof line.text === "string"
      ? line.text
      : Array.isArray(line.parts)
        ? line.parts.map((part) => part.text ?? "").join("")
        : "";
    return Math.max(max, text.length);
  }, 0);
  return maxChars * options.labelFontSize * options.labelCharWidth;
}

/**
 * @param {DecisionTreeNode} rawTree
 * @param {object} options
 * @returns {{width: number, height: number, nodes: object[], edges: object[]}}
 */
export function layoutDecisionTree(rawTree, options = {}) {
  const settings = { ...DEFAULT_OPTIONS, ...options };
  const counter = { value: 0 };
  const tree = cloneTreeWithIds(rawTree ?? {}, counter);

  const nodes = [];
  const edges = [];
  let maxDepth = 0;

  computeSpan(tree, settings);

  function placeNode(node, depth, y) {
    maxDepth = Math.max(maxDepth, depth);
    const x = settings.paddingX + depth * settings.levelGap;
    nodes.push({ node, x, y });

    if (!Array.isArray(node.children) || node.children.length === 0) {
      return;
    }

    const children = node.children;
    const count = children.length;
    const childYs = new Array(count);
    const offsets = Array.isArray(node.__childOffsets) ? node.__childOffsets : null;
    if (offsets && offsets.length === count) {
      for (let i = 0; i < count; i += 1) {
        childYs[i] = y + offsets[i];
      }
    } else if (count === 1) {
      childYs[0] = y;
    } else {
      const spans = children.map((edge) => edge.node.__span ?? 0);
      const totalSpan =
        spans.reduce((sum, span) => sum + span, 0) + settings.leafGap * (count - 1);
      let cursor = y - totalSpan / 2;
      for (let i = 0; i < count; i += 1) {
        const span = spans[i] ?? 0;
        childYs[i] = cursor + span / 2;
        cursor += span + settings.leafGap;
      }
    }

    children.forEach((edge, index) => {
      const child = edge.node;
      placeNode(child, depth + 1, childYs[index]);
      edges.push({
        parent: node,
        child,
        depth,
        lines: edge.__lines ?? buildEdgeLines(edge, settings),
      });
    });
  }

  placeNode(tree, 0, 0);

  let minY = Number.POSITIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;
  let maxNodeRight = 0;

  nodes.forEach(({ node, x, y }) => {
    const radius = getNodeRadius(node, settings);
    minY = Math.min(minY, y - radius);
    maxY = Math.max(maxY, y + radius);
    maxNodeRight = Math.max(maxNodeRight, x + radius);
  });

  const shiftY = settings.paddingY - minY;
  nodes.forEach((entry) => {
    entry.y += shiftY;
  });

  const nodePositions = new Map(nodes.map((entry) => [entry.node.id, entry]));
  let maxLabelRight = 0;
  edges.forEach((edge) => {
    if (!edge.lines || edge.lines.length === 0) return;
    const parentPos = nodePositions.get(edge.parent.id);
    const childPos = nodePositions.get(edge.child.id);
    if (!parentPos || !childPos) return;
    const geometry = getEdgeGeometry(edge, parentPos, childPos, settings);
    const horizontalStart = geometry.horizontalStart;
    const horizontalEnd = geometry.horizontalEnd;
    const labelWidth = estimateLabelWidth(edge.lines, settings);
    const labelRight = (horizontalStart + horizontalEnd) / 2 + labelWidth / 2;
    maxLabelRight = Math.max(maxLabelRight, labelRight);
  });

  const width = Math.max(
    maxNodeRight + settings.endPadding,
    maxLabelRight + settings.endPadding
  );
  const height =
    maxY + shiftY + settings.paddingY + settings.nodeValueOffset + settings.labelFontSize;

  return { width, height, nodes, edges, settings };
}

function buildEdgePath(parent, child, settings, nodePositions) {
  const parentPos = nodePositions.get(parent.id);
  const childPos = nodePositions.get(child.id);
  if (!parentPos || !childPos) return "";

  const parentRadius = getNodeRadius(parent, settings);
  const childRadius = getNodeRadius(child, settings);
  const startX = parentPos.x + parentRadius;
  const startY = parentPos.y;
  const endX = childPos.x - childRadius;
  const endY = childPos.y;
  const isStraight = Math.abs(endY - startY) < 0.5;
  if (isStraight) {
    return `M ${startX} ${startY} L ${endX} ${endY}`;
  }
  const jointX = Math.min(endX - settings.labelOffsetX, startX + settings.diagonalLength);

  if (!Number.isFinite(jointX) || jointX <= startX) {
    return `M ${startX} ${startY} L ${endX} ${endY}`;
  }
  return `M ${startX} ${startY} L ${jointX} ${endY} L ${endX} ${endY}`;
}

function buildLabelSvg(edge, settings, nodePositions) {
  const parentPos = nodePositions.get(edge.parent.id);
  const childPos = nodePositions.get(edge.child.id);
  if (!parentPos || !childPos || !edge.lines.length) return "";

  const geometry = getEdgeGeometry(edge, parentPos, childPos, settings);
  const horizontalStart = geometry.horizontalStart;
  const horizontalEnd = geometry.horizontalEnd;

  const lineHeight = settings.labelFontSize * settings.labelLineHeight;
  const textX = (horizontalStart + horizontalEnd) / 2;

  const primaryLines = edge.lines.filter((line) => line.className !== "secondary");
  const secondaryLines = edge.lines.filter((line) => line.className === "secondary");

  const renderLines = (lines, baseY) => {
    if (!lines.length) return "";
    const tspans = lines
      .map((line, index) => {
        const className = line.className ? ` decision-tree-label-${line.className}` : "";
        const dy = index === 0 ? 0 : lineHeight;
        if (Array.isArray(line.parts) && line.parts.length) {
          return line.parts
            .map((part, partIndex) => {
              const classes = [];
              if (line.className) classes.push(`decision-tree-label-${line.className}`);
              if (part.className) classes.push(`decision-tree-label-${part.className}`);
              const classAttr = classes.length ? ` class="${classes.join(" ")}"` : "";
              const xAttr = partIndex === 0 ? ` x="${textX}"` : "";
              const dyAttr = partIndex === 0 ? ` dy="${dy}"` : "";
              return `<tspan${xAttr}${dyAttr}${classAttr}>${escapeHtml(
                part.text
              )}</tspan>`;
            })
            .join("");
        }
        return `<tspan x="${textX}" dy="${dy}" class="${className.trim()}">${escapeHtml(
          line.text
        )}</tspan>`;
      })
      .join("");
    return `<text class="decision-tree-label" text-anchor="middle" x="${textX}" y="${baseY}">${tspans}</text>`;
  };

  const svgParts = [];

  if (primaryLines.length) {
    const totalHeight = (primaryLines.length - 1) * lineHeight;
    const baseY = childPos.y - settings.labelOffsetY - totalHeight;
    svgParts.push(renderLines(primaryLines, baseY));
  }

  if (secondaryLines.length) {
    const baseY = childPos.y + settings.labelOffsetY + settings.labelFontSize;
    svgParts.push(renderLines(secondaryLines, baseY));
  }

  return svgParts.join("");
}

function buildEdgeCutSvg(edge, settings, nodePositions) {
  const parentPos = nodePositions.get(edge.parent.id);
  const childPos = nodePositions.get(edge.child.id);
  if (!parentPos || !childPos) return "";

  const geometry = getEdgeGeometry(edge, parentPos, childPos, settings);
  const diagEndX = geometry.isStraight ? geometry.endX : geometry.jointX;
  const diagEndY = geometry.isStraight ? geometry.endY : geometry.endY;
  const dx = diagEndX - geometry.startX;
  const dy = diagEndY - geometry.startY;
  const diagLength = Math.hypot(dx, dy);
  if (!Number.isFinite(diagLength) || diagLength < settings.cutLength * 1.2) {
    return "";
  }

  let t = 0.5;
  if (geometry.isStraight) {
    const available = geometry.endX - geometry.startX;
    const preferred = Math.min(
      settings.diagonalLength,
      Math.max(0, available - settings.labelOffsetX)
    );
    const minDistance = settings.cutLength * 1.2;
    const maxDistance = Math.max(minDistance, available - settings.cutLength);
    const cutDistance = Math.min(maxDistance, Math.max(minDistance, preferred));
    t = cutDistance / diagLength;
  }
  const cutCenterX = geometry.startX + dx * t;
  const cutCenterY = geometry.startY + dy * t;

  const branchDown = geometry.endY > geometry.startY;
  let hx = 1;
  let hy = branchDown ? -1 : 1;
  if (Math.abs(geometry.endY - geometry.startY) < 0.5) {
    hy = -1;
  }
  const hLen = Math.hypot(hx, hy) || 1;
  hx = (hx / hLen) * settings.cutLength;
  hy = (hy / hLen) * settings.cutLength;

  const offset = settings.cutGap / 2;
  const px = (-hy / settings.cutLength) * offset;
  const py = (hx / settings.cutLength) * offset;

  const offsets = [-1, 1];
  return offsets
    .map((dir) => {
      const cx = cutCenterX + px * dir;
      const cy = cutCenterY + py * dir;
      const x1 = cx - hx / 2;
      const y1 = cy - hy / 2;
      const x2 = cx + hx / 2;
      const y2 = cy + hy / 2;
      return `<line class="decision-tree-edge-cut" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"></line>`;
    })
    .join("");
}

/**
 * @param {DecisionTreeNode} tree
 * @param {object} options
 * @returns {string}
 */
export function renderDecisionTreeSvg(tree, options = {}) {
  const { width, height, nodes, edges, settings } = layoutDecisionTree(tree, options);
  const nodePositions = new Map(nodes.map((item) => [item.node.id, item]));
  const edgeStates = options.edgeStates;
  const nodeLabels = options.nodeLabels ?? options.nodeLabelMap;
  const nodeLabelParts = options.nodeLabelParts;

  const getEdgeState = (edgeKey) => {
    if (!edgeStates) return null;
    if (edgeStates instanceof Map) return edgeStates.get(edgeKey);
    return edgeStates[edgeKey] ?? null;
  };

  const getNodeLabel = (nodeId) => {
    if (!nodeLabels) return "";
    if (nodeLabels instanceof Map) return nodeLabels.get(nodeId) ?? "";
    return nodeLabels[nodeId] ?? "";
  };

  const getNodeLabelParts = (nodeId) => {
    if (!nodeLabelParts) return null;
    if (nodeLabelParts instanceof Map) return nodeLabelParts.get(nodeId) ?? null;
    return nodeLabelParts[nodeId] ?? null;
  };

  const svgParts = [];
  svgParts.push(
    `<svg class="decision-tree" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(
      options.ariaLabel ?? settings.ariaLabel
    )}">`
  );

  edges.forEach((edge) => {
    const path = buildEdgePath(edge.parent, edge.child, settings, nodePositions);
    if (!path) return;
    const edgeKey = getEdgeKey(edge.parent.id, edge.child.id);
    const state = getEdgeState(edgeKey);
    const excluded = state?.excluded;
    const edgeClass = excluded ? "decision-tree-edge excluded" : "decision-tree-edge";
    svgParts.push(`<path class="${edgeClass}" d="${path}"></path>`);
    if (excluded) {
      const cutSvg = buildEdgeCutSvg(edge, settings, nodePositions);
      if (cutSvg) svgParts.push(cutSvg);
    }
  });

  edges.forEach((edge) => {
    const labelSvg = buildLabelSvg(edge, settings, nodePositions);
    if (labelSvg) svgParts.push(labelSvg);
  });

  nodes.forEach(({ node, x, y }) => {
    const type = resolveNodeType(node);
    if (type === NODE_TYPES.DECISION) {
      const size = settings.decisionSize;
      const half = size / 2;
      svgParts.push(
        `<rect class="decision-tree-node decision" x="${x - half}" y="${y - half}" width="${size}" height="${size}" rx="2" ry="2"></rect>`
      );
      return;
    }
    if (type === NODE_TYPES.CHANCE) {
      svgParts.push(
        `<circle class="decision-tree-node chance" cx="${x}" cy="${y}" r="${settings.chanceRadius}"></circle>`
      );
      return;
    }
    svgParts.push(
      `<circle class="decision-tree-node terminal" cx="${x}" cy="${y}" r="${settings.terminalRadius}"></circle>`
    );
  });

  nodes.forEach(({ node, x, y }) => {
    const labelParts = getNodeLabelParts(node.id);
    const label = getNodeLabel(node.id);
    if (!label && !labelParts) return;
    const radius = getNodeRadius(node, settings);
    const labelY = y + radius + settings.nodeValueOffset;
    if (labelParts && labelParts.base) {
      const sub = labelParts.sub;
      const subSpan = sub
        ? `<tspan class="decision-tree-node-value-sub" baseline-shift="sub">${escapeHtml(
            sub
          )}</tspan>`
        : "";
      svgParts.push(
        `<text class="decision-tree-node-value" text-anchor="middle" x="${x}" y="${labelY}"><tspan class="decision-tree-node-value-base">${escapeHtml(
          labelParts.base
        )}</tspan>${subSpan}</text>`
      );
      return;
    }
    svgParts.push(
      `<text class="decision-tree-node-value" text-anchor="middle" x="${x}" y="${labelY}">${escapeHtml(
        label
      )}</text>`
    );
  });

  svgParts.push("</svg>");
  return svgParts.join("");
}

/**
 * @param {HTMLElement | null} container
 * @param {DecisionTreeNode} tree
 * @param {object} options
 * @returns {void}
 */
export function renderDecisionTree(container, tree, options = {}) {
  if (!container) return;
  container.innerHTML = `
    <div class="decision-tree-wrap">
      ${renderDecisionTreeSvg(tree, options)}
    </div>
  `;
}

/**
 * @param {DecisionTreeNode} rawTree
 * @param {{ lang?: string, locale?: string, currency?: string, valueDigits?: number }} options
 * @returns {{
 *  tree: DecisionTreeNode,
 *  values: Map<string, number>,
 *  nodeLabels: Map<string, string>,
 *  edgeStates: Map<string, { excluded?: boolean }>,
 *  equations: string[],
 *  legendItems: { label: string, value: string }[],
 *  rootValue: number
 * }}
 */
export function solveDecisionTree(rawTree, options = {}) {
  const counter = { value: 0 };
  const tree = cloneTreeWithIds(rawTree ?? {}, counter);
  const values = new Map();
  const nodeLabels = new Map();
  const nodeLabelParts = new Map();
  const edgeStates = new Map();
  const equations = [];
  const maxTermsPerLine = 2;
  const maxOptionsPerLine = 3;

  const parsePayoff = (edge) => {
    const raw = edge?.payoff ?? edge?.value;
    const num = toNumber(raw);
    return Number.isFinite(num) ? num : 0;
  };

  const parseProbability = (edge) => {
    const raw = edge?.probability ?? edge?.prob;
    const num = toNumber(raw);
    if (!Number.isFinite(num)) return 0;
    return num > 1 ? num / 100 : num;
  };

  const formatValueLatex = (value) =>
    formatCurrencyLatex(value, {
      locale: options.locale,
      currency: options.currency,
      digits: options.valueDigits,
    });

  const walk = (node, incomingLabel, isRoot) => {
    const nodeType = resolveNodeType(node);
    if (!node.children || node.children.length === 0 || nodeType === NODE_TYPES.TERMINAL) {
      values.set(node.id, 0);
      return 0;
    }

    const nodeLabel = isRoot ? "r" : `x_{${incomingLabel}}`;
    nodeLabels.set(node.id, nodeLabel);
    nodeLabelParts.set(node.id, {
      base: isRoot ? "r" : "x",
      sub: isRoot ? "" : incomingLabel,
    });

    const edgeResults = node.children.map((edge) => {
      const child = edge.node;
      const edgeLabel = resolveLocalizedText(edge.label, options.lang);
      const childValue = walk(child, edgeLabel, false);
      const payoff = parsePayoff(edge);
      const edgeValue = payoff + childValue;
      const edgeKey = getEdgeKey(node.id, child.id);
      return {
        edgeKey,
        child,
        childValue,
        edgeValue,
        payoff,
        probability: parseProbability(edge),
        label: edgeLabel,
      };
    });

    edgeResults.forEach((edgeResult) => {
      if (resolveNodeType(edgeResult.child) === NODE_TYPES.TERMINAL) {
        values.set(edgeResult.child.id, edgeResult.edgeValue);
      }
    });

    if (nodeType === NODE_TYPES.CHANCE) {
      const expectedValue = edgeResults.reduce(
        (sum, edge) => sum + edge.probability * edge.edgeValue,
        0
      );
      values.set(node.id, expectedValue);
      const terms = edgeResults.map((edge) => {
        const valueLatex = formatValueLatex(edge.edgeValue);
        return `${formatProbabilityDecimal(edge.probability)} \\cdot \\left(${valueLatex}\\right)`;
      });
      const termChunks = [];
      for (let i = 0; i < terms.length; i += maxTermsPerLine) {
        termChunks.push(terms.slice(i, i + maxTermsPerLine));
      }
      const alignedLines = termChunks.map((chunk, index) => {
        const joined = chunk.join(" + ");
        if (index === 0) return `${nodeLabel} &= ${joined}`;
        return `&+ ${joined}`;
      });
      alignedLines.push(`&= ${formatValueLatex(expectedValue)}`);
      const alignedBlock = `\\[ \\begin{aligned} ${alignedLines.join(" \\\\ ")} \\end{aligned} \\]`;
      equations.push({
        type: "block",
        value: alignedBlock,
        category: "chance",
        nodeId: node.id,
        isRoot,
      });
      return expectedValue;
    }

    const edgeValues = edgeResults.map((edge) => edge.edgeValue);
    const maxValue = Math.max(...edgeValues);
    const tolerance = 1e-6;

    edgeResults.forEach((edge) => {
      if (edge.edgeValue < maxValue - tolerance) {
        edgeStates.set(edge.edgeKey, { excluded: true });
      }
    });

    values.set(node.id, maxValue);
    const optionChunks = [];
    const optionValues = edgeValues.map((value) => formatValueLatex(value));
    for (let i = 0; i < optionValues.length; i += maxOptionsPerLine) {
      optionChunks.push(optionValues.slice(i, i + maxOptionsPerLine));
    }
    const maxLines = optionChunks.map((chunk, index) => {
      const joined = chunk.join(", ");
      if (optionChunks.length === 1) {
        return `${nodeLabel} &= \\max\\left(${joined}\\right)`;
      }
      if (index === 0) {
        return `${nodeLabel} &= \\max\\left(${joined}`;
      }
      if (index === optionChunks.length - 1) {
        return `&\\quad ${joined}\\right)`;
      }
      return `&\\quad ${joined}`;
    });
    maxLines.push(`&= ${formatValueLatex(maxValue)}`);
    const maxBlock = `\\[ \\begin{aligned} ${maxLines.join(" \\\\ ")} \\end{aligned} \\]`;
    equations.push({
      type: "block",
      value: maxBlock,
      category: "decision",
      nodeId: node.id,
      isRoot,
    });
    return maxValue;
  };

  const rootValue = walk(tree, "", true);

  const legendItems = Array.from(nodeLabels.entries())
    .map(([nodeId, label]) => ({
      id: nodeId,
      label,
      value: formatValueLatex(values.get(nodeId) ?? 0),
    }))
    .sort((a, b) => {
      if (a.label === "r") return -1;
      if (b.label === "r") return 1;
      const aKey = a.label.replace(/^x_\{/, "").replace(/\}$/, "");
      const bKey = b.label.replace(/^x_\{/, "").replace(/\}$/, "");
      return aKey.localeCompare(bKey, undefined, { numeric: true });
    })
    .map(({ label, value }) => ({ label, value }));

  return {
    tree,
    values,
    nodeLabels,
    nodeLabelParts,
    edgeStates,
    equations,
    legendItems,
    rootValue,
  };
}

export { NODE_TYPES as DECISION_TREE_NODE_TYPES };

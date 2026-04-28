from __future__ import annotations

from pathlib import Path
import math
import textwrap

from numbers_parser import Document
import numpy as np
import pandas as pd

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import ticker


ROOT = Path(__file__).resolve().parent
SOURCE = Path("/Users/lucasthevenard/Repo/td26/p1/p1_correcao.numbers")
CHARTS = ROOT / "charts"
DATA = ROOT / "data"
OUT_MD = ROOT / "analise_p1_2026.md"

BLUE = "#003E7E"
CYAN = "#058ED0"
RED = "#C94242"
GREEN = "#2E7D32"
ORANGE = "#D98B1F"
LIGHT_BLUE = "#DCEBFA"
GRID = "#D8E0E8"
TEXT = "#1F2933"

MAXIMA = {
    "Q1A": 1.0,
    "Q1B": 0.5,
    "Q1C_maximin": 0.5,
    "Q1C_minimax": 0.5,
    "Q1C_pri": 0.5,
    "Q1D": 1.0,
    "Q2A": 1.5,
    "Q2B": 0.5,
    "Q3A": 0.25,
    "Q3B": 0.25,
    "Q3C": 0.25,
    "Q3D": 0.25,
    "Q4A": 1.5,
    "Q4B": 1.5,
    "Q5": 0.5,
}

GROUPS = {
    "Q1": ["Q1A", "Q1B", "Q1C_maximin", "Q1C_minimax", "Q1C_pri", "Q1D"],
    "Q2": ["Q2A", "Q2B"],
    "Q3": ["Q3A", "Q3B", "Q3C", "Q3D"],
    "Q4": ["Q4A", "Q4B"],
    "Q5": ["Q5"],
}

ITEM_LABELS = {
    "Q1A": "Q1A",
    "Q1B": "Q1B",
    "Q1C_maximin": "Q1C maximin",
    "Q1C_minimax": "Q1C minimax",
    "Q1C_pri": "Q1C PRI",
    "Q1D": "Q1D",
    "Q2A": "Q2A",
    "Q2B": "Q2B",
    "Q3A": "Q3A",
    "Q3B": "Q3B",
    "Q3C": "Q3C",
    "Q3D": "Q3D",
    "Q4A": "Q4A",
    "Q4B": "Q4B",
    "Q5": "Q5",
}


def load_numbers(path: Path) -> pd.DataFrame:
    table = Document(path).sheets[0].tables[0]
    headers = [table.cell(0, col).value for col in range(table.num_cols)]
    rows = []
    for row in range(1, table.num_rows):
        rows.append([table.cell(row, col).value for col in range(table.num_cols)])
    df = pd.DataFrame(rows, columns=headers)
    df["CPF"] = df["CPF"].astype(str).str.zfill(11)
    return df


def setup_ax(ax, title: str | None = None, subtitle: str | None = None) -> None:
    ax.set_facecolor("white")
    for spine in ["top", "right"]:
        ax.spines[spine].set_visible(False)
    ax.spines["left"].set_color("#B7C3D0")
    ax.spines["bottom"].set_color("#B7C3D0")
    ax.tick_params(colors=TEXT, labelsize=11)
    ax.grid(axis="y", color=GRID, linewidth=0.9, alpha=0.9)
    ax.set_axisbelow(True)
    if title:
        ax.set_title(title, color=BLUE, loc="left", fontsize=18, fontweight="bold", pad=20)
    if subtitle:
        ax.text(
            0,
            1.015,
            subtitle,
            transform=ax.transAxes,
            color=TEXT,
            fontsize=11,
            va="bottom",
        )


def save_fig(fig, filename: str) -> None:
    path = CHARTS / filename
    fig.savefig(path, dpi=220, bbox_inches="tight", facecolor="white")
    plt.close(fig)


def percent_fmt(x: float, decimals: int = 0) -> str:
    return f"{x * 100:.{decimals}f}%"


def comma(x: float, decimals: int = 1) -> str:
    return f"{x:.{decimals}f}".replace(".", ",")


def draw_histogram(present: pd.DataFrame) -> None:
    notes = present["nota"].astype(float)
    bins = np.arange(0, 10.5 + 0.5, 0.5)
    fig, ax = plt.subplots(figsize=(12.4, 6.2))
    counts, _, patches = ax.hist(notes, bins=bins, color=CYAN, edgecolor="white", linewidth=1.2)
    for patch, left in zip(patches, bins[:-1]):
        if left < 6:
            patch.set_facecolor("#A7C7E7")
    setup_ax(
        ax,
        "Distribuição das notas",
        f"n = {len(notes)} presentes | média {comma(notes.mean(), 2)} | mediana {comma(notes.median(), 2)}",
    )
    ax.axvline(notes.mean(), color=BLUE, linewidth=2.5, label="Media")
    ax.axvline(notes.median(), color=ORANGE, linewidth=2.5, linestyle="--", label="Mediana")
    ax.axvline(6, color=RED, linewidth=2.2, linestyle=":", label="6,0")
    ax.set_xlim(0, 10.5)
    ax.set_xlabel("Nota", color=TEXT, fontsize=12, labelpad=10)
    ax.set_ylabel("Alunos", color=TEXT, fontsize=12, labelpad=10)
    ax.xaxis.set_major_locator(ticker.MultipleLocator(1))
    ax.yaxis.set_major_locator(ticker.MaxNLocator(integer=True))
    ax.legend(frameon=False, loc="upper left", bbox_to_anchor=(0.01, 0.98), fontsize=11)
    peak = counts.max()
    ax.text(
        6.1,
        peak * 0.88,
        "corte de leitura: 6,0",
        color=RED,
        fontsize=11,
        fontweight="bold",
    )
    save_fig(fig, "notas_histograma.png")


def draw_bands(present: pd.DataFrame) -> pd.Series:
    bands = pd.cut(
        present["nota"],
        bins=[0, 2, 4, 6, 8, 10, 10.51],
        right=False,
        labels=["0-2", "2-4", "4-6", "6-8", "8-10", "10+"],
    ).value_counts().sort_index()
    fig, ax = plt.subplots(figsize=(12.4, 6.2))
    colors = ["#D8E0E8", "#A7C7E7", "#7FB4DF", CYAN, BLUE, GREEN]
    bars = ax.bar(bands.index.astype(str), bands.values, color=colors, edgecolor="white", linewidth=1)
    setup_ax(
        ax,
        "Faixas de nota",
        "A maior concentração está entre 6 e 10 pontos; há uma cauda curta abaixo de 6.",
    )
    ax.set_xlabel("Faixa", color=TEXT, fontsize=12, labelpad=10)
    ax.set_ylabel("Alunos", color=TEXT, fontsize=12, labelpad=10)
    ax.yaxis.set_major_locator(ticker.MaxNLocator(integer=True))
    for bar in bars:
        height = bar.get_height()
        ax.text(
            bar.get_x() + bar.get_width() / 2,
            height + 0.35,
            str(int(height)),
            ha="center",
            va="bottom",
            color=BLUE,
            fontsize=13,
            fontweight="bold",
        )
    save_fig(fig, "faixas_nota.png")
    return bands


def draw_group_performance(present: pd.DataFrame) -> pd.DataFrame:
    rows = []
    for group, cols in GROUPS.items():
        total = present[cols].sum(axis=1)
        max_points = sum(MAXIMA[col] for col in cols)
        rows.append(
            {
                "questao": group,
                "media": float(total.mean()),
                "maximo": max_points,
                "pct": float(total.mean() / max_points),
                "zero": float((total == 0).mean()),
            }
        )
    summary = pd.DataFrame(rows)
    fig, ax = plt.subplots(figsize=(12.4, 6.2))
    y = np.arange(len(summary))
    ax.barh(y, summary["pct"], color=[BLUE, CYAN, CYAN, ORANGE, RED], alpha=0.95)
    setup_ax(
        ax,
        "Aproveitamento médio por questão",
        "Percentual da pontuação máxima de cada bloco.",
    )
    ax.set_yticks(y, labels=summary["questao"], fontsize=13, color=TEXT)
    ax.set_xlim(0, 1)
    ax.xaxis.set_major_formatter(ticker.PercentFormatter(1.0))
    ax.set_xlabel("Aproveitamento medio", color=TEXT, fontsize=12, labelpad=10)
    ax.invert_yaxis()
    for i, row in summary.iterrows():
        ax.text(
            row["pct"] + 0.015,
            i,
            f"{percent_fmt(row['pct'])}  ({comma(row['media'], 2)}/{comma(row['maximo'], 1)} pts)",
            va="center",
            color=TEXT,
            fontsize=12,
            fontweight="bold" if row["pct"] < 0.6 else "normal",
        )
    save_fig(fig, "aproveitamento_questoes.png")
    return summary


def draw_mean_composition(group_summary: pd.DataFrame) -> None:
    fig, ax = plt.subplots(figsize=(12.4, 5.4))
    x = np.arange(len(group_summary))
    earned = group_summary["media"]
    missed = group_summary["maximo"] - group_summary["media"]
    ax.bar(x, earned, color=BLUE, width=0.6, label="média obtida")
    ax.bar(x, missed, bottom=earned, color=LIGHT_BLUE, width=0.6, label="média não obtida")
    setup_ax(
        ax,
        "Composição da média",
        "A prova ficou sustentada por Q1; a maior perda relativa ocorreu em Q5 e Q4.",
    )
    ax.set_xticks(x, labels=group_summary["questao"], fontsize=13)
    ax.set_ylabel("Pontos", color=TEXT, fontsize=12, labelpad=10)
    ax.set_ylim(0, max(group_summary["maximo"]) + 0.6)
    ax.yaxis.set_major_locator(ticker.MultipleLocator(0.5))
    for i, row in group_summary.iterrows():
        ax.text(
            i,
            row["media"] / 2,
            comma(row["media"], 2),
            ha="center",
            va="center",
            color="white",
            fontsize=12,
            fontweight="bold",
        )
        ax.text(
            i,
            row["maximo"] + 0.08,
            f"max. {comma(row['maximo'], 1)}",
            ha="center",
            va="bottom",
            color=TEXT,
            fontsize=10,
        )
    ax.legend(frameon=False, loc="upper right", fontsize=11)
    save_fig(fig, "composicao_media.png")


def draw_item_performance(present: pd.DataFrame) -> pd.DataFrame:
    item = pd.DataFrame(
        {
            "item": list(MAXIMA),
            "pct": [present[col].mean() / MAXIMA[col] for col in MAXIMA],
            "media": [present[col].mean() for col in MAXIMA],
            "maximo": [MAXIMA[col] for col in MAXIMA],
            "zero": [(present[col].fillna(0) == 0).mean() for col in MAXIMA],
        }
    )
    item["label"] = item["item"].map(ITEM_LABELS)
    ordered = item.sort_values("pct", ascending=True)
    fig, ax = plt.subplots(figsize=(12.4, 7.3))
    colors = [RED if p < 0.45 else ORANGE if p < 0.65 else CYAN if p < 0.8 else BLUE for p in ordered["pct"]]
    y = np.arange(len(ordered))
    ax.barh(y, ordered["pct"], color=colors, edgecolor="white", linewidth=0.8)
    setup_ax(
        ax,
        "Aproveitamento por item",
        "Itens ordenados do menor para o maior aproveitamento médio.",
    )
    ax.set_yticks(y, labels=ordered["label"], fontsize=11, color=TEXT)
    ax.set_xlim(0, 1)
    ax.xaxis.set_major_formatter(ticker.PercentFormatter(1.0))
    ax.set_xlabel("Aproveitamento medio", color=TEXT, fontsize=12, labelpad=10)
    for i, row in enumerate(ordered.itertuples()):
        ax.text(row.pct + 0.011, i, percent_fmt(row.pct), va="center", color=TEXT, fontsize=10)
    save_fig(fig, "aproveitamento_itens.png")
    return item


def draw_zero_rates(item: pd.DataFrame) -> None:
    ordered = item.sort_values("zero", ascending=True).tail(9)
    fig, ax = plt.subplots(figsize=(12.4, 5.8))
    y = np.arange(len(ordered))
    colors = [RED if z > 0.5 else ORANGE if z > 0.25 else CYAN for z in ordered["zero"]]
    ax.barh(y, ordered["zero"], color=colors)
    setup_ax(
        ax,
        "Onde os zeros apareceram",
        "Percentual de alunos presentes com zero em cada item; exibidos os maiores valores.",
    )
    ax.set_yticks(y, labels=ordered["label"], fontsize=12, color=TEXT)
    ax.set_xlim(0, max(0.7, ordered["zero"].max() + 0.08))
    ax.xaxis.set_major_formatter(ticker.PercentFormatter(1.0))
    ax.set_xlabel("Alunos com zero no item", color=TEXT, fontsize=12, labelpad=10)
    for i, row in enumerate(ordered.itertuples()):
        ax.text(row.zero + 0.012, i, percent_fmt(row.zero), va="center", color=TEXT, fontsize=11)
    save_fig(fig, "zeros_itens.png")


def draw_score_concentration(present: pd.DataFrame) -> None:
    notes = np.sort(present["nota"].to_numpy(dtype=float))
    n = len(notes)
    percentile = np.arange(1, n + 1) / n
    fig, ax = plt.subplots(figsize=(12.4, 6.2))
    ax.plot(notes, percentile, color=BLUE, linewidth=3)
    ax.fill_between(notes, percentile, color=CYAN, alpha=0.15)
    setup_ax(
        ax,
        "Leitura acumulada",
        "Curva mostra o percentual de alunos com nota até cada ponto.",
    )
    ax.axvline(6, color=RED, linestyle=":", linewidth=2.2)
    below_6 = (present["nota"] < 6).mean()
    ax.axhline(below_6, color=RED, linestyle=":", linewidth=1.6, alpha=0.8)
    ax.scatter([6], [below_6], s=85, color=RED, zorder=4)
    ax.text(
        6.12,
        below_6 + 0.035,
        f"{percent_fmt(below_6)} abaixo de 6,0",
        color=RED,
        fontsize=12,
        fontweight="bold",
    )
    ax.set_xlim(2, 10.5)
    ax.set_ylim(0, 1.02)
    ax.xaxis.set_major_locator(ticker.MultipleLocator(1))
    ax.yaxis.set_major_formatter(ticker.PercentFormatter(1.0))
    ax.set_xlabel("Nota", color=TEXT, fontsize=12, labelpad=10)
    ax.set_ylabel("Percentual acumulado", color=TEXT, fontsize=12, labelpad=10)
    save_fig(fig, "curva_acumulada.png")


def build_markdown(stats: dict[str, float], bands: pd.Series, group_summary: pd.DataFrame, item: pd.DataFrame) -> None:
    top_loss = group_summary.sort_values("pct").iloc[0]
    second_loss = group_summary.sort_values("pct").iloc[1]
    lowest_items = item.sort_values("pct").head(3)
    zero_q5 = item.loc[item["item"] == "Q5", "zero"].iloc[0]
    css = """
---
marp: true
backgroundImage: 'default_bg.png'
math: mathjax
html: true
---
<style>
section {
  background-image: url(default_bg.png);
}
h1, h2, h3, strong {
  color: #003E7E;
}
h3, h4, h5 {
  text-align: center;
}
h4, h5 {
  font-weight: normal;
}
h1 {
  font-size: 200%;
}
h2, h3 {
  font-size: 150%;
}
h4 {
  font-size: 100%;
}
h5 {
  font-size: 75%;
}
header, a {
  color: #058ED0;
}
header {
  font-size: 85%;
}
footer {
  color: black;
  font-size: 60%;
}
section::after {
  content: attr(data-marpit-pagination) ' / ' attr(data-marpit-pagination-total);
  color: #003E7E;
  font-size: 60%;
}
table {
  margin-left: auto;
  margin-right: auto;
  font-size: 82%;
}
th {
  background-color: #003E7E;
  color: white;
}
.columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}
.columns3 {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}
.metric {
  text-align: center;
  padding-top: 0.4rem;
}
.metric .value {
  color: #003E7E;
  font-size: 190%;
  font-weight: bold;
  line-height: 1;
}
.metric .label {
  color: #1F2933;
  font-size: 78%;
  line-height: 1.25;
}
.note {
  color: #1F2933;
  font-size: 78%;
  line-height: 1.35;
}
.chart {
  display: block;
  margin: 0 auto;
  max-height: 460px;
}
.chart.tall {
  max-height: 500px;
}
.quiet {
  color: #5B6773;
}
</style>
"""
    metrics = f"""
![bg](section_bg.png)

# Resultados da P1
**Teoria da Decisão – 2026.1**
Lucas Thevenard

---
<!--
paginate: true
header: Resultados da P1
footer: lucas.gomes@fgv.br | 28/04/2026
-->

## Visão geral

<div class="columns3">
<div class="metric"><div class="value">{int(stats["presentes"])}</div><div class="label">presentes</div></div>
<div class="metric"><div class="value">{int(stats["ausentes"])}</div><div class="label">ausentes</div></div>
<div class="metric"><div class="value">{comma(stats["media"], 2)}</div><div class="label">média</div></div>
</div>

<br>

<div class="columns3">
<div class="metric"><div class="value">{comma(stats["mediana"], 2)}</div><div class="label">mediana</div></div>
<div class="metric"><div class="value">{percent_fmt(stats["pct_ge_6"])}</div><div class="label">com nota >= 6,0</div></div>
<div class="metric"><div class="value">{comma(stats["max"], 2)}</div><div class="label">maior nota</div></div>
</div>

<br>

**Leitura curta:** a turma foi bem na primeira questão, mas perdeu tração em Q4 e sobretudo em Q5. A dispersão existe, mas a massa principal ficou acima de 6,0.
"""
    low_items_text = "; ".join(
        f"<strong>{ITEM_LABELS[row.item]}</strong>: {percent_fmt(row.pct)}"
        for row in lowest_items.itertuples()
    )
    bands_html = "".join(
        f"<tr><td>{idx}</td><td>{int(value)}</td><td>{percent_fmt(value / stats['presentes'])}</td></tr>"
        for idx, value in bands.items()
    )
    slides = f"""
---

## Distribuição das notas

![h:455](charts/notas_histograma.png)

---

## Concentração da turma

![h:455](charts/faixas_nota.png)

---

## Curva acumulada

![h:455](charts/curva_acumulada.png)

---

## Aproveitamento por questão

![h:455](charts/aproveitamento_questoes.png)

---

## Pontos obtidos e pontos deixados

![h:430](charts/composicao_media.png)

---

## Aproveitamento por item

![h:455](charts/aproveitamento_itens.png)

---

## Zeros por item

![h:455](charts/zeros_itens.png)

---

## O que os gráficos sugerem

<div class="columns">
<div>

**Pontos fortes**

- Q1 teve aproveitamento médio de **{percent_fmt(group_summary.loc[group_summary.questao == "Q1", "pct"].iloc[0])}**.
- Q3 ficou em **{percent_fmt(group_summary.loc[group_summary.questao == "Q3", "pct"].iloc[0])}**, com bom fechamento em Q3D.
- {int(stats["ge_6"])} dos {int(stats["presentes"])} presentes ficaram com nota igual ou superior a 6,0.

</div>
<div>

**Pontos de atenção**

- {top_loss["questao"]} teve o menor aproveitamento médio: **{percent_fmt(top_loss["pct"])}**.
- {second_loss["questao"]} veio em seguida, com **{percent_fmt(second_loss["pct"])}**.
- Q5 concentrou zeros: **{percent_fmt(zero_q5)}** dos presentes.

</div>
</div>

<br>

**Itens mais difíceis:** {low_items_text}.

---

## Faixas para consulta

<table>
<thead><tr><th>Faixa</th><th>Alunos</th><th>Percentual dos presentes</th></tr></thead>
<tbody>
{bands_html}
</tbody>
</table>

<br>

<p class="note">Dados agregados a partir de <strong>p1_correcao.numbers</strong>. CPFs foram usados apenas para identificar registros e não aparecem nos slides.</p>
"""
    OUT_MD.write_text(textwrap.dedent(css + metrics + slides).strip() + "\n", encoding="utf-8")


def main() -> None:
    CHARTS.mkdir(parents=True, exist_ok=True)
    DATA.mkdir(parents=True, exist_ok=True)

    df = load_numbers(SOURCE)
    df.to_csv(DATA / "p1_correcao_extraida.csv", index=False)
    present = df[df["fez_a_prova"] == True].copy()
    present.to_csv(DATA / "p1_correcao_presentes.csv", index=False)

    stats = {
        "total": float(len(df)),
        "presentes": float(len(present)),
        "ausentes": float((df["fez_a_prova"] == False).sum()),
        "media": float(present["nota"].mean()),
        "mediana": float(present["nota"].median()),
        "desvio": float(present["nota"].std()),
        "min": float(present["nota"].min()),
        "max": float(present["nota"].max()),
        "ge_6": float((present["nota"] >= 6).sum()),
        "pct_ge_6": float((present["nota"] >= 6).mean()),
    }

    draw_histogram(present)
    bands = draw_bands(present)
    draw_score_concentration(present)
    group_summary = draw_group_performance(present)
    draw_mean_composition(group_summary)
    item = draw_item_performance(present)
    draw_zero_rates(item)
    group_summary.to_csv(DATA / "resumo_questoes.csv", index=False)
    item.to_csv(DATA / "resumo_itens.csv", index=False)
    build_markdown(stats, bands, group_summary, item)


if __name__ == "__main__":
    main()

"""Charts for the FGV Global Bridges talk (17/11/2026).

All values are typed from the cited sources; see notes in the deck.
Run: python3 make_charts.py  -> writes PNGs into assets/
"""
import os
import logging
import matplotlib
logging.getLogger("matplotlib.font_manager").setLevel(logging.ERROR)
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Patch

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "assets")
os.makedirs(OUT, exist_ok=True)

NAVY = "#003e7e"
BLUE = "#058ed0"
GREY = "#9aa7b4"
LIGHT = "#d4dde6"
INK = "#202a33"
MUTED = "#586878"

plt.rcParams.update({
    "font.family": ["Arial", "Liberation Sans", "DejaVu Sans"],
    "font.size": 13,
    "text.color": INK,
    "axes.labelcolor": INK,
    "xtick.color": MUTED,
    "ytick.color": INK,
    "axes.edgecolor": LIGHT,
    "axes.spines.top": False,
    "axes.spines.right": False,
    "savefig.dpi": 220,
    "savefig.bbox": "tight",
    "savefig.pad_inches": 0.08,
})


def save(fig, name):
    fig.savefig(os.path.join(OUT, name), transparent=True)
    plt.close(fig)


# 1. Timeline of federal regulatory agencies --------------------------------
def timeline():
    # Equally spaced steps (not a proportional time axis); years are labelled.
    steps = [
        ("1996", ["ANEEL"], ["Electricity"]),
        ("1997", ["Anatel", "ANP"], ["Telecoms", "Oil & gas"]),
        ("1999", ["Anvisa"], ["Health\nsurveillance"]),
        ("2000", ["ANS", "ANA"], ["Health\ninsurance", "Water &\nsanitation"]),
        ("2001", ["ANTT", "Antaq", "Ancine"], ["Land\ntransport", "Waterway\ntransport", "Audiovisual"]),
        ("2005", ["ANAC"], ["Civil aviation"]),
        ("2017", ["ANM"], ["Mining"]),
        ("2026", ["ANPD"], ["Data protection"]),
    ]
    n = len(steps)
    fig, ax = plt.subplots(figsize=(12.4, 4.3))
    ax.set_xlim(-0.6, n - 0.4)
    ax.set_ylim(-4.5, 1.5)
    ax.axis("off")
    ax.plot([-0.3, n - 0.7], [0, 0], color=LIGHT, lw=4, zorder=1, solid_capstyle="round")
    # bracket for the first wave (1996-2001)
    ax.plot([-0.15, 4.15], [0.95, 0.95], color=NAVY, lw=1.6)
    for x in (-0.15, 4.15):
        ax.plot([x, x], [0.95, 0.8], color=NAVY, lw=1.6)
    ax.text(2.0, 1.08, "1996–2001: ten agencies, alongside privatisation and concessions",
            ha="center", va="bottom", fontsize=12, color=NAVY)
    for i, (yr, names, sectors) in enumerate(steps):
        color = BLUE if yr == "2026" else NAVY
        ax.scatter([i], [0], s=110, color=color, zorder=3)
        ax.text(i, 0.33, yr, ha="center", va="bottom", fontsize=15, fontweight="bold", color=color)
        y = -0.45
        for nm, sec in zip(names, sectors):
            ax.text(i, y, nm, ha="center", va="top", fontsize=14.5, fontweight="bold", color=INK)
            ax.text(i, y - 0.42, sec, ha="center", va="top", fontsize=10.5, color=MUTED)
            y -= 1.32
    save(fig, "timeline_agencies.png")


# 2. Infrastructure investment, public vs private ----------------------------
def infra():
    years = list(range(2010, 2026))
    public = [88.5, 85.2, 95.1, 96.2, 99.2, 70.1, 55.6, 56.5, 52.6, 46.7, 36.3, 37.8, 36.6, 54.8, 54.9, 59.9]
    private = [114.5, 133.5, 138.4, 152.5, 151.8, 140.6, 114.8, 110.6, 125.6, 125.7, 129.0, 141.4, 160.6, 180.8, 216.8, 220.5]
    total = [203.0, 218.7, 233.5, 248.7, 251.0, 210.7, 170.5, 167.1, 178.1, 172.4, 165.4, 179.3, 197.1, 235.5, 271.7, 280.4]
    fig, ax = plt.subplots(figsize=(11.2, 4.9))
    ax.bar(years, public, color=NAVY, width=0.72, label="Public")
    ax.bar(years, private, bottom=public, color=BLUE, width=0.72, label="Private")
    for x, t in zip(years, total):
        ax.text(x, t + 4, f"{t:.0f}", ha="center", va="bottom", fontsize=10.5, color=INK)
    ax.set_ylim(0, 310)
    ax.set_xticks(years)
    ax.set_xticklabels([str(y) if y % 5 == 0 or y == 2025 else "'" + str(y)[2:] for y in years], fontsize=11)
    ax.set_yticks([0, 100, 200, 300])
    ax.tick_params(axis="y", labelsize=11, colors=MUTED)
    ax.tick_params(axis="x", length=0)
    ax.set_ylabel("R$ billion (constant 2025 prices)", fontsize=11, color=MUTED)
    ax.grid(axis="y", color=LIGHT, lw=0.8)
    ax.set_axisbelow(True)
    ax.legend(loc="upper left", frameon=False, ncol=2, fontsize=12)
    save(fig, "infra_investment.png")


# 3. Doing Business 2020: Brazil topic ranks ---------------------------------
def doing_business():
    topics = [
        ("Paying taxes", 184),
        ("Dealing with construction permits", 170),
        ("Starting a business", 138),
        ("Registering property", 133),
        ("Trading across borders", 108),
        ("Getting credit", 104),
        ("Getting electricity", 98),
        ("Resolving insolvency", 77),
        ("Protecting minority investors", 61),
        ("Enforcing contracts", 58),
    ]
    names = [t[0] for t in topics][::-1]
    ranks = [t[1] for t in topics][::-1]
    colors = [NAVY if r >= 130 else GREY for r in ranks]
    fig, ax = plt.subplots(figsize=(7.6, 5.0))
    ax.barh(names, ranks, color=colors, height=0.66)
    for i, r in enumerate(ranks):
        ax.text(r + 2, i, str(r), va="center", fontsize=12, color=INK)
    ax.set_xlim(0, 200)
    ax.set_xticks([0, 50, 100, 150])
    ax.tick_params(axis="x", labelsize=10.5)
    ax.tick_params(axis="y", length=0, labelsize=12)
    ax.set_xlabel("Rank among 190 economies (1 = best)", fontsize=11, color=MUTED)
    ax.spines["left"].set_visible(False)
    save(fig, "doing_business_2020.png")


# 4. RIA use by agency, Apr 2021 - Apr 2024 ----------------------------------
def ria():
    rows = [  # agency, n, RIA, exemption, neither (shares in %)
        ("Anatel", 22, 90.9, 0.0, 9.1),
        ("ANTT", 38, 60.5, 10.5, 28.9),
        ("ANAC", 143, 46.9, 22.4, 30.8),
        ("Antaq", 47, 31.9, 25.5, 42.6),
        ("ANA", 121, 20.7, 18.2, 61.2),
        ("ANEEL", 123, 17.9, 0.0, 82.1),
        ("ANP", 125, 14.4, 15.2, 70.4),
        ("ANM", 24, 12.5, 37.5, 50.0),
        ("Anvisa", 563, 7.8, 54.9, 37.3),
        ("ANS", 169, 7.7, 21.3, 71.0),
        ("Ancine", 40, 5.0, 27.5, 67.5),
    ]
    total = ("All 11 agencies", 1415, 17.8, 32.1, 50.1)
    data = rows[::-1] + [None, total]  # total on top after a gap
    data = [total, None] + rows
    data = data[::-1]
    fig, ax = plt.subplots(figsize=(11.2, 5.3))
    labels, ys = [], []
    for i, r in enumerate(data):
        if r is None:
            continue
        name, n, a, e, ne = r
        bold = name.startswith("All")
        ax.barh(i, a, color=NAVY, height=0.7)
        ax.barh(i, e, left=a, color=GREY, height=0.7)
        ax.barh(i, ne, left=a + e, color=LIGHT, height=0.7)
        for left, w, c in ((0, a, "white"), (a, e, "white"), (a + e, ne, INK)):
            if w >= 7:
                ax.text(left + w / 2, i, f"{int(w + 0.5)}%", ha="center", va="center",
                        fontsize=11, color=c, fontweight="bold" if bold else "normal")
        labels.append(f"{name}  (n = {n:,})")
        ys.append(i)
    ax.set_yticks(ys)
    ax.set_yticklabels(labels, fontsize=12)
    for t in ax.get_yticklabels():
        if t.get_text().startswith("All"):
            t.set_fontweight("bold")
            t.set_color(NAVY)
    ax.set_xlim(0, 100)
    ax.set_xticks([0, 25, 50, 75, 100])
    ax.set_xticklabels(["0%", "25%", "50%", "75%", "100%"], fontsize=10.5)
    ax.tick_params(axis="y", length=0)
    ax.spines["left"].set_visible(False)
    ax.legend(handles=[Patch(color=NAVY, label="RIA report"),
                       Patch(color=GREY, label="Formal exemption"),
                       Patch(color=LIGHT, label="Neither")],
              loc="upper center", bbox_to_anchor=(0.45, -0.07), ncol=3, frameon=False, fontsize=12)
    save(fig, "ria_by_agency.png")


# 5. Participant profiles by agency (Regulation in Numbers dataset) ------------
def participant_profiles():
    # Share of comments by participant category; procedures through 2022.
    # Unclassified records excluded (ANEEL 93, Anatel 26, Anvisa 3,121 comments).
    cats = ["Regulated firms", "Non-regulated firms", "Professionals", "Individuals",
            "Consumers / users", "Government", "Civil society, academia & others"]
    colors = [NAVY, BLUE, "#8cc8ea", "#e39b3b", "#c4664a", "#6b7a89", LIGHT]
    data = [  # agency label, shares in cats order
        ("Anvisa\n(n = 16,663)", [36.7, 4.9, 26.3, 13.8, 0.1, 5.6, 12.5]),
        ("Anatel\n(n = 22,882)", [31.4, 1.3, 5.9, 51.7, 0.5, 1.1, 8.1]),
        ("ANEEL\n(n = 39,660)", [69.8, 9.6, 0.6, 2.2, 3.2, 4.9, 9.7]),
    ]
    fig, ax = plt.subplots(figsize=(7.4, 4.6))
    for i, (lab, vals) in enumerate(data):
        left = 0
        for v, c in zip(vals, colors):
            ax.barh(i, v, left=left, color=c, height=0.62, edgecolor="white", linewidth=0.6)
            if v >= 6:
                tc = "white" if c in (NAVY, BLUE, "#6b7a89", "#c4664a") else INK
                ax.text(left + v / 2, i, f"{int(v + 0.5)}%", ha="center", va="center", fontsize=11.5, color=tc)
            left += v
    ax.set_yticks(range(len(data)))
    ax.set_yticklabels([d[0] for d in data], fontsize=12.5)
    ax.set_xlim(0, 100)
    ax.set_xticks([])
    for sp in ("bottom", "left"):
        ax.spines[sp].set_visible(False)
    ax.tick_params(axis="y", length=0)
    ax.legend(handles=[Patch(color=c, label=l) for c, l in zip(colors, cats)],
              loc="upper center", bbox_to_anchor=(0.45, -0.02), ncol=2, frameon=False, fontsize=11,
              handlelength=1.2, columnspacing=1.2)
    save(fig, "participant_profiles.png")


# 6. What gets accepted: Anatel, 2000-2026 ------------------------------------
def acceptance_anatel():
    # Fully + partially accepted, % of within-scope responses (all submissions).
    groups = [
        ("By argument type", [("Technical", 43.1), ("Economic", 37.3), ("Legal", 32.2)]),
        ("By request direction", [("More regulation", 40.0), ("Less regulation", 28.3)]),
    ]
    fig, ax = plt.subplots(figsize=(5.2, 4.6))
    y = 0
    yt, yl = [], []
    for gname, items in groups:
        ax.text(0, y - 0.15, gname, fontsize=12, color=MUTED, va="bottom", fontweight="bold")
        y += 0.75
        for name, v in items:
            ax.barh(y, v, color=BLUE if gname.startswith("By arg") else NAVY, height=0.6)
            ax.text(v + 1, y, f"{v:.0f}%", va="center", fontsize=12.5)
            ax.text(-1.5, y, name, va="center", ha="right", fontsize=12.5)
            y += 0.85
        y += 0.5
    ax.set_ylim(y - 0.4, -0.6)
    ax.set_xlim(0, 55)
    ax.axis("off")
    save(fig, "acceptance_anatel.png")


# 7. Agency budgets and staff, 2015-2024 --------------------------------------
def budget():
    yrs = list(range(2015, 2025))
    exp_idx = [100.0, 90.3, 92.6, 91.8, 86.5, 81.2, 72.6, 70.3, 73.2, 70.3]
    wf_idx = [100.0, 98.7, 97.2, 94.7, 90.0, 88.3, 87.4, 85.9, 84.6, 84.9]
    mand = [62.6, 68.4, 71.0, 67.5, 70.1, 68.2, 71.1, 68.5, 66.5, 68.8]
    pers = [42.6, 47.0, 47.8, 46.6, 47.0, 47.2, 48.1, 46.7, 45.3, 46.6]
    fig, (a1, a2) = plt.subplots(1, 2, figsize=(12.0, 4.5), gridspec_kw={"wspace": 0.28})
    a1.plot(yrs, wf_idx, color=BLUE, lw=2.6, marker="o", ms=5, label="Workforce")
    a1.plot(yrs, exp_idx, color=NAVY, lw=2.6, marker="o", ms=5, label="Executed expenditure (real)")
    a1.text(2024.25, wf_idx[-1], f"{wf_idx[-1]:.0f}", va="center", fontsize=12, color=BLUE, fontweight="bold")
    a1.text(2024.25, exp_idx[-1], f"{exp_idx[-1]:.0f}", va="center", fontsize=12, color=NAVY, fontweight="bold")
    a1.set_ylim(60, 105)
    a1.set_title("Index, 2015 = 100", fontsize=13, color=NAVY, loc="left", fontweight="bold")
    a2.plot(yrs, mand, color=NAVY, lw=2.6, marker="o", ms=5, label="Mandatory spending")
    a2.plot(yrs, pers, color=BLUE, lw=2.6, marker="o", ms=5, label="Personnel (excl. retirements)")
    a2.text(2024.25, mand[-1], f"{mand[-1]:.0f}%", va="center", fontsize=12, color=NAVY, fontweight="bold")
    a2.text(2024.25, pers[-1], f"{pers[-1]:.0f}%", va="center", fontsize=12, color=BLUE, fontweight="bold")
    a2.set_ylim(30, 80)
    a2.set_title("Share of total expenditure (%)", fontsize=13, color=NAVY, loc="left", fontweight="bold")
    for a in (a1, a2):
        a.set_xlim(2014.6, 2025.0)
        a.set_xticks([2015, 2018, 2021, 2024])
        a.tick_params(labelsize=11)
        a.grid(axis="y", color=LIGHT, lw=0.8)
        a.set_axisbelow(True)
        a.legend(loc="lower left", frameon=False, fontsize=11)
    save(fig, "budget_series.png")


if __name__ == "__main__":
    timeline()
    infra()
    doing_business()
    ria()
    participant_profiles()
    acceptance_anatel()
    budget()
    print("ok")

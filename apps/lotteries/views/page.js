// Lotteries page layout (placeholder).
// Later: sidebar inputs + tabs + mounting charts/tables.

export function renderPage(mount, { lang }) {
  const title = lang === "en" ? "Lotteries & Expected Value" : "Loterias e Valor Esperado";
  const back = lang === "en" ? "Back to Apps" : "Voltar para Apps";

  mount.innerHTML = `
    <section class="card">
      <div style="display:flex; justify-content:space-between; gap:12px; align-items:center;">
        <h1 style="margin:0;">${title}</h1>
        <a href="#/${lang}/apps">${back}</a>
      </div>
      <p>This is a skeleton page. Next steps: implement parsing/validation, then describeLottery, then simulation.</p>
    </section>
  `;
}

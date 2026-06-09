// Currency toggle (USD ⇄ EUR) with localStorage persistence.
const KEY = "cs-currency";
type Cur = "usd" | "eur";

function apply(cur: Cur) {
  document.documentElement.dataset.currency = cur;
  document.querySelectorAll<HTMLButtonElement>("[data-cur-btn]").forEach((b) => {
    const active = b.dataset.curBtn === cur;
    b.setAttribute("aria-pressed", String(active));
    b.classList.toggle("is-active", active);
  });
}

function initCurrency() {
  const buttons = document.querySelectorAll<HTMLButtonElement>("[data-cur-btn]");
  if (!buttons.length) return;
  let saved: Cur = "usd";
  try {
    const v = localStorage.getItem(KEY);
    if (v === "eur" || v === "usd") saved = v;
  } catch {}
  apply(saved);
  buttons.forEach((b) =>
    b.addEventListener("click", () => {
      const cur = (b.dataset.curBtn as Cur) ?? "usd";
      try { localStorage.setItem(KEY, cur); } catch {}
      apply(cur);
    })
  );
}

document.addEventListener("astro:page-load", initCurrency);

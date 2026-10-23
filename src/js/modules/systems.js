import { qs, qsa, escapeHtml } from "./utils.js";
import { systems } from "../data/systems.js";

export function initSystems() {
  const grid = qs("#systemsGrid");
  grid.innerHTML = systems
    .map(
      (s) => `
      <button class="card system-card" data-system="${s.id}" type="button">
        <span class="icon" aria-hidden="true">${s.icon}</span>
        <h3>${escapeHtml(s.name)}</h3>
        <p>${escapeHtml(s.summary)}</p>
      </button>`
    )
    .join("");

  grid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-system]");
    if (!card) return;
    const id = card.dataset.system;
    const wasActive = card.classList.contains("active");
    qsa(".system-card", grid).forEach((c) => c.classList.remove("active"));
    if (!wasActive) card.classList.add("active");
    document.dispatchEvent(
      new CustomEvent("systemfilter", { detail: { system: wasActive ? "all" : id } })
    );
    qs("#organs").scrollIntoView({ behavior: "smooth" });
  });
}
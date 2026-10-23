import { qs, escapeHtml, debounce } from "./utils.js";
import { systems } from "../data/systems.js";
import { organs } from "../data/organs.js";
import { openOrganModal } from "./modal.js";

const state = { query: "", system: "all" };

function render() {
  const grid = qs("#organsGrid");
  const query = state.query.trim().toLowerCase();
  const list = organs.filter((o) => {
    const matchSystem = state.system === "all" || o.system === state.system;
    const matchQuery =
      !query ||
      o.name.toLowerCase().includes(query) ||
      o.function.toLowerCase().includes(query) ||
      o.location.toLowerCase().includes(query);
    return matchSystem && matchQuery;
  });

  qs("#resultCount").textContent = `${list.length} result${list.length === 1 ? "" : "s"}`;

  if (!list.length) {
    grid.innerHTML = `<p class="empty">No organs match your search.</p>`;
    return;
  }

  grid.innerHTML = list
    .map((o) => {
      const system = systems.find((s) => s.id === o.system);
      return `
      <article class="card organ-card" data-organ="${o.id}" tabindex="0" role="button">
        <span class="tag">${escapeHtml(system ? system.name : o.system)}</span>
        <h3>${escapeHtml(o.name)}</h3>
        <p>${escapeHtml(o.location)}</p>
      </article>`;
    })
    .join("");
}

function open(target) {
  const card = target.closest("[data-organ]");
  if (!card) return;
  const organ = organs.find((o) => o.id === card.dataset.organ);
  if (organ) openOrganModal(organ);
}

export function initOrgans() {
  const select = qs("#organFilter");
  select.innerHTML =
    `<option value="all">All systems</option>` +
    systems.map((s) => `<option value="${s.id}">${escapeHtml(s.name)}</option>`).join("");

  qs("#organSearch").addEventListener(
    "input",
    debounce((event) => {
      state.query = event.target.value;
      render();
    }, 150)
  );

  select.addEventListener("change", (event) => {
    state.system = event.target.value;
    render();
  });

  document.addEventListener("systemfilter", (event) => {
    state.system = event.detail.system;
    select.value = state.system;
    render();
  });

  const grid = qs("#organsGrid");
  grid.addEventListener("click", (event) => open(event.target));
  grid.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      open(event.target);
    }
  });

  render();
}
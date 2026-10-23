import { qs, qsa, escapeHtml } from "./utils.js";
import { systems } from "../data/systems.js";

let lastFocus = null;

export function closeModal() {
  const modal = qs("#modal");
  modal.hidden = true;
  document.body.style.overflow = "";
  if (lastFocus) lastFocus.focus();
}

export function openOrganModal(organ) {
  const modal = qs("#modal");
  const system = systems.find((s) => s.id === organ.system);
  lastFocus = document.activeElement;
  qs("#modalBody").innerHTML = `
    <span class="tag">${escapeHtml(system ? system.name : organ.system)}</span>
    <h3 id="modalTitle">${escapeHtml(organ.name)}</h3>
    <dl>
      <dt>Location</dt><dd>${escapeHtml(organ.location)}</dd>
      <dt>Function</dt><dd>${escapeHtml(organ.function)}</dd>
      <dt>Fun fact</dt><dd>${escapeHtml(organ.fact)}</dd>
    </dl>
  `;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  qs(".modal-close").focus();
}

export function initModal() {
  qsa("[data-close]").forEach((el) => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !qs("#modal").hidden) closeModal();
  });
}
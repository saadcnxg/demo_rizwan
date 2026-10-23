import { qs, qsa, escapeHtml } from "./utils.js";
import { organs } from "../data/organs.js";
import { openOrganModal } from "./modal.js";

function showCard(organ) {
  qs("#mapCard").innerHTML = `
    <h3>${escapeHtml(organ.name)}</h3>
    <p><strong>Location:</strong> ${escapeHtml(organ.location)}</p>
    <p>${escapeHtml(organ.function)}</p>
    <button class="btn btn-primary" type="button" id="mapMore">More details</button>
  `;
  qs("#mapMore").addEventListener("click", () => openOrganModal(organ));
}

export function initBodyMap() {
  const spots = qsa(".hotspot");
  spots.forEach((spot) => {
    spot.setAttribute("tabindex", "0");
    spot.setAttribute("role", "button");
    const organ = organs.find((o) => o.id === spot.dataset.organ);
    if (!organ) return;
    spot.setAttribute("aria-label", organ.name);

    const select = () => {
      spots.forEach((s) => s.classList.remove("active"));
      spot.classList.add("active");
      showCard(organ);
    };

    spot.addEventListener("click", select);
    spot.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        select();
      }
    });
  });
}
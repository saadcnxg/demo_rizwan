import { initTheme } from "./modules/theme.js";
import { initNav } from "./modules/nav.js";
import { initReveal } from "./modules/scroll.js";
import { initStats } from "./modules/stats.js";
import { initSystems } from "./modules/systems.js";
import { initOrgans } from "./modules/organs.js";
import { initBodyMap } from "./modules/bodymap.js";
import { initFacts } from "./modules/facts.js";
import { initQuiz } from "./modules/quiz.js";
import { initModal } from "./modules/modal.js";

function start() {
  initTheme();
  initNav();
  initReveal();
  initModal();
  initStats();
  initSystems();
  initOrgans();
  initBodyMap();
  initFacts();
  initQuiz();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}
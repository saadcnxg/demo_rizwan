import { qs } from "./utils.js";
import { systems } from "../data/systems.js";
import { organs } from "../data/organs.js";
import { questions } from "../data/quiz.js";

export function initStats() {
  const list = qs("#stats");
  const items = [
    [systems.length, "Organ systems"],
    [organs.length, "Organs and structures"],
    [questions.length, "Quiz questions"]
  ];
  list.innerHTML = items
    .map(([value, label]) => `<li><strong>${value}</strong><span>${label}</span></li>`)
    .join("");
}
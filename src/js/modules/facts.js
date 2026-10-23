import { qs } from "./utils.js";
import { facts } from "../data/facts.js";

let index = -1;

function next() {
  let n;
  do {
    n = Math.floor(Math.random() * facts.length);
  } while (n === index && facts.length > 1);
  index = n;
  qs("#factText").textContent = facts[n];
}

export function initFacts() {
  qs("#factBtn").addEventListener("click", next);
  next();
}
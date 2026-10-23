import { qs } from "./utils.js";

const KEY = "anatomia-theme";

function apply(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const btn = qs("#themeBtn");
  if (btn) btn.textContent = theme === "dark" ? "☀" : "🌙";
}

function stored() {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function initTheme() {
  const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  apply(stored() || preferred);
  qs("#themeBtn").addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    apply(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {}
  });
}
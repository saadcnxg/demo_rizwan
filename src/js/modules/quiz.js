import { qs, escapeHtml } from "./utils.js";
import { questions } from "../data/quiz.js";

const state = { current: 0, score: 0, answered: false };

function renderQuestion() {
  const card = qs("#quizCard");
  const item = questions[state.current];
  const percent = (state.current / questions.length) * 100;
  state.answered = false;

  card.innerHTML = `
    <div class="quiz-progress"><span style="width:${percent}%"></span></div>
    <p class="quiz-meta">Question ${state.current + 1} of ${questions.length}</p>
    <h3 class="quiz-question">${escapeHtml(item.q)}</h3>
    <div class="quiz-options">
      ${item.options
        .map((opt, i) => `<button class="quiz-option" type="button" data-index="${i}">${escapeHtml(opt)}</button>`)
        .join("")}
    </div>
    <p class="quiz-feedback" id="quizFeedback" aria-live="polite"></p>
    <div class="quiz-actions"><button class="btn btn-primary" type="button" id="quizNext" hidden>Next</button></div>
  `;

  card.querySelectorAll(".quiz-option").forEach((btn) => {
    btn.addEventListener("click", () => choose(Number(btn.dataset.index)));
  });
  qs("#quizNext").addEventListener("click", advance);
}

function choose(index) {
  if (state.answered) return;
  state.answered = true;
  const item = questions[state.current];
  const buttons = Array.from(document.querySelectorAll(".quiz-option"));
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === item.answer) btn.classList.add("correct");
    else if (i === index) btn.classList.add("wrong");
  });
  if (index === item.answer) state.score += 1;
  qs("#quizFeedback").textContent = (index === item.answer ? "Correct! " : "Not quite. ") + item.explain;
  const next = qs("#quizNext");
  next.hidden = false;
  next.textContent = state.current === questions.length - 1 ? "See result" : "Next";
}

function advance() {
  state.current += 1;
  if (state.current >= questions.length) renderResult();
  else renderQuestion();
}

function renderResult() {
  const card = qs("#quizCard");
  const total = questions.length;
  const ratio = state.score / total;
  const message = ratio === 1 ? "Perfect score!" : ratio >= 0.6 ? "Great job!" : "Keep exploring and try again.";
  card.innerHTML = `
    <div class="quiz-result">
      <p class="quiz-meta">Your score</p>
      <strong>${state.score} / ${total}</strong>
      <p>${message}</p>
      <button class="btn btn-primary" type="button" id="quizRestart">Restart quiz</button>
    </div>
  `;
  qs("#quizRestart").addEventListener("click", restart);
}

function restart() {
  state.current = 0;
  state.score = 0;
  renderQuestion();
}

export function initQuiz() {
  renderQuestion();
}
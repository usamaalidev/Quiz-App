import Question from "./question.js";
import Quiz from "./quiz.js";

// ^ ======> HTML Elements
export const quizOptions = document.getElementById("quizOptions");
export const categoryMenu = document.getElementById("categoryMenu");
export const difficultyOptions = document.getElementById("difficultyOptions");
export const questionsNumber = document.getElementById("questionsNumber");
export const questionsContainer = document.querySelector(
  ".questions-container"
);
const startBtn = document.getElementById("startQuiz");

// ^ ======> App variables
const currentIndex = 0;
export let quiz;
export let questions;

startBtn.addEventListener("click", async function () {
  const category = categoryMenu.value;
  const difficulty = difficultyOptions.value;
  const number = questionsNumber.value;

  quiz = new Quiz(category, difficulty, number);
  questions = await quiz.getQuestions();
  const question = new Question(currentIndex);
  question.display();

  quizOptions.classList.replace("d-flex", "d-none");
  questionsContainer
    .querySelector(".question")
    .classList.replace("d-none", "d-flex");
});

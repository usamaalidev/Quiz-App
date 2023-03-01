import {
  quiz,
  questions,
  quizOptions,
  questionsNumber,
  difficultyOptions,
  categoryMenu,
  questionsContainer,
} from "./index.js";

export default class Question {
  constructor(currentIndex) {
    this.index = currentIndex;
    this.question = questions[currentIndex].question;
    this.category = questions[currentIndex].category;
    this.choices = this.getChoices(questions[currentIndex]);
    this.difficulty = questions[currentIndex].difficulty;
    this.correct = questions[currentIndex].correct_answer;
    this.answered = false;
  }

  getChoices(questionDetails) {
    return questionDetails.incorrect_answers
      .concat(questionDetails.correct_answer)
      .sort();
  }

  display() {
    const questionMarkUp = `
      <div
        class="question shadow-lg col-lg-6 offset-lg-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3 animate__animated animate__bounceIn"
      >
        <div class="w-100 d-flex justify-content-between">
          <span class="btn btn-category">${this.category}</span>
          <span class="fs-6 btn btn-questions">${this.index + 1} of ${
      questions.length
    } Questions</span>
        </div>
        <h2 class="text-capitalize h4 text-center">${this.question}</h2>  
        <ul class="choices w-100 list-unstyled m-0 d-flex flex-wrap text-center">
        ${this.choices
          .map((choice) => `<li>${choice}</li>`)
          .toString()
          .replaceAll(",", "")}
        </ul>
        <h2 class="text-capitalize text-center score-color h3 fw-bold"><i class="bi bi-emoji-laughing"></i> Score: ${
          quiz.score
        }</h2>        
      </div>
    `;

    questionsContainer.innerHTML = questionMarkUp;

    const choicesElements = document.querySelectorAll("ul li");
    for (let i = 0; i < choicesElements.length; i++) {
      choicesElements[i].addEventListener("click", () => {
        this.checkAnswer(choicesElements[i]);
        this.animateQuestion(choicesElements[i], 1000);
        this.nextQuestion();
      });
    }
  }

  checkAnswer(element) {
    if (!this.answered) {
      this.answered = true;
      if (element.innerHTML == this.correct) {
        element.classList.add(
          "correct",
          "animate__animated",
          "animate__flipInY"
        );
        quiz.score++;
      } else {
        element.classList.add("wrong", "animate__animated", "animate__shakeX");
      }
    }
  }

  nextQuestion() {
    this.index++;
    setTimeout(() => {
      if (this.index < questions.length) {
        const nextQuestion = new Question(this.index);
        nextQuestion.display();
      } else {
        questionsContainer.innerHTML = quiz.showResult();
        const tryAgain = document.querySelector(".again");
        tryAgain.addEventListener("click", function () {
          questionsContainer
            .querySelector(".question")
            .classList.replace("d-flex", "d-none");
          categoryMenu.value = "";
          difficultyOptions.value = "easy";
          questionsNumber.value = "";
          quizOptions.classList.replace("d-none", "d-flex");

          // & Another Solution
          // window.location.reload();
        });
      }
    }, 2000);
  }

  animateQuestion(element, duration) {
    setTimeout(() => {
      element
        .closest(".question")
        .classList.add("animate__animated", "animate__bounceOutLeft");
    }, duration);
  }
}

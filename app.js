let currentQuestionIndex = 0;
let score = 0;

const startScreen = document.getElementById("start-screen");
const questionScreen = document.getElementById("question-screen");
const resultScreen = document.getElementById("result-screen");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const questionText = document.getElementById("question-text");
const optionContainer = document.getElementById("option-container");
const progressText = document.getElementById("progress-text");
const finalScore = document.getElementById("final-score");

const questions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    answer: 2,
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Mars", "Jupiter", "Saturn", "Neptune"],
    answer: 1,
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    answer: 2,
  },
];

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  startScreen.classList.add("hidden");
  questionScreen.classList.remove("hidden");
  showQuestion();
}

startBtn.addEventListener("click", startQuiz);

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionText.innerText = currentQuestion.question;
  optionContainer.innerHTML = "";

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.innerText = option;
    button.classList.add("option-btn");

    button.addEventListener("click", () => selectAnswer(index));

    optionContainer.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedIndex === currentQuestion.answer) {
    score++;
  }

  const allButtons = optionContainer.querySelectorAll("button");
  allButtons.forEach((button, index) => {
    button.disabled = true;
  });

  nextBtn.classList.remove("hidden");
}

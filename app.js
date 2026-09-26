let currentQuestionIndex = 0;
let score = 0;

const HIGH_SCORE_KEY = "quiz_pulse_high_score";

const startScreen = document.getElementById("start-screen");
const questionScreen = document.getElementById("question-screen");
const resultScreen = document.getElementById("result-screen");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const questionText = document.getElementById("question-text");
const optionContainer = document.getElementById("option-container");
const progressText = document.getElementById("progress-text");
const progressBar = document.getElementById("progress-bar");
const progressContainer = document.getElementById("progress-container");
const finalScore = document.getElementById("final-score");
const highScoreStart = document.getElementById("high-score-display");

// LocalStorage functions
function getHighScore() {
  return parseInt(localStorage.getItem(HIGH_SCORE_KEY)) || 0;
}

function updateHighScoreDisplay() {
  const highScore = getHighScore();
  if (highScoreStart) {
    highScoreStart.innerText = `High Score: ${highScore} / ${questions.length}`;
  }
}

function saveHighSore(currentScore) {
  const highScore = getHighScore();
  if (currentScore > highScore) {
    localStorage.setItem(HIGH_SCORE_KEY, currentScore);
    return true; // New high score achieved
  }
  return false;
}

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
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: [
      "William Shakespeare",
      "Charles Dickens",
      "Jane Austen",
      "Mark Twain",
    ],
    answer: 0,
  },
  {
    question: "What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean",
    ],
    answer: 3,
  },
  {
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    answer: 2,
  },
  {
    question: "What is the currency of Japan?",
    options: ["Yen", "Dollar", "Euro", "Pound"],
    answer: 0,
  },
  {
    question: "What is the tallest mountain in the universe?",
    options: ["Mount Everest", "K2", "Mount Kilimanjaro", "Mount Fuji"],
    answer: 0,
  },
  {
    question: "What is the largest desert in the world?",
    options: [
      "Sahara Desert",
      "Gobi Desert",
      "Kalahari Desert",
      "Arabian Desert",
    ],
    answer: 0,
  },
];

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;

  if (progressBar) {
    progressBar.style.width = "0%";
    progressText.parentElement.classList.remove("hidden");
  }

  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  questionScreen.classList.remove("hidden");
  progressText.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  progressText.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  if (progressBar) {
    const progressPercentage =
      ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
  }
  questionText.innerText = currentQuestion.question;
  optionContainer.innerHTML = "";

  nextBtn.classList.add("hidden");

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

    if (index === currentQuestion.answer) {
      button.classList.add("correct");
    }
    if (index === selectedIndex && selectedIndex !== currentQuestion.answer) {
      button.classList.add("wrong");
    }
  });
  nextBtn.classList.remove("hidden");
}

function handleNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  questionScreen.classList.add("hidden");

  progressText.classList.add("hidden");
  progressText.parentElement.classList.add("hidden");

  resultScreen.classList.remove("hidden");
  finalScore.innerText = `Your scored: ${score} out of ${questions.length}!`;
}

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", handleNextQuestion);
restartBtn.addEventListener("click", startQuiz);

updateHighScoreDisplay();

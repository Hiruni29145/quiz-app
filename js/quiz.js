const username = localStorage.getItem("username") || "Guest";
  document.getElementById("username-display").textContent = username;

  window.addEventListener("DOMContentLoaded", () => {
  // Display the username
  const username = localStorage.getItem("username") || "Guest";
  document.getElementById("username-display").textContent = username;

  
  const startTime = parseInt(localStorage.getItem("quizStartTime")) || Date.now();
  const totalSeconds = 50;
  const timerElement = document.getElementById("timer");

  function updateTimer() {
    const now = Date.now();
    const elapsed = Math.floor((now - startTime) / 1000);//Converts milliseconds into seconds.
    const remaining = totalSeconds - elapsed;

    if (remaining <= 0) {
      timerElement.textContent = "00:00";
      alert("Time's up!");
      return;
    }

    const mins = String(Math.floor(remaining / 60)).padStart(2, '0');
    const secs = String(remaining % 60).padStart(2, '0');
    timerElement.textContent = `${mins}:${secs}`;

    setTimeout(updateTimer, 1000);
  }

  updateTimer();
});
const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Hyper Text Preprocessor",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language"
    ],
    answer: 0
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Creative Style Sheets",
      "Colorful Style Sheets",
      "Computer Style Sheets"
    ],
    answer: 0
  },
  {
    question: "What does JS stand for?",
    options: [
      "Java Style",
      "JavaScript",
      "JustScript",
      "JScript"
    ],
    answer: 1
  },
  {
    question: "Which tag is used to define a JavaScript in HTML?",
    options: [
      "js",
      "script",
      "javascript",
      "code"
    ],
    answer: 1
  },
  {
    question: "Which property is used to change the background color in CSS?",
    options: [
      "color",
      "bgcolor",
      "background-color",
      "background"
    ],
    answer: 2
  }
];

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
const totalSeconds = 50;

function startTimer() {
  clearInterval(timerInterval); // clear previous timer if any
  let remaining = totalSeconds;

  const timerElement = document.getElementById("timer");
  timerElement.textContent = formatTime(remaining);

  timerInterval = setInterval(() => {
    remaining--;
    if (remaining <= 0) {
      clearInterval(timerInterval);
      timerElement.textContent = "00:00";
      alert("Time's up!");
      document.querySelector(".quiz-box").innerHTML = `
        <h2>Time's up!</h2>
        <p>Your Score: <strong>${score} / ${quizData.length}</strong></p>
      `;
    } else {
      timerElement.textContent = formatTime(remaining);
    }
  }, 1000);//1000 milliseconds (1 second)
}

function formatTime(seconds) {
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
}

function loadQuestion() {
  const questionData = quizData[currentQuestionIndex];
  const questionText = document.getElementById("question-text");
  const optionsList = document.getElementById("options-list");
  const questionCount = document.getElementById("question-count");

  questionText.textContent = `${currentQuestionIndex + 1}. ${questionData.question}`;
  questionCount.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;

  optionsList.innerHTML = "";

  questionData.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <label>
        <input type="radio" name="answer" value="${index}" />
        <span>${option}</span>
      </label>
    `;
    optionsList.appendChild(li);
  });

  const nextBtn = document.getElementById("nextBtn");
  nextBtn.textContent = currentQuestionIndex === quizData.length - 1 ? "Submit" : "Next";

  startTimer(); //  Start/restart the timer for this question
}

function goToNextQuestion() {
  const selectedOption = document.querySelector('input[name="answer"]:checked');
  if (!selectedOption) {
    alert("Please select an answer.");
    return;
  }

  const selectedAnswer = parseInt(selectedOption.value);
  const correctAnswer = quizData[currentQuestionIndex].answer;

  if (selectedAnswer === correctAnswer) {
    score++;
  }

  if (currentQuestionIndex < quizData.length - 1) {
    currentQuestionIndex++;
    loadQuestion(); // this will also restart the timer
  } else {
    clearInterval(timerInterval); // stop timer if quiz ends
    document.querySelector(".quiz-box").innerHTML = `
      <h2>Quiz Completed!</h2>
      <p>Thank you, <strong>${localStorage.getItem("username") || "Guest"}</strong>.</p>
      <p>Your Score: <strong>${score} / ${quizData.length}</strong></p>
    `;
  }
}

// Initial setup
window.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("username") || "Guest";
  document.getElementById("username-display").textContent = username;

  loadQuestion(); // load 1st question + start timer
});



const quizData = {
  general: [
    {
      question: "Which planet is known as the Red Planet?",
      a: "Earth",
      b: "Mars",
      c: "Jupiter",
      d: "Venus",
      correct: "b"
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      a: "Shakespeare",
      b: "Charles Dickens",
      c: "Mark Twain",
      d: "Jane Austen",
      correct: "a"
    },
    {
      question: "How many continents are there?",
      a: "5",
      b: "6",
      c: "7",
      d: "8",
      correct: "c"
    },
    {
      question: "What is the capital of France?",
      a: "Paris",
      b: "Berlin",
      c: "London",
      d: "Madrid",
      correct: "a"
    }
  ],
  tech: [
    {
      question: "HTML is used to?",
      a: "Design logic",
      b: "Create structure of web pages",
      c: "Style web pages",
      d: "Store data",
      correct: "b"
    },
    {
      question: "Which one is a programming language?",
      a: "Python",
      b: "HTML",
      c: "CSS",
      d: "Photoshop",
      correct: "a"
    },
    {
      question: "What does CPU stand for?",
      a: "Central Processing Unit",
      b: "Control Panel Unit",
      c: "Central Panel Unit",
      d: "Computer Power Unit",
      correct: "a"
    },
    {
      question: "Which tag is used for paragraph in HTML?",
      a: "<div>",
      b: "<span>",
      c: "<p>",
      d: "<para>",
      correct: "c"
    }
  ]
};

let currentQuiz = 0;
let score = 0;
let selectedCategory = "general";
let timer;
let timeLeft = 15;
let quizQuestions = [];

const startBtn = document.getElementById("start-btn");
const categorySelect = document.getElementById("category");
const questionContainer = document.getElementById("question-container");
const questionEl = document.getElementById("question");
const answerBtns = document.querySelectorAll(".answer-btn");
const resultEl = document.getElementById("result");
const nextBtn = document.getElementById("next-btn");
const timeEl = document.getElementById("time");
const questionCount = document.getElementById("question-count");

startBtn.addEventListener("click", () => {
  selectedCategory = categorySelect.value;
  quizQuestions = quizData[selectedCategory];
  currentQuiz = 0;
  score = 0;
  document.getElementById("category-container").classList.add("hidden");
  questionContainer.classList.remove("hidden");
  loadQuiz();
});

function startTimer() {
  timeLeft = 15;
  timeEl.textContent = timeLeft;
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      disableAnswers();
      showCorrect();
      resultEl.textContent = "⏰ Time's up!";
      resultEl.classList.remove("hidden");
    }
  }, 1000);
}

function loadQuiz() {
  resetState();
  startTimer();
  const current = quizQuestions[currentQuiz];
  questionCount.textContent = `Question ${currentQuiz + 1} of ${quizQuestions.length}`;
  questionEl.textContent = current.question;
  document.getElementById("a_text").textContent = current.a;
  document.getElementById("b_text").textContent = current.b;
  document.getElementById("c_text").textContent = current.c;
  document.getElementById("d_text").textContent = current.d;
}

function resetState() {
  resultEl.classList.add("hidden");
  answerBtns.forEach(btn => {
    btn.disabled = false;
    btn.style.backgroundColor = "#ececec";
  });
}

answerBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    clearInterval(timer);
    const selected = btn.getAttribute("data-answer");
    const correct = quizQuestions[currentQuiz].correct;
    if (selected === correct) {
      score++;
      btn.style.backgroundColor = "#b2f2bb";
      resultEl.textContent = "✅ Correct!";
    } else {
      btn.style.backgroundColor = "#ffa8a8";
      showCorrect();
      resultEl.textContent = `❌ Incorrect! Correct answer: ${quizQuestions[currentQuiz][correct]}`;
    }
    resultEl.classList.remove("hidden");
    disableAnswers();
  });
});

function showCorrect() {
  const correct = quizQuestions[currentQuiz].correct;
  document.querySelector(`[data-answer="${correct}"]`).style.backgroundColor = "#b2f2bb";
}

function disableAnswers() {
  answerBtns.forEach(btn => btn.disabled = true);
}

nextBtn.addEventListener("click", () => {
  currentQuiz++;
  if (currentQuiz < quizQuestions.length) {
    loadQuiz();
  } else {
    showFinal();
  }
});

function showFinal() {
  clearInterval(timer);
  let feedback = "";
  const percent = (score / quizQuestions.length) * 100;
  if (percent === 100) {
    feedback = "🌟 Perfect! You're a genius!";
  } else if (percent >= 75) {
    feedback = "👏 Great job! You know your stuff.";
  } else if (percent >= 50) {
    feedback = "🙂 Not bad! A little more practice and you'll ace it.";
  } else {
    feedback = "😕 Keep trying! Learning is a journey.";
  }

  document.getElementById("quiz").innerHTML = `
    <h2>✅ You got ${score}/${quizQuestions.length} correct</h2>
    <p>${feedback}</p>
    <button onclick="location.reload()">Play Again 🔁</button>
  `;
}

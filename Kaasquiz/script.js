var vragen = [
  {
    vraag: "Welke kleur heeft brie aan de binnenkant?",
    antwoorden: [
      { text: "Wit", correct: true },
      { text: "Oranje", correct: false },
      { text: "Geel", correct: false },
      { text: "Rood", correct: false },
    ],
    punten: 1,
  },
  {
    vraag: "Uit welk land komt cheddar oorspronkelijk? ",
    antwoorden: [
      { text: "Nederland", correct: false },
      { text: "Engeland", correct: true },
      { text: "Duitsland", correct: false },
      { text: "Frankrijk", correct: false },
    ],
    punten: 2,
  },
  {
    vraag: "Welke kleur heeft de korst van Port Salut?",
    antwoorden: [
      { text: "Bruin", correct: false },
      { text: "Rood", correct: true },
      { text: "Wit", correct: false },
      { text: "Oranje", correct: true },
    ],
    punten: 2,
  },
  {
    vraag:
      "Mozzarella wordt traditioneel gemaakt van melk die niet van een koe komt. Van welk dier komt deze melk wel?",
    antwoorden: [
      { text: "Buffel", correct: true },
      { text: "Schaap", correct: false },
      { text: "Geit", correct: false },
      { text: "Kat", correct: false },
    ],
    punten: 2,
  },
  {
    vraag: "Uit welk land komt gorgonzola?",
    antwoorden: [
      { text: "Afrika", correct: false },
      { text: "Japan", correct: false },
      { text: "Italië", correct: true },
      { text: "Amerika", correct: false },
    ],
    punten: 2,
  },
  {
    vraag: "Uit welk land komt feta? ",
    antwoorden: [
      { text: "Griekenland", correct: true },
      { text: "Finland", correct: false },
      { text: "Zweden", correct: false },
      { text: "Nederland", correct: false },
    ],
    punten: 2,
  },
  {
    vraag: "Wat is de bekendste kaasstad van Nederland?",
    antwoorden: [
      { text: "Rotterdam", correct: false },
      { text: "Lelystad", correct: false },
      { text: "Amsterdam", correct: false },
      { text: "Gouda", correct: true },
    ],
    punten: 1,
  },
  {
    vraag:
      "Bij het maken van kaas ontstaat ook wei als bijproduct. Welke Nederlandse frisdrank wordt gemaakt van wei?",
    antwoorden: [
      { text: "Rivella", correct: true },
      { text: "Fanta", correct: false },
      { text: "Coca-Cola", correct: false },
      { text: "Pepsi", correct: false },
    ],
    punten: 1,
  },
  {
    vraag: "Hoe noemen we kaas die 16 tot 18 weken heeft gerijpt?",
    antwoorden: [
      { text: "Belegen", correct: true },
      { text: "Oud-Kaas", correct: false },
      { text: "Smeerkaas", correct: false },
      { text: "Worst", correct: false },
    ],
    punten: 3,
  },
  {
    vraag: "Wat zorgt voor de blauwe kleur in gorgonzola?",
    antwoorden: [
      { text: "Parasieten", correct: false },
      { text: "Bacteriën", correct: false },
      { text: "Schimmel", correct: true },
      { text: "Cryptosporidium", correct: false },
    ],
    punten: 1,
  },
];

const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-btn-group");
const confirmButton = document.getElementById("confirm-btn");
const scoreText = document.getElementById("score-text");
const quizcard = document.getElementById("quizcard");

confirmButton.addEventListener("click", nextQuestion);
vragen.sort(() => Math.random() - 0.5);


var currentIndex = 0;
var score = 0;
var maxScore = 0;
var allowClick = true;


function startQuiz() {
  currentIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  let currentQuestion = vragen[currentIndex];
  let questionNumber = currentIndex + 1;
  questionText.innerHTML = questionNumber + ". " + currentQuestion.vraag;
  currentQuestion.antwoorden.sort(() => Math.random() - 0.5);
  currentQuestion.antwoorden.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("answer-btn");
    button.setAttribute("correct", answer.correct);
    button.setAttribute("punten", vragen[currentIndex].punten);
    button.addEventListener("click", confirmQuestion);
    answerButtons.appendChild(button);
    hideNextButton();
  });
  
}

function showNextButton() {
  confirmButton.style.visibility = "visible";
}

function hideNextButton() {
  confirmButton.style.visibility = "hidden";
}

function clearAnswers() {
  answerButtons.innerHTML = "";
}

function showFinalResult() {
  questionText.innerHTML = "Gefeliciteerd, je hebt de quiz gehaald!";
  scoreText.style.display = "none";
  const resulttext = document.createElement("h3");
  resulttext.classList.add("result-text");
  resulttext.innerHTML = "Je eind score is: " + score.toString() + "/17";
  quizcard.appendChild(resulttext);
}

function updateScoreText() {
  scoreText.innerHTML = "Score: " + score.toString();
}

function addScore(value) {
  score = score + parseInt(value);
}

function showPointsUpdate(value) {
  scoreText.innerHTML = "Score: " + score.toString() + " (+" + value + ")";
}

function nextQuestion() {
  if (currentIndex > 8) {
    hideNextButton();
    updateScoreText();
    clearAnswers();
    showFinalResult();
  }
  else {
    currentIndex = currentIndex + 1;
    updateScoreText();
    clearAnswers();
    showQuestion();
    allowClick = true;
  }
}

function confirmQuestion() {
    
    if(event.srcElement.getAttribute("correct") === "true")
    {
      if (allowClick) {
      let punten = event.srcElement.getAttribute("punten");
      addScore(punten);
      event.srcElement.style.background="#b3ffb6";
      showNextButton();
      showPointsUpdate(punten);
      allowClick = false;
      }
    }
    else
    {
      if (allowClick) {
      event.srcElement.style.background="#ffa69e";
      showNextButton();
      allowClick = false;
      }
    }
    
    
}

startQuiz();

// for (let i = 0; i < vragen.length; i++) {
//     var input = prompt(vragen[i].vraag);

//     if (input.toLowerCase() === vragen[i].antwoord) {
//         score = score + vragen[i].punten;
//         alert("Je vraag is correct! \nScore: " + score + " (+" + vragen[i].punten + ")");
//     }
//     else {
//         alert("Je hebt het fout! De goede antwoord was: " + vragen[i].antwoord + ". \nScore: " + score + "");
//     }
// }

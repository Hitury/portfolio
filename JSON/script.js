let currentQuestion = 0;
let currentIndex = 0;
let score = 0;
let quizActive = false;

const input = document.getElementById("input-box");
const container = document.getElementById("quiz-container");
const output = document.getElementById("output");
const nextbtn = document.getElementById("next-button");
const answers = document.getElementById("answers");
const resultsdiv = document.getElementById("results");
const quiztitle = document.getElementById("quiz-title");
const questiontext = document.getElementById("question-text");
const filebox = document.getElementById("file-btn")

answers.style.display = 'none';

document.getElementById("file-box").addEventListener("change", function (event) {
          const file = event.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
              try {
                const data = JSON.parse(e.target.result);
                input.value = JSON.stringify(data);
                startQuiz();
              } catch (error) {
                console.error("Error parsing JSON:", error);
              }
            };

            reader.readAsText(file);
            
        }
});

nextbtn.addEventListener("click", function(e) {
    startQuiz();
});

function loadJSON() {
    const data = JSON.parse(input.value);
    quiztitle.textContent = data.quizTitle;
}

function resetScore() {
    score = 0;
    currentQuestion = 0;
    currentIndex = -1;
}

function getCorrectAnswer() {
    let inputs = document.getElementsByTagName("input");
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].checked)
            return inputs[i].value;
        }
}


function showQuestion() {
    const data = JSON.parse(input.value);
    console.log(data.questions.length);
    currentIndex = currentIndex + 1;
    currentQuestion = currentQuestion + 1;
    questiontext.textContent = currentQuestion + ". " + data.questions[currentIndex].question;
    for(let i = 0; i < 4; i++) {
        let radiobutton = document.createElement("input");
        let label = document.createElement("label");
        let correctAnswer = data.questions[currentIndex].correctAnswer;
        radiobutton.type = "radio";
        radiobutton.name = "answer";
        radiobutton.className = "answer-btn";
        if (i === correctAnswer) {
            radiobutton.value = "true";
            
        }
        else {
            radiobutton.value = "false";
        }
        label.name = "answerlabel";
        label.className = "answer-label";
        label.textContent = data.questions[currentIndex].options[i];
        answers.appendChild(radiobutton);
        answers.appendChild(label);
        
    }
}

function finishQuiz() {
    const data = JSON.parse(input.value);
    let maxscore = data.questions.length;
    answers.style.display = 'none';
    nextbtn.style.display = 'none';
    questiontext.textContent = "Final score: " + score + "/" + maxscore;
}

function startQuiz () {
    
    if (!quizActive) {
        quizActive = true;
        filebox.style.display = 'none';
        answers.style.display = 'flex';
        input.style.display = 'none';
        loadJSON();
        resetScore();
        input.style.visibility = 'hidden';
        nextbtn.textContent = 'Confirm';
        showQuestion();
    }
    else {
        const data = JSON.parse(input.value);
        let tempindex = currentIndex + 1;
        if(tempindex >= data.questions.length) {
            if(document.querySelector('input[name="answer"]:checked').value == "true") {
                score = score + 1;
                answers.innerHTML = '';
                finishQuiz();
            }
            else {
                answers.innerHTML = '';
                finishQuiz();
            }
        }
        else {
            
            const data = JSON.parse(input.value);
            if(document.querySelector('input[name="answer"]:checked').value == "true") {
            score = score + 1;
            answers.innerHTML = '';
            showQuestion();
            
            }
            else {
            answers.innerHTML = '';
            showQuestion();
            }
            
        }
    }
}


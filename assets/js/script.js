/**
 *  Elements of DOM
 */
const question = document.getElementById("question");
const fiftyFifty = document.getElementById("fifty-fifty");
const extraTime = document.getElementById("extra-time");
const submitButton = document.getElementById("submit-btn");
const nextButton = document.getElementById("next-btn");
const playerName = document.getElementById("name");
const score = document.getElementById("score");
const answerButtons = document.getElementById("answer-buttons");
const newGame = document.getElementById("new-game");

document.addEventListener("DOMContentLoaded", function() {
 nextQuestion();
 nextButton.addEventListener("click", function() {
    nextQuestion();
 })
 newGame.addEventListener("click", function() {
  location.reload();
 })
  submitButton.addEventListener("click", function() {
    checkAnswer();
  });
  //playerName.textContent= prompt("Enter your name", "Player");
});

function nextQuestion() {
  let currentQuestion = question.getAttribute("data-indexQuestion");
  if (currentQuestion === "") {
    currentQuestion = 0; 
  } else if(currentQuestion < questions.length - 1) {
    currentQuestion++;
  } else {
    endGame();
    return;
  }

    const questionData = questions[currentQuestion];
    question.textContent = questionData["question"];
    question.setAttribute("data-indexQuestion", currentQuestion);

    let variants = "";
    let options = questionData["options"];
    for (let option of options) {
        variants += `<button class="answer-btn">${option}</button>`;
    }
    answerButtons.innerHTML = variants;
    nextButton.classList.add("hidden");
    submitButton.classList.remove("hidden");
    clickedAnswer();
};



function checkAnswer(){
    if (document.getElementsByClassName("selected").length === 0) {
        return;
    } 
    let currentQuestion = question.getAttribute("data-indexQuestion");
    const rightAnswer = questions[currentQuestion]["answer"];

    let selectedAnswer = null;
    const answers = document.getElementsByClassName("answer-btn");
    for (const answer of answers) {
       if (answer.classList.contains("selected")) {
        selectedAnswer = answer;
       } else {
        answer.setAttribute("disabled", true);
        if (answer.innerHTML === rightAnswer) {
            answer.classList.add("correct-answer");
        }
       }
    }

    if(rightAnswer === selectedAnswer.innerHTML) {
        selectedAnswer.classList.remove("selected");
        selectedAnswer.classList.add("correct-answer");
        nextButton.classList.remove("hidden");
        submitButton.classList.add("hidden");
        incrementScore();

    } else {
        selectedAnswer.classList.remove("selected");
        selectedAnswer.classList.add("wrong-answer");
        nextButton.classList.remove("hidden");
        submitButton.classList.add("hidden");
    }
};

function clickedAnswer() {
    const answers = document.getElementsByClassName("answer-btn");
    for (const answer of answers) {
        answer.addEventListener("click", function() {
            for (const selected of answers) {
                selected.classList.remove("selected");
            }
            this.classList.add("selected");
        })
    }
};

function endGame() {
  question.textContent = `Congratulation!`;
  fiftyFifty.remove();
  extraTime.remove();
  answerButtons.remove();
  submitButton.remove();
  nextButton.remove();
  newGame.classList.remove("hidden");
}

function incrementScore() {
  score.textContent = parseInt(score.innerText) + 1;
}


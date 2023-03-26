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
const inputName = document.getElementById("input-name");
const startGame = document.getElementById("submit-name");
const timer = document.getElementById("timer");
const feedbackContent = document.getElementById("feedback-content");

document.addEventListener("DOMContentLoaded", function() {
  startGame.addEventListener("click", function() {
    playerName.textContent = inputName.value;
    document.getElementById("player-name").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");
    timerFunction();
  });

  inputName.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        startGame.click();
    }
  });

  fiftyFifty.addEventListener("click", function() {
    fiftyFifty.setAttribute("disabled", true);
    fiftyFiftyFunction();
  });

  extraTime.addEventListener("click", function() {
    extraTime.setAttribute("disabled", true);
    extraTimeFunction();
  })

  shuffleQuestions();
  nextQuestion();
 nextButton.addEventListener("click", function() {
    nextQuestion();
 });

 newGame.addEventListener("click", function() {
  location.reload();
 });
 
submitButton.addEventListener("click", function() {
    checkAnswer();
  });

document.getElementById("feedback-submit").addEventListener("click", function() {
  console.log(document.getElementById("feedback-area").value);
  feedbackContent.innerHTML = `<h3>Thank you for your feedback!</h3>`;
})
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
    question.textContent = questionData.question;
    question.setAttribute("data-indexQuestion", currentQuestion);

    let variants = "";
    let options = questionData.options;
    for (let option of options) {
        variants += `<button class="answer-btn">${option}</button>`;
    }

    answerButtons.innerHTML = variants;
    
    nextButton.classList.add("hidden");
    submitButton.classList.remove("hidden");
    clickedAnswer();
}

function checkAnswer(){
    if (document.getElementsByClassName("selected").length === 0) {
        return;
    }

    let currentQuestion = question.getAttribute("data-indexQuestion");
    const rightAnswer = questions[currentQuestion].answer;

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
}

function clickedAnswer() {
    const answers = document.getElementsByClassName("answer-btn");
    for (const answer of answers) {
        answer.addEventListener("click", function() {
            for (const selected of answers) {
                selected.classList.remove("selected");
            }
            this.classList.add("selected");
        });
        answer.addEventListener("keydown", function() {
          if (submitButton.classList.contains("hidden") === false) {
            submitButton.click();
          } else {
            nextButton.click();
          }
        });
    }
}

function endGame() {
  question.textContent = `Congratulation!`;
  fiftyFifty.remove();
  extraTime.remove();
  answerButtons.remove();
  submitButton.remove();
  nextButton.remove();
  newGame.classList.remove("hidden");
  feedbackContent.classList.remove("hidden");
  score.textContent = `You answered correctly to ${score.innerText} out of ${questions.length} questions!`;
}

function incrementScore() {
  score.textContent = parseInt(score.innerText) + 1;
}

function shuffleQuestions() {
  shuffleArray(questions);
  for (const elem of questions) {
    shuffleArray(elem.options);
  }
}

function shuffleArray(array) {
  const arrayLength = array.length;

  for (let i = 0; i < arrayLength; i++) {

    const randomIndex = Math.floor(Math.random() * arrayLength);

    const temp = array[i];
    array[i] = array[randomIndex];
    array[randomIndex] = temp;
  }

}

function fiftyFiftyFunction() {
  const questionIndex = question.getAttribute("data-indexQuestion");
  const questionData = questions[questionIndex];
  let wrongAnswers=[];
  for (const answer of questionData.options) {
    if (answer !== questionData.answer) {
      wrongAnswers.push(answer);
    }
  }

  shuffleArray(wrongAnswers);
  wrongAnswers.pop();

  const answerBtns = document.getElementsByClassName("answer-btn");
  for (const button of answerBtns) {
    if (wrongAnswers.includes(button.innerText)) {
      button.setAttribute("disabled", true);
      console.log(wrongAnswers);
    }
  }
}

let time = 900;
function timerFunction() {
  const x = setInterval(function() {
    time--;
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timer.textContent = minutes + ":" + seconds;
    if(time <= 0) {
      clearInterval(x);
      endGame();
      question.textContent = `Time expired!`;
    }
  }, 1000);
}

function extraTimeFunction() {
  time += 120;
}
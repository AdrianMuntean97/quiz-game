/**
 *  Elements of DOM
 */
const question = document.getElementById("question");
const fiftyFifty = document.getElementById("fifty-fifty");
const extraTime = document.getElementById("extra-time");
const submitButton = document.getElementById("submit-btn");
const nextButton = document.getElementById("next-btn");
const name = document.getElementById("name");
const score = document.getElementById("score");
const answerButtons = document.getElementById("answer-buttons");

document.addEventListener("DOMContentLoaded", function() {
 nextQuestion();
 nextButton.addEventListener("click", function() {
    nextQuestion();
 })
});

function nextQuestion() {
  let currentQuestion = question.getAttribute("data-indexQuestion");
  if (currentQuestion === "") {
    currentQuestion = 0; 
  } else {
    currentQuestion++;
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
};



function confirmAnswer(){

};

/**
 *  Elements of DOM
 */
const question = document.getElementById("question");
const fiftyFifty = document.getElementById("fifty-fifty");
const extraTime = document.getElementById("extra-time");
const answerButtons = document.getElementsByClassName("answer-btn");
const submitButton = document.getElementById("submit-btn");
const nextButton = document.getElementById("next-btn");
const name = document.getElementById("name");
const score = document.getElementById("score");


document.addEventListener("DOMContentLoaded", function() {

});

function nextQuestion() {
  let currentQuestion = question.getAttribute(data-indexQuestion);
  if (currentQuestion === "") {
    currentQuestion = 0; 
  } else {
    currentQuestion++;
  }
};

function confirmAnswer(){

};
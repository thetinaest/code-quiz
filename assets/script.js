// global vars
var startBtn = document.querySelector("#start-quiz");
var startTime = 5;
var time = startTime;
var timer = document.querySelector('#count-down');
var questionCounter = 0;
var questionDisplay = document.querySelector('#question');
var answersBox = document.querySelector('#answers');
var introP = document.querySelector('#intro');
var answerCheck = document.querySelector('#answerCheck');
var allQuestions = [
  {
      question: "What's up?",
      A: "nm",
      B: "sup",
      C: "I try my best",
      correct: "nm"
  },
  {
      question: "How r u",
      A: "good",
      B: "bad",
      C: "great",
      correct: "great"
  }
];

//functions

var startGame = function() {
  time = startTime;
  startCountdown();
  startBtn.remove();
  reset();
  createQuestions(questionCounter);
};

var createQuestions = function() {
  questionDisplay.innerText = allQuestions[questionCounter].question;
  var buttonA = document.createElement("button");
  var buttonB = document.createElement("button");
  var buttonC = document.createElement("button");
  buttonA.innerText = allQuestions[questionCounter].A;
  buttonB.innerText = allQuestions[questionCounter].B;
  buttonC.innerText = allQuestions[questionCounter].C;
  var A = answersBox.appendChild(buttonA);
  var B = answersBox.appendChild(buttonB);
  var C = answersBox.appendChild(buttonC);
  A.setAttribute("id", "A");
  B.setAttribute("id", "B");
  C.setAttribute("id", "C");
  document.querySelector("#A").addEventListener("click", checkanswer)
  document.querySelector("#B").addEventListener("click", checkanswer)
  document.querySelector("#C").addEventListener("click", checkanswer)
}

function startCountdown() {  
  interval = setInterval(() => {
      timer.innerHTML = ("Time: " + time);
    time--;
    if (time < 0) {
      time = 0;
      endQuiz();
      return;
    }
  }, 1000);
};

var checkanswer = function(event) {
  if (event.target.innerText === allQuestions[questionCounter].correct) {
    answerCheck.innerText = "Correct!"
  } else {
    time-=10;
    answerCheck.innerText = "Incorrect! -10 seconds."
  }
  if (time < 0) {
    time = 0;
    endQuiz();
    return;
  }

  questionCounter++;
  console.log(questionCounter);
  reset();
  if (questionCounter >= allQuestions.length) {
    console.log("why");
    console.log(allQuestions.length);
    endQuiz();
    return;
  } else {
    createQuestions();
  }

}

var reset = function() {
  questionDisplay.innerText = "";
  var child = answersBox.lastElementChild; 
  while (child) {
      answersBox.removeChild(child);
      child = answersBox.lastElementChild;
  };
}

var endQuiz = function() {
  clearInterval(interval);
  reset();
  questionDisplay.innerText = "Quiz complete!"
  answersBox.innerText = "Quiz over!";
  var endingNote = document.createElement("p");
  endingNote.innerText = "Your score is " + time + "! Please enter your initials to save your highscore!";
  answersBox.appendChild(endingNote);

  var saveInitials = document.createElement("input");
  saveInitials.setAttribute("type", "text");
  answersBox.appendChild(saveInitials);
  saveInitials.setAttribute("name", "initials");

  var endSubmit = document.createElement("button");
  endSubmit.innerText = "Submit";
  endSubmit.setAttribute("type", "submit");
  answersBox.appendChild(endSubmit);
  endSubmit.addEventListener("click", submitScore);
  // let them save high scores
  // ask if they want to play again
  //   if yes restart
  //   if no, nothing
}

var submitScore = function(event) {
  event.preventDefault();
  var initials = document.querySelector("input[name='initials']").value;
  console.log(initials);
  if (!initials) {
    alert("You must enter your initials to save your score. Please try again.");
    return;
  }
  
  var testScores = localStorage.getItem("testHS");
  if (!testScores) {
    localStorage.setItem("testHS", JSON.stringify([{initials:initials, score:time}]));
    location.assign("highscores.html");
    return;
  }
  // testScores

  // //   if (!highScores) {
  //     localStorage.setItem("QuizhighScores", JSON.stringify([{initials:initials, score:time}]));
  // //     location.assign("highscores.html");
  // //     return;
  // //   }
  // // var highScores = localstorage.getItem("highScores");
  //   highScores = JSON.parse(highScores);
  //   highScores.push({initials: initials, score:time});
  //   localStorage.setItem("highScores", JSON.stringify(highScores));
  //   location.assign("highscores.html");
}


// var restart = function() {
//   location.reload();
// }


//event listeners
startBtn.addEventListener("click", startGame);
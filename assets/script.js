// global vars
var startBtn = document.querySelector("#start-quiz");
var startTime = 60;
var time = startTime;
var timer = document.querySelector('#count-down');
var questionCounter = 0;
var questionDisplay = document.querySelector('#question');
var answersBox = document.querySelector('#answers');
var introP = document.querySelector('#intro');
var answerCheck = document.querySelector('#answerCheck');
var allQuestions = [
  {
      question: "What does HTML stand for?",
      A: "Hyper Text Markup Language",
      B: "Hyperlinks and Text Markup Language",
      C: "Home Tool Markup Language",
      correct: "Hyper Text Markup Language"
  },
  {
      question: "How do you create a function in JavaScript?",
      A: "function:myFunction()",
      B: "function myFunction()",
      C: "function = myFunction()",
      correct: "function myFunction()"
  },
  {
    question: "What does CSS stand for?",
    A: "Cascading Style Sheets",
    B: "Computer Style Sheets",
    C: "Creative Style Sheets",
    correct: "Cascading Style Sheets"
},
{
  question: "Which jQuery method is used to set one or more style properties for selected elements?",
  A: "css()",
  B: "style()",
  C: "html()",
  correct: "css()"
},
{
  question: "What is Git?",
  A: "A programming language.",
  B: "A nickname for GitHub.",
  C: "A version control system.",
  correct: "A version control system."
},
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
}

var submitScore = function(event) {
  event.preventDefault();
  var initials = document.querySelector("input[name='initials']").value;
  console.log(initials);
  if (!initials) {
    alert("You must enter your initials to save your score. Please try again.");
    return;
  }
  
  var quizHighScores = localStorage.getItem("codeQuizHighScores");
  if (!quizHighScores) {
    localStorage.setItem("codeQuizHighScores", JSON.stringify([{initials:initials, score:time}]));
    location.assign("highscores.html");
    return;
  }
    quizHighScores = JSON.parse(quizHighScores);
    quizHighScores.push({initials: initials, score:time});
    localStorage.setItem("quizHighScores", JSON.stringify(quizHighScores));
    location.assign("highscores.html");

}


// var restart = function() {
//   location.reload();
// }


//event listeners
startBtn.addEventListener("click", startGame);
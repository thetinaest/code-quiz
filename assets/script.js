// global vars
var startBtn = document.querySelector("#start-quiz");
var startTime = 5;
//don't forget to set time back to 75 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
var time = startTime;
var timer = document.querySelector('#count-down');
var questionCounter = 0;
var questionDisplay = document.querySelector('#question');
var answersBox = document.querySelector('#answers');
var introP = document.querySelector('#intro');
var allQuestions = [
  {
      question: "What's up?",
      A: "nm",
      B: "sup",
      C: "I try my best",
      correct1: "nm"
  },
  {
      question: "How r u",
      A: "good",
      B: "bad",
      C: "great",
      correct2: "great"
  }
];

//functions
var restart = function() {
  location.reload();
}

function startCountdown() {  
  interval = setInterval(() => {
      timer.innerHTML = ("Time: " + time);
    time--;
    if (time < 0 ) {
      clearInterval(interval)
      timer.innerHTML = "Time: 0";
      // alert('Quiz Over')
    }
  }, 1000);
};


var startGame = function() {
  time = startTime;
  startCountdown();
  startBtn.remove();
  introP.remove();
  createQuestions(questionCounter);


};

var checkanswer = function() {
  console.log("Hell yeah!");
  // questionCounter = questionCounter + 1;
  questionCounter++;
  console.log(questionCounter);

}

// console.log(questionCounter)
var createQuestions = function(questionCounter) {
  console.log(questionCounter);
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
  questionDisplay.innerText = allQuestions[questionCounter].question;


  document.querySelector("#A").addEventListener("click", checkanswer)
}

//event listener
startBtn.addEventListener("click", startGame);
// global vars
var startBtn = document.querySelector("#start-quiz");
var startTime = 5;
var time = startTime;
var timer = document.querySelector('#count-down');
var allQuestions = [
    {
        question: "What's up?",
        A: "nm",
        B: "sup",
        C: "I try my best"
    },
    {
        question: "How r u",
        A: "good",
        B: "bad",
        C: "great"
    }
];

console.log(timer);
//functions
function startCountdown() {  
    console.log(timer);
    interval = setInterval(() => {
        timer.innerHTML = ("Time: " + time);
        console.log(time);
      time--;
      if (time < 0 ) {
        clearInterval(interval)
        timer.innerHTML = "Time: 0";
        alert('Quiz Over')
      }
    }, 1000);

  };



// var questions = function() {
//     console.log("hi");
//     createQuestions();
// };

var createQuestions = function() {
    time = startTime;
    startCountdown();
    for (var i=0; i<allQuestions.length; i++) {
        console.log(allQuestions[i]);
    }

};

//event listener
startBtn.addEventListener("click", createQuestions);
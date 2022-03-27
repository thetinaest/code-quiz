//highscores page js
var highScoresList = localStorage.getItem("codeQuizHighScores");
var highScoresBox = document.getElementById("high-score-display");

function displayScores() {
    highScoresList = JSON.parse(highScoresList);
    if (!highScoresList) {
        var scoreDisplay = document.createElement("p");
        scoreDisplay.innerText = "No high scores yet!";
        highScoresBox.appendChild(scoreDisplay);
    }
    for (var i=0; i <highScoresList.length; i++){
        var scoreDisplay = document.createElement("p");
        count = i +1;
        scoreDisplay.innerText = count + ". " + highScoresList[i].initials + "  - Score: " + highScoresList[i].score;
        highScoresBox.appendChild(scoreDisplay);
    }
};

displayScores();

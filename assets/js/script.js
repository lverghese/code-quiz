
var questions = [
    {
        quetitle: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
 
    {
        quetitle: "The condition in an if / else statement is enclosed with _____.",
        choices: ["quotes", "curly brackets", "parantheses", "square brackets"],
        answer: "parantheses"
    },
 
    {
        quetitle: "Arrays in javascript can be used to score:",
        choices: ["numbers and things", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        quetitle: "String values must be enclosed within _____ when being assigned to variables",
        choices: ["commas", "curly brackets", "quotes", "parantheses"],
        answer: "parantheses"
    }
 
];
 
 
var totalScore = 0;
var timeClock = 75;
var scoreClock = document.getElementById("scoreClock");
var startBtn = document.querySelector("#quizStart");
var questionTitle = document.getElementById("questions");
var introBox = document.getElementById("intro");
var finalScreen = document.getElementById("finalScreen");
var btn0 = document.getElementById("btn0");
var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");
var btn3 = document.getElementById("btn3");
var questionWrapper = document.getElementById("question-wrapper");
var submitNameBtn = document.getElementById("submitName");
var highScoreBtn = document.getElementById("viewHigh");
var scorePanel = document.getElementById("scorePanel");
var scorePanelContent = document.getElementById("scorePanelContent");
var answerMessage = document.getElementById("answerMessage");
var finalScore = document.getElementById("finalScore");
var resetBtn = document.getElementById("resetBtn");
var clearScoresBtn = document.getElementById("clearScoresBtn");
var scoreContainer = document.getElementById("scoreTableContainer");
var currentQuestion = 0;
var runOnce = 0;
 
//starts the time and subtracts 1 from total score every second
 
var doTimer = null;
 
 
var startClock = function() {
    timeClock--;
    scoreClock.innerHTML = timeClock - totalScore;
    if(timeClock - totalScore <= 0){
        endGame();
    }
};
 
//first function starts the questions and the scoreClock
startBtn.addEventListener("click", function() {
    introBox.style.display = "none";
    questionWrapper.style.display = "block";
    btn0.classList.remove("hiddenButton");
    btn1.classList.remove("hiddenButton");
    btn2.classList.remove("hiddenButton");
    btn3.classList.remove("hiddenButton");
    nextQuestion();
    startClock();
    doTimer = setInterval(startClock, 1000);
 
});
 
//runs whenever an answer button is clicked
var checkAnswer = function(currentAnswer) {
    var whatQuestion = questions[currentQuestion];
    var whatAnswer = whatQuestion.answer;
    if (currentAnswer === whatAnswer){
        //this is a correct answer
        currentQuestion++;
        nextQuestion();
        answerMessage.innerHTML = "Correct!";
    } else {
        // this is an incorrect answer
        currentQuestion++;
        answerMessage.innerHTML = "Wrong!";
        totalScore += 15;
        nextQuestion();
    }
};
 
 
//advances to the next question
var nextQuestion = function() {
    if (currentQuestion < questions.length){
        var questionTitle = document.getElementById("questions");
        if( runOnce === 0 ) {
            btn0.addEventListener("click", function() {
                checkAnswer(questions[currentQuestion].choices[0]);
            });
        
            btn1.addEventListener("click", function() {
                checkAnswer(questions[currentQuestion].choices[1]);
            });
        
            btn2.addEventListener("click", function() {
                checkAnswer(questions[currentQuestion].choices[2]);
            });
        
            btn3.addEventListener("click", function() {
                checkAnswer(questions[currentQuestion].choices[3]);
            }); 
            runOnce = 1;
    
        };
        questionTitle.innerHTML = questions[currentQuestion].quetitle;
        btn0.innerHTML = questions[currentQuestion].choices[0];
        btn1.innerHTML = questions[currentQuestion].choices[1];
        btn2.innerHTML = questions[currentQuestion].choices[2];
        btn3.innerHTML = questions[currentQuestion].choices[3];
    } else {
        endGame();
    };
};
 
//ends the game
var endGame = function(){
    clearInterval(doTimer);
    questionWrapper.style.display = "none";
    finalScreen.style.display = "block";
    scoreClock.innerHTML = timeClock - totalScore;
    finalScore.innerHTML = timeClock - totalScore;
};
 
 
 
 
// -------------------------------- END STUFF ----------------------------------
 
//handles submitName button click event
submitNameBtn.addEventListener("click", function(){
    saveScore();
});
 
 
//saves final score in localStorage
var saveScore = function(){
    var scoreData = {
            highScore: timeClock - totalScore,
            playerName: document.getElementById("playerName").value
        }
    if (localStorage.getItem("highScores") == null){
        var newArray = []
        newArray.push(scoreData)
        localStorage.setItem("highScores", JSON.stringify(newArray));
    } else {
        var currentHighScores = JSON.parse(localStorage.getItem("highScores"))
        currentHighScores.push(scoreData);
        localStorage.setItem("highScores", JSON.stringify(currentHighScores))
    }
    loadHighScores();
 
};
 
//loads high scores
highScoreBtn.addEventListener("click", function(){ 
    loadHighScores()
});
 
var loadHighScores = function(){
    scoreContainer.innerHTML = "";
    var scoreTable = document.createElement("table");
    var scoreTableHead = document.createElement("thead");
    var scoreTableHeadRow = document.createElement("tr");
    var scoreTableHeadColPlayer = document.createElement("th");
    var scoreTableHeadColScore = document.createElement("th");
    scoreTableHeadColPlayer.appendChild(document.createTextNode("Player Name"));
    scoreTableHeadColScore.appendChild(document.createTextNode("High Score"));
    scoreTableHeadRow.appendChild(scoreTableHeadColPlayer);
    scoreTableHeadRow.appendChild(scoreTableHeadColScore);
    scoreTableHead.appendChild(scoreTableHeadRow);
    scoreTable.appendChild(scoreTableHead);
    scoreTable.style.display = "block";
    introBox.style.display = "none";
    questionWrapper.style.display = "none";
    finalScreen.style.display = "none";
    scorePanel.style.display = "block";
    var tableBody = document.createElement("tbody");
    var bodyCreated = false;
    var currentHighScores = JSON.parse(localStorage.getItem("highScores"));
    if (currentHighScores != null ){
        for (i = 0; i < currentHighScores.length; i++){
            var trow = document.createElement("tr");
            var tdPlayer = document.createElement("td");
            tdPlayer.appendChild(document.createTextNode(currentHighScores[i].playerName));
            var tdScore = document.createElement("td");
            tdScore.appendChild(document.createTextNode(currentHighScores[i].highScore));
            trow.appendChild(tdPlayer);
            trow.appendChild(tdScore);
            if (bodyCreated){
                tableBody.appendChild(trow);
            } else {
                tableBody.appendChild(trow);
                scoreTable.appendChild(tableBody);
                bodyCreated = true;
            }
        }
        scoreContainer.appendChild(scoreTable);
        scorePanelContent.innerHTML = "";
    } else {
        scoreTable.style.display = "none";
        scorePanelContent.innerHTML = "There are no scores!";
    };
 
};
 
clearScoresBtn.addEventListener("click", function(){
    clearScores();
});
 
resetBtn.addEventListener("click", function(){
    resetGame();
});
 
//init all variables and restart the game
//TODO:  this needs to be fixed so that the game will run properly when reset; display needs to be set to block
var resetGame = function(){
    currentQuestion = 0;
    scorePanel.style.display = "none";
    totalScore = 0;
    timeClock = 75;
    scoreClock.innerHTML = timeClock
    finalScreen.style.display = "none";
    introBox.style.display = "block";
    answerMessage.innerHTML = "";
    playerName.value = "";
    
}
 
 
 
//clear all scores
var clearScores = function(){
    localStorage.removeItem("highScores");
    scoreContainer.innerHTML = ""
    loadHighScores();
}
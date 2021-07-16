
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


var totalScore = 75;
var timer = document.getElementById("timer");
var startBtn = document.querySelector("#quizStart");
var questionTitle = document.getElementById("questions");
var introBox = document.getElementById("intro");
var finalScreen = document.getElementById("finalScreen")
var btn0 = document.getElementById("btn0");
var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");
var btn3 = document.getElementById("btn3");
var questionWrapper = document.getElementById("question-wrapper");

var startTimer = function() {
    setInterval(function() {
        totalScore -= 1;
        if (totalScore <=0) {
            timer.innerHTML = 0;
        } else {
            timer.innerHTML = totalScore;
        }
    }, 1000);
}



startBtn.addEventListener("click", function() {
    introBox.style.display="none";
    
    btn0.classList.remove("hiddenButton");
    btn1.classList.remove("hiddenButton");
    btn2.classList.remove("hiddenButton");
    btn3.classList.remove("hiddenButton");
    
    nextQuestion(0);
    startTimer();
});



var checkAnswer = function(currentQuestion, currentAnswer) {


    var whatQuestion = questions[currentQuestion];
    var whatAnswer = whatQuestion.answer;
    
    if (currentAnswer === whatAnswer) {
        console.log("right");
        nextQuestion(currentQuestion += 1)
    } else {
        console.log("wrong");
        totalScore = totalScore - 15;
        var scoreChange = document.getElementById("timer"); 
        if (totalScore - 15 <= 0) {
            scoreChange.innerHTML = 0;
            
        } else {
            scoreChange.innerHTML = totalScore;
        }
        if (totalScore <= 0) {
            questionWrapper.style.display="none";
            finalScreen.style.display="block";
        }
        
    }


    

};

var saveScore = function() {
    var playerNameField = document.getElementById("playerName");
    if (localStorage.highscores.length === 0) {
        localStorage.highscores = [
            {
                playerName: playerNameField.text
            }
         ]
    }
}

var nextQuestion = function(currentQuestion) {

    var btn0 = document.getElementById("btn0");
    var btn1 = document.getElementById("btn1");
    var btn2 = document.getElementById("btn2");
    var btn3 = document.getElementById("btn3");

    console.log(currentQuestion);
    
    btn0.removeEventListener("click", function() {});
    btn1.removeEventListener("click", function() {});
    btn2.removeEventListener("click", function() {});
    btn3.removeEventListener("click", function() {});

    
    
    btn0.addEventListener("click", function() {
        checkAnswer(currentQuestion, questions[currentQuestion].choices[0]);
    });
    
    btn1.addEventListener("click", function() {
        checkAnswer(currentQuestion, questions[currentQuestion].choices[1]);
    });
    
    btn2.addEventListener("click", function() {
        checkAnswer(currentQuestion, questions[currentQuestion].choices[2]);
    });
    
    btn3.addEventListener("click", function() {
        checkAnswer(currentQuestion, questions[currentQuestion].choices[3]);
    });

    var questionTitle = document.getElementById("questions");

    questionTitle.innerHTML = questions[currentQuestion].quetitle;

    btn0.innerHTML = questions[currentQuestion].choices[0];
    btn1.innerHTML = questions[currentQuestion].choices[1];
    btn2.innerHTML = questions[currentQuestion].choices[2];
    btn3.innerHTML = questions[currentQuestion].choices[3];
    
};





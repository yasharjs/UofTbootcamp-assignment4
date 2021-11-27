var btnStart = document.querySelector("#btn-start");
var questionText = document.querySelector("#question-title");
var startSection = document.querySelector("#start");
var questionSection = document.querySelector("#questions");
var optionDiv = document.querySelector("#options");
var userScore = document.querySelector("#score");
var endGame = document.querySelector("#results");
var scoreText = document.querySelector("#results-text");
var btnForm = document.querySelector("#results-form");
var feedbackText = document.querySelector("#answer-text");
var scoreList = document.querySelector("#score-list");
var highscoreList = document.querySelector("#highscore-list");
var userInput = document.querySelector("#initials");
var resetEl = document.querySelector("#reset");
var deleteEl = document.querySelector("#delete");
userInput.value = "";

//initialize variables
var finalScore = 0;
var queIndex = 0;
var time =100;
let questionArray;

//get highscore from local storage, if empty then create an array
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

//initialize list of questions
let myQuestions = [
    {
        question: "What does HTML stand for?",
        answers: {
            a: "Hyper Text Preprocessor",
            b:"Hyper Text Markup Language",
            c:"Hyper Text Multiple Language",
            d:"Hyper Tool Multi Language"
        },
        correctAnswer : "b"

    },
    {
        question: "What does CSS stand for?",
        answers: {
           a: "Common Style Sheet",
           b: "Colorful Style Sheet",
           c: "Computer Style Sheet",
           d: "Cascading Style Sheet"
        },
        correctAnswer : "d"

    },
    {
        question: "Which one of these is a JavaScript package manager?",
        answers: {
          a: "Node.js",
          b: "TypeScript",
          c: "npm",
          d:"API"
        },
        correctAnswer: "c"
    },
    {
        question: "Who invented JavaScript?",
        answers: {
          a: "Douglas Crockford",
          b: "Sheryl Sandberg",
          c: "Brendan Eich",
          d: "Albert Einstein"
        },
        correctAnswer: "c"
      },
      {
      question: "Which tool can you use to ensure code quality?",
      answers: {
        a: "Angular",
        b: "jQuery",
        c: "RequireJS",
        d: "ESLint"
      },
      correctAnswer: "d"
    }
    
]

var start = function(){
    //randomize the order of the questions
    questionArray =  myQuestions.sort(() => Math.random() - .5);

    //start timer
    var myTimer = setInterval(function(){
        userScore.textContent = time;
        time--;
        if(time <= 0){
            clearInterval(myTimer);
            userScore.textContent = "";

            //hide quesstion section and display results section
            questionSection.setAttribute("style","display:none");
            endGame.setAttribute("style","display: flex");

            //time has ended before completion of quiz
            if(queIndex < myQuestions.length){
                userScore.textContent = "0";
            }
        }
    },1000);

    //hide start section and display questions section
    startSection.setAttribute("style","display:none");
    questionSection.setAttribute("style","display: flex");
    
    //create question
    createQue();
}

var createQue = function(){
    //reset option div for new set of questions
    optionDiv.innerHTML = "";

    //set h2 content to current question
    questionText.textContent = myQuestions[queIndex].question;
  
    var i = 1;
    //create answer buttons by looping through the answers array
    for (letter in myQuestions[queIndex].answers){
        
        var btnEl = document.createElement("button");
        btnEl.className = "btn btn-option";
        btnEl.dataset.value = letter;
        btnEl.textContent = i +". "+ myQuestions[queIndex].answers[letter];
        optionDiv.appendChild(btnEl);
        i++;
    }    
}
var checkAnswer = function(event){
    var targetId = event.target.getAttribute("data-value");
  
    //if a value is returned then a button was clicked
   if (targetId){

   //correct answer
   if(targetId === questionArray[queIndex].correctAnswer){
    queIndex ++;
    feedbackText.textContent = "correct";
    //no more questions left 
    if(queIndex >= questionArray.length){
        finalScore = time;
        gameOver();
    }
    else{
        createQue();
    }
    

    }
    else{
        //check to make sure time doesnt equal a negative number 
        if(time > 10){
            time -=10;
            userScore.textContent = time;
            queIndex++;
            feedbackText.textContent = "Wrong";
            //no more questions left
            if(queIndex >= questionArray.length){
                finalScore = time;
                gameOver();
            }
            else{
                createQue();
            }
        }
        else{
            gameOver();
        }
        
      
    }
}
    
    
}
var displayScore = function(score){
  scoreText.textContent += score;
}
var gameOver = function(){
    displayScore(finalScore);
    //end the game by seting the value of time to 0 so the interval can stop
    time = 0;
}
var displayHighscores = function(){
    endGame.setAttribute("style","display:none")
    scoreList.setAttribute("style","display: flex");

    var listEl = document.createElement("ul");
    var index = 1;
    for(var i = 0; i < highScores.length; i++){
        var listItemEl = document.createElement("li")
        listItemEl.textContent = index +". " +highScores[i].initials + " - " +highScores[i].score;
        listEl.appendChild(listItemEl);
        index++;
    }
    highscoreList.appendChild(listEl);

}
var saveScore = function(event){
    event.preventDefault();  
    if(!userInput.value){
        alert("Please enter initials!");
    }
    else{
        //create object to store the user score and initial
        const score = {
            score : finalScore,
            initials : userInput.value
        }
        
        //push score object to highScore array
        highScores.push(score);
        //sort array based on highest to lowest score
        highScores.sort((a,b) => b.score - a.score);
        //limit highscore to top 5
        highScores.splice(5);

        //save highscore to local storage
        localStorage.setItem("highScores",JSON.stringify(highScores));
        
        displayHighscores();
        
        
    }  
}

var resetQuiz = function(){
   //reload the page
    location.reload();
}

var deleteHighscore = function(){
    //reset values
    highscoreList.innerHTML = "";
    localStorage.clear();
}

btnStart.addEventListener("click",start);
optionDiv.addEventListener("click",checkAnswer);
btnForm.addEventListener("submit",saveScore);
resetEl.addEventListener("click", resetQuiz);
deleteEl.addEventListener("click",deleteHighscore);


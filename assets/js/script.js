var btnStart = document.querySelector("#btn-start");
var questionText = document.querySelector("#question-title");
var startSection = document.querySelector("#start");
var questionSection = document.querySelector("#questions");
var optionDiv = document.querySelector("#options");
var userScore = document.querySelector("#score");
var endGame = document.querySelector("#results");
var scoreText = document.querySelector("#results-text");

//initialize variables
var queIndex = 0;
var time = 10;
let questionArray;



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

var createQue = function(){
   
    optionDiv.innerHTML = "";
    //set h2 content to current question
    questionText.textContent = myQuestions[queIndex].question;
    var i = 1;
    //create option button
    for (letter in myQuestions[queIndex].answers){
        
        var btnEl = document.createElement("button");
        btnEl.className = "btn btn-option";
        btnEl.id = letter;
        btnEl.textContent = i +". "+ myQuestions[queIndex].answers[letter];
        optionDiv.appendChild(btnEl);
        i++;
      
    }    
    debugger;

}
var start = function(){
    
    questionArray =  myQuestions.sort(() => Math.random() - .5);
    //start timer
    var myTimer = setInterval(function(){
        userScore.textContent = time;
        time--;
      
       
        if(time <= 0){
            userScore.textContent = "0";
            clearInterval(myTimer);
            console.log("clear");
            questionSection.setAttribute("style","display:none");
            endGame.setAttribute("style","display: flex");
            if(queIndex < myQuestions.length){
                userScore = 0;
                displayScore(userScore);
            }
            
         //  gameOver();
        }
    },1000);



    //hide start section and display questions section
    startSection.setAttribute("style","display:none");
    questionSection.setAttribute("style","display: flex");

    //create question
    createQue();


}
var displayScore = function(score){
  //  scoreText.textContent += score;
  console.log(score);
  scoreText.textContent += score;
}
var gameOver = function(){
    userscore = time;
    displayScore(userScore.textContent);
    console.log(userScore.textContent);
    time = 1;

}



var checkAnswer = function(event){
    var targetId = event.target.getAttribute("id");

    //correct answer
    if(targetId === questionArray[queIndex].correctAnswer){
        queIndex ++;
        if(queIndex >= questionArray.length){
            // call game over function
            gameOver();
        }
        else{
            createQue();
        }
        

    } else{
        time -= 5;
        queIndex++;
        if(queIndex >= questionArray.length){
            gameOver();
        }
        else{
            createQue();
        }
    
    }
    
    
}





btnStart.addEventListener("click",start);
optionDiv.addEventListener("click",checkAnswer);

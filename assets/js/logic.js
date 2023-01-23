// Query selectors 
startScreen = document.querySelector("#start-screen")
startButton = document.querySelector("#start")
questCont = document.querySelector("#questions")
questTitle = document.querySelector("#question-title")
questChoices = document.querySelector("#choices")
timerEl = document.querySelector("#time")
submit = document.querySelector("#submit")
endScreen = document.querySelector("#end-screen")
finalScore = document.querySelector("#final-score")
initials = document.querySelector("#initials")
submiT = document.querySelector("#submit")



startButton.addEventListener("click", startQuiz)

function startQuiz () {
    startScreen.setAttribute("style", "display: none")
    questCont.removeAttribute("class")
    timerOn()
}


var count = 60;
score = 0;
var runningIndex = 0;
var lastIndex = questionBank.length-1;
score = 0;
highscores = [];

var event = renderQuestion()
checkAnswer ()


function timerOn () {
    
    var timer = setInterval(function() {
        count--;
        timerEl.textContent = count
      }, 1000)

    // renderQuestion ()
}
    
function renderQuestion () {
    
    var runningQuest = questionBank[runningIndex];

    questTitle.innerHTML = runningQuest.question;
    var option1 = document.createElement("button");
    option1.setAttribute("on-click", "checkAnswer(event)");
    option1.innerHTML = runningQuest.choices[0]
    questChoices.append(option1);
    option1.addEventListener("click", checkAnswer)
     
    var option2 = document.createElement("button");
    option2.setAttribute("on-click", "checkAnswer(event)");
    option2.innerHTML = runningQuest.choices[1]
    questChoices.append(option2);
    option2.addEventListener("click", checkAnswer)

    var option3 = document.createElement("button");
    option3.setAttribute("on-click", "checkAnswer(event)");
    option3.innerHTML = runningQuest.choices[2]
    questChoices.append(option3);
    option3.addEventListener("click", checkAnswer)

    var option4 = document.createElement("button");
    option4.setAttribute("on-click", "checkAnswer(event)");
    option4.innerHTML = runningQuest.choices[3]
    questChoices.append(option4);
    option4.addEventListener("click", checkAnswer)

    return Event;
}


function checkAnswer(event) {
    
    console.log(event)
    // dIndex = element.getAttribute("data-index");

    if (runningQuest[runningIndex].choices[dIndex] == runningQuest[runningIndex].answer) {
        // answer is correct 
        correct ();
        // score++
        score++
        
    } else {
        // answer is wrong
        wrong ();
        // count = count - 2
        count = count -2
    }

    if (runningIndex < lastIndex || count > 0) {
        runningIndex++
        renderQuestion ()
    } else {
        // end the quiz
        clearInterval(timer);
        scoreRender ();
        


    }
}


function scoreRender () {
    questCont.setAttribute("class", "hide")
    endScreen.removeAttribute("class")
    finalScore.textContent = score
    
    sendToStorage()
}
        

function sendToStorage (userScore, userName) {
    var userName = initials.value.trim()
    var userScore = finalScore.textContent
    

}


function correct () {
    sfxRight = new Audio("assets/sfx/correct.wav")
    sfxRight.play()
}                

function wrong () {
    var sfxWrong = new Audio("assets/sfx/incorrect.wav");
    sfxWrong.play()
}


 // Event Listeners
 submiT.addEventListener("click", function (event) {
    event.preventDefault();

 })
        
   
//     - Get Question and display it on the page 
//         - Grabbing the question from the questions array inside of questions.js file. 
//         - These get displayed in the choices div.
//         - What happens when each choice has been clicked? 
//             - Need to display feedback: lets the user know if it was answered correctly or incorrectly. 
//             - Also, need to play a sound effect if it is right or wrong. There is a folder with two different sound effects inside. 
//             The Audio needs to be imported into logic.js:

// var sfxRight = new Audio("assets/sfx/correct.wav");

                
//             Example of how to call:
//             sfxWrong.play();
//             - If the user answers incorrectly then time is taken off of the timer
        
//     - End the Quiz
//       - what needs to happen here? 
//         - Display high scores
//         - Stop the timer

//     - function to handle saving the high score
//       - make sure to add the final score to localstorage

// Event Listeners



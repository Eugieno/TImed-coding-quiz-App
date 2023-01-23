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
feedbackEl =document.querySelector("#feedback")






var count = 60;

var runningIndex = 0;
var lastIndex = questionBank.length-1;
score = 0;
highscores = [];
var timer;


function startQuiz () {
    startScreen.setAttribute("style", "display: none")
    questCont.removeAttribute("class")
    
    timer = setInterval(timerOn, 1000);
    timerEl.textContent = count;
    
    
}

function timerOn () {
    
    
        count--;
        timerEl.textContent = count
    

    // renderQuestion ()
    if (count <= 0) {
        scoreRender()
    }
}
 




startButton.addEventListener("click", startQuiz)

function renderQuestion () {
    
    var runningQuest = questionBank[runningIndex];

    questTitle.innerHTML = runningQuest.question;
    questChoices.innerHTML = ""
    var option1 = document.createElement("button");
    option1.setAttribute("data-index", "1");
    option1.innerHTML = runningQuest.choices[0]
    questChoices.append(option1);
    option1.addEventListener("click", checkAnswer)
     
    var option2 = document.createElement("button");
    option2.setAttribute("data-index", "2");
    option2.innerHTML = runningQuest.choices[1]
    questChoices.append(option2);
    option2.addEventListener("click", checkAnswer)

    var option3 = document.createElement("button");
    option3.setAttribute("data-index", "3");
    option3.innerHTML = runningQuest.choices[2]
    questChoices.append(option3);
    option3.addEventListener("click", checkAnswer)

    var option4 = document.createElement("button");
    option4.setAttribute("data-index", "4");
    option4.innerHTML = runningQuest.choices[3]
    questChoices.append(option4);
    option4.addEventListener("click", checkAnswer)
    
}

function checkAnswer(event) {
    

    

    if (this.value === questionBank[runningIndex].answer) {
        // answer is correct 
        correct ();
        console.log(event.target)
        
    } else {
        // answer is wrong
        count = count -10
        if (count < 0) {
            count = 0
        }
        timerEl.textContent = count
        wrong ();
        console.log(event.target)
    
       
    }

    if (runningIndex < questionBank.length) {
        runningIndex++
        renderQuestion ()
    } else {
        scoreRender();
    }
}


function scoreRender () {
    clearInterval(timer)
    questCont.setAttribute("class", "hide")
    endScreen.removeAttribute("class")
    finalScore.textContent = count
    
    sendToStorage()
}
        

function sendToStorage (userScore, userName) {
    var userName = initials.value.trim()
    var userScore = finalScore.textContent


}


function correct () {
    sfxRight = new Audio("assets/sfx/correct.wav")
    sfxRight.play()
    feedbackEl.textContent = "correct!"

    feedbackEl.removeAttribute("class", "hide");
    setTimeout(() => {
        feedbackEl.setAttribute("class", "hide")
    }, 1000);
    

    

}                

function wrong () {
    var sfxWrong = new Audio("assets/sfx/incorrect.wav");
    sfxWrong.play()
    feedbackEl.textContent = "wrong!"
    feedbackEl.removeAttribute("class", "hide");
    setTimeout(() => {
        feedbackEl.setAttribute("class", "hide")
    }, 1000);
    
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



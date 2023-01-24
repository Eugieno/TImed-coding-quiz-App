// Query selectors 
var startScreen = document.querySelector("#start-screen")
var startButton = document.querySelector("#start")
var questCont = document.querySelector("#questions")
var questTitle = document.querySelector("#question-title")
var questChoices = document.querySelector("#choices")
var timerEl = document.querySelector("#time")
var submit = document.querySelector("#submit")
var endScreen = document.querySelector("#end-screen")
var finalScore = document.querySelector("#final-score")
var initials = document.querySelector("#initials")
var submiT = document.querySelector("#submit")
var feedbackEl = document.querySelector("#feedback")
var finalFeedbackEl = document.querySelector("#final-feedback")

// Initialisations
var count = 60;
var runningIndex = 0;
var lastIndex = questionBank.length - 1;
var timer;

// Quiz to start function 
function startQuiz() {
    startScreen.setAttribute("style", "display: none")
    questCont.removeAttribute("class")

    timer = setInterval(timerOn, 1000);
    timerEl.textContent = count;
    renderQuestion()

}

// Function to set timer 
function timerOn() {
    count--;
    timerEl.textContent = count

    if (count <= 0) {
        clearInterval(timer)  
        scoreRender()
    }
}

// Event Listener to for start Button 
startButton.addEventListener("click", startQuiz)


// Function to render questions
function renderQuestion() {

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

// Function to check answers
function checkAnswer(event) {


    if (this.textContent === questionBank[runningIndex].answer) {
        // answer is correct 
        correct();

    } else {
        // answer is wrong
        if (count >= 10) {
            count = count - 10
        } else {
            count = 0
            clearInterval(timer)
            scoreRender()
        }
        // count = count - 10
        // if (count < 0) {
        //     count = 0
        // }
        timerEl.textContent = count
        wrong();

    }

    if (runningIndex < lastIndex) {
        runningIndex++
        renderQuestion()
    } else {
        scoreRender();
    }
}

// Function to render score at the end of screen 
function scoreRender() {
    clearInterval(timer)
    questCont.setAttribute("class", "hide")
    endScreen.removeAttribute("class")
    finalScore.textContent = count

    feedback ()

    sendToStorage()
}

// Function to display final feedback at the end of screen
function feedback () {
    finalFeedbackEl.removeAttribute("class")
    if (finalScore.textContent <= 10) {
        finalFeedbackEl.textContent = "You can do better!" + " A quick revision of fundamental JS concepts will suffice."
    } else if (finalScore.textContent > 10 && finalScore.textContent <= 20) {
        finalFeedbackEl.textContent = "That is a decent effort!" + " Have a go again to improve your score." + " Your time efficiency is "+ ((finalScore.textContent/60)*100).toFixed() +"%"
    } else if (finalScore.textContent > 20 && finalScore.textContent <= 30) {
        finalFeedbackEl.textContent = "Welldone, that's a really good effort!" + " You can improve on this." + " Your time efficiency is "+ ((finalScore.textContent/60)*100).toFixed() +"%"
    } else if (finalScore.textContent > 30 && finalScore.textContent <= 45) {
        finalFeedbackEl.textContent = "Good job! that's a really good performance" + " Your time efficiency is "+ ((finalScore.textContent/60)*100).toFixed() +"%"
    } else {
        finalFeedbackEl.textContent = "Fantastic! You are a JS pro!" + " Your time efficiency is "+ ((finalScore.textContent/60)*100).toFixed() +"%"
    }
}


// Function to send user's initial and score to local storage 
function sendToStorage(userName) {
    var userName = initials.value.trim()
    if (userName) {
        var highscore = JSON.parse(localStorage.getItem("topScore")) || []
        var newScore = {
            score: count,
            init: userName

        }
        highscore.push(newScore)

          

        localStorage.setItem("topScore", JSON.stringify(highscore))
        window.location.href = "highscores.html"
    }


}

// Function for correct user's answer
function correct() {
    sfxRight = new Audio("assets/sfx/correct.wav")
    sfxRight.play()
    feedbackEl.textContent = "correct!"

    feedbackEl.removeAttribute("class", "hide");
    var myTimeout = setTimeout(() => {
        feedbackEl.setAttribute("class", "hide")
    }, 1000);
}

// Function for wrong user answer
function wrong() {
    var sfxWrong = new Audio("assets/sfx/incorrect.wav");
    sfxWrong.play()
    feedbackEl.textContent = "wrong!"
    feedbackEl.removeAttribute("class", "hide");
    setTimeout(() => {
        feedbackEl.setAttribute("class", "hide")
    }, 1000);

}


// Event Listeners for submit button 
submiT.addEventListener("click", function (event) {
    sendToStorage()

})






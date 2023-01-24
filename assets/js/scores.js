var clearBtn = document.querySelector("#clear")

function showScore() {

    var scores = JSON.parse(localStorage.getItem("topScore")) || []

    scores.forEach(function(newScore) {
        var liTag = document.createElement("li");
        liTag.textContent = newScore.init + " || " + "Your score is: "+ newScore.score
        var olEl = document.querySelector("#highscores")
        olEl.appendChild(liTag)
    });
}

clearBtn.addEventListener("click", function (){
    localStorage.removeItem("topScore")
    window.location.reload()
})

showScore()
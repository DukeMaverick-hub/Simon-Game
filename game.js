var butttonColors = ["red", 
    "blue", 
    "green", 
    "yellow"]
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
$(document).on("keydown", ()=>{
    if (!started) {
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
})

function nextSequence() {
    userClickedPattern = [];
    level++;
    var randomNumber = Math.floor(Math.random()*4); 
    var randomChosenColor = butttonColors[randomNumber];
   gamePattern.push(randomChosenColor);
   $("#level-title").text("level " + level);
   $("#"+ randomChosenColor).animate({opacity:0.5}, 50, ()=> {
    $("#"+ randomChosenColor).animate({opacity:1.0})
   });
  playSound(randomChosenColor);
}

$(".btn").on("click", handler)
function handler(event) {
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
    
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(()=>{
    $("#"+currentColor).removeClass("pressed")
    }, 100)
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(()=>{
                nextSequence();
            },1000)
            
        }
    } else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(()=>{
        $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
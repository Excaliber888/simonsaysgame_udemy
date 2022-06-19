var buttonCoulours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


$(document).keydown(function() {
  if (!started) {
    $('#level-title').text("level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

  console.log(userClickedPattern);
})



function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonCoulours[randomNumber];
  gamePattern.push(randomChosenColour);


  playSound(randomChosenColour);
  animatePress(randomChosenColour);

  console.log(gamePattern);
}



function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    console.log("Success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    var audio = new Audio('sounds/wrong.mp3');
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game over, press any key to Restart");
    startOver();
  }
}



function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}



function animatePress(currentColour) {
    $("." + currentColour).fadeOut(100).fadeIn(100);
}



function playSound(name) {
  switch (name) {
    case "red":
        var audio = new Audio('sounds/red.mp3');
        audio.play();
      break;
    case "blue":
        var audio = new Audio('sounds/blue.mp3');
        audio.play();
      break;
    case "green":
        var audio = new Audio('sounds/green.mp3');
        audio.play();
      break;
    case "yellow":
        var audio = new Audio('sounds/yellow.mp3');
        audio.play();
      break;
    default:
  }
}

var buttonColours = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userPattern = [];

function nextSequence() {
  //Generates random number between 0-3
  var randomNumber = Math.floor(Math.random() * 4);
  //Allocates randomNumber to the colour of button in the array
  var randomChosenColour = buttonColours[randomNumber];
  //Pushes colour of button to array which stores the game pattern
  gamePattern.push(randomChosenColour);

  //Changes the background colour of the random button selected
  $("." + randomChosenColour).addClass(randomChosenColour + "-selected");

  //Animates button by making the background colour black again making it flash
  setTimeout(function() {
    $("." + randomChosenColour).removeClass(randomChosenColour + "-selected");
  }, 400);

  //Plays the audio for the button that flashes
  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();

}

$(".btn").click(function(){
  var chosenColour = $(this).attr("class");
  userPattern.push(chosenColour);
  console.log(userPattern);
})






// Press Play
// Random button flashes and pushed onto an array
//  The random button that flashes will have its background colour changed
// User then presses button
//   Checks if correct
//     if true then another random button flashes and pushed onto array
//     if false game over
// User then presses first button and second button
//   check if correct
//     if true then another random button flashes and pushed onto array
//     if false game over
// This loops until game over

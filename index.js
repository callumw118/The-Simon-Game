var buttonColours = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userPattern = [];
var counter = 1;

function nextSequence() {
  //Generates random number between 0-3
  var randomNumber = Math.floor(Math.random() * 4);
  //Allocates randomNumber to the colour of button in the array
  var randomChosenColour = buttonColours[randomNumber];
  //Pushes colour of button to array which stores the game pattern
  gamePattern.push(randomChosenColour);

  //Displays the game pattern to the user
  animate();

  //Reset users pattern to 0 so it can check the next order they input is correct
  userPattern.splice(0, userPattern.length);
  //Tells the user which level they are on
  updateScore();
}

//Adds and then removes the CSS class to flash the button
function flash(colour) {

  //Changes the background colour of the random button selected
  $("." + colour).addClass(colour + "-selected");

  //Plays the sound for the colour that flahes
  setTimeout(function() {
    playSound(colour);
  }, 200);

  //Animates button by making the background colour black again making it flash
  setTimeout(function() {
    $("." + colour).removeClass(colour + "-selected");
  }, 500);


}

//Plays the game pattern back to the user
function animate() {
  var i = 0;

  var interval = setInterval(function() {
    flash(gamePattern[i]);
    i++;

    if (i > gamePattern.length) {
      clearInterval(interval);
    }
  }, 700);
}

//Detects when play button is pressed
$(".start-button").click(function() {

  //Removes Play button and replaces with counter
  $(this).hide();
  $(".start-button").replaceWith("<h1 class=counter>" + counter + "</h1>");
  //Handles the button clicks - Stores the id of the button clicked as an array
  //Plays the sound and animation of button
  $(".btn").click(function() {
    var chosenColour = $(this).attr("id");
    userPattern.push(chosenColour);
    flash(chosenColour);
    correctMove(userPattern.length - 1);

  });
  //Plays game when start button pressed
  nextSequence();
});


//Updates the counter in the middle telling the user which level they are
function updateScore() {
  $(".counter").replaceWith("<h1 class=counter>" + counter + "</h1>");
  counter++;
}


//Plays the audio for the button that flashes
function playSound(chosenColour) {
  var audio = new Audio("sounds/" + chosenColour + ".mp3");
  audio.play();
}


//Validates that the users pattern matches the game pattern
function correctMove(currentLevel) {
  if (gamePattern[currentLevel] === userPattern[currentLevel]) {
    if (userPattern.length === gamePattern.length) {
      //Plays the next button of the pattern after a 1 second wait
      setTimeout(function() {
        nextSequence()
      }, 500);
    }
  } else {
    //Plays the wrong move audio
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    //Fades the buttons out and in if wrong move
    $(".btn").fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);

    setTimeout(function() {
      reloadStylesheets()
    }, 1500);

  }
}


function reloadStylesheets() {

  gamePattern = [];
  userPattern = [];
  counter = 1;

  nextSequence();
}


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

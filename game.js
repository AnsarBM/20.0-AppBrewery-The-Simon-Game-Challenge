/* STEP 1: Getting ready
    Link the game.js file to the HTML file 
    Add JQuery to the HTML file.
    NOTE: Make sure your "jquery" script element is above "game.js" script both above the "body" closing tag.
*/

/* STEP 2: Create a New Pattern */
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;


/* STEP 7: Start the Game 
detect when a keyboard key has been pressed, when that happens for the first time, 
call nextSequence()
*/

$("body").on("keydown", function(event){

    if(!gameStarted){
        $("h1").html(`Level ${level}`);
        nextSequence();
        gameStarted = true;
    }
});


/* STEP 4: Check Which Button is Pressed */
$(".btn").on("click", function(event){
    var userChosenColour = event.target.id;               //event.target.id property retrieves the ID of the clicked button
    userClickedPattern.push(userChosenColour);
    
    //console.log(userClickedPattern);

    /* STEP 5: Add Sounds to Button Clicks */
    playSound(userChosenColour);
    animatePress(userChosenColour);
    var totalAnswers = userClickedPattern.length;
    var lastAnswerIndex = totalAnswers - 1;
    checkAnswer(lastAnswerIndex);
});


/* STEP 8: Check the User's Answer Against the Game Sequence8 */

function checkAnswer(currentLevel){
    var lastColor = userClickedPattern[currentLevel];
    var lastGameColor = gamePattern[currentLevel];
    if (lastColor === lastGameColor){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            //Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").html("Game Over, Press Any Key to Restart");

        startOver();
    }
}



function nextSequence(){
    // increase the level by 1 every time nextSequence() is called and display the updated level.
    var userClickedPattern = [];
    level++;
    $("h1").html(`Level ${level}`);

    var randomNumber = Math.round(Math.random()*3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

/* STEP 3: Show the Sequence to the User with Animations and Sounds */
    $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

/* STEP 6: Add Animations to User Clicks */
function animatePress(currentColour){
    $(`#${currentColour}`).addClass("pressed");
    setTimeout(function(){ 
        $(`#${currentColour}`).removeClass("pressed"); 
    }, 100); 
    
}


/* STEP 10: Restart the Game */
function startOver(){
    level = 0;
    gamePattern = [];
    gameStarted = false;
}






/*
switch (lastColor){
    case ("red"):
        var lastAnswerIndex = 0;
    break;

    case ("blue"):
        var lastAnswerIndex = 1;
    break;

    case ("green"):
        var lastAnswerIndex = 2;
    break;

    case ("yellow"):
        var lastAnswerIndex = 3;
    break;
    
    default:
        console.log(lastColor);
    break;
}
*/


/*
$("body").on("mouseover", function(){
    var i = 0;
    var randomButton = randomChosenColour;
    while(i < 9876){
        setTimeout(function(){
            $(`#${randomButton}`).fadeOut(20).fadeIn(100);
        },200)
        i++;
    }
});
*/












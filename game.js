/* STEP 1: Getting ready
    Link the game.js file to the HTML file 
    Add JQuery to the HTML file.
    NOTE: Make sure your "jquery" script element is above "game.js" script both above the "body" closing tag.
*/

/* STEP 2: Create a New Pattern */
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence(){

    // increase the level by 1 every time nextSequence() is called and display the updated level.
    level++;
    $("h1").html(`Level ${level}`);

    var randomNumber = Math.round(Math.random()*3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

/* STEP 3: Show the Sequence to the User with Animations and Sounds */
    $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

   
}

/* STEP 4: Check Which Button is Pressed */
$(".btn").on("click", function(event){
    var userChosenColour = event.target.id;               //event.target.id property retrieves the ID of the clicked button
    userClickedPattern.push(userChosenColour);
    
    //console.log(userClickedPattern);


    /* STEP 5: Add Sounds to Button Clicks */
    playSound(userChosenColour);
    animatePress(userChosenColour);
});

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

/* STEP 7: Start the Game 
detect when a keyboard key has been pressed, when that happens for the first time, 
call nextSequence()
*/
var gameStarted = false;
var level = 0;
$("body").on("keydown", function(event){

    if(!gameStarted){
        $("h1").html(`Level ${level}`);
        nextSequence();
        gameStarted = true;
    }
});







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












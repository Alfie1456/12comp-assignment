/*******************************************************/
// P5.play: t01_create_sprite
// Create a sprite
// Written by ??? 
/*******************************************************/
console.log("%c t01_create_sprite", "color: blue;");

const screenWidth = 500;
const screenHeight = 500;
const obstacleHeight = 25;
const obstacleWidth = 25;

var screenSelector = "start";  
var score = 0;
var nextSpawn = 0;
var player,playerImage;
var road,roadImage;

function preload() {
    roadImage = loadImage('/Assets/images/road.png');
    playerImage = loadImage('/Assets/images/player.png');
}

/*******************************************************/
// setup()
/*******************************************************/
function setup() {
cnv = new Canvas (screenWidth, screenHeight);

    obstacles = new Group();
player=new Sprite(100,100,100,100);
    player.addImage(playerImage);
    player.scale=0.5;
document.addEventListener("keydown", 
        function(event) {
            if(screenSelector == "start"||screenSelector == "end"){
                screenSelector = "game"
                resetGame();
            
            
            }
    });
    
    
}

/*******************************************************/
// draw()
/*******************************************************/

function draw() {
    if(screenSelector=="game"){
        gameScreen();
    }else if(screenSelector=="end"){
        endScreen();
    }else if(screenSelector=="start"){
        startScreen();
    }else{
        text("not the right screen. Try restarting the game.", 50, 50);
        console.log("not the right screen. Try resetting.")
    }
}

function newObstacle(){
     obstacle = new Sprite((screenWidth -100),  screenHeight - obstacleHeight/2, obstacleWidth, obstacleHeight, 'k');
    obstacle.color = color("yellow");
    obstacle.vel.x = -5;
    
    obstacles.add(obstacle);
}

function youDead(_player, _obstacle){
    screenSelector = "end";
    player.remove();
    obstacles.removeAll();
}

//screens

function startScreen(){
    background(roadImage);

    allSprites.visible = false;
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text("Welcome to my racing game!", 50, 50);
    textSize(24);
    text("Press any key to start", 50, 110);
}

function gameScreen(){
    background(roadImage);
    allSprites.visible = true;
    score++;
    player.speed = 3;
	
	if (kb.pressing('up')) {
		player.direction = -90;
	} else if (kb.pressing('down')) {
		player.direction = 90;
	} else if (kb.pressing('left')) {
		player.direction = 180;
	} else if (kb.pressing('right')) {
		player.direction = 0;
	} else {
	  player.speed = 0;
	}
    if(frameCount> nextSpawn){
    newObstacle();
    nextSpawn = frameCount + random(10,100);
}
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text(score, 50, 50);
}

function endScreen(){
    background("white");
    background("red");
    allSprites.visible = false;
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text("you died. ", 50, 50);
    textSize(24);
    text("your score was: "+score, 50, 110);
    textSize(14);
    text("press any key to restart", 50, 150);
   
}

function resetGame(){
    
}


/*******************************************************/
//  END OF APP
/*******************************************************/

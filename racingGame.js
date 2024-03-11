/*******************************************************/
// P5.play: t01_create_sprite
// Create a sprite
// Written by ??? 
/*******************************************************/
console.log("%c t01_create_sprite", "color: blue;");

const screenWidth = 900;
const screenHeight = 900;



function preload() {
    roadImage=loadImage('/Assets/images/road.png');
}

/*******************************************************/
// setup()
/*******************************************************/
function setup() {
    

  
}
/*******************************************************/
// draw()
/*******************************************************/

    function draw() {
  background(roadImage); 
}
function setup() {
    console.log("setup: ");
  
    cnv = new Canvas(screenWidth, screenHeight);
    world.gravity.y = 80;
 
    obstacles = new Group();
    
    wall = new Sprite(0, height, windowWidth*2, 15, 'k');
    wall.color = 'lightGreen';
  

    document.addEventListener("keydown", 
        function(event) {
            if(screenSelector == "start"||screenSelector == "end"){
                screenSelector = "game"
                resetGame();
            }else{
                if(player.y > 150 ){//chose number becasue of testing.
                    console.log("Key pressed!");
                    player.vel.y = -20;
                }
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
        text("wrong screen - you shouldnt get here", 50, 50);
        console.log("wrong screen - you shouldnt get here")
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
    background("white");

    allSprites.visible = false;
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text("Welcome to geodash", 50, 50);
    textSize(24);
    text("Press any key to start", 50, 110);
}

function gameScreen(){
    background("lightblue");
    allSprites.visible = true;
    score++;
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
    player = new Sprite(playerWidth*1.2,  screenHeight/2, playerWidth, playerHeight, 'd');
    player.color = color("yellow");
    player.collides(obstacles, youDead);
    score = 0;
}




/*******************************************************/
//  END OF APP
/*******************************************************/

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
var carOb1Img,carOb1;
var truckOb1Img,truckOb1;
var carOb1Group,truckOb1;
var lifeTime = 1;
function preload() {
    roadImage = loadImage('/Assets/images/road.png');
    playerImage = loadImage('/Assets/images/player.png');
    carOb1Img = loadImage('/Assets/images/carObstacle1.png');
    truckOb1Img = loadImage('/Assets/images/truckObstacle1.png');
    
}

/*******************************************************/
// setup()
/*******************************************************/
function setup() {
    
    cnv = new Canvas (screenWidth, screenHeight);

    obstacles = new Group();
    
        //screen selecter 
    document.addEventListener("keydown", 
        function(event) {
            if(screenSelector == "start"||screenSelector == "end"){
                screenSelector = "game"
                resetGame();
            
            
            }
    });
    
    
    
    carOb1Group= new Group();
    truckOb1Group= new Group();
}

/*******************************************************/
// draw()
/*******************************************************/
        //loop
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

function spawncarOb1(){
  
  if(frameCount%250===0){
 var carOb1=createSprite(100,-100,30,30);
    carOb1.addImage(carOb1Img);
    carOb1.scale=0.3;
    carOb1.vel.y=4;
    carOb1.x=Math.round(random(200,400));
    carOb1.lifetime="lifeTime";

  
  }
}


function spawntruckOb1(){
if(frameCount> nextSpawn){
 var truckOb1=createSprite(100,-100,30,30);
    truckOb1.addImage(truckOb1Img);
    truckOb1.scale=0.4;
    truckOb1.vel.x=1;
    truckOb1.vel.y=5;
    truckOb1.x=Math.round(random(400,500));
     truckOb1.lifetime=1;
   }
  }
  
        //obstacle creater
function newObstacle(){
    obstacle = new Sprite((screenWidth -100),  screenHeight - obstacleHeight/2, obstacleWidth, obstacleHeight, 'k');
    obstacle.color = color("yellow");
    obstacle.vel.x = -5;
    
    obstacles.add(obstacle);
}
        //colision detecter
function youDead(_player, _truckOb1, _carOb1){
    screenSelector = "end";
    player.remove();
    obstacles.removeAll();
}

        //Start screen
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
        //game screen
function gameScreen(){
    background(roadImage);
    
    allSprites.visible = true;
    score++;
    player.speed = 3;
    
    spawncarOb1();
    spawntruckOb1();
	
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
    nextSpawn = frameCount + random(10,100,);
    
    
  
    spawncarOb1();
    spawntruckOb1();
}
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text(score, 50, 50);
}
        //end screen
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
        //restart game function 
function resetGame(){
       player=new Sprite(100,100,100,100);
    player.addImage(playerImage);
    player.scale=0.5;
    player.collides(carOb1, truckOb1, youDead);
    score = 0;
}


/*******************************************************/
//  END OF APP
/*******************************************************/

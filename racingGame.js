/*******************************************************/
// P5.play: t01_create_sprite
// Create a sprite
// Written by ??? 
/*******************************************************/
console.log("%c t01_create_sprite", "color: blue;");

const SCREENWIDTH = 500;
const SCREENHEIGHT = 500;



var screenSelector = "start";
var score = 0;
var nextSpawn = 0;
var playerImage;
var roadImage;
var carOb1;
var player;
var truckOb1;
var bikeOb1;
var lifeTime = 10;

function preload() {
    //images
    roadImage = loadImage('/Assets/images/road.png');
    playerImage = loadImage('/Assets/images/player.png');
    carOb1Img = loadImage('/Assets/images/carObstacle1.png');
    truckOb1Img = loadImage('/Assets/images/truckObstacle1.png');
    bikeOb1Img = loadImage('/Assets/images/bikeObstacle1.png');

    //truck spawner
    truckOb1 = createSprite(100, 100, 30, 30, 'd');
    truckOb1.addImage(truckOb1Img);
    truckOb1Img.resize(30,30);
    truckOb1.x = Math.round(random(350, 500));
    truckOb1.lifetime = "lifetime";
    
    //car spawner
    carOb1 = createSprite(100, 250, 30, 30, 'd');
    carOb1.addImage(carOb1Img);
    carOb1.scale = 0.6;
    carOb1.x = Math.round(random(400, 500));
    carOb1.lifetime = "lifeTime";

    //bike spawner
    bikeOb1 = createSprite(400, 400, 30, 30, 'd');
    bikeOb1.addImage(bikeOb1Img);
    bikeOb1.scale = 0.3;
    bikeOb1.x = Math.round(random(350, 500));
    bikeOb1.lifetime = "lifetime";
    
    //player spawner 
    player = new Sprite(100, 100, 100, 100);
    player.addImage(playerImage);
    player.scale = 0.48;

}

/*******************************************************/
// setup()
/*******************************************************/
function setup() {

    cnv = new Canvas(SCREENWIDTH, SCREENHEIGHT);


    //keypress listener 
    document.addEventListener("keydown",
        function(event) {
            if (screenSelector == "start" || screenSelector == "end") {
                screenSelector = "game"
                resetGame();


            }
        });

    //borders
    wallLH = new Sprite(0, height / 2, 8, height, 'k');
    wallLH.color = 'black';
    wallTop = new Sprite(0, 0, windowWidth * 2, 8, 'k');
    wallTop.color = 'black';
    wallBot = new Sprite(0, height, windowWidth * 2, 15, 'k');
    wallBot.color = 'black';



}

/*******************************************************/
// draw()
/*******************************************************/
//loop
function draw() {
    
    //screen selector
    chooseScreen(screenSelector);

    //colision with sprites
    if (truckOb1.colliding(player)) {

        screenSelector = "end"
        console.log("coliding")

    } else if (carOb1.colliding(player)) {

        screenSelector = "end"
        console.log("coliding")
        
    } else if (bikeOb1.colliding(player)) {
        
        screenSelector = "end"
        console.log("coliding")
        
    }
    
    //colision with wall 
    if (truckOb1.colliding(wallLH)) {
        truckOb1.x = 700;
    }

    if (carOb1.colliding(wallLH)) {
        carOb1.x = 800;
    }
    
    if (bikeOb1.colliding(wallLH)) {
        bikeOb1.x = 600;
    }


}

//screen selector
function chooseScreen(screenType){
    if (screenType == "game") {
        gameScreen();
    } else if (screenType == "end") {
        endScreen();
    } else if (screenType == "start") {
        startScreen();
    } else {
        text("not the right screen. Try restarting the game.", 50, 50);
        console.log("not the right screen. Try resetting.")
    } 
}


//Start screen
function startScreen() {
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
function gameScreen() {
    background(roadImage);

    allSprites.visible = true;

    if (screenSelector == "game") {
        score++;
    }

    player.speed = 4;
    truckOb1.vel.x = -6;
    carOb1.vel.x = -5;
    bikeOb1.vel.x = -8;
    
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


    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text(score, 50, 50);
}

//end screen
function endScreen() {
    background("white");
    background("red");
    allSprites.visible = false;
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text("you died. ", 50, 50);
    textSize(24);
    text("your score was: " + score, 50, 110);
    textSize(14);
    text("press any key to restart", 50, 150);
    carOb1.vel.x = 0;
    truckOb1.vel.x = 0;
    carOb1.vel.y = 0;
    truckOb1.vel.y = 0;
    bikeOb1.vel.y = 0;
    truckOb1.x = 500;
    carOb1.x = 600;
    player.x = 100;
    bikeOb1.x = 700;
    truckOb1.rotationSpeed = 0;
    carOb1.rotationSpeed = 0;
    bikeOb1.rotationSpeed = 0;
    player.rotationSpeed = 0;
    truckOb1.rotation = 0;
    bikeOb1.rotation = 0;
    carOb1.rotation = 0;
    player.rotation = 0;
    
}

//score reset 
function resetGame() {
    score = 0;
}


/*******************************************************/
//  END OF APP
/*******************************************************/

/*******************************************************/
// P5.play: t01_create_sprite
// Create a sprite
// Written by ??? 
/*******************************************************/
console.log("%c t01_create_sprite", "color: blue;");

//constants 
const SCREENWIDTH = 1000;
const SCREENHEIGHT = 500;


//variables
let screenSelector = "start";
let score = 0;
let nextSpawn = 0;
let playerImage;
let roadImage;
let carOb1;
let player;
let truckOb1;
let bikeOb1;
let lifeTime = 10;

function preload() {
	//images
	roadImage = loadImage('/Assets/images/road.png');
	playerImage = loadImage('/Assets/images/player.png');
	carOb1Img = loadImage('/Assets/images/carObstacle1.png');
	truckOb1Img = loadImage('/Assets/images/truckObstacle1.png');
	bikeOb1Img = loadImage('/Assets/images/bikeObstacle1.png');

	//truck spawner
	truckOb1 = createSprite(100, 100, 130, 75, 'd');
	truckOb1.addImage(truckOb1Img);
	truckOb1.x = Math.round(random(900, 1000));
	truckOb1.lifetime = "lifetime";

	//car spawner
	carOb1 = createSprite(100, 250, 90, 70, 'd');
	carOb1.addImage(carOb1Img);
	carOb1.x = Math.round(random(700, 800));
	carOb1.lifetime = "lifeTime";

	//bike spawner
	bikeOb1 = createSprite(400, 400, 70, 40, 'd');
	bikeOb1.addImage(bikeOb1Img);
	bikeOb1.x = Math.round(random(800, 900));
	bikeOb1.lifetime = "lifetime";

	//player spawner 
	player = new Sprite(100, 250, 150, 75);
	player.addImage(playerImage);

}

/*******************************************************/
// setup()
/*******************************************************/
function setup() {

	cnv = new Canvas(SCREENWIDTH, SCREENHEIGHT);


	//key press detector 
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
//draw loop
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
		truckOb1.x = 900;
	}

	if (carOb1.colliding(wallLH)) {
		carOb1.x = 1000;
	}

	if (bikeOb1.colliding(wallLH)) {
		bikeOb1.x = 900;
	}


}

//screen selector
function chooseScreen(screenType) {
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

	playerImage.resize(150, 75);
	bikeOb1Img.resize(150, 150);
	carOb1Img.resize(150, 100);
	truckOb1Img.resize(250, 250);

	allSprites.visible = true;

	if (screenSelector == "game") {
		score++;
	}
	//sprite velocities 
	player.speed = 4;
	truckOb1.vel.x = -3;
	carOb1.vel.x = -7;
	bikeOb1.vel.x = -9;

	//player movement
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
	text("Game Over! ", 50, 50);
	textSize(24);
	text("your score was: " + score, 50, 110);
	textSize(14);
	text("press any key to restart", 50, 150);

	//resets sprite values eg rotation

	carOb1.vel.x = 0;
	truckOb1.vel.x = 0;
	carOb1.vel.y = 0;
	truckOb1.vel.y = 0;
	bikeOb1.vel.y = 0;
	truckOb1.x = 1000;
	carOb1.x = 900;
	player.x = 100;
	bikeOb1.x = 900;
	bikeOb1.y = 400;
	player.y = 250;
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

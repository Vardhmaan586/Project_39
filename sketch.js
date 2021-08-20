var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var gameOver, restart;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");

  groundImage = loadImage("ground2.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight / 2 + 218);

  trex = createSprite(displayWidth / 2, displayHeight / 2 + 100, 20, 50);

  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;

  ground = createSprite(displayWidth / 2, displayHeight / 2 + 100, displayWidth, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -12;

  gameOver = createSprite(displayWidth / 2, displayHeight / 2 - 70);
  gameOver.addImage(gameOverImg);

  restart = createSprite(displayWidth / 2, displayHeight / 2 - 30);
  restart.addImage(restartImg);

  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;

  invisibleGround = createSprite(displayWidth / 2, displayHeight / 2 + 100, 400, 10);
  invisibleGround.visible = false;

  obstaclesGroup = new Group();

}

function draw() {
  background(225);

  //trex.debug = true;
  //console.log(trex.y);

  if (gameState === PLAY) {
    ground.velocityX = -12;
    if (keyDown("space") && trex.y === 431.5) {
      trex.velocityY = -12;
    }

    trex.velocityY = trex.velocityY + 0.8

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    trex.collide(invisibleGround);
    spawnObstacles();

    if (obstaclesGroup.isTouching(trex)) {
      gameState = END;
    }

  }

  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;

    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);

    trex.changeAnimation("collided", trex_collided);

    obstaclesGroup.setLifetimeEach(-1);

    if (mousePressedOver(restart)) {
      reset();
    }

  }

  camera.position.x = trex.x;
  camera.position.y = displayHeight / 2 + 5;

  drawSprites();
}

function spawnObstacles() {

  if (frameCount % 40 === 0) {
    var obstacle = createSprite(displayWidth / 2 + 500, displayHeight / 2 + 80, 10, 40);
    //obstacle.debug = true;
    obstacle.velocityX = -12;

    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1: obstacle.addImage(obstacle1);
        break;
      case 2: obstacle.addImage(obstacle2);
        break;
      case 3: obstacle.addImage(obstacle3);
        break;
      case 4: obstacle.addImage(obstacle4);
        break;
      case 5: obstacle.addImage(obstacle5);
        break;
      case 6: obstacle.addImage(obstacle6);
        break;
      default: break;
    }

    obstacle.scale = 0.5;
    obstacle.lifetime = 1000;
    obstaclesGroup.add(obstacle);
  }
}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;

  obstaclesGroup.destroyEach();

  trex.changeAnimation("running", trex_running);
}
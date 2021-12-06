var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieGroup, zombieAni;
var giantZombie, giantZombieGroup, giantZombieAni;
var bullet, bulletImg, bulletGroup;
var cooldown = 3;
var score = 0;


function preload(){
  
  shooterImg = loadImage("shooter.png")
  shooter_shooting = loadImage("shooter.png")

  zombieAni = loadAnimation("zombie3.png","zombie4.png")
  giantZombieAni = loadImage("GiantZombie.png")
  bgImg = loadImage("Background.png")
  bulletImg = loadImage("bullet.png")

}

function setup() {

  
  createCanvas(windowWidth - 20,windowHeight - 20);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.7
  
  zombieGroup = new Group();
  giantZombieGroup = new Group();
  bulletGroup = new Group();

  player = createSprite(200, displayHeight-300, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.3
  //player.debug = true
  player.setCollider("rectangle",0,0,300,300);
}

function draw() {
  background(0); 

  createZombies();
  createGiantZombies();
  cooldownTimer();

  if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y-5
  }
  if(keyDown("DOWN_ARROW")||touches.length>0){
    player.y = player.y+5
  }

  if(keyWentDown("space") && cooldown === 0){
    shootBullets()
    cooldown = 3
  }



//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

drawSprites();

}

function createZombies() {
  if (frameCount % 80 === 0) {
    var zombie = createSprite(width - 100,Math.round(random(100,height - 100)),50,50)
    zombie.addAnimation("zombie",zombieAni)
    zombie.scale = 0.04;
    zombieGroup.add(zombie);
    zombieGroup.setVelocityXEach(-3)
  }
}

function createGiantZombies() {
  if (frameCount % 500 === 0) {
    var giantZombie = createSprite(width - 100,Math.round(random(100,height - 100)),50,50)
    giantZombie.addImage("giantZombie",giantZombieAni)
    giantZombie.scale = 0.3;
    giantZombieGroup.add(giantZombie);
    giantZombieGroup.setVelocityXEach(-1)
  }
}

function shootBullets() {
  bullet = createSprite(200,player.y,20,20)
  bullet.addImage("bullet",bulletImg);
  bullet.scale = 0.07;
  bulletGroup.add(bullet)
  bulletGroup.setVelocityXEach(15)
}

function cooldownTimer() {
  if (frameCount % 10 === 0 && cooldown > 0) {
    cooldown -= 1;
  }
}

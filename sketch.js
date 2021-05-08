var backImage,backgr;
var player, player_running;
var ground,ground_img;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var gameState = "play"

var gameOver;
var score=0;


function preload(){
  backImage=loadImage("jungle.jpeg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  player_still = loadAnimation("Monkey_01.png") 

  bananaImage = loadImage("banana.png");
  obstacle_img = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(800,400);


  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=2.5;
  //backgr.x=backgr.width/2;
 //backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.addAnimation("monkey_still",player_still);
  player.scale = 0.1;
  
  ground = createSprite(400,350,5000,10);
 // ground.velocityX=-4;
  //ground.x=ground.width/2;
  ground.visible=false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
//  score = 0;
}

function draw() {
  
  background(255);
  
  if(gameState === "play" ){

    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
  //  score = score + 2;
    }
    switch(score){
        case 10: player.scale=0.12;
                break;
        case 20: player.scale=0.14;
                break;
        case 30: player.scale=0.16;
                break;
        case 40: player.scale=0.18;
                break;
        default: break;
    }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    if(keyDown(RIGHT_ARROW)){

    player.velocityX = 3

    } 


    spawnFood();
    spawnObstacles();
 
    if(obstaclesGroup.isTouching(player)){ 
        //player.scale=0.08;
       gameState = "end"
     // score=score-2;
    }
 
    camera.position.x = player.x
  }     

  player.collide(ground);

if(player.x>2035){
textSize(50)
text("you win",400,400)
FoodGroup.setVelocityXEach(0)
obstaclesGroup.setVelocityXEach(0)
gameState = "win"
}


if(gameState==="end"){

FoodGroup.setVelocityXEach(0)
obstaclesGroup.setVelocityXEach(0)
FoodGroup.destroyEach()
obstaclesGroup.destroyEach()
player.velocityX = 0
player.changeAnimation("monkey_still",player_still)

player.velocityY  = 0

}

if(gameState==="win"){

  FoodGroup.setVelocityXEach(0)
  obstaclesGroup.setVelocityXEach(0)
  player.destroy()   

}

console.log(player.y)

obstaclesGroup.depth = player.depth+1
obstaclesGroup.depth = backgr.depth+1

  drawSprites();
  
  if(gameState==="end"){
    textSize(50)
    fill("red")
    text("gameOver",800,200)}

    if(gameState==="win"){
      textSize(50)
      fill("green")
      text("you win",400,200)
    }    

  stroke("white");
  textSize(20);
  fill("white");
//  text("Score: "+ score, 500,50);
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(2035,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 1000;
    player.depth = banana.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 120 === 0) {
    var obstacle = createSprite(2035,300,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
    
    //assign scale and lifetime to the obstacle
    obstacle.scale = 0.2;
    obstacle.lifetime = 1000;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


  

var monkey,monkey_running;
var invisble
var bananaImg,foodGroup;
var rock_Img,obstacleGroup;
var invisibleGround;
var scene,backImage;
var count=0;
var PLAY=1;
var END=0;
var gameState=PLAY;

var edges;

function preload() {

backImage=loadImage("jungle.jpg");
 
  monkey_running=loadAnimation("Monkey_01.png", "Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImg=loadImage("banana.png");
  rock_Img=loadImage("stone.png");
  
}



function setup() {
  createCanvas(600, 600);
  
  scene=createSprite(300,300,600,600);
  scene.addImage(backImage);
  scene.velocityX=-4
   scene.scale=1.5
  // scene.depth=0;
  
  monkey=createSprite(70,575,20,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.105
  
  invisibleGround=createSprite(200,585,400,10);
  invisibleGround.visible=false;
  
  
  foodGroup=new Group();
  obstacleGroup=new Group();
  
   
  
}

function draw() {
  background(220);
  
 // scene.depth=-1;

  edges=createEdgeSprites();
  
  if(gameState===PLAY) {
  if (scene.x < 0){
      scene.x = scene.width/2;
    }
  
  if (invisibleGround.x < 0){
      invisibleGround.x = invisibleGround.width/2;
    }
  /*
  if(keyDown("space") && monkey.y >= 480){
      monkey.velocityY = -13 ;
     // playSound("jump.mp3");
    }
  
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;*/
    if(keyDown("UP_ARROW")){

      monkey.y=monkey.y-10;

    }
    if(keyDown("DOWN_ARROW")){

      monkey.y=monkey.y+10;

    }
  
    
 // console.log("monkey.scale");
   if (monkey.isTouching(foodGroup)) {
   foodGroup.destroyEach();
    monkey.scale+0.5;
    count=count+5;
  }
  
  spawnRocks();
  spawnBananas();
  
  } 
  
  else if (gameState===END) {
  
  
  scene.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    //change the trex animation
  
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  
  
  }
  
  
  
  
    monkey.collide(invisibleGround);
    
   monkey.collide(edges[2]);
    
  drawSprites();


  
  stroke("white");
    textSize(20)
    fill("white");
  text("Score: "+ count,500,50);

  text("You've To Feed It Through Urr... Journey As u r A Wildlife Lover",10,580);

  if (obstacleGroup.isTouching(monkey)) {
  
    gameState=END
   
    fill("Red");
    textSize(40)
    text("Press R To Restart",200,300);

   
   // text.depth=-1;
  }



  if (count===100){

    gameState=END
    
    stroke("cyan");
    fill("purple");
    textSize(15);
    text("Burrppp!!!!, Finally That Monkey's Belly Is Full And Now, We Can Countinue Our Journey",10,100)
    
    
    }
    
      else if(count!==100&&gameState===END){
    
        stroke("red");
        fill("black");
        textSize(20);
      text("Oops, It Was Getting Too Much Greedy I Think So :?",30,540);
    
    
      }

  if (keyDown("r")) {
   
    reset();
     }
    

}





function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 130 === 0) {
    var banana = createSprite(600,480,40,10);
    banana.y = random(50,450);
    
    banana.addImage(bananaImg);
    banana.scale = 0.05;
    banana.velocityX = -7;
    
     //assign lifetime to the variable
    banana.lifetime = 280;
    
    //adjust the depth
    
    
    
    //add each cloud to the group
    foodGroup.add(banana);
  }
  
}


function spawnRocks() {
  if(frameCount % 200 === 0) {
    var rock = createSprite(600,565,10,40);
    rock.velocityX = -7
    rock.y=random(60,440);
    rock.addImage(rock_Img)
    
     rock.scale = 0.15;
    rock.lifetime = 270;
    //add each obstacle to the group
   obstacleGroup.add(rock);
    
    
    }
    
              
   
  
}

function reset(){
  gameState = PLAY;
  
 //monkey.velocityY=-13
   
 scene.velocityX =-4;
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();

  count = 0;
  
}


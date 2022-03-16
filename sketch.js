const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;

var tower;
var backgroundImg;

var canon;

var angle;

var mycannonball;
var ground;

var Cannonarray = [];
var boatarray = [];

var boatAnimation= []
var boatSpriteData, boatSpriteSheet

var boxes = [24, 200, "sahil", -35, null, false];
console.log(boxes);
boxes.push(1000, 2000);
boxes.pop();
boxes.pop();
boxes.pop();
boxes.pop();

// var numbers=[[1,2,3],[4,5,6]]
// console.log(numbers[1][1])

function preload() {
  backgroundImg = loadImage("./assets/background.gif");

  boatSpriteData=loadJSON("./assets/boat/boat.json")

  boatSpriteSheet=loadImage("/assets/boat.png")
}

function setup() {
  createCanvas(1000, 600);

  engine = Engine.create();
  world = engine.world;

  tower = new Tower(150, 350, 160, 300);
  ground = new Ground(0, height - 20, width * 2, 5);

  angle = -PI / 4;
  canon = new Cannon(160, 110, 200, 200, angle);

  var boatFrames= boatSpriteData.frames;
  console.log(boatFrames)


  for(var i=0; i <boatFrames.length; i += 1 ){
    var pos=boatFrames[i].position
    console.log(pos)

    var img =boatSpriteSheet.get(pos.x,pos.y,pos.w,pos.h)
    console.log(img)
    boatAnimation.push(img)
  }
  
}

function draw() {
  background(51);
  Engine.update(engine);

  image(backgroundImg, 0, 0, width, height);
  tower.display();
  ground.display();

  canon.display();
  // boat.display()
  // Matter.Body.setVelocity(boat.body,{x:-1,y:0})
  showboats();
  for (var i = 0; i < Cannonarray.length; i += 1) {
    showBalls(Cannonarray[i], i);
  }
}
function keyPressed() {
  if (keyCode === 32) {
    mycannonball = new CannonBall(canon.x, canon.y, 50);
    Cannonarray.push(mycannonball);
    console.log(Cannonarray);
  }
}

function showBalls(ball, index) {
  ball.display();
  if (ball.body.position.x >= width || ball.body.position.y >= height - 80) {
    World.remove(world, ball.body);
    Cannonarray.splice(index, 1);
  }
}
function keyReleased() {
  if (keyCode === 32) {
    Cannonarray[Cannonarray.length - 1].shoot();
  }
}

function showboats() {
  if (boatarray.length > 0) {
    if (
      boatarray.length < 4 &&
      boatarray[boatarray.length - 1].body.position.x < width - 300
    ) {
      var position = [-130, -100, 40, -80];
      var p = random(position);
      boat = new Boat(width, height - 50, 150, 150, p,boatAnimation);
      boatarray.push(boat);
    }

    for (var i = 0; i < boatarray.length; i += 1) {
      boatarray[i].display();
      boatarray[i].animate()
    
      Matter.Body.setVelocity(boatarray[i].body, { x: -1, y: 0 });
    }
  } else {
    boat = new Boat(width, height - 50, 150, 150, -100,boatAnimation);
    boatarray.push(boat);
  }
}

// var number=[2,3,5,7,11,13,17]
// console.log(number.splice(1,3))

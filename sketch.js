var inc = 2
var scl = 100;
var cols, rows;
var zoff = 0;
var flowfield;
var start_time;
var current_time;
var timespan = (2 * 60) * 50;
var weights = [1,1,1,1,2,2,3,3,5,6,10];
var particles = [];
var maxParticles;
var particleColour = 30;
var fr;
var title;
var code;
var p;
let myFont;



function setup() {
  titleFont = loadFont('assets/Nunito/Nunito-Bold.ttf');
  bodyFont = loadFont('assets/Nunito/Nunito-Regular.ttf');
  start_time = millis();
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  cols = floor(width / scl);
  rows = floor(height / scl);
  flowfield = new Array(cols * rows);
  start("setup");
}

function draw() {
  let yoff = 0;


  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(.3);
      flowfield[index] = v;
      xoff += inc
    }
    yoff += inc
    zoff += inc;
  }

  for (i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update(); 
    particles[i].edges();
    particles[i].show();
    
  }

  
  fr = "Frame Rate of " + round(frameRate());
  // p = "Particles " + round(maxParticles);
  title = "Trails";
  code = "0002"
  hud(title,code,p,fr);
 

  current_time = millis();
  if (current_time > start_time + timespan) {
      start();
  }
}

function start(setup) {
  console.log("in start");
  var maxParticles = random(20);
  particles = [];
  start_time = millis();
  strokeWeight(random(weights));
  if (setup != "setup") {
  background(random(360),random(80,100),random(0,10),.4);
  } else { background(0)};
  for (let i = 0;  i < maxParticles; i++) {
    particles[i] = new Particle();
  }
  // fr = "Frame Rate of " + round(frameRate());
  p = round(maxParticles + 1) + " Particles";
  // title = "Trails";
  //code = "0002"
  hud(title,code,p,fr);
  particleColour = random(360);
}

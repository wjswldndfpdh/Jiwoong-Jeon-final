let particles = [];
let particles2 = [];
let t = 0;
let t_plus = 0.002;
var mx, my;
var mode = 0;
let audioStarted = false; // needed to get it to work in full screen mode. Add in the variable section


/*I got the color generation from https://openprocessing.org/sketch/2224315 */
var grad;
let colors1 = "fef9fb-fafdff-ffffff-fcfbf4-f9f8f6"
  .split("-")
  .map((a) => "#" + a);
let colors2 = "8c75ff-ca79d3-db9191-2788f5-9e6ee3-f21252-6ac4ef-c4dd92-184fd3-f9fee2-eacd84-8e00ff-F1E9DA-FFD400-D90368-e9baaa-ffa07a-46b4da-ffe1d0-acd9e7-4596c7-71ef82-e45240-21d3a4-3303f9-cd2220-173df6-e050ba-ffaadd-ff7176"
  .split("-")
  .map((a) => "#" + a);


function setup() {
  createCanvas(windowWidth, windowHeight);
  getAudioContext().suspend();
  splash = new Splash();

  let num = random(200, 400);
  let rec_num = random(10,30);

  for (let i = 0; i < num; i++) {
    particles.push(new lines());
  }
  for (let i = 0; i < rec_num; i++) {
    particles2.push(new rectangles());
  }
}

function draw() {
  if (mouseIsPressed == true) {
    mode = 1;
  }
  if (mode == 1) {
    splash.hide();
    
    background(30);
    translate(windowWidth / 2, windowHeight / 2);
    rotate(t);

    push();
    for (let j = 0; j < particles2.length; j++) {
      particles2[j].create_rec();
      particles2[j].move_rec();
      //translate(width/2, height/2);
      rotate(1);
    }
    pop();

    push();
    for (let i = 0; i < particles.length; i++) {
      particles[i].create_lines();
      particles[i].move_lines();
      //translate(0, 0);
      rotate(0.1);
    }
    pop();

    t = t + t_plus;

    if(t > 5){
      t_plus = t_plus - 0.00001;
    }
    if(t < -5){
      t_plus = t_plus + 0.00001;
    }
    
    
  }
}

class lines {
  constructor() {
    this.line_x1 = random(0, 20);
    this.line_y1 = random(0, 20);
    this.line_x2 = random(0, 20);
    this.line_y2 = random(0, 20);
    // this.x_plus = random(-3, 15);
    // this.y_plus = random(-5, 11);
    this.y_speed = random(-1, 1);
    this.x_speed = random(-0.5, 0.5);

    this.c1 = random(colors1);
    this.c2 = random(colors2);

    this.st = random(0.3, 1.5);
    
    this.att = random(0.05,0.5);
    this.rel = random(0.05,0.5);
      
    this.length = 10;
    
    this.osc2 = new p5.Oscillator("triangle");
    this.osc2.start();
    this.osc2.amp(0);
    
    this.env2 = new p5.Envelope();
    this.env2.setADSR(this.att,0.5,0.1,this.rel);
    this.env2.setRange(0.6, 0.0);
    this.env2.play();
    
    this.rl = randomGaussian(20,500);
    
    this.count = 0;
  }

  create_lines() {
    /*I got the color generation from https://openprocessing.org/sketch/2224315 */
    grad = drawingContext.createLinearGradient(0, -5, 0, 5);
    grad.addColorStop(0, this.c1);
    grad.addColorStop(1, str(this.c2) + "80");
    drawingContext.strokeStyle = grad;

    strokeWeight(this.st);

    //line(this.line_x1, this.line_y1, this.line_x1 + this.x_plus, this.line_y1 + this.y_plus);
    
    line(this.line_x1, this.line_y1, this.line_x2, this.line_y2);
    }
  
  move_lines() {
    
    this.osc2.freq(this.rl);
    
    if (this.line_x1 < 0 || this.line_x1 > windowWidth*1.5){
      this.x_speed *= -1;
      this.count += 1;
      if(this.count%10 == 0){
        this.env2.play(this.osc2);
        this.count = 0;
      }  
    } 
    
    if (this.line_y1 < 0 || this.line_y1 > windowHeight*1.5){
      this.y_speed *= -1;
      this.count += 1;
      if(this.count%10 == 0){
        this.env2.play(this.osc2);
        this.count = 0;
      }
    }
    //print(this.count);

    if (this.line_x2 < -windowWidth*1.5 || this.line_x2 > windowWidth * 1.5){
      this.x_speed *= -1;
    } 
    

    if (this.line_y2 < -windowHeight*1.5 || this.line_y2 > windowHeight * 1.5){
      this.y_speed *= -1;
    } 
  
    this.line_x1 += this.x_speed;
    this.line_y1 += this.y_speed;
    this.line_x2 += this.x_speed;
    this.line_y2 += this.y_speed;
    
  }
}

class rectangles{
  constructor(){
    this.rec_x = random(0,7);
    this.rec_y = random(0,7);
    this.rec_w = random(0.5,6);
    this.rec_h = random(0.5,5);
    this.rx_speed = random(-1,1);
    this.ry_speed = random(-1,1);
    
    this.c1 = random(colors1);
    this.c2 = random(colors2);
    
    this.length = 100;
    
    this.osc = new p5.Oscillator("sine");
    this.osc.start();
    this.osc.amp(0);
    
    
    this.env = new p5.Envelope();
    this.env.setADSR(0.1,0.1,0.1,1);
    this.env.setRange(0.1, 0.0);
    this.env.play();
    
    this.r = randomGaussian(0,400);
    
    this.countr = 0;
  }
  create_rec(){
    grad = drawingContext.createLinearGradient(0, -5, 0, 5);
    grad.addColorStop(0, this.c1);
    grad.addColorStop(1, str(this.c2) + "80");
    drawingContext.strokeStyle = grad;
    
    rect(this.rec_x, this.rec_y, this.rec_w, this.rec_h);
  }
  
  move_rec(){
    if (this.rec_x < -width || this.rec_x > width * 1.5){
      this.rx_speed *= -1;
      this.countr += 1;
    } 

    if (this.rec_y < -height || this.rec_y > height * 1.5){
      this.ry_speed *= -1;
      this.countr += 1;
    } 
    
    this.rec_x += this.rx_speed;
    this.rec_y += this.ry_speed;
    
    // if(dist(this.rec_x, this.rec_y, mouseX, mouseY) < this.length) {
    //   this.rx_speed *= -1;
    //   this.ry_speed *= -1;
    // }
    

    this.osc.freq((this.rec_w*50) + this.r);
    
    if(this.countr > 4){
      this.osc.freq((this.rec_w*50) + this.r + random(-100,100));
    }
    if(this.countr > 7){
      this.osc.freq((this.rec_w*50) + this.r);
      this.countr = 0;
    }
    
    
    
    if(this.rec_x > windowWidth-400 || this.rec_y > windowHeight-400){
      this.env.triggerRelease(this.osc);
    }
    else{
      this.env.triggerAttack(this.osc);
    }
  }
}

function mousePressed() { // needed to get it to work in full screen mode. Add in mousePressed()
    // Start audio on user gesture
    if (!audioStarted) {
        userStartAudio();
        audioStarted = true;
    }
}

class Splash {

 constructor() {
   
  this.splashBorder = 100;
  fill(255);
  //stroke(255, 0, 0)
  rect(this.splashBorder, this.splashBorder, windowWidth-this.splashBorder*2, windowHeight-this.splashBorder*2);
  //fill(0, 0, 222);
  //noStroke()
   
  this.title = createDiv("There is no sound in space");
  this.title.position(this.splashBorder+20, this.splashBorder+20);
  
  this.name = createDiv("Jiwoong Jeon");
  this.name.position(this.splashBorder+20, this.splashBorder+60);
  
  this.info = createDiv("Sound doesn't exist in space only because there are no air molecules that humans' ears can detact. Other being might be able to hear without air molecules.");
  
  this.info.position(this.splashBorder+20, this.splashBorder+100);
  this.info.size(windowWidth-this.splashBorder*2-50, windowHeight-this.splashBorder*2-50)
  
}
 
  hide(){
    this.title.remove()
    this.name.remove()
    this.info.remove()
  }
}


// Global variables
float radius = 100;
int circleCount = 10;
int[] X = new int[circleCount ];
int[] Y = new int[circleCount ];
Circle[] circleArr = new Circle[circleCount];
int nX, nY;
int delay = 1;
in radx=0;
boolean flipflag= false;
float incrementFactor = 0.1;
color c = color(0, 126, 255, 102);

// Setup the Processing Canvas
void setup(){
	size( 950, 500);
	frameRate(10 );
	radx=radius
	randomize();
	stroke(c);
	strokeWeight(3);
	
}

void randomize(){
var count=0;
	 for(count=0;count<circleCount ;count++){
		X[count]=random(width);
		Y[count]=random(height);
		circleArr[count] = new Circle(X[count],Y[count], random( radius ), 0Xffffff,delay);
	}
}


// Main draw loop
void draw(){
background(0);
  color c = color(0, 126, 255, 102);
  color selected = color(0, 250, 150, 102);

	for(int i=0; i< circleCount; i++) {
	float d = dist(circleArr[i].x, circleArr[i].y, nX, nY);
		if(d < circleArr[i].r){
			fill(selected);
		}else{
			fill(circleArr[i].col);
		}
		    circleArr[i].update();
	}
}


// Set circle's next destination
void mouseMoved(){
  nX = mouseX;
  nY = mouseY;  
}

class Circle {
int x,y, r, col;
float speed;

boolean right=false,left=false,up=false,down=false;

 Circle (int x, int y, int radius, int c,float  speed) {
	this.x = x;
	this.y = y;
	this.r = radius;
	this.col = c;
	this.speed=speed;
  } 
  void update() {
  
  if(left){
 	  x-=speed; // left
 	
  }else if( right){
 	  x+=speed; // right
 	 
  }else if(x+(r/2)>width){
      x-=speed;
  }
  
  if(up){
	  y-=speed; // up
	 
  }else if(down){
 	  y+=speed; // down
 	
  }else if(y+ (r/2)>height){
  y--;
  }
  checkCollision();
  checkDirection();
  ellipse( x, y, r, r);
  // rect( x, y, x+10, y+10);  //crazy idea   
  }

  void checkDirection(){
          
	  if(x+(r/2) < width && x-(r/2)>0 && !right){ // left
	 	  left = true;
	 	  right= false;
	  }else if( x-(r/2) < 0 && x+(r/2)<=width && !left){// right
	 	  left = false;
	 	  right= true;
	  }
	    
	  if( y+(r/2) < height && y-(r/2)>0 && !down){ // up
		  up= true;
	 	  down= false;
	  }else if(y- (r/2) < 0  && y+(r/2)<=height && !up){// down
	 	  up= false;
	 	  down= true;
	  }
  }	
  
  void checkCollision(){
   	  if(x-(r/2)<=0){ // left collision
      	  right= true;
      	  left = false;      	        	
      	speed+=incrementFactor;      	
      }else if(x+(r/2)>= width){// right collision
      	  right= false;
      	  left = true;
      	speed+=incrementFactor;      	
      }
      
      if( y-(r/2) <= 0){// up collision
      	up=false;
      	down = true;
      	speed+=incrementFactor;      	
      }else if ( y+(r/2) >= height){ // down collision
      	down=false;
      	up=true;
      	speed+=incrementFactor;      	
      }
  }
}
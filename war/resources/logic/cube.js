// Global variables
int nX,nY;
// Setup the Processing Canvas
void setup(){
	size( 950, 500);
	frameRate(10 );
	
}


// Main draw loop
void draw(){
	background(0);
	drawCube(nX,nY,100,100,15);

}

void mouseMoved(){
  nX = mouseX;
  nY = mouseY;  
}

void drawCube(int x, int y, int h, int w, int depth){
	fill(122,23,34,100);
	rect(x,y,h,w);
	
	rect(x+depth,y+depth,h,w);
	
	stroke(250);
	line(x,y,x+depth,y+depth);
	line(x+w,y+h,x+w+depth,y+h+depth);
	line(x,x+w,x+depth,y+h+depth);
	line(x+w,y,x+w+depth,y+depth);

}

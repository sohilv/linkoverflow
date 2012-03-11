int height = 700;
int width = 950;

PImage b;
ArrayList lines;
void setup(){

	size(width, height);
	frameRate(30);
	smooth();
	b=loadImage("/resources/img/a3.jpg");
	lines = new ArrayList();
	
	PLine p = new PLine(50,50,150,150);	
	lines.add(p);	
	
}


// Main draw loop
void draw(){
	
	background(0);
	//image(b,0,0);
	fill(255);
	
	for(int i=0;i < lines.size(); i++){
		lines.get(i).update();
	}
	
}

class PLine{
	
	int x1,y1,x2,y2;

	PLine(int x1,int y1,int x2, int y2){
	 this.x1=x1;
	 this.x2=x2;
	 this.y1=y1;
	 this.y2=y2;
	}
	
	void draw(){
		ellipse( x1, y1, 7, 7 );
		stroke(223,122,12);		                 
		line(x1,y1,x2,y2);
		ellipse( x2, y2, 7, 7 );                
	}
	
	void update(){
		if(x2<=width)
		x2+=1;
		
		if(y2<=height)
		y2+=1;		
		draw();
	}


}




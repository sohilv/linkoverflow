
int menu_circle_size = 150;
String menu_circle_name="CWC 20XI";
String[] menu_values = {"Venues","Team","Schedule"};
Circle menu_circle;


int team_circle_size = 150;
String team_circle_name="Team";
String[] team_values = {"India","South Africa","England","Bangladesh","West Indies","Netherlands","Ireland","Australia","Pakistan","New Zealand","Sri Lanka","Zimbabwe","Canada","Kenya"};
Circle team_circle;

int sch_circle_size = 150;
String sch_circle_name="Schedule";
String sch_menu_value={"Group A","Group B"};
Circle sch_circle, sch_menu_circle;


int nX,nY;

Circle team_circle;
Circle[] resource_circle;

PFont font,attr_font;
int fontsize = 20;
int attrFont = 16	;
int attrRadiusDelta=1.7;

PImage b;

boolean team_menu=false , sch_menu=false;


void setup(){

	size( 950, 700);
	frameRate(10);
	noStroke();		
	smooth();
	
	rect(0,0,950,500);
	
	font = loadFont("FFScala-32.vlw"); 	
	attr_font= loadFont("FFScala-32.vlw");
	
	b=loadImage("/resources/logic/a3.jpg");
	resource_circle = new Circle[3];
	
	setupResource(team_circle,width/2,height/2,team_circle_size,team_circle_name, team_values,null,1); 
	setupResource(menu_circle,200,height/2,menu_circle_size,menu_circle_name, menu_values,null,2);
		
	
}

void ScheduleData(String[][] schedule){

	setupResource(sch_circle,200,200,sch_circle_size,sch_circle_name, schedule, sch_menu_value,3);

}

void setupResource(Circle c, int x, int y,int size,String resource_name, String[][] values ,String[][] level1_menu , int type ){

	float factor = 0;
	level =1;
	c = new Circle(x,y,size, random(10),resource_name);
	
	if(level1_menu!=null && level1_menu.length>0){
	
		for(int a=0; a < level1_menu.length; a++ ){
				
			attr attribute = new attr( random(255), 0+factor, sin(PI/2)*(factor+ (TWO_PI/level1_menu.length)),c,level1_menu[a],level);
			c.addAttribute(attribute,2);
			factor += TWO_PI/level1_menu.length;
		}
		level++;
	}

	factor = 0;	
	
		// initializing team attribute
	for(int a=0; a < values.length; a++ ){
		var value="";
		if(type==3){
			value = values[a][3]+" v/s "+ values[a][4];
		}else{
			value=values[a];
		}
		attr attribute = new attr( random(255), 0+factor, sin(PI/2)*(factor+ (TWO_PI/values.length)),c,value,level);
		if(level>1)
		attribute.active=false;
		c.addAttribute(attribute,1);
		factor += TWO_PI/values.length;
	}
	
	
	if (type == 1){
		team_circle = c;
		resource_circle[0]=c;
	}else if (type == 2){
		menu_circle = c;
		resource_circle[1]=c;
	}else if (type == 3){
		sch_circle = c;
		resource_circle[2]=c;
	}
}




// Main draw loop
void draw(){
	
	background(0);
	//image(b,0,0);
	fill(255);
	textFont(font, 50);
	text("Cricket World Cup 20XI", 0,50);
	
	menu_circle.update();
	if(team_menu)	{		
		team_circle.update();
	}
	if(sch_menu){
		sch_circle.update();
	}
	
}


void mouseDragged(){
	
}

void mousePressed(){

for(int c =0;c<resource_circle.length;c++){
	 	 if(resource_circle[c].hovering){
				if(!resource_circle[c].dragging)
				{
					resource_circle[c].dragging=true;
				}
				else
				{
					resource_circle[c].dragging=false;
				}
				resource_circle[c].hide();
				resource_circle[c].activate();
								
		}
		resource_circle[c].checkAttributeOnClick();
 	}
}


// Set circle's next destination
void mouseMoved(){
    nX=  mouseX;
	nY= mouseY;
	for(int c =0;c<resource_circle.length;c++){
		if(resource_circle[c].hovering){
				resource_circle[c].hide();
				resource_circle[c].activate();	
				
		}
	 	if(resource_circle[c].dragging){
	 		resource_circle[c].changePosition();
	 	}
	 	
 	}
}



class Circle{
	int x,y, r, col, theta;
	int cr,cg,cb,ca; // Color
	boolean hovering,dragging;
	ArrayList attributesHeading;	
	ArrayList attributes, attr2;	
	String name;
	Circle (int x, int y, int radius, int c,String name) {
		this.x = x;
		this.y = y;
		this.r = radius;
		this.col = c;		
		cr=random(0);
		cg=random(0);
		cb=random(0);
		ca=200;
		attributes = new ArrayList();
		attr2 = new ArrayList();
		this.name=name;
	}
	
	void update(){
	
		for(int a=0; a < attributes.size() ; a++ ){
			attributes.get(a).update();						
		}
		
		for(int a=0; attr2!=null && attr2.size()>0 && a < attr2.size() ; a++ ){
			
			attr2.get(a).update();						
		}
		
		
		
		if(col!=-1){
			fill(cr,cg,cb,ca);
		}else{
			noFill();
		}
		if(isMouseOver()){
			
		}
		ellipse( x, y, r, r);
		fill(255,255,255,ca);
		
		int txt_width=font.width(this.name)*fontsize;
		textFont(font, fontsize);	
		text(this.name, x-txt_width/2, y+10);	
		
								
	}
	
	void addAttribute(attr a, int level){
		switch(level){
		case 1:
			attributes.add(a);
			break;
			
		case 2:
			attr2.add(a);
			break;
			
		}		
	}
	
	void checkAttributeOnClick(){
		for(int a=0; a < attributes.size() ; a++ ){
			if(attributes.get(a).hovering){
				attributes.get(a).onClick();
				break;
			}
		}
		
		for(int a=0; attr2!=null && attr2.size()>0 && a < attr2.size() ; a++ ){
			
				if(attr2.get(a).hovering){
				attr2.get(a).onClick();
				break;
			}					
		}
	}
	
	boolean isMouseOver() {
		float disX = nX - this.x;
		float disY = nY - this.y;
		
		// calculate polar coordinates
		float radius = Math.sqrt(sq(disX)+sq(disY));
		float angle = atan2(disY, disX);
		if (radius <= this.r/2 ) {
			hovering = true;
			return true
		}
		else {
			hovering = false;
			return false;
		}
	}	

	void changePosition(){
	
		if(this.hovering){
		 	this.x=nX;
			this.y=nY;
			for(int a=0; a < attributes.size() ; a++ ){
		
			attributes.get(a).x=nX;						
			attributes.get(a).y=nY;
			}	
		}
	}
	
	void hide(){
		for(int c =0; c < resource_circle.length; c++){
			resource_circle[c].ca=50;
			resource_circle[c].r=50;	
		}
	}
	
	void activate(){
		
		ca=200;
		r=150;					
	}
	
	
}

public class attr{
	int r, col,startangle, stopangle;
	int cr,cg,cb,ca; // Color
	Circle resource;	
	String name;
	boolean hovering,active=true;
	int level = 1;
	
	attr ( int c, int startangle,int stopangle, Circle c, String value, int level) {		
		this.col = c;
		this.startangle=startangle;
		this.stopangle=stopangle;
		cr=random(255);
		cg=random(255);
		cb=random(50);
		
		this.resource = c;
		this.name=value;
		this.level=level;
	}
	
	
	void update(){
	if(active){
	
	if(level>1){
		r = resource.r + resource.r/attrRadiusDelta +50;
	}else{
		r = resource.r + resource.r/attrRadiusDelta;
	}
		ca= resource.ca;
		
		if(col!=-1){			
			fill(cr,cg,cb,ca);
		}else{
			noFill();	
		}
		
		
		float theta = ((this.startangle+this.stopangle) / 2) % TWO_PI-0.04;
		float angle = theta;
		int fWidth=0;
		
		if (theta > PI/2 && theta < (PI+PI/2)+0.04) {
       		fWidth = attr_font.width(this.name) * attrFont;
       		angle += 0.09;
     	} else{
       		fWidth = 0;
		}
		textFont(attr_font, attrFont);
		if(isMouseOver()){			
		
			arc(resource.x, resource.y, r+30, r+30, startangle,stopangle );			
		}else{
		
			arc(resource.x, resource.y, r, r, startangle,stopangle );			
		}
		
		pushMatrix();
		translate(resource.x, resource.y);
     	rotate(angle);		
		pushMatrix();
		translate(r/2+10+fWidth,0);
		pushMatrix();
		if (theta > PI/2 && theta < (PI+PI/2)+0.04) {
         rotate(PI);
       	}
		
		
		text(this.name, 0,0);
		popMatrix();
		popMatrix();
		popMatrix();
			}
	}
	
	boolean isMouseOver() {
		float disX = nX - resource.x;
		float disY = nY - resource.y;
		
		// calculate polar coordinates
		float radius = Math.sqrt(sq(disX)+sq(disY));
		float angle = atan2(disY, disX);
		if (angle<0) angle = TWO_PI+angle; // shift to 0-TWO_PI interval
		
		float start = this.startangle % TWO_PI;
		float stop = this.stopangle % TWO_PI;		
		if (radius >= resource.r/2 && radius <= (resource.r/2)+100 && 
				((angle>start && angle<stop) || (start>stop && (angle > start || angle < stop)))    ) {
			hovering = true;						
			return true
		}
		else {
			hovering = false;
			return false;
		}
	}
	
	 void onClick(){
	 	
	 	
	 	if(name == menu_values[1]){
	 	resource.hide();
	 		team_menu=true;
	 		team_circle.activate();	 
	 				
	 	}else if(name == menu_values[2]){
	 	resource.hide();
	 		sch_menu=true;
	 		sch_circle.activate();	
	 		
	 	}else if(name == menu_values[0]){
	 	resource.hide();
	 		//openOverlay();
	 	}else if(name == sch_menu_value[0] || name == sch_menu_value[1]){	 		
	 		enableAttributes(startangle,stopangle);
	 		filterSchedule(1,name);
	 	}
	 	
	 	  	 	
	 }
	 
	 void enableAttributes(int start_angle,int stop_angle){
	 	
	 	for(int a=0; a < resource.attributes.size() ; a++ ){
			
			if(resource.attributes.get(a).startangle >= start_angle){
			
					resource.attributes.get(a).active=true;
			}else{
					resource.attributes.get(a).active=false;
			}
			 						
		}
		
	 }	
}

var people = [];
var roles = ["shaper", "coordinator","plant","resource investigator","monitor evaluator","implementer","team worker","completer finisher"];
function preload() {
  var url = 'https://spreadsheets.google.com/feeds/list/1egXUZsXLajj-Lh9ggNyWth2qP-FoVypV85hsMvzix5c/od6/public/values?alt=json';
  belbin = loadJSON(url);
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	fill('#555');
	rect(0,0,windowWidth, windowHeight);
	

	// Parse JSON
	for(var x = 0; x < belbin.feed.entry.length; x++)
  	{
  		var cntnt = belbin.feed.entry[x].content.$t;
  		if(x % 2 === 0){
  			var col = color(220-15*x,220,20*x);
  		}
  		else{
  			var col = color(220,15*x,220-20*x);
  		}
  		
	  	var person = {
	  		name: belbin.feed.entry[x].title.$t,
	  		values: [parseInt(cntnt.substring(cntnt.indexOf('sh: ') + 4, cntnt.indexOf('co: ')-2)),parseInt(cntnt.substring(cntnt.indexOf('co: ') + 4, cntnt.indexOf('pl: ')-2)),parseInt(cntnt.substring(cntnt.indexOf('pl: ') + 4, cntnt.indexOf('ri: ')-2)),parseInt(cntnt.substring(cntnt.indexOf('ri: ') + 4, cntnt.indexOf('me: ')-2)),parseInt(cntnt.substring(cntnt.indexOf('me: ') + 4, cntnt.indexOf('im: ')-2)),parseInt(cntnt.substring(cntnt.indexOf('im: ') + 4, cntnt.indexOf('tw: ')-2)),parseInt(cntnt.substring(cntnt.indexOf('tw: ') + 4, cntnt.indexOf('cf: ')-2)),parseInt(cntnt.substring(cntnt.indexOf('cf: ') + 4, cntnt.length))],
	  		color: col
	  	};
	  	people[x] = person;
  	}
}

function draw() {
	var hovered = "none";
	fill('#555');
	rect(0,0,windowWidth, windowHeight);
	// Sidebar
	fill('#333');
	noStroke();
	rect(0,0,windowWidth/4,windowHeight);

	// Font
	textSize(24);
  	textFont("Cutive Mono");
  	textAlign(LEFT);

  	push();
  	textAlign(RIGHT);
  	textSize(32);
  	fill(255);
  	text("?",windowWidth-28,windowHeight-28);
  	pop();

  	for(var x = 0; x < people.length; x++){
  		fill(people[x].color);
  		text(people[x].name, 72, 72 + x*44);
  		if(mouseX > 72 && mouseX < 200)
  		{
  			if(mouseY > 60+x*44 && mouseY < 60+x*44+50){
  				hovered = people[x].name;
  				makeSpider(x);
  				rect(72, 76 + x*44,120,2,1);
  			}
  		}
  	}

  	if(hovered === "none"){
  		drawGraphAxis();
  		drawGraph(60 + (windowHeight - 216)/2,0);
  		drawGraph(60 +72 + (windowHeight - 216),6);
  	}
  	

}

function mousePressed() {
	if(mouseX > windowWidth - 48 && mouseY > windowHeight - 48){
		window.open('https://drive.google.com/file/d/0Bzz4DLZxh6ywaGE2WG4wRHhDOVU/view', '_blank');
	}
}

function drawGraphAxis() {
	noStroke();
	fill('#rgba(100%, 100%, 100%, 0.3)');

	rect(windowWidth/4 + 60, 60, 1, (windowHeight - 216)/2,1);
	rect(windowWidth/4 + 60, 60 + (windowHeight - 216)/2, windowWidth/1.5+2, 1,1);

	rect(windowWidth/4 + 60, 60+ 72+ (windowHeight - 216)/2, 1, (windowHeight - 216)/2,1);
	rect(windowWidth/4 + 60, 60 +72 + (windowHeight - 216), windowWidth/1.5+2, 1,1)

	fill("#FFF");
	textSize(12);
	textAlign(CENTER);
	for(var x = 0; x < roles.length; x++){
		text(roles[x],windowWidth/4 + 60 + x * windowWidth/12, 60 + (windowHeight - 216)/2+20,windowWidth/12);
		text(roles[x],windowWidth/4 + 60 + x * windowWidth/12, 60 +72 + (windowHeight - 216)+20,windowWidth/12);
	}
}

function drawGraph(startY, p1){
	noStroke();
	var h = [0,0,0,0,0,0,0,0];
	var unit = (windowHeight - 216)/240;

	for(var x = 0; x < 8; x++){
		for(var y = 0; y < 8; y++){
			fill(people[x + p1].color);
			rect(y * windowWidth/12 + windowWidth/4 + 61,
				h[y]+startY,
				windowWidth/12,
				-people[x + p1].values[y]*unit);
			h[y] -= people[x + p1].values[y]*unit;
		}
	}
}

function makeSpider(pIndex){
	var centerX = windowWidth*3/8 + windowWidth/4;
	var radius = windowWidth/6;
	push();
	beginShape();
	stroke('rgba(100%, 100%, 100%, 0.5)');
	strokeWeight(2);
	angleMode(DEGREES);
	for(var x =0; x < 8;x++){
		vertex(centerX+radius*cos(45*x),windowHeight/2+radius*sin(45*x));
	}
	endShape(CLOSE);
	pop();

	push();
	strokeWeight(1);
	stroke('rgba(100%, 100%, 100%, 0.5)');
	for(var x =0; x < 8;x++){
		line(centerX,windowHeight/2,centerX+radius*cos(45*x),windowHeight/2+radius*sin(45*x));
	}
	pop();

	for(var x = 0; x < roles.length;x++){
		push();
		fill("#FFF");
		textAlign(CENTER);
		textSize(16);
		text(roles[x],centerX+radius*cos(45*x),windowHeight/2+radius*sin(45*x));
		pop();
	}
	push();
	fill('rgba(100%, 100%, 100%, 0.3)');
	strokeWeight(3);
	stroke('#FFF');
	angleMode(DEGREES);
	beginShape();
	for(var x =0; x < 8;x++){
		var multiplier = people[pIndex].values[x]/35;
		vertex(centerX+multiplier*radius*cos(45*x),windowHeight/2+multiplier*radius*sin(45*x));
	}
	endShape(CLOSE);
	pop();

	push();
	for(var x =0; x < 8;x++){
		var multiplier = people[pIndex].values[x]/35;
		push();
		fill('#FFF')
		strokeWeight(3);
		stroke(people[pIndex].color);
		textAlign(CENTER);
		textSize(20);
		text(people[pIndex].values[x],centerX+multiplier*radius*cos(45*x),windowHeight/2+multiplier*radius*sin(45*x)-6);
		pop();
	}
	pop();


}
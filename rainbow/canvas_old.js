var canvas = document.querySelector("canvas");
var wW = window.innerWidth;
var wH = window.innerHeight;
canvas.width = wW;
canvas.height = wH;
var c = canvas.getContext("2d");

var mouse = {
	x: undefined,
	y: undefined
}
window.addEventListener("mousemove",function(event) {
	mouse.x = event.x;
	mouse.y = event.y;
})

function Circle (x,y,vx,vy,r) {
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.r = r;

	this.red = 50;
	this.green = 50;
	this.blue = 50;
	this.vred = 5;
	this.vgreen = 5;
	this.vblue = 5;

	this.update = function() {
		this.x += this.vx;
		this.y += this.vy;

		if (mouse.x-this.x>-dr && mouse.x-this.x<dr && mouse.y-this.y>-dr && mouse.y-this.y<dr) {
			if(this.r<maxr) {this.r++;}
		}	else	{
			if(this.r>minr) {this.r--;}
		}


		if(this.x-this.r < 0 || this.x+this.r > wW) {
			this.vx = -this.vx
		}
		if(this.y-this.r < 0 || this.y+this.r > wH) {
			this.vy = -this.vy
		}

		if(this.red < 50 || this.red > 200) {this.vred = -this.vred}
		if(this.green < 50 || this.green > 200) {this.vgreen = -this.vgreen}
		if(this.blue < 50 || this.blue > 200) {this.vblue = -this.vblue}
		this.red += Math.random()*this.vred;
		this.green += Math.random()*this.vgreen;
		this.blue += Math.random()*this.vblue;
	}

	this.draw = function() {
		c.beginPath();
		c.arc(this.x,this.y,this.r,0,Math.PI * 2,false);
		c.strokeStyle = "rgba(0,0,0,0)";
		c.stroke();
		c.fillStyle = "rgba("+Math.round(this.red)+", "+Math.round(this.green)+", "+Math.round(this.blue)+", 0.5)";
		c.fill();
	}
}

var minr = 10;
var maxr = 75
var dr = 75;
var circles = [];
for(var i=0; i<300; i++) {
	var r = 30;
	var x = r+Math.random()*(wW-2*r);
	var y = r+Math.random()*(wH-2*r);
	var vx = (Math.random()-0.5)*5;
	var vy = (Math.random()-0.5)*5;
	circles.push(new Circle(x,y,vx,vy,r));
}

function animate() {
	requestAnimationFrame(animate);
	c.fillStyle = "rgba(0,0,0,0.05)"
	c.fillRect(0,0,wW,wH);


	for(var i=0; i<circles.length; i++) {
	circles[i].update();
	circles[i].draw();
	}
}
animate();
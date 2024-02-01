let sun;
let planets = [];
let music;
let camera;
let zoom = 0.4;
let showOrbits = true;

let canvas, ctx;

let stars;

function preload() {
	music = loadSound("assets/space.mp3");
}

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	ctx = canvas.elt.getContext("2d");

	angleMode(DEGREES);

	camera = createVector(0, 0);

	// realistic mass of the sun scaled down
	sun = new Body(400, createVector(-600, 0), color(255, 200, 40));
	Planet(20, createVector(-150, 0), color(180, 180, 0, 255));
	Planet(40, createVector(150, 0), color(0, 0, 180, 255));
	Planet(100, createVector(600, 0), color(120, 40, 60, 255));

	stars = createGraphics(width, height);
	stars.pixelDensity(1);

	stars.background(0);
	stars.noStroke();
	stars.fill(255, 255, 255, random(1, 255));
	for(let i = 0; i < 10000; i++) {
		let radius = random(0.5, 2);
		stars.ellipse(random(-width, width), random(-height, height), radius, radius);
	}
}

function mousePressed() {
	const mouse = createVector(mouseX, mouseY);
	mouse.div(zoom);
	mouse.sub(camera.copy());

	if(!music.isPlaying()) {
		music.setVolume(0.2);
		music.loop();
	}

	if(mouseButton === LEFT) {
		// console.log(`mouseX: ${mouse.x}, mouseY: ${mouse.y}`);
		// console.log(`cameraX: ${camera.x}, cameraY: ${camera.y}`);
	}
}

function mouseDragged(dragEvent) {
	camera.x += dragEvent.movementX/zoom;
	camera.y += dragEvent.movementY/zoom;
}

function mouseWheel(event) {
	zoom += (-event.deltaY * 0.001);
	if(zoom < 0.1) {
		zoom = 0.1;
	}

	if(zoom > 2) {
		zoom = 2;
	}
}

function keyPressed() {
	console.log(key);
	if(key === "`") {
		showOrbits = !showOrbits;
	}
}

let tick = 0;
function draw() {
	tick++;

	background(0);
	noStroke();

	image(stars, 0, 0, width, height);

	translate(width/2, height/2);
	scale(zoom);
	translate(camera.x, camera.y);


	sun.update();
	sun.draw();

	for(let i = 0; i < planets.length; i++) {
		planets[i].update();
		planets[i].draw();
	}

}

function Body(_mass, _position, _color) {
	this.mass = _mass || 1;
	this.position = _position || createVector(0, 0);
	this.color = _color || color(random(255), random(255), random(255));
	this.radius = this.mass;

	this.draw = function() {
		noStroke();
		fill(this.color);
		ellipse(this.position.x, this.position.y, this.radius, this.radius);
	}

	this.update = function() {}
}


function Planet(_radius, _position, _color) {
	const planet = new Body(_radius, _position, _color);
	planets.push(planet);
}


function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function optimizedHitTest(position, radius, otherPosition, otherRadius) {
	const distance = position.dist(otherPosition);
	return distance < radius + otherRadius;
}
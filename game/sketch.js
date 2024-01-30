const GRAVITY = 100;

let sun, planet;

let planets = [];

let music;

function setup() {
	music = loadSound("assets/space.mp3");

	createCanvas(windowWidth, windowHeight);
	frameRate(60);

	angleMode(DEGREES);

	// realistic mass of the sun scaled down
	sun = new Body(100, createVector(0, 0), createVector(0, 0), color(80, 20, 40));

	Player();
}

function mousePressed() {
	if(music.isPlaying()) {
		music.pause();
		return;
	}

	if(music.isPaused()) {
		music.play();
		return;
	}

	music.setVolume(0.2);
	music.loop();
}

let fader = 0;
let faderDir = 1;
let tick = 0;
function draw() {
	tick++;

	translate(width / 2, height / 2);
	background(10);

	sun.update();
	sun.draw();

	// fake bloom around the sun using a gradient
	noStroke();
	for(let i = 0; i < 4; i++) {
		fill(color(80, 20, 40, 100 + (i * fader)));
		ellipse(sun.position.x, sun.position.y, sun.r + i * 10, sun.r + i * 10);
	}

	if(tick % 3 === 0) {
		fader += faderDir;
	}

	if(fader > 25 || fader < 0) {
		faderDir *= -1;
	}


	for(let i = 0; i < planets.length; i++) {
		planets[i].update();
		planets[i].draw();
	}

	fill(color(255));
	textSize(20);
	textAlign("center");

	if(tick < 300) {
		text("You are in orbit around a dying star.", 0, height / 2 - 40);
	} else if(tick < 600) {
		text("Your home is gone, lost to the solar winds.", 0, height / 2 - 40);
	} else if(tick < 900) {
	} else if(tick < 2000) {
		text("Will you save your species? Or will fate lead you to ruin?", 0, height / 2 - 40);
	}
}

function Body(_mass, _position, _velocity, _color) {
	this.mass = _mass;
	this.position = _position;
	this.velocity = _velocity;
	this.r = this.mass;
	this.color = _color || color(random(255), random(255), random(255));

	this.draw = function() {
		if(this.origin) {
			stroke(color(255, 255, 255, 100));
			strokeWeight(2);
			noFill();
			// draw the orbit based on the velocity
			const width = (this.distance.x + this.velocity.x) * 2;
			const height = (this.distance.y + this.velocity.y) * 2;
			ellipse(this.origin.x, this.origin.y, width, height);
		}

		noStroke();
		fill(this.color);
		ellipse(this.position.x, this.position.y, this.r, this.r);
	}

	this.update = function() {
	}
}

function Player() {

	const radius = 20;
	let angle = random(360);

	const velocity = createVector(100, 100);
	const position = createVector(cos(angle) * velocity.x, sin(angle) * velocity.y);

	const _color = color(0, 100, 255);
	const player = new Body(radius, position, velocity, _color);
	player.origin = sun.position;
	player.distance = createVector(100, 50);

	player.update = function() {
		const x = player.origin.x + (player.distance.x + velocity.x) * cos(angle);
		const y = player.origin.y + (player.distance.y + velocity.y) * sin(angle);

		this.position.x = x;
		this.position.y = y;

		angle += velocity.mag() / (100 * deltaTime);
	}

	planets.push(player);
}


function Planet() {

	const radius = random(5, 30);
	let angle = random(360);


	const velocity = createVector(random(30, 400), random(30, 400));
	const position = createVector(cos(angle) * velocity.x, sin(angle) * velocity.y);

	const _color = color(random(255), random(255), random(255));
	const planet = new Body(radius, position, velocity, _color);
	planet.origin = createVector(random(-10, 10), random(-10, 10));

	planet.update = function() {
		const x = planet.origin.x + (velocity.x) * cos(angle);
		const y = planet.origin.y + (velocity.y) * sin(angle);

		this.position.x = x;
		this.position.y = y;

		angle += velocity.mag() / 100 / deltaTime;
	}

	planets.push(planet);
}


function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
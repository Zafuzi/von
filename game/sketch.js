let sun;
let player;
let planets = [];
let music;
let camera;
let zoom = 0.4;

let selectedPlanet = null;
let showOrbits = true;

function setup() {
	music = loadSound("assets/space.mp3");

	createCanvas(windowWidth, windowHeight);

	angleMode(DEGREES);

	camera = createVector(0, 0);

	// realistic mass of the sun scaled down
	sun = new Body(100, createVector(0, 0), createVector(0, 0), color(80, 20, 40));

	Player();
	Planet(20, createVector(100, 100), color(180, 180, 180, 255), player.position);
}

function mousePressed() {
	const mouse = createVector(mouseX, mouseY);
	const origin = createVector(width/2, height/2);
	mouse.sub(origin.copy());
	mouse.div(zoom);
	mouse.sub(camera.copy());

	if(!music.isPlaying()) {
		music.setVolume(0.2);
		music.loop();
	}

	if(mouseButton === LEFT) {
		// console.log(`mouseX: ${mouse.x}, mouseY: ${mouse.y}`);
		// console.log(`cameraX: ${camera.x}, cameraY: ${camera.y}`);

		selectedPlanet = null;
		for(let i = 0; i < planets.length; i++) {
			const planet = planets[i];
			if(optimizedHitTest(planet.position, planet.r, mouse, 0)) {
				selectedPlanet = planet;
				break;
			}
		}

		if(!selectedPlanet) {
			if(optimizedHitTest(sun.position, sun.r, mouse, 0)) {
				selectedPlanet = sun;
			}
		}

		if(!selectedPlanet) {
			if(optimizedHitTest(player.position, player.r, mouse, 0)) {
				selectedPlanet = player;
			}
		}
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

	clear();

	fill(color(255));
	noStroke();
	textSize(20);
	textAlign("center");


	if(tick < 300) {
		text("You are in orbit around a dying star.", width/2, height - 40);
	} else if(tick < 600) {
		text("Your home is gone, lost to the solar winds.", width/2, height - 40);
	} else if(tick < 900) {
	} else if(tick < 2000) {
		text("Will you save your species? Or will fate lead you to ruin?", width/2, height - 40);
	}

	translate(width / 2, height / 2);
	scale(zoom);
	translate(camera.x, camera.y);

	if(selectedPlanet) {
		stroke(color(200, 200, 255, 255));
		fill(color(200, 200, 255, 10));
		circle(selectedPlanet.position.x, selectedPlanet.position.y, selectedPlanet.r * 2);
	}

	sun.update();
	sun.draw();

	for(let i = 0; i < planets.length; i++) {
		planets[i].update();
		planets[i].draw();
	}

}

function Body(_mass, _position, _velocity, _color) {
	this.mass = _mass;
	this.position = _position;
	this.velocity = _velocity;
	this.r = this.mass;
	this.color = _color || color(random(255), random(255), random(255));

	this.draw = function() {
		if(this.origin && showOrbits) {
			stroke(this.color.levels[0], this.color.levels[1], this.color.levels[2], 100);
			strokeWeight(2 / zoom);
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

	const radius = 40;
	let angle = random(360);

	const velocity = createVector(100, 100);
	const position = createVector(cos(angle) * velocity.x, sin(angle) * velocity.y);

	const _color = color(0, 100, 255);
	player = new Body(radius, position, velocity, _color);
	player.origin = sun.position;
	player.distance = createVector(500, 500);

	player.update = function() {
		const x = player.origin.x + (player.distance.x + velocity.x) * cos(angle);
		const y = player.origin.y + (player.distance.y + velocity.y) * sin(angle);

		this.position.x = x;
		this.position.y = y;

		angle += 0.5 / deltaTime;
	}

	planets.push(player);
}


function Planet(radius, distance, _color, _origin, _speed) {
	let angle = random(360);

	const velocity = createVector(100, 100);
	const position = createVector(cos(angle) * velocity.x, sin(angle) * velocity.y);

	_color = _color || color(random(255), random(255), random(255));
	const planet = new Body(radius, position, velocity, _color);
	planet.origin = _origin || createVector(random(-10, 10), random(-10, 10));
	planet.distance = distance;

	planet.update = function() {
		const x = planet.origin.x + (distance.x + velocity.x) * cos(angle);
		const y = planet.origin.y + (distance.x + velocity.y) * sin(angle);

		this.position.x = x;
		this.position.y = y;

		angle += _speed || 10 / deltaTime;
	}

	planets.push(planet);
}


function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function optimizedHitTest(position, radius, otherPosition, otherRadius) {
	const distance = position.dist(otherPosition);
	return distance < radius + otherRadius;
}
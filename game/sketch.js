let sun;
let planets = [];
let music;
let camera;
let zoom = 1.2;
let showOrbits = true;

let canvas, ctx;

let stars;

function preload() {
	music = loadSound("assets/space.mp3");
}

class Sun extends Thing {
	constructor(_position) {
		super(_position);
		this.radius = 300;
		this.color = color(255, 200, 40);
		this.components.push(new cSimpleDraw(this));
	}
}

class Planet extends Thing {
	stations = new System();
	constructor(_position, _radius, _color) {
		super(_position);
		this.radius = _radius || 40;
		this.color = _color || color(random(255), random(255), random(255), 255);
		this.components.push(new cSimpleDraw(this));
	}

	update() {
		super.update();
		this.stations.update();
	}

	draw() {
		super.draw();
		this.stations.draw();
	}

	addStation(_stationName) {
		// _position is relative to the planet
		const newPos = this.position.copy();
		newPos.y += 100;

		// add to y the number of stations * station radius
		newPos.y += (this.stations.things.length * 40) * 2;

		const newStation = new Station(newPos, _stationName);
		this.stations.add(newStation);
	}
}

class Station extends Thing {
	selected = false;
	radius = 20;
	color = color(255, 255, 255);
	components = [];
	name = "Station";

	constructor(_position, _name) {
		super(_position);
		this.name = _name || this.name;
		this.components.push(new cSimpleDraw(this));
		this.components.push(new cPointHit(this));
	}

	draw() {
		super.draw();
		textAlign(CENTER, CENTER);
		fill(255);
		text(this.name, this.position.x, this.position.y + this.radius*2);

		if(this.selected) {
			// 0074c7
			fill(0, 74, 199, 100);
			ellipse(this.position.x, this.position.y, this.radius*3, this.radius*3);
		}
	}
}

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	ctx = canvas.elt.getContext("2d");

	camera = createVector(200, 100);

	planets = new System();

	sun = new Sun(createVector(-600, -200));

	const kargnix = new Planet(createVector(-300, -200), 42, color(255, 80, 40));
	kargnix.addStation("Kargnix Station 1");
	planets.add(kargnix);

	const bunglax = new Planet(createVector(-150, -200), 69, color(40, 80, 255));
	bunglax.addStation("Bunglax Station 1");
	bunglax.addStation("Bunglax Station 2");
	bunglax.addStation("Bunglax Station 3");
	planets.add(bunglax);

	const evertrench = new Planet(createVector(50, -200), 101, color(40, 255, 80));
	evertrench.addStation("Evertrench Station 1");
	evertrench.addStation("Evertrench Station 2");
	planets.add(evertrench);

	const zorblax = new Planet(createVector(200, -200), 50, color(255, 255, 40));
	zorblax.addStation("Zorblax Station 1");
	planets.add(zorblax);

	generateStars();
}

function mousePressed() {
	const mouse = createVector(mouseX, mouseY);
	mouse.div(zoom);
	mouse.sub(camera.copy());

	if (!music.isPlaying()) {
		music.setVolume(0.2);
		music.loop();
	}

	if (mouseButton === LEFT) {
		mouseClickPosition = createVector(mouseX, mouseY);
		mouseClickPosition.sub(width / 2, height / 2);
		mouseClickPosition.div(zoom);
		mouseClickPosition.sub(camera.copy());
		// console.log(`mouseX: ${mouse.x}, mouseY: ${mouse.y}`);
		// console.log(`cameraX: ${camera.x}, cameraY: ${camera.y}`);
	}
}

function mouseReleased() {
	mouseClickPosition = null;
}

function mouseDragged(dragEvent) {
	camera.x += dragEvent.movementX / zoom;
	camera.y += dragEvent.movementY / zoom;
}

function mouseWheel(event) {
	zoom += (-event.deltaY * 0.001);
	if (zoom < 0.1) {
		zoom = 0.1;
	}

	if (zoom > 2) {
		zoom = 2;
	}
}

function keyPressed() {
	console.log(key);
	if (key === "`") {
		showOrbits = !showOrbits;
	}
}

let tick = 0;

function draw() {
	tick++;

	background(0);
	noStroke();

	image(stars, 0, 0, width, height);

	translate(width / 2, height / 2);
	scale(zoom);
	translate(camera.x, camera.y);

	sun.update();
	sun.draw();

	planets.update();
	planets.draw();
}

function generateStars() {
	stars = createGraphics(width, height);
	stars.pixelDensity(1);

	stars.background(0);
	stars.noStroke();
	for (let i = 0; i < 10000; i++) {
		let radius = random(0.1, 3);
		stars.fill(random(200, 255), random(200, 255), random(200, 255), random(10, 255));
		stars.ellipse(random(-width, width), random(-height, height), radius, radius);
	}
}


function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	generateStars();
}

class Thing {
	position = createVector(0, 0);
	alive = true;
	components = [];

	constructor(_position, _alive) {
		this.position = _position || this.position;
		this.alive = _alive || this.alive;
	}

	update() {
		if (!this.alive) {
			return;
		}

		for (let i = 0; i < this.components.length; i++) {
			this.components[i].update();
		}
	}

	draw() {
		if (!this.alive) {
			return;
		}

		for (let i = 0; i < this.components.length; i++) {
			this.components[i].draw();
		}
	}

	kill() {
		this.alive = false;
	}
}

class Component {
	thing = null;

	/**
	 * Setups a new component
	 * @param _thing {Object<Thing>}
	 * @param _update {Function} @optional
	 * @param _draw {Function} @optional
	 */
	constructor(_thing, _update = null, _draw = null) {
		this.thing = _thing;
		if (_update) {
			this.update = _update;
		}

		if (_draw) {
			this.draw = _draw;
		}
	}

	update() {
		if(!this.thing?.alive) {
			return false;
		}
	}

	draw() {
		if(!this.thing?.alive) {
			return false;
		}
	}
}

class cSimpleDraw extends Component {
	draw() {
		noStroke();
		fill(this.thing.color || 255);
		ellipse(this.thing.position.x, this.thing.position.y, this.thing.radius || 25, this.thing.radius || 25);
	}
}

let mouseClickPosition = null;
class cPointHit extends Component {
	constructor(_thing) {
		super(_thing);
	}
	update() {
		super.update();

		if(!mouseClickPosition) {
			return false;
		}

		this.thing.selected = isPointInCircle(mouseClickPosition, this.thing);
	}
}

class System {
	things = []

	update() {
		for (let i = 0; i < this.things.length; i++) {
			this.things[i].update();
		}
	}

	draw() {
		for (let i = 0; i < this.things.length; i++) {
			this.things[i].draw();
		}
	}

	add(thing) {
		this.things.push(thing);
	}
}

function isPointInCircle(point, circle) {
	const distance = Math.floor(point.dist(circle.position));
	return distance < circle.radius;
}

function optimizedHitTest(position, radius, otherPosition, otherRadius) {
	const distance = position.dist(otherPosition);
	return distance < radius + otherRadius;
}

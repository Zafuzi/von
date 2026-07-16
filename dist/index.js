"use strict";

const station_1 = {
	name: "Station 1",
	location: [1_500_000, 1_500_000]
}

const station_2 = {
	name: "Station 2",
	location: [384_400, -100_000]
}

const planet_1 = {
	name: "Planet 1",
	location: [0, 0],
	stations: [station_1]
}

const Player = {
	location: [0, 0],
	travelling_to: null,
	docked_to: planet_1,
	started_travel: null,
	travel_rate: 100,
	travelling: false,

	undock() {
		Player.docked_to = null;
	},

	dock() {
		Player.docked_to = Player.travelling_to;
		Player.travelling_to = null;
	},

	stop() {
		Player.travelling = false;
	},

	travelTo(stellar_object) {
		Player.undock();
		Player.started_travel = Date.now();
		Player.travelling_to = stellar_object
		Player.travelling = true;
		console.log("Travelling to", stellar_object.name);
	},

	takeStep() {
		if (Player.dockedTo) {
			Player.undock();
		};

		if (!Player.travelling_to) return;

		if (!Player.travelling) return;

		const delta = (Date.now() - Player.started_travel) / 100;

		const distance_to_taget = math.distance(Player.location, Player.travelling_to.location);

		const distX = Player.location[0] - Player.travelling_to.location[0];
		const dirX = Math.sign(distX);

		const distY = Player.location[1] - Player.travelling_to.location[1];
		const dirY = Math.sign(distY);

		if (distance_to_taget === 0) {
			console.log("Arrived");
			Player.dock();
		};

		// calculate step to take
		Player.location[0] -= (dirX * Player.travel_rate);
		Player.location[1] -= (dirY * Player.travel_rate);
	}
}

let t = 0;
const player_info = document.querySelector("#player_info");
function updatePlayerInfo() {
	player_info.innerHTML = `
	<p>Location: ${Player.location}</b></p>
	<p>Travelling: ${Player.travelling}</b></p>
	<p>Travelling To: ${Player.travelling_to?.name}</b></p>
	<p>Docked At: ${Player.docked_to?.name}</b></p>
	`;
}

function loop() {
	t++;
	Player.takeStep();
	if (t % 100 == 0) {
		updatePlayerInfo();
	}

	requestAnimationFrame(loop);
}

const location_map = {
	"planet1": planet_1,
	"station1": station_1,
	"station2": station_2,
}

const stop_travel_button = document.querySelector("#stop_travel");
stop_travel_button.addEventListener("click", () => {
	Player.stop();
});

document.querySelectorAll(".travel").forEach(travelButton => {
	travelButton.addEventListener("click", () => {
		const location = travelButton.dataset.location;

		const lookup_result = location_map[location];
		if (lookup_result) {
			Player.travelTo(lookup_result);
		}
	})
})

loop();
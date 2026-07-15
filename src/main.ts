import { IP } from "./components/InformationPanel";
import { Commodity, Planet, Star, Station } from "./components/Stellar";
import { Vector } from "./lib";
import { setupScroller } from "./scroller";
import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  const Sol = new Star({ name: "Sol", size: new Vector({ x: 176, y: 176 }), color: "yellow" });

  new Planet({ name: "Venus", size: new Vector({ x: 44, y: 44 }), color: "white" });
  new Planet({ name: "Mercury", size: new Vector({ x: 44, y: 44 }), color: "white" });
  const earth = new Planet({ name: "Earth", size: new Vector({ x: 88, y: 88 }), color: "blue" });
  new Planet({ name: "Mars", size: new Vector({ x: 67, y: 67 }), color: "white" });
  new Planet({ name: "Jupiter", size: new Vector({ x: 146, y: 146 }), color: "white" });
  new Planet({ name: "Saturn", size: new Vector({ x: 100, y: 100 }), color: "white" });
  new Planet({ name: "Uranus", size: new Vector({ x: 77, y: 77 }), color: "white" });
  new Planet({ name: "Neptune", size: new Vector({ x: 88, y: 88 }), color: "white" });
  new Planet({ name: "Pluto", size: new Vector({ x: 44, y: 44 }), color: "white" });

  new Station(
    {
      name: "A Station",
      size: new Vector({ x: 44, y: 44 }),
      parent: earth,
      color: "green",
    },
    [
      new Commodity({
        name: "water",
        amount: 1_000,
      }),
      new Commodity({
        name: "food",
        amount: 500,
      }),
    ],
  );

  new Station(
    {
      name: "B Station",
      size: new Vector({ x: 44, y: 44 }),
      parent: earth,
      color: "green",
    },
    [
      new Commodity({
        name: "iron",
        amount: 10_000,
      }),
      new Commodity({
        name: "gold",
        amount: 2_000,
      }),
    ],
  );

  IP.entity = Sol;

  setupScroller();
});

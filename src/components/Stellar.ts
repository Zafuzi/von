import { Vector } from "../lib";
import { IP } from "./InformationPanel";

interface StellarProps {
  size: Vector;
  name: string;
  color?: string;
  parent?: Stellar;
}

// Data
export class Stellar {
  public static stellar_ids_enumerator = 0;
  public size = new Vector();
  public name: string = "Stellar Body";
  public id: number = Stellar.mkid();
  public stations: Station[] = [];
  public element: HTMLElement;
  public parent?: Stellar;
  public color = "white";

  constructor(props: StellarProps) {
    const { size, name, color, parent } = props;

    this.size = size;
    this.name = name;
    this.color = color ?? "white";
    this.parent = parent;

    this.element = document.createElement("div");
    this.element.classList.add("stellar", this.color);

    this.element.style.width = `${this.size.x}px`;
    this.element.style.height = `${this.size.y}px`;

    this.element.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      IP.entity = this;
      IP.open();
    });

    this.render();

    if (!this.parent) {
      document.querySelector("#game_canvas_scroll")?.append(this.element);
    } else {
      this.parent.element.appendChild(this.element);
    }
  }

  public static mkid() {
    return this.stellar_ids_enumerator++;
  }

  render() {}
}

export class Star extends Stellar {
  constructor(props: StellarProps) {
    super(props);
    this.element.classList.add("star");
  }
}

export class Planet extends Stellar {
  constructor(props: StellarProps) {
    super(props);
    this.element.classList.add("planet");
  }
}

export class Station extends Stellar {
  public commodities: Commodity[];
  constructor(props: StellarProps, commodities?: Commodity[]) {
    super(props);

    this.element.classList.add("station");
    this.commodities = commodities ?? [];
    this.parent?.stations.push(this);
  }
}

interface CommmodityProps {
  name: string;
  amount: number;
}
export class Commodity {
  public name: string;
  public amount: number;

  constructor(props: CommmodityProps) {
    this.name = props.name ?? "Unknown";
    this.amount = props.amount ?? 0;
  }
}

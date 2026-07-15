import { Star, type Planet, type Station, type Stellar } from "./Stellar";

export class InformationPanel {
  public element: HTMLElement;
  public entity: Stellar | Station | Star | Planet | null | undefined = null;

  constructor(entity?: Stellar | Station | Star | Planet) {
    this.entity = entity;

    this.element = document.createElement("aside");
    this.element.id = "information_panel";
    this.render();

    const parent = document.getElementsByTagName("main")[0];

    parent.addEventListener("click", () => {
      this.close();
    });

    parent.appendChild(this.element);
  }

  open() {
    this.render();
    this.element.classList.add("active");
  }

  close() {
    this.render();
    this.element.classList.remove("active");
  }

  render() {
    let content = "";
    if (this.entity) {
      content += `
				<h2>${this.entity.parent?.name ?? ""} ${this.entity.name}</h2>
				<p>Size: ${this.entity.size.x},${this.entity.size.y}</p>
			`;

      for (let i = 0; i < this.entity.stations.length; i++) {
        content += `<p>Station: ${this.entity.stations[i].name}</p>`;
      }
    }

    this.element.innerHTML = content;
  }
}

export const IP = new InformationPanel();

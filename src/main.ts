import { setupScroller } from "./scroller";
import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  const information_panel = document.getElementById("information_panel");

  function open_information_panel(entity: HTMLElement) {
    if (!information_panel) {
      console.error("no panel to open");
      return;
    }

    const { name } = entity.dataset;

    entity.classList.add(".active");

    console.log("clicked", name);

    information_panel.style.left = "0";
    information_panel.innerHTML = `Body Name: ${name}`;
  }

  const entities = document.querySelectorAll(".planet, .sun, .station");
  console.log(entities.length);

  entities.forEach((entity) => {
    entity.addEventListener("click", function (event) {
      event.stopPropagation();
      event.preventDefault();
      console.log("Clicked", entity);
      event.stopImmediatePropagation();
      open_information_panel(entity as HTMLElement);
    });
  });

  setupScroller();
});

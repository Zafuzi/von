export function setupScroller() {
  const scrollContent = document.querySelectorAll(".scroller");
  let isDragging = false;
  let startX: number; // Initial mouse X position
  let startY: number; // Initial mouse X position
  let scrollLeft: number; // Initial scroll offset of the content
  let scrollTop: number; // Initial scroll offset of the content

  function mousemove(e: any, scroller: HTMLElement) {
    if (!isDragging) return; // Exit if not dragging
    e.preventDefault(); // Prevent text selection

    // Calculate current mouse position relative to content
    const x = e.pageX - scroller.offsetLeft;
    const y = e.pageY - scroller.offsetTop;

    // Calculate how far the mouse has moved (drag distance)
    const walkX = (x - startX) * 1; // Multiply by 1 for sensitivity (adjust as needed)
    const walkY = (y - startY) * 1; // Multiply by 1 for sensitivity (adjust as needed)
    // Update scroll position
    scroller.scrollLeft = scrollLeft - walkX;
    scroller.scrollTop = scrollTop - walkY;
  }

  function mouseup(_e: any, scroller: HTMLElement) {
    isDragging = false;
    scroller.classList.remove("dragging");
  }

  function mouseleave(_e: any, scroller: HTMLElement) {
    isDragging = false;
    scroller.classList.remove("dragging");
  }

  function mousedown(e: any, scroller: HTMLElement) {
    isDragging = true;
    scroller.classList.add("dragging"); // Update cursor
    startX = e.pageX - (scroller as HTMLElement).offsetLeft; // Mouse X relative to content
    scrollLeft = scroller.scrollLeft; // Current scroll offset

    startY = e.pageY - (scroller as HTMLElement).offsetTop; // Mouse X relative to content
    scrollTop = scroller.scrollTop; // Current scroll offset
  }

  function mousewheel(e: WheelEvent, scroller: HTMLElement) {
    const change = e.deltaY / 1_000;
    const childScroller: HTMLElement | null = scroller.firstElementChild as HTMLElement;
    if (!childScroller) return;

    let current = parseFloat(childScroller?.style?.zoom);

    if (isNaN(current)) {
      current = 1;
      childScroller.style.zoom = "1";
    }

    let newZoom = current - change;
    if (newZoom < 0.1) {
      newZoom = 0.1;
    }

    if (newZoom > 1.9) {
      newZoom = 1.9;
    }

    childScroller.style.zoom = newZoom + "";
  }

  scrollContent.forEach((scroller) => {
    scroller.addEventListener("mousedown", (e: any) => mousedown(e, scroller as HTMLElement));
    scroller.addEventListener("mousemove", (e: any) => mousemove(e, scroller as HTMLElement));
    scroller.addEventListener("mouseup", (e: any) => mouseup(e, scroller as HTMLElement));
    scroller.addEventListener("mouseleave", (e: any) => mouseleave(e, scroller as HTMLElement));
    scroller.addEventListener("mousewheel", (e: any) => mousewheel(e, scroller as HTMLElement));
  });
}

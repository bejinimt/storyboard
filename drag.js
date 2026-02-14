function makeDraggable(el, bounds) {
  let dragging = false;
  let startX, startY, origLeft, origTop;

  el.addEventListener("mousedown", e => {
    const rect = el.getBoundingClientRect();
    const resizeZone = 16;

    const inResizeCorner =
      e.clientX > rect.right - resizeZone &&
      e.clientY > rect.bottom - resizeZone;

    if (inResizeCorner) return;
    if (e.target.classList.contains("close")) return;

    dragging = true;
    startX = e.clientX;
    startY = e.clientY;

    const parentRect = bounds.getBoundingClientRect();
    origLeft = rect.left - parentRect.left;
    origTop = rect.top - parentRect.top;

    document.body.style.userSelect = "none";
  });

  document.addEventListener("mousemove", e => {
    if (!dragging) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    el.style.left = origLeft + dx + "px";
    el.style.top = origTop + dy + "px";
  });

  document.addEventListener("mouseup", () => {
    dragging = false;
    document.body.style.userSelect = "";
  });
}

const previousPositions = new WeakMap();

function initPool() {
  const pool = document.getElementById("pool");
  const storyboard = document.getElementById("storyboard");

  pool.addEventListener("dblclick", e => {
    const el = e.target.closest(".info");
    if (!el) return;

    const prev = previousPositions.get(el);

    storyboard.appendChild(el);
    el.style.position = "absolute";
    el.style.left = prev?.left || "20px";
    el.style.top = prev?.top || "20px";

    makeDraggable(el, storyboard);
  });

  document.addEventListener("click", e => {
    if (e.target.classList.contains("close")) {
      const el = e.target.parentElement;
      previousPositions.set(el, {
        left: el.style.left,
        top: el.style.top
      });

      el.style.position = "relative";
      el.style.left = "";
      el.style.top = "";

      pool.appendChild(el);
      makeDraggable(el, pool);
    }
  });
}

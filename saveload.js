function initSaveLoad() {
  const saveBtn = document.getElementById("saveBtn");
  const loadBtn = document.getElementById("loadBtn");
  const loadFile = document.getElementById("loadFile");

  const storyboard = document.getElementById("storyboard");
  const pool = document.getElementById("pool");

  // -----------------------------
  // SPEICHERN
  // -----------------------------
  saveBtn.addEventListener("click", () => {
    const data = [];

    function collect(container, inPool) {
      container.querySelectorAll(".info").forEach(el => {
        const isImage = !!el.querySelector("canvas");
        const entry = {
          inPool,
          type: isImage ? "image" : "text",
          left: el.style.left || "",
          top: el.style.top || "",
          width: el.style.width || "",
          height: el.style.height || ""
        };

        if (entry.type === "text") {
          entry.text = el.childNodes[0].textContent;
        } else {
          const canvas = el.querySelector("canvas");
          entry.imageData = canvas.toDataURL();
        }

        data.push(entry);
      });
    }

    collect(storyboard, false);
    collect(pool, true);

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;

    // -----------------------------
    // DATEINAME MIT DATUM + UHRZEIT
    // -----------------------------
    const now = new Date();

    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");

    const hh = String(now.getHours()).padStart(2, "0");
    const min = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");

    const filename = `storyboard_${yyyy}-${mm}-${dd}_${hh}-${min}-${ss}.json`;

    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  });

  // -----------------------------
  // LADEN
  // -----------------------------
  loadBtn.addEventListener("click", () => {
    loadFile.value = "";
    loadFile.click();
  });

  loadFile.addEventListener("change", async e => {
    const file = e.target.files[0];
    if (!file) return;

    const content = await file.text();
    const data = JSON.parse(content);

    storyboard.innerHTML = "";
    pool.innerHTML = "<b>Pool:</b> (Doppelklick bringt Element zurück)";

    data.forEach(entry => {
      let el;

      if (entry.type === "text") {
        el = createTextElement(entry.text, storyboard);
      } else {
        el = createImageElementFromData(entry.imageData, storyboard);
      }

      if (entry.inPool) {
        el.style.position = "relative";
        el.style.left = "";
        el.style.top = "";
        if (entry.width) el.style.width = entry.width;
        if (entry.height) el.style.height = entry.height;
        pool.appendChild(el);
      } else {
        el.style.position = "absolute";
        if (entry.left) el.style.left = entry.left;
        if (entry.top) el.style.top = entry.top;
        if (entry.width) el.style.width = entry.width;
        if (entry.height) el.style.height = entry.height;
        storyboard.appendChild(el);
      }
    });
  });
}

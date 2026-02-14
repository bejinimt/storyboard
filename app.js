document.addEventListener("DOMContentLoaded", () => {
  initStoryboard();
  initPaste();
  initPool();
  initSaveLoad();
});

document.addEventListener("keydown", e => {
  if (e.key === "Enter" && e.ctrlKey) {
    e.preventDefault();

    const textarea = document.getElementById("text");
    const storyboard = document.getElementById("storyboard");

    const value = textarea.value.trim();
    if (!value) return;

    const el = createTextElement(value, storyboard);
    storyboard.appendChild(el);
    placeElement(el);

    textarea.value = "";
  }
});

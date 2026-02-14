function initPaste() {
  const storyboard = document.getElementById("storyboard");

  document.addEventListener("paste", e => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (const item of items) {
      if (item.type.startsWith("image/")) {
        e.preventDefault();

        const file = item.getAsFile();
        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
          const el = createImageElement(img, storyboard);
          storyboard.appendChild(el);
          placeElement(el);
        };
      }
    }
  });
}

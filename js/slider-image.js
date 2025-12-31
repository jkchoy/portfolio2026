document.addEventListener("DOMContentLoaded", function () {
  const beforeImgs = document.querySelectorAll(".before-layer img");
  const afterImgs = document.querySelectorAll(".after-layer img");
  const captions = document.querySelectorAll(".caption");
  const buttons = document.querySelectorAll(".newPic");
  const afterLayer = document.querySelector(".after-layer");
  const dragger = document.getElementById("dragger");
  const container = document.querySelector(".image-compare");

  let current = 0;

  function showSlide(i) {
    beforeImgs.forEach((img, idx) => img.classList.toggle("active", idx === i));
    afterImgs.forEach((img, idx) => img.classList.toggle("active", idx === i));
    captions.forEach((cap, idx) => cap.classList.toggle("active", idx === i));
  }

  buttons.forEach((btn, i) => {
    btn.addEventListener("click", () => showSlide(i));
  });

  showSlide(0);

  let isDown = false;
  dragger.addEventListener("mousedown", () => isDown = true);
  document.addEventListener("mouseup", () => isDown = false);

  document.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    const rect = container.getBoundingClientRect();
    let x = e.clientX - rect.left;
    x = Math.max(0, Math.min(rect.width, x));
    const pct = (x / rect.width) * 100;
    afterLayer.style.clipPath = "inset(0 " + (100 - pct) + "% 0 0)";
    dragger.style.left = pct + "%";
  });

  dragger.addEventListener("touchstart", () => isDown = true);
  document.addEventListener("touchend", () => isDown = false);
  document.addEventListener("touchmove", function (e) {
    if (!isDown) return;
    const rect = container.getBoundingClientRect();
    let x = e.touches[0].clientX - rect.left;
    x = Math.max(0, Math.min(rect.width, x));
    const pct = (x / rect.width) * 100;
    afterLayer.style.clipPath = "inset(0 " + (100 - pct) + "% 0 0)";
    dragger.style.left = pct + "%";
  });
});

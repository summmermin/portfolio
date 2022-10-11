const hiddens = document.querySelectorAll(".hidden");
const thumbs = document.querySelectorAll(".hidden>img");
hiddens.forEach(function (hidden) {
  hidden.addEventListener("mouseenter", function (e) {
    e.preventDefault(); 
    const tg = e.target;
    const tgH = tg.offsetHeight;
    const tgThumb = tg.firstChild;
    const tgThumbH = tgThumb.offsetHeight;
    tgThumb.style.top = tgH - tgThumbH + "px";
  });
  hidden.addEventListener("mouseleave", function (x) {
    x.preventDefault();
    const tg = x.target;
    const tgH = tg.offsetHeight;
    const tgThumb = tg.firstChild;
    const tgThumbH = tgThumb.offsetHeight;
    tgThumb.style.top = "0" + "px";
  });
});

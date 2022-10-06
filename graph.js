$(function () {
  const totalLength = 630;
  const animation = $(".animation");
  const progressBox = $(".animation .chart");
  const progressOst = $(".animation").offset().top - 600;
  $(window).scroll(function () {
    if ($(window).scrollTop() >= progressOst) {
      if (!animation.hasClass("isAni")) {
        progressAni();
        animation.addClass("isAni");
      }
    }
  });
  function progressAni() {
    progressBox.each(function () {
      let $this = $(this);
      let title = $this.find("h2");
      let targetNum = title.attr("data-num");
      let circle = $this.find("circle");
      $({ rate: 0 }).animate(
        { rate: targetNum },
        {
          duration: 2000,
          progress: function () {
            let now = this.rate;
            let amount = totalLength - (totalLength * now) / 100;
            title.text(Math.floor(now));
            circle.css({ strokeDashoffset: amount });
          },
        }
      );
    });
  }
});

const tabList = document.querySelectorAll(".tab_menu .list li");
const contents = document.querySelectorAll(".tab_menu .cont_area .cont");
let activeCont = "";

for (var i = 0; i < tabList.length; i++) {
    tabList[i].querySelector(".btn").addEventListener("click", function (e) {
        e.preventDefault();
        for (var j = 0; j < tabList.length; j++) {
            tabList[j].classList.remove("is_on");

            contents[j].style.display = "none";
        }

        this.parentNode.classList.add("is_on");

        activeCont = this.getAttribute("href");
        document.querySelector(activeCont).style.display = "block";
    });
}

var slidesC = document.querySelector('.ko-slides'),
    slideC = document.querySelectorAll('.ko-slides li'),
    currentIdxC = 0,
    slideCountC = slideC.length,
    slideWidthC = 300,
    slideMarginC = 30,
    moveAmtC = slideWidthC + slideMarginC,
    maxSlidesC = 6,
    responsiveMarginC = 30,
    newslideW,
    newslideWWidthC,
    newslideWWidthC = slideWidthC;
for (var ioi = 0; ioi < maxSlidesC; ioi++) {
    var cloneSlideC = slideC[ioi].cloneNode(true);
    cloneSlideC.classList.add('cloneC');
    slidesC.appendChild(cloneSlideC);
}
for (var ioi = slideCountC - 1; ioi >= 0; ioi--) {
    var cloneSlideC = slideC[ioi].cloneNode(true);
    cloneSlideC.classList.add('cloneC');
    slidesC.prepend(cloneSlideC);
}

function slideLayout(sw, sm) {
    newslideW = document.querySelectorAll('.ko-slides li');
    moveAmtC = sw + sm;
    newslideW.forEach(function (item, index) {
        item.style.left = moveAmtC * index + 'px';
        item.style.width = sw + 'px';
    });
}
slideLayout(slideWidthC, slideMarginC);

function setSlide() {
    var ulMoveAmtC = -slideCountC * moveAmtC + 'px';
    slidesC.style.transform = 'translateX(' + ulMoveAmtC + ')';
    slidesC.classList.add('animatedC');
}
setSlide();

function moveSlide(num) {
    slidesC.style.left = moveAmtC * -num + 'px';
    currentIdxC = num;
    console.log(currentIdxC, slideCountC);

    if (currentIdxC == slideCountC || currentIdxC == -slideCountC) {
        setTimeout(function () {
            slidesC.classList.remove('animated');
            slidesC.style.left = '0px';
            currentIdxC = 0;
        }, 500);

        setTimeout(function () {
            slidesC.classList.add('animated');
        }, 600);
    }

}

var timer = undefined;
var slideWrapperC = document.querySelector('.slide_wrapper');

function autoSlide() {
    if (timer == undefined) {
        timer = setInterval(function () {
            moveSlide(currentIdxC + 1);
        }, 1000);
    }
}
autoSlide();

function stopSlide() {
    clearInterval(timer);
    timer = undefined;
}

slideWrapperC.addEventListener('mouseenter', function () {
    stopSlide();
});

slideWrapperC.addEventListener('mouseleave', function () {
    autoSlide();
});

window.addEventListener('resize', function () {
    var currentWidthC = document.querySelector('body').offsetWidth;

    if (currentWidthC < 900) {
        var slidesWidth = slidesC.offsetWidth;
        newslideWWidthC = (slidesWidth - (responsiveMarginC * maxSlidesC - 1)) / 3;
        responsiveMarginC = 30;
    } else {
        newslideWWidthC = slideWidthC;
        responsiveMarginC = slideMarginC;
    }
    if (currentWidthC <= 600) {
        newslideWWidthC = slidesC.offsetWidth;
        responsiveMarginC = 0;
    }
    slideLayout(newslideWWidthC, responsiveMarginC);
    setSlide();
    console.log(newslideWWidthC);

});
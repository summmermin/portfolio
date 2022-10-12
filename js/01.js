jQuery(function () {
    var wheelDelta = 0; //휠이벤트 발생시 반환값 확인 변수
    var browser = 0; //파이어폭스 브라우저 판별 변수  BOM
    var sections = $(".section");
    var anis = $(".animation");
    //슬라이드
  
    var cnt = 0,
      speed = 500;
  
    // this 용법 : 변수 처리
    var that = null;
  
    sections.each(function (index) {
      $(this).on("mousewheel DOMMouseScroll", function (event) {
        event.preventDefault();
  
        browser = window.navigator.userAgent.toLowerCase().indexOf("firefox");
  
        if (browser >= 0) {
          wheelDelta = -event.detail * 40;
        } else {
          wheelDelta = event.originalEvent.wheelDelta;
        }
        //console.log( wheelDelta );
  
        ///////////////////////////////////////////////////////////////////////////////
        //휠 방향 체크 제어문
        if (wheelDelta < 0) {
          //아래로 섹션 다음(next())으로 이동  -120
          if (index < sections.length - 1) {
            //9개(8)이므로 마지막전(7)까지 사용
            if (index != 3) {
              //섹션 7번이 아니면 처리
              animation(index);
              $("html,body")
                .stop()
                .animate({ scrollTop: $(this).next().offset().top }, speed);
            } else {
              //섹션 7번이면 처리
              //다른 객체 내에서 현재 this를 that 변수에 저장 this 용법 중요
              that = $(this);
              nextSlide(); //다음 슬라이드 함수 호출
            }
          }
        } else {
          //위로 섹션 이전(prev())으로 이동 120
          if (index > 0) {
            if (index != 3) {
              //섹션 7번이 아니면 처리
              $("html,body")
                .stop()
                .animate({ scrollTop: $(this).prev().offset().top }, speed);
            } else {
              //섹션 7번이면 처리
              //다른 객체 내에서 현재 this를 that 변수에 저장 this 용법 중요
              that = $(this);
              prevSlide(); //이전 슬라이드 함수 호출
            }
          }
        }
  
        ////////////////////////////////////////////////////////////////
        //슬라이드 스크롤이벤트처리 시작
        ////////////////////////////////////////////////////////////////
        //다음 슬라이드 함수
        function nextSlide() {
          if (!$(".slide_wrap").is(":animated")) {
            //휠 이벤트 버블링 처리
            cnt++; //카운트 0 1 2 3 4 증가
          }
          if (cnt >= 5) {
            //마지막이면
            cnt = 5; //마지막으로 설정
          }
          $(".slide_wrap")
            .stop()
            .animate({ left: -1000 * cnt }, speed, function () {
              if (cnt == 5) {
                //바로 위에서 슬라이드가 마지막으로 이동하고 그리고 다음 섹션으로 이동
                $("html,body")
                  .stop()
                  .animate({ scrollTop: that.next().offset().top }, speed);
                console.log(that);
              }
            });
        }
        //이전 슬라이드 함수
        function prevSlide() {
          if (!$(".slide_wrap").is(":animated")) {
            //휠 이벤트 버블링 처리
            cnt--; //카운트 4 3 2 1 0 감소
          }
          if (cnt <= 0) {
            //처음이면
            cnt = 0; //처음으로 설정
          }
          $(".slide_wrap")
            .stop()
            .animate({ left: -1000 * cnt }, speed, function () {
              if (cnt == 0) {
                //바로 위에서 슬라이드가 처음으로 이동하고 그리고 이전 섹션으로 이동
                $("html,body")
                  .stop()
                  .animate({ scrollTop: that.prev().offset().top }, speed);
              }
            });
        }
        ////////////////////////////////////////////////////////////////
        //슬라이드 스크롤이벤트처리 끝
        ////////////////////////////////////////////////////////////////
  
        function animation(idx) {
          //휠이벤트 발생하여 섹션을 떠난후 인덱스 번호가 전달된다
          console.log(idx);
          if (idx == 1) {
            $("#section3 .animation").addClass("in");
          }
          if (idx == 2) {
            $("#section4 .animation").addClass("in");
          }
          if (idx == 3) {
            $("#section5 .animation").addClass("in");
          }
          if (idx == 4) {
            $("#section6 .animation").addClass("in");
          }
        }
      }); //mousewheel DOMMouseScroll 이벤트 끝
    }); // section 객체배열 처리 each() 메서드 끝
  }); //mousewheel.js
jQuery(function(){
	var wheelDelta = 0; //휠이벤트 발생시 반환값 확인 변수
	var browser = 0; 	//파이어폭스 브라우저 판별 변수  BOM
  
    //슬라이드
	var slideWrap=$('.slide_wrap');
	var slides=slideWrap.find('.slides');
	var slide=slides.find('.slide');
	var slideWidth=1000;
	var slideLen=slide.length;
     slides.css('width',slideWidth*slideLen+'px');	
    var cnt=0;
    
    var nextBtn=$('.right');
    var prevBtn=$('.left');
  
    
			
	// this 용법 : 변수 처리
  var that = null;  
 
	$('.section').each(function(index){ //0 1 2 ... 8 (9개섹션)
		$(this).on('mousewheel DOMMouseScroll', function(event){
					event.preventDefault();

					browser = window.navigator.userAgent.toLowerCase().indexOf('firefox');
					
					if( browser>=0 ){ 
						wheelDelta = -event.detail*40; 
					}
					else{ 
						wheelDelta = event.originalEvent.wheelDelta;  
					}	
					//console.log( wheelDelta );
	

					///////////////////////////////////////////////////////////////////////////////
					//휠 방향 체크 제어문
					if( wheelDelta < 0 ){  //아래로 섹션 다음(next())으로 이동  -120
						if( index < $('.section').length-1 ){  //9개(8)이므로 마지막전(7)까지 사용
							if(index!=3){ //섹션 7번이 아니면 처리
								$('html,body').stop().animate({scrollTop: $(this).next().offset().top },500);					
							}
							else{ 			//섹션 7번이면 처리
								//다른 객체 내에서 현재 this를 that 변수에 저장 this 용법 중요
								that = $(this);
                                nextSlide(); //다음 슬라이드 함수 호출
                               
							}
						}					
					}
					else{  //위로 섹션 이전(prev())으로 이동 120
						if( index > 0 ){	
							if(index!=3){ //섹션 7번이 아니면 처리
								$('html,body').stop().animate({scrollTop: $(this).prev().offset().top },500);				
							}
							else{ 				//섹션 7번이면 처리
								//다른 객체 내에서 현재 this를 that 변수에 저장 this 용법 중요
								that = $(this);
                                prevSlide();  //이전 슬라이드 함수 호출
                               
							}							
						}	
					}
                  



							////////////////////////////////////////////////////////////////
							//슬라이드 스크롤이벤트처리 시작
							////////////////////////////////////////////////////////////////
							//다음 슬라이드 함수
							function nextSlide(){
								if(!$('.slide_wrap').is(':animated')){ //휠 이벤트 버블링 처리 
                                    cnt++; //카운트 0 1 2 3 4 증가
                                }
								if(cnt>=5){ //마지막이면
									cnt=5;    //마지막으로 설정
								}	
								console.log(cnt);
								$('.slide_wrap').stop().animate({left:-1000*cnt},1000, function(){
									if(cnt==5){  //바로 위에서 슬라이드가 마지막으로 이동하고 그리고 다음 섹션으로 이동
										$('html,body').stop().animate({scrollTop: that.next().offset().top },500);
                                    }                                
                                });
                               
                                pageFn(); //페이지 버튼 이벤트 함수
							}							
							//이전 슬라이드 함수
							function prevSlide(){
								if(!$('.slide_wrap').is(':animated')){  //휠 이벤트 버블링 처리 
									cnt--; //카운트 4 3 2 1 0 감소
								}
								if(cnt<=0){ //처음이면
									cnt=0;    //처음으로 설정
								}
								
								$('.slide_wrap').stop().animate({left:-1000*cnt},1000, function(){
									if(cnt==0){ //바로 위에서 슬라이드가 처음으로 이동하고 그리고 이전 섹션으로 이동
										$('html,body').stop().animate({scrollTop: that.prev().offset().top },500);
									}
                                });
								pageFn();//페이지 버튼 이벤트 함수
							}
							
                            
        });  //mousewheel DOMMouseScroll 이벤트 끝        
    }); // section 객체배열 처리 each() 메서드 끝






				////////////////////////////////////////////////////////////////
				// 슬라이드 버튼 이벤트	
				//버튼이벤트는 마우 휠 이벤트 밖으로 빼서 작업
				//메인 슬라이드 버튼 크릭 이벤트
				////////////////////////////////////////////////////////////////
				
				function mainSlide(){
					$('.slide_wrap').stop().animate({left:-1000*cnt},500);
					pageFn(); //페이지 이벤트
				}


				////////////////////////////////////////////////////////////////
				//페이지 네이션(인디게이터) 함수
				////////////////////////////////////////////////////////////////
				function pageFn(){
					$('.pager div').removeClass('addPage');
					$('.pager div').eq(cnt).addClass('addPage');
				}



				

				////////////////////////////////////////////////////////////////
				//페이지 버튼 이벤트
				////////////////////////////////////////////////////////////////
				$('.page-btn').each(function(idx){
					$(this).click(function(){
						cnt=idx;  //현재 클릭된 인덱스 번호 슬라이드 번호로 대입해줌
						pageFn(); //페이지 이벤트
						mainSlide(); //메인슬라이드 애니메이션 호출
					});
				});




				////////////////////////////////////////////////////////////////
				//좌우버튼
				////////////////////////////////////////////////////////////////

				//다음 버튼 클릭 이벤트
				nextBtn.click(function(){
					cnt++;
					cnt>=5?cnt=5:cnt;
					mainSlide();
				})	
				
				//이전 버튼 클릭 이벤트
				prevBtn.click(function(){
					cnt--;
					cnt<=0?cnt=0:cnt;
					mainSlide();
				})	

		
});//mousewheel.js
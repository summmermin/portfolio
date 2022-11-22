jQuery(function(){
	var wheelDelta = 0;
	var browser = 0;
  
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
  
    
			
  var that = null;  
 
	$('.section').each(function(index){ 
		$(this).on('mousewheel DOMMouseScroll', function(event){
					event.preventDefault();

					browser = window.navigator.userAgent.toLowerCase().indexOf('firefox');
					
					if( browser>=0 ){ 
						wheelDelta = -event.detail*40; 
					}
					else{ 
						wheelDelta = event.originalEvent.wheelDelta;  
					}	
	

					if( wheelDelta < 0 ){ 
						if( index < $('.section').length-1 ){ 
							if(index!=3){
								$('html,body').stop().animate({scrollTop: $(this).next().offset().top },200);					
							}
							else{ 			
								that = $(this);
                                nextSlide(); 
                               
							}
						}					
					}
					else{  
						if( index > 0 ){	
							if(index!=3){ 
								$('html,body').stop().animate({scrollTop: $(this).prev().offset().top },200);				
							}
							else{ 			
								that = $(this);
                                prevSlide(); 
                               
							}							
						}	
					}
                  


							function nextSlide(){
								if(!$('.slide_wrap').is(':animated')){ 
                                    cnt++;
                                }
								if(cnt>=5){ 
									cnt=5;   
								}	
								console.log(cnt);
								$('.slide_wrap').stop().animate({left:-1000*cnt},1000, function(){
									if(cnt==5){ 
										$('html,body').stop().animate({scrollTop: that.next().offset().top },200);
                                    }                                
                                });
                               
                                pageFn();
							}							
							function prevSlide(){
								if(!$('.slide_wrap').is(':animated')){  
									cnt--; 
								}
								if(cnt<=0){ 
									cnt=0;  
								}
								
								$('.slide_wrap').stop().animate({left:-1000*cnt},1000, function(){
									if(cnt==0){ 
										$('html,body').stop().animate({scrollTop: that.prev().offset().top },200);
									}
                                });
								pageFn();
							}
							
                            
        });
    });






				////////////////////////////////////////////////////////////////
				// 슬라이드 버튼 이벤트	
				//버튼이벤트는 마우 휠 이벤트 밖으로 빼서 작업
				//메인 슬라이드 버튼 크릭 이벤트
				////////////////////////////////////////////////////////////////
				
				function mainSlide(){
					$('.slide_wrap').stop().animate({left:-1000*cnt},200);
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
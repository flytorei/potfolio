/* 슬라이드 배너 */
$(function(){
    jQuery.fn.slideBanner = function(opts){
        var currentIndex = 0;     // 현재 보이는 슬리이드 index
        var elementLen = 0;       // 슬라이드 개수
        var direction = 0;        // 방향   왼쪽 == 0, 오른쪽  == 1
        var slideWrap = $(this);
        var isAni = false;
        var pager = null;
        var slideList = null;
        var $opts = {w:950,slideSpeed:1,setting:"slide"};
        $.extend($opts,opts);
        readySlideBanner();
        function readySlideBanner(){
            init();
            positionLesat();
            clickEvent();
        }

        function init(){
            slideList = slideWrap.children("ul").children();
            pager = $(".pager");
            slideList.css({"position":"absolute"});
        }

//위치 초기값
        function positionLesat(){
            elementLen = slideList.length;
            if($opts.setting == "slide"){
                for(var i = 0;i < elementLen; i++){
                    slideList.eq(i).css({"left":$opts.w});
                }
                slideList.eq(0).css({"left":0});
            }

            if($opts.setting == "fade"){
                slideList.css({"opacity":0});
                slideList.eq(0).css({"opacity":1})
                for(var i = 0;i < elementLen; i++){
                    slideList.eq(i).css({"left":0});
                }
            }

            // 페이징 설정
            for(var i = 0;i < elementLen; i++){
                pager.append("<a href='#'>"+i+"</a>");
            }
            pager.find("a").eq(0).addClass("on");
        }

//이벤트 처리
        function clickEvent(){
            // prev 버튼
            $(".prev").off("click focusin").on("click",function(e){
                e.preventDefault();
                // 애니메이션 중이면 버튼 실행 중지
                if(isAni == true){
                    return false;
                }

                if(currentIndex-1 <= -elementLen){
                    direction = 1;
                    moveSlide(0);
                }else{
                    direction = 1;
                    moveSlide(currentIndex-1);
                }
            })

            // next 버튼
            $(".next").off("click focusin").on("click",function(e){
                e.preventDefault();
                if(isAni == true){
                    return false;
                }
                on_StartSlide();
            })

            // pager 버튼
            pager.find("a").on("click focusin",function(e){
                e.preventDefault();
                var select = pager.find("a").index(this);
				if(select == currentIndex || isAni == true ){
					return false;
				}
                $(this).siblings().removeClass("on");
                $(this).addClass("on");
                moveSlide(select);
            })
        }

// 슬라이드 전환
        function on_StartSlide(){
            if(currentIndex+1 >= elementLen){
                direction = 0;
                moveSlide(0)
            }else{
                direction = 0;
                moveSlide(currentIndex+1);
            }
        }

// 슬라이드 컨트롤
        function moveSlide(index){
            var currentElemet = slideList.eq(currentIndex);
            var nextElement = slideList.eq(index);
            isAni = true;
            if($opts.setting == "slide"){
                //next 클릭
                if(direction == 0){
                    nextSlide(currentElemet,nextElement,index);
                }
                //prev 클릭
                if(direction == 1){
                    prevSlide(currentElemet,nextElement,index)
                }
            }
            if($opts.setting == "fade"){
                fadeSlide(currentElemet,nextElement,index)
            }
            pager.find("a").removeClass("on");
            pager.find("a").eq(index).addClass("on");
        }

        // 슬라이드 next 방향
        function nextSlide(currElem,nextElem,index){
            currElem.stop();
            TweenMax.to(currElem, $opts.slideSpeed, { left:-$opts.w,onComplete:function(){
                afterEvent(index);
            }});
            nextElem.css({"left":$opts.w})
            nextElem.stop();
            TweenMax.to(nextElem, $opts.slideSpeed, { left:0,onComplete:function(){
                afterEvent(index);
            }});
        }

        // 슬라이드 prev 방향
        function prevSlide(currElem,nextElem,index){
            currElem.stop();
            TweenMax.to(currElem, $opts.slideSpeed, { left:$opts.w,onComplete:function(){
                afterEvent(index);
            }});
            nextElem.css({"left":-$opts.w});
            nextElem.stop();
            TweenMax.to(nextElem, $opts.slideSpeed, { left:0,onComplete:function(){
                afterEvent(index);
            }});
        }

        // 슬라이드 fade 효과
        function fadeSlide(currElem,nextElem,index){
            TweenMax.to(currElem, $opts.slideSpeed, { opacity:0,onComplete:function(){
                afterEvent(index);
            }});
            nextElem.css({"opacity":0});
            TweenMax.to(nextElem, $opts.slideSpeed, { opacity:1,onComplete:function(){
                afterEvent(index);
            }});
        }

// 슬라이드 애니메이션 끝난후 이밴트 처리
        function afterEvent(index){
            isAni = false;
            currentIndex = index;
        }
    };
})
/* //슬라이드 배너 */




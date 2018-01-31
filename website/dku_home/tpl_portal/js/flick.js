/*
 * jQuery flick
 *
 * jQuery required.
 *
 * Copyright 2012 (c) kamem
 * http://develo.org/
 * Licensed Under the MIT.
 *
 * Date: 2012.4.8
*/

(function($,global){
/*-------------------------------------------------------------------------------------
	창 크기
-------------------------------------------------------------------------------------*/
var windowWidth = (!(window.innerWidth)) ? document.documentElement.clientWidth : window.innerWidth;
var windowHeight = (!(window.innerHeight)) ?  document.documentElement.clientHeight : window.innerHeight;

/*-------------------------------------------------------------------------------------
  사용자 에이전트에 의해 확인
-------------------------------------------------------------------------------------*/
var userAgent = navigator.userAgent;

userAgent.match(/iPhone OS (\w+){1,3}/g);
userAgent.match(/CPU OS (\w+){1,3}/g);
/*
 * iPhone iPad 의iOS를 판별
 */
var osVar=(RegExp.$1.replace(/_/g, '')+'00').slice(0,3);

/*
 * 사용자 에이전트 판별 배열
 */
var ua = {
	iPhone : userAgent.search(/iPhone/) !== -1,
	iPad : userAgent.search(/iPad/) !== -1,
	Android : ((userAgent.search(/Android/) !== -1) && (userAgent.search(/Mobile/) !== -1)) && (userAgent.search(/SC-01C/) == -1),
	AndroidTab : (userAgent.search(/Android/) !== -1) && ((userAgent.search(/Mobile/) == -1) || (userAgent.search(/SC-01C/) !== -1)),
	Android3_2 : userAgent.search(/Android 3.2/) !== -1,
	iOS5_less : ((userAgent.search(/iPhone/) !== -1) || (userAgent.search(/iPad/) !== -1)) && (osVar < 500),
	other : !(
	(userAgent.search(/iPhone/) !== -1) || 
	(userAgent.search(/iPad/) !== -1) || 
	(((userAgent.search(/Android/) !== -1) && (userAgent.search(/Mobile/) !== -1)) && (userAgent.search(/SC-01C/) == -1)) || 
	((userAgent.search(/Android/) !== -1) && ((userAgent.search(/Mobile/) == -1) || (userAgent.search(/SC-01C/) !== -1)))
	)
}
/*
 * 모바일 판별
 */
var mobile = ua.iPhone || ua.iPad || ua.Android || ua.AndroidTab;


/*
 * 애니메이션 종료 판별
 */
var type = "transition";
/*
 * 이벤트 판별
 */
var eventType = {
	touchStart: mobile ? 'touchstart' : 'mousedown',
	touchEnd: mobile ? 'touchend' : 'mouseup',
	touchMove: mobile ? 'touchmove' : 'mousemove',
	animationEnd: (!(userAgent.toLowerCase().indexOf("webkit") == -1)) ? ((type == "transition") ? "webkitTransitionEnd" : "webkitAnimationEnd") : 
(!(userAgent.toLowerCase().indexOf("gecko") == -1)) ? ((type == "transition") ? "transitionend" : "animationend") :
(!(userAgent.toLowerCase().indexOf("opera") == -1)) ? ((type == "transition") ? "oTransitionEnd" : "oAnimationend") :
(!(userAgent.toLowerCase().indexOf("msie 10.0") == -1)) ? ((type == "transition") ? "MSTransitionEnd" : "MSAnimationend") : ""
};

/*
 * CSS 브라우저에서의 벤더 접두사 배분
 */
var cssPrefix = 
(!(userAgent.toLowerCase().indexOf("webkit") == -1)) ? '-webkit-' : 
(!(userAgent.toLowerCase().indexOf("gecko") == -1)) ? '-moz-' :
(!(userAgent.toLowerCase().indexOf("opera") == -1)) ? '-o-' :
(!(userAgent.toLowerCase().indexOf("msie 10.0") == -1)) ? '-ms-' : "";

var cssTransition = cssPrefix + 'transition';
var cssTransform = cssPrefix + 'transform';
var cssTranslate = {
	prefix : (!(userAgent.toLowerCase().indexOf("webkit") == -1)) ? 'translate3d(' : 'translate(',
	suffix : (!(userAgent.toLowerCase().indexOf("webkit") == -1)) ? 'px,0,0)' : 'px,0)'
}

/*
 * translate의설정
 * webkit의경우 translate3d
 * firefox의경우 translate
 */
function getCssTranslate(moveX) {	
	if(css3) {
		return cssTranslate.prefix + moveX + cssTranslate.suffix;
	}
	else {
		return moveX + 'px';
	}
}

/*-------------------------------------------------------------------------------------
	flick 플러그인
-------------------------------------------------------------------------------------*/
$.fn.flick = function(options) {

	options = $['extend']({
		contentNum: 0,
		centerPosition: false,
		speed: 200,
		timer: false
	}, options);

	//----------------------------------------
	//	초기 설정
	//----------------------------------------
	var $content = this,
	$container = $('>div',this),
	$itemBox = $('div>ul',this),
	$item = $('li',this),
	$nav = $('.nav',this),
	$nav_a = $('a',$nav),
	$prev = $('.prev',this),
	$next = $('.next',this);
	
	css3 = $('body').css(cssTransform) == 'none';
	if(!css3) {cssTransform = 'left'};

	var containerOffsetLeft = 0,
	containerBaseX = 0,

	contentNum = options.contentNum,
	
	startX = 0,
	endX = 0,
	startY = 0,
	startTime = 0,
	startLeft = 0,
	flickStartCount = 0,

	activeBool = true,
	isMoving = false;
	//$itemBox.css({width : $item.eq(0).width() * $item.length});
	var ulW = 1;
	$(">li",$itemBox).each(function(){
		ulW += $(this).width();//이전 항목의 width 합계
	});
	$itemBox.width(ulW+10);
	$itemBox.css(cssTransform,'translate(0,0)');

	//----------------------------------------
	//	타이머로 자동으로 돌
	//----------------------------------------
	if(options.timer) {
		setInterval(function(){
			contentNum = ($item.length - 1 > contentNum) ? contentNum+1 : 0;
			move(contentNum);
		},options.timer);
	}

	//----------------------------------------
	//	앵커 링크에서 컨테이너가 스크롤 해 버리는 경우 컨테이너의 위치를 0 위치로 이동
	//----------------------------------------
	$container.scroll(function() {
		$(this).scrollLeft(0);
	});

	//----------------------------------------
	//	주소에 해시가 들어있는 경우 그 위치 이동
	//----------------------------------------
	if(location.hash.charAt(0) == "#") {
		var hashNum = location.hash.slice(1,location.hash.length).match(/[0-9]+/)
		var hashName = location.hash.slice(1,location.hash.indexOf(hashNum));
		
		var itemId = $item[0].id;
		var itemNum = itemId.slice(0,itemId.length).match(/[0-9]+/)
		var itemName = itemId.slice(0,itemId.indexOf(itemNum));
		
		if(hashName == itemName) {
			setTimeout(function() {
			move(Number(hashNum) -1);
			}, 1)
		}
	}

	//----------------------------------------
	//	터치했을 때의 처리
	//----------------------------------------
	$container.bind(eventType.touchStart, function(e){
		var touch = mobile ? e.originalEvent.touches[0] : e;

		startX = mobile ? touch.pageX : touch.clientX;
		startY = mobile ? touch.pageY : touch.clientY;
		startTime = new Date().getTime();
		isMoving = true;


		startLeft = getTranslateX() - containerOffsetLeft -  containerBaseX;
		
        if($itemBox.hasClass('moving')) {
			$itemBox.removeClass('moving');
			$itemBox.css(cssTransform, getCssTranslate(containerBaseX + startLeft));
        }
		
		//console.log(translateX + '+' + containerOffsetLeft + '-' + containerBaseX + '=' + (translateX - containerOffsetLeft - containerBaseX))
	});

	//----------------------------------------
	//	요소 내에서 드래그하고있는 때의 처리
	//----------------------------------------
	$container.bind(eventType.touchMove, function(e){
		var touch = mobile ? e.originalEvent.touches[0] : e,
		touchpageX = mobile ? touch.pageX : touch.clientX;
		touchpageY = mobile ? touch.pageY : touch.clientY;
		
		// 요소 내에서 클릭하면 실행
		if(isMoving) {
			
			var diffX = containerBaseX + touchpageX - startX,
			diffY = touchpageY - startY,
			diffX2 = touchpageX - startX;
			if(activeBool){
				if((diffX2/diffY) > 0.5 || (diffX2/diffY) < -0.5) {
					if(mobile) {event.preventDefault()};

					flickStartCount++;
					
					// 가로 스크롤하기 시작했을 때 컨테이너의 위치로 이동
					if(options.centerPosition && (flickStartCount == 1)) {
						var pageWrapTag = $.support.boxModel ? navigator.appName.match(/Opera/) ? "html" : "html,body" : "body";
						$(pageWrapTag).animate({ scrollTop : $container.offset().top}, 300);
					};
					
					$itemBox.css(cssTransform, getCssTranslate(startLeft + diffX));
				}
				else {
					if(flickStartCount < 5) {
						activeBool = false;
					}
					else {
					if(mobile) {event.preventDefault()};

						$itemBox.css(cssTransform,getCssTranslate(startLeft + diffX));
					}
				}
			}
		}
	});

	//----------------------------------------
	//	터치가 끝났을 때의 처리
	//----------------------------------------
	$container.bind(eventType.touchEnd, function(e){
		var touch = mobile ? e.originalEvent.changedTouches[0] : e;
		endX = mobile ? touch.pageX : touch.clientX;

		flickStartCount = 0;
		startLeft = 0;
		activeBool = true;
		isMoving = false;
		
		move();
	});

	//----------------------------------------
	//	창 크기 조정 및 로드시
	//----------------------------------------
	$(window).bind(('orientationchange resize load'), function(){
		//$itemBox.css({width : $item.eq(0).width() * $item.length});

        containerOffsetLeft = $container.offset().left;
		containerBaseX = 0;
		
		/* 창 구역 가득 퍼지는 경우*/
		windowWidth = (!(window.innerWidth)) ? document.documentElement.clientWidth : window.innerWidth;
		if($container.width() > windowWidth) {
			$container.css({width : windowWidth})
		}
		

		if(!css3) {
			$itemBox.queue([]).stop()
		}
		move(contentNum);
	});

	//----------------------------------------
	//	지정된 위치 콘텐츠 위치로의 움직임 함수
	//----------------------------------------
	function move(num) {
		contentNum = (typeof num === 'number') ? num : contentNum;
		$itemBox.addClass('moving');
		
		var endTime = new Date().getTime(),
		timeDiff = endTime - startTime,
		distanceX = endX - startX;

		// num이 숫자 아닌 경우
		if(!(typeof num === 'number')) {
			if (timeDiff < 300 && Math.abs(distanceX) > 30) {
				contentNum = (distanceX > 0) ? contentNum - 1 : contentNum + 1;
			}
			else {
	            d = Math.abs((getTranslateX() - containerOffsetLeft) - containerBaseX - $item.eq(0).width() / 2);
	            contentNum = Math.floor(d / $item.eq(0).width());
			}
		}
 
 		//contentNum가 0 이하 플릭 수 이상으로 가지 않도록 제한
		contentNum = (contentNum > $item.length - 1) ? $item.length - 1 :
		(contentNum < 0) ? 0 : contentNum;
		
        // 마우스를 말할 때 내용의 위치에서
		var prevW = 0;
		$item.eq(contentNum).prevAll().each(function(){
			prevW += $(this).width();//이전 항목의 width 합계
		});
		if(contentNum>0){
			//prevW -= $prev.width();//이전 항목의 width 합계에서 prev 버튼의 width 빼기
		}
		if(css3) {
			$itemBox.css(cssTransform, getCssTranslate(containerBaseX + prevW * -1));//이전 항목의 width 합계를 기준으로 이동
		}
		else {
			$itemBox.animate({
				left : getCssTranslate(containerBaseX + prevW * -1)//이전 항목의 width 합계를 기준으로 이동
			}, options.speed );
		}
		
		//next prev의 클래스 조작
		$prev.add($next).removeClass('disabled')
		if(contentNum >= $item.length-1) {$next.addClass('disabled')}
		else if(contentNum <= 0) {$prev.addClass('disabled')}
		
		//nav의클래스 조작
		$nav_a.removeClass('on').eq(contentNum).addClass('on');
	}

	//----------------------------------------
	//	버튼을 누를 때
	//----------------------------------------
	//nav
	$nav_a.bind('click', function() {
		move($nav_a.index(this));
		return false;
	});
	
	//prev
	$prev.bind('click', function() {
		contentNum--;

		//contentNumが0以下フリック의数以上に行かないように制限する
		contentNum = (contentNum > $item.length - 1) ? $item.length - 1 :
		(contentNum < 0) ? 0 : contentNum;

		move(contentNum);
		return false;
	});

	//next
	$next.bind('click', function() {
		contentNum++;

		//contentNumが0以下フリック의数以上に行かないように制限する
		contentNum = (contentNum > $item.length - 1) ? $item.length - 1 :
		(contentNum < 0) ? 0 : contentNum;

		move(contentNum);
		return false;
	});

	/*
	 * translate의x의値 取得
	 * firefoxとwebkitで取得의仕方が違うようです。
	 */
	function getTranslateX() {
		if(css3) {
			return (userAgent.toLowerCase().indexOf("firefox") == -1) ?
			$itemBox.offset().left : parseInt(/(,.+?){3} (.+?)px/.exec($itemBox.css(cssTransform))[2]) + containerOffsetLeft;
		}
		else {
			return $itemBox.offset().left;
		}
	}
};

jQuery.extend(jQuery.easing,{
	def:"easeOutQuad",
	easeOutQuad:function(j,i,b,c,d){return -c*(i/=d)*(i-2)+b;}
});

}(jQuery,this));

jQuery(function($) {
	// Quick Menu Fix
	quickFix();

	// LNB 동작
	lnbMov();
	
	
	

	

});





/* LNB Move Function */
function lnbMov(){
	var $depth1Wrap = $('#lnbWrap .depth1Wrap'),
		$depth2Wrap = $('#lnbWrap .depth2Wrap'),
		$dep1Lst = $depth1Wrap.children('li'),
		$dep2Lst = $depth2Wrap.children('li'),
		defIndx,
		defTime;

	// 초기값
	//	li.on 의 index 기록, 하위 리스트 보이기
	defIndx = $depth1Wrap.find('.on').index();
	$depth1Wrap.find('.on').children('.depth2Wrap').show();
	
	// 1depth 리스트 클릭 시, 슬라이드 다운/업
	$dep1Lst.children('a').on('click', function(){
		if( $depth2Wrap.is(':animated') ) { return; }
		
		// 하위메뉴 있을 때 메뉴 펼침
		if($(this).next().hasClass('depth2Wrap')){
			//console.log($(this).next().hasClass('depth2Wrap'));
			
			// 열려있는 메뉴 클릭 시
			if($(this).parent().hasClass('on')){
				$depth2Wrap.slideUp(200);
				$dep1Lst.removeClass('on');

				//console.log('하위메뉴 닫힘');
				
				// 메뉴가 모두 닫혀 있으면 현재 페이지의 메뉴를 펼친다.
				if (!$dep1Lst.hasClass('on')){ defLNB(); }
			} 
			// 닫혀있는 메뉴 클릭 시
			else {
				if($depth2Wrap.is(':animated')) { return; }
				$depth2Wrap.slideUp(200);
				$dep1Lst.removeClass('on');
				$(this).parent().addClass('on')
					.children('.depth2Wrap').slideDown(200);

				//console.log('하위메뉴 열림');
			}
			return false;
		}
		//console.log('하위메뉴 없음');
		
		// 현재 페이지 메뉴 펼치기
		function defLNB() {
			defTime = setInterval(function () {
				if($dep1Lst.hasClass('on')||$depth2Wrap.is(':animated')){return;}
				
				$dep1Lst.eq(defIndx).children('.depth2Wrap').slideDown(200);
				$dep1Lst.eq(defIndx).addClass('on');
				stopTimer();
			}, 800);
			//console.log('초기메뉴 열림');
		}
		function stopTimer(){
			clearInterval (defTime);
		}
	});
}
/* //LNB Move Function */



/* Quick Menu Fixed */
function quickFix(){
	
	var $docH = $(document).height(),
		$winH = $(window).height(),
	//	$quickH = $('#quickWrap').height();
		$footerH = $('#footerWrap').height();
	// console.log($docH, $winH, $footerH);
	//console.log($docH);
	
	if ($docH > ($winH + $footerH)){
		$('#quickWrap').css({'position':'fixed', 'bottom': 0});
		$(window).scroll(function(){
			if($(window).scrollTop() >= $docH - $winH - $footerH){
				$('#quickWrap').css({'position':'absolute', 'bottom': $footerH});
			} else {
				$('#quickWrap').css({'position':'fixed', 'bottom': 0});
			}
		});
	}
}
/* //Quick Menu Fixed */






/* toggle Move function */
function toggle(obj){
	var $tglDt = $(obj).find('dt');
	var $tglEl = $tglDt.children('a');
	// 초기값
	$('.toggleWrap dt').removeClass('on');
	$('.toggleWrap dd').hide();
	$('.toggleWrap').each(function() {
		$(this).find('dt').first().addClass('on')
		.next().show();
	});
	
	// 클릭시 토글실행
	$tglEl.on('click', function(){
		if($tglEl.parent().next().is(':animated')){return false;}
		$(this).parent().toggleClass('on')
			.next().slideToggle(200);
        quickFix();
		return false;

	});
}



/* tab */
$(document).ready(function() {
	$(".tabCont").hide();
	$("ul.tabs li:first").addClass("on").show();
	$(".tabCont:first").show();

	//On Click Event
	$("ul.tabs li").click(function() {

		$("ul.tabs li").removeClass("on");
		$(this).addClass("on");
		$(".tabCont").hide();

		var activeTab = $(this).find("a").attr("href");
		$(activeTab).show();
		return false;
	});
});

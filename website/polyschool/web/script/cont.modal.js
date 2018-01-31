/*****************************************
	jquery Modal Ver.01 (2013-02-25 ~ 2013-03-06)
	Publisher Park JS
*****************************************/

;(function($) {

	//모달 이벤트
	$.fn.modal = function(options){
		var settings= {
			autoOpen : false,					//팝업 Load
			reSize : true,						//리사이징
			popClass : 'layerPopB',				//레이어팝업 추가 클래스
			overlay : 'dimmed',					//마스크 클래스
			overlayClass : 'overlayA',			//마스크 추가 클래스
            btnOpID : null,                     //레이어 열기 버튼 ID (버튼 두개 이상일 경우 사용)
			seletorOpen : '.layerOpen',			//레이어 열기 버튼
			seletorOpenClass : 'btnOpenA',		//레이어 열기 버튼에 클래스 추가
			seletorClose : '.layerClose',		//레이어 닫음버튼
			pos : true,							//레이어팝업 위치 (true/fixed/center)
			mask : false,						//마스크  (true/false)
			focusEnter : true,					//열기, 닫기 버튼에 포커스 (true/false)
			effect : null,						//컨텐츠변경효과(show:default / fade / slide)
			aniTime : null,						//애니메이션 타임
			easing : null,						//애니메이션 효과
			defH : 0,							//레이어팝업 기본 top position (팝업의 높이가 화면보다 클 경우 사용)
			z_index : 9999
		};

		var opts = $.extend(settings, options),
			$self = $(this);

		if(opts.mask){
			$('body').append('<div class="'+opts.overlay+'"></div>');
			$('.' + opts.overlay +':gt(0)').remove();
		}

		return this.each(function(){

			//레이어 팝업
			function layerSize(){
				var docuH = $(document).height(),
					winW = $(window).width(),
					winH = $(window).height(),
					contW = $($self).outerWidth(),
					contH = $($self).outerHeight(),
					footerH = $('#footerWrap').height(),	// footer 하단 고정일 경우 빼야 될 높이
					layerTop;

				// 레이어 높이가 화면 높이보다 클 경우 default 값을 팝업 top position으로 지정
				if (contH > winH){ layerTop = opts.defH; }
				else { layerTop = winH/2 - contH/2; }

				if(opts.pos){
					$($self).addClass(opts.popClass).css({
						'position':'absolute',
						'top':layerTop,
						'left':winW/2 - contW/2,
						'z-index':opts.z_index
					});
					if(opts.pos == 'fixed'){
						$($self).css({
							'position':'fixed'
						});
					}else if(opts.pos == 'center'){
						if(winH < contH){
							if(($(window).scrollTop() + contH ) > docuH){
								$($self).css({ 'top':docuH - contH });
							}else{
								$($self).css({ 'top':$(window).scrollTop() + layerTop });
							}
						}else{
							$($self).css({ 'top':layerTop });
						}
					}
				}
				if(opts.focusEnter){$(opts.seletorClose).eq(0).focus();}	// 레이어 열리면서 닫기 버튼에 포커스
			}

			//마스크
			function maskSize(){
				var winW = $(window).width(),
					winH = $(window).height(),
					docuW = $(document).width(),
					docuH = $(document).height();

				if(opts.mask){
					$('.' + opts.overlay).width(winW).height(docuH).addClass(opts.overlayClass).css({
						'z-index':opts.z_index-1
					});
				}
			}

			function effectOpen(){
				switch(opts.effect){
					case"slide":$($self).slideDown(opts.aniTime,opts.easing);
					break;
					case"fade":$($self).fadeIn(opts.aniTime,opts.easing);
					break;
					default:$($self).show(opts.aniTime,opts.easing);
				};
			}

			function effectClose(){
				switch(opts.effect){
					case"slide":$($self).slideUp(opts.aniTime,opts.easing);
					break;
					case"fade":$($self).fadeOut(opts.aniTime,opts.easing);
					break;
					default:$($self).hide(opts.aniTime,opts.easing);
				};
			}

			//load 호출
			if(opts.autoOpen){
				layerSize();
				maskSize();
				effectOpen();
			}

			//리사이징
			$(window).resize(function(){
				if(opts.reSize){
					layerSize();
					if(opts.autoOpen){maskSize();}
				};
			});

			$(opts.seletorOpen).click(function(){

				$(this).addClass(opts.seletorOpenClass);	// 레이어 열기 버튼에 클래스 추가

				if(opts.mask){
					$('.' + opts.overlay).show();
				}
				effectOpen();
				layerSize();
				maskSize();
				return false;
			});

			$(opts.seletorClose).click(function(){
				effectClose();
				if(opts.mask){
					$('.' + opts.overlay).hide();
				}
                if(opts.btnOpID){
                    $('#'+ opts.btnOpID).focus().removeClass(opts.seletorOpenClass);
                }else{
				    $('.' + opts.seletorOpenClass).focus().removeClass(opts.seletorOpenClass);	// 레이어 닫히면서 열기 버튼에 포커스. 레이어 열기 버튼이 여러 개 있을 때 레이어를 연 버튼으로 다시 포커스 이동
                }
				return false;
				//alert("레이어 팝업이 닫힙니다."); //callback
			});

		});
	};	/*end*/

})(jQuery);	/*end ($)*/
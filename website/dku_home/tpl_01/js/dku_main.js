$(window).load(function(){
	//메인비주얼
	$(".main_visual").sliderkit({
		autospeed:5000,
		circular:true,
		fastchange:false
	});
});

$(function() {
    // 갤러리 슬라이드
    $('#myCarousel').carousel();
	
    // 메인 탭 메뉴	
    $('.tab-menu>dt:not(:first-child)').each(function() {
        var tmw = $(this).prevAll('dt').width();
        var tml = $(this).prevAll('dt').position().left;
        var tmp = tml + tmw - 4;
        $(this).css('left', tmp);
    });
    $('.tab-menu>dt>a').click(function() {
        // 메뉴를 css 로 제어할경우
        $(this).parents('dl').find('dt').removeClass('selected');
        $(this).parent().addClass('selected');
        $(this).parent().next('dd').show().siblings('dd').hide();
        return false;
    });

	//메인 스크롤 상단링크
	var amount = Math.max.apply(Math, $("#scroll_01 li").map(function() {
        return $(this).outerWidth(true);
    }).get());
    $("#scroll_01").mCustomScrollbar({
        axis: "x",
        advanced: {
            autoExpandHorizontalScroll: true
        },
        scrollButtons: {
            enable: true,
            scrollType: "stepped"
        },
        keyboard: {
            scrollType: "stepped"
        }
    });
	//메인 스크롤 하단링크
    var amount = Math.max.apply(Math, $("#scroll_02 li").map(function() {
        return $(this).outerWidth(true);
    }).get());
    $("#scroll_02").mCustomScrollbar({
        axis: "x",
        advanced: {
            autoExpandHorizontalScroll: true
        },
        scrollButtons: {
            enable: true,
            scrollType: "stepped"
        },
        keyboard: {
            scrollType: "stepped"
        }
    });

    $(window).resize(function() {
        var width = parseInt($(this).width());
        if (width < 1200 && width > 0) { //모바일 시 스크롤 생성
            $('.quick_menu_frame .quick_menu_list').removeClass('container');
        } else {
            $('.quick_menu_frame .quick_menu_list').addClass('container');
        };
        if (width <= 768 && width > 0) {
            $('.quick_menu_frame .quick_menu_list').addClass('mobile').removeClass('pc');
        } else {
            $('.quick_menu_frame .quick_menu_list').addClass('pc').removeClass('mobile');
        };

        if (width <= 768 && width > 0) {
            $("#scroll_01").mCustomScrollbar("update");
        } else {
            $("#scroll_01").mCustomScrollbar("disable");
            $("#mCSB_1_container").css('width', 'auto');
        };
    }).resize();
	
	//메인 슬라이드 버튼 레이아웃 컨트롤
	//$('.slidesjs-navigation').insertBefore('.txt_first');
	//$('.slidesjs-next').insertBefore('.txt_first');
	//$('a.slidesjs-previous').insertAfter('</div>');
})
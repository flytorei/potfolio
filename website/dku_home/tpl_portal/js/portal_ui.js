// JavaScript Document
jQuery(function ($) {

    $(".search_txt").focus(function () {

        return false;
        alert('1')

    });
    //GNB 토글
    $(".gnb_section_toggle").click(function () {
        $(".portal_side").animate({
            right: ["toggle", "swing"],
            opacity: "toggle",
            width: "240px"
        });
    });
    $(".portal_nav .dropdown-toggle").click(function () {
        $(this).next().slideToggle("fast").parent().siblings().children(".dropdown-menu").hide();
        //$(".dku_all_menu").slideUp("fast");
        return false;
    });
    //상단유틸, 네비게이션 모바일 이동
    $(".find_util").append($(".util_move").html());
    $(".find_gnb_section").append($(".gnb_section_move").html());

    $(window).resize(function () {
        var width = parseInt($(this).width());
        if (width > 979) {
            $(".util_move").css("display", "block");
            $(".find_util").css("display", "none");

            $(".gnb_section_move").css("display", "block");
            $(".find_gnb_section").css("display", "none");


        } else if (width < 979 && width > 0) {
            $(".util_move").css("display", "none");
            $(".find_util").css("display", "block");

            $(".gnb_section_move").css("display", "none");
            $(".find_gnb_section").css("display", "block");
        };
    }).resize();

    //텍스트 슬라이드 링크
    $(".dku_textlink").sliderkit({
        auto: false,
        verticalnav: true,
        shownavitems: 5,
        scrolleasing: "easeOutExpo",
        scrollspeed: 1500

    });
    //옵션
    $(".widget_btn_option button").click(function () {
        $(this).next().slideToggle("fast").parent().siblings().children(".dropdown-menu").hide();
        //$(".dku_all_menu").slideUp("fast");
        return false;
    });
    //$('.dropdown-toggle').dropdown()

    //DKU TPDAY 탭메뉴
    YUI().use(
        'aui-tabview',
        function (Y) {
            new Y.TabView({
                srcNode: '.tabbable'
            }).render();
        }
    );


    //기본 레이아웃 셀렉트박스
    $('select.select').each(function () {
        var title = $(this).attr('title');
        if ($('option:selected', this).val() != '') title = $('option:selected', this).text();
        $(this)
            .css({
                'z-index': 10,
                'opacity': 0,
                '-khtml-appearance': 'none'
            })
            .after('<span class="select">' + title + '</span>')
            .change(function () {
                val = $('option:selected', this).text();
                $(this).next().text(val);
            })
    });

    //툴팁
    /*
	$( ".widget_section *" ).tooltip({
		show: {
			effect: "slideDown",
			delay: 250,
		},
		hide: {
			delay: 50000
		}
	});
	*/
    //#basic_section
    var $container = $('#basic_section').packery({
        columnWidth: 210,
        rowHeight: 270,
        gutter: 10
    });

    //#dragging_section
    var $container = $('#dragging_section, #wrap_widget').packery({
        columnWidth: 210,
        rowHeight: 270,
        gutter: 10
    });

    $container.find('.item').each(function (i, itemElem) {
        // make element draggable with Draggabilly
        var draggie = new Draggabilly(itemElem);
        // bind Draggabilly events to Packery
        $container.packery('bindDraggabillyEvents', draggie);
    });

    // 슬라이드 이미지
    $(".contentslider-std").sliderkit({
        auto: 0, // 0:수동  1:자동
        tabs: 1,
        circular: 1,
        panelfx: "sliding", //  panelfx:"sliding" 슬라이드 없으면 페이드
        //   panelfxfirst:"fading",                      // panelfxfirst:"fading"  처음로드시 페이드 없으면 디폴트
        panelfxeasing: "easeInOutExpo",
        fastchange: 0,
        keyboard: 1,
        autospeed: 2000, // autospeed:1000  이미지 전환시간 1000 == 1초  
    });

    // 모바일 일때 가로사이즈 100% 변함
    var win_w = $(window).width();
    $('.item').addClass('option');
    if (win_w < 767) {
        $('.option').css({
            'width': 100 + '%',
            'left': 0
        })
        $('div').removeClass('item');
    } else if (win_w >= 767) {
        $('.option').addClass('item')
    }

    $(window).resize(function () {

        var win_w = $(window).width();
        if (win_w < 767) {
            $('.option').css({
                'width': 100 + '%'
            })
            $('div').removeClass('item');
        } else if (win_w >= 767) {
            $('.option').addClass('item')
        }
    });
    //탭메뉴(교외행사/취업특강)
    $(".dku_event .tab_content").hide();
    $(".dku_event .tab_content:first").show();
    $(".dku_event ul.tabs li").click(function () {
        $(".dku_event ul.tabs li").removeClass("on");
        $(this).addClass("on");
        $(".dku_event .tab_content").hide();
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn("fast");
    });


    //탭메뉴(식단)
    $(".dku_food>.list_area>.tab_content").hide();
    $(".dku_food>.list_area>.tab_content:first").show();
    $(".dku_food>ul.tabs li").click(function () {
        $(".dku_food>ul.tabs li").removeClass("on");
        $(this).addClass("on");
        $(".dku_food>.list_area>.tab_content").hide();
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn("fast");
    });
    //죽전탭
    $("#food_tab1>.tab_content").hide();
    $("#food_tab1>.tab_content:first").show();
    $("#food_tab1>.tabs li").click(function () {
        $("#food_tab1>ul.tabs li").removeClass("on");
        $(this).addClass("on");
        $("#food_tab1>.tab_content").hide();
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn("fast");
    });
    //천안탭
    $("#food_tab2>.tab_content").hide();
    $("#food_tab2>.tab_content:first").show();
    $("#food_tab2>.tabs li").click(function () {
        $("#food_tab2>ul.tabs li").removeClass("on");
        $(this).addClass("on");
        $("#food_tab2>.tab_content").hide();
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn("fast");
    });

    //탭메뉴(수업공지/장학공지)
    $(".dku_class_notice .tab_content").hide();
    $(".dku_class_notice .tab_content:first").show();
    $(".dku_class_notice ul.tabs li").click(function () {
        $(".dku_class_notice ul.tabs li").removeClass("on");
        $(this).addClass("on");
        $(".dku_class_notice .tab_content").hide();
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn("fast");
    });

    //웅성웅성 / 벼룩시장 / 분실물/유실물/하숙)
    $(".dku_market .tab_content").hide();
    $(".dku_market .tab_content:first").show();
    $(".dku_market ul.tabs li").click(function () {
        $(".dku_market ul.tabs li").removeClass("on");
        $(this).addClass("on");
        $(".dku_market .tab_content").hide();
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn("fast");
    });
});
$(window).load(function () {
    $(".dku_food .list_area .tab_content>.tab_content").mCustomScrollbar({
        axis: "y",
        advanced: {
            autoExpandHorizontalScroll: true
        },
        scrollButtons: {
            enable: false,
            scrollType: "stepped"
        },
        keyboard: {
            scrollType: "stepped"
        }
    });
    //GNB높이
    var main_ContHeight = $(".potal_content").outerHeight();
    $(".portal_side").css('height', main_ContHeight);

    var sub_ContHeight = $("#column-2").outerHeight() + 100;
    $(".nav-menu").css('min-height', sub_ContHeight);




});
$(function () {
    //GNB토글
    $('#gnb .nav>li>a,#gnb .btn_close_area button').click(function () {
        $('#gnb .nav li ul.a').slideToggle('fast');
        $('#gnb .btn_close_area').toggle();
    });

    //모바일 GNB버튼 토글
    $('.btn_mobile_gnb').click(function () {
        $('#gnb').slideToggle('fast');
    });

    $('.spon_list .n_02, .spon_list .n_03 ').on('click', function () {
        alert('서비스 준비중입니다.');
        return false;
    })
});

function funLoad() {
        //반응형 GNB체크
        var width = parseInt($(window).width()) - 16;
        if (width > 980) {
            $("#gnb").css("display", "block");
            $("body").addClass("pc");
            $("body").removeClass("mobile");
        } else if (width < 980 && width > 0) {
            $("#gnb").css("display", "none");
            $("body").removeClass("pc");
            $("body").addClass("mobile");
        }
    }
    //window.onload = funLoad;
window.onresize = funLoad;

$(window).load(function () {
    //메인비주얼
    /*
    $(".main_visual").sliderkit({
        shownavitems: 3,
        autospeed: 3000,
        mousewheel: false,
        circular: true
    });
	*/
    $(".main_visual_section .sliderkit-nav-clip,.main_visual .sliderkit-nav-clip ul").css("width", "auto");
    $(".main_visual_section .sliderkit-nav-clip,.main_visual .sliderkit-nav-clip ul").css("height", "auto");
    $(".main_visual_section .sliderkit-nav-clip ul li").css("width", "auto");
    $(".main_visual_section .sliderkit-nav-clip ul li").css("height", "auto");

    //메인 스크롤
    $(".main_scroll_banner_section .main_scroll").mCustomScrollbar({
        axis: "x",
        alwaysShowScrollbar: 2,
        advanced: {
            autoExpandHorizontalScroll: true
        },
        mouseWheel:{ scrollAmount: 215 },//휠 움직이는 넓이
        scrollButtons: {
            enable: true,
            scrollType: "stepped",
            scrollAmount: 215
        },
        keyboard: {
            scrollType: "stepped"
        }
    });
});

//셀렉트 링크
function go_url() {
    var url = document.getElementById("CList").value;
    if (url != "") {
        window.open(url);
    }
};

$(window).scroll(function () {
    //퀵메뉴
    var quick_menu = $("#quick_menu");
    var quick_top = 0;
    var height = $(document).scrollTop();
    if (height > 320) {
        // quick menu initialization
        quick_menu.css('position', 'fixed');
    } else {
        quick_menu.css('position', 'absolute');
    };
})
function setupPackery() {
    //#basic_section
    $container = $('#main_content_section').packery({
        columnWidth: 285,
        rowHeight: 255,
        gutter: 10
    });
}
$(document).ready(function () {
    //위젯 초기화
    setupPackery();



    //모바일 GNB버튼 토글
    $('.btn_mobile_gnb').click(function () {
        $('#gnb').slideToggle('fast');
    });

    //GNB토글
    $('#gnb .nav>li>a,#gnb .btn_close_area button').click(function () {
        $('.inner_nav_area').slideToggle('fast');
        $('#gnb .btn_close_area').toggle();
    });



});

function funLoad() {

    //반응형 GNB체크
    var width = parseInt(window.outerWidth) - 16;
    //var height = parseInt(window.outerHeight) - 30;
    var height = $(window).height() - 30;
    if (width > 980) { //980px 이상
        $("#gnb").mCustomScrollbar("disable");

        $("#gnb").css("display", "block");
        $("#gnb .nav").css("display", "block");
        $("#gnb .btn_close_area").css("display", "none");
        $("#gnb .nav ul.a").css("display", "none");
        $("#header #gnb .inner_nav_area").css("display", "none");
        $("body").addClass("pc");
        $("body").removeClass("mobile");
        $("#header #gnb .inner_nav_area .inner_nav ul.a").css("display", "block");
        $("#gnb").css('height', 'auto');
        $("#mCSB_2").css('overflow', 'visible');
        $("#mCSB_2_container").css('overflow', 'visible');
    }
    if (width < 980) { //980px 이하
        $("#gnb").css("display", "none");
        $("#gnb .nav").css("display", "none");
        $("#gnb .btn_close_area").css("display", "block");
        $("#gnb .nav ul.a").css("display", "none");
        $("#header #gnb .inner_nav_area").css("display", "block");
        $("body").removeClass("pc");
        $("body").addClass("mobile");
        //모바일 GNB높이 및 스크롤

        $("#gnb").css('height', height);
        //$("#mCSB_2_scrollbar_vertical").css('display', 'block');
        $("#mCSB_2").css('overflow', 'hidden');
        $("#mCSB_2_container").css('overflow', 'hidden');
        $("#gnb").mCustomScrollbar({
            axis: "y",
            advanced: {
                autoExpandHorizontalScroll: true
            },
            keyboard: {
                scrollType: "stepped"
            }
        });
        $("#gnb").mCustomScrollbar("update");

        // 모바일 일때 가로사이즈 100% 변함
        var win_w = parseInt(window.outerWidth) - 16;
        $('.item').addClass('option');
        if (win_w < 580) {
            $('.option').css({
                'left': 'auto'
            });
            //$('.option').removeClass('item');
        }
        if (win_w > 580) {
            //$('.option').addClass('item');

        };
    };
    //메인 BG 높이값
    var height = parseInt(window.outerHeight);
    $(".random_bg").css('height', height);


    /*
        var body = document.body,
            html = document.documentElement;
        var height = Math.max(body.scrollHeight,
            body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        $("body.body_main").css('height', height);
    */

}
window.onload = funLoad;
window.onresize = funLoad;

$(window).load(function () {

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
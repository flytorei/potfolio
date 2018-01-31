$(function () {
    //전체메뉴 토글
    $('#gnb .nav>li>a').click(function () {
        $('.sub_menu').hide();
        $(this).next().slideToggle("fast");
    });

    //닫기 버튼
    $('.btn_close').on('click', function () {
        $('.sub_menu').hide();
    })

    $(".main_visual").sliderkit({
        auto: 1, // 0:수동  1:자동
        tabs: 1,
        circular: 1,
        // panelfx: "sliding", //  panelfx:"sliding" 슬라이드 없으면 페이드
        //   panelfxfirst:"fading",                      // panelfxfirst:"fading"  처음로드시 페이드 없으면 디폴트
        panelfxeasing: "easeInOutExpo",
        fastchange: 0,
        keyboard: 1,
        autospeed: 2000 // autospeed:1000  이미지 전환시간 1000 == 1초

    });
    $(".latest_wrap").sliderkit({
        auto: 0, // 0:수동  1:자동
        tabs: 1,
        circular: 1,
        // panelfx: "sliding", //  panelfx:"sliding" 슬라이드 없으면 페이드
        //   panelfxfirst:"fading",                      // panelfxfirst:"fading"  처음로드시 페이드 없으면 디폴트
        panelfxeasing: "easeInOutExpo",
        fastchange: 0,
        keyboard: 1,
        autospeed: 2000 // autospeed:1000  이미지 전환시간 1000 == 1초

    });

    $('.latest').on('mouseover', function () {
        $('.latest').removeClass('selected');
        $(this).addClass('selected');
    })

    //모바일 GNB 토글
    $(".gnb_section_toggle").click(function () {
        $("#gnb #navigation").animate({
            //right: ["toggle", "swing"],
            opacity: "toggle"
                //width: "240px"
        });
    });

    //반응형 GNB체크
    $(window).resize(function () {
        var width = parseInt($(this).width());
        if (width > 963) {
            $("#gnb #navigation").css("display", "block");
        } else if (width < 963 && width > 0) {
            $("#gnb #navigation").css("display", "none");
        }
    }).resize();

    //하단 셀렉트박스
    $('.foot_selectbox select.select').each(function () {
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
});
//셀렉트 링크
function go_url() {
    var url = document.getElementById("CList").value;
    if (url != "") {
        window.open(url);
    }
}
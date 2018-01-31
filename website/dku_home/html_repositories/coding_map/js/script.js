$(function($){
	
    $('a').click(function(){
        if($(this).attr('href') == '#none'){
            return false;
        }
    })
    var dw = $(document).width();
    var dh = $(document).height();
    $('.overlay').css({'height':dh}, {'width':dw});

    // 수정이력
    var history = $('.hisList');
    var btnDate = history.find('a');

    history.each(function(){
        history.find('li:first-child').addClass('on');
        $(this).wrap('<div class="hisWrap" />');
        var nodes=$(this).children();
        if(nodes.length>1){
            $('<a class="btn off btnHis" />').prependTo($(this).parent('div')).text('수정이력');
        }
    });
    btnDate.hover(function(){
        $(this).children('span').toggle();
    });
    $('.btnHis').click(function(){
        $(this).toggleClass('off');
        $(this).next(history).children('li:not(.on)').toggle();
    });

    // 메뉴 탭
    var tm = $('.menu>dt');
    var tc = $('.menu>dd');
    var btnAll = $('.viewAll');
    var menu = tm.not(btnAll);

    $('.menu>dt.selected').next('dd').show();
    btnAll.click(function(){
        tm.not($(this).addClass('selected')).removeClass('selected');
        tc.show();
    });
    menu.click(function(){
        tm.not($(this).addClass('selected')).removeClass('selected');
        $(this).next('dd').show().siblings('dd').hide();
    });
    menu.not(menu.eq(0)).each(function(){
        var tmw = $(this).prevAll('dt').width();
        var tml = $(this).prevAll('dt').position().left;
        var tmp = tml+tmw;
        $(this).css('left', tmp);
    });

    //etc
    $('.tip').hover(function(){
        $(this).find('span').toggle();
    });
    $('.notice li').append('<span class="bul"></span>');

    //상태
    $('.hold').attr('title','보류');
    $('.del').attr('title','삭제');
    $('.ing').attr('title','미완');
    $('.link').attr('title','링크');
    $('.noHtml').attr('title','html페이지 아님');

    // to top
    var scrollDiv = document.createElement('div');
    $(scrollDiv).attr('id', 'toTop').html('<a href="#none">↑ 처음으로 이동</a>').appendTo('body');
    $(window).scroll(function(){
        if ($(this).scrollTop() != 0) {
            $('#toTop').fadeIn();
        } else {
            $('#toTop').fadeOut();
        }
    });
    $('#toTop').click(function(){
        $('body,html').animate({scrollTop: 0},	600);
    });
    $('.overlay').click(function(){
        $('.dNotice').hide(200); $('.overlay').fadeOut();
    })
});
$(window).ready(function(e) {
    //--total
    var total=$('tbody tr:not(.del, .link, .noHtml) td ul').length;
    var complete=$('tbody tr:not(.del, .link, .noHtml) td .hisList').length;
    var per = (complete/total*100).toFixed(1);

    $('.siteInfo dd span').eq(0).text(total + 'p');
    $('.siteInfo dd span').eq(1).text(complete + 'p');
    $('.siteInfo dd span').eq(2).text(per + '%');
    //--total end
    subCate();
});

// 서브 카테고리 작업률
function subCate(){
    var tArr = [];
    var cArr = [];
    var pArr = [];
    var ddLength = $('.menu dd').length;
    for(var i=0; i<ddLength; i++){
        var tLength = $('.menuWrap .menu dd').eq(i).find('tbody tr').length;
        var cLength = $('.menuWrap .menu dd').eq(i).find('tbody tr:not(.del, .link, .noHtml) td .hisList').length;

        tLength = tLength;
        cLength = cLength;
        tArr.push(tLength);
        cArr.push(cLength);

        $('.menu dd').eq(i).find('.tit').append('<span style="margin-left: 10px">총 페이지수 : '+tArr[i]+'</span>');
        $('.menu dd').eq(i).find('.tit').append('<span style="margin-left: 10px">작업 페이지수 : '+cArr[i]+'</span>');
    }
    pArr[0] = (cArr[0]/tArr[0]*100).toFixed(1);
    pArr[1] = (cArr[1]/tArr[1]*100).toFixed(1);
    pArr[2] = (cArr[2]/tArr[2]*100).toFixed(1);
    pArr[3] = (cArr[3]/tArr[3]*100).toFixed(1);
    pArr[4] = (cArr[4]/tArr[4]*100).toFixed(1);
    pArr[5] = (cArr[5]/tArr[5]*100).toFixed(1);
    pArr[6] = (cArr[6]/tArr[6]*100).toFixed(1);
    pArr[7] = (cArr[7]/tArr[7]*100).toFixed(1);
    $('.menu dd').eq(0).find('.tit').append('<span style="margin-left: 10px">작업률 : '+pArr[0].toString()+'%</span>');
    $('.menu dd').eq(1).find('.tit').append('<span style="margin-left: 10px">작업률 : '+pArr[1].toString()+'%</span>');
    $('.menu dd').eq(2).find('.tit').append('<span style="margin-left: 10px">작업률 : '+pArr[2].toString()+'%</span>');
    $('.menu dd').eq(3).find('.tit').append('<span style="margin-left: 10px">작업률 : '+pArr[3].toString()+'%</span>');
    $('.menu dd').eq(4).find('.tit').append('<span style="margin-left: 10px">작업률 : '+pArr[4].toString()+'%</span>');
    $('.menu dd').eq(5).find('.tit').append('<span style="margin-left: 10px">작업률 : '+pArr[5].toString()+'%</span>');
    $('.menu dd').eq(6).find('.tit').append('<span style="margin-left: 10px">작업률 : '+pArr[6].toString()+'%</span>');
    $('.menu dd').eq(7).find('.tit').append('<span style="margin-left: 10px">작업률 : '+pArr[7].toString()+'%</span>');
}
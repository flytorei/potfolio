/**
 * Created with JetBrains PhpStorm.
 * User: fus
 * Date: 14. 11. 19
 * Time: 오전 11:47
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){

    $(".tab-type1 .triangle").css({"left":($(".tab-type1 .tab-button li").eq(0).width()/2)+"px"});

    var left_v = 0;
    var width_v = 0;

    $(".tab-type1 .tab-contents").eq(0).show();

    $(".tab-type1 .tab-button li").click(function(e){
        var index = $(this).index();
        $(".tab-type1 .tab-button li").removeClass('on');
        $(this).addClass('on');

        width_v = $(".tab-type1 .tab-button li").width();

        left_v = (width_v*index) + (width_v/2);

        /*
         switch(index){
         case 0 :
         left_v = width_v/2;
         break;
         case 1 :
         left_v = width_v+(width_v/2);
         break;
         case 2 :
         left_v = width_v+width_v+(width_v/2);
         break;
         }
         */
        $(".tab-type1 .triangle").css({"left":left_v+"px"});
        //console.log($(".tab-type1 .tab-contents:after"));

        $(".tab-type1 .tab-contents").hide();
        $(".tab-type1 .tab-contents").eq(index).show();
    });

});

$(document).ready(function(){
    $(".tab-content").eq(0).show();
    $(".tab-type2 li").click(function(e) {
        e.preventDefault();
        var index = $('.tab-type2 li').index($(this));

        $(".tab-type2 li").removeClass("on");
        $(".tab-type2 li").eq(index).addClass("on");
        $(".tab-content").hide();
        $(".tab-content").eq(index).show();
    });
});

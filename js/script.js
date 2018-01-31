$(document).ready(function(){
    $('.pop_open').popUp({fade:true})
    popSize();
    thumImg();
})

function thumImg(){
    $(".fotlist li").each(function(e){
        var outH = $(".fotlist .img_wrap").height();
        var nW = $(".fotlist img").get(e).naturalWidth; 
        var nH = $(".fotlist img").get(e).naturalHeight;

        if(nW > nH || nW == nH){
           $(".fotlist img").eq(e).css({
                width:'100%'
           })
        }else if(nW < nH){
           $(".fotlist img").eq(e).css({
                height:outH
           })
        }

    
    })      
}


function popSize(){
    var height = $(window).height();
    var width = $('.layer_pop').outerWidth();
    console.log(width)
    var centerW = -width / 2
      $('.layer_pop').css({
         "margin-left": centerW,
         "height":height - 100
    })
}



$(window).on('resize',function(){
    popSize()
})




/*팝업*/
jQuery.fn.popUp = function(opts){   
    var $opts = {
        layerPop:'.layer_pop',
        fade:false,
        dim:true
    };
    $.extend($opts,opts);
    
    var $popL = $($opts.layerPop);    
    var $select =$(this); 
    var $fade = $opts.fade
    var $dim = $opts.dim
    
    return $select.on("click",function(e){
        var $p_this=$(this);
        var $href = $(this).attr('href');
        /*페이드 효과*/
        if($fade==false){
            $($href).attr('tabindex',0).show().focus();
        }else{
            $($href).attr('tabindex',0).fadeIn().focus();
        }
        
        /*딤 생성*/
        if($dim==true){
            $('.wrap').append('<div class="dim"></div>')
            $(".dim").show();
            $(".dim").css({
                background:'#000',
                opacity:'0.7',
                position:'fixed',
                top:0,
                left:0,
                width:'100%',
                height:'100%',
                zIndex:998
            })
        }else{
            $(".dim").hide();
        } 
        var bodyH = $(window).outerHeight();
        var bodyW = $(window).outerWidth();
        var layerH = $popL.outerHeight();
        var layerW = $popL.outerWidth();
        var centerH = (bodyH / 2) - (layerH / 2 + 100);
        var centerW = -layerW / 2
        $popL.css({
            "top": /*centerH*/50,
            "margin-left": centerW,
            zIndex:999
        });
        $("body").css({
            "overflow": 'hidden'
        });
       
        $popL.find('.cls').on("click", function () {
            var $this  = $(this);
            $popL.hide();                                          
            $(".dim").remove();
            $("body").css({
                "overflow": 'inherit'
            });
            $p_this.focus();      
        }) 
        $('.dim').on("click", function () {
            var $this  = $(this);
            $popL.hide();                                          
            $(".dim").remove();
            $("body").css({
                "overflow": 'inherit'
            });
            $p_this.focus();      
        }) 
    });  
}
/* // 팝업*/
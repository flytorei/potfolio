$(document).ready(function () {  

  /*gnb*/    
  $('.gnb li').on('hover',function(){          
      $(this).addClass('on').siblings().removeClass('on')
  })
  $('.gnb li').on('mouseleave',function(){
      $(this).removeClass('on')
  })
   /* //gnb*/ 

  $('.tab_sel.t_01 a').on('click',function(){
      $('.tab_sel.t_01 a').removeClass('on')
      $(this).addClass('on')
  })
   $('.tab_sel.t_02 a').on('click',function(){
      $('.tab_sel.t_02 a').removeClass('on')
      $(this).addClass('on')
  })

  $('.top_wrap.tw_01 a').on('click',function(){
      $('.top_wrap.tw_01 a').removeClass('on')
      $(this).addClass('on')
  })

   $('.top_wrap.tw_02 a').on('click',function(){
      $('.top_wrap.tw_02 a').removeClass('on')
      $(this).addClass('on')
  })

   $('.notice_box .list a').on('click',function(){
      $('.notice_box .list a').removeClass('on')
      $(this).addClass('on')
  })
   
    $('.brains .tab_cate a').on('click',function(){
      $('.brains .tab_cate a').removeClass('on')
      $(this).addClass('on')
  })
    
    
    
    
    /*트리메뉴*/    
	var tree_menu = $('#tree_menu');
	var icon_open = '../images/2016_new/tree_open.gif';
	var icon_close = '../images/2016_new/tree_close.gif';
	
	tree_menu.find('li:has("ul")').prepend('<a href="#" class="control"><img src="' + icon_close + '" /></a> ');
	tree_menu.find('li:last-child').addClass('end');
	
	$('.control').click(function(){
		var temp_el = $(this).parent().find('>ul');
		if (temp_el.css('display') == 'none'){
			temp_el.slideDown(100);
			$(this).find('img').attr('src', icon_close);
			return false;
		} else {
			temp_el.slideUp(100);
			$(this).find('img').attr('src', icon_open);
			return false;
		}
	});
	
	function tree_init(status){
		if (status == 'close'){
			tree_menu.find('ul').hide();
			$('a.control').find('img').attr('src', icon_open);
		} else if (status == 'open'){
			tree_menu.find('ul').show();
			$('a.control').find('img').attr('src', icon_close);
		}
	}
	tree_init('close');
	
	/* CSS 토글버튼 */
	$('#css_use').toggle(function(){
		$('link').attr('href', '');
		$(this).text('CSS (O)');
	},function(){
		$('link').attr('href', 'tree.css');
		$(this).text('CSS (X)');
	});
	/* OPEN & CLOSE */
	$('#all').toggle(function(){
		tree_init('open');
		$(this).text('ALL CLOSE');
	},function(){
		tree_init('close');
		$(this).text('ALL OPEN');
	});
    /* //트리메뉴*/ 
    
    //스크롤바
     $(".nano").nanoScroller({
         alwaysVisible: true
     });    
   
});


  // 호환성 체크
    window.onload=function(){
        getBrowserType();
        
        var rv;
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if(re.exec( navigator.userAgent ) != null) rv = parseFloat(RegExp.$1);


        if(rv == '7'){            
            document.getElementsByTagName('html')[0].className = "ie7";       
        }    
    }    

    function getBrowserType(){
          
        var _ua = navigator.userAgent;
        var rv = -1;
         
        //IE 11,10,9,8
        var trident = _ua.match(/Trident\/(\d.\d)/i);
        if( trident != null )
        {
            if( trident[1] == "7.0" ) return rv = "IE" + 11;
            if( trident[1] == "6.0" ) return rv = "IE" + 10;
            if( trident[1] == "5.0" ) return rv = "IE" + 9;
            if( trident[1] == "4.0" ) return rv = "IE" + 8;
        }
         
        //IE 7...
        if( navigator.appName == 'Microsoft Internet Explorer' ) return rv = "IE" + 7;
         
        
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if(re.exec(_ua) != null) rv = parseFloat(RegExp.$1);
        if( rv == 7 ) return rv = "IE" + 7; 
        
         
        //other
        var agt = _ua.toLowerCase();
        if (agt.indexOf("chrome") != -1) return 'Chrome';
        if (agt.indexOf("opera") != -1) return 'Opera'; 
        if (agt.indexOf("staroffice") != -1) return 'Star Office'; 
        if (agt.indexOf("webtv") != -1) return 'WebTV'; 
        if (agt.indexOf("beonex") != -1) return 'Beonex'; 
        if (agt.indexOf("chimera") != -1) return 'Chimera'; 
        if (agt.indexOf("netpositive") != -1) return 'NetPositive'; 
        if (agt.indexOf("phoenix") != -1) return 'Phoenix'; 
        if (agt.indexOf("firefox") != -1) return 'Firefox'; 
        if (agt.indexOf("safari") != -1) return 'Safari'; 
        if (agt.indexOf("skipstone") != -1) return 'SkipStone'; 
        if (agt.indexOf("netscape") != -1) return 'Netscape'; 
        if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';
    }
         // 호환성 체크



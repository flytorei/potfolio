var pub_ui = {};

pub_ui.init = function() {
	// accordion
	var accorCont = $('.js_faq_conts .js_acont'),
		accorTit = $('.js_faq_conts .js_qtitle > a');
    accorCont.hide();
    accorTit.on('click', function(e) {
		e.preventDefault();
		var accorItem = $(this).parent().parent();
		if (accorItem.hasClass('on') == false) {
			accorItem.siblings().children('.js_acont').slideUp(100);
			accorItem.siblings().removeClass('on');
			accorItem.siblings().children('.js_qtitle').find('.arrow').text('펼침');
			$(this).parent().next().slideDown(100);
			accorItem.addClass('on');
			$(this).find('.arrow').text('접힘');
		} else {
			accorItem.removeClass('on');
			$(this).parent().next().slideUp(100);
			$(this).find('.arrow').text('펼침');
		}
    });
    $('.js_faq_conts.organ').find('.js_qtitle a').trigger('click');

	// tab
	var tabCont = $('.js_tab_conts > .js_tcont'),
		tabs = $('.js_tabs > li'),
		tabLink = tabs.find('>a');
	tabCont.hide();
	tabs.each(function(){
		if($(this).hasClass('on')){
			var tabID = $(this).children('a').attr('href');
			$(tabID).show();
			$(this).children('a').attr('title','선택된 탭');
		}
	});
	tabLink.on('click', function(e){
		e.preventDefault();
		$(this).parent().parent().parent().children('.js_tcont').hide();
		$(this).parent('li').addClass('on').siblings().removeClass('on');
		$(this).parent('li').siblings().children('a').attr('title','');
		var tabID = $(this).attr('href');
		$(tabID).show();
		$(this).attr('title','선택된 탭');
	});

	// tab type 03
	var tab03 = $('.g_tab_03 ul');
	tab03.each(function(){
		var t = $(this),
		    tw = 0;
		$('li', t).each(function(){
			tw += $(this).outerWidth(true);
		});

		t.css('width', tw + 2);
	});

    // layer box
    var gLayerBox = $('.g_layer_box');
    gLayerBox.hide();
    $('.open_layer').on('click', function(e) {
		e.preventDefault();
		var layerID = $(this).attr('href');
		$(layerID).show().append('<div class="dim">&nbsp;</div>').focus();
		pub_ui.layerPop(layerID);
		$('html, body').css({
			'height' : '100%',
			'overflow' : 'hidden'
		});
    });

    gLayerBox.on('click', '.dim, .btn_layer_close', function() {
		gLayerBox.hide();
		$('.dim').remove(); 
		$('html, body').css({
			'height' : '',
			'overflow' : ''
		});
		var href = $(this).closest('.g_layer_box').attr('id');
		$('[href="#' + href + '"]').focus();
	});

    gLayerBox.each(function() {
		pub_ui.layerPop(this);
		$(this).attr('tabindex', '0');
    });

	// top btn
    var goTopBtn = $('#gotop');
    $(window).scroll(function() {
		if ($(this).scrollTop() > 100) {
			//goTopBtn.fadeIn(200);
			goTopBtn.show();
		} else {
			//goTopBtn.fadeOut(200);
			goTopBtn.hide();
		}
    });
    goTopBtn.on('click', function() {
		$('html, body').animate({
			scrollTop : 0
		}, 200);
		return false;
    });

	//footer
	var footerH = $('footer').outerHeight() + 6;
	if($('footer').length > 0){
		$('body').css('padding-bottom',footerH);
	}
};

// layer popup
pub_ui.layerPop = function(layerThis) {
    var layer = $(layerThis).find('.inner'), 
		 layerH = layer.outerHeight(), 
		 layerCont = layer.find('.g_layer_container'), 
		 windowRH = $(window).height(), windowH = $(window).height() - 60, // 60 is layer top/bottom margin.
		 layerHeaderH = layer.find('.g_layer_header').height(), 
		 layerFooterH = layer.find('.g_layer_footer').outerHeight(),
		 layerRealH = layer.find('.inside').outerHeight() + layerHeaderH + layerFooterH;

    if (layerRealH >= windowH) {
		if (windowH < 250) {
			windowH = 250; // 250 is window min-height.
		} 
		layerH = windowH;
		layerCont.height(windowH - layerHeaderH - layerFooterH);
	} else {
		layerH = layerRealH;
		layerCont.height(layerRealH - layerHeaderH - layerFooterH);
    }

    layer.css({
		'margin-top' : -layerH / 2
    });
};

//main
pub_ui.fnMain = function() {
	// call roll banner 
	if ($.fn.bxSlider) {
		var rollingBanner = $('.main_visual ul');
		rollingBanSlider = rollingBanner.bxSlider({
			pager : true,
			controls : true,
			//auto: true,
			//pause: 2000
		});
		var rollBanSlideQty = rollingBanSlider.getSlideCount();
		if (rollBanSlideQty == 1) {
			rollingBanSlider.destroySlider();
		}
	}

	// show my notice
	var myArea = $('.main_myarea'),
		showNotiBtn = myArea.find('.btn_view'),
		showNotiBox = myArea.find('.mynotice');
	
	showNotiBtn.on('click', function(e) {
		e.preventDefault();
		if (myArea.hasClass('on') == false) {
			showNotiBox.slideDown(100);
			myArea.addClass('on');
			$(this).text('접혀놓기');
		} else {
			myArea.removeClass('on');
			showNotiBox.slideUp(100);
			$(this).text('펼쳐보기');
		}
    });
};

//menu
pub_ui.fnMenu = function() {
	// menu
	$('.main_menu_box li:has(>ul)').addClass('has_sub');
	var menu = $('.main_menu_box'),
		hasSubLink = $('.has_sub > a');

	hasSubLink.on('click', function(e) {
		e.preventDefault();
		var menuItem = $(this).parent();
		if (menuItem.hasClass('on') == false) {
			menuItem.siblings().children('ul').hide();
			menuItem.siblings().removeClass('on');
			$(this).next().show();
			menuItem.addClass('on');

			var dep02OnLi = $('.on > .depth02 > li'),
				dep02NotOnN = 0;
			dep02OnLi.each(function(){
				if ($(this).hasClass('on')){
					$(this).parent().next().hide();
					menu.find('>ul').addClass('bgchange');
				} else {
					dep02NotOnN = dep02NotOnN + 1;
				}
			});

			if (dep02OnLi.length == dep02NotOnN){
				menu.find('>ul').removeClass('bgchange');
			}

			var dep02H = $('.on > .depth02').outerHeight(),
				dep03H = -1;
			if ($(this).parent().parent().hasClass('depth01') == false) { //1depth 아닌 depth 클릭하였을 때
				if ($(this).parent().parent().hasClass('depth02') == true) { //2depth 클릭하였을 때
					dep03H = $(this).next().outerHeight();
					menu.find('>ul').addClass('bgchange');
				}

				if ($(this).parent().parent().hasClass('depth03') == true) { //3depth 클릭하였을 때
					dep03H = $(this).closest('.depth03').outerHeight();
				}
			} else { 
				dep03H = $(this).next().children('.on').find('.depth03').outerHeight();
			}

			if (dep03H > dep02H) {
				menu.height(dep03H + 56);
			} else {
				menu.height('');
			}	
		}

		$('body').animate({ scrollTop: $('body').prop('scrollHeight')}, 500);
    });

	pub_ui.bgMenu();
	$(window).resize(function() {
		pub_ui.bgMenu();
	});
};
pub_ui.bgMenu = function() {
	var menu = $('.main_menu_box'),
		dep0104Ul = menu.find('>ul>li:eq(3)>ul'),
		dep0104UlW = dep0104Ul.outerWidth(),
		dep0104UlH = dep0104Ul.outerHeight();

	if (0.5 < dep0104UlW/dep0104UlH){
		dep0104Ul.next().addClass('bgafteron');
	} else {
		dep0104Ul.next().removeClass('bgafteron');
	}
}

// login bg
pub_ui.fnLoginBg = function() {
	var winH = $(window).height(),
		headerH = $('#header').outerHeight(),
		footerH = $('#footer').outerHeight(),
		loginWrap = $('.login_wrap');

	loginWrap.css('min-height', winH - headerH - footerH - 55); //.login_wrap padding-bottom is 55px.
};

// 학사일정
pub_ui.fnMcou = function(){
	// scroll
	var lastId,
		topMenu = $('.acad_cale_nav'),
		topMenuHeight = topMenu.outerHeight(),
		menuItems = topMenu.find('a'),
		scrollItems = menuItems.map(function(){
			var item = $($(this).attr('href'));
			if (item.length) { return item; }
		});

	menuItems.on('click', function(e){
		e.preventDefault();
		var href = $(this).attr('href'),
			offsetTop = href === '#' ? 0 : $(href).offset().top-topMenuHeight+1;
		$('html, body').stop().animate({ 
			scrollTop: offsetTop
		}, 300);
		$(this).addClass('on').siblings().removeClass('on');
	});

	// Bind to scroll
	$(window).on('scroll', function() {
		if ($(window).scrollTop() > 120) {
			topMenu.addClass('fix_nav');
		} 
		else {
			topMenu.removeClass('fix_nav');
		}

		var fromTop = $(this).scrollTop()+topMenuHeight;
		var cur = scrollItems.map(function(){
			if ($(this).offset().top < fromTop)
				return this;
		});

		cur = cur[cur.length-1];
		var id = cur && cur.length ? cur[0].id : '';
	   
		/*if (lastId !== id) {
			lastId = id;
			menuItems.removeClass('on').filter('[href="#'+id+'"]').addClass('on');
		}*/                   
	});
};

// 스누식단
pub_ui.fnMfood = function(){
	var restrItem = $('.restr_item'),
		restrShowBtn = $('a.btn_other'),
		restrLink = restrItem.find('.link'),
		restrUp = restrItem.find('.btn_up'),
		restrDown = restrItem.find('.btn_down');

	restrShowBtn.on('click', function(e){
		e.preventDefault();
		if ($(this).hasClass('on') == false) {
			//restrLink.animate({'height':0+'px'}, 100);
			restrLink.fadeOut(500);
			restrShowBtn.removeClass('on');
			//$(this).next().animate({'height':115+'px'}, 200);
			$(this).next().fadeIn(500);
			$(this).addClass('on');
		}
		else {
			//$(this).next().animate({'height':0+'px'}, 100);
			$(this).next().fadeOut(500);
			$(this).removeClass('on');
		}
	});

	restrUp.click(function(){
		if ($(this).prev()){
			var el = $(this).closest('.restr_item'),
				epH = el.prev().outerHeight(),
				elH = el.outerHeight();
			el.animate({top: -epH+'px'}, 300, function(){
				el.prev().animate({top: elH+'px'}, 100, function(){
					el.css('top', '0px');
					el.prev().css('top', '0px');
					el.insertBefore(el.prev());
				});
			});
		}
	});
	restrDown.click(function(){
		if ($(this).next()){
			var el = $(this).closest('.restr_item'),
				enH = el.next().outerHeight(),
				elH = el.outerHeight();
			el.animate({top: enH+'px'}, 300, function(){
				el.next().animate({top: -elH+'px'}, 100, function(){
					el.css('top', '0px');
					el.next().css('top', '0px');
					el.insertAfter(el.next());
				});
			});
		}
	});
};

// 교직원정보(상세)
pub_ui.fnMstaff = function(){
	var elBox = $('.edu_per_detail .history');

	elBox.each(function(){
		var showAllBtn = $(this).find('.btn_show_all a'),
			//elItem = $(this).find('.list_wrap li'),
			sum = 0;

		$(this).find('.list_wrap li:lt(5)').each(function() {
		   sum += $(this).outerHeight(); 
		});

		$(this).find('.list_wrap').css('maxHeight', sum + 1);

		showAllBtn.on('click', function(e){
			e.preventDefault();
			var el = $(this).closest('.history'),
				elContDiv = $(this).closest('.history').children('.list_wrap'),
				elContH = elContDiv.find('> ul').outerHeight();

			if (el.hasClass('on') == false){
				elContDiv.animate({maxHeight: elContH}, function(){
					$(this).parent().addClass('on');
					$(this).next().children().text('닫기');
				})
			} else {
				elContDiv.animate({maxHeight: sum + 1}, function(){
					$(this).parent().removeClass('on');
					$(this).next().children().text('전체보기');
				})	
			}
			
		});
	});

	// 확대가능 안내 레이어
	var lInGui = $('.l_info_guide'),
		lInGuiClose = lInGui.find('a');
    
    if(lInGui.css('display')=='none'){
        if ($('.l_page').has('.l_info_guide')) {
           $('html, body').css({'height' : '','overflow' : ''});
        }    
        return false;
    }
    
	if ($('.l_page').has('.l_info_guide')) {
		$('html, body').css({'height' : '100%','overflow' : 'hidden'});
	}

	lInGuiClose.on('click', function(){
		lInGui.hide();
		$('html, body').css({'height' : '','overflow' : ''});
	});
};

// 메뉴설정
pub_ui.fnMymenu = function(){
	var setMenuItem = $('.set_menu > ol > li'),
		setMenuUp = setMenuItem.find('.btn_up'),
		setMenuDown = setMenuItem.find('.btn_down');

	setMenuUp.click(function(){
		if ($(this).prev()){
			var el = $(this).closest('li'),
				epH = el.prev().outerHeight(),
				elH = el.outerHeight();
			el.animate({top: -epH+'px'}, 200, function(){
				el.prev().animate({top: elH+'px'}, 200, function(){
					el.css('top', '0px');
					el.prev().css('top', '0px');
					el.insertBefore(el.prev());
				});
			});
		}
	});
	setMenuDown.click(function(){
		if ($(this).next()){
			var el = $(this).closest('li'),
				enH = el.next().outerHeight(),
				elH = el.outerHeight();
			el.animate({top: enH+'px'}, 200, function(){
				el.next().animate({top: -elH+'px'}, 200, function(){
					el.css('top', '0px');
					el.next().css('top', '0px');
					el.insertAfter(el.next());
				});
			});
		}
	});
};

// 수강편람
pub_ui.fnMlect = function(){
	var topMenu = $('.mlect .g_tab_03'),
		topMenuLi = topMenu.find('li'),
		stH = $('.lect_item').outerHeight() + 100;
	$(window).on('scroll', function() {
		if ($(window).scrollTop() > stH) {
			topMenu.addClass('fix_nav');
		} 
		else {
			topMenu.removeClass('fix_nav');
		}
	});

	topMenuLi.each(function(){
		if($(this).hasClass('on')){
			var tabLeft = $(this).offset().left;
			topMenu.animate({scrollLeft: tabLeft - 15}, 400);
		}
	});
}

// 개인정보수집동의
pub_ui.fnMpers = function(){
	var elBox = $('.pers_box .pers_item');

	elBox.each(function(){
		var showAllBtn = $(this).find('.btn_show_all a'),
			sum = 0,
			mt = 0;

		$(this).find('.tbl_wrap table').each(function() {
		   sum += $(this).outerHeight();
		   mt += parseInt($(this).css('margin-top'));
		});

		$(this).find('.tbl_wrap').css('maxHeight', 100);

		showAllBtn.on('click', function(e){
			e.preventDefault();
			var el = $(this).closest('.pers_item'),
				elContDiv = $(this).closest('.pers_item').children('.tbl_wrap'),
				elContH = sum + mt + 1; 

			if (el.hasClass('on') == false){
				elContDiv.animate({maxHeight: elContH}, function(){
					$(this).parent().addClass('on');
					$(this).next().children().text('닫기');
				})	
			} else {
				elContDiv.animate({maxHeight: 100}, function(){
					$(this).parent().removeClass('on');
					$(this).next().children().text('전체보기');
				})
			}
			
		});
	});
}

// resize
$(window).resize(function() {
    $('.g_layer_box').each(function() {
		pub_ui.layerPop(this);
    });
});

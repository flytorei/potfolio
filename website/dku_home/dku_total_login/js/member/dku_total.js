jQuery(function($){
	//상단 랭귀지 선택
	$(document).ready(function(){		
		$('select.select').each(function(){
			var title = $(this).attr('title');
			if( $('option:selected', this).val() != ''  ) title = $('option:selected',this).text();
			$(this)
				.css({'z-index':10,'opacity':0,'-khtml-appearance':'none'})
				.after('<span class="select">' + title + '</span>')
				.change(function(){
					val = $('option:selected',this).text();
					$(this).next().text(val);
					})
		});
	});

	//레이어 팝업
	var layer = $('.layer_popup');
	var layer_close = layer.find('.layer_close')
	$(".login_notice a").colorbox({inline:true, href:"#login_notice"});
	layer_close.click(function(){
		$.colorbox.close();
	});
});
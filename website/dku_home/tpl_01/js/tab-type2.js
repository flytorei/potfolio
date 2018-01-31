$(document).ready(function(){
	$(".tab-content").eq(0).show();			
	$(".tab-type2 li").click(function(e) {
        e.preventDefault();
		var index = $('.tab-type2 li').index($(this));

        console.log(index);

		$(".tab-type2 li").removeClass("on");
		$(".tab-type2 li").eq(index).addClass("on");				
		$(".tab-content").hide();
		$(".tab-content").eq(index).show();
	});
});
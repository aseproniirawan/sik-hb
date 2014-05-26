// JavaScript Document

	$(document).ready(function(){
		//Vertical Sliding
		$('.boxgrid.slidedown').hover(function(){
			$(".cover", this).stop().animate({top:'-220px'},{queue:false,duration:300});
		}, function() {
			$(".cover", this).stop().animate({top:'0px'},{queue:false,duration:300});
		});
			
	});
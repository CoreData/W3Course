"use strict";

$(document).ready(function () {
	$("h2").click(function() {
		if(!$(this).next().hasClass("change")) {
			$(this).next().toggle('slow');
			$(this).next().addClass("change");
			$(this).parent().css("background", '#a9a9a9');
		}
		else {
			$(this).parent().css("background", '#d3d3d3');
			$(this).next().removeClass();
			$(this).next().toggle('slow');
		}
	});
	
	$("h1").click(function() {
		if(!$("h2").next().hasClass("change")) {
			$("h2").next().toggle('slow');
			$("h2").next().addClass("change");
			$("h2").parent().css("background", '#a9a9a9');
		}
		else {
			$("h2").parent().css("background", '#d3d3d3');
			$("h2").next().removeClass();
			$("h2").next().toggle('slow');
		}
	});
});
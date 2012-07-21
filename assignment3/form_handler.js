"use strict";

$(document).ready(function() {
	$("#entry_button").click(function() {
		var headline = $("#entry_list input[name=entry_headline]").val();
		var body = $("#entry_list textarea[name=entry_body]").val();
		
		var entry = "\<article\>" + 
					"\<h2\>" + headline + 
					"\<\/h2\>" + 
					"\<p\>" + body + "\<\/p\>" + 
					"\<a href=\"\#\" class=\"deleter\"\>Delete this entry\<\/a\>" +
					"\<\/article\>";
		alert(entry);
		$(".entries").prepend(entry);
	});
	
	$('.deleter').click(function() {
		$(this).parent().remove();
	});
	
});
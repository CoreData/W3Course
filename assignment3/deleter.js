$(document).ready(function deleteEntry() {
	$(".deleter").live("click", function deleteEntry(event){

		var ds = Date.parse($(this).prev().prev().text());
		stash.cut(ds.toString());
		
		var identString = stash.get('Identifiers');
		var newIdentString = jQuery.trim(identString.replace(ds.toString(), ""));
		stash.set('Identifiers', newIdentString);

		// clear element from the UI
		$(this).parent().remove();
	});
});